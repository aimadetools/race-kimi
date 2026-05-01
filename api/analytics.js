/**
 * SchemaLens Analytics API
 * POST /api/analytics
 *
 * Body:
 *   event_type   string  required  Event name (e.g. page_view, diff_run, export_pdf)
 *   page_path    string  optional  Current page path
 *   metadata     object  optional  Additional event data (max 10 keys, strings/numbers only)
 *
 * Response: 204 No Content on success
 *
 * Events are written to both:
 *   1. stdout (Vercel log collection)
 *   2. Supabase analytics_events table (if configured)
 */

// Simple in-memory rate limiter per IP (resets on cold start)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  record.count++;
  if (record.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

function cleanMetadata(input) {
  if (!input || typeof input !== 'object') return {};
  const out = {};
  const keys = Object.keys(input).slice(0, 10);
  for (const key of keys) {
    const val = input[key];
    if (typeof val === 'string') {
      out[key] = val.slice(0, 500);
    } else if (typeof val === 'number' || typeof val === 'boolean') {
      out[key] = val;
    }
  }
  return out;
}

// Supabase configuration — override via environment variables on Vercel
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fmfwdwwvvcdtreduncev.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZndkd3d2dmNkdHJlZHVuY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjIyMTAsImV4cCI6MjA5MjMzODIxMH0.tMXibqq5XPRGSdxfrNqCPgJRk3IYtvu5aCQVutZN9gw';

async function writeToSupabase(payload) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${SUPABASE_URL}/rest/v1/analytics_events`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        event_type: payload.event_type,
        page_path: payload.page_path,
        session_hash: payload.session_hash,
        referrer: payload.referrer,
        metadata: payload.metadata,
        ip_hash: payload.ip_hash
      })
    });

    clearTimeout(timeout);
    return res.ok;
  } catch (err) {
    return false;
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Rate limited' });
  }

  const { event_type, page_path, metadata } = req.body || {};

  if (!event_type || typeof event_type !== 'string' || event_type.length > 64) {
    return res.status(400).json({ error: 'event_type is required and must be ≤64 chars' });
  }

  const allowedEvents = new Set([
    'page_view',
    'diff_run',
    'export_markdown',
    'export_pdf',
    'export_sql',
    'export_json',
    'share_diff',
    'license_activate',
    'tool_used',
    'sample_loaded',
    'breaking_changes_viewed',
    'ref_click',
    'ref_visit',
    'share_cta_clicked',
    'demo_auto_run'
  ]);

  if (!allowedEvents.has(event_type)) {
    return res.status(400).json({ error: 'Invalid event_type' });
  }

  const payload = {
    event_type,
    page_path: typeof page_path === 'string' ? page_path.slice(0, 500) : null,
    session_hash: null,
    referrer: null,
    metadata: cleanMetadata(metadata),
    ip_hash: ip ? require('crypto').createHash('sha256').update(ip).digest('hex').slice(0, 16) : null,
    ts: new Date().toISOString()
  };

  // Always log to stdout for Vercel log collection
  console.log('ANALYTICS_EVENT', JSON.stringify(payload));

  // Async write to Supabase — failure is silent to avoid blocking the client
  const supabaseOk = await writeToSupabase(payload);
  if (!supabaseOk) {
    console.log('ANALYTICS_SUPABASE_FAILED', JSON.stringify({ event_type: payload.event_type, ts: payload.ts }));
  }

  return res.status(204).end();
};
