// /api/newsletter-drip.js — Migration Mastery 7-Day Drip Campaign
// Trigger via GET/POST with x-drip-token header.
// Drip schedule:
//   Day 0: Welcome (sent by /api/newsletter-welcome.js via /api/subscribe.js)
//   Day 1: Drip 1 — "The 5-Minute Schema Review"
//   Day 2: Drip 2 — "Zero-Downtime Migration Patterns"
//   Day 3: Drip 3 — "The 12 Changes That Break Production"
//   Day 4: Drip 4 — "Rollback Strategies That Work"
//   Day 5: Drip 5 — "CI/CD Schema Diff Integration"
//   Day 6: Drip 6 — "Team Workflows at Scale"
//   Day 7: Drip 7 — "Your Migration Safety Checklist"
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

function baseStyles() {
  return `<style>
    body { margin: 0; padding: 0; background: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #e5e5e5; }
    .logo { font-size: 1.5rem; font-weight: 700; color: #6366f1; margin-bottom: 24px; }
    h1 { font-size: 1.25rem; font-weight: 600; margin-bottom: 16px; color: #f5f5f5; }
    h2 { font-size: 1rem; font-weight: 600; margin-top: 24px; margin-bottom: 8px; color: #f5f5f5; }
    p { font-size: 0.95rem; line-height: 1.6; color: #a1a1aa; margin-bottom: 16px; }
    ul, ol { padding-left: 20px; color: #a1a1aa; }
    li { margin-bottom: 8px; line-height: 1.5; }
    .cta { display: inline-block; padding: 12px 24px; background: #6366f1; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 16px 0; }
    .tip { background: #18181b; border-left: 3px solid #6366f1; padding: 12px 16px; margin: 16px 0; border-radius: 0 6px 6px 0; }
    .tip p { margin: 0; font-size: 0.9rem; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #27272a; font-size: 0.8rem; color: #71717a; }
    .footer a { color: #a1a1aa; text-decoration: underline; }
    code { background: #27272a; padding: 2px 6px; border-radius: 4px; color: #e5e5e5; font-size: 0.9rem; }
  </style>`;
}

