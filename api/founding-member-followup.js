// /api/founding-member-followup.js — Send 7-day follow-up email to founding members
// Trigger via GET/POST with x-launch-token header or admin action.
//
// Required env vars:
//   SUPABASE_SERVICE_ROLE_KEY — to read/update member state
//   EMAIL_API_KEY — Resend API key
//   EMAIL_FROM — sender address (default: hello@schemalens.tech)
//   LAUNCH_TOKEN — secret token to authorize broadcast sends

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const EMAIL_API_KEY = process.env.EMAIL_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "hello@schemalens.tech";
const LAUNCH_TOKEN = process.env.LAUNCH_TOKEN;

function followupEmailHtml({ name, licenseKey, dialect }) {
  const dialectLabel = dialect ? dialect.charAt(0).toUpperCase() + dialect.slice(1) : "your favorite";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>How is SchemaLens working for you?</title>
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
    .license { background: #18181b; border: 1px solid #27272a; padding: 12px 16px; margin: 16px 0; border-radius: 6px; font-family: monospace; font-size: 0.9rem; color: #e5e5e5; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #27272a; font-size: 0.8rem; color: #71717a; }
    .footer a { color: #a1a1aa; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">SchemaLens</div>
    <h1>Hi ${escapeHtml(name)}, how is SchemaLens working for you?</h1>
    <p>It's been about a week since you claimed your Founding Member spot. I wanted to check in personally and see how the tool is working for ${escapeHtml(dialectLabel)} schemas.</p>

    <div class="highlight">
      <p><strong>Your license key:</strong> <span style="font-family:monospace;">${escapeHtml(licenseKey)}</span></p>
      <p style="margin-top:8px;font-size:0.85rem;">This unlocks Lifetime Pro on any device, forever. If you haven't activated it yet, just paste it into <a href="https://schemalens.tech/app.html" style="color:#6366f1;">the app</a>.</p>
    </div>

    <h2>Quick questions (reply to this email)</h2>
    <ul>
      <li>Have you used SchemaLens for a real migration yet?</li>
      <li>Did the generated SQL work for your dialect?</li>
      <li>Was there anything confusing or missing?</li>
      <li>If you found it useful, would you be open to a short testimonial? Even one sentence helps enormously.</li>
    </ul>

    <h2>We're live on Product Hunt 🚀</h2>
    <p>SchemaLens just launched on Product Hunt. If you've found value in the tool, an upvote and comment would mean the world. It takes 30 seconds and directly impacts whether we can keep building.</p>
    <a href="https://schemalens.tech/product-hunt.html" class="cta">Support us on Product Hunt</a>

    <h2>Help us spread the word</h2>
    <p>We built a share kit with ready-to-post copy for Twitter, LinkedIn, and Reddit. One click to copy, one click to share.</p>
    <a href="https://schemalens.tech/share-kit.html" class="cta-secondary">Open Share Kit</a>

    <p style="margin-top:24px;">I read every reply. If something didn't work, tell me — I'll fix it. If something worked well, tell me too — it keeps me going.</p>
    <p>Thanks for being one of the first 50.<br>— SchemaLens</p>

    <div class="footer">
      <p>You received this because you claimed a Founding Member license at <a href="https://schemalens.tech">schemalens.tech</a>.</p>
      <p>SchemaLens — Compare SQL schemas and generate migrations in your browser.</p>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
      notice: "SUPABASE_SERVICE_ROLE_KEY not configured. Set it in Vercel env vars to activate follow-up emails.",
    }));
    return;
  }

  const dryRun = req.query?.dry === "true" || req.body?.dry === true;
  const minDays = parseInt(req.query?.minDays || req.body?.minDays || "7", 10);
  const results = { sent: [], skipped: [], errors: [] };
  let total = 0;

  try {
    // Calculate cutoff date: members claimed before this date are eligible
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - minDays);
    const cutoffIso = cutoff.toISOString();

    // Fetch founding members who claimed before cutoff and haven't received follow-up
    const candidates = await fetchSupabase(
      `founding_members?claimed_at=lte.${encodeURIComponent(cutoffIso)}&followup_email_sent_at=is.null&select=*`
    );

    for (const member of candidates) {
      if (dryRun) {
        results.skipped.push({ email: member.email, reason: "dry-run", claimedAt: member.claimed_at });
        continue;
      }
      if (!EMAIL_API_KEY) {
        results.skipped.push({ email: member.email, reason: "EMAIL_API_KEY not configured" });
        continue;
      }
      try {
        const id = await sendEmail({
          to: member.email,
          subject: `How is SchemaLens working for you, ${member.name}?`,
          html: followupEmailHtml({
            name: member.name,
            licenseKey: member.license_key,
            dialect: member.dialect,
          }),
        });
        await patchSupabase("founding_members", member.id, { followup_email_sent_at: new Date().toISOString() });
        results.sent.push({ email: member.email, messageId: id, claimedAt: member.claimed_at });
        total++;
        console.log(`FOLLOWUP_EMAIL_SENT: ${member.email} id=${id}`);
      } catch (err) {
        results.errors.push({ email: member.email, error: err.message });
        console.error(`FOLLOWUP_EMAIL_ERROR: ${member.email} ${err.message}`);
      }
    }

    res.writeHead(200, headers);
    res.end(JSON.stringify({
      results,
      total,
      dryRun,
      configured,
      candidateCount: candidates.length,
      cutoffDate: cutoffIso,
      minDays,
    }));
  } catch (err) {
    console.error("FOLLOWUP_CAMPAIGN_ERROR:", err.message);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ error: err.message, configured }));
  }
}
