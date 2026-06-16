/**
 * SchemaLens UTM Parameter Preservation
 * Reads UTM params from the URL and appends them to internal links/CTAs
 * so newsletter/directory traffic keeps attribution as users navigate.
 * Include on any landing page that expects UTM-tagged inbound links.
 */
(function () {
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  function getUtms() {
    try {
      const params = new URLSearchParams(location.search);
      const utms = {};
      UTM_KEYS.forEach(function (key) {
        const val = params.get(key);
        if (val) utms[key] = val;
      });
      return utms;
    } catch (e) {
      return {};
    }
  }

  function appendUtmsToUrl(url, utms) {
    if (!url || url.indexOf('/') !== 0 && url.indexOf('https://schemalens.tech') !== 0) {
      return url;
    }
    const keys = Object.keys(utms);
    if (keys.length === 0) return url;
    const parsed = new URL(url, location.origin);
    keys.forEach(function (key) {
      if (!parsed.searchParams.has(key)) {
        parsed.searchParams.set(key, utms[key]);
      }
    });
    return parsed.pathname + parsed.search + parsed.hash;
  }

  function rewriteLinks(utms) {
    if (Object.keys(utms).length === 0) return;
    document.querySelectorAll('a[href]').forEach(function (a) {
      const href = a.getAttribute('href');
      if (!href) return;
      // Only rewrite internal links and schemalens.tech links
      if (href.indexOf('/') !== 0 && href.indexOf('https://schemalens.tech') !== 0 && href.indexOf('http') === 0) {
        return;
      }
      // Skip anchors, mailto, tel
      if (href.indexOf('#') === 0 || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;
      a.setAttribute('href', appendUtmsToUrl(href, utms));
    });
  }

  function init() {
    const utms = getUtms();
    rewriteLinks(utms);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