function dripEmail({ day, title, body, ctaText, ctaUrl }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${baseStyles()}
</head>
<body>
  <div class="container">
    <div class="logo">SchemaLens — Migration Mastery</div>
    <div style="font-size:0.8rem;color:#71717a;margin-bottom:8px;">Day ${day} of 7</div>
    <h1>${title}</h1>
    ${body}
    <a href="${ctaUrl}" class="cta">${ctaText}</a>
    <p style="font-size:0.9rem;color:#71717a;">Prefer to read offline? <a href="https://schemalens.tech/migration-mastery-guide.html#day${day}" style="color:#a1a1aa;">View this lesson in the complete guide</a>.</p>
    <div class="footer">
      <p>You received this because you subscribed to Migration Mastery at <a href="https://schemalens.tech">schemalens.tech</a>.</p>
      <p><a href="https://schemalens.tech/migration-mastery-guide.html">View the full guide</a> · <a href="https://schemalens.tech">SchemaLens</a></p>
    </div>
  </div>
</body>
</html>`;
}

function drip1EmailHtml() {
  return dripEmail({
    day: 1,
    title: "The 5-Minute Schema Review",
    body: `<p>Before every deploy, spend 5 minutes reviewing your schema diff. This simple habit prevents 90% of migration-related outages.</p>

<h2>The Checklist</h2>
<ol>
<li><strong>Destructive changes</strong> — Are any columns or tables being dropped? Confirm nothing depends on them.</li>
<li><strong>Constraint additions</strong> — Are you adding NOT NULL or UNIQUE to large tables? These can lock tables.</li>
<li><strong>Type changes</strong> — Is a column being narrowed? This can truncate existing data.</li>
<li><strong>Missing indexes</strong> — Are new foreign keys created without backing indexes?</li>
<li><strong>Default values</strong> — Are new columns added without defaults?</li>
</ol>

<div class="tip">
<p><strong>Pro tip:</strong> Don't just review the migration file. Review the <em>semantic diff</em> between the old schema and the new schema. Migration files show intent; diffs show reality.</p>
</div>`,
    ctaText: "Run a Schema Review — Free",
    ctaUrl: "https://schemalens.tech/app.html?ref=drip1"
  });
}

function drip2EmailHtml() {
  return dripEmail({
    day: 2,
    title: "Zero-Downtime Migration Patterns",
    body: `<p>Not all schema changes require downtime. Understanding which changes are safe and which need special handling is the foundation of reliable deploys.</p>

<h2>Safe changes</h2>
<ul>
<li>Adding a new table</li>
<li>Adding a new column with a default value (PostgreSQL 11+)</li>
<li>Adding an index with CONCURRENTLY or ALGORITHM=INPLACE</li>
<li>Creating a new view or function</li>
</ul>

<h2>Unsafe changes</h2>
<ul>
<li>Dropping a column, table, or index</li>
<li>Adding NOT NULL without a default</li>
<li>Renaming a column or table</li>
<li>Changing a column type</li>
<li>Adding a unique constraint on a large table</li>
</ul>

<div class="tip">
<p><strong>The expand/contract pattern:</strong> Add the new structure while keeping the old one, migrate data and traffic gradually, then remove the old structure in a later deploy.</p>
</div>`,
    ctaText: "Read the Zero-Downtime Guide",
    ctaUrl: "https://schemalens.tech/zero-downtime-migration-guide.html?ref=drip2"
  });
}

function drip3EmailHtml() {
  return dripEmail({
    day: 3,
    title: "The 12 Changes That Break Production",
    body: `<p>After analyzing thousands of schema diffs, we've identified the changes that cause outages most often.</p>

<ol>
<li><strong>Dropping a column</strong> — Breaks views, triggers, and application code.</li>
<li><strong>Dropping a table</strong> — Cascades to foreign keys and views.</li>
<li><strong>Adding NOT NULL without a default</strong> — Locks the table during validation.</li>
<li><strong>Narrowing a column type</strong> — May truncate data silently.</li>
<li><strong>Changing a column type</strong> — Some conversions are lossy.</li>
<li><strong>Renaming a column</strong> — Breaks every query referencing it.</li>
<li><strong>Renaming a table</strong> — Breaks foreign keys and ORM mappings.</li>
<li><strong>Dropping an index</strong> — Causes query performance regressions.</li>
<li><strong>Dropping a foreign key</strong> — Removes referential integrity.</li>
<li><strong>Adding a unique constraint on existing data</strong> — Fails if duplicates exist.</li>
<li><strong>Changing a primary key</strong> — Requires table recreation in most databases.</li>
<li><strong>Removing a default value</strong> — Breaks INSERTs that relied on it.</li>
</ol>

<div class="tip">
<p><strong>Think you can spot them all?</strong> Test your skills with the <a href="https://schemalens.tech/tools/schema-diff-speed-challenge.html?ref=drip3" style="color:#818cf8;">Schema Diff Speed Challenge</a> — a 3-round game where you race the clock to find schema changes manually, then see how SchemaLens finds them instantly.</p>
</div>`,
    ctaText: "Test Your Knowledge — Free Quiz",
    ctaUrl: "https://schemalens.tech/tools/schema-breaking-change-quiz.html?ref=drip3"
  });
}

function drip4EmailHtml() {
  return dripEmail({
    day: 4,
    title: "Rollback Strategies That Work",
    body: `<p>Every migration should have a rollback plan. But not all migrations can be rolled back cleanly.</p>

<h2>Reversible changes</h2>
<ul>
<li>Adding a column → drop the column</li>
<li>Adding an index → drop the index</li>
<li>Adding a table → drop the table</li>
<li>Adding a default → remove the default</li>
</ul>

<h2>Irreversible changes</h2>
<ul>
<li>Dropping a column (data is gone)</li>
<li>Dropping a table (data is gone)</li>
<li>Narrowing a column type (truncated data cannot be restored)</li>
</ul>

<div class="tip">
<p><strong>The rollback script rule:</strong> Before running any migration in production, write the rollback script first. If you can't write one, reconsider the migration.</p>
</div>`,
    ctaText: "Generate Rollback Scripts — Pro",
    ctaUrl: "https://schemalens.tech/pricing.html?ref=drip4"
  });
}

function drip5EmailHtml() {
  return dripEmail({
    day: 5,
    title: "CI/CD Schema Diff Integration",
    body: `<p>The best time to catch a bad migration is before it merges. Automating schema diff in your CI pipeline ensures every change is reviewed.</p>

<h2>The workflow</h2>
<ol>
<li>Dump the schema from your main branch</li>
<li>Dump the schema from the PR branch</li>
<li>Run a diff tool to compare them</li>
<li>Post the diff as a PR comment</li>
</ol>

<p>SchemaLens provides a GitHub Action that does this automatically — it generates a visual diff and posts it as a comment on every pull request.</p>`,
    ctaText: "Set Up the GitHub Action",
    ctaUrl: "https://schemalens.tech/github-action.html?ref=drip5"
  });
}

function drip6EmailHtml() {
  return dripEmail({
    day: 6,
    title: "Team Workflows at Scale",
    body: `<p>As teams grow, schema reviews become a bottleneck. The solution is to make them faster and more consistent.</p>

<h2>The schema change RFC</h2>
<p>For large changes, write a one-paragraph RFC answering:</p>
<ul>
<li>What is changing and why?</li>
<li>What is the rollback plan?</li>
<li>Are there breaking changes for consumers?</li>
<li>What is the expected performance impact?</li>
</ul>

<h2>PR templates</h2>
<p>Add a schema review section to your PR template so reviewers know what to check.</p>

<div class="tip">
<p><strong>Assign a "schema owner"</strong> for each service. This person reviews all schema changes for that domain.</p>
</div>`,
    ctaText: "Book a Team Schema Audit",
    ctaUrl: "https://schemalens.tech/team-schema-audit.html?ref=drip6"
  });
}

function drip7EmailHtml() {
  return dripEmail({
    day: 7,
    title: "Your Migration Safety Checklist",
    body: `<p>Print this checklist and use it before every deploy. It takes 2 minutes and prevents hours of incident response.</p>

<h2>Pre-deploy</h2>
<ul>
<li>Run the schema diff and review all changes</li>
<li>Identify destructive changes</li>
<li>Check for missing indexes on new foreign keys</li>
<li>Verify new columns have appropriate defaults</li>
<li>Confirm the migration won't lock large tables</li>
<li>Test on a copy of production data</li>
<li>Write the rollback script</li>
</ul>

<h2>Post-deploy</h2>
<ul>
<li>Monitor error rates for 30 minutes</li>
<li>Check slow query logs</li>
<li>Verify health checks pass</li>
<li>Confirm rollback script is ready</li>
</ul>

<p><strong>Congratulations on completing Migration Mastery!</strong> The next step is to make this process effortless. SchemaLens Pro automates diffing, risk scoring, and migration generation.</p>`,
    ctaText: "Get SchemaLens Pro — $39 Lifetime",
    ctaUrl: "https://schemalens.tech/pricing.html?ref=drip7"
  });
}

const DRIP_EMAILS = [
  { day: 1, field: "drip_1_sent_at", subject: "Day 1: The 5-Minute Schema Review", htmlFn: drip1EmailHtml },
  { day: 2, field: "drip_2_sent_at", subject: "Day 2: Zero-Downtime Migration Patterns", htmlFn: drip2EmailHtml },
  { day: 3, field: "drip_3_sent_at", subject: "Day 3: The 12 Changes That Break Production", htmlFn: drip3EmailHtml },
  { day: 4, field: "drip_4_sent_at", subject: "Day 4: Rollback Strategies That Work", htmlFn: drip4EmailHtml },
  { day: 5, field: "drip_5_sent_at", subject: "Day 5: CI/CD Schema Diff Integration", htmlFn: drip5EmailHtml },
  { day: 6, field: "drip_6_sent_at", subject: "Day 6: Team Workflows at Scale", htmlFn: drip6EmailHtml },
  { day: 7, field: "drip_7_sent_at", subject: "Day 7: Your Migration Safety Checklist", htmlFn: drip7EmailHtml },
];

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
      summary: {},
      configured,
      notice: "SUPABASE_SERVICE_ROLE_KEY not configured. Set it in Vercel env vars to activate drip campaigns.",
    }));
    return;
  }

  const results = { sent: [], skipped: [], errors: [] };
  const summary = {};

  for (const drip of DRIP_EMAILS) {
    summary[`drip${drip.day}`] = 0;
    const dayStart = getUtcDateDaysAgo(drip.day + 1);
    const dayEnd = getUtcDateDaysAgoEnd(drip.day);

    // Build query: subscribed within the window, this drip not sent, not unsubscribed
    // Also ensure all previous drips were sent (sequential delivery)
    const prevFields = DRIP_EMAILS.filter(d => d.day < drip.day).map(d => `${d.field}=not.is.null`).join(",");
    const prevFilter = prevFields ? `&${prevFields.replace(/,/g, "&")}` : "";

    const query = `newsletter_subscribers?subscribed_at=gte.${dayStart}&subscribed_at=lte.${dayEnd}&${drip.field}=is.null&unsubscribed_at=is.null${prevFilter}&select=*`;

    let candidates = [];
    try {
      candidates = await fetchSupabase(query);
    } catch (err) {
      // If column doesn't exist (e.g., drip_3+ not yet added to schema), log and skip
      if (err.message.includes("42703") || err.message.includes("column") || err.message.includes("not exist")) {
        results.skipped.push({ drip: drip.day, reason: `Schema column ${drip.field} may not exist yet` });
        console.log(`DRIP_${drip.day}_SKIPPED: column ${drip.field} not found in schema`);
        continue;
      }
      throw err;
    }

    for (const sub of candidates) {
      if (!EMAIL_API_KEY) {
        results.skipped.push({ email: sub.email, drip: drip.day, reason: "EMAIL_API_KEY not configured" });
        continue;
      }
      try {
        const id = await sendEmail({
          to: sub.email,
          subject: drip.subject,
          html: drip.htmlFn(),
        });
        await patchSupabase("newsletter_subscribers", sub.id, { [drip.field]: new Date().toISOString() });
        results.sent.push({ email: sub.email, drip: drip.day, messageId: id });
        summary[`drip${drip.day}`]++;
        console.log(`DRIP_${drip.day}_SENT: ${sub.email} id=${id}`);
      } catch (err) {
        results.errors.push({ email: sub.email, drip: drip.day, error: err.message });
        console.error(`DRIP_${drip.day}_ERROR: ${sub.email} ${err.message}`);
      }
    }
  }

  const totalSent = Object.values(summary).reduce((a, b) => a + b, 0);

  res.writeHead(200, headers);
  res.end(JSON.stringify({
    results,
    summary: { ...summary, total: totalSent },
    configured,
  }));
}
