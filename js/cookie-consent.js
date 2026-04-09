/**
 * Cookie Consent Banner for Changelog.page
 * GDPR-compliant consent management
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    cookieName: 'changelog_consent',
    cookieExpiry: 365, // days
    bannerDelay: 1000, // Show after 1 second
  };

  // Consent state
  let consentState = {
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  };

  /**
   * Get cookie value
   */
  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? JSON.parse(decodeURIComponent(match[2])) : null;
  }

  /**
   * Set cookie
   */
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + encodeURIComponent(JSON.stringify(value)) + 
                      ';expires=' + expires.toUTCString() + 
                      ';path=/;SameSite=Lax';
  }

  /**
   * Check if user has already consented
   */
  function hasConsent() {
    return getCookie(CONFIG.cookieName) !== null;
  }

  /**
   * Save consent preferences
   */
  function saveConsent(preferences) {
    consentState = { ...consentState, ...preferences };
    setCookie(CONFIG.cookieName, consentState, CONFIG.cookieExpiry);
    
    // Apply consent changes
    applyConsent();
    
    // Hide banner
    hideBanner();
    
    // Dispatch event for other scripts
    window.dispatchEvent(new CustomEvent('consentUpdated', { detail: consentState }));
  }

  /**
   * Apply consent settings to third-party scripts
   */
  function applyConsent() {
    // Analytics (Plausible) - only load if consented
    if (consentState.analytics) {
      loadAnalytics();
    }
    
    // Marketing (Crisp chat) - already loaded but we could disable it
    if (consentState.marketing) {
      enableChat();
    } else {
      disableChat();
    }
  }

  /**
   * Load analytics script
   */
  function loadAnalytics() {
    if (window.plausibleLoaded) return;
    
    const script = document.createElement('script');
    script.defer = true;
    script.setAttribute('data-domain', 'changelog.page');
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
    
    window.plausibleLoaded = true;
  }

  /**
   * Enable chat widget
   */
  function enableChat() {
    if (window.$crisp) {
      window.$crisp.push(['do', 'chat:show']);
    }
  }

  /**
   * Disable chat widget
   */
  function disableChat() {
    if (window.$crisp) {
      window.$crisp.push(['do', 'chat:hide']);
    }
  }

  /**
   * Show consent banner
   */
  function showBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.add('show');
    }
  }

  /**
   * Hide consent banner
   */
  function hideBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('show');
      setTimeout(() => banner.remove(), 300);
    }
  }

  /**
   * Show detailed preferences modal
   */
  function showPreferences() {
    const modal = document.getElementById('cookie-preferences');
    if (modal) {
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  /**
   * Hide preferences modal
   */
  function hidePreferences() {
    const modal = document.getElementById('cookie-preferences');
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  /**
   * Create banner HTML
   */
  function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div class="cookie-banner__content">
        <p class="cookie-banner__text">
          <strong>We value your privacy.</strong> 
          We use cookies to enhance your experience and analyze our traffic. 
          <a href="/privacy.html" class="cookie-banner__link">Learn more</a>
        </p>
        <div class="cookie-banner__actions">
          <button class="cookie-banner__btn cookie-banner__btn--secondary" data-action="preferences">
            Preferences
          </button>
          <button class="cookie-banner__btn cookie-banner__btn--secondary" data-action="reject">
            Reject All
          </button>
          <button class="cookie-banner__btn cookie-banner__btn--primary" data-action="accept">
            Accept All
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
  }

  /**
   * Create preferences modal HTML
   */
  function createPreferencesModal() {
    const modal = document.createElement('div');
    modal.id = 'cookie-preferences';
    modal.className = 'cookie-preferences';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-labelledby', 'cookie-prefs-title');
    modal.innerHTML = `
      <div class="cookie-preferences__overlay" data-action="close-modal"></div>
      <div class="cookie-preferences__content">
        <div class="cookie-preferences__header">
          <h2 id="cookie-prefs-title" class="cookie-preferences__title">Cookie Preferences</h2>
          <button class="cookie-preferences__close" data-action="close-modal" aria-label="Close preferences">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="cookie-preferences__body">
          <p class="cookie-preferences__desc">
            Manage your cookie preferences. Necessary cookies are always enabled as they are required for the site to function.
          </p>
          
          <div class="cookie-preferences__option">
            <div class="cookie-preferences__option-header">
              <label class="cookie-preferences__label">
                <input type="checkbox" checked disabled class="cookie-preferences__checkbox">
                <span class="cookie-preferences__checkmark cookie-preferences__checkmark--disabled"></span>
                Necessary
              </label>
              <span class="cookie-preferences__badge">Required</span>
            </div>
            <p class="cookie-preferences__option-desc">Essential cookies for the website to function properly.</p>
          </div>
          
          <div class="cookie-preferences__option">
            <div class="cookie-preferences__option-header">
              <label class="cookie-preferences__label">
                <input type="checkbox" id="consent-analytics" class="cookie-preferences__checkbox">
                <span class="cookie-preferences__checkmark"></span>
                Analytics
              </label>
            </div>
            <p class="cookie-preferences__option-desc">Help us improve by anonymously tracking site usage.</p>
          </div>
          
          <div class="cookie-preferences__option">
            <div class="cookie-preferences__option-header">
              <label class="cookie-preferences__label">
                <input type="checkbox" id="consent-marketing" class="cookie-preferences__checkbox">
                <span class="cookie-preferences__checkmark"></span>
                Marketing & Chat
              </label>
            </div>
            <p class="cookie-preferences__option-desc">Enable live chat and personalized communication.</p>
          </div>
        </div>
        <div class="cookie-preferences__footer">
          <button class="cookie-preferences__btn cookie-preferences__btn--secondary" data-action="save-reject">
            Reject All
          </button>
          <button class="cookie-preferences__btn cookie-preferences__btn--primary" data-action="save-preferences">
            Save Preferences
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  /**
   * Create banner styles
   */
  function createStyles() {
    const styles = document.createElement('style');
    styles.textContent = `
      /* Cookie Banner */
      .cookie-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: #1e293b;
        border-top: 1px solid #334155;
        padding: 1rem;
        z-index: 9999;
        transform: translateY(100%);
        transition: transform 0.3s ease;
      }
      
      .cookie-banner.show {
        transform: translateY(0);
      }
      
      .cookie-banner__content {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
      
      .cookie-banner__text {
        color: #cbd5e1;
        margin: 0;
        font-size: 0.875rem;
        line-height: 1.5;
        flex: 1;
        min-width: 280px;
      }
      
      .cookie-banner__link {
        color: #818cf8;
        text-decoration: underline;
      }
      
      .cookie-banner__link:hover {
        color: #a5b4fc;
      }
      
      .cookie-banner__actions {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      
      .cookie-banner__btn {
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s;
        border: none;
      }
      
      .cookie-banner__btn--primary {
        background: #4f46e5;
        color: white;
      }
      
      .cookie-banner__btn--primary:hover {
        background: #4338ca;
      }
      
      .cookie-banner__btn--secondary {
        background: #334155;
        color: #e2e8f0;
      }
      
      .cookie-banner__btn--secondary:hover {
        background: #475569;
      }
      
      /* Preferences Modal */
      .cookie-preferences {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      }
      
      .cookie-preferences.show {
        display: flex;
      }
      
      .cookie-preferences__overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
      }
      
      .cookie-preferences__content {
        position: relative;
        background: #1e293b;
        border-radius: 0.75rem;
        border: 1px solid #334155;
        max-width: 480px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        animation: cookie-modal-in 0.2s ease;
      }
      
      @keyframes cookie-modal-in {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      
      .cookie-preferences__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.25rem;
        border-bottom: 1px solid #334155;
      }
      
      .cookie-preferences__title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #f8fafc;
        margin: 0;
      }
      
      .cookie-preferences__close {
        background: none;
        border: none;
        color: #94a3b8;
        cursor: pointer;
        padding: 0.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .cookie-preferences__close:hover {
        color: #e2e8f0;
      }
      
      .cookie-preferences__body {
        padding: 1.25rem;
      }
      
      .cookie-preferences__desc {
        color: #94a3b8;
        font-size: 0.875rem;
        margin: 0 0 1.5rem 0;
        line-height: 1.5;
      }
      
      .cookie-preferences__option {
        margin-bottom: 1.25rem;
        padding-bottom: 1.25rem;
        border-bottom: 1px solid #334155;
      }
      
      .cookie-preferences__option:last-of-type {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }
      
      .cookie-preferences__option-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.25rem;
      }
      
      .cookie-preferences__label {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: #f8fafc;
        font-weight: 500;
        cursor: pointer;
        user-select: none;
      }
      
      .cookie-preferences__checkbox {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
      
      .cookie-preferences__checkmark {
        width: 18px;
        height: 18px;
        border: 2px solid #475569;
        border-radius: 0.25rem;
        position: relative;
        transition: all 0.15s;
        flex-shrink: 0;
      }
      
      .cookie-preferences__checkmark--disabled {
        background: #334155;
        border-color: #475569;
        opacity: 0.5;
      }
      
      .cookie-preferences__checkbox:checked + .cookie-preferences__checkmark {
        background: #4f46e5;
        border-color: #4f46e5;
      }
      
      .cookie-preferences__checkbox:checked + .cookie-preferences__checkmark::after {
        content: '';
        position: absolute;
        left: 5px;
        top: 2px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
      
      .cookie-preferences__badge {
        font-size: 0.75rem;
        padding: 0.125rem 0.5rem;
        background: #334155;
        color: #94a3b8;
        border-radius: 9999px;
      }
      
      .cookie-preferences__option-desc {
        color: #64748b;
        font-size: 0.8125rem;
        margin: 0.25rem 0 0 2.25rem;
        line-height: 1.4;
      }
      
      .cookie-preferences__footer {
        display: flex;
        gap: 0.75rem;
        padding: 1.25rem;
        border-top: 1px solid #334155;
      }
      
      .cookie-preferences__btn {
        flex: 1;
        padding: 0.625rem 1rem;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.15s;
        border: none;
      }
      
      .cookie-preferences__btn--primary {
        background: #4f46e5;
        color: white;
      }
      
      .cookie-preferences__btn--primary:hover {
        background: #4338ca;
      }
      
      .cookie-preferences__btn--secondary {
        background: #334155;
        color: #e2e8f0;
      }
      
      .cookie-preferences__btn--secondary:hover {
        background: #475569;
      }
      
      @media (max-width: 480px) {
        .cookie-banner__content {
          flex-direction: column;
          align-items: flex-start;
        }
        
        .cookie-banner__actions {
          width: 100%;
        }
        
        .cookie-banner__btn {
          flex: 1;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  /**
   * Handle button clicks
   */
  function handleClick(e) {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (!action) return;

    e.preventDefault();

    switch (action) {
      case 'accept':
        saveConsent({ analytics: true, marketing: true });
        break;
      case 'reject':
        saveConsent({ analytics: false, marketing: false });
        break;
      case 'preferences':
        showPreferences();
        break;
      case 'close-modal':
        hidePreferences();
        break;
      case 'save-reject':
        saveConsent({ analytics: false, marketing: false });
        hidePreferences();
        break;
      case 'save-preferences':
        const analytics = document.getElementById('consent-analytics')?.checked || false;
        const marketing = document.getElementById('consent-marketing')?.checked || false;
        saveConsent({ analytics, marketing });
        hidePreferences();
        break;
    }
  }

  /**
   * Initialize cookie consent
   */
  function init() {
    // Check for existing consent
    const existingConsent = getCookie(CONFIG.cookieName);
    if (existingConsent) {
      consentState = existingConsent;
      applyConsent();
      return; // Don't show banner if already consented
    }

    // Create elements
    createStyles();
    createBanner();
    createPreferencesModal();

    // Add event listeners
    document.addEventListener('click', handleClick);

    // Show banner after delay
    setTimeout(showBanner, CONFIG.bannerDelay);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for other scripts
  window.CookieConsent = {
    getState: () => ({ ...consentState }),
    hasConsent,
    saveConsent,
  };
})();
