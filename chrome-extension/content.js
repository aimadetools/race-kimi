(() => {
  'use strict';

  const APP_URL = 'https://schemalens.tech/app.html';

  function detectDialect(path, content) {
    const p = path.toLowerCase();
    if (p.includes('postgres') || p.includes('pg_') || p.includes('/pg/')) return 'postgres';
    if (p.includes('mysql') || p.includes('mariadb')) return 'mysql';
    if (p.includes('sqlite')) return 'sqlite';
    if (p.includes('mssql') || p.includes('sqlserver') || p.includes('sql-server')) return 'mssql';
    if (p.includes('oracle')) return 'oracle';
    // Content heuristics
    if (content) {
      const c = content.toLowerCase().slice(0, 2000);
      if (c.includes('serial') || c.includes('varchar')) return 'postgres';
      if (c.includes('auto_increment')) return 'mysql';
      if (c.includes('nvarchar') || c.includes('[dbo]')) return 'mssql';
      if (c.includes('number(') || c.includes('varchar2')) return 'oracle';
    }
    return 'postgres';
  }

  function encodeSchemaLensPayload(a, dialect) {
    const payload = JSON.stringify({ a, b: '', d: dialect });
    return btoa(encodeURIComponent(payload));
  }

  function getRawUrl() {
    // GitHub blob URL: https://github.com/owner/repo/blob/branch/path/to/file.sql
    const url = new URL(location.href);
    const parts = url.pathname.split('/');
    if (parts.length < 5 || parts[3] !== 'blob') return null;
    const [_, owner, repo, __, ...rest] = parts;
    return `https://raw.githubusercontent.com/${owner}/${repo}/${rest.join('/')}`;
  }

  function isSqlFilePage() {
    const url = new URL(location.href);
    return url.pathname.endsWith('.sql') && url.pathname.includes('/blob/');
  }

  function trackEvent(event, props = {}) {
    try {
      const payload = {
        event,
        source: 'chrome-extension',
        url: location.href,
        timestamp: Date.now(),
        ...props
      };
      // Fire-and-forget analytics ping
      fetch('https://schemalens.tech/api/analytics.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(() => {});
    } catch (e) {}
  }

  function createButton() {
    const btn = document.createElement('a');
    btn.className = 'btn-octicon tooltipped tooltipped-nw';
    btn.setAttribute('aria-label', 'Open in SchemaLens');
    btn.setAttribute('role', 'button');
    btn.style.cssText = 'display:inline-flex;align-items:center;gap:4px;padding:4px 8px;color:#6366f1;font-weight:600;font-size:12px;cursor:pointer;';
    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 28 28" fill="none" style="vertical-align:middle">
        <rect width="28" height="28" rx="7" fill="#6366f1"/>
        <path d="M8 10h12M8 14h12M8 18h8" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span>Open in SchemaLens</span>
    `;
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const rawUrl = getRawUrl();
      if (!rawUrl) return;

      btn.style.opacity = '0.6';
      btn.querySelector('span').textContent = 'Loading…';

      try {
        const res = await fetch(rawUrl, { cache: 'no-cache' });
        if (!res.ok) throw new Error('Failed to fetch');
        const content = await res.text();
        const path = new URL(location.href).pathname;
        const dialect = detectDialect(path, content);
        const hash = encodeSchemaLensPayload(content, dialect);
        trackEvent('extension_button_clicked', { dialect, repo: path.split('/')[2] });
        window.open(`${APP_URL}#diff=${hash}`, '_blank');
      } catch (err) {
        console.error('[SchemaLens]', err);
        trackEvent('extension_button_error', { error: err.message });
        alert('Could not load the SQL file. Try opening SchemaLens manually at schemalens.tech');
      } finally {
        btn.style.opacity = '1';
        btn.querySelector('span').textContent = 'Open in SchemaLens';
      }
    });
    return btn;
  }

  function injectButton() {
    if (!isSqlFilePage()) return;
    // Avoid duplicate buttons
    if (document.querySelector('[data-schemalens-btn]')) return;

    // Try multiple selectors for GitHub's file actions toolbar
    const selectors = [
      '.file-header .file-actions .BtnGroup',
      '.Box-header .d-flex .BtnGroup',
      '[data-testid="file-header"] .d-flex .BtnGroup',
      '.react-blob-header .d-flex .BtnGroup',
      '.file-actions',
      '[data-testid="blob-toolbar"] .BtnGroup',
      '.BlobToolbar .BtnGroup'
    ];

    for (const sel of selectors) {
      const container = document.querySelector(sel);
      if (container) {
        const btn = createButton();
        btn.setAttribute('data-schemalens-btn', 'true');
        container.appendChild(btn);
        trackEvent('extension_button_injected');
        return;
      }
    }
  }

  // Initial injection
  injectButton();

  // Re-inject on SPA navigation
  const observer = new MutationObserver(() => {
    injectButton();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
