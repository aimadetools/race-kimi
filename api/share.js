/**
 * SchemaLens Share Page
 * GET /api/share?id=<publicId>           — Share a saved schema diff
 * GET /api/share?quiz=breaking&score=80  — Share a quiz score
 *
 * Returns an HTML page with dynamic OpenGraph tags for social sharing.
 * Human visitors are redirected to the relevant page via JS.
 */

const {
  parseSQL,
  diffSchemas,
  detectBreakingChanges,
  calculateRiskScore
} = require('../lib/engine');

const SUPABASE_URL = 'https://fmfwdwwvvcdtreduncev.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZndkd3d2dmNkdHJlZHVuY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3NjIyMTAsImV4cCI6MjA5MjMzODIxMH0.tMXibqq5XPRGSdxfrNqCPgJRk3IYtvu5aCQVutZN9gw';

module.exports = async (req, res) => {
  const publicId = req.query?.id || '';
  const quizType = req.query?.quiz || '';
  const quizScore = parseInt(req.query?.score || '0', 10);
  const quizName = req.query?.name || '';

  // Quiz score sharing — no DB lookup needed
  if (quizType === 'breaking') {
    const score = Math.max(0, Math.min(100, quizScore));
    let badge = quizName || 'Migration Rookie';
    if (!quizName) {
      if (score >= 80) badge = 'Migration Guardian';
      else if (score >= 50) badge = 'Migration Aware';
    }
    const title = `I scored ${score}% on the Schema Breaking Change Quiz | SchemaLens`;
    const description = `${badge} — ${Math.round(score / 10)}/10 correct. Can you spot the migrations that break production?`;
    const ogImage = 'https://schemalens.tech/og-image.png';
    const redirectUrl = 'https://schemalens.tech/tools/schema-breaking-change-quiz.html';

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(redirectUrl)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(ogImage)}">
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${escapeHtml(redirectUrl)}">
  <meta property="twitter:title" content="${escapeHtml(title)}">
  <meta property="twitter:description" content="${escapeHtml(description)}">
  <meta property="twitter:image" content="${escapeHtml(ogImage)}">
  <link rel="canonical" href="${escapeHtml(redirectUrl)}">
  <style>
    body { font-family: system-ui,-apple-system,sans-serif; background: #0b0b0f; color: #f1f5f9; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: #141419; border: 1px solid #27272f; border-radius: 16px; padding: 48px; max-width: 460px; text-align: center; }
    .score { font-size: 4rem; font-weight: 800; background: linear-gradient(135deg, #6366f1, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 4px; }
    .badge { display: inline-block; padding: 6px 16px; border-radius: 999px; font-size: 0.9rem; font-weight: 700; margin-bottom: 16px; background: rgba(99,102,241,0.12); color: #818cf8; }
    h1 { font-size: 1.1rem; margin: 0 0 12px; color: #94a3b8; }
    p { color: #64748b; margin: 0 0 28px; line-height: 1.5; font-size: 0.95rem; }
    .btn { display: inline-block; background: #6366f1; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .btn:hover { background: #4f46e5; }
    .meta { margin-top: 16px; font-size: 0.8rem; color: #475569; }
  </style>
  <script>
    setTimeout(function() {
      window.location.replace('${redirectUrl}');
    }, 2500);
  </script>
</head>
<body>
  <div class="card">
    <div class="score">${score}%</div>
    <div class="badge">${escapeHtml(badge)}</div>
    <h1>Schema Breaking Change Quiz</h1>
    <p>${escapeHtml(description)}</p>
    <a class="btn" href="${escapeHtml(redirectUrl)}">Take the Quiz →</a>
    <div class="meta">Redirecting automatically…</div>
  </div>
</body>
</html>`);
  }

  if (!publicId) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(400).send(`
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Invalid Share Link | SchemaLens</title>
<meta http-equiv="refresh" content="3;url=/app.html">
</head>
<body><p>Invalid share link. Redirecting to <a href="/app.html">SchemaLens</a>...</p></body>
</html>`);
  }

  let diffName = '';
  let dialect = 'postgres';
  let summary = { added: 0, removed: 0, modified: 0, breaking: 0, riskLabel: 'Low', riskScore: 0 };

  try {
    const url = `${SUPABASE_URL}/rest/v1/saved_diffs?public_id=eq.${encodeURIComponent(publicId)}&is_public=eq.true&select=name,dialect,schema_a,schema_b,created_at`;
    const response = await fetch(url, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    const data = await response.json();

    if (data && data.length > 0) {
      const row = data[0];
      diffName = row.name || '';
      dialect = row.dialect || 'postgres';

      try {
        const oldSchema = parseSQL(row.schema_a || '', dialect);
        const newSchema = parseSQL(row.schema_b || '', dialect);
        const diff = diffSchemas(oldSchema, newSchema);
        const breakingChanges = detectBreakingChanges(diff);
        const riskScore = calculateRiskScore(diff);

        summary.added = diff.tablesAdded?.length || 0;
        summary.removed = diff.tablesRemoved?.length || 0;
        summary.modified = diff.tablesModified?.length || 0;
        summary.breaking = breakingChanges?.length || 0;
        summary.riskLabel = riskScore?.label || 'Low';
        summary.riskScore = riskScore?.score || 0;
      } catch (parseErr) {
        // Fallback to generic summary if parsing fails
      }
    }
  } catch (err) {
    // Network or Supabase error — serve generic OG tags
  }

  const title = diffName
    ? `Schema Diff: ${diffName} | SchemaLens`
    : 'Shared Schema Diff | SchemaLens';

  const descriptionParts = [];
  if (summary.added) descriptionParts.push(`${summary.added} table${summary.added > 1 ? 's' : ''} added`);
  if (summary.removed) descriptionParts.push(`${summary.removed} table${summary.removed > 1 ? 's' : ''} removed`);
  if (summary.modified) descriptionParts.push(`${summary.modified} table${summary.modified > 1 ? 's' : ''} modified`);
  if (!descriptionParts.length) descriptionParts.push('No schema changes detected');

  const description = `${descriptionParts.join(', ')}. Risk: ${summary.riskLabel} (${summary.riskScore}/100). Compare SQL schemas and generate migrations in your browser with SchemaLens.`;

  const ogImage = 'https://schemalens.tech/og-image.png';
  const redirectUrl = `https://schemalens.tech/app.html?share=${encodeURIComponent(publicId)}`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(redirectUrl)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(ogImage)}">
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${escapeHtml(redirectUrl)}">
  <meta property="twitter:title" content="${escapeHtml(title)}">
  <meta property="twitter:description" content="${escapeHtml(description)}">
  <meta property="twitter:image" content="${escapeHtml(ogImage)}">
  <link rel="canonical" href="${escapeHtml(redirectUrl)}">
  <style>
    body { font-family: system-ui,-apple-system,sans-serif; background: #0f172a; color: #e2e8f0; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 40px; max-width: 480px; text-align: center; }
    .logo { font-size: 2rem; margin-bottom: 8px; }
    h1 { font-size: 1.25rem; margin: 0 0 8px; }
    p { color: #94a3b8; margin: 0 0 24px; line-height: 1.5; }
    .stats { display: flex; justify-content: center; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
    .stat { background: #0f172a; border-radius: 8px; padding: 10px 16px; }
    .stat-num { font-size: 1.25rem; font-weight: 700; }
    .stat-label { font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
    .btn { display: inline-block; background: #6366f1; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .btn:hover { background: #4f46e5; }
    .meta { margin-top: 16px; font-size: 0.8rem; color: #64748b; }
  </style>
  <script>
    setTimeout(function() {
      window.location.replace('${redirectUrl}');
    }, 1500);
  </script>
</head>
<body>
  <div class="card">
    <div class="logo">🔍</div>
    <h1>${escapeHtml(diffName || 'Shared Schema Diff')}</h1>
    <p>${escapeHtml(description)}</p>
    <div class="stats">
      <div class="stat"><div class="stat-num" style="color:#34d399">+${summary.added}</div><div class="stat-label">Added</div></div>
      <div class="stat"><div class="stat-num" style="color:#f87171">−${summary.removed}</div><div class="stat-label">Removed</div></div>
      <div class="stat"><div class="stat-num" style="color:#fbbf24">~${summary.modified}</div><div class="stat-label">Modified</div></div>
    </div>
    <a class="btn" href="${escapeHtml(redirectUrl)}">Open in SchemaLens →</a>
    <div class="meta">Redirecting automatically…</div>
  </div>
</body>
</html>`);
};

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
