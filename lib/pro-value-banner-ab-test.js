/**
 * SchemaLens Pro Value Banner A/B Test — RETIRED
 *
 * The post-result Pro value banner lost to the pre-result Pro preview interstitial
 * (Paywall Timing v2). All users now see the interstitial before the free diff result,
 * so the banner and its headline/placement test are no longer rendered.
 *
 * This file is kept as a thin shim so existing calls to window.ProValueBannerAB
 * (e.g. in app.html) do not throw, but it always returns the retired variant and
 * no longer emits assignment or impression events.
 */
(function () {
  const STORAGE_KEY = 'sl_pro_value_banner_ab_variant';
  const RETIRED_VARIANT = 'retired';

  function getVariant() {
    // Migrate any stored variant to the retired marker so the banner never renders.
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== RETIRED_VARIANT) {
      localStorage.setItem(STORAGE_KEY, RETIRED_VARIANT);
    }
    return RETIRED_VARIANT;
  }

  function resetVariant() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function isInsidePanel(variant) {
    return false;
  }

  function getCopy(variant) {
    return {
      headline: '',
      body: '',
      features: [],
      ctaPrimary: '',
      framing: 'retired',
    };
  }

  function send() {
    // No-op: retired tests do not emit events.
  }

  function apply() {
    getVariant();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }

  window.ProValueBannerAB = { getVariant, resetVariant, isInsidePanel, getCopy, send };
})();
