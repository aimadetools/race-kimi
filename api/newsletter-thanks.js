// /api/newsletter-thanks.js — Send a post-launch thank-you email to newsletter subscribers
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

function thanksEmailHtml({ upvotes, ranking, comments }) {
  const upvotesText = upvotes ? `<strong>${upvotes} upvotes</strong>` : "amazing support";
  const rankingText = ranking ? `<strong>#${ranking} Product of the Day</strong>` : "a strong showing";
  const commentsText = comments ? `${comments} comments` : "dozens of comments";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you — SchemaLens</title>
  <style>
    body { margin: 0; padding: 0; background: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #e5e5e5; }
    .logo { font-size: 1.5rem; font-weight: 700; color: #6366f1; margin-bottom: 24px; }
    h1 { font-size: 1.3rem; font-weight: 600; margin-bottom: 16px; color: #f5f5f5; }
    h2 { font-size: 1rem; font-weight: 600; margin-top: 24px; margin-bottom: 8px; color: #f5f5f5; }
    p { font-size: 0.95rem; line-height: 1.6; color: #a1a1aa; margin-bottom: 16px; }
    ul { padding-left: 20px; color: #a1a1aa; }
    li { margin-bottom: 8px; line-height: 1.5; }
    .cta { display: inline-block; padding: 12px 24px; background: #6366f1; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 16px 0; }
    .cta-secondary { display: inline-block; padding: 10px 20px; background: transparent; color: #a1a1aa; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 8px 0; border: 1px solid #27272a; }
    .highlight { background: #18181b; border-left: 3px solid #22c55e; padding: 12px 16px; margin: 16px 0; border-radius: 0 6px 6px 0; }
    .highlight p { margin: 0; font-size: 0.9rem; }
    .stats { display: flex; gap: 16px; margin: 16px 0; flex-wrap: wrap; }
    .stat { background: #18181b; padding: 12px 16px; border-radius: 8px; flex: 1; min-width: 120px; text-align: center; }
    .stat-number { font-size: 1.25rem; font-weight: 700; color: #f5f5f5; }
    .stat-label { font-size: 0.8rem; color: #71717a; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #27272a; font-size: 0.8rem; color: #71717a; }
    .footer a { color: #a1a1aa; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">SchemaLens</div>
    <h1>You helped make yesterday incredible. Thank you. 🙏</h1>
    <p>SchemaLens launched on Product Hunt yesterday, and the response was beyond anything we expected.</p>

    <div class="stats">
      <div class="stat"><div class="stat-number">${upvotes || '—'}</div><div class="stat-label">Upvotes</div></div>
      <div class="stat"><div class="stat-number">${ranking || '—'}</div><div class="stat-label">Day Rank</div></div>
      <div class="stat"><div class="stat-number">${comments || '—'}</div><div class="stat-label">Comments</div></div>
    </div>

    <div class="highlight">
      <p>Because of your upvotes, comments, and shares, SchemaLens finished ${rankingText} with ${upvotesText} and ${commentsText}.</p>
    </div>

    <h2>What's next</h2>
    <p>Launch day is just the beginning. Here's what we're shipping in the next 30 days:</p>
    <ul>
      <li><strong>Live database connections</strong> — diff directly against PostgreSQL and MySQL without dumping SQL</li>
      <li><strong>Team workspaces</strong> — shared diffs, comments, and approvals for engineering teams</li>
      <li><strong>Migration scheduling</strong> — queue migrations and run them at off-peak hours with rollback ready</li>
      <li><strong>More dialects</strong> — CockroachDB, ClickHouse, and Snowflake native support</li>
    </ul>

    <h2>Lifetime Pro is still $39</h2>
    <p>The launch deal is still live for a few more days. Lifetime Pro for $39 once — no subscription, no recurring charges, all future updates included.</p>
    <a href="https://schemalens.tech/pricing.html" class="cta">Get Lifetime Pro</a>

    <h2>One more thing</h2>
    <p>If you have 30 seconds, leaving a review on Product Hunt helps us reach even more developers. Honest feedback — good or bad — is what makes the product better.</p>
    <a href="https://schemalens.tech/product-hunt.html" class="cta-secondary">Leave a review</a>

    <p style="margin-top:24px;">Thank you for being part of this. Seriously. Every upvote, every comment, every share — it all matters.</p>
    <p>— SchemaLens</p>

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
      notice: "SUPABASE_SERVICE_ROLE_KEY not configured. Set it in Vercel env vars to activate thank-you emails.",
    }));
    return;
  }

  const dryRun = req.query?.dry === "true" || req.body?.dry === true;
  const upvotes = req.query?.upvotes || req.body?.upvotes || "";
  const ranking = req.query?.ranking || req.body?.ranking || "";
  const comments = req.query?.comments || req.body?.comments || "";

  const results = { sent: [], skipped: [], errors: [] };
  let total = 0;

  try {
    // Fetch subscribers who received the launch announcement but haven't received the thank-you
    const candidates = await fetchSupabase(
      `newsletter_subscribers?launch_announcement_sent_at=not.is.null&thank_you_sent_at=is.null&unsubscribed_at=is.null&select=*`
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
          subject: "Thank you — SchemaLens Product Hunt launch results inside 🚀",
          html: thanksEmailHtml({ upvotes, ranking, comments }),
        });
        await patchSupabase("newsletter_subscribers", sub.id, { thank_you_sent_at: new Date().toISOString() });
        results.sent.push({ email: sub.email, messageId: id });
        total++;
        console.log(`THANKS_EMAIL_SENT: ${sub.email} id=${id}`);
      } catch (err) {
        results.errors.push({ email: sub.email, error: err.message });
        console.error(`THANKS_EMAIL_ERROR: ${sub.email} ${err.message}`);
      }
    }

    res.writeHead(200, headers);
    res.end(JSON.stringify({
      results,
      total,
      dryRun,
      configured,
      candidateCount: candidates.length,
      upvotes,
      ranking,
      comments,
    }));
  } catch (err) {
    console.error("THANKS_CAMPAIGN_ERROR:", err.message);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ error: err.message, configured }));
  }
}
