#!/usr/bin/env python3
"""Generate client-specific MCP server landing pages from a shared template."""

import os

TEMPLATE = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
  <meta name="description" content="{{DESCRIPTION}}">
  <link rel="canonical" href="https://schemalens.tech/{{FILENAME}}">
  <meta property="og:title" content="{{OG_TITLE}}">
  <meta property="og:description" content="{{OG_DESCRIPTION}}">
  <meta property="og:url" content="https://schemalens.tech/{{FILENAME}}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://schemalens.tech/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{OG_TITLE}}">
  <meta name="twitter:description" content="{{OG_DESCRIPTION}}">
  <meta name="twitter:image" content="https://schemalens.tech/og-image.png">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SchemaLens MCP Server for {{CLIENT}}",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": "MCP server for SQL schema diff, migration generation, and breaking change detection inside {{CLIENT}}. Runs locally.",
    "url": "https://schemalens.tech/{{FILENAME}}"
  }
  </script>
  <link rel="stylesheet" href="style.css">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
  <script>
  (function() {
    const saved = localStorage.getItem('schemalens-theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    if (saved === 'light' || (!saved && prefersLight)) {
      document.documentElement.dataset.theme = 'light';
    }
    window.toggleTheme = function() {
      const isLight = document.documentElement.dataset.theme === 'light';
      document.documentElement.dataset.theme = isLight ? 'dark' : 'light';
      localStorage.setItem('schemalens-theme', isLight ? 'dark' : 'light');
    };
  })();
  </script>
  <script defer src="https://cdn.vercel-insights.com/v1/script.js"></script>
  <script src="lib/analytics-client.js"></script>
  <style>
    .page-header { padding: 48px 0 24px; text-align: center; }
    .page-header h1 { font-size: clamp(1.7rem, 4vw, 2.4rem); font-weight: 800; margin-bottom: 10px; }
    .page-header p { color: var(--text-muted); font-size: 1.05rem; max-width: 680px; margin: 0 auto; }
    .badge-free { display:inline-block; background: #10b981; color: #fff; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 999px; text-transform: uppercase; vertical-align: middle; margin-left: 6px; }
    .code-block { background: #0f172a; color: #e2e8f0; border-radius: var(--radius); padding: 20px; overflow-x: auto; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.9rem; line-height: 1.6; margin: 16px 0; position: relative; }
    .code-block .comment { color: #64748b; }
    .code-block .key { color: #7dd3fc; }
    .code-block .str { color: #86efac; }
    .code-block .num { color: #fca5a5; }
    .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin: 32px 0; }
    .feature-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
    .feature-card h3 { font-size: 1rem; margin-bottom: 8px; }
    .feature-card p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; }
    .step { display: flex; gap: 16px; margin: 24px 0; align-items: flex-start; }
    .step-num { flex-shrink: 0; width: 32px; height: 32px; background: var(--primary); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.9rem; }
    .step-body { flex: 1; }
    .step-body h3 { font-size: 1.05rem; margin-bottom: 6px; }
    .step-body p { color: var(--text-muted); font-size: 0.92rem; margin-bottom: 8px; }
    .cta-bar { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; text-align: center; margin: 32px 0; }
    .cta-bar h2 { font-size: 1.3rem; margin-bottom: 8px; }
    .cta-bar p { color: var(--text-muted); margin-bottom: 16px; }
    .tool-list { list-style: none; padding: 0; margin: 16px 0; }
    .tool-list li { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; margin-bottom: 12px; }
    .tool-list li strong { display: block; font-size: 1rem; margin-bottom: 4px; }
    .tool-list li span { color: var(--text-muted); font-size: 0.9rem; }
    .prompt-card { background: var(--bg); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 16px; margin: 10px 0; font-size: 0.92rem; }
    .prompt-card strong { color: var(--primary); }
    .btn-copy { position: absolute; top: 12px; right: 12px; background: var(--surface); color: var(--text); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 6px 10px; font-size: 0.8rem; cursor: pointer; }
    .btn-copy:hover { border-color: var(--primary); }
    .btn-copy.copied { background: var(--success); color: #fff; border-color: var(--success); }
    .announcement-bar {
      background: linear-gradient(90deg, var(--primary), var(--secondary));
      color: #fff;
      text-align: center;
      padding: 10px 16px;
      font-size: 0.9rem;
      font-weight: 500;
    }
    .announcement-bar a { color: #fff; text-decoration: underline; font-weight: 700; }
    .client-tabs { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin: 20px 0; }
    .client-tabs a { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 8px 14px; font-size: 0.85rem; color: var(--text-muted); text-decoration: none; }
    .client-tabs a.active { background: var(--primary); color: #fff; border-color: var(--primary); }
  </style>
</head>
<body>
  <div class="announcement-bar">
    🏁 Final Week — Lifetime Pro <strong>$39</strong> until July 10. <a href="launch-special.html">Claim yours →</a>
  </div>
  <div class="container">
    <nav style="display:flex; gap:18px; padding:18px 0; font-size:0.9rem; flex-wrap:wrap;">
      <a href="index.html" style="font-weight:700; color:var(--text);">SchemaLens</a>
      <a href="app.html">App</a>
      <a href="tools.html">Tools</a>
      <a href="pricing.html">Pricing</a>
      <a href="github-action.html">GitHub Action</a>
      <a href="api-guide.html">API</a>
      <a href="ci-cd-integration.html">CI/CD</a>
    </nav>

    <div class="page-header">
      <h1>SchemaLens MCP Server for {{CLIENT}} <span class="badge-free">Free</span></h1>
      <p>{{HERO}}</p>
      <div class="client-tabs">
        <a href="mcp-server-claude.html" {{CLAUDE_ACTIVE}}>Claude</a>
        <a href="mcp-server-cursor.html" {{CURSOR_ACTIVE}}>Cursor</a>
        <a href="mcp-server-vscode.html" {{VSCODE_ACTIVE}}>VS Code</a>
        <a href="mcp-server.html">All clients</a>
      </div>
    </div>

    <div class="cta-bar">
      <h2>🤖 Add SchemaLens to {{CLIENT}} in 60 seconds</h2>
      <p>Free, open-source MCP server. No account. No API key. Your schemas never leave your machine.</p>
      <a href="https://github.com/aimadetools/race-kimi/blob/main/mcp-server.js" class="btn btn-secondary" target="_blank" rel="noopener" data-event="mcp_{{SLUG}}_view_source">View source on GitHub</a>
      <a href="app.html" class="btn btn-primary" data-event="mcp_{{SLUG}}_try_web_app">Try the web app →</a>
    </div>

    <div class="feature-grid">
      <div class="feature-card">
        <h3>🔍 Semantic Schema Diff</h3>
        <p>Ask {{CLIENT}} to compare two schemas and get a structured summary of added, removed, and modified tables, columns, indexes, and constraints.</p>
      </div>
      <div class="feature-card">
        <h3>🛡️ Breaking Change Detection</h3>
        <p>Spot risky changes before they ship: dropped columns, type changes, NOT NULL additions, dropped foreign keys, and more.</p>
      </div>
      <div class="feature-card">
        <h3>📝 Migration SQL Generation</h3>
        <p>Generate forward and rollback migration scripts in PostgreSQL, MySQL, SQLite, SQL Server, or Oracle dialects.</p>
      </div>
      <div class="feature-card">
        <h3>🔒 Runs Locally</h3>
        <p>The MCP server uses the same local engine as the SchemaLens web app. No schemas are uploaded to external servers.</p>
      </div>
    </div>

    <div class="step">
      <div class="step-num">1</div>
      <div class="step-body">
        <h3>Clone the SchemaLens repo</h3>
        <p>{{CLIENT}} will run <code>mcp-server.js</code> directly from your local copy. Open a terminal and clone the repo.</p>
        <div class="code-block">
          <button class="btn-copy" onclick="copyCode(this)">Copy</button>
          <code>git clone https://github.com/aimadetools/race-kimi.git<br>cd race-kimi</code>
        </div>
      </div>
    </div>

    <div class="step">
      <div class="step-num">2</div>
      <div class="step-body">
        <h3>Add to {{CLIENT}}'s MCP config</h3>
        <p>{{CONFIG_INSTRUCTIONS}}</p>
        <div class="code-block">
          <button class="btn-copy" onclick="copyCode(this)">Copy</button>
{{CONFIG_CODE}}
        </div>
      </div>
    </div>

    <div class="step">
      <div class="step-num">3</div>
      <div class="step-body">
        <h3>Restart {{CLIENT}} and start chatting</h3>
        <p>Close and reopen {{CLIENT}} so it picks up the new MCP server, then try these prompts:</p>
{{PROMPTS}}
      </div>
    </div>

    <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; margin: 32px 0;">
      <h2 style="font-size: 1.2rem; margin-bottom: 16px;">🧰 Available tools</h2>
      <ul class="tool-list">
        <li>
          <strong>schemalens_diff_schemas</strong>
          <span>Compare two SQL schemas and return a semantic diff summary with risk score.</span>
        </li>
        <li>
          <strong>schemalens_generate_migration</strong>
          <span>Generate forward and rollback migration SQL for the detected changes.</span>
        </li>
        <li>
          <strong>schemalens_detect_breaking_changes</strong>
          <span>List breaking changes with severity levels (high, medium, low).</span>
        </li>
      </ul>
    </div>

    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: var(--radius); padding: 18px 20px; margin: 24px 0; color: #166534;">
      <strong>Privacy-first by design:</strong> The MCP server loads <code>lib/engine.js</code> from the repo and runs every diff on your local machine. No network calls, no telemetry, no schema uploads.
    </div>

    <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; margin: 32px 0; text-align: center;">
      <h2 style="font-size: 1.2rem; margin-bottom: 10px;">Ready to automate schema reviews?</h2>
      <p style="color: var(--text-muted); margin-bottom: 16px;">Add SchemaLens to your CI/CD pipeline for free and catch breaking changes in every pull request.</p>
      <a href="github-action.html" class="btn btn-primary" data-event="mcp_{{SLUG}}_github_action_cta">SchemaLens GitHub Action →</a>
      <a href="ci-cd-integration.html" class="btn btn-secondary" data-event="mcp_{{SLUG}}_cicd_cta">All CI/CD integrations →</a>
      <a href="team-buy.html" class="btn btn-secondary" data-event="mcp_{{SLUG}}_team_cta">Team plan →</a>
    </div>

    <footer style="border-top:1px solid var(--border); padding: 32px 0; margin-top: 32px; font-size: 0.85rem; color: var(--text-muted);">
      <div style="display:flex; gap:16px; flex-wrap:wrap; justify-content:center; margin-bottom: 16px;">
        <a href="index.html">Home</a>
        <a href="app.html">App</a>
        <a href="tools.html">Tools</a>
        <a href="pricing.html">Pricing</a>
        <a href="mcp-server.html">MCP Server</a>
        <a href="api-guide.html">API</a>
        <a href="github-action.html">GitHub Action</a>
        <a href="community.html">Community</a>
      </div>
      <p style="text-align:center;">© 2026 SchemaLens. Built for developers who ship database changes.</p>
    </footer>
  </div>

  <script>
  function copyCode(btn) {
    const code = btn.parentElement.querySelector('code');
    const text = code ? code.innerText : btn.parentElement.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const original = btn.textContent;
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = original; btn.classList.remove('copied'); }, 1500);
    });
  }
  </script>
</body>
</html>
'''

CLIENTS = {
    'claude': {
        'FILENAME': 'mcp-server-claude.html',
        'CLIENT': 'Claude Desktop',
        'SLUG': 'claude',
        'TITLE': 'SchemaLens MCP Server for Claude Desktop — Diff SQL Schemas in Claude',
        'DESCRIPTION': 'Add SchemaLens schema diff, migration generation, and breaking-change detection to Claude Desktop via MCP. Local, free, no API keys.',
        'OG_TITLE': 'SchemaLens MCP Server for Claude Desktop',
        'OG_DESCRIPTION': 'Diff SQL schemas and generate migrations inside Claude Desktop with the SchemaLens MCP server. Free and local.',
        'HERO': 'Diff SQL schemas, generate migrations, and catch breaking changes inside Claude Desktop — without switching windows.',
        'CONFIG_INSTRUCTIONS': 'Open <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS) or the equivalent config path on your OS. Add the schemalens server under <code>mcpServers</code>.',
        'CONFIG_CODE': '''<span class="comment">// ~/Library/Application Support/Claude/claude_desktop_config.json</span>
{
  <span class="key">"mcpServers"</span>: {
    <span class="key">"schemalens"</span>: {
      <span class="key">"command"</span>: <span class="str">"node"</span>,
      <span class="key">"args"</span>: [<span class="str">"/path/to/race-kimi/mcp-server.js"</span>]
    }
  }
}''',
        'PROMPTS': '''        <div class="prompt-card"><strong>Diff:</strong> "Compare these two PostgreSQL schemas and tell me what changed. [paste schema A] [paste schema B]"</div>
        <div class="prompt-card"><strong>Migration:</strong> "Generate the MySQL migration to go from schema A to schema B."</div>
        <div class="prompt-card"><strong>Breaking changes:</strong> "Are there any breaking changes between these two schemas?"</div>''',
        'CLAUDE_ACTIVE': 'class="active"',
        'CURSOR_ACTIVE': '',
        'VSCODE_ACTIVE': '',
    },
    'cursor': {
        'FILENAME': 'mcp-server-cursor.html',
        'CLIENT': 'Cursor',
        'SLUG': 'cursor',
        'TITLE': 'SchemaLens MCP Server for Cursor — Diff SQL Schemas in Your Editor',
        'DESCRIPTION': 'Add SchemaLens schema diff, migration generation, and breaking-change detection to Cursor via MCP. Local, free, no API keys.',
        'OG_TITLE': 'SchemaLens MCP Server for Cursor',
        'OG_DESCRIPTION': 'Diff SQL schemas and generate migrations inside Cursor with the SchemaLens MCP server. Free and local.',
        'HERO': 'Diff SQL schemas, generate migrations, and catch breaking changes inside Cursor — right next to your code.',
        'CONFIG_INSTRUCTIONS': 'Open Cursor Settings → MCP, or edit <code>~/.cursor/mcp.json</code> directly. Add the schemalens server under <code>mcpServers</code>.',
        'CONFIG_CODE': '''<span class="comment">// ~/.cursor/mcp.json</span>
{
  <span class="key">"mcpServers"</span>: {
    <span class="key">"schemalens"</span>: {
      <span class="key">"command"</span>: <span class="str">"node"</span>,
      <span class="key">"args"</span>: [<span class="str">"/path/to/race-kimi/mcp-server.js"</span>]
    }
  }
}''',
        'PROMPTS': '''        <div class="prompt-card"><strong>Diff:</strong> "Compare these two schemas and show me what changed."</div>
        <div class="prompt-card"><strong>Migration:</strong> "Generate the PostgreSQL ALTER statements to migrate from schema A to schema B."</div>
        <div class="prompt-card"><strong>Breaking changes:</strong> "Will deploying this migration break anything?"</div>''',
        'CLAUDE_ACTIVE': '',
        'CURSOR_ACTIVE': 'class="active"',
        'VSCODE_ACTIVE': '',
    },
    'vscode': {
        'FILENAME': 'mcp-server-vscode.html',
        'CLIENT': 'VS Code',
        'SLUG': 'vscode',
        'TITLE': 'SchemaLens MCP Server for VS Code — Diff SQL Schemas in VS Code',
        'DESCRIPTION': 'Add SchemaLens schema diff, migration generation, and breaking-change detection to VS Code via MCP. Local, free, no API keys.',
        'OG_TITLE': 'SchemaLens MCP Server for VS Code',
        'OG_DESCRIPTION': 'Diff SQL schemas and generate migrations inside VS Code with the SchemaLens MCP server. Free and local.',
        'HERO': 'Diff SQL schemas, generate migrations, and catch breaking changes inside VS Code — without leaving your editor.',
        'CONFIG_INSTRUCTIONS': 'Create or edit <code>.vscode/mcp.json</code> in your project root. Add the schemalens server under <code>mcpServers</code>.',
        'CONFIG_CODE': '''<span class="comment">// .vscode/mcp.json</span>
{
  <span class="key">"mcpServers"</span>: {
    <span class="key">"schemalens"</span>: {
      <span class="key">"command"</span>: <span class="str">"node"</span>,
      <span class="key">"args"</span>: [<span class="str">"/path/to/race-kimi/mcp-server.js"</span>]
    }
  }
}''',
        'PROMPTS': '''        <div class="prompt-card"><strong>Diff:</strong> "Diff these two SQL schemas and summarize the changes."</div>
        <div class="prompt-card"><strong>Migration:</strong> "Generate the SQLite migration script from schema A to schema B."</div>
        <div class="prompt-card"><strong>Breaking changes:</strong> "List any breaking changes in this schema diff."</div>''',
        'CLAUDE_ACTIVE': '',
        'CURSOR_ACTIVE': '',
        'VSCODE_ACTIVE': 'class="active"',
    },
}


def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    for slug, ctx in CLIENTS.items():
        html = TEMPLATE
        for key, value in ctx.items():
            html = html.replace('{{' + key + '}}', value)
        path = os.path.join(root, ctx['FILENAME'])
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
        print(f'Wrote {path}')


if __name__ == '__main__':
    main()
