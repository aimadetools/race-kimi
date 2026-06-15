/**
 * Migration Safety Score Badge
 * GET /api/migration-safety-badge?score=85&label=Migration+Safety&style=flat
 *
 * Returns an SVG shield badge showing the migration safety score computed by
 * SchemaLens. Designed to be embedded in READMEs, PRs, and migration runbooks.
 *
 * Score semantics (mirror app.html calculateSafetyScore):
 *   90-100  -> Safe / green
 *   70-89   -> Caution / yellow
 *   50-69   -> Review / orange
 *   < 50    -> Risky / red
 */

module.exports = async (req, res) => {
  const { score: scoreParam, label: labelParam, style = 'flat' } = req.query || {};

  const score = parseInt(scoreParam, 10);
  if (Number.isNaN(score) || score < 0 || score > 100) {
    return sendError(res, 'score must be 0-100', style);
  }

  const safeLabel = String(labelParam || 'migration safety').slice(0, 40);
  const { message, color } = scoreToMessage(score);
  const svg = renderBadge({ label: safeLabel, message, color, style, score });

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.setHeader('X-SchemaLens-Safety-Score', String(score));
  res.status(200).send(svg);
};

function scoreToMessage(score) {
  if (score >= 90) return { message: `${score}/100 safe`, color: '22c55e' };
  if (score >= 80) return { message: `${score}/100 mostly safe`, color: '22c55e' };
  if (score >= 70) return { message: `${score}/100 caution`, color: 'eab308' };
  if (score >= 50) return { message: `${score}/100 review`, color: 'f97316' };
  return { message: `${score}/100 risky`, color: 'ef4444' };
}

function sendError(res, message, style) {
  const svg = renderBadge({ label: 'migration safety', message: 'error', color: '64748b', style });
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(svg);
}

function renderBadge({ label, message, color, style, score }) {
  const fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
  const fontSize = 11;
  const height = 20;
  const paddingX = 6;
  const charWidth = fontSize * 0.58;
  const labelWidth = Math.max(label.length * charWidth + paddingX * 2, 50);
  const messageWidth = Math.max(message.length * charWidth + paddingX * 2, 60);
  const totalWidth = labelWidth + messageWidth;
  const labelColor = '#1e293b';
  const messageColor = '#' + color;
  const textColor = '#fff';
  const linkUrl = `https://schemalens.tech/app.html?safety_score=${score}&ref=migration-safety-badge`;

  if (style === 'flat-square') {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${totalWidth}" height="${height}" role="img" aria-label="${esc(label)}: ${esc(message)}">
  <title>${esc(label)}: ${esc(message)}</title>
  <a target="_blank" xlink:href="${linkUrl}">
    <g shape-rendering="crispEdges">
      <rect width="${labelWidth}" height="${height}" fill="${labelColor}"/>
      <rect x="${labelWidth}" width="${messageWidth}" height="${height}" fill="${messageColor}"/>
      <text x="${labelWidth / 2}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${esc(label)}</text>
      <text x="${labelWidth + messageWidth / 2}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${esc(message)}</text>
    </g>
  </a>
</svg>`;
  }

  // Default: flat with rounded corners
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${totalWidth}" height="${height}" role="img" aria-label="${esc(label)}: ${esc(message)}">
  <title>${esc(label)}: ${esc(message)}</title>
  <defs>
    <linearGradient id="msbLabelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${labelColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="msbMsgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${messageColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${darken(messageColor, 15)};stop-opacity:1" />
    </linearGradient>
  </defs>
  <a target="_blank" xlink:href="${linkUrl}">
    <g shape-rendering="geometricPrecision">
      <rect width="${labelWidth}" height="${height}" fill="url(#msbLabelGrad)" rx="3" ry="3"/>
      <rect x="${labelWidth - 1}" width="${messageWidth + 1}" height="${height}" fill="url(#msbMsgGrad)" rx="3" ry="3"/>
      <rect x="${labelWidth - 1}" width="1" height="${height}" fill="#0f172a"/>
      <text x="${labelWidth / 2}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${esc(label)}</text>
      <text x="${labelWidth + messageWidth / 2}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${esc(message)}</text>
    </g>
  </a>
</svg>`;
}

function esc(text) {
  if (!text) return '';
  return String(text)
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
