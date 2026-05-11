/**
 * Founding Member Giveaway endpoint
 * POST /api/founding-member
 * Body: { name: string, email: string, dialect?: string, use_case?: string }
 *
 * Generates a valid Pro license key (SL-XXXX-XXXX-XXXX-XXXX) using the same
 * checksum algorithm as client-side validation. Rate limited to 5 requests
 * per IP per hour. Logs claims to stdout for Vercel log collection.
 */

const LICENSE_SALT = "SchemaLensPro2026";
const MAX_CLAIMS = 50;

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

  console.log(
    `FOUNDING_MEMBER_CLAIM: ${name.trim()} <${email.trim().toLowerCase()}> ` +
    `dialect=${normalizedDialect || "n/a"} ` +
    `ip=${clientIp} ` +
    `key=${key} ` +
    `remaining_requests=${limit.remaining}`
  );

  return res.status(200).json({
    success: true,
    key,
    activation_url: activationUrl,
    message: "Welcome to the Founding Member program! Your free lifetime Pro license is ready.",
    remaining_requests: limit.remaining,
  });
}
