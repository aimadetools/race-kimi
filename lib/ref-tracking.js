/**
 * SchemaLens Referral Tracking
 * Reads ?ref= from URL, persists to localStorage, appends to Gumroad links.
 * Include on every page that has purchase links.
 */
(function() {
  const GUMROAD_URL = 'https://gumroad.com/l/schemalens-pro';
  const STORAGE_KEY = 'schemalens_ref';
  const SESSION_KEY = 'schemalens_ref_session';

  function getRef() {
    try {
      // 1. Check URL param first (highest priority)
      const params = new URLSearchParams(location.search);
      const urlRef = params.get('ref');
      if (urlRef && /^[a-zA-Z0-9_-]{1,40}$/.test(urlRef)) {
        return urlRef;
      }
      // 2. Check localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && /^[a-zA-Z0-9_-]{1,40}$/.test(stored)) {
        return stored;
      }
    } catch (e) {}
    return null;
  }

  function storeRef(ref) {
    try {
      localStorage.setItem(STORAGE_KEY, ref);
      sessionStorage.setItem(SESSION_KEY, ref);
    } catch (e) {}
  }

  function appendRefToUrl(url, ref) {
    if (!ref) return url;
    const separator = url.includes('?') ? '&' : '?';
    // Avoid double-appending
    if (url.includes('ref=' + ref) || url.includes('ref=' + encodeURIComponent(ref))) {
      return url;
    }
    return url + separator + 'ref=' + encodeURIComponent(ref);
  }

  function rewriteGumroadLinks(ref) {
    if (!ref) return;
    document.querySelectorAll('a[href*="gumroad.com/l/schemalens-pro"]').forEach(function(a) {
      a.href = appendRefToUrl(a.href, ref);
    });
  }

  function trackRefEvent(ref, eventType) {
    try {
      if (window.SchemaLensAnalytics && window.SchemaLensAnalytics.track) {
        window.SchemaLensAnalytics.track(eventType, { ref, page: location.pathname });
      }
    } catch (e) {}
    // Also fire a lightweight fetch to analytics_events
    try {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: eventType,
          page_path: location.pathname,
          metadata: { ref }
        }),
        keepalive: true
      }).catch(() => {});
    } catch (e) {}
  }

  function init() {
    const ref = getRef();
    if (ref) {
      storeRef(ref);
      rewriteGumroadLinks(ref);
      // Only track once per session to avoid spam
      const sessionTracked = sessionStorage.getItem(SESSION_KEY + '_tracked');
      if (!sessionTracked) {
        trackRefEvent(ref, 'ref_visit');
        sessionStorage.setItem(SESSION_KEY + '_tracked', '1');
      }
    }

    // Listen for dynamically added Gumroad links (e.g., in modals)
    document.addEventListener('click', function(e) {
      const a = e.target.closest && e.target.closest('a[href*="gumroad.com/l/schemalens-pro"]');
      if (a) {
        const currentRef = getRef();
        if (currentRef && !a.href.includes('ref=')) {
          a.href = appendRefToUrl(a.href, currentRef);
        }
        if (currentRef) {
          trackRefEvent(currentRef, 'ref_click_gumroad');
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
