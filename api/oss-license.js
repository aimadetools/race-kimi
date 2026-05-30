/**
 * Open Source Pro License endpoint
 * POST /api/oss-license
 * Body: { repo_url: string, email: string, name: string }
 *
 * Validates a GitHub repository and generates a free Lifetime Pro license key
 * for open-source maintainers who meet the requirements.
 *
 * Requirements:
 *   - MIT, Apache-2.0, or GPL license
 *   - 50+ GitHub stars
 *   - Commit within last 6 months
 *   - Add SchemaLens badge to README (on honor system)
 */

const LICENSE_SALT = "SchemaLensPro2026";
const MIN_STARS = 50;
const MAX_AGE_DAYS = 180; // ~6 months

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZndkd3d2dmNkdHJlZHVuY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjIyMTAsImV4cCI6MjA5MjMzODIxMH0.tMXibqq5XPRGSdxfrNqCPgJRk3IYtvu5aCQVutZN9gw";

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

function parseGitHubRepoUrl(url) {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.toLowerCase().endsWith("github.com")) return null;
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch {
    return null;
  }
}

async function fetchRepoInfo(owner, repo) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      signal: controller.signal,
      headers: { "Accept": "application/vnd.github.v3+json", "User-Agent": "SchemaLens-OSS-License" }
    });
    clearTimeout(timeout);
    if (!res.ok) return { ok: false, status: res.status, error: await res.text().catch(() => "GitHub API error") };
    const data = await res.json();
    return { ok: true, data };
  } catch (e) {
    clearTimeout(timeout);
    return { ok: false, error: e.message };
  }
}

async function fetchLastCommit(owner, repo) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
      signal: controller.signal,
      headers: { "Accept": "application/vnd.github.v3+json", "User-Agent": "SchemaLens-OSS-License" }
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data[0].commit?.committer?.date || data[0].commit?.author?.date || null;
    }
    return null;
  } catch {
    return null;
  }
}

function isAllowedLicense(licenseKey) {
  if (!licenseKey) return false;
  const allowed = ["mit", "apache-2.0", "gpl-3.0", "gpl-2.0", "bsd-3-clause", "bsd-2-clause", "mpl-2.0", "cc0-1.0", "unlicense"];
  return allowed.includes(licenseKey.toLowerCase());
}

function isRecent(dateStr) {
  if (!dateStr) return false;
  const commitDate = new Date(dateStr);
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - MAX_AGE_DAYS);
  return commitDate > cutoff;
}

async function persistToSupabase(record) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/oss_license_applications`, {
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
      console.log(`OSS_LICENSE_DB_FAILED: ${res.status} ${text}`);
    }
    return res.ok;
  } catch (e) {
    console.log(`OSS_LICENSE_DB_ERROR: ${e.message}`);
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

  const { repo_url, email, name } = req.body || {};

  if (!repo_url || !email || !name) {
    return res.status(400).json({ error: "Missing required fields: repo_url, email, name" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }

  const parsed = parseGitHubRepoUrl(repo_url);
  if (!parsed) {
    return res.status(400).json({ error: "Invalid GitHub repository URL." });
  }

  const repoInfo = await fetchRepoInfo(parsed.owner, parsed.repo);
  if (!repoInfo.ok) {
    return res.status(400).json({ error: `Unable to fetch repository info. ${repoInfo.error || ""}`.trim() });
  }

  const data = repoInfo.data;
  const stars = data.stargazers_count || 0;
  const licenseKey = data.license?.key || "";
  const isFork = data.fork || false;

  if (isFork) {
    return res.status(400).json({ error: "Forked repositories are not eligible." });
  }
  if (stars < MIN_STARS) {
    return res.status(400).json({ error: `Repository has ${stars} stars. Minimum required: ${MIN_STARS}.` });
  }
  if (!isAllowedLicense(licenseKey)) {
    return res.status(400).json({ error: `License "${data.license?.name || licenseKey || "unknown"}" is not eligible. Allowed: MIT, Apache-2.0, GPL, BSD, MPL-2.0, CC0, Unlicense.` });
  }

  const lastCommitDate = await fetchLastCommit(parsed.owner, parsed.repo);
  if (!isRecent(lastCommitDate)) {
    return res.status(400).json({ error: `No commits in the last ${MAX_AGE_DAYS} days. Repository must be actively maintained.` });
  }

  const licenseKeyGenerated = generateLicenseKey();
  const activationUrl = `https://schemalens.tech/app.html?license=${encodeURIComponent(licenseKeyGenerated)}`;

  const record = {
    repo_url: repo_url.trim(),
    repo_owner: parsed.owner,
    repo_name: parsed.repo,
    stars,
    license: licenseKey,
    last_commit: lastCommitDate,
    email: email.trim(),
    name: name.trim(),
    license_key: licenseKeyGenerated,
    activation_url: activationUrl,
    created_at: new Date().toISOString(),
    ip,
  };

  await persistToSupabase(record);

  console.log(`OSS_LICENSE_GRANTED: ${parsed.owner}/${parsed.repo} | ${stars} stars | ${email} | ${licenseKeyGenerated}`);

  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({
    success: true,
    license_key: licenseKeyGenerated,
    activation_url: activationUrl,
    repo: { owner: parsed.owner, name: parsed.repo, stars, license: data.license?.name || licenseKey },
    message: "Your free Lifetime Pro license has been granted! Add the SchemaLens badge to your README and activate your license below.",
  });
};
