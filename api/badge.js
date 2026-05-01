/**
 * SchemaLens Dynamic Badge Generator
 * GET /api/badge?style=flat&label=SchemaLens&message=Schema+Diff&color=6366f1&ref=CODE
 *
 * Returns an SVG badge image. Supports shield-style badges and social-style badges.
 */

module.exports = async (req, res) => {
  const {
    style = 'flat',
    label = 'SchemaLens',
    message = 'Schema Diff',
    color = '6366f1',
    labelColor = '',
    ref = '',
    logo = 'true'
  } = req.query || {};

  const safeLabel = String(label).slice(0, 40);
  const safeMessage = String(message).slice(0, 60);
  const safeColor = /^[0-9a-fA-F]{3,6}$/.test(color) ? color.toLowerCase() : '6366f1';
  const safeLabelColor = /^[0-9a-fA-F]{3,6}$/.test(labelColor) ? labelColor.toLowerCase() : '';
  const safeRef = /^[a-zA-Z0-9_-]{0,40}$/.test(ref) ? ref : '';

  const linkUrl = `https://schemalens.tech${safeRef ? `?ref=${encodeURIComponent(safeRef)}` : ''}`;

  // Font settings
  const fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';
  const fontSize = style === 'for-the-badge' ? 11 : 12;
  const height = style === 'for-the-badge' ? 28 : 20;
  const paddingX = style === 'for-the-badge' ? 10 : 6;
  const paddingY = style === 'for-the-badge' ? 4 : 3;

  // Measure text widths (approximate using character count)
  const charWidth = fontSize * 0.58;
  const labelWidth = Math.max(safeLabel.length * charWidth + paddingX * 2, 40);
  const messageWidth = Math.max(safeMessage.length * charWidth + paddingX * 2, 40);
  const totalWidth = labelWidth + messageWidth;

  // Colors
  const defaultLabelColor = style === 'social' ? '#fff' : (safeLabelColor || '#1e293b');
  const defaultMessageColor = '#' + safeColor;
  const textColor = '#fff';
  const shadowColor = 'rgba(0,0,0,0.3)';

  let svg = '';

  if (style === 'social') {
    // GitHub-style social button
    svg = renderSocialBadge({
      label: safeLabel,
      message: safeMessage,
      width: totalWidth,
      height: 20,
      linkUrl,
      fontFamily,
      logo: logo !== 'false'
    });
  } else if (style === 'flat-square') {
    svg = renderFlatSquareBadge({
      label: safeLabel,
      message: safeMessage,
      labelWidth,
      messageWidth,
      totalWidth,
      height,
      labelColor: defaultLabelColor,
      messageColor: defaultMessageColor,
      textColor,
      linkUrl,
      fontFamily,
      fontSize,
      logo: logo !== 'false'
    });
  } else if (style === 'for-the-badge') {
    svg = renderForTheBadge({
      label: safeLabel,
      message: safeMessage,
      labelWidth,
      messageWidth,
      totalWidth,
      height,
      labelColor: defaultLabelColor,
      messageColor: defaultMessageColor,
      textColor,
      linkUrl,
      fontFamily,
      fontSize,
      paddingX,
      logo: logo !== 'false'
    });
  } else {
    // flat (default)
    svg = renderFlatBadge({
      label: safeLabel,
      message: safeMessage,
      labelWidth,
      messageWidth,
      totalWidth,
      height,
      labelColor: defaultLabelColor,
      messageColor: defaultMessageColor,
      textColor,
      shadowColor,
      linkUrl,
      fontFamily,
      fontSize,
      logo: logo !== 'false'
    });
  }

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(svg);
};

