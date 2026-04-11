/**
 * Theme Toggle - Dark/Light Mode Switcher
 * Persists preference in localStorage
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'changelog-theme';
  const THEME_DARK = 'dark';
  const THEME_LIGHT = 'light';

  // Get saved theme or default to dark
  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || THEME_DARK;
    } catch (e) {
      return THEME_DARK;
    }
  }

  // Save theme preference
  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Ignore storage errors
    }
  }

  // Apply theme to document
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Toggle between light and dark
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || THEME_DARK;
    const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    applyTheme(newTheme);
    saveTheme(newTheme);
    updateToggleButton(newTheme);
  }

  // Update toggle button appearance
  function updateToggleButton(theme) {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const isDark = theme === THEME_DARK;
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    
    // Update icon
    toggle.innerHTML = isDark ? getSunIcon() : getMoonIcon();
  }

  // Sun icon for dark mode (click to switch to light)
  function getSunIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="M4.93 4.93l1.41 1.41"></path>
      <path d="M17.66 17.66l1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="M6.34 17.66l-1.41 1.41"></path>
      <path d="M19.07 4.93l-1.41 1.41"></path>
    </svg>`;
  }

  // Moon icon for light mode (click to switch to dark)
  function getMoonIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </svg>`;
  }

  // Initialize theme on page load
  function init() {
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);

    // Create toggle button if container exists
    const container = document.querySelector('.theme-toggle-container');
    if (container) {
      const toggle = document.createElement('button');
      toggle.className = 'theme-toggle';
      toggle.type = 'button';
      toggle.addEventListener('click', toggleTheme);
      container.appendChild(toggle);
      updateToggleButton(savedTheme);
    }
  }

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
