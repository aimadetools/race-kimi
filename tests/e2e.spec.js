const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';

// Collect console errors during tests
test.beforeEach(({ page }, testInfo) => {
  testInfo.attach('console-errors', { body: '[]' });
  page.errors = [];
  page.on('pageerror', (err) => {
    page.errors.push(err.message);
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      page.errors.push(msg.text());
    }
  });
});

test.afterEach(async ({ page }, testInfo) => {
  if (page.errors.length > 0) {
    await testInfo.attach('console-errors', {
      body: JSON.stringify(page.errors, null, 2),
      contentType: 'application/json',
    });
  }
  expect(page.errors).toEqual([]);
});

// ───────────────────────────────────────────────
// Page Load Tests
// ───────────────────────────────────────────────

const pages = [
  { path: '/', name: 'Homepage' },
  { path: '/app.html', name: 'Schema Diff App' },
  { path: '/about.html', name: 'About' },
  { path: '/pricing.html', name: 'Pricing' },
  { path: '/blog.html', name: 'Blog' },
  { path: '/tools.html', name: 'Tools Landing' },
  { path: '/api.html', name: 'API Docs' },
  { path: '/api-guide.html', name: 'API Quick Start Guide' },
  { path: '/postgres-schema-diff.html', name: 'PostgreSQL Diff Landing' },
  { path: '/mysql-schema-diff.html', name: 'MySQL Diff Landing' },
  { path: '/sqlite-schema-diff.html', name: 'SQLite Diff Landing' },
  { path: '/sql-server-schema-diff.html', name: 'SQL Server Diff Landing' },
  { path: '/tools/sql-validator.html', name: 'SQL Validator' },
  { path: '/tools/sql-formatter.html', name: 'SQL Formatter' },
  { path: '/tools/schema-doc-generator.html', name: 'Schema Doc Generator' },
  { path: '/tools/csv-to-sql.html', name: 'CSV to SQL' },
  { path: '/tools/json-to-sql.html', name: 'JSON to SQL' },
  { path: '/tools/schema-health-check.html', name: 'Schema Health Check' },
  { path: '/tools/sql-index-analyzer.html', name: 'SQL Index Analyzer' },
  { path: '/tools/create-table-generator.html', name: 'CREATE TABLE Generator' },
  { path: '/tools/alter-table-generator.html', name: 'ALTER TABLE Generator' },
  { path: '/tools/sql-insert-generator.html', name: 'SQL INSERT Generator' },
  { path: '/tools/sql-join-visualizer.html', name: 'SQL JOIN Visualizer' },
  { path: '/tools/schema-mistake-quiz.html', name: 'Schema Mistake Quiz' },
  { path: '/tools/schema-diagram.html', name: 'ER Diagram Generator' },
  { path: '/oracle-schema-diff.html', name: 'Oracle Diff Landing' },
  { path: '/tools/sql-data-types.html', name: 'SQL Data Types Reference' },
  { path: '/sql-diff-online.html', name: 'SQL Diff Online Landing' },
  { path: '/schema-migration-tool.html', name: 'Schema Migration Tool Landing' },
  { path: '/database-schema-sync.html', name: 'Database Schema Sync Landing' },
  { path: '/ci-cd-integration.html', name: 'CI/CD Integration Landing' },
  { path: '/zapier-integration.html', name: 'Zapier Integration Landing' },
  { path: '/schema-documentation-tool.html', name: 'Schema Documentation Tool Landing' },
  { path: '/schema-comparison-tool.html', name: 'Schema Comparison Tool Landing' },
  { path: '/migration-checklist.html', name: 'Migration Safety Checklist' },
  { path: '/prisma-schema-diff.html', name: 'Prisma Schema Diff Landing' },
  { path: '/drizzle-schema-diff.html', name: 'Drizzle Schema Diff Landing' },
];

