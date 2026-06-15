#!/usr/bin/env node
/**
 * Generate platform-specific "60-second" CI/CD landing pages for SchemaLens.
 * Reads the canonical config files from the repo root and emits static HTML
 * pages in tools/ with syntax-highlighted YAML, SEO metadata, and analytics.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'tools');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function highlightYaml(text) {
  return text.split('\n').map(line => {
    // Comments start with # (handle leading whitespace)
    const commentIdx = line.search(/(^|\s)#/);
    if (commentIdx !== -1) {
      const before = line.slice(0, commentIdx);
      const comment = line.slice(commentIdx);
      return highlightYamlLineWithoutComment(before) + '<span class="comment">' + escapeHtml(comment) + '</span>';
    }
    return highlightYamlLineWithoutComment(line);
  }).join('\n');
}

function highlightYamlLineWithoutComment(line) {
  // key: value
  const keyMatch = line.match(/^(\s*)([A-Za-z0-9_\-]+)(:\s*)(.*)$/);
  if (keyMatch) {
    const indent = keyMatch[1];
    const key = keyMatch[2];
    const sep = keyMatch[3];
    const rest = highlightScalars(escapeHtml(keyMatch[4]));
    return `${indent}<span class="key">${key}</span>${sep}${rest}`;
  }
  // list item
  const listMatch = line.match(/^(\s*-\s)(.*)$/);
  if (listMatch) {
    return `${listMatch[1]}${highlightScalars(escapeHtml(listMatch[2]))}`;
  }
  return highlightScalars(escapeHtml(line));
}

function highlightScalars(text) {
  // Double-quoted strings
  return text
    .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="str">$1</span>')
    .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="str">$1</span>');
}

function readConfig(filePath) {
  const full = path.join(ROOT, filePath);
  return fs.readFileSync(full, 'utf8');
}

const githubWorkflow = `name: Schema Diff
on:
  pull_request:
    paths:
      - '**/*.sql'

