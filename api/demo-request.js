/**
 * Demo Request Endpoint
 * POST /api/demo-request
 * Body: { name, email, company, team_size, message }
 */

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZndkd3d2dmNkdHJlZHVuY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjIyMTAsImV4cCI6MjA5MjMzODIxMH0.tMXibqq5XPRGSdxfrNqCPgJRk3IYtvu5aCQVutZN9gw";

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

async function writeToSupabase(record) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/demo_requests`, {
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
      console.log(`DEMO_REQUEST_FAILED: ${res.status} ${text}`);
    }
    return res.ok;
  } catch (e) {
    console.log(`DEMO_REQUEST_ERROR: ${e.message}`);
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

  const { name, email, company, team_size, message } = req.body || {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ error: "Name is required (min 2 characters)." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Valid email is required." });
  }

  const record = {
    name: name.trim().slice(0, 100),
    email: email.trim().toLowerCase().slice(0, 200),
    company: typeof company === "string" ? company.trim().slice(0, 200) : "",
    team_size: typeof team_size === "string" ? team_size.slice(0, 50) : "",
    message: typeof message === "string" ? message.trim().slice(0, 2000) : "",
    status: "new",
    created_at: new Date().toISOString(),
  };

  console.log(`DEMO_REQUEST: ${record.name} <${record.email}> from ${record.company || "n/a"}`);

  const ok = await writeToSupabase(record);

  if (!ok) {
    return res.status(500).json({ error: "Unable to save request. Please try again later." });
  }

  return res.status(200).json({
    success: true,
    message: "Demo request received. We'll be in touch within 1 business day to schedule your call.",
  });
}
