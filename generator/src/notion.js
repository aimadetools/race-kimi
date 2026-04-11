#!/usr/bin/env node

/**
 * Notion Integration for Changelog Generator
 * Fetches changelog entries from a Notion database and converts them to markdown
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * Make request to Notion API
 */
function notionRequest(token, endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: `/v1${endpoint}`,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      timeout: 30000
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`Notion API ${res.statusCode}: ${parsed.message || responseData}`));
          }
        } catch (e) {
          reject(new Error(`Failed to parse Notion response: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Notion API request timeout'));
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

/**
 * Query a Notion database for entries
 */
async function queryDatabase(token, databaseId, filter = null) {
  const endpoint = `/databases/${databaseId}/query`;
  const data = {
    page_size: 100,
    sorts: [
      {
        timestamp: 'created_time',
        direction: 'descending'
      }
    ]
  };
  
  if (filter) {
    data.filter = filter;
  }
  
  const response = await notionRequest(token, endpoint, 'POST', data);
  return response.results || [];
}

/**
 * Fetch block content from a Notion page
 */
async function fetchPageContent(token, pageId) {
  const blocks = [];
  let cursor = null;
  
  do {
    const endpoint = `/blocks/${pageId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ''}`;
    const response = await notionRequest(token, endpoint);
    
    blocks.push(...(response.results || []));
    cursor = response.has_more ? response.next_cursor : null;
  } while (cursor);
  
  return blocks;
}

/**
 * Convert Notion blocks to markdown
 */
function blocksToMarkdown(blocks) {
  const markdown = [];
  
  for (const block of blocks) {
    const text = extractTextFromBlock(block);
    if (!text) continue;
    
    switch (block.type) {
      case 'paragraph':
        markdown.push(text);
        break;
      case 'heading_1':
        markdown.push(`# ${text}`);
        break;
      case 'heading_2':
        markdown.push(`## ${text}`);
        break;
      case 'heading_3':
        markdown.push(`### ${text}`);
        break;
      case 'bulleted_list_item':
        markdown.push(`- ${text}`);
        break;
      case 'numbered_list_item':
        markdown.push(`1. ${text}`);
        break;
      case 'to_do':
        const checked = block.to_do?.checked ? '[x]' : '[ ]';
        markdown.push(`- ${checked} ${text}`);
        break;
      case 'quote':
        markdown.push(`> ${text}`);
        break;
      case 'code':
        const language = block.code?.language || '';
        markdown.push(`\`\`\`${language}\n${text}\n\`\`\``);
        break;
      case 'divider':
        markdown.push('---');
        break;
      case 'callout':
        markdown.push(`> 💡 ${text}`);
        break;
    }
  }
  
  return markdown.join('\n\n');
}

/**
 * Extract text content from a Notion block
 */
function extractTextFromBlock(block) {
  const type = block.type;
  if (!block[type]) return '';
  
  const richText = block[type].rich_text || [];
  return richText.map(t => {
    let text = t.plain_text || '';
    
    // Apply inline formatting
    if (t.annotations) {
      if (t.annotations.code) text = `\`${text}\``;
      if (t.annotations.bold) text = `**${text}**`;
      if (t.annotations.italic) text = `*${text}*`;
      if (t.annotations.strikethrough) text = `~~${text}~~`;
    }
    
    // Handle links
    if (t.href) {
      text = `[${text}](${t.href})`;
    }
    
    return text;
  }).join('');
}

/**
 * Extract property value from Notion page properties
 */
function extractProperty(properties, name, type = 'title') {
  const prop = properties[name];
  if (!prop) return null;
  
  switch (type) {
    case 'title':
      return prop.title?.map(t => t.plain_text).join('') || '';
    case 'rich_text':
      return prop.rich_text?.map(t => t.plain_text).join('') || '';
    case 'select':
      return prop.select?.name || '';
    case 'multi_select':
      return prop.multi_select?.map(s => s.name) || [];
    case 'date':
      return prop.date?.start || '';
    case 'checkbox':
      return prop.checkbox || false;
    case 'url':
      return prop.url || '';
    default:
      return null;
  }
}