jobs:
  schema-diff:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
      checks: write
    steps:
      - uses: actions/checkout@v4
      - uses: aimadetools/race-kimi@v1
        with:
          old-schema-path: db/schema.sql
          new-schema-path: db/schema.sql
          dialect: postgres
          post-comment: true
          create-check-run: true
          fail-on-breaking: false
          github-token: \${{ secrets.GITHUB_TOKEN }}`;

const platforms = [
  {
    key: 'github',
    name: 'GitHub Actions',
    icon: '🐙',
    accent: '#2088ff',
    title: 'Add Schema Diff to GitHub Actions in 60 Seconds — SchemaLens',
    description: 'Generate a ready-to-use GitHub Actions workflow that diffs your database schema on every pull request. Catches breaking changes in 60 seconds. No signup.',
    heroH1: 'Add schema diff to your <span class="platform-accent">GitHub repo</span>',
    heroSub: 'Generate a workflow that compares your database schema on every pull request. Catches breaking changes before they become production incidents.',
    configName: '.github/workflows/schema-diff.yml',
    configContent: githubWorkflow,
    downloadHref: '../github-action.html',
    downloadText: 'View full action docs',
    wizardHref: 'cicd-setup-wizard.html?platform=github',
    fullGuideHref: '../github-action.html',
    previewTitle: '💬 What your team sees in every pull request',
    prAvatarBg: '#2088ff',
    featureCards: [
      { title: '🛡️ Block breaking changes before merge', body: 'Dropped columns, removed indexes, and altered constraints fail the check before they reach production.' },
      { title: '💬 Native PR comments', body: 'Reviewers see the diff summary directly in the pull request — no external dashboards needed.' },
      { title: '📊 GitHub Check Run', body: 'A real status check with risk score, migration preview, and a clear pass/fail conclusion.' },
      { title: '⏭️ Smart skip saves CI minutes', body: 'The job only runs when .sql files change, so unrelated PRs don\'t waste Actions minutes.' },
    ],
    analyticsPrefix: 'github_60s',
  },
  {
    key: 'jenkins',
    name: 'Jenkins',
    icon: '🔧',
    accent: '#f0d04b',
    title: 'Add Schema Diff to Jenkins in 60 Seconds — SchemaLens',
    description: 'Generate a ready-to-use Jenkinsfile that diffs your database schema on every PR. Catches breaking changes in 60 seconds. No signup.',
    heroH1: 'Add schema diff to your <span class="platform-accent">Jenkins pipeline</span>',
    heroSub: 'Generate a Jenkinsfile that compares your database schema on every branch build. Catches breaking changes before they become production incidents.',
    configName: 'Jenkinsfile',
    configContent: readConfig('Jenkinsfile'),
    downloadHref: '../Jenkinsfile',
    downloadText: 'Download Jenkinsfile',
    wizardHref: 'cicd-setup-wizard.html?platform=jenkins',
    fullGuideHref: '../jenkins-schema-diff.html',
    previewTitle: '📋 What your team sees in the build log',
    prAvatarBg: '#f0d04b',
    featureCards: [
      { title: '🛡️ Block breaking changes before merge', body: 'Dropped columns, removed indexes, and altered constraints fail the build before they reach production.' },
      { title: '📋 Console reports', body: 'Developers see the diff summary, risk score, and migration SQL in the Jenkins console output.' },
      { title: '📦 Artifact archiving', body: 'Every build archives a markdown report for compliance docs, audits, or offline review.' },
      { title: '⏭️ Smart skip saves CI minutes', body: 'The stage only runs when .sql files change, so unrelated builds don\'t waste executor time.' },
    ],
    analyticsPrefix: 'jenkins_60s',
  },
  {
    key: 'circleci',
    name: 'CircleCI',
    icon: '⭕',
    accent: '#002f6c',
    title: 'Add Schema Diff to CircleCI in 60 Seconds — SchemaLens',
    description: 'Generate a ready-to-use CircleCI config that diffs your database schema on every pull request. Catches breaking changes in 60 seconds. No signup.',
    heroH1: 'Add schema diff to your <span class="platform-accent">CircleCI pipeline</span>',
    heroSub: 'Generate a .circleci/config.yml that compares your database schema on every branch push. Catches breaking changes before they become production incidents.',
    configName: '.circleci/config.yml',
    configContent: readConfig('.circleci/config.yml'),
    downloadHref: '../.circleci/config.yml',
    downloadText: 'Download config.yml',
    wizardHref: 'cicd-setup-wizard.html?platform=circleci',
    fullGuideHref: '../circleci-schema-diff.html',
    previewTitle: '💬 What your team sees in every pull request',
    prAvatarBg: '#002f6c',
    featureCards: [
      { title: '🛡️ Block breaking changes before merge', body: 'Dropped columns, removed indexes, and altered constraints fail the job before they reach production.' },
      { title: '💬 Native PR comments', body: 'Reviewers see the diff summary directly in the GitHub pull request — no external dashboards needed.' },
      { title: '📦 Artifact reports', body: 'Every pipeline stores a markdown report for compliance docs, audits, or offline review.' },
      { title: '⏭️ Path-filtered runs', body: 'The job only runs when .sql files change, so unrelated pushes don\'t waste build minutes.' },
    ],
    analyticsPrefix: 'circleci_60s',
  },
  {
    key: 'bitbucket',
    name: 'Bitbucket Pipelines',
    icon: '📦',
    accent: '#2684ff',
    title: 'Add Schema Diff to Bitbucket Pipelines in 60 Seconds — SchemaLens',
    description: 'Generate a ready-to-use bitbucket-pipelines.yml that diffs your database schema on every pull request. Catches breaking changes in 60 seconds. No signup.',
    heroH1: 'Add schema diff to your <span class="platform-accent">Bitbucket repo</span>',
    heroSub: 'Generate a bitbucket-pipelines.yml that compares your database schema on every pull request. Catches breaking changes before they become production incidents.',
    configName: 'bitbucket-pipelines.yml',
    configContent: readConfig('bitbucket-pipelines.yml'),
    downloadHref: '../bitbucket-pipelines.yml',
    downloadText: 'Download bitbucket-pipelines.yml',
    wizardHref: 'cicd-setup-wizard.html?platform=bitbucket',
    fullGuideHref: '../bitbucket-schema-diff.html',
    previewTitle: '💬 What your team sees in every pull request',
    prAvatarBg: '#2684ff',
    featureCards: [
      { title: '🛡️ Block breaking changes before merge', body: 'Dropped columns, removed indexes, and altered constraints fail the pipeline before they reach production.' },
      { title: '💬 Native PR comments', body: 'Reviewers see the diff summary directly in the Bitbucket pull request — no external dashboards needed.' },
      { title: '📦 Artifact reports', body: 'Every pipeline attaches a markdown report for compliance docs, audits, or offline review.' },
      { title: '⏭️ Smart skip saves CI minutes', body: 'The step only runs when .sql files change, so unrelated PRs don\'t waste pipeline minutes.' },
    ],
    analyticsPrefix: 'bitbucket_60s',
  },
  {
    key: 'azure',
    name: 'Azure DevOps',
    icon: '🔷',
    accent: '#0078d4',
    title: 'Add Schema Diff to Azure DevOps in 60 Seconds — SchemaLens',
    description: 'Generate a ready-to-use azure-pipelines.yml that diffs your database schema on every pull request. Catches breaking changes in 60 seconds. No signup.',
    heroH1: 'Add schema diff to your <span class="platform-accent">Azure DevOps repo</span>',
    heroSub: 'Generate an azure-pipelines.yml that compares your database schema on every pull request. Catches breaking changes before they become production incidents.',
    configName: 'azure-pipelines.yml',
    configContent: readConfig('azure-pipelines.yml'),
    downloadHref: '../azure-pipelines.yml',
    downloadText: 'Download azure-pipelines.yml',
    wizardHref: 'cicd-setup-wizard.html?platform=azure',
    fullGuideHref: '../azure-devops-schema-diff.html',
    previewTitle: '💬 What your team sees in every pull request',
    prAvatarBg: '#0078d4',
    featureCards: [
      { title: '🛡️ Block breaking changes before merge', body: 'Dropped columns, removed indexes, and altered constraints fail the pipeline before they reach production.' },
      { title: '💬 PR thread comments', body: 'Reviewers see the diff summary directly in the Azure DevOps pull request — no external dashboards needed.' },
      { title: '📦 Published artifacts', body: 'Every build publishes a markdown report for compliance docs, audits, or offline review.' },
      { title: '⏭️ Path filters', body: 'The pipeline only runs when .sql files change, so unrelated PRs don\'t waste agent time.' },
    ],
    analyticsPrefix: 'azure_60s',
  },
];

function renderPage(p) {
  const pageUrl = `https://schemalens.tech/tools/${p.key}-schema-diff-in-60-seconds.html`;
  const featureList = p.featureCards.map(f => `      <div class="feature-card">
        <h3>${f.title}</h3>
        <p>${f.body}</p>
      </div>`).join('\n');

  const headerLine = p.key === 'jenkins' ? `// ${p.configName}` : `# ${p.configName}`;
  const configLines = p.configContent.split('\n');
  const configWithHeader = configLines[0].trim() === headerLine ? p.configContent : `${headerLine}\n${p.configContent}`;
  const codeHtml = highlightYaml(configWithHeader);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(p.title)}</title>
  <meta name="description" content="${escapeHtml(p.description)}">
  <meta property="og:title" content="${escapeHtml(p.title)}">
  <meta property="og:description" content="${escapeHtml(p.description)}">
  <meta property="og:image" content="https://schemalens.tech/og-image.png">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${pageUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="${pageUrl}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SchemaLens ${p.name} Setup",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": "Generate ${p.name} schema diff pipeline in 60 seconds, ${p.name === 'GitHub Actions' ? 'PR comments, GitHub Check Runs' : p.name === 'Jenkins' ? 'console reports, build descriptions, artifact archiving' : 'PR comments, artifact reports'}, breaking change detection, smart skip, support for PostgreSQL MySQL SQLite SQL Server Oracle",
    "url": "${pageUrl}"
  }
  </script>
  <link rel="stylesheet" href="../style.css">
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <style>
    .platform-accent { color: ${p.accent}; }
    .page-header { padding: 56px 0 16px; text-align: center; }
    .page-header h1 { font-size: clamp(1.9rem, 5vw, 2.8rem); font-weight: 800; margin-bottom: 14px; letter-spacing: -0.02em; }
    .timer-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border); color: var(--text-muted); font-size: 0.85rem; padding: 6px 14px; border-radius: 999px; margin-bottom: 18px; }
    .timer-badge strong { color: var(--text); }
    .page-header p { color: var(--text-muted); font-size: 1.1rem; max-width: 620px; margin: 0 auto; }
    .code-block { background: #0f172a; color: #e2e8f0; border-radius: var(--radius); padding: 20px; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.85rem; line-height: 1.6; margin: 16px 0; }
    .code-block .comment { color: #64748b; }
    .code-block .key { color: #7dd3fc; }
    .code-block .str { color: #86efac; }
    .cta-bar { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 28px; text-align: center; margin: 28px 0; }
    .cta-bar h2 { font-size: 1.25rem; margin-bottom: 8px; }
    .cta-bar p { color: var(--text-muted); margin-bottom: 16px; }
    .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin: 28px 0; }
    .feature-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
    .feature-card h3 { font-size: 1rem; margin-bottom: 8px; }
    .feature-card p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; }
    .steps { display: flex; flex-direction: column; gap: 16px; margin: 28px 0; }
    .step { display: flex; gap: 16px; align-items: flex-start; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
    .step-num { flex-shrink: 0; width: 32px; height: 32px; background: var(--primary); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; }
    .step h3 { font-size: 1rem; margin-bottom: 4px; }
    .step p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; }
    .preview-box { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; margin: 28px 0; }
    .preview-box h3 { font-size: 1rem; margin-bottom: 14px; }
    .pr-comment { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; font-size: 0.85rem; }
  </style>
<script>
(function() {
  const saved = localStorage.getItem('schemalens-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  if (saved === 'light' || (!saved && prefersLight)) {
    document.documentElement.dataset.theme = 'light';
  }
})();
</script>
<script defer src="https://cdn.vercel-insights.com/v1/script.js"></script>
<script src="../lib/analytics-client.js"></script>
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#0f0f0f">
  <link rel="apple-touch-icon" href="/favicon.svg">
</head>
<body>
  <div class="container">
    <nav style="display:flex; gap:18px; padding:18px 0; font-size:0.9rem;">
      <a href="../index.html" style="font-weight:700; color:var(--text);">SchemaLens</a>
      <a href="../app.html">App</a>
      <a href="../tools.html">Tools</a>
      <a href="${p.fullGuideHref}">${p.name}</a>
      <a href="../ci-cd-integration.html">CI/CD</a>
      <a href="../pricing.html">Pricing</a>
    </nav>

    <div class="page-header">
      <div class="timer-badge">⏱️ <strong>60 seconds</strong> — no signup required</div>
      <h1>${p.heroH1}</h1>
      <p>${p.heroSub}</p>
    </div>

    <div class="cta-bar">
      <h2>🚀 One config, zero friction</h2>
      <p>Copy this into your repo as <code>${p.configName}</code> or let the wizard auto-detect your schema files.</p>
      <pre class="code-block"><code>${codeHtml}</code></pre>
      <a href="${p.wizardHref}" class="btn btn-primary btn-lg" data-analytics="${p.analyticsPrefix}_open_wizard_click">⚡ Generate my ${p.name} config</a>
      <a href="${p.downloadHref}" class="btn btn-secondary" ${p.key === 'github' ? '' : 'download'} data-analytics="${p.analyticsPrefix}_download_click">${p.downloadText}</a>
    </div>

    <div class="preview-box">
      <h3>${p.previewTitle}</h3>
      <div class="pr-comment">
        <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid var(--border);">
          <div style="width:28px; height:28px; border-radius:50%; background:${p.prAvatarBg}; display:flex; align-items:center; justify-content:center; color:#fff; font-size:0.7rem; font-weight:700;">SL</div>
          <div>
            <strong>SchemaLens Bot</strong>
            <div style="font-size:0.78rem; color:var(--text-muted);">commented 2 minutes ago</div>
          </div>
        </div>
        <p>🔍 <strong>SchemaLens Schema Diff Report</strong></p>
        <table style="width:100%; border-collapse:collapse; font-size:0.8rem; margin:8px 0;">
          <tr style="border-bottom:1px solid var(--border);"><td style="padding:4px 0;">🟢 Tables Added</td><td style="padding:4px 0; text-align:right;">1</td></tr>
          <tr style="border-bottom:1px solid var(--border);"><td style="padding:4px 0;">🔴 Tables Removed</td><td style="padding:4px 0; text-align:right;">0</td></tr>
          <tr style="border-bottom:1px solid var(--border);"><td style="padding:4px 0;">🟡 Tables Modified</td><td style="padding:4px 0; text-align:right;">2</td></tr>
          <tr style="border-bottom:1px solid var(--border);"><td style="padding:4px 0;">⚠️ Breaking Changes</td><td style="padding:4px 0; text-align:right;">1</td></tr>
          <tr><td style="padding:4px 0;">📊 Risk Score</td><td style="padding:4px 0; text-align:right;">42/100 (Medium)</td></tr>
        </table>
        <pre style="background:#0f172a; padding:10px; border-radius:6px; overflow-x:auto; font-size:0.8rem; margin:8px 0;"><code>ALTER TABLE users
  ADD COLUMN email_verified_at TIMESTAMP;</code></pre>
      </div>
    </div>

    <h2 style="text-align:center; font-size:1.3rem; margin: 36px 0 8px;">Why ${p.name === 'Azure DevOps' ? 'Azure DevOps' : p.name} teams use SchemaLens</h2>
    <div class="feature-grid">
${featureList}
    </div>

    <h2 style="text-align:center; font-size:1.3rem; margin: 36px 0 8px;">Get it running in 3 steps</h2>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <div>
          <h3>Open the ${p.name} wizard</h3>
          <p>The wizard auto-detects SQL files from your public GitHub repo and selects the right dialect for your ${p.name} pipeline.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div>
          <h3>Copy the generated config</h3>
          <p>Paste it into <code>${p.configName}</code> at the root of your repo. Adjust <code>SCHEMA_PATH</code> if your schema lives elsewhere.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div>
          <h3>Open your next pull request</h3>
          <p>SchemaLens compares the target branch schema against your branch and posts the result as a ${p.name === 'Jenkins' ? 'build report' : 'PR comment'}.</p>
        </div>
      </div>
    </div>

    <div class="cta-bar">
      <h2>Ready to add schema diff to your ${p.name} repo?</h2>
      <p>It takes 60 seconds and works with PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.</p>
      <a href="${p.wizardHref}" class="btn btn-primary btn-lg" data-analytics="${p.analyticsPrefix}_bottom_cta_click">⚡ Generate ${p.name} config</a>
      <a href="add-schema-diff-to-any-repo.html" class="btn btn-secondary" style="margin-left: 10px;" data-analytics="${p.analyticsPrefix}_other_platforms_click">Other platforms</a>
    </div>

    <footer style="border-top:1px solid var(--border); padding: 32px 0; margin-top: 48px; text-align:center; color: var(--text-muted); font-size:0.85rem;">
      <p><a href="../index.html">SchemaLens</a> — free schema diff for developers. <a href="${p.fullGuideHref}">Full ${p.name} guide</a> · <a href="../ci-cd-integration.html">All CI/CD integrations</a></p>
    </footer>
  </div>
</body>
</html>`;
}

for (const p of platforms) {
  const fileName = `${p.key}-schema-diff-in-60-seconds.html`;
  const outPath = path.join(OUT_DIR, fileName);
  fs.writeFileSync(outPath, renderPage(p), 'utf8');
  console.log(`Generated ${outPath}`);
}
