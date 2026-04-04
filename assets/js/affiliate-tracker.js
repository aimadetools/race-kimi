/**
 * FairSplit Affiliate Tracker
 * Simple client-side referral tracking using URL parameters and localStorage.
 * 
 * How it works:
 * 1. Affiliate shares link: https://race-kimi.vercel.app/?ref=THEIR_CODE
 * 2. Visitor clicks link → code stored in localStorage for 60 days
 * 3. Buy buttons automatically append ?ref=THEIR_CODE to checkout URLs
 * 4. Human reviews Stripe payments to see which affiliate referred the sale
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'fairsplit_affiliate';
  const STATS_KEY = 'fairsplit_affiliate_stats';
  const COOKIE_DAYS = 60;

  // Parse URL parameters
  function getUrlParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  // Store affiliate referral
  function storeReferral(code) {
    if (!code) return;
    const data = {
      code: code.trim().toLowerCase(),
      timestamp: Date.now(),
      expires: Date.now() + (COOKIE_DAYS * 24 * 60 * 60 * 1000)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    // Track click in stats (if viewing own dashboard)
    recordStat('clicks', code.trim().toLowerCase());
  }

  // Get stored referral
  function getStoredReferral() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (Date.now() > data.expires) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data.code;
    } catch (e) {
      return null;
    }
  }

  // Record stat for a given affiliate code
  function recordStat(type, code) {
    if (!code) return;
    try {
      const stats = JSON.parse(localStorage.getItem(STATS_KEY) || '{}');
      if (!stats[code]) {
        stats[code] = { clicks: 0, conversions: 0, history: [] };
      }
      stats[code][type] = (stats[code][type] || 0) + 1;
      stats[code].history.push({
        type: type,
        date: new Date().toISOString(),
        page: window.location.pathname
      });
      // Keep last 100 entries
      stats[code].history = stats[code].history.slice(-100);
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    } catch (e) {
      console.error('Affiliate stats error:', e);
    }
  }

  // Append referral to links
  function updateAffiliateLinks() {
    const ref = getStoredReferral();
    if (!ref) return;

    // Update all buy/affiliate links
    document.querySelectorAll('a[data-affiliate-link]').forEach(function(link) {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('mailto:')) return;
      
      // Don't modify if already has ref param
      if (href.indexOf('ref=') !== -1) return;
      
      const separator = href.indexOf('?') !== -1 ? '&' : '?';
      link.setAttribute('href', href + separator + 'ref=' + encodeURIComponent(ref));
    });
  }

  // Track conversion when user clicks a buy button
  function trackConversion() {
    const ref = getStoredReferral();
    if (ref) {
      recordStat('conversions', ref);
    }
  }

  // Generate affiliate link for a given code
  window.generateAffiliateLink = function(code) {
    code = code.trim().toLowerCase();
    if (!code) return '';
    return window.location.origin + '/?ref=' + encodeURIComponent(code);
  };

  // Get stats for a given code
  window.getAffiliateStats = function(code) {
    code = code.trim().toLowerCase();
    try {
      const stats = JSON.parse(localStorage.getItem(STATS_KEY) || '{}');
      return stats[code] || { clicks: 0, conversions: 0, history: [] };
    } catch (e) {
      return { clicks: 0, conversions: 0, history: [] };
    }
  };

  // Check for ref parameter on load
  const urlRef = getUrlParam('ref') || getUrlParam('aff');
  if (urlRef) {
    storeReferral(urlRef);
  }

  // Update links on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateAffiliateLinks);
  } else {
    updateAffiliateLinks();
  }

  // Track conversions on affiliate link clicks
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[data-affiliate-link]');
    if (link) {
      trackConversion();
    }
  });

  // Expose for debugging
  window.fairsplitAffiliate = {
    getReferral: getStoredReferral,
    getStats: window.getAffiliateStats,
    generateLink: window.generateAffiliateLink
  };
})();
