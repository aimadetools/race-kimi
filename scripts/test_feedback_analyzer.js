const { chromium } = require('@playwright/test');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const filePath = 'file://' + path.resolve(__dirname, '..', 'admin.html');
  await page.goto(filePath);

  const sample = [
    { id: 'fb-1', date: new Date().toISOString(), category: 'upgrade-blocker-reason', reason: 'too_expensive', message: 'Reason for not upgrading: Too expensive', page_path: '/app.html' },
    { id: 'fb-2', date: new Date().toISOString(), category: 'upgrade-blocker-reason', reason: 'missing_features', message: 'Reason for not upgrading: Missing features', page_path: '/app.html' },
    { id: 'fb-3', date: new Date().toISOString(), category: 'upgrade-blocker', message: 'I need SQL Server dialect support before I buy', page_path: '/app.html' },
    { id: 'fb-4', date: new Date().toISOString(), category: 'upgrade-blocker', message: 'The price is too high for a side project', page_path: '/pricing.html' },
    { id: 'fb-5', date: new Date().toISOString(), category: 'upgrade-blocker-reason', reason: 'too_expensive', message: 'Reason for not upgrading: Too expensive', page_path: '/app.html' }
  ];
  await page.evaluate(data => localStorage.setItem('schemalens_feedback', JSON.stringify(data)), sample);

  await page.fill('#adminPassword', 'schemalens-admin-2026');
  await page.click('text=Sign In');
  await page.waitForSelector('#adminDashboard.active', { state: 'visible' });

  const text = await page.textContent('#feedbackAnalysisBody');
  console.log('Analysis text preview:');
  console.log(text.slice(0, 1200));

  const hasPricing = text.includes('Pricing') || text.includes('Too expensive');
  const hasDialect = text.includes('Dialect support') || text.includes('SQL Server');
  console.log('Has pricing signal:', hasPricing);
  console.log('Has dialect signal:', hasDialect);

  await browser.close();
})();
