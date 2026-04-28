/**
 * Newsletter subscription endpoint
 * POST /api/subscribe
 * Body: { email: string, source?: string }
 */

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZndkd3d2dmNkdHJlZHVuY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjIyMTAsImV4cCI6MjA5MjMzODIxMH0.tMXibqq5XPRGSdxfrNqCPgJRk3IYtvu5aCQVutZN9gw";

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

async function writeToSupabase(record) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
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
      console.log(`SUPABASE_SUBSCRIBE_FAILED: ${res.status} ${text}`);
    }
    return res.ok;
  } catch (e) {
    console.log(`SUPABASE_SUBSCRIBE_ERROR: ${e.message}`);
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

  const { email, source } = req.body || {};

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const record = {
    email: email.trim().toLowerCase(),
    source_page: typeof source === "string" ? source.slice(0, 200) : null,
  };

  // Log to stdout for Vercel log collection
  console.log(`NEWSLETTER_SUBSCRIBE: ${record.email} from ${record.source_page || "unknown"}`);

  // Async write to Supabase — don't block client
  await writeToSupabase(record);

  // Fire welcome email asynchronously — never block subscription response
  (async () => {
    try {
      const proto = req.headers["x-forwarded-proto"] || "https";
      const host = req.headers.host || "schemalens.tech";
      const welcomeUrl = `${proto}://${host}/api/newsletter-welcome`;
      await fetch(welcomeUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: record.email }),
      });
    } catch (e) {
      console.log(`WELCOME_EMAIL_ERROR: ${e.message}`);
    }
  })();

  return res.status(200).json({ success: true, message: "Subscribed" });
}
