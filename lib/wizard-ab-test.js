/**
 * SchemaLens CI/CD Setup Wizard A/B test
 * Assigns users to "direct" (platform landing pages) or "wizard" (setup wizard)
 * and tracks clicks/page views via the existing /api/analytics endpoint.
 */
(function () {
  const STORAGE_KEY = 'sl_wizard_ab_variant';
  const ENDPOINT = '/api/analytics';
  const isLocal = /^(localhost|127\.0\.0\.1|::1|.*\.local)$/.test(location.hostname);

  const platformPages = {
    github: 'github-action.html',
    gitlab: 'gitlab-schema-diff.html',
    bitbucket: 'bitbucket-schema-diff.html',
    jenkins: 'jenkins-schema-diff.html',
    circleci: 'circleci-schema-diff.html',
    azure: 'azure-devops-schema-diff.html',
  };

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
      variant = Math.random() < 0.5 ? 'direct' : 'wizard';
      localStorage.setItem(STORAGE_KEY, variant);
      send('wizard_ab_assigned', { variant });
    }
    return variant;
  }

  function apply() {
    const variant = getVariant();
    const ctaSelector = '[data-wizard-ab="cta"]';

    document.querySelectorAll(ctaSelector).forEach(function (el) {
      const platform = el.dataset.platform || 'github';
      const directHref = platformPages[platform] || platformPages.github;

      if (variant === 'wizard') {
        el.href = 'tools/cicd-setup-wizard.html?platform=' + encodeURIComponent(platform);
        if (el.textContent.trim() === 'Add to Pipeline →') {
          el.textContent = '⚡ Setup Wizard →';
        }
      } else {
        el.href = directHref;
        if (el.textContent.trim() === '⚡ Setup Wizard →') {
          el.textContent = 'Add to Pipeline →';
        }
      }

      el.addEventListener('click', function () {
        send('wizard_ab_cta_click', {
          variant: variant,
          platform: platform,
          text: el.textContent.trim(),
          href: el.getAttribute('href'),
        });
      });
    });

    const path = location.pathname;
    if (path.indexOf('/tools/cicd-setup-wizard.html') !== -1) {
      const params = new URLSearchParams(location.search);
      send('wizard_ab_wizard_open', {
        variant: variant,
        platform: params.get('platform') || 'generic',
      });
    } else {
      const platformEntry = Object.keys(platformPages).find(function (k) {
        return path.indexOf('/' + platformPages[k]) !== -1;
      });
      if (platformEntry) {
        send('wizard_ab_pipeline_page_view', {
          variant: variant,
          platform: platformEntry,
        });
      } else {
        send('wizard_ab_page_view', { variant: variant });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }

  window.WizardAB = { getVariant };
})();
