// /api/trial-welcome.js — Send an instant welcome email when a user activates the 24-hour Pro trial
// Triggered from app.html when tryProTrial() is called with an email address.
//
// Required env vars:
//   EMAIL_API_KEY — Resend API key
//   EMAIL_FROM — sender address (default: hello@schemalens.tech)

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

function trialWelcomeEmailHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Pro trial is active — here's how to get the most out of it</title>
  <style>
    body { margin: 0; padding: 0; background: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #e5e5e5; }
    .logo { font-size: 1.5rem; font-weight: 700; color: #6366f1; margin-bottom: 24px; }
    h1 { font-size: 1.25rem; font-weight: 600; margin-bottom: 16px; color: #f5f5f5; }
    h2 { font-size: 1rem; font-weight: 600; margin-top: 24px; margin-bottom: 8px; color: #f5f5f5; }
    p { font-size: 0.95rem; line-height: 1.6; color: #a1a1aa; margin-bottom: 16px; }
    ul { padding-left: 20px; color: #a1a1aa; }
    li { margin-bottom: 10px; line-height: 1.5; }
    .cta { display: inline-block; padding: 12px 24px; background: #6366f1; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 16px 0; }
    .deal { background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1)); border: 1px solid #6366f1; border-radius: 8px; padding: 16px; margin: 20px 0; }
    .deal h2 { margin-top: 0; color: #818cf8; }
    .deal p { margin-bottom: 0; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #27272a; font-size: 0.8rem; color: #71717a; }
    .footer a { color: #a1a1aa; text-decoration: underline; }
    code { background: #27272a; padding: 2px 6px; border-radius: 4px; color: #e5e5e5; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">SchemaLens</div>
    <h1>🚀 Your Pro trial is active for 24 hours</h1>
    <p>You now have full access to SchemaLens Pro. Here are the fastest ways to get value before your trial expires:</p>

    <h2>1. Export your diff as Markdown</h2>
    <p>After comparing schemas, click <strong>Export → Markdown</strong>. Paste the output directly into a GitHub PR description or Slack message. Your team will see exactly what changed — no screenshots needed.</p>

    <h2>2. Copy the full migration script</h2>
    <p>Hit the <strong>Copy</strong> button on the migration panel to grab every <code>ALTER TABLE</code> statement. No more hand-writing migrations or worrying about missed columns.</p>

    <h2>3. Check for breaking changes</h2>
    <p>Look for the red <strong>Breaking</strong> badges in your diff. These flag changes most likely to cause production incidents — dropped columns, <code>NOT NULL</code> without defaults, narrowed types, and missing indexes.</p>

    <h2>4. Share a diff link</h2>
    <p>Click <strong>Share</strong> to generate a URL with your diff encoded. Send it to a teammate for async review — they don't need an account or a license to view it.</p>

    <div class="deal">
      <h2>🎁 Founder Deal: 30% off Pro if you upgrade in the next 24 hours</h2>
      <p>As an early user, you can lock in Pro at <strong>$8/mo</strong> (instead of $12/mo) or <strong>$69/yr</strong> (instead of $99/yr) — forever. This deal disappears when your trial ends.<br><br>
      <a href="https://gumroad.com/l/schemalens-pro" class="cta">Upgrade Now — 30% Off</a></p>
    </div>

    <p>Questions? Just reply to this email — I read every message personally.</p>

    <div class="footer">
      <p>You received this because you activated a Pro trial at <a href="https://schemalens.tech">schemalens.tech</a>.</p>
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
    console.log(`TRIAL_WELCOME_SKIP: No EMAIL_API_KEY configured for ${email}`);
    res.writeHead(200, headers);
    res.end(JSON.stringify({ sent: false, reason: "Email API key not configured" }));
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromAddress,
        to: email,
        subject: "Your Pro trial is active — 4 ways to get value in the next 24 hours",
        html: trialWelcomeEmailHtml(),
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("TRIAL_WELCOME_ERROR:", response.status, errorBody);
      res.writeHead(502, headers);
      res.end(JSON.stringify({ sent: false, error: "Email provider error" }));
      return;
    }

    const data = await response.json().catch(() => ({}));
    console.log(`TRIAL_WELCOME_SENT: ${email} id=${data.id || "unknown"}`);
    res.writeHead(200, headers);
    res.end(JSON.stringify({ sent: true, id: data.id }));
  } catch (err) {
    console.error("TRIAL_WELCOME_EXCEPTION:", err.message);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ sent: false, error: "Internal error" }));
  }
}
