/**
 * SchemaLens Dynamic Schema Badge
 * GET /api/schema-badge?url=<raw-sql-url>&style=flat
 *
 * Fetches a SQL schema from a public URL, parses it, and returns an SVG badge
 * showing table count and a health score.
 *
 * Example:
 *   /api/schema-badge?url=https://raw.githubusercontent.com/.../schema.sql
 *
 * Health score is based on:
 *   - Table count (more tables = more complex)
 *   - Missing PRIMARY KEYs
 *   - Reserved word usage
 *   - Index coverage
 *   - Foreign key coverage
 */

module.exports = async (req, res) => {
  const { url, style = 'flat' } = req.query || {};

  if (!url) {
    return sendError(res, 'Missing "url" parameter', style);
  }

  // Security: only allow http(s) URLs, block private IPs
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return sendError(res, 'Invalid URL', style);
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return sendError(res, 'Only HTTP/HTTPS URLs allowed', style);
  }
  const hostname = parsed.hostname.toLowerCase();
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.') || hostname.startsWith('10.') || hostname.startsWith('172.')) {
    return sendError(res, 'Private URLs not allowed', style);
  }

  try {
    const sql = await fetchSchema(url);
    const stats = analyzeSchema(sql);
    const svg = renderBadge(stats, style);

    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.setHeader('X-SchemaLens-Tables', String(stats.tableCount));
    res.setHeader('X-SchemaLens-Health', stats.healthLabel);
    res.status(200).send(svg);
  } catch (err) {
    console.error('Schema badge error:', err.message);
    return sendError(res, 'Unable to analyze schema', style);
  }
};

async function fetchSchema(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const resp = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'SchemaLens-Badge/1.0' }
    });
    clearTimeout(timeout);

    if (!resp.ok) {
      throw new Error(`HTTP ${resp.status}`);
    }

    const contentType = resp.headers.get('content-type') || '';
    const contentLength = parseInt(resp.headers.get('content-length') || '0', 10);
    if (contentLength > 500_000) {
      throw new Error('File too large');
    }

    const text = await resp.text();
    if (text.length > 500_000) {
      throw new Error('File too large');
    }
    return text;
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

function analyzeSchema(sql) {
  const upper = sql.toUpperCase();

  // Extract tables
  const tableMatches = sql.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"\[]?(\w+)[`"\]]?/gi) || [];
  const tableCount = new Set(tableMatches.map(m => {
    const name = m.replace(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"\[]?/i, '').replace(/[`"\]]?$/, '');
    return name.toLowerCase();
  })).size;

  // Count columns (approximate)
  const columnMatches = sql.match(/^\s*[`"\[]?\w+[`"\]]?\s+\w+/gim) || [];
  const columnCount = columnMatches.length;

  // Check for primary keys
  const pkMatches = sql.match(/PRIMARY\s+KEY/gi) || [];
  const pkCount = pkMatches.length;

  // Check for foreign keys
  const fkMatches = sql.match(/FOREIGN\s+KEY/gi) || [];
  const fkCount = fkMatches.length;

  // Check for indexes
  const idxMatches = sql.match(/CREATE\s+(?:UNIQUE\s+)?INDEX/gi) || [];
  const idxCount = idxMatches.length;

  // Check for reserved words
  const reservedWords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'FROM', 'WHERE', 'ORDER', 'GROUP', 'USER', 'TABLE', 'INDEX', 'COLUMN'];
  const usedReserved = reservedWords.filter(w => {
    const regex = new RegExp(`\\b${w}\\b`, 'i');
    return regex.test(sql);
  });

  // Calculate health score (0-100)
  let score = 50;

  // +10 for having tables
  if (tableCount > 0) score += 10;
  // +10 for having PKs on most tables
  if (pkCount >= tableCount * 0.8) score += 10;
  else if (pkCount >= tableCount * 0.5) score += 5;
  // +10 for FK coverage
  if (fkCount >= tableCount * 0.3) score += 10;
  else if (fkCount > 0) score += 5;
  // +10 for index coverage
  if (idxCount >= tableCount) score += 10;
  else if (idxCount > 0) score += 5;
  // +10 for no reserved words
  if (usedReserved.length === 0) score += 10;
  else score -= usedReserved.length * 2;
  // Penalty for very large schemas
  if (tableCount > 50) score -= 5;

  score = Math.max(0, Math.min(100, score));

  // Letter grade
  let healthLabel;
  if (score >= 90) healthLabel = 'A';
  else if (score >= 80) healthLabel = 'B';
  else if (score >= 70) healthLabel = 'C';
  else if (score >= 60) healthLabel = 'D';
  else healthLabel = 'F';

  return {
    tableCount,
    columnCount,
    pkCount,
    fkCount,
    idxCount,
    reservedIssues: usedReserved.length,
    score,
    healthLabel
  };
}

