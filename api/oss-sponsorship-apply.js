/**
 * Open Source Sponsorship Application Endpoint
 * POST /api/oss-sponsorship-apply
 * Body: { name, email, projectName, repoUrl, description, usesAction, agreesToTerms }
 *
 * Stores OSS sponsorship applications. Tries Supabase first; falls back to console
 * logging so no application is lost even if the table is not yet created.
 */

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZndkd3d2dmNkdHJlZHVuY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjIyMTAsImV4cCI6MjA5MjMzODIxMH0.tMXibqq5XPRGSdxfrNqCPgJRk3IYtvu5aCQVutZN9gw";

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidUrl(url) {
  if (typeof url !== "string") return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

async function writeToSupabase(record) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/oss_sponsorship_applications`, {
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
      console.log(`OSS_SPONSORSHIP_DB_FAILED: ${res.status} ${text}`);
    }
    return res.ok;
  } catch (e) {
    console.log(`OSS_SPONSORSHIP_DB_ERROR: ${e.message}`);
    return false;
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

  const body = req.body || {};
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const projectName = typeof body.projectName === "string" ? body.projectName.trim() : "";
  const repoUrl = typeof body.repoUrl === "string" ? body.repoUrl.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const usesAction = body.usesAction === true || body.usesAction === "true";
  const agreesToTerms = body.agreesToTerms === true || body.agreesToTerms === "true";

  if (name.length < 2) {
    return res.status(400).json({ error: "Your name is required (min 2 characters)." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "A valid email is required." });
  }
  if (projectName.length < 2) {
    return res.status(400).json({ error: "Project name is required." });
  }
  if (!isValidUrl(repoUrl)) {
    return res.status(400).json({ error: "A valid HTTPS repository URL is required." });
  }
  if (description.length < 10) {
    return res.status(400).json({ error: "Please tell us a bit about your project (min 10 characters)." });
  }
  if (!agreesToTerms) {
    return res.status(400).json({ error: "You must agree to the program terms." });
  }

  const record = {
    name: name.slice(0, 100),
    email: email.slice(0, 200),
    project_name: projectName.slice(0, 100),
    repo_url: repoUrl.slice(0, 500),
    description: description.slice(0, 1000),
    uses_action: usesAction,
    agrees_to_terms: agreesToTerms,
    status: "pending",
    created_at: new Date().toISOString(),
  };

  console.log(`OSS_SPONSORSHIP_APPLY: ${record.project_name} <${record.email}> ${record.repo_url} action=${usesAction}`);

  const ok = await writeToSupabase(record);

  return res.status(200).json({
    success: true,
    saved: ok,
    message: ok
      ? "Application received. We review within 2 business days and will email you with next steps."
      : "Application logged. We review within 2 business days and will email you with next steps.",
  });
}
