// /api/analytics-summary.js — Generate and send a weekly analytics summary email
// Trigger manually via GET/POST, or schedule with a cron job.
// Required env vars: SUPABASE_SERVICE_ROLE_KEY (optional for JSON output), EMAIL_API_KEY (optional for email)

const SUPABASE_URL = process.env.SUPABASE_URL || "https://fmfwdwwvvcdtreduncev.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const EMAIL_API_KEY = process.env.EMAIL_API_KEY;
const EMAIL_FROM = process.env.EMAIL_FROM || "hello@schemalens.tech";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "schemalens@proton.me";

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function getWeekAgo() {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return d.toISOString();
}

async function fetchSupabase(table, query = "") {
  const url = `${SUPABASE_URL}/rest/v1/${table}?${query}`;
  const res = await fetch(url, {
    headers: {
      "apikey": SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${table} query failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function buildSummary() {
  const since = getWeekAgo();
  const weekAgoQuery = `created_at=gte.${since}`;

  let analytics = [];
  let subscribers = [];
  let feedback = [];
  let testimonials = [];
  let error = null;

  if (SUPABASE_SERVICE_ROLE_KEY) {
    try {
      [analytics, subscribers, feedback, testimonials] = await Promise.all([
        fetchSupabase("analytics_events", `${weekAgoQuery}&order=created_at.desc&limit=500`),
        fetchSupabase("newsletter_subscribers", `${weekAgoQuery}&order=subscribed_at.desc&limit=500`),
        fetchSupabase("feedback", `${weekAgoQuery}&order=created_at.desc&limit=500`),
        fetchSupabase("testimonials", `order=created_at.desc&limit=500`),
      ]);
    } catch (e) {
      error = e.message;
    }
  }

  // Aggregate analytics events
  const eventCounts = {};
  const pageViews = {};
  let diffRuns = 0;
  let exports = 0;
  let shares = 0;
  let licenseActivations = 0;

  for (const ev of analytics) {
    const type = ev.event_type || "unknown";
    eventCounts[type] = (eventCounts[type] || 0) + 1;
    if (type === "page_view" && ev.page_path) {
      pageViews[ev.page_path] = (pageViews[ev.page_path] || 0) + 1;
    }
    if (type === "diff_run") diffRuns++;
    if (type.startsWith("export_")) exports++;
    if (type === "share_diff") shares++;
    if (type === "license_activate") licenseActivations++;
  }

  const topPages = Object.entries(pageViews)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const pendingTestimonials = testimonials.filter((t) => !t.approved).length;

  return {
    period: `${formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))} → ${formatDate(new Date())}`,
    error,
    analytics: {
      totalEvents: analytics.length,
      diffRuns,
      exports,
      shares,
      licenseActivations,
      topPages,
      eventCounts,
    },
    subscribers: {
      newSubscribers: subscribers.length,
    },
    feedback: {
      newFeedback: feedback.length,
      categories: feedback.reduce((acc, f) => {
        const cat = f.category || "other";
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {}),
    },
    testimonials: {
      total: testimonials.length,
      pending: pendingTestimonials,
    },
  };
}

function summaryToMarkdown(data) {
  const lines = [
    `# SchemaLens Weekly Summary`,
    ``,
    `**Period:** ${data.period}`,
    ``,
    `---`,
    ``,
    `## 📊 Product Usage`,
    `- **Total events:** ${data.analytics.totalEvents}`,
    `- **Diff runs:** ${data.analytics.diffRuns}`,
    `- **Exports:** ${data.analytics.exports}`,
    `- **Share diffs:** ${data.analytics.shares}`,
    `- **License activations:** ${data.analytics.licenseActivations}`,
    ``,
    `### Top Pages`,
  ];

  if (data.analytics.topPages.length === 0) {
    lines.push(`- No page view data`);
  } else {
    for (const [path, count] of data.analytics.topPages) {
      lines.push(`- \`${path}\`: ${count} views`);
    }
  }

  lines.push(
    ``,
    `---`,
    ``,
    `## 📬 Subscribers`,
    `- **New subscribers:** ${data.subscribers.newSubscribers}`,
    ``,
    `---`,
    ``,
    `## 💬 Feedback`,
    `- **New submissions:** ${data.feedback.newFeedback}`
  );

  const cats = Object.entries(data.feedback.categories);
  if (cats.length > 0) {
    lines.push(`- **By category:**`);
    for (const [cat, count] of cats) {
      lines.push(`  - ${cat}: ${count}`);
    }
  }

  lines.push(
    ``,
    `---`,
    ``,
    `## ⭐ Testimonials`,
    `- **Total:** ${data.testimonials.total}`,
    `- **Pending approval:** ${data.testimonials.pending}`,
    ``,
    `---`,
    ``,
    `*Sent from SchemaLens analytics dashboard*`,
    `*View admin: https://schemalens.tech/admin.html*`
  );

  return lines.join("\n");
}

async function sendEmail({ to, subject, text }) {
  if (!EMAIL_API_KEY) {
    return { sent: false, reason: "EMAIL_API_KEY not configured" };
  }

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
      text,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Email send failed: ${res.status} ${text}`);
  }

  const data = await res.json().catch(() => ({}));
  return { sent: true, id: data.id };
}

export default async function handler(req, res) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
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

  // Require a simple auth token for production use
  const authToken = process.env.ANALYTICS_SUMMARY_TOKEN;
  const providedToken = req.headers["x-analytics-token"] || req.query?.token;
  if (authToken && providedToken !== authToken) {
    res.writeHead(401, headers);
    res.end(JSON.stringify({ error: "Unauthorized" }));
    return;
  }

  try {
    const summary = await buildSummary();
    const markdown = summaryToMarkdown(summary);

    let emailResult = { sent: false, reason: "EMAIL_API_KEY not configured" };
    if (!summary.error && EMAIL_API_KEY) {
      try {
        emailResult = await sendEmail({
          to: ADMIN_EMAIL,
          subject: `SchemaLens Weekly Summary — ${summary.period}`,
          text: markdown,
        });
      } catch (e) {
        emailResult = { sent: false, error: e.message };
      }
    }

    console.log(`ANALYTICS_SUMMARY: period=${summary.period} events=${summary.analytics.totalEvents} subscribers=${summary.subscribers.newSubscribers} email=${emailResult.sent}`);

    res.writeHead(200, headers);
    res.end(JSON.stringify({
      summary,
      email: emailResult,
      markdown,
      configured: {
        supabase: !!SUPABASE_SERVICE_ROLE_KEY,
        email: !!EMAIL_API_KEY,
      },
    }, null, 2));
  } catch (err) {
    console.error("ANALYTICS_SUMMARY_ERROR:", err.message);
    res.writeHead(500, headers);
    res.end(JSON.stringify({ error: err.message }));
  }
}
