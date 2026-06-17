/**
 * SchemaLens Schema Diff Report Generator
 * POST /api/schema-diff-report
 *
 * Generates a self-contained HTML report from a SchemaLens diff result.
 * Designed to be uploaded as a GitHub Actions artifact and opened offline.
 *
 * Body:
 *   response   object  required  The full JSON response from /api/free-diff or /api/diff
 *   metadata   object  optional  { repo, branch, commit, commitUrl, prUrl, runId, ciProvider, dialect }
 */

function escapeHtml(str) {
  if (typeof str !== 'string') return String(str ?? '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function highlightSql(sql) {
  const keywords = [
    'CREATE', 'TABLE', 'ALTER', 'DROP', 'IF', 'EXISTS', 'NOT', 'NULL',
    'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'UNIQUE', 'INDEX',
    'ADD', 'COLUMN', 'CASCADE', 'CONSTRAINT', 'DEFAULT', 'AUTO_INCREMENT',
    'SERIAL', 'BIGINT', 'INTEGER', 'INT', 'VARCHAR', 'TEXT', 'BOOLEAN',
    'TIMESTAMP', 'DATE', 'TIME', 'NUMERIC', 'DECIMAL', 'FLOAT', 'DOUBLE',
    'BEGIN', 'COMMIT', 'ROLLBACK', 'TRANSACTION'
  ];
  const keywordRe = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');

  return escapeHtml(sql)
    .replace(/(--.*$)/gm, '<span class="sql-comment">$1</span>')
    .replace(/('[^']*')/g, '<span class="sql-string">$1</span>')
    .replace(/("[^"]*")/g, '<span class="sql-string">$1</span>')
    .replace(/(`[^`]*`)/g, '<span class="sql-string">$1</span>')
    .replace(keywordRe, '<span class="sql-keyword">$1</span>')
    .replace(/\/(\*|\/).*?\*\//g, '<span class="sql-comment">$&</span>');
}

function sqlBlock(sql, title) {
  const lines = sql.split('\n').filter(l => l.trim());
  const numbered = sql.split('\n').map((line, i) => {
    const highlighted = highlightSql(line);
    return `<div class="code-line"><span class="line-num">${i + 1}</span><span class="line-content">${highlighted || '&nbsp;'}</span></div>`;
  }).join('');

  return `
    <section class="report-section">
      <h2>${escapeHtml(title)}</h2>
      <div class="code-block">
        ${numbered}
      </div>
      <p class="muted">${lines.length} line(s)</p>
    </section>
  `;
}

function generateReport(data) {
  const { response, metadata = {} } = data || {};
  const summary = response.summary || {};
  const risk = response.riskScore || { score: 0, label: 'Unknown', icon: '⚪' };
  const breaking = response.breakingChanges || [];
  const migration = response.migration || '';
  const rollback = response.rollback || '';
  const dialect = metadata.dialect || 'postgres';

  const riskColor = risk.score >= 70 ? '#ef4444' : risk.score >= 40 ? '#f59e0b' : '#22c55e';

  const breakingList = breaking.length
    ? breaking.map(b => `
        <li class="breaking-item ${b.severity || 'medium'}">
          <span class="breaking-severity">${escapeHtml(b.severity || 'medium')}</span>
          <strong>${escapeHtml(b.message || b.title || 'Breaking change')}</strong>
          ${b.table ? `<span class="breaking-table">${escapeHtml(b.table)}</span>` : ''}
        </li>
      `).join('')
    : '<li class="breaking-item none">No breaking changes detected 🎉</li>';

  const metaRows = [
    metadata.repo ? `<tr><td>Repository</td><td>${escapeHtml(metadata.repo)}</td></tr>` : '',
    metadata.branch ? `<tr><td>Branch</td><td>${escapeHtml(metadata.branch)}</td></tr>` : '',
    metadata.commit ? `<tr><td>Commit</td><td><code>${escapeHtml(metadata.commit.slice(0, 8))}</code></td></tr>` : '',
    metadata.prUrl ? `<tr><td>Pull Request</td><td><a href="${escapeHtml(metadata.prUrl)}" target="_blank" rel="noopener">View PR →</a></td></tr>` : '',
    metadata.runId ? `<tr><td>CI Run</td><td><code>${escapeHtml(String(metadata.runId))}</code></td></tr>` : '',
    metadata.ciProvider ? `<tr><td>CI Provider</td><td>${escapeHtml(metadata.ciProvider)}</td></tr>` : '',
    `<tr><td>Dialect</td><td>${escapeHtml(dialect)}</td></tr>`
  ].filter(Boolean).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SchemaLens Schema Diff Report</title>
  <style>
    :root {
      --bg: #0f172a;
      --panel: #1e293b;
      --panel-2: #334155;
      --text: #f1f5f9;
      --muted: #94a3b8;
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --success: #22c55e;
      --warning: #f59e0b;
      --danger: #ef4444;
      --border: #334155;
      --radius: 12px;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
    }
    .container { max-width: 960px; margin: 0 auto; padding: 32px 20px; }
    header { text-align: center; margin-bottom: 32px; }
    .logo {
      font-size: 1.5rem; font-weight: 800; letter-spacing: -0.5px;
      background: linear-gradient(135deg, #6366f1, #a855f7);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }
    h1 { font-size: 1.75rem; margin: 0 0 8px; }
    .subtitle { color: var(--muted); margin: 0; }

    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .summary-card {
      background: var(--panel); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 18px; text-align: center;
    }
    .summary-card .value {
      font-size: 2rem; font-weight: 800; display: block;
    }
    .summary-card .label { color: var(--muted); font-size: 0.85rem; }
    .added { color: var(--success); }
    .removed { color: var(--danger); }
    .modified { color: var(--warning); }
    .breaking { color: var(--danger); }

    .risk-card {
      background: var(--panel); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 24px; margin-bottom: 24px;
      display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
    }
    .risk-score {
      width: 110px; height: 110px; border-radius: 50%;
      border: 8px solid var(--panel-2);
      display: flex; align-items: center; justify-content: center;
      flex-direction: column; flex-shrink: 0;
    }
    .risk-score .score { font-size: 1.75rem; font-weight: 800; }
    .risk-score .label { font-size: 0.75rem; color: var(--muted); text-transform: uppercase; }

    .report-section {
      background: var(--panel); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 24px; margin-bottom: 24px;
    }
    .report-section h2 { margin-top: 0; font-size: 1.25rem; }

    .meta-table { width: 100%; border-collapse: collapse; }
    .meta-table td { padding: 10px 0; border-bottom: 1px solid var(--border); }
    .meta-table td:first-child { color: var(--muted); width: 140px; }
    .meta-table a { color: var(--primary); }

    .breaking-list { list-style: none; padding: 0; margin: 0; }
    .breaking-item {
      background: rgba(239, 68, 68, 0.08); border-left: 4px solid var(--danger);
      border-radius: 8px; padding: 14px 16px; margin-bottom: 12px;
    }
    .breaking-item.none {
      background: rgba(34, 197, 94, 0.08); border-left-color: var(--success);
    }
    .breaking-severity {
      display: inline-block; font-size: 0.7rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.5px;
      background: var(--panel-2); color: var(--text);
      padding: 2px 8px; border-radius: 999px; margin-right: 8px;
    }
    .breaking-item.critical .breaking-severity { background: var(--danger); }
    .breaking-item.high .breaking-severity { background: var(--danger); }
    .breaking-item.medium .breaking-severity { background: var(--warning); color: #000; }
    .breaking-table { display: block; color: var(--muted); font-size: 0.85rem; margin-top: 4px; }

    .code-block {
      background: #020617; border: 1px solid #1e293b; border-radius: 8px;
      overflow-x: auto; font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 0.85rem; line-height: 1.5;
    }
    .code-line { display: flex; }
    .line-num {
      color: #475569; text-align: right; padding: 2px 12px; min-width: 44px;
      user-select: none; background: #0f172a; border-right: 1px solid #1e293b;
    }
    .line-content { padding: 2px 14px; white-space: pre; flex: 1; }
    .sql-keyword { color: #c084fc; }
    .sql-string { color: #fbbf24; }
    .sql-comment { color: #4ade80; }

    .cta {
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(168, 85, 247, 0.15));
      border: 1px solid var(--primary); border-radius: var(--radius);
      padding: 24px; text-align: center; margin-bottom: 24px;
    }
    .cta h2 { margin-top: 0; }
    .cta p { color: var(--muted); margin-bottom: 20px; }
    .btn {
      display: inline-block; padding: 12px 24px; border-radius: 8px;
      font-weight: 700; text-decoration: none; margin: 6px;
      transition: transform 0.1s ease;
    }
    .btn-primary { background: var(--primary); color: #fff; }
    .btn-primary:hover { background: var(--primary-hover); transform: translateY(-1px); }
    .btn-secondary { background: var(--panel-2); color: var(--text); }

    footer { text-align: center; color: var(--muted); font-size: 0.85rem; padding: 24px 0; }
    footer a { color: var(--primary); }
    .muted { color: var(--muted); font-size: 0.85rem; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo">SchemaLens</div>
      <h1>Schema Diff Report</h1>
      <p class="subtitle">Generated from your CI/CD pipeline</p>
    </header>

    <section class="report-section">
      <h2>Summary</h2>
      <div class="summary-grid">
        <div class="summary-card"><span class="value added">${summary.tablesAdded || 0}</span><span class="label">Tables Added</span></div>
        <div class="summary-card"><span class="value removed">${summary.tablesRemoved || 0}</span><span class="label">Tables Removed</span></div>
        <div class="summary-card"><span class="value modified">${summary.tablesModified || 0}</span><span class="label">Tables Modified</span></div>
        <div class="summary-card"><span class="value breaking">${summary.breakingChangeCount || breaking.length || 0}</span><span class="label">Breaking Changes</span></div>
      </div>
    </section>

    <div class="risk-card">
      <div class="risk-score" style="border-color: ${riskColor};">
        <span class="score" style="color:${riskColor}">${risk.score}</span>
        <span class="label">${escapeHtml(risk.label)}</span>
      </div>
      <div>
        <h2 style="margin-top:0">Migration Safety Score</h2>
        <p class="muted">${risk.score >= 70 ? 'High risk — review required before deploying.' : risk.score >= 40 ? 'Moderate risk — review suggested.' : 'Low risk — looks safe to deploy.'}</p>
      </div>
    </div>

    <section class="report-section">
      <h2>Pipeline Context</h2>
      <table class="meta-table">
        ${metaRows}
      </table>
    </section>

    <section class="report-section">
      <h2>Breaking Changes</h2>
      <ul class="breaking-list">
        ${breakingList}
      </ul>
    </section>

    ${migration ? sqlBlock(migration, 'Generated Migration SQL') : ''}
    ${rollback ? sqlBlock(rollback, 'Generated Rollback SQL') : ''}

    <div class="cta">
      <h2>Get schema diff reports on every PR</h2>
      <p>The SchemaLens GitHub Action is free forever. Add Slack/Teams drift alerts, a shared team workspace, and 90-day alert history with SchemaLens Team.</p>
      <a class="btn btn-primary" href="https://schemalens.tech/github-action.html" target="_blank" rel="noopener">Add to GitHub Actions →</a>
      <a class="btn btn-secondary" href="https://schemalens.tech/team-buy.html" target="_blank" rel="noopener">Explore Team Plan →</a>
    </div>

    <footer>
      <p>Generated by <a href="https://schemalens.tech" target="_blank" rel="noopener">SchemaLens</a> · Free schema diff for SQL databases</p>
    </footer>
  </div>
</body>
</html>`;
}

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed. Use POST.' });

  const { response, metadata } = req.body || {};
  if (!response || typeof response !== 'object') {
    return res.status(400).json({ error: 'response object is required.' });
  }

  try {
    const html = generateReport({ response, metadata });
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to generate report.' });
  }
};
