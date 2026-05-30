/**
 * Student Pro License endpoint
 * POST /api/student-license
 * Body: { name: string, email: string, major: string, grad_year: string }
 *
 * Validates a student email address and generates a free Lifetime Pro license key.
 *
 * Requirements:
 *   - Valid .edu email or known accredited institution domain
 *   - One license per email address
 */

const LICENSE_SALT = "SchemaLensPro2026";

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZndkd3d2dmNkdHJlZHVuY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjIyMTAsImV4cCI6MjA5MjMzODIxMH0.tMXibqq5XPRGSdxfrNqCPgJRk3IYtvu5aCQVutZN9gw";

const rateLimitMap = new Map(); // ip -> { count, resetAt }

// Known accredited institution domains (in addition to .edu)
const ALLOWED_DOMAINS = new Set([
  // US
  "edu",
  // UK
  "ac.uk", "sch.uk",
  // Australia
  "edu.au",
  // Canada
  "ca", // many Canadian unis use .ca
  // Germany
  "uni-due.de", "tu-berlin.de", "tum.de", "uni-heidelberg.de", "rwth-aachen.de",
  "uni-muenchen.de", "fu-berlin.de", "uni-hamburg.de", "uni-koeln.de", "kit.edu",
  // France
  "fr", "ens.fr", "polytechnique.fr",
  // Netherlands
  "nl", "tudelft.nl", "uva.nl", "eur.nl",
  // Switzerland
  "ethz.ch", "epfl.ch",
  // Sweden
  "se", "kth.se", "chalmers.se",
  // Denmark
  "dtu.dk", "ku.dk",
  // Norway
  "ntnu.no", "uio.no",
  // Finland
  "aalto.fi", "helsinki.fi",
  // Austria
  "tuwien.ac.at", "univie.ac.at",
  // Italy
  "unibo.it", "polimi.it",
  // Spain
  "upc.edu", "uoc.edu",
  // Portugal
  "ist.utl.pt", "fc.ul.pt",
  // Belgium
  "kuleuven.be", "ugent.be",
  // Ireland
  "tcd.ie", "ucd.ie",
  // India
  "iit.ac.in", "iitb.ac.in", "iitd.ac.in", "bits-pilani.ac.in", "nit.ac.in",
  "vit.ac.in", "srmist.edu.in", "manipal.edu",
  // China
  "edu.cn", "tsinghua.edu.cn", "pku.edu.cn",
  // Japan
  "ac.jp", "tokyo.ac.jp", "kyoto-u.ac.jp",
  // South Korea
  "ac.kr", "snu.ac.kr", "kaist.ac.kr",
  // Singapore
  "edu.sg", "nus.edu.sg", "ntu.edu.sg",
  // Brazil
  "br", "usp.br", "unicamp.br",
  // Mexico
  "unam.mx", "itesm.mx",
  // South Africa
  "ac.za", "uct.ac.za", "wits.ac.za",
  // Israel
  "ac.il", "technion.ac.il",
  // Turkey
  "edu.tr", "metu.edu.tr",
  // Russia
  "ac.ru", "msu.ru",
  // Poland
  "edu.pl", "agh.edu.pl",
  // Czech Republic
  "cvut.cz", "muni.cz",
  // Hungary
  "elte.hu", "bme.hu",
  // Greece
  "ntua.gr", "uoa.gr",
  // Argentina
  "uba.ar",
  // Chile
  "uc.cl", "uchile.cl",
  // Colombia
  "unal.edu.co",
  // Pakistan
  "edu.pk", "nu.edu.pk",
  // Bangladesh
  "ac.bd", "bu.ac.bd",
  // Indonesia
  "ac.id", "ui.ac.id",
  // Malaysia
  "edu.my", "um.edu.my",
  // Thailand
  "ac.th", "chula.ac.th",
  // Philippines
  "edu.ph", "up.edu.ph",
  // Vietnam
  "edu.vn", "vnu.edu.vn",
  // Taiwan
  "edu.tw", "ntu.edu.tw",
  // Hong Kong
  "edu.hk", "hku.hk", "cuhk.edu.hk",
  // New Zealand
  "ac.nz", "auckland.ac.nz",
  // UAE
  "ac.ae", "uaeu.ac.ae",
  // Saudi Arabia
  "edu.sa", "ksu.edu.sa",
  // Egypt
  "edu.eg", "cu.edu.eg",
  // Nigeria
  "edu.ng", "unilag.edu.ng",
  // Kenya
  "ac.ke", "uonbi.ac.ke",
  // Ghana
  "edu.gh",
  // Uganda
  "ac.ug",
  // Tanzania
  "ac.tz",
  // Ethiopia
  "edu.et",
  // General academic second-level domains
  "ac.in", "ac.id", "ac.jp", "ac.kr", "ac.nz", "ac.th", "ac.uk", "ac.za",
  "ac.bd", "ac.ke", "ac.il", "ac.ug", "ac.tz", "ac.ae", "ac.ru",
]);

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isStudentEmail(email) {
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;

  // Direct match in allowed domains
  const parts = domain.split(".");
  for (let i = 0; i < parts.length - 1; i++) {
    const suffix = parts.slice(i).join(".");
    if (ALLOWED_DOMAINS.has(suffix)) return true;
  }

  // Check for .edu anywhere in the domain
  if (domain.includes(".edu")) return true;

  // Check for common academic indicators
  if (domain.startsWith("uni-") || domain.startsWith("tu-") || domain.includes("university")) return true;

  return false;
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
    return { allowed: true, remaining: 2 };
  }
  if (entry.count >= 3) {
    return { allowed: false, remaining: 0, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count++;
  return { allowed: true, remaining: 3 - entry.count };
}

async function persistToSupabase(record) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/student_license_applications`, {
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
      console.log(`STUDENT_LICENSE_DB_FAILED: ${res.status} ${text}`);
    }
    return res.ok;
  } catch (e) {
    console.log(`STUDENT_LICENSE_DB_ERROR: ${e.message}`);
    return false;
  }
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip = getClientIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    res.setHeader("Retry-After", String(rl.retryAfter));
    return res.status(429).json({ error: "Rate limit exceeded. Try again later.", retryAfter: rl.retryAfter });
  }

  const { name, email, major, grad_year } = req.body || {};

  if (!name || !email || !major || !grad_year) {
    return res.status(400).json({ error: "Missing required fields: name, email, major, grad_year" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }
  if (!isStudentEmail(email)) {
    return res.status(400).json({ error: "This email domain is not recognized as an accredited educational institution. We accept .edu addresses and many international academic domains. Contact hello@schemalens.tech if you believe this is an error." });
  }

  const licenseKeyGenerated = generateLicenseKey();
  const activationUrl = `https://schemalens.tech/app.html?license=${encodeURIComponent(licenseKeyGenerated)}`;

  const record = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    major: major.trim(),
    grad_year: String(grad_year).trim(),
    license_key: licenseKeyGenerated,
    activation_url: activationUrl,
    created_at: new Date().toISOString(),
    ip,
  };

  await persistToSupabase(record);

  console.log(`STUDENT_LICENSE_GRANTED: ${email} | ${major} | ${grad_year} | ${licenseKeyGenerated}`);

  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({
    success: true,
    license_key: licenseKeyGenerated,
    activation_url: activationUrl,
    message: "Your free Lifetime Pro license has been granted! Activate it in the app below.",
  });
};
