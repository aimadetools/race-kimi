// /api/newsletter-drip.js — Send drip campaign emails to newsletter subscribers
// Trigger via GET/POST with x-drip-token header.
// Drip schedule:
//   Day 0: Welcome (sent by /api/newsletter-welcome.js via /api/subscribe.js)
//   Day 1: Drip 1 — "3 schema mistakes that cost teams hours"
//   Day 3: Drip 2 — "The 2-minute schema review habit"
//
// Required env vars:
//   SUPABASE_SERVICE_ROLE_KEY — to read/update subscriber state
//   EMAIL_API_KEY — Resend API key
//   EMAIL_FROM — sender address (default: hello@schemalens.tech)
//   DRIP_TOKEN — secret token to authorize drip sends

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const EMAIL_API_KEY = process.env.EMAIL_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "hello@schemalens.tech";
const DRIP_TOKEN = process.env.DRIP_TOKEN;

function drip1EmailHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3 schema mistakes that cost teams hours</title>
  <style>
    body { margin: 0; padding: 0; background: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #e5e5e5; }
    .logo { font-size: 1.5rem; font-weight: 700; color: #6366f1; margin-bottom: 24px; }
    h1 { font-size: 1.25rem; font-weight: 600; margin-bottom: 16px; color: #f5f5f5; }
    h2 { font-size: 1rem; font-weight: 600; margin-top: 24px; margin-bottom: 8px; color: #f5f5f5; }
    p { font-size: 0.95rem; line-height: 1.6; color: #a1a1aa; margin-bottom: 16px; }
    ul { padding-left: 20px; color: #a1a1aa; }
    li { margin-bottom: 8px; line-height: 1.5; }
    .cta { display: inline-block; padding: 12px 24px; background: #6366f1; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 16px 0; }
    .tip { background: #18181b; border-left: 3px solid #6366f1; padding: 12px 16px; margin: 16px 0; border-radius: 0 6px 6px 0; }
    .tip p { margin: 0; font-size: 0.9rem; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #27272a; font-size: 0.8rem; color: #71717a; }
    .footer a { color: #a1a1aa; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">SchemaLens</div>
    <h1>3 schema mistakes that cost teams hours every week</h1>
    <p>Database schema changes are the #1 cause of unplanned downtime. Here are three mistakes I see teams make over and over — and how to avoid them.</p>

    <h2>1. Renaming a column in-place</h2>
    <p>Running <code style="background:#27272a;padding:2px 4px;border-radius:4px;color:#e5e5e5;">ALTER TABLE users RENAME COLUMN email TO email_address</code> seems harmless. But if you have views, triggers, or application code referencing the old name, everything breaks at once.</p>
    <div class="tip">
      <p><strong>Safer path:</strong> Add the new column, backfill data, update code references, then drop the old column in a later deploy.</p>
    </div>

    <h2>2. Adding <code style="background:#27272a;padding:2px 4px;border-radius:4px;color:#e5e5e5;">NOT NULL</code> without a default</h2>
    <p>On large tables, adding a NOT NULL constraint without a DEFAULT value forces a full table scan and blocks writes. In PostgreSQL this can lock the table for minutes or hours.</p>
    <div class="tip">
      <p><strong>Safer path:</strong> Add the column as nullable, backfill with a script, then add the NOT NULL constraint in a separate migration.</p>
    </div>

    <h2>3. Dropping a table before checking dependencies</h2>
    <p>Foreign keys, views, and stored procedures can all depend on a table you think is unused. One DROP TABLE can cascade into a cascade of failures.</p>
    <div class="tip">
      <p><strong>Safer path:</strong> Search your codebase for references, check information_schema for dependencies, and rename the table first to see if anything breaks.</p>
    </div>

    <p>These patterns are why we built SchemaLens — to surface every dependency and change before it hits production.</p>
    <a href="https://schemalens.tech/blog.html" class="cta">Read more migration guides</a>

    <div class="footer">
      <p>You received this because you subscribed at <a href="https://schemalens.tech">schemalens.tech</a>.</p>
      <p>SchemaLens — Compare SQL schemas and generate migrations in your browser.</p>
    </div>
  </div>
</body>
</html>`;
}

function drip2EmailHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The 2-minute schema review habit</title>
  <style>
    body { margin: 0; padding: 0; background: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #e5e5e5; }
    .logo { font-size: 1.5rem; font-weight: 700; color: #6366f1; margin-bottom: 24px; }
    h1 { font-size: 1.25rem; font-weight: 600; margin-bottom: 16px; color: #f5f5f5; }
    h2 { font-size: 1rem; font-weight: 600; margin-top: 24px; margin-bottom: 8px; color: #f5f5f5; }
    p { font-size: 0.95rem; line-height: 1.6; color: #a1a1aa; margin-bottom: 16px; }
    ul { padding-left: 20px; color: #a1a1aa; }
    li { margin-bottom: 8px; line-height: 1.5; }
    .cta { display: inline-block; padding: 12px 24px; background: #6366f1; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 16px 0; }
    .highlight { background: #18181b; border-left: 3px solid #22c55e; padding: 12px 16px; margin: 16px 0; border-radius: 0 6px 6px 0; }
    .highlight p { margin: 0; font-size: 0.9rem; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #27272a; font-size: 0.8rem; color: #71717a; }
    .footer a { color: #a1a1aa; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">SchemaLens</div>
    <h1>The 2-minute schema review habit that prevents outages</h1>
    <p>Most production database outages aren't caused by complex queries or hardware failures. They're caused by a schema change that looked simple in code review.</p>

    <h2>The habit</h2>
    <p>Before every deploy, paste your old and new schema into a diff tool. Look for these four things:</p>
    <ul>
      <li><strong>Destructive changes</strong> — columns or tables being dropped</li>
      <li><strong>Constraint additions</strong> — NOT NULL or UNIQUE on large tables</li>
      <li><strong>Type changes</strong> — widening or narrowing that could truncate data</li>
      <li><strong>Missing indexes</strong> — new foreign keys without backing indexes</li>
    </ul>

    <div class="highlight">
      <p><strong>It takes 2 minutes.</strong> That's less time than it takes to restart a failed deploy.</p>
    </div>

    <h2>How teams scale this</h2>
    <p>The best engineering teams don't rely on manual checks. They wire schema diffing into CI/CD so every migration is automatically validated before merge.</p>
    <p>SchemaLens generates the diff and migration script in seconds. You can paste it into a GitHub comment, Slack message, or PR description so the whole team sees what changed.</p>

    <a href="https://schemalens.tech/app.html" class="cta">Compare a schema now — free</a>

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

function getUtcDateDaysAgo(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  d.setUTCHours(0, 0, 0, 0);
  return d.toISOString();
}

function getUtcDateDaysAgoEnd(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  d.setUTCHours(23, 59, 59, 999);
  return d.toISOString();
}

export default async function handler(req, res) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-drip-token",
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

  const providedToken = req.headers["x-drip-token"] || req.query?.token;
  if (DRIP_TOKEN && providedToken !== DRIP_TOKEN) {
    res.writeHead(401, headers);
    res.end(JSON.stringify({ error: "Unauthorized" }));
    return;
  }

  const configured = {
    supabase: !!SUPABASE_SERVICE_ROLE_KEY,
    email: !!EMAIL_API_KEY,
    dripToken: !!DRIP_TOKEN,
  };

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    res.writeHead(200, headers);
    res.end(JSON.stringify({
      sent: [],
      skipped: [],
      errors: [],
      summary: { drip1: 0, drip2: 0, total: 0 },
      configured,
      notice: "SUPABASE_SERVICE_ROLE_KEY not configured. Set it in Vercel env vars to activate drip campaigns.",
    }));
    return;
  }

  const results = { sent: [], skipped: [], errors: [] };
  const summary = { drip1: 0, drip2: 0, total: 0 };

  try {
    // Drip 1: sent 1 day after subscribe (window: 1-2 days ago, not yet sent)
    const d1Start = getUtcDateDaysAgo(2);
    const d1End = getUtcDateDaysAgoEnd(1);
    const drip1Candidates = await fetchSupabase(
      `newsletter_subscribers?subscribed_at=gte.${d1Start}&subscribed_at=lte.${d1End}&drip_1_sent_at=is.null&unsubscribed_at=is.null&select=*`
    );

    for (const sub of drip1Candidates) {
      if (!EMAIL_API_KEY) {
        results.skipped.push({ email: sub.email, drip: 1, reason: "EMAIL_API_KEY not configured" });
        continue;
      }
      try {
        const id = await sendEmail({
          to: sub.email,
          subject: "3 schema mistakes that cost teams hours every week",
          html: drip1EmailHtml(),
        });
        await patchSupabase("newsletter_subscribers", sub.id, { drip_1_sent_at: new Date().toISOString() });
        results.sent.push({ email: sub.email, drip: 1, messageId: id });
        summary.drip1++;
        console.log(`DRIP_1_SENT: ${sub.email} id=${id}`);
      } catch (err) {
        results.errors.push({ email: sub.email, drip: 1, error: err.message });
        console.error(`DRIP_1_ERROR: ${sub.email} ${err.message}`);
      }
    }

    // Drip 2: sent 3 days after subscribe (window: 3-7 days ago, drip1 sent, drip2 not sent)
    const d2Start = getUtcDateDaysAgo(7);
    const d2End = getUtcDateDaysAgoEnd(3);
    const drip2Candidates = await fetchSupabase(
      `newsletter_subscribers?subscribed_at=gte.${d2Start}&subscribed_at=lte.${d2End}&drip_1_sent_at=not.is.null&drip_2_sent_at=is.null&unsubscribed_at=is.null&select=*`
    );

    for (const sub of drip2Candidates) {
      if (!EMAIL_API_KEY) {
        results.skipped.push({ email: sub.email, drip: 2, reason: "EMAIL_API_KEY not configured" });
        continue;
      }
      try {
        const id = await sendEmail({
          to: sub.email,
          subject: "The 2-minute schema review habit that prevents outages",
          html: drip2EmailHtml(),
        });
        await patchSupabase("newsletter_subscribers", sub.id, { drip_2_sent_at: new Date().toISOString() });
        results.sent.push({ email: sub.email, drip: 2, messageId: id });
        summary.drip2++;
        console.log(`DRIP_2_SENT: ${sub.email} id=${id}`);
      } catch (err) {
        results.errors.push({ email: sub.email, drip: 2, error: err.message });
        console.error(`DRIP_2_ERROR: ${sub.email} ${err.message}`);
      }
    }

    summary.total = summary.drip1 + summary.drip2;

    res.writeHead(200, headers);
    res.end(JSON.stringify({
      results,
      summary,
      configured,
      windows: {
        drip1: { start: d1Start, end: d1End },
        drip2: { start: d2Start, end: d2End },
      },
    }));
  } catch (err) {
    console.error("DRIP_CAMPAIGN_ERROR:", err.message);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ error: err.message, configured }));
  }
}
