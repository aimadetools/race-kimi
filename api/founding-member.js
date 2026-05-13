/**
 * Founding Member Giveaway endpoint
 * POST /api/founding-member
 * Body: { name: string, email: string, dialect?: string, use_case?: string }
 *
 * Generates a valid Pro license key (SL-XXXX-XXXX-XXXX-XXXX) using the same
 * checksum algorithm as client-side validation. Rate limited to 5 requests
 * per IP per hour. Logs claims to stdout for Vercel log collection.
 * Persists to Supabase and sends welcome email via Resend.
 */

const LICENSE_SALT = "SchemaLensPro2026";
const MAX_CLAIMS = 50;

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZndkd3d2dmNkdHJlZHVuY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjIyMTAsImV4cCI6MjA5MjMzODIxMH0.tMXibqq5XPRGSdxfrNqCPgJRk3IYtvu5aCQVutZN9gw";
const EMAIL_API_KEY = process.env.EMAIL_API_KEY || "";
const EMAIL_FROM = process.env.EMAIL_FROM || "hello@schemalens.tech";

// Simple in-memory rate limiter (sufficient for low traffic)
const rateLimitMap = new Map(); // ip -> { count, resetAt }

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
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

function validateLicenseKey(key) {
  if (!/^SL-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(key)) return false;
  const parts = key.replace(/^SL-/, "").split("-");
  const payload = parts.slice(0, 3).join("");
  const check = parts[3];
  let hash = 0;
  const data = payload + LICENSE_SALT;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash + data.charCodeAt(i)) | 0;
  }
  hash = Math.abs(hash) % 46656;
  const expected = hash.toString(36).toUpperCase().padStart(4, "0");
  return check === expected;
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return { allowed: true, remaining: 4 };
  }
  if (entry.count >= 5) {
    return { allowed: false, remaining: 0, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count++;
  return { allowed: true, remaining: 5 - entry.count };
}

async function persistToSupabase(record) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/founding_members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify(record),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.log(`FOUNDING_MEMBER_DB_FAILED: ${res.status} ${text}`);
    }
    return res.ok;
  } catch (e) {
    console.log(`FOUNDING_MEMBER_DB_ERROR: ${e.message}`);
    return false;
  }
}

async function sendWelcomeEmail(record) {
  if (!EMAIL_API_KEY) return { sent: false, reason: "EMAIL_API_KEY not configured" };
  try {
    const html = `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:520px;margin:0 auto;color:#111;">
        <h2 style="color:#0f0f0f;">Welcome to the SchemaLens Founding Member program, ${record.name}!</h2>
        <p>You're one of the first 50 developers to get a <strong>free lifetime Pro license</strong> for SchemaLens. Thank you for joining us early.</p>
        
        <div style="background:#f3f4f6;border-radius:8px;padding:16px;margin:20px 0;">
          <p style="margin:0 0 8px;font-weight:600;">Your license key:</p>
          <code style="font-size:1.1rem;background:#fff;padding:8px 12px;border-radius:6px;display:inline-block;border:1px solid #e5e7eb;">${record.license_key}</code>
          <p style="margin:12px 0 0;font-size:0.9rem;"><a href="${record.activation_url}" style="color:#6366f1;">Activate now →</a></p>
        </div>
        
        <p><strong>What's next:</strong></p>
        <ul>
          <li><a href="https://schemalens.tech/app.html?license=${encodeURIComponent(record.license_key)}" style="color:#6366f1;">Open SchemaLens Pro</a> and run your first diff</li>
          <li>Explore 35+ free micro-tools at <a href="https://schemalens.tech/tools.html" style="color:#6366f1;">schemalens.tech/tools</a></li>
          <li>Install the <a href="https://marketplace.visualstudio.com/items?itemName=schemalens.schemalens" style="color:#6366f1;">VS Code extension</a> for in-editor diffs</li>
        </ul>
        
        <div style="background:#e0e7ff;border-radius:8px;padding:16px;margin:20px 0;">
          <p style="margin:0 0 8px;font-weight:600;color:#4338ca;">🚀 Product Hunt Launch — May 14</p>
          <p style="margin:0;color:#4338ca;font-size:0.9rem;">SchemaLens launches on Product Hunt this Wednesday. As a Founding Member, your upvote and comment would mean the world. We'll email you the link on launch day.</p>
        </div>
        
        <p>Have feedback? Just reply to this email or use the feedback widget in the app.</p>
        
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
        <p style="font-size:0.85rem;color:#6b7280;">SchemaLens — Compare SQL schemas and generate migrations in your browser.<br>
        <a href="https://schemalens.tech">schemalens.tech</a> · <a href="mailto:schemalens@proton.me">schemalens@proton.me</a></p>
      </div>
    `;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EMAIL_API_KEY}`,
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: record.email,
        subject: "Welcome, Founding Member! Your SchemaLens Pro license is ready",
        html,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`FOUNDING_EMAIL_ERROR: ${res.status} ${text}`);
      return { sent: false, reason: text };
    }
    const data = await res.json().catch(() => ({}));
    console.log(`FOUNDING_EMAIL_SENT: ${data.id || "unknown"} to ${record.email}`);
    return { sent: true, id: data.id };
  } catch (err) {
    console.error(`FOUNDING_EMAIL_EXCEPTION: ${err.message}`);
    return { sent: false, reason: err.message };
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const clientIp = getClientIp(req);
  const limit = checkRateLimit(clientIp);
  if (!limit.allowed) {
    res.setHeader("Retry-After", limit.retryAfter);
    return res.status(429).json({ error: "Rate limit exceeded. Try again in an hour." });
  }

  const { name, email, dialect, use_case } = req.body || {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ error: "Name is required (min 2 characters)." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Valid email is required." });
  }

  const normalizedDialect = typeof dialect === "string" ? dialect.trim().slice(0, 50) : "";
  const normalizedUseCase = typeof use_case === "string" ? use_case.trim().slice(0, 500) : "";

  // Generate a valid key and verify it immediately
  let key;
  let attempts = 0;
  do {
    key = generateLicenseKey();
    attempts++;
  } while (!validateLicenseKey(key) && attempts < 100);

  if (!validateLicenseKey(key)) {
    return res.status(500).json({ error: "Unable to generate license key. Please try again." });
  }

  const activationUrl = `https://schemalens.tech/app.html?license=${encodeURIComponent(key)}`;

  // Persist to Supabase (fire-and-forget, don't block response on DB errors)
  const dbRecord = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    license_key: key,
    dialect: normalizedDialect,
    use_case: normalizedUseCase,
    claimed_at: new Date().toISOString(),
  };
  const dbOk = await persistToSupabase(dbRecord);

  // Send welcome email (fire-and-forget, don't block response on email errors)
  const emailResult = await sendWelcomeEmail({ ...dbRecord, activation_url: activationUrl });

  console.log(
    `FOUNDING_MEMBER_CLAIM: ${name.trim()} <${email.trim().toLowerCase()}> ` +
    `dialect=${normalizedDialect || "n/a"} ` +
    `ip=${clientIp} ` +
    `key=${key} ` +
    `db=${dbOk ? "ok" : "fail"} ` +
    `email=${emailResult.sent ? "sent" : "fail"} ` +
    `remaining_requests=${limit.remaining}`
  );

  return res.status(200).json({
    success: true,
    key,
    activation_url: activationUrl,
    message: "Welcome to the Founding Member program! Your free lifetime Pro license is ready. Check your email for details.",
    remaining_requests: limit.remaining,
  });
}
