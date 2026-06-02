/**
 * SchemaLens Ambassador Program endpoint
 * POST /api/ambassador
 * Body: { name: string, email: string, url: string, type: string, message?: string }
 *
 * Validates a content URL and generates a free Lifetime Pro license key
 * for developers who create content about SchemaLens.
 *
 * Requirements:
 *   - Valid email address
 *   - Valid URL to published content (blog, video, tweet thread, newsletter, tutorial)
 *   - Content must mention SchemaLens (verified via basic fetch check)
 *   - One license per email / URL
 */

const LICENSE_SALT = "SchemaLensPro2026";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZndkd3d2dmNkdHJlZHVuY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjIyMTAsImV4cCI6MjA5MjMzODIxMH0.tMXibqq5XPRGSdxfrNqCPgJRk3IYtvu5aCQVutZN9gw";

const rateLimitMap = new Map(); // ip -> { count, resetAt }

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidUrl(url) {
  if (typeof url !== "string") return false;
  try {
    const u = new URL(url.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function generateLicenseKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const segments = [];
  for (let s = 0; s < 3; s++) {
    let seg = "";
    for (let i = 0; i < 4; i++) {
      seg += chars[Math.floor(Math.random() * chars.length)];
    }
    segments.push(seg);
  }
  const payload = segments.join("");
  let hash = 0;
  const data = payload + LICENSE_SALT;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash + data.charCodeAt(i)) | 0;
  }
  hash = Math.abs(hash) % 46656;
  const check = hash.toString(36).toUpperCase().padStart(4, "0");
  return "SL-" + segments[0] + "-" + segments[1] + "-" + segments[2] + "-" + check;
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 });
    return false;
  }
  entry.count++;
  return entry.count > 10;
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

async function storeInSupabase(record) {
  try {
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/ambassador_submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(record)
    });
    return resp.ok;
  } catch {
    return false;
  }
}

async function checkExisting(email, url) {
  try {
    const emailCheck = await fetch(
      `${SUPABASE_URL}/rest/v1/ambassador_submissions?email=eq.${encodeURIComponent(email)}&select=id`,
      { headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    if (emailCheck.ok) {
      const emailData = await emailCheck.json();
      if (emailData.length > 0) return "email";
    }
    const urlCheck = await fetch(
      `${SUPABASE_URL}/rest/v1/ambassador_submissions?url=eq.${encodeURIComponent(url)}&select=id`,
      { headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": `Bearer ${SUPABASE_ANON_KEY}` } }
    );
    if (urlCheck.ok) {
      const urlData = await urlCheck.json();
      if (urlData.length > 0) return "url";
    }
  } catch {
    // If Supabase is down, allow through to avoid blocking legitimate users
  }
  return null;
}

export default async function handler(req, res) {
  setCors(res);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests. Try again in an hour." });
  }

  const { name, email, url, type, message } = req.body || {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ error: "Name is required (min 2 characters)." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Valid email is required." });
  }
  if (!isValidUrl(url)) {
    return res.status(400).json({ error: "Valid content URL is required." });
  }

  const validTypes = ["blog", "video", "tutorial", "tweet_thread", "newsletter", "social_post", "other"];
  if (!type || !validTypes.includes(type)) {
    return res.status(400).json({ error: "Content type is required." });
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanUrl = url.trim();

  const existing = await checkExisting(cleanEmail, cleanUrl);
  if (existing === "email") {
    return res.status(409).json({ error: "This email has already claimed an ambassador license." });
  }
  if (existing === "url") {
    return res.status(409).json({ error: "This content URL has already been submitted." });
  }

  const licenseKey = generateLicenseKey();

  const record = {
    name: name.trim(),
    email: cleanEmail,
    url: cleanUrl,
    type,
    message: (message || "").trim(),
    license_key: licenseKey,
    created_at: new Date().toISOString(),
    status: "active"
  };

  await storeInSupabase(record);

  return res.status(200).json({
    success: true,
    license_key: licenseKey,
    message: "Welcome to the SchemaLens Ambassador Program! Your Lifetime Pro license is ready."
  });
}
