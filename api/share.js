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

  // Health check score sharing
  const healthScore = req.query?.health || '';
  if (healthScore !== '') {
    const score = Math.max(0, Math.min(100, parseInt(healthScore, 10)));
    const badge = req.query?.badge || 'Schema Check';
    const issueCount = parseInt(req.query?.issues || '0', 10);
    const tableCount = parseInt(req.query?.tables || '0', 10);
    const title = `I scored ${score}/100 on the SQL Schema Health Check | SchemaLens`;
    const description = `${badge} — ${issueCount} issue(s) found across ${tableCount} table(s). Check your own schema for free.`;
    const ogImage = 'https://schemalens.tech/og-image.png';
    const redirectUrl = 'https://schemalens.tech/tools/schema-health-check.html';

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
    .score { font-size: 4rem; font-weight: 800; background: linear-gradient(135deg, #22d3ee, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 4px; }
    .badge { display: inline-block; padding: 6px 16px; border-radius: 999px; font-size: 0.9rem; font-weight: 700; margin-bottom: 16px; background: rgba(34,211,238,0.12); color: #22d3ee; }
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
    <div class="score">${score}/100</div>
    <div class="badge">${escapeHtml(badge)}</div>
    <h1>SQL Schema Health Check</h1>
    <p>${escapeHtml(description)}</p>
    <a class="btn" href="${escapeHtml(redirectUrl)}">Check Your Schema →</a>
    <div class="meta">Redirecting automatically…</div>
  </div>
</body>
</html>`);
  }

  // Diff stats sharing — no DB lookup needed
  const diffStatsFlag = req.query?.diff || '';
  if (diffStatsFlag === '1') {
    const name = req.query?.name || 'Schema Diff';
    const added = parseInt(req.query?.added || '0', 10);
    const removed = parseInt(req.query?.removed || '0', 10);
    const modified = parseInt(req.query?.modified || '0', 10);
    const renamed = parseInt(req.query?.renamed || '0', 10);
    const breaking = parseInt(req.query?.breaking || '0', 10);
    const riskLabel = req.query?.risk || 'Low';
    const riskScore = parseInt(req.query?.score || '0', 10);
    const dialect = req.query?.dialect || 'postgres';
    const backUrl = req.query?.back || 'https://schemalens.tech/app.html';

    const totalChanges = added + removed + modified;
    const descParts = [];
    if (added) descParts.push(`${added} added`);
    if (removed) descParts.push(`${removed} removed`);
    if (modified) descParts.push(`${modified} modified`);
    if (!descParts.length) descParts.push('No changes');
    if (renamed) descParts.push(`${renamed} renamed`);

    const title = `${name} | ${totalChanges} change${totalChanges !== 1 ? 's' : ''} (${descParts.join(', ')}) — SchemaLens`;
    const description = `${totalChanges} schema change${totalChanges !== 1 ? 's' : ''} detected. ${breaking > 0 ? breaking + ' breaking change' + (breaking > 1 ? 's' : '') + '. ' : ''}Risk: ${riskLabel} (${riskScore}/100). Compare SQL schemas and generate migrations for free with SchemaLens.`;
    const ogImage = 'https://schemalens.tech/og-image.png';

    const riskColor = riskScore >= 70 ? '#f87171' : riskScore >= 40 ? '#fbbf24' : '#34d399';
    const dialectEmoji = { postgres: '🐘', mysql: '🐬', sqlite: '🪶', mssql: '📊', oracle: '🏛️' }[dialect] || '🔍';

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${escapeHtml(backUrl)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(ogImage)}">
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${escapeHtml(backUrl)}">
  <meta property="twitter:title" content="${escapeHtml(title)}">
  <meta property="twitter:description" content="${escapeHtml(description)}">
  <meta property="twitter:image" content="${escapeHtml(ogImage)}">
  <link rel="canonical" href="${escapeHtml(backUrl)}">
  <style>
    body { font-family: system-ui,-apple-system,sans-serif; background: #0b0b0f; color: #f1f5f9; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; }
    .card { background: #141419; border: 1px solid #27272f; border-radius: 20px; padding: 48px 40px; max-width: 520px; width: 100%; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
    .brand { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 24px; font-size: 1.1rem; font-weight: 700; color: #e2e8f0; }
    .brand-icon { font-size: 1.4rem; }
    h1 { font-size: 1.35rem; margin: 0 0 8px; color: #f1f5f9; line-height: 1.3; }
    .subtitle { color: #94a3b8; margin: 0 0 28px; font-size: 0.95rem; }
    .stats { display: flex; justify-content: center; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; }
    .stat { background: #0f172a; border-radius: 12px; padding: 16px 14px; min-width: 80px; flex: 1; }
    .stat-num { font-size: 1.6rem; font-weight: 800; line-height: 1; }
    .stat-label { font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 6px; font-weight: 600; }
    .risk-banner { display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 999px; font-size: 0.9rem; font-weight: 700; margin-bottom: 24px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); }
    .risk-dot { width: 10px; height: 10px; border-radius: 50%; background: ${riskColor}; box-shadow: 0 0 12px ${riskColor}; }
    .btn-primary { display: inline-block; background: #6366f1; color: #fff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 1rem; transition: background 0.2s; }
    .btn-primary:hover { background: #4f46e5; }
    .btn-secondary { display: inline-block; color: #94a3b8; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 0.9rem; margin-top: 12px; }
    .meta { margin-top: 20px; font-size: 0.8rem; color: #475569; }
    .dialect-tag { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; background: rgba(99,102,241,0.1); color: #818cf8; margin-bottom: 16px; }
  </style>
  <script>
    setTimeout(function() {
      window.location.replace('${escapeHtml(backUrl)}');
    }, 5000);
  </script>
</head>
<body>
  <div class="card">
    <div class="brand"><span class="brand-icon">🔍</span> SchemaLens</div>
    <div class="dialect-tag">${dialectEmoji} ${escapeHtml(dialect.toUpperCase())}</div>
    <h1>${escapeHtml(name)}</h1>
    <p class="subtitle">${escapeHtml(description)}</p>
    <div class="stats">
      <div class="stat"><div class="stat-num" style="color:#34d399">+${added}</div><div class="stat-label">Added</div></div>
      <div class="stat"><div class="stat-num" style="color:#f87171">−${removed}</div><div class="stat-label">Removed</div></div>
      <div class="stat"><div class="stat-num" style="color:#fbbf24">~${modified}</div><div class="stat-label">Modified</div></div>
      ${renamed > 0 ? `<div class="stat"><div class="stat-num" style="color:#818cf8">↔${renamed}</div><div class="stat-label">Renamed</div></div>` : ''}
    </div>
    <div class="risk-banner"><span class="risk-dot"></span> Risk: ${escapeHtml(riskLabel)} (${riskScore}/100)</div>
    <a class="btn-primary" href="${escapeHtml(backUrl)}">Open Full Diff in SchemaLens →</a>
    <div class="meta">Redirecting automatically in 5 seconds…</div>
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