function renderBadge(stats, style) {
  const { tableCount, score, healthLabel } = stats;
  const label = 'schema';
  const message = `${tableCount} tables · ${healthLabel} (${score})`;
  const color = score >= 80 ? '22c55e' : score >= 60 ? 'eab308' : 'ef4444';

  const fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
  const fontSize = 11;
  const height = 20;
  const paddingX = 6;
  const charWidth = fontSize * 0.58;
  const labelWidth = Math.max(label.length * charWidth + paddingX * 2, 40);
  const messageWidth = Math.max(message.length * charWidth + paddingX * 2, 70);
  const totalWidth = labelWidth + messageWidth;
  const labelColor = '#1e293b';
  const messageColor = '#' + color;
  const textColor = '#fff';
  const shadowColor = 'rgba(0,0,0,0.3)';

  if (style === 'flat-square') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}" role="img" aria-label="${esc(label)}: ${esc(message)}">
  <title>${esc(label)}: ${esc(message)}</title>
  <a target="_blank" xlink:href="https://schemalens.tech/?ref=schema-badge">
    <g shape-rendering="crispEdges">
      <rect width="${labelWidth}" height="${height}" fill="${labelColor}"/>
      <rect x="${labelWidth}" width="${messageWidth}" height="${height}" fill="${messageColor}"/>
      <text x="${labelWidth / 2}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${esc(label)}</text>
      <text x="${labelWidth + messageWidth / 2}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${esc(message)}</text>
    </g>
  </a>
</svg>`;
  }

  // Default: flat
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${totalWidth}" height="${height}" role="img" aria-label="${esc(label)}: ${esc(message)}">
  <title>${esc(label)}: ${esc(message)}</title>
  <defs>
    <linearGradient id="labelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${labelColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="msgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${messageColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${darken(messageColor, 15)};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="0" y="0" width="100%" height="100%">
      <feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="${shadowColor}" flood-opacity="0.5"/>
    </filter>
  </defs>
  <a target="_blank" xlink:href="https://schemalens.tech/?ref=schema-badge">
    <g shape-rendering="geometricPrecision">
      <rect width="${labelWidth}" height="${height}" fill="url(#labelGrad)" rx="3" ry="3"/>
      <rect x="${labelWidth - 1}" width="${messageWidth + 1}" height="${height}" fill="url(#msgGrad)" rx="3" ry="3"/>
      <rect x="${labelWidth - 1}" width="1" height="${height}" fill="#0f172a"/>
      <text x="${labelWidth / 2}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${esc(label)}</text>
      <text x="${labelWidth + messageWidth / 2}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${esc(message)}</text>
    </g>
  </a>
</svg>`;
}

function sendError(res, message, style) {
  const svg = renderBadge({ tableCount: 0, score: 0, healthLabel: '?' }, style);
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(svg);
}

function esc(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function darken(hex, percent) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);
  r = Math.max(0, Math.floor(r * (1 - percent / 100)));
  g = Math.max(0, Math.floor(g * (1 - percent / 100)));
  b = Math.max(0, Math.floor(b * (1 - percent / 100)));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