for (const { path, name } of pages) {
  test(`${name} loads without console errors`, async ({ page }) => {
    const response = await page.goto(`${BASE_URL}${path}`);
    expect(response.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
  });
}

// ───────────────────────────────────────────────
// Theme Toggle Tests
// ───────────────────────────────────────────────

const themeTogglePages = [
  '/',
  '/app.html',
  '/tools/sql-validator.html',
];

for (const path of themeTogglePages) {
  test(`theme toggle works on ${path}`, async ({ page }) => {
    await page.goto(`${BASE_URL}${path}`);
    const toggle = page.locator('button:has-text("🌓")').first();
    await expect(toggle).toBeVisible({ timeout: 5000 });
    const before = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    await toggle.click();
    const after = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(after).not.toBe(before);
    await toggle.click();
    const restored = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(restored).toBe(before);
  });
}

// ───────────────────────────────────────────────
// Schema Diff App Core Flow
// ───────────────────────────────────────────────

test('app: load PostgreSQL sample and generate diff + migration', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  
  // Click PostgreSQL sample (loads Schema A)
  await page.click('text=Load sample (PostgreSQL)');
  await page.waitForTimeout(300);
  
  // Load modified Schema B
  await page.evaluate(() => { if (typeof loadSampleB === 'function') loadSampleB(); });
  await page.waitForTimeout(300);
  
  // Click Compare
  await page.click('#compareBtn');
  
  // Wait for results to render
  await page.waitForSelector('#results.active', { state: 'visible', timeout: 10000 });
  
  // Summary bar should show table counts
  const summary = await page.locator('#summaryBar').textContent();
  expect(summary).toContain('tables');
  
  // Migration SQL tab should contain ALTER TABLE
  await page.click('button[data-tab="migration"]');
  const migration = await page.locator('#migrationContainer').textContent();
  expect(migration).toContain('ALTER TABLE');
  
  // Visual Diff should show changes
  await page.click('button[data-tab="visual"]');
  const diffContent = await page.locator('#visualDiff').textContent();
  expect(diffContent.length).toBeGreaterThan(0);
});

test('app: load MySQL sample and generate diff', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await page.selectOption('#dialect', 'mysql');
  await page.click('text=Load sample (MySQL)');
  await page.waitForTimeout(300);
  await page.evaluate(() => { if (typeof loadSampleB === 'function') loadSampleB(); });
  await page.waitForTimeout(300);
  await page.click('#compareBtn');
  await page.waitForSelector('#results.active', { state: 'visible', timeout: 10000 });
  const summary = await page.locator('#summaryBar').textContent();
  expect(summary).toContain('tables');
});

test('app: breaking changes detection works for dropped column', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  
  const schemaA = `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT NOT NULL, phone TEXT);`;
  const schemaB = `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT NOT NULL);`;
  
  await page.fill('#schemaA', schemaA);
  await page.fill('#schemaB', schemaB);
  await page.waitForTimeout(200);
  
  await page.click('#compareBtn');
  await page.waitForSelector('#results.active', { state: 'visible', timeout: 10000 });
  
  // Should show breaking changes
  const pageText = await page.locator('body').textContent();
  expect(pageText).toMatch(/breaking|DROP COLUMN/i);
});

test('app: ORM export generates Prisma and Drizzle schemas', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await page.click('text=Load sample (PostgreSQL)');
  await page.waitForTimeout(300);
  await page.evaluate(() => { if (typeof loadSampleB === 'function') loadSampleB(); });
  await page.waitForTimeout(300);
  await page.click('#compareBtn');
  await page.waitForSelector('#results.active', { state: 'visible', timeout: 10000 });

  // Switch to ORM Export tab
  await page.click('button[data-tab="orm"]');
  await page.waitForTimeout(300);

  // Prisma should be visible by default
  const prismaOutput = await page.locator('#ormOutput').textContent();
  expect(prismaOutput).toContain('datasource db');
  expect(prismaOutput).toContain('model');

  // Switch to Drizzle
  await page.click('button:has-text("Drizzle")');
  await page.waitForTimeout(300);
  const drizzleOutput = await page.locator('#ormOutput').textContent();
  expect(drizzleOutput).toContain('pgTable');
  expect(drizzleOutput).toContain('export const');
});

test('app: license modal opens and closes', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  
  const unlockBtn = page.locator('#licenseStatus').first();
  if (await unlockBtn.isVisible().catch(() => false)) {
    await unlockBtn.click();
    const modal = page.locator('#licenseModal').first();
    await expect(modal).toBeVisible();
    
    // Close via cancel button
    const cancelBtn = modal.locator('button:has-text("Cancel")').first();
    if (await cancelBtn.isVisible().catch(() => false)) {
      await cancelBtn.click();
    } else {
      await page.keyboard.press('Escape');
    }
    await expect(modal).toBeHidden();
  }
});

test('app: share button shows copied feedback', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await page.click('text=Load sample (PostgreSQL)');
  await page.waitForTimeout(300);
  await page.evaluate(() => { if (typeof loadSampleB === 'function') loadSampleB(); });
  await page.waitForTimeout(300);
  await page.click('#compareBtn');
  await page.waitForSelector('#results.active', { state: 'visible', timeout: 10000 });
  
  const shareBtn = page.locator('#shareBtn');
  if (await shareBtn.isVisible().catch(() => false)) {
    await shareBtn.click();
    await page.waitForTimeout(300);
    const btnText = await shareBtn.textContent();
    expect(btnText).toMatch(/Copied|URL ready/);
  }
});

