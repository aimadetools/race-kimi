// CORS proxy for fetching schema files from URLs that don't allow cross-origin requests
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return res.status(400).json({ error: 'Only HTTP/HTTPS URLs allowed' });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'SchemaLens/1.0 (https://schemalens.tech)',
        'Accept': 'text/plain,text/html,application/octet-stream,*/*'
      }
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(502).json({ error: `Upstream returned ${response.status}` });
    }

    const content = await response.text();

    // Limit size to 2MB
    if (content.length > 2 * 1024 * 1024) {
      return res.status(413).json({ error: 'Schema file too large (max 2MB)' });
    }

    return res.status(200).json({ content });
  } catch (err) {
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Request timed out' });
    }
    return res.status(502).json({ error: 'Failed to fetch: ' + (err.message || 'Unknown error') });
  }
}
