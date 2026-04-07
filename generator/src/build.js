#!/usr/bin/env node

/**
 * Changelog Generator
 * Converts Markdown files with YAML frontmatter to beautiful HTML changelogs
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const yamlFront = require('yaml-front-matter');

// Configuration
const CONFIG = {
  contentDir: process.env.CONTENT_DIR || './content',
  outputDir: process.env.OUTPUT_DIR || './dist',
  theme: process.env.THEME || 'minimal',
  siteName: process.env.SITE_NAME || 'Changelog',
  siteUrl: process.env.SITE_URL || '',
};

// Parse command line args
const args = process.argv.slice(2);
const watchMode = args.includes('--watch');

/**
 * Load and parse all markdown files from content directory
 */
function loadEntries() {
  const contentPath = path.resolve(CONFIG.contentDir);
  
  if (!fs.existsSync(contentPath)) {
    console.error(`❌ Content directory not found: ${contentPath}`);
    process.exit(1);
  }

  const files = fs.readdirSync(contentPath)
    .filter(f => f.endsWith('.md'))
    .sort((a, b) => b.localeCompare(a)); // Sort by filename (date) descending

  const entries = files.map(file => {
    const filePath = path.join(contentPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = yamlFront.loadFront(content);
    
    // Extract date from filename (YYYY-MM-DD-*.md) or frontmatter
    const dateMatch = file.match(/(\d{4}-\d{2}-\d{2})/);
    const fileDate = dateMatch ? dateMatch[1] : null;
    
    // Handle YAML date objects vs string dates
    let entryDate = parsed.date || fileDate;
    if (entryDate instanceof Date) {
      entryDate = entryDate.toISOString().split('T')[0];
    }
    
    return {
      title: parsed.title || 'Untitled',
      date: entryDate,
      category: parsed.category || 'Update',
      tags: parsed.tags || [],
      author: parsed.author || '',
      image: parsed.image || '',
      slug: file.replace('.md', ''),
      content: marked(parsed.__content || ''),
      rawContent: parsed.__content || '',
    };
  });

  // Filter out future-dated entries
  const now = new Date().toISOString().split('T')[0];
  return entries.filter(e => !e.date || e.date <= now);
}

/**
 * Load theme template
 */
function loadTheme(themeName) {
  const themePath = path.resolve(__dirname, '../themes', themeName, 'template.html');
  
  if (!fs.existsSync(themePath)) {
    console.error(`❌ Theme not found: ${themeName}`);
    console.log(`Available themes: ${getAvailableThemes().join(', ')}`);
    process.exit(1);
  }
  
  return fs.readFileSync(themePath, 'utf-8');
}

/**
 * Get list of available themes
 */
function getAvailableThemes() {
  const themesPath = path.resolve(__dirname, '../themes');
  if (!fs.existsSync(themesPath)) return [];
  return fs.readdirSync(themesPath).filter(f => {
    return fs.statSync(path.join(themesPath, f)).isDirectory();
  });
}

/**
 * Copy theme assets to output directory
 */
function copyThemeAssets(themeName) {
  const sourceDir = path.resolve(__dirname, '../themes', themeName);
  const destDir = path.resolve(CONFIG.outputDir);
  
  // Copy CSS, JS, images
  ['css', 'js', 'images'].forEach(dir => {
    const source = path.join(sourceDir, dir);
    const dest = path.join(destDir, dir);
    
    if (fs.existsSync(source)) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      copyDirectory(source, dest);
    }
  });
}

/**
 * Recursively copy directory
 */
function copyDirectory(source, dest) {
  const entries = fs.readdirSync(source, { withFileTypes: true });
  
  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  }
}

/**
 * Generate RSS feed
 */
