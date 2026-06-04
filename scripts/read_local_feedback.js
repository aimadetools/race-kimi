const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const filePath = 'file://' + path.resolve(__dirname, '..', 'admin.html');
  await page.goto(filePath);
  await page.fill('#adminPassword', 'schemalens-admin-2026');
  await page.click('text=Sign In');
  await page.waitForSelector('#adminDashboard.active', { state: 'visible' });
  const feedback = await page.evaluate(() => localStorage.getItem('schemalens_feedback'));
  const emails = await page.evaluate(() => localStorage.getItem('schemalens_emails'));
  console.log('Feedback:', feedback);
  console.log('Emails:', emails);
  await browser.close();
})();
