/**
 * SchemaLens Admin API Proxy
 * POST /api/admin
 *
 * Body:
 *   action     string  required  One of: feedback, subscribers, testimonials, analytics, comments, oss-sponsorship-applications
 *   password   string  required  Admin password
 *   limit      number  optional  Max rows to return (default 100, max 500)
 *
 * Response: JSON array of records
 *
 * Security:
 *   - Hardcoded admin password (same as admin.html client-side gate)
 *   - Supabase service_role key from environment variable (never exposed client-side)
 *   - Rate limited to 30 requests/minute per IP
 *   - CORS enabled for schemalens.tech origin only
 */

const ADMIN_PASSWORD = 'schemalens-admin-2026';
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://fmfwdwwvvcdtreduncev.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const LAUNCH_TOKEN = process.env.LAUNCH_TOKEN || '';

// Simple in-memory rate limiter per IP
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
  return record.count > RATE_LIMIT_MAX;
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.connection?.remoteAddress || 'unknown';
}

async function fetchSupabase(table, queryParams) {
  return fetchSupabaseWithMethod(table, queryParams, 'GET');
}

async function fetchSupabaseWithMethod(table, queryParams, method, body) {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  }
  const url = `${SUPABASE_URL}/rest/v1/${table}${queryParams ? '?' + queryParams : ''}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  const options = {
    method,
    signal: controller.signal,
    headers: {
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  if (body && method !== 'GET') {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  clearTimeout(timeout);

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Supabase ${res.status}: ${text.slice(0, 200)}`);
  }
  if (res.status === 204) return {};
  return res.json();
}

