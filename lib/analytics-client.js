/**
 * SchemaLens lightweight client-side analytics
 * Sends anonymous events to /api/analytics
 * No cookies, no personal data, no third parties
 */
(function () {
  const endpoint = '/api/analytics';
  // Skip analytics on localhost to avoid console errors in dev/test environments
  const isLocal = /^(localhost|127\.0\.0\.1|::1|.*\.local)$/.test(location.hostname);
  const sessionId = (Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)).slice(0, 16);
  let queue = [];
  let flushing = false;

  function send(payload) {
    if (typeof navigator === 'undefined' || !navigator.sendBeacon) {
      // Fallback to fetch with keepalive
      try {
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(() => {});
      } catch (e) {}
      return;
    }
    navigator.sendBeacon(endpoint, new Blob([JSON.stringify(payload)], { type: 'application/json' }));
  }

  function flush() {
    if (flushing || queue.length === 0) return;
    flushing = true;
    const batch = queue.splice(0, 10);
    batch.forEach(send);
    flushing = false;
    if (queue.length > 0) {
      setTimeout(flush, 100);
    }
  }

  function track(eventType, metadata) {
    if (isLocal) return;
    const payload = {
      event_type: eventType,
      page_path: location.pathname + location.search,
      metadata: Object.assign({}, metadata || {}, { sid: sessionId })
    };
    queue.push(payload);
    // Debounce flush
    clearTimeout(track._t);
    track._t = setTimeout(flush, 500);
  }

  // Auto-track page view
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => track('page_view'));
  } else {
    track('page_view');
  }

  // Capture UTM parameters on first landing and send a dedicated event
  function captureUtm() {
    try {
      const params = new URLSearchParams(location.search);
      const utm = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (key) {
        const val = params.get(key);
        if (val) utm[key] = val;
      });
      if (Object.keys(utm).length > 0) {
        track('utm_visit', utm);
      }
    } catch (e) {}
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', captureUtm);
  } else {
    captureUtm();
  }

  // Auto-track clicks on elements with data-event attributes
  function attachDataEventTracking() {
    try {
      document.addEventListener('click', function (e) {
        const el = e.target.closest('[data-event]');
        if (!el) return;
        const eventType = el.getAttribute('data-event');
        if (!eventType) return;
        const metadata = {};
        if (el.hasAttribute('data-event-platform')) metadata.platform = el.getAttribute('data-event-platform');
        if (el.hasAttribute('data-event-location')) metadata.location = el.getAttribute('data-event-location');
        if (el.href) metadata.href = el.href.split('?')[0];
        track(eventType, metadata);
      });
    } catch (e) {}
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachDataEventTracking);
  } else {
    attachDataEventTracking();
  }

  // Expose global
  window.SchemaLensAnalytics = { track, sessionId };
})();
