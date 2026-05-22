// /api/trial-drip.js — Send follow-up drip emails to Pro trial users
// Trigger via GET/POST with x-drip-token header.
// Drip schedule:
//   Hour 6:  "6 hours left — here is what you have unlocked"
//   Hour 18: "2 hours left + founder deal expires soon"
//
// Required env vars:
//   SUPABASE_SERVICE_ROLE_KEY — to read/update trial subscriber state
//   EMAIL_API_KEY — Resend API key
//   EMAIL_FROM — sender address (default: hello@schemalens.tech)
//   DRIP_TOKEN — secret token to authorize drip sends

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const EMAIL_API_KEY = process.env.EMAIL_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "hello@schemalens.tech";
const DRIP_TOKEN = process.env.DRIP_TOKEN;

function drip6HourEmailHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>6 hours left on your Pro trial</title>
  <style>
    body { margin: 0; padding: 0; background: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #e5e5e5; }
    .logo { font-size: 1.5rem; font-weight: 700; color: #6366f1; margin-bottom: 24px; }
    h1 { font-size: 1.25rem; font-weight: 600; margin-bottom: 16px; color: #f5f5f5; }
    p { font-size: 0.95rem; line-height: 1.6; color: #a1a1aa; margin-bottom: 16px; }
    ul { padding-left: 20px; color: #a1a1aa; }
    li { margin-bottom: 8px; line-height: 1.5; }
    .cta { display: inline-block; padding: 12px 24px; background: #6366f1; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 16px 0; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #27272a; font-size: 0.8rem; color: #71717a; }
    .footer a { color: #a1a1aa; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">SchemaLens</div>
    <h1>⏰ You have 6 hours left on your Pro trial</h1>
    <p>Your trial expires in about 6 hours. If you have not explored these Pro features yet, now is the time:</p>
    <ul>
      <li><strong>PDF Export</strong> — Generate a clean PDF report of your schema diff for compliance docs or audit trails.</li>
      <li><strong>JSON Export</strong> — Pipe structured diff output into your own tools or CI/CD pipelines.</li>
      <li><strong>Breaking Change Score</strong> — Every diff gets a 0–100 risk rating. Anything above 70 deserves a second look before deploy.</li>
      <li><strong>Shareable Links</strong> — Generate a permanent link to any diff. Perfect for async code reviews.</li>
    </ul>
    <p>These features are available right now in your browser — no install, no config.</p>
    <a href="https://schemalens.tech/app.html" class="cta">Open SchemaLens</a>
    <div class="footer">
      <p>You received this because you activated a Pro trial at <a href="https://schemalens.tech">schemalens.tech</a>.</p>
      <p>SchemaLens — Compare SQL schemas and generate migrations in your browser.</p>
    </div>
  </div>
</body>
</html>`;
}

function dripFinalEmailHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Pro trial expires in 2 hours — founder deal ends soon</title>
  <style>
    body { margin: 0; padding: 0; background: #0f0f0f; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 560px; margin: 0 auto; padding: 40px 24px; color: #e5e5e5; }
    .logo { font-size: 1.5rem; font-weight: 700; color: #6366f1; margin-bottom: 24px; }
    h1 { font-size: 1.25rem; font-weight: 600; margin-bottom: 16px; color: #f5f5f5; }
    p { font-size: 0.95rem; line-height: 1.6; color: #a1a1aa; margin-bottom: 16px; }
    .cta { display: inline-block; padding: 12px 24px; background: #6366f1; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 500; margin: 16px 0; }
    .urgency { background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.35); border-radius: 8px; padding: 16px; margin: 20px 0; }
    .urgency p { margin-bottom: 0; color: #f5f5f5; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #27272a; font-size: 0.8rem; color: #71717a; }
    .footer a { color: #a1a1aa; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">SchemaLens</div>
    <h1>⏰ Your Pro trial expires in 2 hours</h1>
    <p>Your 24-hour Pro trial ends soon. If SchemaLens saved you even 10 minutes today, imagine what it will save you over the next month.</p>

    <div class="urgency">
      <p><strong>Your founder deal expires with your trial.</strong><br><br>
      Upgrade now to get Lifetime Pro for <strong>$39 once</strong> — forever.</p>
    </div>

    <a href="https://gumroad.com/l/schemalens-lifetime?wanted=true" class="cta">Get Lifetime Pro — $39</a>

    <p style="margin-top: 24px;">Not ready? No worries. The free tier is yours forever. You can always upgrade later at the regular price.</p>

    <div class="footer">
      <p>You received this because you activated a Pro trial at <a href="https://schemalens.tech">schemalens.tech</a>.</p>
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

function getUtcDateHoursAgo(hours) {
  const d = new Date();
  d.setUTCHours(d.getUTCHours() - hours);
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

  // Support single-email mode for immediate testing
  const { email, drip } = req.body || {};
  if (email && drip) {
    if (!EMAIL_API_KEY) {
      res.writeHead(200, headers);
      res.end(JSON.stringify({ sent: false, reason: "EMAIL_API_KEY not configured", configured }));
      return;
    }
    try {
      const subject = drip === "final"
        ? "Your Pro trial expires in 2 hours — founder deal ends soon"
        : "6 hours left on your Pro trial";
      const html = drip === "final" ? dripFinalEmailHtml() : drip6HourEmailHtml();
      const id = await sendEmail({ to: email, subject, html });
      res.writeHead(200, headers);
      res.end(JSON.stringify({ sent: true, messageId: id, drip, configured }));
    } catch (err) {
      res.writeHead(500, headers);
      res.end(JSON.stringify({ error: err.message, configured }));
    }
    return;
  }

  if (!SUPABASE_SERVICE_ROLE_KEY) {
    res.writeHead(200, headers);
    res.end(JSON.stringify({
      sent: [],
      skipped: [],
      errors: [],
      summary: { drip6: 0, dripFinal: 0, total: 0 },
      configured,
      notice: "SUPABASE_SERVICE_ROLE_KEY not configured. Set it in Vercel env vars to activate trial drip campaigns, or use single-email mode with {email, drip} in the body.",
    }));
    return;
  }

  const results = { sent: [], skipped: [], errors: [] };
  const summary = { drip6: 0, dripFinal: 0, total: 0 };

  try {
    // Drip 6-hour: sent ~6 hours after trial activation (window: 6-12 hours ago, not yet sent)
    const d6Start = getUtcDateHoursAgo(12);
    const d6End = getUtcDateHoursAgo(6);
    const drip6Candidates = await fetchSupabase(
      `newsletter_subscribers?subscribed_at=gte.${d6Start}&subscribed_at=lte.${d6End}&source_page=eq.pro_trial&trial_drip_6_sent_at=is.null&unsubscribed_at=is.null&select=*`
    );

    for (const sub of drip6Candidates) {
      if (!EMAIL_API_KEY) {
        results.skipped.push({ email: sub.email, drip: "6h", reason: "EMAIL_API_KEY not configured" });
        continue;
      }
      try {
        const id = await sendEmail({
          to: sub.email,
          subject: "6 hours left on your Pro trial",
          html: drip6HourEmailHtml(),
        });
        await patchSupabase("newsletter_subscribers", sub.id, { trial_drip_6_sent_at: new Date().toISOString() });
        results.sent.push({ email: sub.email, drip: "6h", messageId: id });
        summary.drip6++;
        console.log(`TRIAL_DRIP_6_SENT: ${sub.email} id=${id}`);
      } catch (err) {
        results.errors.push({ email: sub.email, drip: "6h", error: err.message });
        console.error(`TRIAL_DRIP_6_ERROR: ${sub.email} ${err.message}`);
      }
    }

    // Drip final: sent ~18 hours after trial activation (window: 18-24 hours ago, drip6 sent, final not sent)
    const dfStart = getUtcDateHoursAgo(24);
    const dfEnd = getUtcDateHoursAgo(18);
    const dripFinalCandidates = await fetchSupabase(
      `newsletter_subscribers?subscribed_at=gte.${dfStart}&subscribed_at=lte.${dfEnd}&source_page=eq.pro_trial&trial_drip_6_sent_at=not.is.null&trial_drip_final_sent_at=is.null&unsubscribed_at=is.null&select=*`
    );

    for (const sub of dripFinalCandidates) {
      if (!EMAIL_API_KEY) {
        results.skipped.push({ email: sub.email, drip: "final", reason: "EMAIL_API_KEY not configured" });
        continue;
      }
      try {
        const id = await sendEmail({
          to: sub.email,
          subject: "Your Pro trial expires in 2 hours — founder deal ends soon",
          html: dripFinalEmailHtml(),
        });
        await patchSupabase("newsletter_subscribers", sub.id, { trial_drip_final_sent_at: new Date().toISOString() });
        results.sent.push({ email: sub.email, drip: "final", messageId: id });
        summary.dripFinal++;
        console.log(`TRIAL_DRIP_FINAL_SENT: ${sub.email} id=${id}`);
      } catch (err) {
        results.errors.push({ email: sub.email, drip: "final", error: err.message });
        console.error(`TRIAL_DRIP_FINAL_ERROR: ${sub.email} ${err.message}`);
      }
    }

    summary.total = summary.drip6 + summary.dripFinal;

    res.writeHead(200, headers);
    res.end(JSON.stringify({
      results,
      summary,
      configured,
      windows: {
        drip6: { start: d6Start, end: d6End },
        dripFinal: { start: dfStart, end: dfEnd },
      },
    }));
  } catch (err) {
    console.error("TRIAL_DRIP_CAMPAIGN_ERROR:", err.message);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ error: err.message, configured }));
  }
}
