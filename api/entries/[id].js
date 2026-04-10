// API Single Entry Endpoint
// GET /api/entries/:id - Get entry
// PATCH /api/entries/:id - Update entry
// DELETE /api/entries/:id - Delete entry

const fs = require('fs');
const path = require('path');

const VALID_API_KEYS = [
  process.env.API_KEY || 'test-api-key-for-development'
];

function validateApiKey(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  const apiKey = authHeader.slice(7);
  return VALID_API_KEYS.includes(apiKey);
}

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.setHeader('X-RateLimit-Limit', '1000');
  res.setHeader('X-RateLimit-Remaining', '999');

  try {
    const { id } = req.query;
    const contentDir = path.join(process.cwd(), 'generator', 'content');
    const filePath = path.join(contentDir, `${id}.md`);

    if (req.method === 'GET') {
      if (!fs.existsSync(filePath)) {
        res.status(404).json({
          error: {
            code: 'not_found',
            message: 'Entry not found'
          }
        });
        return;
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = parseFrontmatter(fileContent);

      res.status(200).json({
        id,
        title: data.title || 'Untitled',
        date: data.date || id.slice(0, 10),
        category: data.category || 'announcement',
        tags: data.tags || [],
        content,
        excerpt: getExcerpt(content),
        url: `/changelog/${id}`,
        published: data.published !== false,
        metadata: {
          author: data.author || null,
          featured_image: data.featured_image || null
        },
        created_at: new Date(data.date || Date.now()).toISOString(),
        updated_at: new Date().toISOString()
      });
      return;
    }

    if (!validateApiKey(req)) {
      res.status(401).json({
        error: {
          code: 'unauthorized',
          message: 'Invalid or missing API key'
        }
      });
      return;
    }

    if (req.method === 'PATCH') {
      if (!fs.existsSync(filePath)) {
        res.status(404).json({
          error: {
            code: 'not_found',
            message: 'Entry not found'
          }
        });
        return;
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data: existingData, content: existingContent } = parseFrontmatter(fileContent);

      const updates = req.body;
      
      const newData = {
        ...existingData,
        ...(updates.title && { title: updates.title }),
        ...(updates.date && { date: updates.date }),
        ...(updates.category && { category: updates.category }),
        ...(updates.tags && { tags: updates.tags }),
        ...(updates.published !== undefined && { published: updates.published }),
        ...(updates.metadata && updates.metadata.author && { author: updates.metadata.author }),
        ...(updates.metadata && updates.metadata.featured_image && { featured_image: updates.metadata.featured_image })
      };

      const newContent = updates.content || existingContent;
      const frontmatter = createFrontmatter(newData);
      fs.writeFileSync(filePath, `${frontmatter}\n\n${newContent}`);

      res.status(200).json({
        id,
        title: newData.title,
        date: newData.date,
        category: newData.category,
        tags: newData.tags || [],
        content: newContent,
        excerpt: getExcerpt(newContent),
        url: `/changelog/${id}`,
        published: newData.published,
        metadata: {
          author: newData.author || null,
          featured_image: newData.featured_image || null
        },
        created_at: new Date(existingData.date || Date.now()).toISOString(),
        updated_at: new Date().toISOString()
      });
      return;
    }

    if (req.method === 'DELETE') {
      if (!fs.existsSync(filePath)) {
        res.status(404).json({
          error: {
            code: 'not_found',
            message: 'Entry not found'
          }
        });
        return;
      }

      fs.unlinkSync(filePath);

      res.status(200).json({
        success: true,
        message: 'Entry deleted successfully'
      });
      return;
    }

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
