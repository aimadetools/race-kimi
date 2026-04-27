/**
 * SchemaLens Generic Webhook API
 * POST /api/webhook
 *
 * Body:
 *   url             string  required  Webhook destination URL (https://...)
 *   payload         object  required  JSON payload to forward
 *   secret          string  optional  If provided, adds X-Webhook-Signature header (HMAC-SHA256 hex)
 *
 * Response:
 *   { success: true, status: 200 }
 *
 * Security:
 *   - Rate limited: 10 requests/minute per IP
 *   - URL must use https://
 *   - 8-second timeout
 *   - No storage of payloads
 */

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) return true;
  return false;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt + RATE_LIMIT_WINDOW_MS) rateLimitMap.delete(ip);
  }
}, 5 * 60 * 1000);

function isValidUrl(url) {
  return typeof url === 'string' && /^https:\/\//.test(url);
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Maximum 10 webhook calls per minute.' });
  }

  const { url, payload, secret } = req.body || {};

  if (!isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid url. Must be an HTTPS URL.' });
  }

  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ error: 'payload object is required.' });
  }

  const headers = { 'Content-Type': 'application/json' };

  if (secret && typeof secret === 'string') {
    const crypto = require('crypto');
    const signature = crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex');
    headers['X-Webhook-Signature'] = signature;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const webhookRes = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!webhookRes.ok) {
      const text = await webhookRes.text().catch(() => '');
      console.log(`WEBHOOK_FAILED: ${webhookRes.status} ${text.slice(0, 200)}`);
      return res.status(502).json({ error: 'Webhook destination returned an error.', status: webhookRes.status });
    }

    console.log(`WEBHOOK_SENT: ${clientIp} | ${url.slice(0, 60)}`);
    return res.status(200).json({ success: true, status: webhookRes.status });
  } catch (err) {
    console.log(`WEBHOOK_ERROR: ${err.message}`);
    return res.status(502).json({ error: 'Failed to send webhook. Check your URL and network.' });
  }
};
