const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGEERROR:', err.message));
  
  await page.addInitScript(() => {
    localStorage.setItem('sl_paywall_timing_variant_v2_winner', 'control');
    localStorage.setItem('schemalens_email_capture_dismissed', '1');
    localStorage.setItem('schemalens_diff_count', '99');
  });
  
  await page.goto('http://localhost:3000/app.html');
  await page.waitForTimeout(1000);
  
  console.log('Clicking Load sample (PostgreSQL)...');
  await page.click('text=Load sample (PostgreSQL)');
  await page.waitForTimeout(500);
  
  console.log('Loading sample B...');
  await page.evaluate(() => { if (typeof loadSampleB === 'function') loadSampleB(); });
  await page.waitForTimeout(500);
  
  console.log('Clicking compare...');
  await page.click('#compareBtn');
  
  console.log('Waiting for results...');
  try {
    await page.waitForSelector('#results.active', { state: 'visible', timeout: 15000 });
    console.log('SUCCESS: results rendered');
  } catch (e) {
    console.log('TIMEOUT: results not rendered');
    const btnText = await page.locator('#compareBtn').textContent();
    console.log('Button text:', btnText);
  }
  
  await browser.close();
})();