function generateRSS(entries) {
  const lastBuildDate = new Date().toUTCString();
  const items = entries.slice(0, 20).map(entry => `
    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${CONFIG.siteUrl}/${entry.slug}</link>
      <guid>${CONFIG.siteUrl}/${entry.slug}</guid>
      <pubDate>${new Date(entry.date).toUTCString()}</pubDate>
      <description>${escapeXml(entry.rawContent.substring(0, 500))}...</description>
    </item>
  `).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${CONFIG.siteName}</title>
    <link>${CONFIG.siteUrl}</link>
    <description>Product updates and changelog</description>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${CONFIG.siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}

/**
 * Generate JSON Feed
 */
function generateJSONFeed(entries) {
  return JSON.stringify({
    version: 'https://jsonfeed.org/version/1.1',
    title: CONFIG.siteName,
    home_page_url: CONFIG.siteUrl,
    feed_url: `${CONFIG.siteUrl}/feed.json`,
    items: entries.slice(0, 20).map(entry => ({
      id: entry.slug,
      url: `${CONFIG.siteUrl}/${entry.slug}`,
      title: entry.title,
      content_html: entry.content,
      date_published: entry.date,
      tags: entry.tags,
    })),
  }, null, 2);
}

/**
 * Escape XML special characters
 */
function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Build the changelog site
 */
function build() {
  console.log('🔨 Building changelog...');
  console.log(`   Theme: ${CONFIG.theme}`);
  console.log(`   Content: ${CONFIG.contentDir}`);
  console.log(`   Output: ${CONFIG.outputDir}`);

  // Load data
  const entries = loadEntries();
  console.log(`   Found ${entries.length} entries`);

  // Load theme
  const template = loadTheme(CONFIG.theme);

  // Ensure output directory exists
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  // Copy theme assets
  copyThemeAssets(CONFIG.theme);

  // Generate index page
  const indexHtml = template
    .replace(/{{site_name}}/g, CONFIG.siteName)
    .replace(/{{site_description}}/g, 'Product updates and changelog')
    .replace('{{entries}}', generateEntriesHTML(entries))
    .replace('{{feed_meta}}', generateFeedMeta());

  fs.writeFileSync(path.join(CONFIG.outputDir, 'index.html'), indexHtml);

  // Generate RSS feed
  fs.writeFileSync(path.join(CONFIG.outputDir, 'rss.xml'), generateRSS(entries));

  // Generate JSON feed
  fs.writeFileSync(path.join(CONFIG.outputDir, 'feed.json'), generateJSONFeed(entries));

  // Generate individual entry pages (optional, for SEO)
  entries.forEach(entry => {
    const entryHtml = template
      .replace(/{{site_name}}/g, `${entry.title} | ${CONFIG.siteName}`)
      .replace(/{{site_description}}/g, entry.rawContent.substring(0, 160))
      .replace('{{entries}}', generateSingleEntryHTML(entry))
      .replace('{{feed_meta}}', generateFeedMeta());
    
    fs.writeFileSync(path.join(CONFIG.outputDir, `${entry.slug}.html`), entryHtml);
  });

  console.log('✅ Build complete!');
  console.log(`   Output: ${path.resolve(CONFIG.outputDir)}`);
}

/**
 * Generate HTML for all entries
 */
function generateEntriesHTML(entries) {
  return entries.map(entry => `
    <article class="entry" data-category="${entry.category.toLowerCase()}">
      <header class="entry-header">
        <div class="entry-meta">
          <span class="entry-category">${entry.category}</span>
          <time class="entry-date" datetime="${entry.date}">${formatDate(entry.date)}</time>
        </div>
        <h2 class="entry-title">
          <a href="${entry.slug}.html">${entry.title}</a>
        </h2>
      </header>
      <div class="entry-content">
        ${entry.content}
      </div>
      ${entry.tags.length ? `
      <footer class="entry-footer">
        ${entry.tags.map(tag => `<span class="entry-tag">#${tag}</span>`).join(' ')}
      </footer>
      ` : ''}
    </article>
  `).join('\n');
}

/**
 * Generate HTML for single entry
 */
function generateSingleEntryHTML(entry) {
  return `
    <article class="entry entry--single" data-category="${entry.category.toLowerCase()}">
      <header class="entry-header">
        <div class="entry-meta">
          <span class="entry-category">${entry.category}</span>
          <time class="entry-date" datetime="${entry.date}">${formatDate(entry.date)}</time>
        </div>
        <h1 class="entry-title">${entry.title}</h1>
      </header>
      <div class="entry-content">
        ${entry.content}
      </div>
      ${entry.tags.length ? `
      <footer class="entry-footer">
        ${entry.tags.map(tag => `<span class="entry-tag">#${tag}</span>`).join(' ')}
      </footer>
      ` : ''}
      <nav class="entry-nav">
        <a href="index.html" class="entry-nav__back">← Back to changelog</a>
      </nav>
    </article>
  `;
}

/**
 * Generate feed auto-discovery meta tags
 */
function generateFeedMeta() {
  return `
    <link rel="alternate" type="application/rss+xml" title="${CONFIG.siteName} RSS" href="${CONFIG.siteUrl}/rss.xml">
    <link rel="alternate" type="application/json" title="${CONFIG.siteName} JSON Feed" href="${CONFIG.siteUrl}/feed.json">
  `;
}

/**
 * Format date for display
 */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Run build
build();

// Watch mode
if (watchMode) {
  console.log('👀 Watching for changes...');
  fs.watch(CONFIG.contentDir, { recursive: true }, () => {
    console.log('\n📝 Changes detected, rebuilding...');
    build();
  });
}
