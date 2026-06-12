#!/usr/bin/env node
/**
 * generate-demo-gif.js
 *
 * Captures a sequence of screenshots for the "SchemaLens in 60 seconds"
 * README / GitHub release GIF. Run this first, then run create-demo-gif.sh
 * to assemble the frames into an optimized 60-second GIF.
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'assets', 'demo-gif-frames');
const BASE_URL = 'http://localhost:3000';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function capture() {
  ensureDir(OUT_DIR);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // Helper: screenshot full page or viewport
  const shot = async (name, opts = {}) => {
    const file = path.join(OUT_DIR, `${name}.png`);
    await page.screenshot({
      path: file,
      fullPage: opts.fullPage ?? false,
      clip: opts.clip,
    });
    console.log('Captured', file);
    return file;
  };

  // ---------- Scene 1: Homepage hero ----------
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: 'networkidle' });
  await sleep(800);
  // Scroll to top and remove any modals / banners that might be open
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot('01-homepage-hero', { fullPage: false });

  // ---------- Scene 2: App empty state ----------
  await page.goto(`${BASE_URL}/app.html`, { waitUntil: 'networkidle' });
  await sleep(800);
  await page.evaluate(() => {
    localStorage.setItem('schemalens_tour_seen', '1');
    localStorage.setItem('schemalens_email_capture_dismissed', '1');
    localStorage.setItem('schemalens_diff_count', '999');
    if (typeof closeEmailCaptureModal === 'function') closeEmailCaptureModal();
    document.querySelectorAll('.tour-overlay').forEach((el) => el.remove());
  });
  // Clear any auto-loaded demo so we see the empty state with sample links
  await page.evaluate(() => {
    const a = document.getElementById('schemaA');
    const b = document.getElementById('schemaB');
    if (a) a.value = '';
    if (b) b.value = '';
    const results = document.getElementById('results');
    if (results) results.classList.remove('active');
  });
  await sleep(200);
  await shot('02-app-empty', { fullPage: false });

  // ---------- Scene 3: Load sample schema ----------
  // Pre-mark the tour and email capture as done so they don't block screenshots.
  await page.goto(`${BASE_URL}/app.html?example=staging-vs-production`, {
    waitUntil: 'networkidle',
  });
  await page.evaluate(() => {
    localStorage.setItem('schemalens_tour_seen', '1');
    localStorage.setItem('schemalens_email_capture_dismissed', '1');
    localStorage.setItem('schemalens_diff_count', '999');
  });
  // Wait for the auto-run comparison to finish
  await page.waitForSelector('#results.active', { timeout: 10000 });
  await sleep(600);
  await shot('03-app-loaded', { fullPage: false });

  // Dismiss any lead-capture modal or onboarding tour before interacting
  await page.evaluate(() => {
    if (typeof closeEmailCaptureModal === 'function') closeEmailCaptureModal();
    document.querySelectorAll('.tour-overlay').forEach((el) => el.remove());
  });

  // ---------- Scene 4: Visual diff ----------
  // Already on visual diff tab by default
  await page.waitForSelector('#visualDiff .diff-table', {
    timeout: 10000,
  });
  await sleep(400);
  // Scroll the diff into view
  await page.evaluate(() => {
    const el = document.getElementById('visualDiff');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.scrollBy(0, -20);
  });
  await sleep(400);
  await shot('04-visual-diff', { fullPage: false });

  // ---------- Scene 5: Migration SQL ----------
  // Use JS click to bypass any lead-capture modal overlay.
  await page.evaluate(() => {
    if (typeof closeEmailCaptureModal === 'function') closeEmailCaptureModal();
    const btn = document.querySelector('button[data-tab="migration"]');
    if (btn) btn.click();
  });
  await page.waitForSelector('#panel-migration.active', { timeout: 5000 });
  await sleep(400);
  await page.evaluate(() => {
    const el = document.getElementById('panel-migration');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.scrollBy(0, -20);
  });
  await sleep(400);
  await shot('05-migration-sql', { fullPage: false });

  // ---------- Scene 6: CI/CD integration ----------
  await page.goto(`${BASE_URL}/github-action.html`, { waitUntil: 'networkidle' });
  await sleep(800);
  await page.evaluate(() => window.scrollTo(0, 0));
  await shot('06-cicd-integration', { fullPage: false });

  await browser.close();
  console.log('\nAll frames captured to', OUT_DIR);
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