/**
 * Convert Notion page to changelog entry
 */
async function notionPageToEntry(token, page, propertyMapping = {}) {
  const properties = page.properties;
  
  // Default property mapping
  const mapping = {
    title: propertyMapping.title || 'Name',
    category: propertyMapping.category || 'Category',
    date: propertyMapping.date || 'Date',
    tags: propertyMapping.tags || 'Tags',
    author: propertyMapping.author || 'Author'
  };
  
  // Extract frontmatter fields
  const title = extractProperty(properties, mapping.title, 'title');
  const category = extractProperty(properties, mapping.category, 'select');
  const date = extractProperty(properties, mapping.date, 'date');
  const tags = extractProperty(properties, mapping.tags, 'multi_select');
  const author = extractProperty(properties, mapping.author, 'rich_text');
  
  // Fetch page content
  const blocks = await fetchPageContent(token, page.id);
  const content = blocksToMarkdown(blocks);
  
  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
  
  // Build frontmatter
  const frontmatter = [
    '---',
    `title: "${title}"`,
    category ? `category: ${category}` : '',
    date ? `date: ${date}` : `date: ${new Date().toISOString().split('T')[0]}`,
    tags.length > 0 ? `tags: [${tags.map(t => `"${t}"`).join(', ')}]` : '',
    author ? `author: "${author}"` : '',
    `source: "notion"`,
    `notion_page_id: "${page.id}"`,
    '---'
  ].filter(Boolean).join('\n');
  
  return {
    slug,
    title,
    category,
    date: date || new Date().toISOString().split('T')[0],
    tags,
    author,
    content: `${frontmatter}\n\n${content}`,
    source: 'notion',
    notionPageId: page.id
  };
}

/**
 * Fetch entries from Notion database and convert to markdown files
 */
async function syncFromNotion(config) {
  const {
    notionToken,
    notionDatabaseId,
    propertyMapping = {},
    outputDir,
    filter = null
  } = config;
  
  if (!notionToken || !notionDatabaseId) {
    throw new Error('Notion token and database ID are required');
  }
  
  console.log('📓 Fetching entries from Notion...');
  
  // Query database
  const pages = await queryDatabase(notionToken, notionDatabaseId, filter);
  console.log(`   Found ${pages.length} entries in Notion`);
  
  const entries = [];
  const errors = [];
  
  // Process each page
  for (const page of pages) {
    try {
      const entry = await notionPageToEntry(notionToken, page, propertyMapping);
      entries.push(entry);
      
      // Write markdown file
      const filename = `${entry.date}-${entry.slug}.md`;
      const filepath = path.join(outputDir, filename);
      
      fs.writeFileSync(filepath, entry.content);
      console.log(`   ✓ ${entry.title}`);
    } catch (error) {
      console.error(`   ❌ Failed to process page ${page.id}: ${error.message}`);
      errors.push({ pageId: page.id, error: error.message });
    }
  }
  
  console.log(`✅ Synced ${entries.length} entries from Notion${errors.length > 0 ? ` (${errors.length} errors)` : ''}`);
  
  return { entries, errors };
}

/**
 * Get database schema to help users configure property mapping
 */
async function getDatabaseSchema(token, databaseId) {
  const response = await notionRequest(token, `/databases/${databaseId}`);
  
  const schema = {
    title: response.title?.[0]?.plain_text || 'Untitled',
    properties: {}
  };
  
  for (const [name, prop] of Object.entries(response.properties)) {
    schema.properties[name] = {
      type: prop.type,
      id: prop.id
    };
    
    // Include options for select/multi_select
    if (prop.type === 'select' && prop.select?.options) {
      schema.properties[name].options = prop.select.options.map(o => o.name);
    }
    if (prop.type === 'multi_select' && prop.multi_select?.options) {
      schema.properties[name].options = prop.multi_select.options.map(o => o.name);
    }
  }
  
  return schema;
}

module.exports = {
  syncFromNotion,
  getDatabaseSchema,
  queryDatabase,
  notionPageToEntry,
  blocksToMarkdown
};
