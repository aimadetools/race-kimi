/**
 * SchemaLens Feedback API
 * POST /api/feedback
 *
 * Body:
 *   message   string  required  Feedback text (max 2000 chars)
 *   category  string  optional  bug | feature | other (default: other)
 *   email     string  optional  User email for follow-up
 *   page      string  optional  Page where feedback was sent from
 *
 * Response: 200 { success: true } on success
 */

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZndkd3d2dmNkdHJlZHVuY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjIyMTAsImV4cCI6MjA5MjMzODIxMH0.tMXibqq5XPRGSdxfrNqCPgJRk3IYtvu5aCQVutZN9gw";

const ALLOWED_CATEGORIES = new Set(["bug", "feature", "other"]);

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

async function writeToSupabase(record) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/feedback`, {
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
      console.log(`SUPABASE_FEEDBACK_FAILED: ${res.status} ${text}`);
    }
    return res.ok;
  } catch (e) {
    console.log(`SUPABASE_FEEDBACK_ERROR: ${e.message}`);
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

  const { message, category, email, page } = req.body || {};

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "message is required" });
  }

  if (message.length > 2000) {
    return res.status(400).json({ error: "message must be ≤2000 characters" });
  }

  const cleanCategory = ALLOWED_CATEGORIES.has(category) ? category : "other";
  const cleanEmail = email && isValidEmail(email) ? email.trim().toLowerCase() : null;

  const record = {
    message: message.trim().slice(0, 2000),
    category: cleanCategory,
    email: cleanEmail,
    page_path: typeof page === "string" ? page.slice(0, 500) : null,
  };

  console.log(`FEEDBACK_RECEIVED: ${cleanCategory} | ${record.message.slice(0, 80)}${record.message.length > 80 ? "..." : ""}`);

  await writeToSupabase(record);

  return res.status(200).json({ success: true, message: "Thank you for your feedback!" });
}
