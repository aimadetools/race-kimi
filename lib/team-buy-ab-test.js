/**
 * SchemaLens Team Checkout A/B Test
 * Tests headline, pricing framing, and ROI calculator visibility.
 * Variants:
 *   - control: existing headline/subtitle, monthly billing default, ROI after features.
 *   - v1: urgency headline, yearly billing default, ROI calculator promoted above pricing.
 */
(function () {
  const STORAGE_KEY = 'sl_team_buy_ab_variant';
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

  function getVariant() {
    let variant = localStorage.getItem(STORAGE_KEY);
    if (!variant) {
      variant = Math.random() < 0.5 ? 'control' : 'v1';
      localStorage.setItem(STORAGE_KEY, variant);
      send('team_buy_ab_assigned', { variant });
    }
    return variant;
  }

  function setText(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  function setHtml(selector, html) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  }

  function moveRoiAbovePricing() {
    const roiSection = document.querySelector('#roiSection');
    const pricingSection = document.querySelector('#pricingSection');
    if (roiSection && pricingSection && pricingSection.parentNode) {
      pricingSection.parentNode.insertBefore(roiSection, pricingSection);
    }
    const roiTitle = document.querySelector('#roiSection .section-title');
    if (roiTitle) roiTitle.textContent = 'One prevented incident pays for the year';
    const roiSubtitle = document.querySelector('#roiSection .section-subtitle');
    if (roiSubtitle) roiSubtitle.textContent = 'Adjust the numbers below to match your team. Most teams see ROI after a single avoided rollback.';
  }

  function apply() {
    const variant = getVariant();

    if (variant === 'v1') {
      setText('header.hero-buy h1', 'Stop schema incidents before they hit production.');
      setText('header.hero-buy p.lead', 'SchemaLens Team catches breaking database changes in every PR — for less than one hour of incident downtime.');

      // Promote ROI above pricing
      moveRoiAbovePricing();

      // Default to yearly billing
      const yearlyBtn = document.querySelector('.billing-toggle button[data-period="yearly"]');
      if (yearlyBtn) yearlyBtn.click();

      // Highlight yearly value in the yearly card
      const yearlyNote = document.querySelector('#cardYearly .price-note');
      if (yearlyNote) yearlyNote.innerHTML = 'Billed annually. Unlimited team members. <strong style="color:var(--success)">Save $58.</strong>';
    }

    // Track CTA clicks with variant
    document.querySelectorAll('a[href*="gumroad.com/l/schemalens-team"]').forEach(function (link) {
      link.addEventListener('click', function () {
        send('team_buy_ab_cta_click', {
          variant: variant,
          plan: link.dataset.plan || 'unknown',
          href: link.getAttribute('href'),
        });
      });
    });

    // Track billing toggle interactions
    document.querySelectorAll('.billing-toggle button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        send('team_buy_ab_billing_toggle', {
          variant: variant,
          period: btn.dataset.period,
        });
      });
    });

    send('team_buy_ab_page_view', { variant: variant });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }

  window.TeamBuyAB = { getVariant };
})();
