// API Entries Endpoint
// GET /api/entries - List entries
// POST /api/entries - Create entry

const fs = require('fs');
const path = require('path');

// Simple in-memory API key store (replace with database in production)
const VALID_API_KEYS = [
  process.env.API_KEY || 'test-api-key-for-development'
];

// Validate API key
function validateApiKey(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  const apiKey = authHeader.slice(7);
  return VALID_API_KEYS.includes(apiKey);
}

// Generate ID from title and date
function generateId(title, date) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${date}-${slug}`;
}

// Parse frontmatter from markdown
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content };
  
  const frontmatter = match[1];
  const body = match[2];
  const data = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      if (value.startsWith('[') && value.endsWith(']')) {
        data[key.trim()] = value.slice(1, -1).split(',').map(s => s.trim());
      } else if (value === 'true') {
        data[key.trim()] = true;
      } else if (value === 'false') {
        data[key.trim()] = false;
      } else {
        data[key.trim()] = value;
      }
    }
  });
  
  return { data, content: body };
}

// Create frontmatter string
function createFrontmatter(data) {
  const lines = ['---'];
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.join(', ')}]`);
    } else if (typeof value === 'boolean') {
      lines.push(`${key}: ${value}`);
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

// Get excerpt from content
function getExcerpt(content, maxLength = 150) {
  const plainText = content
    .replace(/#+ /g, '')
    .replace(/\*\*/g, '')
    .replace(/\n/g, ' ')
    .trim();
  
  if (plainText.length <= maxLength) return plainText;
  return plainText.slice(0, maxLength).trim() + '...';
}

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Rate limiting headers (basic implementation)
  res.setHeader('X-RateLimit-Limit', '1000');
  res.setHeader('X-RateLimit-Remaining', '999');

  try {
    const contentDir = path.join(process.cwd(), 'generator', 'content');

    // GET - List entries
    if (req.method === 'GET') {
      const { limit = 20, offset = 0, category, tag, search } = req.query;
      
      // Check if content directory exists
      if (!fs.existsSync(contentDir)) {
        res.status(200).json({
          data: [],
          pagination: { total: 0, limit: parseInt(limit), offset: parseInt(offset), has_more: false }
        });
        return;
      }

      const files = fs.readdirSync(contentDir)
        .filter(f => f.endsWith('.md'))
        .sort()
        .reverse();

      let entries = files.map(file => {
        const filePath = path.join(contentDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = parseFrontmatter(fileContent);
        
        return {
          id: file.replace('.md', ''),
          title: data.title || 'Untitled',
          date: data.date || file.slice(0, 10),
          category: data.category || 'announcement',
          tags: data.tags || [],
          excerpt: getExcerpt(content),
          url: `/changelog/${file.replace('.md', '')}`,
          published: data.published !== false,
          created_at: new Date(data.date || Date.now()).toISOString(),
          updated_at: new Date().toISOString()
        };
      });

      // Filter by category
      if (category) {
        entries = entries.filter(e => e.category === category);
      }

      // Filter by tag
      if (tag) {
        entries = entries.filter(e => e.tags.includes(tag));
      }

      // Search in title and content
      if (search) {
        const searchLower = search.toLowerCase();
        entries = entries.filter(e => 
          e.title.toLowerCase().includes(searchLower) ||
          e.excerpt.toLowerCase().includes(searchLower)
        );
      }

      const total = entries.length;
      const paginatedEntries = entries.slice(parseInt(offset), parseInt(offset) + parseInt(limit));

      res.status(200).json({
        data: paginatedEntries,
        pagination: {
          total,
          limit: parseInt(limit),
          offset: parseInt(offset),
          has_more: offset + limit < total
        }
      });
      return;
    }

    // POST - Create entry (requires authentication)
    if (req.method === 'POST') {
      if (!validateApiKey(req)) {
        res.status(401).json({
          error: {
            code: 'unauthorized',
            message: 'Invalid or missing API key'
          }
        });
        return;
      }

      const { title, date, category, content, tags = [], published = true, metadata = {} } = req.body;

      // Validation
      if (!title || !date || !category || !content) {
        res.status(400).json({
          error: {
            code: 'invalid_request',
            message: 'Missing required fields',
            details: [
              ...(!title ? [{ field: 'title', message: 'Title is required' }] : []),
              ...(!date ? [{ field: 'date', message: 'Date is required' }] : []),
              ...(!category ? [{ field: 'category', message: 'Category is required' }] : []),
              ...(!content ? [{ field: 'content', message: 'Content is required' }] : [])
            ]
          }
        });
        return;
      }

      // Validate category
      const validCategories = ['feature', 'bugfix', 'security', 'improvement', 'announcement'];
      if (!validCategories.includes(category)) {
        res.status(400).json({
          error: {
            code: 'invalid_request',
            message: `Invalid category. Must be one of: ${validCategories.join(', ')}`
          }
        });
        return;
      }

      const id = generateId(title, date);
      const filePath = path.join(contentDir, `${id}.md`);

      // Check if file already exists
      if (fs.existsSync(filePath)) {
        res.status(409).json({
          error: {
            code: 'conflict',
            message: 'An entry with this ID already exists'
          }
        });
        return;
      }

      // Ensure content directory exists
      if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true });
      }

      // Create frontmatter
      const frontmatter = createFrontmatter({
        title,
        date,
        category,
        tags,
        published,
        ...metadata
      });

      // Write file
      const fileContent = `${frontmatter}\n\n${content}`;
      fs.writeFileSync(filePath, fileContent);

      // Return created entry
      res.status(201).json({
        id,
        title,
        date,
        category,
        tags,
        content,
        excerpt: getExcerpt(content),
        url: `/changelog/${id}`,
        published,
        metadata,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
      return;
    }

    // Method not allowed
    res.status(405).json({
      error: {
        code: 'method_not_allowed',
        message: 'Method not allowed'
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: {
        code: 'server_error',
        message: 'Internal server error'
      }
    });
  }
};
