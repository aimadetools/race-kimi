const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGEERROR:', err.message));

  await page.goto('http://localhost:3000/app.html');
  await page.evaluate(() => {
    localStorage.setItem('schemalens_email_capture_dismissed', '1');
    localStorage.setItem('schemalens_diff_count', '99');
    localStorage.setItem('sl_paywall_timing_variant_v2', 'control');
    window.SchemaLensPaywallVariantV2 = 'control';
  });
  await page.reload();

  const schemaA = `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT NOT NULL, phone TEXT);`;
  const schemaB = `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT NOT NULL);`;

  await page.fill('#schemaA', schemaA);
  await page.fill('#schemaB', schemaB);
  await page.waitForTimeout(500);

  console.log('Clicking compare...');
  await page.click('#compareBtn');
  await page.waitForTimeout(2000);

  const resultsActive = await page.locator('#results.active').isVisible().catch(() => false);
  console.log('results.active visible:', resultsActive);
  console.log('button text:', await page.locator('#compareBtn').textContent());
  console.log('errors:', await page.evaluate(() => window.__lastError || 'none'));

  await page.waitForTimeout(5000);
  await browser.close();
})();