module.exports = async (req, res) => {
  // CORS
  const origin = req.headers.origin || '';
  const allowedOrigins = ['https://schemalens.tech', 'http://localhost:3000', 'http://localhost:8080'];
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://schemalens.tech');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Try again in a minute.' });
  }

  let body = {};
  try {
    if (typeof req.body === 'string') {
      body = JSON.parse(req.body);
    } else if (req.body && typeof req.body === 'object') {
      body = req.body;
    }
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { action, password, limit } = body;

  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!action) {
    return res.status(400).json({ error: 'Missing action' });
  }

  const maxLimit = Math.min(parseInt(limit, 10) || 100, 500);

  try {
    let data = [];
    switch (action) {
      case 'feedback':
        data = await fetchSupabase('feedback', `select=*&order=created_at.desc&limit=${maxLimit}`);
        break;
      case 'subscribers':
        data = await fetchSupabase('newsletter_subscribers', `select=*&order=subscribed_at.desc&limit=${maxLimit}`);
        break;
      case 'testimonials':
        data = await fetchSupabase('testimonials', `select=*&order=created_at.desc&limit=${maxLimit}`);
        break;
      case 'analytics':
        data = await fetchSupabase('analytics_events', `select=*&order=created_at.desc&limit=${maxLimit}`);
        break;
      case 'comments':
        data = await fetchSupabase('diff_comments', `select=*&order=created_at.desc&limit=${maxLimit}`);
        break;
      case 'affiliate-applications':
        data = await fetchSupabase('affiliate_applications', `select=*&order=created_at.desc&limit=${maxLimit}`);
        break;
      case 'demo-requests':
        data = await fetchSupabase('demo_requests', `select=*&order=created_at.desc&limit=${maxLimit}`);
        break;
      case 'founding-members':
        data = await fetchSupabase('founding_members', `select=*&order=claimed_at.desc&limit=${maxLimit}`);
        break;
      case 'oss-sponsorship-applications':
        data = await fetchSupabase('oss_sponsorship_applications', `select=*&order=created_at.desc&limit=${maxLimit}`);
        break;
      case 'approve-oss-sponsorship': {
        const id = body.id;
        if (!id) return res.status(400).json({ error: 'Missing id' });
        const updated = await fetchSupabaseWithMethod(
          'oss_sponsorship_applications',
          `id=eq.${encodeURIComponent(id)}`,
          'PATCH',
          { status: 'approved', reviewed_at: new Date().toISOString() }
        );
        return res.status(200).json({ data: updated });
      }
      case 'reject-oss-sponsorship': {
        const id = body.id;
        if (!id) return res.status(400).json({ error: 'Missing id' });
        const updated = await fetchSupabaseWithMethod(
          'oss_sponsorship_applications',
          `id=eq.${encodeURIComponent(id)}`,
          'PATCH',
          { status: 'rejected', reviewed_at: new Date().toISOString() }
        );
        return res.status(200).json({ data: updated });
      }
      case 'gumroad-sales': {
        const gumroadUrl = `${proto}://${host}/api/gumroad-sales`;
        const gumroadHeaders = { 'x-admin-password': ADMIN_PASSWORD };
        const gumroadRes = await fetch(gumroadUrl, { method: 'GET', headers: gumroadHeaders });
        const gumroadJson = await gumroadRes.json().catch(() => ({}));
        if (!gumroadRes.ok) {
          return res.status(gumroadRes.status || 500).json({ error: gumroadJson.error || 'Gumroad sales request failed' });
        }
        return res.status(200).json({ data: gumroadJson });
      }
      case 'launch-email': {
        const proto = req.headers['x-forwarded-proto'] || 'https';
        const host = req.headers.host || 'schemalens.tech';
        const dry = body.dry === true ? 'true' : 'false';
        const launchUrl = `${proto}://${host}/api/newsletter-launch?dry=${dry}`;
        const launchHeaders = { 'Content-Type': 'application/json' };
        if (LAUNCH_TOKEN) launchHeaders['x-launch-token'] = LAUNCH_TOKEN;
        const launchRes = await fetch(launchUrl, { method: 'POST', headers: launchHeaders });
        const launchJson = await launchRes.json().catch(() => ({}));
        if (!launchRes.ok) {
          return res.status(launchRes.status || 500).json({ error: launchJson.error || 'Launch email request failed' });
        }
        return res.status(200).json({ data: launchJson });
      }
      case 'prelaunch-email': {
        const proto = req.headers['x-forwarded-proto'] || 'https';
        const host = req.headers.host || 'schemalens.tech';
        const dry = body.dry === true ? 'true' : 'false';
        const prelaunchUrl = `${proto}://${host}/api/newsletter-prelaunch?dry=${dry}`;
        const prelaunchHeaders = { 'Content-Type': 'application/json' };
        if (LAUNCH_TOKEN) prelaunchHeaders['x-launch-token'] = LAUNCH_TOKEN;
        const prelaunchRes = await fetch(prelaunchUrl, { method: 'POST', headers: prelaunchHeaders });
        const prelaunchJson = await prelaunchRes.json().catch(() => ({}));
        if (!prelaunchRes.ok) {
          return res.status(prelaunchRes.status || 500).json({ error: prelaunchJson.error || 'Pre-launch email request failed' });
        }
        return res.status(200).json({ data: prelaunchJson });
      }
      case 'founding-member-followup': {
        const proto = req.headers['x-forwarded-proto'] || 'https';
        const host = req.headers.host || 'schemalens.tech';
        const dry = body.dry === true ? 'true' : 'false';
        const minDays = body.minDays || 7;
        const followupUrl = `${proto}://${host}/api/founding-member-followup?dry=${dry}&minDays=${minDays}`;
        const followupHeaders = { 'Content-Type': 'application/json' };
        if (LAUNCH_TOKEN) followupHeaders['x-launch-token'] = LAUNCH_TOKEN;
        const followupRes = await fetch(followupUrl, { method: 'POST', headers: followupHeaders });
        const followupJson = await followupRes.json().catch(() => ({}));
        if (!followupRes.ok) {
          return res.status(followupRes.status || 500).json({ error: followupJson.error || 'Founding member follow-up request failed' });
        }
        return res.status(200).json({ data: followupJson });
      }
      case 'newsletter-thanks': {
        const proto = req.headers['x-forwarded-proto'] || 'https';
        const host = req.headers.host || 'schemalens.tech';
        const dry = body.dry === true ? 'true' : 'false';
        const upvotes = body.upvotes || '';
        const ranking = body.ranking || '';
        const comments = body.comments || '';
        const thanksUrl = `${proto}://${host}/api/newsletter-thanks?dry=${dry}&upvotes=${encodeURIComponent(upvotes)}&ranking=${encodeURIComponent(ranking)}&comments=${encodeURIComponent(comments)}`;
        const thanksHeaders = { 'Content-Type': 'application/json' };
        if (LAUNCH_TOKEN) thanksHeaders['x-launch-token'] = LAUNCH_TOKEN;
        const thanksRes = await fetch(thanksUrl, { method: 'POST', headers: thanksHeaders });
        const thanksJson = await thanksRes.json().catch(() => ({}));
        if (!thanksRes.ok) {
          return res.status(thanksRes.status || 500).json({ error: thanksJson.error || 'Thank-you email request failed' });
        }
        return res.status(200).json({ data: thanksJson });
      }
      default:
        return res.status(400).json({ error: 'Unknown action' });
    }
    return res.status(200).json({ data });
  } catch (err) {
    console.error(`Admin API error (${action}):`, err.message);
    return res.status(500).json({ error: err.message });
  }
};