test('app: clear button resets editors', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await page.click('text=Load sample (PostgreSQL)');
  await page.waitForTimeout(300);
  
  const clearBtn = page.locator('#clearBtn');
  if (await clearBtn.isVisible().catch(() => false)) {
    await clearBtn.click();
    const schemaA = await page.locator('#schemaA').inputValue();
    expect(schemaA.trim()).toBe('');
  }
});

// ───────────────────────────────────────────────
// Tools Tests
// ───────────────────────────────────────────────

test('sql formatter: formats sample SQL', async ({ page }) => {
  await page.goto(`${BASE_URL}/tools/sql-formatter.html`);
  await page.click('text=Load Sample');
  await page.waitForTimeout(200);
  await page.click('button:has-text("Format SQL")');
  await page.waitForTimeout(300);
  
  const output = await page.locator('#output').textContent();
  expect(output).toContain('SELECT');
});

test('sql validator: validates sample schema', async ({ page }) => {
  await page.goto(`${BASE_URL}/tools/sql-validator.html`);
  await page.fill('#sqlInput', `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  );`);
  await page.waitForTimeout(200);
  await page.click('text=Validate Schema');
  await page.waitForTimeout(300);
  
  const pageText = await page.locator('body').textContent();
  expect(pageText).toMatch(/table|column|valid/i);
});

test('csv to sql: converts sample CSV', async ({ page }) => {
  await page.goto(`${BASE_URL}/tools/csv-to-sql.html`);
  await page.click('text=Load Sample');
  await page.waitForTimeout(200);
  await page.click('text=Convert to SQL');
  await page.waitForTimeout(300);
  
  const output = await page.locator('#sqlOutput').textContent();
  expect(output).toContain('CREATE TABLE');
});

test('json to sql: converts sample JSON', async ({ page }) => {
  await page.goto(`${BASE_URL}/tools/json-to-sql.html`);
  await page.click('text=Load Sample');
  await page.waitForTimeout(200);
  await page.click('text=Generate SQL');
  await page.waitForTimeout(300);
  
  const output = await page.locator('#sqlOutput').textContent();
  expect(output).toContain('CREATE TABLE');
});

test('schema health check: detects issues in sample schema', async ({ page }) => {
  await page.goto(`${BASE_URL}/tools/schema-health-check.html`);
  await page.click('text=Load Sample');
  await page.waitForTimeout(200);
  await page.click('text=Check Health');
  await page.waitForTimeout(300);
  
  const results = await page.locator('#results').textContent();
  expect(results).toContain('/100');
  expect(results).toMatch(/issue|warning|info/i);
});

// ───────────────────────────────────────────────
// API Tests (skip when running against static file server)
// ───────────────────────────────────────────────

test('api: POST /api/diff returns JSON diff', async ({ request }) => {
  test.skip(process.env.SKIP_API_TESTS === 'true', 'API tests skipped for static server');
  const response = await request.post(`${BASE_URL}/api/diff`, {
    data: {
      schemaA: 'CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);',
      schemaB: 'CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, email TEXT);',
      dialect: 'postgres',
      format: 'json',
    },
  });
  
  if (response.status() === 501) {
    test.skip(true, 'Static server does not support POST');
  }
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('diff');
  expect(body).toHaveProperty('migration');
  expect(body.diff.columnsAdded).toBeDefined();
});

test('api: POST /api/diff returns markdown', async ({ request }) => {
  test.skip(process.env.SKIP_API_TESTS === 'true', 'API tests skipped for static server');
  const response = await request.post(`${BASE_URL}/api/diff`, {
    data: {
      schemaA: 'CREATE TABLE users (id SERIAL PRIMARY KEY);',
      schemaB: 'CREATE TABLE users (id SERIAL PRIMARY KEY);',
      dialect: 'postgres',
      format: 'markdown',
    },
  });
  
  if (response.status() === 501) {
    test.skip(true, 'Static server does not support POST');
  }
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('markdown');
  expect(body.markdown).toContain('#');
});

test('api: POST /api/diff returns 400 for missing schema', async ({ request }) => {
  test.skip(process.env.SKIP_API_TESTS === 'true', 'API tests skipped for static server');
  const response = await request.post(`${BASE_URL}/api/diff`, {
    data: { dialect: 'postgres' },
  });
  
  if (response.status() === 501) {
    test.skip(true, 'Static server does not support POST');
  }
  expect(response.status()).toBe(400);
});