function renderFlatBadge({ label, message, labelWidth, messageWidth, totalWidth, height, labelColor, messageColor, textColor, shadowColor, linkUrl, fontFamily, fontSize, logo }) {
  const logoWidth = logo ? 14 : 0;
  const logoOffset = logo ? 4 : 0;
  const labelTextX = logo ? (labelWidth / 2 + 8) : (labelWidth / 2);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${totalWidth + (logo ? 8 : 0)}" height="${height}" role="img" aria-label="${esc(label)}: ${esc(message)}">
  <title>${esc(label)}: ${esc(message)}</title>
  <defs>
    <linearGradient id="labelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${labelColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${darken(labelColor, 10)};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="msgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${messageColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${darken(messageColor, 10)};stop-opacity:1" />
    </linearGradient>
    <filter id="shadow" x="0" y="0" width="100%" height="100%">
      <feDropShadow dx="0" dy="1" stdDeviation="0.5" flood-color="${shadowColor}" flood-opacity="0.5"/>
    </filter>
  </defs>
  <a target="_blank" xlink:href="${esc(linkUrl)}">
    <g shape-rendering="geometricPrecision">
      <rect width="${labelWidth + (logo ? 8 : 0)}" height="${height}" fill="url(#labelGrad)" rx="3" ry="3"/>
      <rect x="${labelWidth + (logo ? 8 : 0) - 1}" width="${messageWidth + 1}" height="${height}" fill="url(#msgGrad)" rx="3" ry="3"/>
      <rect x="${labelWidth + (logo ? 8 : 0) - 1}" width="1" height="${height}" fill="${darken(labelColor, 15)}"/>
      ${logo ? `<text x="${logoOffset + 7}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize - 1}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">🔍</text>` : ''}
      <text x="${labelTextX + (logo ? 4 : 0)}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${esc(label)}</text>
      <text x="${labelWidth + (logo ? 8 : 0) + messageWidth / 2}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${esc(message)}</text>
    </g>
  </a>
</svg>`;
}

function renderFlatSquareBadge({ label, message, labelWidth, messageWidth, totalWidth, height, labelColor, messageColor, textColor, linkUrl, fontFamily, fontSize, logo }) {
  const labelTextX = logo ? (labelWidth / 2 + 8) : (labelWidth / 2);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${totalWidth + (logo ? 8 : 0)}" height="${height}" role="img" aria-label="${esc(label)}: ${esc(message)}">
  <title>${esc(label)}: ${esc(message)}</title>
  <a target="_blank" xlink:href="${esc(linkUrl)}">
    <g shape-rendering="crispEdges">
      <rect width="${labelWidth + (logo ? 8 : 0)}" height="${height}" fill="${labelColor}"/>
      <rect x="${labelWidth + (logo ? 8 : 0)}" width="${messageWidth}" height="${height}" fill="${messageColor}"/>
      ${logo ? `<text x="8" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize - 1}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">🔍</text>` : ''}
      <text x="${labelTextX + (logo ? 4 : 0)}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${esc(label)}</text>
      <text x="${labelWidth + (logo ? 8 : 0) + messageWidth / 2}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">${esc(message)}</text>
    </g>
  </a>
</svg>`;
}

function renderForTheBadge({ label, message, labelWidth, messageWidth, totalWidth, height, labelColor, messageColor, textColor, linkUrl, fontFamily, fontSize, paddingX, logo }) {
  const labelTextX = logo ? (labelWidth / 2 + 10) : (labelWidth / 2);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${totalWidth + (logo ? 10 : 0)}" height="${height}" role="img" aria-label="${esc(label)}: ${esc(message)}">
  <title>${esc(label)}: ${esc(message)}</title>
  <a target="_blank" xlink:href="${esc(linkUrl)}">
    <g shape-rendering="geometricPrecision">
      <rect width="${labelWidth + (logo ? 10 : 0)}" height="${height}" fill="${labelColor}" rx="4" ry="4"/>
      <rect x="${labelWidth + (logo ? 10 : 0) - 1}" width="${messageWidth + 1}" height="${height}" fill="${messageColor}" rx="4" ry="4"/>
      <rect x="${labelWidth + (logo ? 10 : 0) - 1}" width="1" height="${height}" fill="${darken(labelColor, 15)}"/>
      ${logo ? `<text x="10" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="central">🔍</text>` : ''}
      <text x="${labelTextX + (logo ? 4 : 0)}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="600" fill="${textColor}" text-anchor="middle" dominant-baseline="central" letter-spacing="0.05em">${esc(label).toUpperCase()}</text>
      <text x="${labelWidth + (logo ? 10 : 0) + messageWidth / 2}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="${fontSize}" font-weight="600" fill="${textColor}" text-anchor="middle" dominant-baseline="central" letter-spacing="0.05em">${esc(message).toUpperCase()}</text>
    </g>
  </a>
</svg>`;
}

function renderSocialBadge({ label, message, width, height, linkUrl, fontFamily, logo }) {
  // GitHub-style social button with count bubble
  const labelW = Math.max(label.length * 7 + 20, 60);
  const msgW = Math.max(message.length * 7 + 20, 40);
  const totalW = labelW + msgW + 2;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${totalW}" height="${height}" role="img" aria-label="${esc(label)}: ${esc(message)}">
  <title>${esc(label)}: ${esc(message)}</title>
  <a target="_blank" xlink:href="${esc(linkUrl)}">
    <g shape-rendering="geometricPrecision">
      <rect width="${labelW}" height="${height}" fill="#f6f8fa" stroke="#d1d9e0" stroke-width="1" rx="3" ry="3"/>
      <rect x="${labelW + 1}" width="${msgW}" height="${height}" fill="#fff" stroke="#d1d9e0" stroke-width="1" rx="3" ry="3"/>
      ${logo ? `<text x="10" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="10" fill="#57606a" text-anchor="middle" dominant-baseline="central">🔍</text>` : ''}
      <text x="${labelW / 2 + (logo ? 6 : 0)}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="11" fill="#24292f" font-weight="600" text-anchor="middle" dominant-baseline="central">${esc(label)}</text>
      <text x="${labelW + 1 + msgW / 2}" y="${height / 2 + 1}" font-family="${fontFamily}" font-size="11" fill="#24292f" font-weight="600" text-anchor="middle" dominant-baseline="central">${esc(message)}</text>
    </g>
  </a>
</svg>`;
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
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}
