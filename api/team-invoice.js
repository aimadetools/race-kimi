/**
 * Team Invoice / Contact Sales Request Endpoint
 * POST /api/team-invoice
 * Body: { name, email, company, teamSize, plan, billingEmail, billingAddress, taxId, message }
 *
 * Stores the request in Supabase (demo_requests table) so the human operator
 * can follow up with a manual invoice (Stripe/PayPal/Gumroad) while Gumroad
 * Team products are pending.
 */

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZndkd3d2dmNkdHJlZHVuY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjIyMTAsImV4cCI6MjA5MjMzODIxMH0.tMXibqq5XPRGSdxfrNqCPgJRk3IYtvu5aCQVutZN9gw";
const EMAIL_API_KEY = process.env.EMAIL_API_KEY || "";
const EMAIL_FROM = process.env.EMAIL_FROM || "hello@schemalens.tech";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "schemalens@proton.me";

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function sanitize(str, maxLen) {
  return typeof str === "string" ? str.trim().slice(0, maxLen) : "";
}

async function writeToSupabase(record) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${SUPABASE_URL}/rest/v1/demo_requests`, {
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
      console.log(`TEAM_INVOICE_FAILED: ${res.status} ${text}`);
    }
    return res.ok;
  } catch (e) {
    console.log(`TEAM_INVOICE_ERROR: ${e.message}`);
    return false;
  }
}

async function writeToSupabaseMinimal(record) {
  // Fallback for older demo_requests schemas that may not include all columns.
  const minimal = {
    name: record.name,
    email: record.email,
    company: record.company,
    team_size: record.team_size,
    message: record.message,
    status: record.status,
    created_at: record.created_at,
  };
  return writeToSupabase(minimal);
}

function buildAdminEmail(record) {
  const lines = [
    "<h2>New SchemaLens Team Invoice Request</h2>",
    `<p><strong>Name:</strong> ${record.name}</p>`,
    `<p><strong>Email:</strong> ${record.email}</p>`,
    `<p><strong>Company:</strong> ${record.company || "n/a"}</p>`,
    `<p><strong>Team Size:</strong> ${record.team_size || "n/a"}</p>`,
    `<p><strong>Plan:</strong> ${record.plan || "n/a"}</p>`,
    `<p><strong>Billing Email:</strong> ${record.billing_email || "n/a"}</p>`,
    `<p><strong>Billing Address:</strong> ${record.billing_address ? record.billing_address.replace(/\n/g, "<br>") : "n/a"}</p>`,
    `<p><strong>Tax ID:</strong> ${record.tax_id || "n/a"}</p>`,
    `<p><strong>Notes:</strong> ${record.message ? record.message.replace(/\n/g, "<br>") : "n/a"}</p>`,
    "<hr>",
    '<p><a href="https://schemalens.tech/admin.html">View in Admin Dashboard →</a></p>',
  ];
  return lines.join("");
}

async function notifyAdmin(record) {
  if (!EMAIL_API_KEY) return { sent: false, reason: "EMAIL_API_KEY not configured" };
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EMAIL_API_KEY}`,
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: ADMIN_EMAIL,
        subject: `📋 Team invoice request from ${record.name} — ${record.company || "no company"}`,
        html: buildAdminEmail(record),
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`TEAM_INVOICE_EMAIL_ERROR: ${res.status} ${text}`);
      return { sent: false, reason: text };
    }
    const data = await res.json().catch(() => ({}));
    console.log(`TEAM_INVOICE_EMAIL_SENT: ${data.id || "unknown"} to ${ADMIN_EMAIL}`);
    return { sent: true, id: data.id };
  } catch (err) {
    console.error(`TEAM_INVOICE_EMAIL_EXCEPTION: ${err.message}`);
    return { sent: false, reason: err.message };
  }
}

