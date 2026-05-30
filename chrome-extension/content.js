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

  function encodeSchemaLensPayload(a, b, dialect) {
    const payload = JSON.stringify({ a: a || '', b: b || '', d: dialect });
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

  function isPrFilesPage() {
    const url = new URL(location.href);
    return /\/pull\/\d+\/files/.test(url.pathname);
  }

  function parsePrUrl() {
    const url = new URL(location.href);
    const match = url.pathname.match(/^\/([^/]+)\/([^/]+)\/pull\/(\d+)\/files/);
    if (!match) return null;
    return { owner: match[1], repo: match[2], number: match[3] };
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
      fetch('https://schemalens.tech/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(() => {});
    } catch (e) {}
  }

  // ===== Blob page button (existing) =====
  function createBlobButton() {
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
        const hash = encodeSchemaLensPayload(content, '', dialect);
        trackEvent('extension_button_clicked', { dialect, repo: path.split('/')[2], context: 'blob' });
        window.open(`${APP_URL}#diff=${hash}`, '_blank');
      } catch (err) {
        console.error('[SchemaLens]', err);
        trackEvent('extension_button_error', { error: err.message, context: 'blob' });
        alert('Could not load the SQL file. Try opening SchemaLens manually at schemalens.tech');
      } finally {
        btn.style.opacity = '1';
        btn.querySelector('span').textContent = 'Open in SchemaLens';
      }
    });
    return btn;
  }

  function injectBlobButton() {
    if (!isSqlFilePage()) return;
    if (document.querySelector('[data-schemalens-btn="blob"]')) return;

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
        const btn = createBlobButton();
        btn.setAttribute('data-schemalens-btn', 'blob');
        container.appendChild(btn);
        trackEvent('extension_button_injected', { context: 'blob' });
        return;
      }
    }
  }

  // ===== PR diff page buttons (new) =====
  const prCache = new Map();

  async function fetchPrBaseHead(prInfo) {
    const cacheKey = `${prInfo.owner}/${prInfo.repo}#${prInfo.number}`;
    if (prCache.has(cacheKey)) return prCache.get(cacheKey);

    const url = `https://api.github.com/repos/${prInfo.owner}/${prInfo.repo}/pulls/${prInfo.number}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const data = await res.json();
    const result = {
      baseRef: data.base?.ref,
      baseSha: data.base?.sha,
      headRef: data.head?.ref,
      headSha: data.head?.sha
    };
    prCache.set(cacheKey, result);
    return result;
  }

  async function fetchFileContent(owner, repo, path, ref) {
    const encodedPath = encodeURIComponent(path).replace(/%2F/g, '/');
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}?ref=${ref}`;
    const res = await fetch(url);
    if (res.status === 404) return null; // File doesn't exist at this ref
    if (!res.ok) throw new Error(`GitHub Contents API error: ${res.status}`);
    const data = await res.json();
    if (data.encoding === 'base64') {
      try {
        return atob(data.content.replace(/\n/g, ''));
      } catch (e) {
        throw new Error('Failed to decode file content');
      }
    }
    return data.content;
  }

  function createPrDiffButton(prInfo, filePath, fileStatus) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-sm';
    btn.style.cssText = 'display:inline-flex;align-items:center;gap:4px;margin-left:8px;color:#6366f1;border-color:#6366f1;';
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 28 28" fill="none" style="vertical-align:middle">
        <rect width="28" height="28" rx="7" fill="#6366f1"/>
        <path d="M8 10h12M8 14h12M8 18h8" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <span>Diff in SchemaLens</span>
    `;

    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.querySelector('span').textContent = 'Loading…';

      try {
        const refs = await fetchPrBaseHead(prInfo);
        let baseContent = '';
        let headContent = '';

        if (fileStatus === 'added') {
          headContent = await fetchFileContent(prInfo.owner, prInfo.repo, filePath, refs.headSha || refs.headRef);
        } else if (fileStatus === 'removed') {
          baseContent = await fetchFileContent(prInfo.owner, prInfo.repo, filePath, refs.baseSha || refs.baseRef);
        } else {
          // Modified or renamed
          const [base, head] = await Promise.all([
            fetchFileContent(prInfo.owner, prInfo.repo, filePath, refs.baseSha || refs.baseRef),
            fetchFileContent(prInfo.owner, prInfo.repo, filePath, refs.headSha || refs.headRef)
          ]);
          baseContent = base || '';
          headContent = head || '';
        }

        const dialect = detectDialect(filePath, headContent || baseContent);
        const hash = encodeSchemaLensPayload(baseContent, headContent, dialect);
        trackEvent('extension_pr_diff_clicked', {
          dialect,
          repo: prInfo.repo,
          status: fileStatus,
          file: filePath
        });
        window.open(`${APP_URL}#diff=${hash}`, '_blank');
      } catch (err) {
        console.error('[SchemaLens]', err);
        trackEvent('extension_pr_diff_error', { error: err.message, file: filePath });
        alert('Could not load schema files. This may be a private repository or the file is too large. Try opening SchemaLens manually at schemalens.tech');
      } finally {
        btn.disabled = false;
        btn.querySelector('span').textContent = 'Diff in SchemaLens';
      }
    });

    return btn;
  }

  function getFileStatus(fileEl) {
    // GitHub shows status badges like "Added", "Deleted", "Modified", "Renamed"
    const badge = fileEl.querySelector('.file-info .diffstat, .file-info .text-emphasized, [data-testid="file-header"] .text-emphasized');
    if (badge) {
      const text = badge.textContent.toLowerCase();
      if (text.includes('added')) return 'added';
      if (text.includes('deleted') || text.includes('removed')) return 'removed';
      if (text.includes('renamed')) return 'renamed';
    }
    // Fallback: check for empty diff sides
    const deletedLines = fileEl.querySelectorAll('.blob-code-deletion').length;
    const addedLines = fileEl.querySelectorAll('.blob-code-addition').length;
    if (deletedLines === 0 && addedLines > 0) return 'added';
    if (addedLines === 0 && deletedLines > 0) return 'removed';
    return 'modified';
  }

  function injectPrDiffButtons() {
    if (!isPrFilesPage()) return;

    const prInfo = parsePrUrl();
    if (!prInfo) return;

    // Find all file diff containers
    const fileEls = document.querySelectorAll('.file, [data-testid="file-diff"], .js-file');

    for (const fileEl of fileEls) {
      // Skip if already injected
      if (fileEl.querySelector('[data-schemalens-btn="pr"]')) continue;

      // Find the file path
      let filePath = null;
      const pathEl = fileEl.querySelector('.file-header .file-info a[title], [data-testid="file-header"] a[title], .file-info .Link--primary');
      if (pathEl) {
        filePath = pathEl.getAttribute('title') || pathEl.textContent.trim();
      }
      if (!filePath) {
        // Try data attribute
        const dataPath = fileEl.querySelector('[data-tagsearch-path]');
        if (dataPath) filePath = dataPath.getAttribute('data-tagsearch-path');
      }
      if (!filePath) continue;
      if (!filePath.toLowerCase().endsWith('.sql')) continue;

      // Find the file actions container
      let actionsContainer = fileEl.querySelector('.file-header .file-actions, [data-testid="file-header"] .file-actions, .file-actions');
      if (!actionsContainer) {
        // Some layouts have the actions in a different place
        const header = fileEl.querySelector('.file-header, [data-testid="file-header"]');
        if (header) {
          actionsContainer = header.querySelector('.d-flex, .BtnGroup');
        }
      }
      if (!actionsContainer) continue;

      const status = getFileStatus(fileEl);
      const btn = createPrDiffButton(prInfo, filePath, status);
      btn.setAttribute('data-schemalens-btn', 'pr');
      actionsContainer.appendChild(btn);
      trackEvent('extension_button_injected', { context: 'pr', file: filePath, status });
    }
  }

  // ===== Initialization =====
  function init() {
    injectBlobButton();
    injectPrDiffButtons();
  }

  init();

  // Re-inject on SPA navigation
  const observer = new MutationObserver(() => {
    injectBlobButton();
    injectPrDiffButtons();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
