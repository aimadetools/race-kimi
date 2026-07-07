/**
 * SchemaLens Final Race Countdown
 * Shared helper for the $100 AI Startup Race end (2026-07-10T23:59:59Z).
 * - Updates .final-countdown-inline elements every second.
 * - Updates .final-countdown-verbose elements with human-readable text.
 * - Adds .final-last-chance class to <body> within the last 48 hours.
 * - Exposes window.SchemaLensFinalCountdown for page-specific logic.
 */
(function () {
  'use strict';

  var RACE_END = new Date('2026-07-10T23:59:59Z');
  var LAST_CHANCE_MS = 48 * 60 * 60 * 1000;

  function getRemaining() {
    return RACE_END.getTime() - Date.now();
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function formatCompact(ms) {
    if (ms <= 0) return 'Race ended';
    var days = Math.floor(ms / 86400000);
    var hours = Math.floor((ms % 86400000) / 3600000);
    var minutes = Math.floor((ms % 3600000) / 60000);
    if (days > 0) return days + 'd ' + hours + 'h ' + minutes + 'm';
    var seconds = Math.floor((ms % 60000) / 1000);
    return hours + 'h ' + pad(minutes) + 'm ' + pad(seconds) + 's';
  }

  function formatVerbose(ms) {
    if (ms <= 0) return 'The race has ended';
    var days = Math.floor(ms / 86400000);
    var hours = Math.floor((ms % 86400000) / 3600000);
    var minutes = Math.floor((ms % 3600000) / 60000);
    var seconds = Math.floor((ms % 60000) / 1000);
    var parts = [];
    if (days > 0) parts.push(days + ' day' + (days !== 1 ? 's' : ''));
    if (hours > 0) parts.push(hours + ' hour' + (hours !== 1 ? 's' : ''));
    if (days === 0 && minutes > 0) parts.push(minutes + ' minute' + (minutes !== 1 ? 's' : ''));
    if (days === 0 && hours === 0 && seconds > 0) parts.push(seconds + ' second' + (seconds !== 1 ? 's' : ''));
    return parts.join(', ');
  }

  function isLastChance() {
    var ms = getRemaining();
    return ms > 0 && ms <= LAST_CHANCE_MS;
  }

  function update() {
    var ms = getRemaining();
    var compact = formatCompact(ms);
    var verbose = formatVerbose(ms);

    document.querySelectorAll('.final-countdown-inline').forEach(function (el) {
      el.textContent = compact;
    });
    document.querySelectorAll('.final-countdown-verbose').forEach(function (el) {
      el.textContent = verbose;
    });

    if (isLastChance()) {
      document.body.classList.add('final-last-chance');
    } else {
      document.body.classList.remove('final-last-chance');
    }
  }

  window.SchemaLensFinalCountdown = {
    getRemaining: getRemaining,
    formatCompact: formatCompact,
    formatVerbose: formatVerbose,
    isLastChance: isLastChance,
    update: update
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', update);
  } else {
    update();
  }
  setInterval(update, 1000);
})();
