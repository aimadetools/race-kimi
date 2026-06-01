// /api/newsletter-welcome.js — Send a welcome email to new newsletter subscribers
// Supports Resend by default. Set EMAIL_API_KEY and EMAIL_FROM in Vercel env vars.

const ALLOWED_ORIGINS = [
  "https://schemalens.tech",
  "https://www.schemalens.tech",
  "http://localhost:3000",
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

function welcomeEmailHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to SchemaLens</title>
  <style>
    body { margin: 0; padding: 0; background: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #e5e5e5; }
    .logo { font-size: 1.5rem; font-weight: 700; color: #6366f1; margin-bottom: 24px; }
    h1 { font-size: 1.25rem; font-weight: 600; margin-bottom: 16px; color: #f5f5f5; }
    p { font-size: 0.95rem; line-height: 1.6; color: #a1a1aa; margin-bottom: 16px; }
    .cta { display: inline-block; padding: 12px 24px; background: #6366f1; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 16px 0; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #27272a; font-size: 0.8rem; color: #71717a; }
    .footer a { color: #a1a1aa; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">SchemaLens</div>
    <h1>Welcome to Migration Mastery</h1>
    <p>You\'re enrolled in the free 7-day email course on database schema migrations. Over the next week, you\'ll get one actionable lesson per day covering zero-downtime patterns, breaking change detection, rollback strategies, and CI/CD integration.</p>
    <p><strong>Can\'t wait?</strong> You can read the complete guide right now:</p>
    <a href="https://schemalens.tech/migration-mastery-guide.html" class="cta">Read the Full Guide</a>
    <p style="margin-top:20px;">Here are three other ways to get started:</p>
    <ul>
      <li><a href="https://schemalens.tech/app.html" style="color:#818cf8;">Compare two schemas instantly</a> — paste your CREATE TABLE statements and see the diff.</li>
      <li><a href="https://schemalens.tech/tools/schema-diff-speed-challenge.html" style="color:#818cf8;">Take the Speed Challenge</a> — race the clock to spot schema changes and test your skills.</li>
      <li><a href="https://schemalens.tech/tools/schema-health-check.html" style="color:#818cf8;">Run a schema health check</a> — find missing indexes, unindexed foreign keys, and design issues.</li>
      <li><a href="https://schemalens.tech/migration-checklist.html" style="color:#818cf8;">Download the migration checklist</a> — 25 points to review before every deploy.</li>
    </ul>
    <div class="footer">
      <p>You received this because you subscribed at <a href="https://schemalens.tech">schemalens.tech</a>.</p>
      <p>SchemaLens — Compare SQL schemas and generate migrations in your browser.</p>
    </div>
  </div>
</body>
</html>`;
}

export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  const headers = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.writeHead(405, headers);
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const { email } = req.body || {};
  if (!email || !email.includes("@")) {
    res.writeHead(400, headers);
    res.end(JSON.stringify({ error: "Valid email is required" }));
    return;
  }

  const apiKey = process.env.EMAIL_API_KEY;
  const fromAddress = process.env.EMAIL_FROM || "hello@schemalens.tech";

  if (!apiKey) {
    // Graceful skip: log to stdout for Vercel logs, do not fail the subscription
    console.log(`NEWSLETTER_WELCOME_SKIP: No EMAIL_API_KEY configured for ${email}`);
    res.writeHead(200, headers);
    res.end(JSON.stringify({ sent: false, reason: "Email API key not configured" }));
    return;
  }

  try {
    // Default provider: Resend (https://resend.com)
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromAddress,
        to: email,
        subject: "Welcome to SchemaLens — here are 3 ways to get started",
        html: welcomeEmailHtml(),
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("NEWSLETTER_WELCOME_ERROR:", response.status, errorBody);
      res.writeHead(502, headers);
      res.end(JSON.stringify({ sent: false, error: "Email provider error" }));
      return;
    }

    const data = await response.json().catch(() => ({}));
    console.log(`NEWSLETTER_WELCOME_SENT: ${email} id=${data.id || "unknown"}`);
    res.writeHead(200, headers);
    res.end(JSON.stringify({ sent: true, id: data.id }));
  } catch (err) {
    console.error("NEWSLETTER_WELCOME_EXCEPTION:", err.message);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ sent: false, error: "Internal error" }));
  }
}
