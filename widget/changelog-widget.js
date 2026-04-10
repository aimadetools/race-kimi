/**
 * Changelog.page Embeddable Widget
 * A lightweight, customizable changelog widget for any website
 * 
 * Usage:
 * <script src="https://changelog.page/widget/changelog-widget.js" 
 *         data-feed="https://your-site.com/changelog/feed.json"
 *         data-position="bottom-right"
 *         data-theme="dark"></script>
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    version: '1.0.0',
    defaultPosition: 'bottom-right',
    defaultTheme: 'dark',
    defaultLimit: 5,
    storageKey: 'changelog_widget_read',
    badgeThreshold: 0 // Show badge for any unread items
  };

  // CSS Styles
  const STYLES = `
    .cl-widget-container {
      --cl-primary: #6366f1;
      --cl-bg: #0f172a;
      --cl-surface: #1e293b;
      --cl-border: #334155;
      --cl-text: #f8fafc;
      --cl-text-secondary: #94a3b8;
      --cl-success: #10b981;
      --cl-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      
      position: fixed;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .cl-widget-container.cl-position-bottom-right {
      bottom: 20px;
      right: 20px;
    }
    
    .cl-widget-container.cl-position-bottom-left {
      bottom: 20px;
      left: 20px;
    }
    
    .cl-widget-container.cl-position-top-right {
      top: 20px;
      right: 20px;
    }
    
    .cl-widget-container.cl-position-top-left {
      top: 20px;
      left: 20px;
    }
    
    /* Trigger Button */
    .cl-trigger {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--cl-primary), #8b5cf6);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s;
      position: relative;
    }
    
    .cl-trigger:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
    }
    
    .cl-trigger:active {
      transform: scale(0.95);
    }
    
    .cl-trigger svg {
      width: 24px;
      height: 24px;
      color: white;
    }
    
    /* Badge */
    .cl-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      background: #ef4444;
      color: white;
      font-size: 12px;
      font-weight: 600;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--cl-bg);
      animation: cl-pulse 2s infinite;
    }
    
    @keyframes cl-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    /* Panel */
    .cl-panel {
      position: absolute;
      width: 380px;
      max-width: calc(100vw - 40px);
      max-height: 600px;
      background: var(--cl-bg);
      border: 1px solid var(--cl-border);
      border-radius: 16px;
      box-shadow: var(--cl-shadow);
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transform: scale(0.95) translateY(10px);
      transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
    }
    
    .cl-widget-container.cl-open .cl-panel {
      opacity: 1;
      visibility: visible;
      transform: scale(1) translateY(0);
    }
    
    .cl-widget-container.cl-position-bottom-right .cl-panel,
    .cl-widget-container.cl-position-bottom-left .cl-panel {
      bottom: 70px;
    }
    
    .cl-widget-container.cl-position-top-right .cl-panel,
    .cl-widget-container.cl-position-top-left .cl-panel {
      top: 70px;
    }
    
    .cl-widget-container.cl-position-bottom-left .cl-panel,
    .cl-widget-container.cl-position-top-left .cl-panel {
      left: 0;
    }
    
    .cl-widget-container.cl-position-bottom-right .cl-panel,
    .cl-widget-container.cl-position-top-right .cl-panel {
      right: 0;
    }
    
    /* Header */
    .cl-header {
      padding: 20px;
      border-bottom: 1px solid var(--cl-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .cl-header-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--cl-text);
      margin: 0;
    }
    
    .cl-header-meta {
      font-size: 12px;
      color: var(--cl-text-secondary);
      margin-top: 2px;
    }
    
    .cl-close {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: var(--cl-surface);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--cl-text-secondary);
      transition: color 0.2s, background 0.2s;
    }
    
    .cl-close:hover {
      color: var(--cl-text);
      background: var(--cl-border);
    }
    
    /* Content */
    .cl-content {
      max-height: 400px;
      overflow-y: auto;
      padding: 8px;
    }
    
    .cl-content::-webkit-scrollbar {
      width: 6px;
    }
    
    .cl-content::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .cl-content::-webkit-scrollbar-thumb {
      background: var(--cl-border);
      border-radius: 3px;
    }
    
    /* Entry */
    .cl-entry {
      padding: 16px;
      border-radius: 12px;
      margin-bottom: 8px;
      background: var(--cl-surface);
      border: 1px solid transparent;
      transition: border-color 0.2s;
      cursor: pointer;
      text-decoration: none;
      display: block;
    }
    
    .cl-entry:hover {
      border-color: var(--cl-border);
    }
    
    .cl-entry:last-child {
      margin-bottom: 0;
    }
    
    .cl-entry-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    
    .cl-entry-category {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 2px 8px;
      border-radius: 4px;
    }
    
    .cl-entry-category--feature { background: rgba(99, 102, 241, 0.2); color: #818cf8; }
    .cl-entry-category--improvement { background: rgba(16, 185, 129, 0.2); color: #34d399; }
    .cl-entry-category--fix { background: rgba(239, 68, 68, 0.2); color: #f87171; }
    .cl-entry-category--security { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
    .cl-entry-category--announcement { background: rgba(139, 92, 246, 0.2); color: #a78bfa; }
    .cl-entry-category--default { background: var(--cl-border); color: var(--cl-text-secondary); }
    
    .cl-entry-date {
      font-size: 12px;
      color: var(--cl-text-secondary);
    }
    
    .cl-entry-title {
      font-size: 14px;
      font-weight: 600;
      color: var(--cl-text);
      margin: 0 0 4px 0;
      line-height: 1.4;
    }
    
    .cl-entry-excerpt {
      font-size: 13px;
      color: var(--cl-text-secondary);
      line-height: 1.5;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .cl-entry-unread {
      position: relative;
    }
    
    .cl-entry-unread::before {
      content: '';
      position: absolute;
      left: -4px;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
      height: 6px;
      background: var(--cl-primary);
      border-radius: 50%;
    }
    
    /* Empty State */
    .cl-empty {
      padding: 40px 20px;
      text-align: center;
    }
    
    .cl-empty-icon {
      width: 48px;
      height: 48px;
      margin: 0 auto 16px;
      background: var(--cl-surface);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--cl-text-secondary);
    }
    
    .cl-empty-text {
      font-size: 14px;
      color: var(--cl-text-secondary);
      margin: 0;
    }
    
    /* Loading */
    .cl-loading {
      padding: 40px 20px;
      text-align: center;
    }
    
    .cl-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid var(--cl-surface);
      border-top-color: var(--cl-primary);
      border-radius: 50%;
      animation: cl-spin 0.8s linear infinite;
      margin: 0 auto 16px;
    }
    
    @keyframes cl-spin {
      to { transform: rotate(360deg); }
    }
    
    /* Footer */
    .cl-footer {
      padding: 12px 20px;
      border-top: 1px solid var(--cl-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .cl-powered {
      font-size: 12px;
      color: var(--cl-text-secondary);
      text-decoration: none;
    }
    
    .cl-powered:hover {
      color: var(--cl-text);
    }
    
    .cl-view-all {
      font-size: 12px;
      color: var(--cl-primary);
      text-decoration: none;
      font-weight: 500;
    }
    
    .cl-view-all:hover {
      text-decoration: underline;
    }
    
    /* Error */
    .cl-error {
      padding: 40px 20px;
      text-align: center;
    }
    
    .cl-error-icon {
      width: 48px;
      height: 48px;
      margin: 0 auto 16px;
      background: rgba(239, 68, 68, 0.1);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ef4444;
    }
    
    .cl-error-text {
      font-size: 14px;
      color: var(--cl-text-secondary);
      margin: 0;
    }
    
    /* Light Theme */
    .cl-widget-container.cl-theme-light {
      --cl-bg: #ffffff;
      --cl-surface: #f8fafc;
      --cl-border: #e2e8f0;
      --cl-text: #0f172a;
      --cl-text-secondary: #64748b;
      --cl-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    }
    
    .cl-widget-container.cl-theme-light .cl-badge {
      border-color: white;
    }
    
    /* Mobile */
    @media (max-width: 480px) {
      .cl-panel {
        position: fixed;
        top: auto !important;
        bottom: 90px !important;
        left: 20px !important;
        right: 20px !important;
        width: auto !important;
      }
    }
    
    /* Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
      .cl-trigger,
      .cl-panel,
      .cl-entry,
      .cl-badge {
        transition: none;
        animation: none;
      }
    }
  `;

  // Icons
  const ICONS = {
    megaphone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>`,
    empty: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
  };

  // Utility Functions
  function getStorageKey(feedUrl) {
    return `${CONFIG.storageKey}_${btoa(feedUrl).slice(0, 20)}`;
  }

  function getReadIds(feedUrl) {
    try {
      const key = getStorageKey(feedUrl);
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function markAsRead(feedUrl, id) {
    try {
      const key = getStorageKey(feedUrl);
      const readIds = getReadIds(feedUrl);
      if (!readIds.includes(id)) {
        readIds.push(id);
        localStorage.setItem(key, JSON.stringify(readIds));
      }
    } catch (e) {
      // Silent fail
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
  }

  function getCategoryClass(category) {
    const map = {
      'feature': 'cl-entry-category--feature',
      'new': 'cl-entry-category--feature',
      'improvement': 'cl-entry-category--improvement',
      'enhancement': 'cl-entry-category--improvement',
      'fix': 'cl-entry-category--fix',
      'bugfix': 'cl-entry-category--fix',
      'bug': 'cl-entry-category--fix',
      'security': 'cl-entry-category--security',
      'announcement': 'cl-entry-category--announcement'
    };
    return map[category?.toLowerCase()] || 'cl-entry-category--default';
  }

  // Widget Class
  class ChangelogWidget {
    constructor(options) {
      this.feedUrl = options.feed;
      this.position = options.position || CONFIG.defaultPosition;
      this.theme = options.theme || CONFIG.defaultTheme;
      this.limit = parseInt(options.limit) || CONFIG.defaultLimit;
      this.changelogUrl = options.changelogUrl || '#';
      this.title = options.title || "What's New";
      
      this.container = null;
      this.panel = null;
      this.badge = null;
      this.entries = [];
      this.isOpen = false;
      
      this.init();
    }

    init() {
      this.injectStyles();
      this.createDOM();
      this.attachEvents();
      this.loadEntries();
      
      // Check for unread entries periodically
      setInterval(() => this.loadEntries(), 5 * 60 * 1000); // Every 5 minutes
    }

    injectStyles() {
      if (document.getElementById('cl-widget-styles')) return;
      
      const style = document.createElement('style');
      style.id = 'cl-widget-styles';
      style.textContent = STYLES;
      document.head.appendChild(style);
    }

    createDOM() {
      // Container
      this.container = document.createElement('div');
      this.container.className = `cl-widget-container cl-position-${this.position} cl-theme-${this.theme}`;
      
      // Trigger Button
      const trigger = document.createElement('button');
      trigger.className = 'cl-trigger';
      trigger.setAttribute('aria-label', "What's New");
      trigger.innerHTML = ICONS.megaphone;
      
      // Badge
      this.badge = document.createElement('span');
      this.badge.className = 'cl-badge';
      this.badge.style.display = 'none';
      trigger.appendChild(this.badge);
      
      // Panel
      this.panel = document.createElement('div');
      this.panel.className = 'cl-panel';
      this.panel.innerHTML = this.getPanelHTML();
      
      this.container.appendChild(trigger);
      this.container.appendChild(this.panel);
      document.body.appendChild(this.container);
      
      this.trigger = trigger;
    }

    getPanelHTML() {
      return `
        <div class="cl-header">
          <div>
            <h3 class="cl-header-title">${this.escapeHtml(this.title)}</h3>
            <div class="cl-header-meta">Latest updates</div>
          </div>
          <button class="cl-close" aria-label="Close">
            ${ICONS.close}
          </button>
        </div>
        <div class="cl-content">
          <div class="cl-loading">
            <div class="cl-spinner"></div>
            <p style="font-size: 14px; color: var(--cl-text-secondary); margin: 0;">Loading updates...</p>
          </div>
        </div>
        <div class="cl-footer">
          <a href="https://changelog.page" target="_blank" rel="noopener" class="cl-powered">Powered by Changelog.page</a>
          <a href="${this.escapeHtml(this.changelogUrl)}" class="cl-view-all">View all →</a>
        </div>
      `;
    }

    attachEvents() {
      // Toggle on trigger click
      this.trigger.addEventListener('click', () => this.toggle());
      
      // Close on close button
      const closeBtn = this.panel.querySelector('.cl-close');
      closeBtn.addEventListener('click', () => this.close());
      
      // Close on click outside
      document.addEventListener('click', (e) => {
        if (this.isOpen && !this.container.contains(e.target)) {
          this.close();
        }
      });
      
      // Close on Escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });
    }

    async loadEntries() {
      try {
        const response = await fetch(this.feedUrl);
        if (!response.ok) throw new Error('Failed to load');
        
        const data = await response.json();
        this.entries = (data.items || []).slice(0, this.limit);
        
        this.renderEntries();
        this.updateBadge();
      } catch (error) {
        this.renderError();
      }
    }

    renderEntries() {
      const content = this.panel.querySelector('.cl-content');
      const readIds = getReadIds(this.feedUrl);
      
      if (this.entries.length === 0) {
        content.innerHTML = `
          <div class="cl-empty">
            <div class="cl-empty-icon">${ICONS.empty}</div>
            <p class="cl-empty-text">No updates yet. Check back soon!</p>
          </div>
        `;
        return;
      }
      
      const entriesHTML = this.entries.map(entry => {
        const isUnread = !readIds.includes(entry.id);
        const categoryClass = getCategoryClass(entry.category);
        const category = entry.category || 'Update';
        
        return `
          <a href="${this.escapeHtml(entry.url || '#')}" 
             class="cl-entry ${isUnread ? 'cl-entry-unread' : ''}" 
             data-entry-id="${this.escapeHtml(entry.id)}">
            <div class="cl-entry-header">
              <span class="cl-entry-category ${categoryClass}">${this.escapeHtml(category)}</span>
              <span class="cl-entry-date">${formatDate(entry.date_published)}</span>
            </div>
            <h4 class="cl-entry-title">${this.escapeHtml(entry.title)}</h4>
            ${entry.summary ? `<p class="cl-entry-excerpt">${this.escapeHtml(entry.summary)}</p>` : ''}
          </a>
        `;
      }).join('');
      
      content.innerHTML = entriesHTML;
      
      // Mark as read on click
      content.querySelectorAll('.cl-entry').forEach(el => {
        el.addEventListener('click', (e) => {
          const id = el.getAttribute('data-entry-id');
          markAsRead(this.feedUrl, id);
          el.classList.remove('cl-entry-unread');
          this.updateBadge();
        });
      });
    }

    renderError() {
      const content = this.panel.querySelector('.cl-content');
      content.innerHTML = `
        <div class="cl-error">
          <div class="cl-error-icon">${ICONS.error}</div>
          <p class="cl-error-text">Failed to load updates.<br>Please try again later.</p>
        </div>
      `;
    }

    updateBadge() {
      const readIds = getReadIds(this.feedUrl);
      const unreadCount = this.entries.filter(e => !readIds.includes(e.id)).length;
      
      if (unreadCount > 0) {
        this.badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
        this.badge.style.display = 'flex';
      } else {
        this.badge.style.display = 'none';
      }
    }

    toggle() {
      this.isOpen ? this.close() : this.open();
    }

    open() {
      this.isOpen = true;
      this.container.classList.add('cl-open');
      this.trigger.setAttribute('aria-expanded', 'true');
      
      // Refresh entries when opening
      this.loadEntries();
    }

    close() {
      this.isOpen = false;
      this.container.classList.remove('cl-open');
      this.trigger.setAttribute('aria-expanded', 'false');
    }

    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  }

  // Initialize
  function init() {
    const script = document.currentScript;
    if (!script) return;
    
    const feed = script.getAttribute('data-feed');
    if (!feed) {
      console.error('Changelog Widget: data-feed attribute is required');
      return;
    }
    
    new ChangelogWidget({
      feed: feed,
      position: script.getAttribute('data-position'),
      theme: script.getAttribute('data-theme'),
      limit: script.getAttribute('data-limit'),
      changelogUrl: script.getAttribute('data-changelog-url'),
      title: script.getAttribute('data-title')
    });
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
