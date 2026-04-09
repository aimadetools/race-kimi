/**
 * Changelog.page Analytics
 * Client-side analytics tracking for changelog engagement
 * Works with static hosting - no backend required
 * 
 * Features:
 * - Page view tracking
 * - Entry engagement tracking
 * - Click tracking
 * - Daily/weekly/monthly stats
 * - Popular entries
 * - Traffic sources (referrer)
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    storageKey: 'changelog_analytics_v1',
    sessionKey: 'changelog_session_v1',
    bufferSize: 50, // Events to buffer before flushing
    flushInterval: 5000, // Flush after 5 seconds
    debug: window.location.search.includes('analytics_debug=true'),
  };

  // Initialize analytics
  function init() {
    // Check if analytics is enabled
    const analyticsEnabled = document.querySelector('meta[name="changelog-analytics"]');
    if (!analyticsEnabled) {
      log('Analytics not enabled for this changelog');
      return;
    }

    // Initialize storage
    ensureStorage();
    
    // Track page view
    trackPageView();
    
    // Track entry views if on entry page
    trackEntryViews();
    
    // Set up click tracking
    setupClickTracking();
    
    // Set up session tracking
    setupSessionTracking();
    
    // Flush buffer periodically
    setInterval(flushEventBuffer, CONFIG.flushInterval);
    
    // Flush on page unload
    window.addEventListener('beforeunload', flushEventBuffer);
    
    log('Analytics initialized');
  }

  // Ensure storage structure exists
  function ensureStorage() {
    const data = getStorageData();
    if (!data) {
      const initialData = {
        version: 1,
        created: Date.now(),
        stats: {
          totalViews: 0,
          uniqueVisitors: 0,
          totalEntries: 0,
        },
        dailyStats: {},
        entries: {},
        referrers: {},
        events: [],
        sessions: [],
      };
      setStorageData(initialData);
    }
  }

  // Get storage data
  function getStorageData() {
    try {
      const data = localStorage.getItem(CONFIG.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      log('Error reading storage:', e);
      return null;
    }
  }

  // Set storage data
  function setStorageData(data) {
    try {
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(data));
    } catch (e) {
      log('Error writing storage:', e);
      // Handle quota exceeded - clear old data
      if (e.name === 'QuotaExceededError') {
        cleanupOldData();
      }
    }
  }

  // Clean up old data when storage is full
  function cleanupOldData() {
    const data = getStorageData();
    if (!data) return;

    // Keep only last 30 days of daily stats
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    Object.keys(data.dailyStats).forEach(date => {
      if (new Date(date).getTime() < thirtyDaysAgo) {
        delete data.dailyStats[date];
      }
    });

    // Keep only last 100 events
    if (data.events.length > 100) {
      data.events = data.events.slice(-100);
    }

    setStorageData(data);
    log('Cleaned up old data');
  }

  // Track page view
  function trackPageView() {
    const data = getStorageData();
    if (!data) return;

    const today = getToday();
    const sessionId = getSessionId();
    const isNewSession = !sessionId;

    // Update total stats
    data.stats.totalViews++;
    
    // Update daily stats
    if (!data.dailyStats[today]) {
      data.dailyStats[today] = { views: 0, unique: 0, entries: {} };
    }
    data.dailyStats[today].views++;

    // Track unique visitors (new session)
    if (isNewSession) {
      data.stats.uniqueVisitors++;
      data.dailyStats[today].unique++;
      createSession();
    }

    // Track referrer
    const referrer = document.referrer;
    if (referrer && !referrer.includes(window.location.hostname)) {
      const referrerDomain = new URL(referrer).hostname;
      data.referrers[referrerDomain] = (data.referrers[referrerDomain] || 0) + 1;
    }

    // Track page-specific view
    const pagePath = window.location.pathname;
    const entrySlug = pagePath.replace('.html', '').replace(/^\//, '');
    
    if (entrySlug && entrySlug !== 'index') {
      if (!data.dailyStats[today].entries[entrySlug]) {
        data.dailyStats[today].entries[entrySlug] = 0;
      }
      data.dailyStats[today].entries[entrySlug]++;
    }

    setStorageData(data);
    log('Page view tracked:', { path: pagePath, newSession: isNewSession });
  }

  // Track entry views
  function trackEntryViews() {
    const entries = document.querySelectorAll('.entry');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const entryElement = entry.target;
          const entryTitle = entryElement.querySelector('.entry-title')?.textContent?.trim();
          const entrySlug = entryElement.querySelector('.entry-title a')?.getAttribute('href')?.replace('.html', '');
          
          if (entrySlug) {
            trackEvent('entry_view', {
              slug: entrySlug,
              title: entryTitle,
              timeOnPage: getTimeOnPage(),
            });
          }
        }
      });
    }, { threshold: 0.5 });

    entries.forEach(entry => observer.observe(entry));
  }

  // Set up click tracking
  function setupClickTracking() {
    document.addEventListener('click', (e) => {
      // Track entry link clicks
      const entryLink = e.target.closest('.entry-title a');
      if (entryLink) {
        trackEvent('entry_click', {
          slug: entryLink.getAttribute('href')?.replace('.html', ''),
          title: entryLink.textContent?.trim(),
        });
        return;
      }

      // Track tag clicks
      const tagLink = e.target.closest('.entry-tag');
      if (tagLink) {
        trackEvent('tag_click', {
          tag: tagLink.textContent?.replace('#', ''),
        });
        return;
      }

      // Track external link clicks
      const externalLink = e.target.closest('a[href^="http"]');
      if (externalLink && !externalLink.href.includes(window.location.hostname)) {
        trackEvent('external_click', {
          url: externalLink.href,
          text: externalLink.textContent?.trim(),
        });
      }
    });
  }

  // Track event
  function trackEvent(eventType, eventData = {}) {
    const data = getStorageData();
    if (!data) return;

    const event = {
      type: eventType,
      timestamp: Date.now(),
      session: getSessionId(),
      path: window.location.pathname,
      ...eventData,
    };

    data.events.push(event);

    // Flush if buffer is full
    if (data.events.length >= CONFIG.bufferSize) {
      flushEventBuffer();
    } else {
      setStorageData(data);
    }

    log('Event tracked:', event);
  }

  // Flush event buffer
  function flushEventBuffer() {
    const data = getStorageData();
    if (!data || data.events.length === 0) return;

    // Process events into aggregated stats
    data.events.forEach(event => {
      processEvent(event, data);
    });

    // Clear events
    data.events = [];
    setStorageData(data);
    log('Event buffer flushed');
  }

  // Process individual event
  function processEvent(event, data) {
    if (event.type === 'entry_view') {
      const { slug, title } = event;
      if (!data.entries[slug]) {
        data.entries[slug] = {
          title,
          views: 0,
          uniqueViews: 0,
          clicks: 0,
          lastViewed: null,
        };
      }
      data.entries[slug].views++;
      data.entries[slug].lastViewed = event.timestamp;
      data.stats.totalEntries = Object.keys(data.entries).length;
    }

    if (event.type === 'entry_click') {
      const { slug } = event;
      if (data.entries[slug]) {
        data.entries[slug].clicks++;
      }
    }
  }

  // Session tracking
  function setupSessionTracking() {
    // Update session last activity
    document.addEventListener('click', () => updateSessionActivity());
    document.addEventListener('scroll', throttle(() => updateSessionActivity(), 1000));
  }

  function createSession() {
    const sessionId = generateId();
    sessionStorage.setItem(CONFIG.sessionKey, JSON.stringify({
      id: sessionId,
      start: Date.now(),
      lastActivity: Date.now(),
    }));

    const data = getStorageData();
    if (data) {
      data.sessions.push({
        id: sessionId,
        start: Date.now(),
        referrer: document.referrer,
      });
      setStorageData(data);
    }

    return sessionId;
  }

  function getSessionId() {
    try {
      const session = sessionStorage.getItem(CONFIG.sessionKey);
      if (session) {
        const parsed = JSON.parse(session);
        // Session expires after 30 minutes of inactivity
        if (Date.now() - parsed.lastActivity < 30 * 60 * 1000) {
          return parsed.id;
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  function updateSessionActivity() {
    const session = sessionStorage.getItem(CONFIG.sessionKey);
    if (session) {
      const parsed = JSON.parse(session);
      parsed.lastActivity = Date.now();
      sessionStorage.setItem(CONFIG.sessionKey, JSON.stringify(parsed));
    }
  }

  // Get time on page
  let pageLoadTime = Date.now();
  function getTimeOnPage() {
    return Date.now() - pageLoadTime;
  }

  // Utility functions
  function getToday() {
    return new Date().toISOString().split('T')[0];
  }

  function generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  function log(...args) {
    if (CONFIG.debug) {
      console.log('[Changelog Analytics]', ...args);
    }
  }

  // Public API
  window.ChangelogAnalytics = {
    getData: getStorageData,
    trackEvent: trackEvent,
    flush: flushEventBuffer,
    getStats: function() {
      const data = getStorageData();
      if (!data) return null;

      const today = getToday();
      const last7Days = getLastNDays(7);
      const last30Days = getLastNDays(30);

      return {
        overview: data.stats,
        today: data.dailyStats[today] || { views: 0, unique: 0 },
        last7Days: aggregateDays(data.dailyStats, last7Days),
        last30Days: aggregateDays(data.dailyStats, last30Days),
        popularEntries: getPopularEntries(data.entries, 10),
        referrers: sortObjectByValue(data.referrers),
      };
    },
    reset: function() {
      localStorage.removeItem(CONFIG.storageKey);
      sessionStorage.removeItem(CONFIG.sessionKey);
      log('Analytics data reset');
    },
    export: function() {
      return JSON.stringify(getStorageData(), null, 2);
    },
  };

  // Helper functions for stats
  function getLastNDays(n) {
    const days = [];
    for (let i = 0; i < n; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  }

  function aggregateDays(dailyStats, days) {
    return days.reduce((acc, day) => {
      const stats = dailyStats[day];
      if (stats) {
        acc.views += stats.views;
        acc.unique += stats.unique;
      }
      return acc;
    }, { views: 0, unique: 0 });
  }

  function getPopularEntries(entries, limit) {
    return Object.entries(entries)
      .map(([slug, data]) => ({ slug, ...data }))
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }

  function sortObjectByValue(obj) {
    return Object.entries(obj)
      .sort(([,a], [,b]) => b - a)
      .reduce((acc, [key, val]) => {
        acc[key] = val;
        return acc;
      }, {});
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
