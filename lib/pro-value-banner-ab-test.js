/**
 * SchemaLens Pro Value Banner A/B Test
 * Tests headline framing and placement of the Pro value preview banner in app.html.
 *
 * Variants:
 *   - control: "Export & Share" framing, banner above results tabs
 *   - v1:      "Save & Revisit" framing, banner above results tabs
 *   - v2:      "Export & Share" framing, banner inside the Visual Diff tab
 *   - v3:      "Save & Revisit" framing, banner inside the Visual Diff tab
 *
 * Existing analytics events (pro_value_banner_*) are enriched with the variant.
 */
(function () {
  const STORAGE_KEY = 'sl_pro_value_banner_ab_variant';
  const ENDPOINT = '/api/analytics';
  const isLocal = /^(localhost|127\.0\.0\.1|::1|.*\.local)$/.test(location.hostname);

  function send(eventType, metadata) {
    if (isLocal) return;
    const payload = {
      event_type: eventType,
      page_path: location.pathname + location.search,
      metadata: Object.assign({}, metadata || {}, {
        sid: (window.SchemaLensAnalytics && window.SchemaLensAnalytics.sessionId) || '',
      }),
    };
    const body = JSON.stringify(payload);
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }));
      } else {
        fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
      }
    } catch (e) {}
  }

  function assignVariant() {
    const r = Math.random();
    if (r < 0.25) return 'control';
    if (r < 0.50) return 'v1';
    if (r < 0.75) return 'v2';
    return 'v3';
  }

  function getVariant() {
    let variant = localStorage.getItem(STORAGE_KEY);
    if (!variant) {
      variant = assignVariant();
      localStorage.setItem(STORAGE_KEY, variant);
      send('pro_value_banner_ab_assigned', { variant });
    }
    return variant;
  }

  function resetVariant() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function isInsidePanel(variant) {
    return variant === 'v2' || variant === 'v3';
  }

  function getCopy(variant) {
    const saveRevisit = variant === 'v1' || variant === 'v3';
    if (saveRevisit) {
      return {
        headline: '💾 Save & revisit every diff',
        body: 'Your diff results are free forever. Pro keeps a history of every comparison, so you can come back to any migration decision without re-pasting SQL.',
        features: [
          '🕐 Revisit past diffs anytime',
          '🔗 Copy a shareable diff link',
          '📄 Export Markdown / PDF / JSON',
        ],
        ctaPrimary: '⚡ Unlock Pro — $39 lifetime',
        framing: 'save_revisit',
      };
    }
    return {
      headline: '✨ Get more from this diff',
      body: 'The visual diff and migration SQL are free forever. Pro adds exports, shareable links, and a history of every diff you run.',
      features: [
        '📄 Export Markdown / PDF / JSON',
        '🔗 Copy a shareable diff link',
        '🕐 Revisit past diffs anytime',
      ],
      ctaPrimary: '⚡ Unlock Pro — $39 lifetime',
      framing: 'export_share',
    };
  }

  function apply() {
    const variant = getVariant();
    send('pro_value_banner_ab_page_view', { variant, placement: isInsidePanel(variant) ? 'inside_visual' : 'above_tabs' });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }

  window.ProValueBannerAB = { getVariant, resetVariant, isInsidePanel, getCopy, send };
})();
