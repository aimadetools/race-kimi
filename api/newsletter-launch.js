// /api/newsletter-launch.js — Send a one-time launch announcement to all newsletter subscribers
// Trigger via GET/POST with x-launch-token header.
//
// Required env vars:
//   SUPABASE_SERVICE_ROLE_KEY — to read/update subscriber state
//   EMAIL_API_KEY — Resend API key
//   EMAIL_FROM — sender address (default: hello@schemalens.tech)
//   LAUNCH_TOKEN — secret token to authorize broadcast sends

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const EMAIL_API_KEY = process.env.EMAIL_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "hello@schemalens.tech";
const LAUNCH_TOKEN = process.env.LAUNCH_TOKEN;

function launchEmailHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SchemaLens is live</title>
  <style>
    body { margin: 0; padding: 0; background: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #e5e5e5; }
    .logo { font-size: 1.5rem; font-weight: 700; color: #6366f1; margin-bottom: 24px; }
    h1 { font-size: 1.35rem; font-weight: 600; margin-bottom: 16px; color: #f5f5f5; }
    h2 { font-size: 1rem; font-weight: 600; margin-top: 24px; margin-bottom: 8px; color: #f5f5f5; }
    p { font-size: 0.95rem; line-height: 1.6; color: #a1a1aa; margin-bottom: 16px; }
    ul { padding-left: 20px; color: #a1a1aa; }
    li { margin-bottom: 8px; line-height: 1.5; }
    .cta { display: inline-block; padding: 12px 24px; background: #6366f1; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 16px 0; }
    .cta-secondary { display: inline-block; padding: 10px 20px; background: transparent; color: #a1a1aa; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 8px 0; border: 1px solid #27272a; }
    .highlight { background: #18181b; border-left: 3px solid #22c55e; padding: 12px 16px; margin: 16px 0; border-radius: 0 6px 6px 0; }
    .highlight p { margin: 0; font-size: 0.9rem; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #27272a; font-size: 0.8rem; color: #71717a; }
    .footer a { color: #a1a1aa; text-decoration: underline; }
    .stats { display: flex; gap: 16px; margin: 16px 0; flex-wrap: wrap; }
    .stat { background: #18181b; padding: 12px 16px; border-radius: 8px; flex: 1; min-width: 120px; }
    .stat-number { font-size: 1.25rem; font-weight: 700; color: #f5f5f5; }
    .stat-label { font-size: 0.8rem; color: #71717a; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">SchemaLens</div>
    <h1>SchemaLens is officially live 🚀</h1>
    <p>We built SchemaLens to make database schema changes safer — and today we're launching it to the world.</p>

    <div class="highlight">
      <p><strong>What is SchemaLens?</strong> Paste two SQL CREATE TABLE dumps and get an instant visual diff plus a generated migration script. Supports PostgreSQL, MySQL, SQL Server, SQLite, and Oracle.</p>
    </div>

    <h2>What's included</h2>
    <ul>
      <li><strong>42 blog posts</strong> on schema migration best practices</li>
      <li><strong>17 free micro-tools</strong> — SQL formatter, JOIN visualizer, schema health check, test data generator, and more</li>
      <li><strong>CLI tool</strong> — run <code style="background:#27272a;padding:2px 4px;border-radius:4px;color:#e5e5e5;">npx schemalens-cli</code> in your terminal</li>
      <li><strong>Chrome extension</strong> — diff GitHub .sql files in one click</li>
      <li><strong>CI/CD integration</strong> — GitHub Actions, GitLab CI, Bitbucket Pipelines</li>
    </ul>

    <div class="stats">
      <div class="stat"><div class="stat-number">5</div><div class="stat-label">SQL dialects</div></div>
      <div class="stat"><div class="stat-number">17</div><div class="stat-label">Free tools</div></div>
      <div class="stat"><div class="stat-number">42</div><div class="stat-label">Migration guides</div></div>
    </div>

    <h2>Launching on Product Hunt today</h2>
    <p>We're live on Product Hunt with a 30% off Pro launch discount. If you find SchemaLens useful, an upvote would mean the world to us.</p>
    <a href="https://schemalens.tech/product-hunt.html" class="cta">Support us on Product Hunt</a>

    <h2>Try it free — no signup required</h2>
    <p>Paste two schemas and diff them in 10 seconds. Everything runs client-side; your data never leaves the browser.</p>
    <a href="https://schemalens.tech/app.html" class="cta">Open SchemaLens</a>

    <p style="margin-top:24px;">Thanks for being part of the community. If you have feedback, just reply to this email — I read every one.</p>

    <div class="footer">
      <p>You received this because you subscribed at <a href="https://schemalens.tech">schemalens.tech</a>.</p>
      <p>SchemaLens — Compare SQL schemas and generate migrations in your browser.</p>
    </div>
  </div>
</body>
</html>`;
}

async function fetchSupabase(query) {
  const url = `${SUPABASE_URL}/rest/v1/${query}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const res = await fetch(url, {
    headers: {
      "apikey": SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    signal: controller.signal,
  });
  clearTimeout(timeout);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Supabase ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

async function patchSupabase(table, id, fields) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "apikey": SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal",
    },
    body: JSON.stringify(fields),
    signal: controller.signal,
  });
  clearTimeout(timeout);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Supabase patch ${res.status}: ${text.slice(0, 200)}`);
  }
  return true;
}

async function sendEmail({ to, subject, html }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${EMAIL_API_KEY}`,
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend ${res.status}: ${text}`);
  }
  const data = await res.json().catch(() => ({}));
  return data.id || "unknown";
}

export default async function handler(req, res) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-launch-token",
  };

  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (req.method !== "GET" && req.method !== "POST") {
    res.writeHead(405, headers);
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const providedToken = req.headers["x-launch-token"] || req.query?.token;
  if (LAUNCH_TOKEN && providedToken !== LAUNCH_TOKEN) {
    res.writeHead(401, headers);
    res.end(JSON.stringify({ error: "Unauthorized" }));
    return;
  }

  const configured = {
    supabase: !!SUPABASE_SERVICE_ROLE_KEY,
    email: !!EMAIL_API_KEY,
    launchToken: !!LAUNCH_TOKEN,
  };

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    res.writeHead(200, headers);
    res.end(JSON.stringify({
      sent: [],
      skipped: [],
      errors: [],
      total: 0,
      configured,
      notice: "SUPABASE_SERVICE_ROLE_KEY not configured. Set it in Vercel env vars to activate launch announcements.",
    }));
    return;
  }

  // Support dry-run mode
  const dryRun = req.query?.dry === "true" || req.body?.dry === true;

  const results = { sent: [], skipped: [], errors: [] };
  let total = 0;

  try {
    // Fetch all subscribers who haven't received the launch announcement and haven't unsubscribed
    const candidates = await fetchSupabase(
      `newsletter_subscribers?launch_announcement_sent_at=is.null&unsubscribed_at=is.null&select=*`
    );

    for (const sub of candidates) {
      if (dryRun) {
        results.skipped.push({ email: sub.email, reason: "dry-run" });
        continue;
      }
      if (!EMAIL_API_KEY) {
        results.skipped.push({ email: sub.email, reason: "EMAIL_API_KEY not configured" });
        continue;
      }
      try {
        const id = await sendEmail({
          to: sub.email,
          subject: "SchemaLens is live 🚀 — Product Hunt + 17 free tools",
          html: launchEmailHtml(),
        });
        await patchSupabase("newsletter_subscribers", sub.id, { launch_announcement_sent_at: new Date().toISOString() });
        results.sent.push({ email: sub.email, messageId: id });
        total++;
        console.log(`LAUNCH_EMAIL_SENT: ${sub.email} id=${id}`);
      } catch (err) {
        results.errors.push({ email: sub.email, error: err.message });
        console.error(`LAUNCH_EMAIL_ERROR: ${sub.email} ${err.message}`);
      }
    }

    res.writeHead(200, headers);
    res.end(JSON.stringify({
      results,
      total,
      dryRun,
      configured,
      candidateCount: candidates.length,
    }));
  } catch (err) {
    console.error("LAUNCH_CAMPAIGN_ERROR:", err.message);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ error: err.message, configured }));
  }
}
