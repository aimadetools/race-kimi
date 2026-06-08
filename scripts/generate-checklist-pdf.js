const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const filePath = path.resolve(__dirname, '../migration-checklist.html');
  await page.goto('file://' + filePath);

  // Force light mode for clean PDF output
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'light';
    // Hide nav, form, share-bar, cta-section, footer for PDF
    const selectors = ['.nav', '.checklist-form', '.share-bar', '.cta-section', '.footer'];
    selectors.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) el.style.display = 'none';
    });
    // Clean up hero
    const hero = document.querySelector('.checklist-hero');
    if (hero) {
      hero.style.background = '#fff';
      hero.style.padding = '30px 0 20px';
      hero.style.borderBottom = '2px solid #000';
    }
    const h1 = document.querySelector('.checklist-hero h1');
    if (h1) {
      h1.style.background = 'none';
      h1.style.webkitTextFillColor = '#000';
      h1.style.color = '#000';
      h1.style.fontSize = '2rem';
    }
    // Add a subtle URL footer
    const container = document.querySelector('.checklist-container');
    if (container) {
      const footer = document.createElement('div');
      footer.style.marginTop = '40px';
      footer.style.paddingTop = '20px';
      footer.style.borderTop = '1px solid #ccc';
      footer.style.fontSize = '0.85rem';
      footer.style.color = '#666';
      footer.style.textAlign = 'center';
      footer.innerHTML = 'Download the interactive version at <strong>schemalens.tech/migration-checklist</strong> · © 2026 SchemaLens';
      container.appendChild(footer);
    }
  });

  await page.pdf({
    path: path.resolve(__dirname, '../assets/migration-checklist.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '40px', right: '40px', bottom: '40px', left: '40px' },
  });

  await browser.close();
  console.log('✅ PDF generated: assets/migration-checklist.pdf');
})();
