/**
 * SchemaLens GitHub Stars Badge
 * Fetches the live star count for aimadetools/race-kimi and injects it into
 * elements with [data-github-stars]. Gracefully degrades to a static link.
 */
(function () {
  const REPO = 'aimadetools/race-kimi';
  const CACHE_KEY = 'schemalens-github-stars';
  const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

  function formatStars(n) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    return String(n);
  }

  function render(count) {
    document.querySelectorAll('[data-github-stars]').forEach(el => {
      const link = el.closest('a') || el;
      const formatted = formatStars(count);
      if (el.hasAttribute('data-github-stars-replace')) {
        el.textContent = formatted;
      } else {
        el.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="vertical-align:-2px;margin-right:4px;">
            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
          </svg>
          Star <span data-github-stars-replace="true">${formatted}</span>
        `;
      }
      if (link.tagName === 'A' && !link.getAttribute('href')) {
        link.setAttribute('href', `https://github.com/${REPO}`);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
      }
    });
  }

  function load() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { value, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL) render(value);
      } catch (e) { /* ignore */ }
    }

    fetch(`https://api.github.com/repos/${REPO}`)
      .then(r => {
        if (!r.ok) throw new Error('GitHub API ' + r.status);
        return r.json();
      })
      .then(data => {
        const count = data && typeof data.stargazers_count === 'number' ? data.stargazers_count : 0;
        render(count);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ value: count, ts: Date.now() }));
      })
      .catch(() => {
        // Graceful degradation: leave static content or render a generic badge
        document.querySelectorAll('[data-github-stars]').forEach(el => {
          if (!el.innerHTML.includes('Star')) {
            el.innerHTML = `<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="vertical-align:-2px;margin-right:4px;"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg> Star on GitHub`;
          }
        });
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', load);
  } else {
    load();
  }
})();