async function notifyRequester(record) {
  if (!EMAIL_API_KEY) return { sent: false, reason: "EMAIL_API_KEY not configured" };
  try {
    const html = `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:520px;margin:0 auto;color:#111;">
        <h2 style="color:#0f0f0f;">Hi ${record.name},</h2>
        <p>Thanks for your <strong>SchemaLens Team</strong> invoice request. We've received your details and will be in touch within 1 business day with a tailored quote and a manual invoice.</p>
        <p style="background:#f3f4f6;border-radius:8px;padding:16px;">
          <strong>What happens next:</strong><br>
          • We'll review your team size and plan choice<br>
          • We'll send a secure invoice (Stripe/PayPal) or a Gumroad checkout link<br>
          • Once paid, you'll receive team admin credentials and setup docs
        </p>
        <p>In the meantime, you can <a href="https://schemalens.tech/app.html" style="color:#6366f1;">open the app</a> or <a href="https://schemalens.tech/tools/cicd-setup-wizard.html" style="color:#6366f1;">generate your CI/CD config</a>.</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;">
        <p style="font-size:0.85rem;color:#6b7280;">SchemaLens — Compare SQL schemas and generate migrations in your browser.<br>
        <a href="https://schemalens.tech">schemalens.tech</a> · <a href="mailto:schemalens@proton.me">schemalens@proton.me</a></p>
      </div>
    `;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EMAIL_API_KEY}`,
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: record.email,
        subject: `Your SchemaLens Team invoice request — we'll be in touch soon`,
        html,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`TEAM_INVOICE_CONFIRM_ERROR: ${res.status} ${text}`);
      return { sent: false, reason: text };
    }
    const data = await res.json().catch(() => ({}));
    console.log(`TEAM_INVOICE_CONFIRM_SENT: ${data.id || "unknown"} to ${record.email}`);
    return { sent: true, id: data.id };
  } catch (err) {
    console.error(`TEAM_INVOICE_CONFIRM_EXCEPTION: ${err.message}`);
    return { sent: false, reason: err.message };
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

  const body = req.body || {};
  const { name, email, company, teamSize, plan, billingEmail, billingAddress, taxId, message } = body;

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ error: "Name is required (min 2 characters)." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Valid email is required." });
  }

  if (billingEmail && !isValidEmail(billingEmail)) {
    return res.status(400).json({ error: "Invalid billing email address." });
  }

  const planLabel = plan === "yearly" ? "Team Yearly ($290/yr)" : "Team Monthly ($29/mo)";
  const invoiceMessageParts = [
    "[Team Invoice Request]",
    `Plan: ${planLabel}`,
    billingEmail ? `Billing email: ${billingEmail}` : "",
    billingAddress ? `Billing address: ${billingAddress}` : "",
    taxId ? `Tax ID: ${taxId}` : "",
    message ? `Notes: ${message}` : "",
  ].filter(Boolean).join("\n\n");

  const record = {
    name: sanitize(name, 100),
    email: email.trim().toLowerCase().slice(0, 200),
    company: sanitize(company, 200),
    team_size: sanitize(teamSize, 50),
    message: invoiceMessageParts.slice(0, 2000),
    status: "new",
    created_at: new Date().toISOString(),
  };

  // Keep extra fields only for the admin/confirmation emails; they are encoded in `message` for the DB.
  const emailRecord = {
    ...record,
    plan: planLabel,
    billing_email: billingEmail ? billingEmail.trim().toLowerCase().slice(0, 200) : "",
    billing_address: sanitize(billingAddress, 500),
    tax_id: sanitize(taxId, 100),
  };

  console.log(`TEAM_INVOICE_REQUEST: ${record.name} <${record.email}> from ${record.company || "n/a"} plan=${planLabel}`);

  let ok = await writeToSupabase(record);
  if (!ok) {
    // Fallback: retry with the minimal known schema in case extra columns are rejected.
    ok = await writeToSupabaseMinimal(record);
  }

  if (!ok) {
    return res.status(500).json({ error: "Unable to save request. Please try again later." });
  }

  const adminResult = await notifyAdmin(emailRecord);
  const confirmResult = await notifyRequester(emailRecord);

  return res.status(200).json({
    success: true,
    message: "Invoice request received. We'll reply within one business day with a manual invoice.",
    notified: adminResult.sent,
    confirmed: confirmResult.sent,
  });
}