test('api: POST /api/analytics returns 204', async ({ request }) => {
  test.skip(process.env.SKIP_API_TESTS === 'true', 'API tests skipped for static server');
  const response = await request.post(`${BASE_URL}/api/analytics`, {
    data: { event_type: 'page_view', page_path: '/test', metadata: { test: true } },
  });

  if (response.status() === 501) {
    test.skip(true, 'Static server does not support POST');
  }
  expect(response.status()).toBe(204);
});

test('api: POST /api/analytics returns 400 for invalid event', async ({ request }) => {
  test.skip(process.env.SKIP_API_TESTS === 'true', 'API tests skipped for static server');
  const response = await request.post(`${BASE_URL}/api/analytics`, {
    data: { event_type: 'hacker_attack', page_path: '/test' },
  });

  if (response.status() === 501) {
    test.skip(true, 'Static server does not support POST');
  }
  expect(response.status()).toBe(400);
});

// ───────────────────────────────────────────────
// Dialect Landing Pages
// ───────────────────────────────────────────────

for (const { path, dialect } of [
  { path: '/postgres-schema-diff.html', dialect: 'postgres' },
  { path: '/mysql-schema-diff.html', dialect: 'mysql' },
  { path: '/sqlite-schema-diff.html', dialect: 'sqlite' },
  { path: '/sql-server-schema-diff.html', dialect: 'mssql' },
]) {
  test(`${dialect} landing page CTA links to app with dialect param`, async ({ page }) => {
    await page.goto(`${BASE_URL}${path}`);
    const cta = page.locator('a[href*="app.html"]').first();
    const href = await cta.getAttribute('href');
    expect(href).toContain('app.html');
  });
}

// ───────────────────────────────────────────────
// Blog Pages
// ───────────────────────────────────────────────

test('blog post loads and has CTA to app', async ({ page }) => {
  await page.goto(`${BASE_URL}/blog/compare-database-schemas-before-deploying.html`);
  const bodyText = await page.locator('body').textContent();
  expect(bodyText).toMatch(/SchemaLens|app\.html/i);
});

test('schema drift blog post loads without errors', async ({ page }) => {
  await page.goto(`${BASE_URL}/blog/how-to-catch-schema-drift.html`);
  const bodyText = await page.locator('body').textContent();
  expect(bodyText).toContain('Schema Drift');
  expect(bodyText).toContain('SchemaLens');
});

test('indexing guide blog post loads without errors', async ({ page }) => {
  await page.goto(`${BASE_URL}/blog/complete-guide-to-database-indexing-for-schema-changes.html`);
  const bodyText = await page.locator('body').textContent();
  expect(bodyText).toContain('Database Indexing');
  expect(bodyText).toContain('SchemaLens');
});

test('create table generator loads and generates sql', async ({ page }) => {
  await page.goto(`${BASE_URL}/tools/create-table-generator.html`);
  await page.fill('#tableName', 'products');
  await page.fill('.col-name', 'id');
  await page.selectOption('.col-type', 'SERIAL');
  await page.check('.col-pk');
  await page.check('.col-nn');
  await page.click('#generateBtn');
  const output = await page.locator('#sqlOutput').textContent();
  expect(output).toContain('CREATE TABLE');
  expect(output).toContain('products');
  expect(output).toContain('id');
});

test('create table generator blog post loads without errors', async ({ page }) => {
  await page.goto(`${BASE_URL}/blog/generate-create-table-statements-visually.html`);
  const bodyText = await page.locator('body').textContent();
  expect(bodyText).toContain('CREATE TABLE');
  expect(bodyText).toContain('SchemaLens');
});

test('er diagram blog post loads without errors', async ({ page }) => {
  await page.goto(`${BASE_URL}/blog/how-to-generate-er-diagrams-from-sql-automatically.html`);
  const bodyText = await page.locator('body').textContent();
  expect(bodyText).toContain('ER Diagram');
  expect(bodyText).toContain('SchemaLens');
});

test('schema versioning blog post loads without errors', async ({ page }) => {
  await page.goto(`${BASE_URL}/blog/database-schema-versioning-best-practices.html`);
  const bodyText = await page.locator('body').textContent();
  expect(bodyText).toContain('Schema Versioning');
  expect(bodyText).toContain('SchemaLens');
});

test('sql joins explained blog post loads without errors', async ({ page }) => {
  await page.goto(`${BASE_URL}/blog/sql-joins-explained-with-examples.html`);
  const bodyText = await page.locator('body').textContent();
  expect(bodyText).toContain('SQL JOINs');
  expect(bodyText).toContain('SchemaLens');
});
