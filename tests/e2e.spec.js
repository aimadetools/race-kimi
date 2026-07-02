const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';

// Collect console errors during tests
test.beforeEach(async ({ page }, testInfo) => {
  testInfo.attach('console-errors', { body: '[]' });
  page.errors = [];
  // Force app paywall timing to control (suppresses interstitial) and dismiss email capture
  // so most tests don't see modals/banners. Interstitial-specific tests opt in explicitly.
  await page.addInitScript(() => {
    localStorage.setItem('sl_paywall_timing_variant_v2_winner', 'control');
    localStorage.setItem('schemalens_email_capture_dismissed', '1');
    localStorage.setItem('schemalens_diff_count', '99');
  });
  page.on('pageerror', (err) => {
    page.errors.push(err.message);
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore flaky external-analytics 403s (e.g. Vercel Insights) in local test runs.
      if (/Failed to load resource.*\b403\b/.test(text)) return;
      if (/vercel-insights/i.test(text)) return;
      page.errors.push(text);
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
  { path: '/mcp-server.html', name: 'MCP Server Landing' },
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
  { path: '/product-hunt.html', name: 'Product Hunt Landing' },
  { path: '/show-hn.html', name: 'Show HN Landing' },
  { path: '/founding-member.html', name: 'Founding Member Landing' },
  { path: '/launch-special.html', name: 'Launch Special Landing' },
  { path: '/open-source.html', name: 'Open Source Landing' },
  { path: '/open-source-sponsorship.html', name: 'Open Source Sponsorship' },
  { path: '/open-source-sponsors.html', name: 'Open Source Sponsors Wall' },
  { path: '/breaking-change-of-the-week.html', name: 'Breaking Change of the Week' },
  { path: '/vscode-extension.html', name: 'VS Code Extension Landing' },
  { path: '/schema-examples.html', name: 'Schema Examples' },
  { path: '/schema-templates.html', name: 'Schema Templates' },
  { path: '/migration-recipes.html', name: 'Migration Recipes' },
  { path: '/github-action.html', name: 'GitHub Action Landing' },
  { path: '/github-action-schema-diff-report.html', name: 'GitHub Action Schema Diff Report Landing' },
  { path: '/schema-diff-report.html', name: 'Schema Diff Report Landing' },
  { path: '/tools/schema-diff-report-gallery.html', name: 'Schema Diff Report Gallery' },
  { path: '/github-action-live-demo.html', name: 'GitHub Action Live Demo Landing' },
  { path: '/github-app.html', name: 'GitHub App Landing' },
  { path: '/github-pr-schema-diff.html', name: 'GitHub PR Schema Diff' },
  { path: '/schema-diff-github-pr.html', name: 'Schema Diff GitHub PR Landing' },
  { path: '/database-migration-review-tool.html', name: 'Database Migration Review Tool Landing' },
  { path: '/catch-breaking-schema-changes-in-prs.html', name: 'Catch Breaking Schema Changes in PRs Landing' },
  { path: '/gitlab-schema-diff.html', name: 'GitLab CI Landing' },
  { path: '/bitbucket-schema-diff.html', name: 'Bitbucket Pipelines Landing' },
  { path: '/jenkins-schema-diff.html', name: 'Jenkins Pipeline Landing' },
  { path: '/circleci-schema-diff.html', name: 'CircleCI Pipeline Landing' },
  { path: '/azure-devops-schema-diff.html', name: 'Azure DevOps Pipeline Landing' },
  { path: '/book-demo.html', name: 'Book Demo' },
  { path: '/team.html', name: 'Team' },
  { path: '/team-buy.html', name: 'Team Buy' },
  { path: '/slack-app.html', name: 'Slack App Landing' },
  { path: '/schema-changelog-generator.html', name: 'Schema Changelog Generator' },
  { path: '/zero-downtime-migration-guide.html', name: 'Zero-Downtime Migration Guide' },
  { path: '/tools/sql-to-orm-converter.html', name: 'SQL to ORM Converter' },
  { path: '/tools/sql-to-typescript.html', name: 'SQL to TypeScript Generator' },
  { path: '/tools/sql-query-explainer.html', name: 'SQL Query Explainer' },
  { path: '/tools/connection-string-parser.html', name: 'Connection String Parser' },
  { path: '/tools/sql-to-python.html', name: 'SQL to Python Generator' },
  { path: '/tools/sql-update-generator.html', name: 'SQL UPDATE Generator' },
  { path: '/tools/sql-delete-generator.html', name: 'SQL DELETE Generator' },
  { path: '/tools/sql-upsert-generator.html', name: 'SQL UPSERT Generator' },
  { path: '/tools/sql-case-generator.html', name: 'SQL CASE Generator' },
  { path: '/tools/sql-select-generator.html', name: 'SQL SELECT Generator' },
  { path: '/tools/sql-to-go.html', name: 'SQL to Go Generator' },
  { path: '/tools/sql-to-java.html', name: 'SQL to Java Generator' },
  { path: '/tools/sql-to-rust.html', name: 'SQL to Rust Generator' },
  { path: '/tools/sql-create-index-generator.html', name: 'SQL CREATE INDEX Generator' },
  { path: '/tools/sql-create-view-generator.html', name: 'SQL CREATE VIEW Generator' },
  { path: '/tools/sql-drop-generator.html', name: 'SQL DROP Statement Generator' },
  { path: '/tools/safe-migration-checker.html', name: 'Safe Migration Checker' },
  { path: '/tools/sql-reserved-words-checker.html', name: 'Reserved Words Checker' },
  { path: '/tools/migration-cost-calculator.html', name: 'Migration Cost Calculator' },
  { path: '/tools/schema-diff-vs-manual.html', name: 'Schema Diff vs Manual Comparison' },
  { path: '/tools/schema-change-slack-message-generator.html', name: 'Schema Change Slack Message Generator' },
  { path: '/tools/migration-test-plan-generator.html', name: 'Migration Test Plan Generator' },
  { path: '/tools/schema-change-checklist.html', name: 'Database Schema Change Checklist' },
  { path: '/tools/schema-diff-precommit-hook.html', name: 'Schema Diff Pre-commit Hook Generator' },
  { path: '/tools/schema-diff-pr-comment-generator.html', name: 'Schema Diff PR Comment Generator' },
  { path: '/tools/schema-diff-impact-report-generator.html', name: 'Schema Diff Impact Report Generator' },
  { path: '/tools/embed-generator.html', name: 'Embed Generator' },
  // Note: Badge Generator is tested separately — it loads /api/badge images which 404 on static server
  // { path: '/tools/badge-generator.html', name: 'Badge Generator' },
  { path: '/typeorm-schema-diff.html', name: 'TypeORM Schema Diff Landing' },
  { path: '/sequelize-schema-diff.html', name: 'Sequelize Schema Diff Landing' },
  { path: '/supabase-schema-diff.html', name: 'Supabase Schema Diff Landing' },
  { path: '/neon-schema-diff.html', name: 'Neon Schema Diff Landing' },
  { path: '/cockroachdb-schema-diff.html', name: 'CockroachDB Schema Diff Landing' },
  { path: '/mariadb-schema-diff.html', name: 'MariaDB Schema Diff Landing' },
  { path: '/azure-sql-schema-diff.html', name: 'Azure SQL Schema Diff Landing' },
  { path: '/timescaledb-schema-diff.html', name: 'TimescaleDB Schema Diff Landing' },
  { path: '/duckdb-schema-diff.html', name: 'DuckDB Schema Diff Landing' },
  { path: '/bigquery-schema-diff.html', name: 'BigQuery Schema Diff Landing' },
  { path: '/snowflake-schema-diff.html', name: 'Snowflake Schema Diff Landing' },
  { path: '/clickhouse-schema-diff.html', name: 'ClickHouse Schema Diff Landing' },
  { path: '/planetscale-schema-diff.html', name: 'PlanetScale Schema Diff Landing' },
  { path: '/railway-schema-diff.html', name: 'Railway Schema Diff Landing' },
  { path: '/firebase-schema-diff.html', name: 'Firebase Schema Diff Landing' },
  { path: '/laravel-schema-diff.html', name: 'Laravel Schema Diff Landing' },
  { path: '/django-schema-diff.html', name: 'Django Schema Diff Landing' },
  { path: '/rails-schema-diff.html', name: 'Rails Schema Diff Landing' },
  { path: '/express-schema-diff.html', name: 'Express Schema Diff Landing' },
  { path: '/fastapi-schema-diff.html', name: 'FastAPI Schema Diff Landing' },
  { path: '/spring-boot-schema-diff.html', name: 'Spring Boot Schema Diff Landing' },
  { path: '/aspnetcore-schema-diff.html', name: 'ASP.NET Core Schema Diff Landing' },
  { path: '/flask-schema-diff.html', name: 'Flask Schema Diff Landing' },
  { path: '/phoenix-schema-diff.html', name: 'Phoenix Schema Diff Landing' },
  { path: '/sqlite-alter-table.html', name: 'SQLite ALTER TABLE Guide' },
  { path: '/create-index-mysql.html', name: 'Create Index MySQL Guide' },
  { path: '/add-foreign-key-postgres.html', name: 'Add Foreign Key Postgres Guide' },
  { path: '/schema-examples.html', name: 'Schema Diff Examples' },
  { path: '/database-schema-design-patterns.html', name: 'Database Schema Design Patterns' },
  { path: '/database-schema-anti-patterns.html', name: 'Database Schema Anti-Patterns' },
  { path: '/features.html', name: 'Product Features' },
  { path: '/tools/schema-diff-speed-challenge.html', name: 'Schema Diff Speed Challenge' },
  { path: '/tools/schema-code-review.html', name: 'Schema Code Review' },
  { path: '/tools/schema-semver-calculator.html', name: 'Schema SemVer Calculator' },
  { path: '/tools/cicd-setup-wizard.html', name: 'CI/CD Setup Wizard' },
  { path: '/tools/add-schema-diff-to-any-repo.html', name: 'Add Schema Diff to Any Repo' },
  { path: '/tools/gitlab-schema-diff-in-60-seconds.html', name: 'GitLab Schema Diff in 60 Seconds' },
  { path: '/tools/github-schema-diff-in-60-seconds.html', name: 'GitHub Actions Schema Diff in 60 Seconds' },
  { path: '/tools/jenkins-schema-diff-in-60-seconds.html', name: 'Jenkins Schema Diff in 60 Seconds' },
  { path: '/tools/circleci-schema-diff-in-60-seconds.html', name: 'CircleCI Schema Diff in 60 Seconds' },
  { path: '/tools/bitbucket-schema-diff-in-60-seconds.html', name: 'Bitbucket Schema Diff in 60 Seconds' },
  { path: '/tools/azure-schema-diff-in-60-seconds.html', name: 'Azure DevOps Schema Diff in 60 Seconds' },
  { path: '/tools/request-team-invoice.html', name: 'Request Team Invoice' },
  { path: '/tools/team-roi-calculator.html', name: 'Team ROI Calculator' },
  { path: '/tools/team-plan-comparison.html', name: 'Team Plan Comparison' },
  { path: '/team/workspace-preview.html', name: 'Team Workspace Preview' },
  { path: '/tools/team-plan-one-pager.html', name: 'Team Plan One-Pager' },
  { path: '/schema-drift-alert.html', name: 'Schema Drift Alert Page' },
  { path: '/team/schema-drift-dashboard.html', name: 'Team Schema Drift Dashboard' },
  { path: '/blog/add-schema-diff-to-any-ci-cd-pipeline-in-60-seconds.html', name: 'CI/CD Pipeline 60s Blog Post' },
  { path: '/blog/github-action-free-full-migration-sql.html', name: 'GitHub Action Free Forever Blog Post' },
  { path: '/trust.html', name: 'Trust Center' },
  { path: '/schema-diff-newsletter.html', name: 'Newsletter Ad Landing Page' },
];

for (const { path, name } of pages) {
  test(`${name} loads without console errors`, async ({ page }) => {
    const response = await page.goto(`${BASE_URL}${path}`);
    expect(response.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
  });
}

// ───────────────────────────────────────────────
// Trust Center
// ───────────────────────────────────────────────

test('Trust Center highlights privacy-first architecture and marketplace badges', async ({ page }) => {
  await page.goto(`${BASE_URL}/trust.html`);
  await expect(page.locator('h1')).toContainText('Your schema data stays private');
  await expect(page.locator('text=No SQL upload')).toBeVisible();
  await expect(page.locator('text=No database connection')).toBeVisible();
  await expect(page.locator('[data-github-stars]')).toBeVisible();
});

// ───────────────────────────────────────────────
// Homepage CI/CD Sample Schema CTA Row
// ───────────────────────────────────────────────

test('Homepage shows second sample-schema row with CI/CD entry points', async ({ page }) => {
  await page.goto(`${BASE_URL}/`);
  await expect(page.locator('a.sample-schema-card[href="github-pr-schema-diff.html"]')).toContainText('Diff a GitHub PR');
  await expect(page.locator('a.sample-schema-card[href="tools/cicd-setup-wizard.html?platform=github"]')).toContainText('Add to GitHub Actions');
  await expect(page.locator('a.sample-schema-card[href="database-schema-review-checklist.html"]')).toContainText('Review a Migration');
  await expect(page.locator('a.sample-schema-card[href="tools/migration-safety-badge.html"]')).toContainText('Embed a Safety Badge');
});

// ───────────────────────────────────────────────
// GitHub PR Schema Diff Shareable URLs
// ───────────────────────────────────────────────

test('GitHub PR Schema Diff pre-fills input from ?pr= and shows share section after mock', async ({ page }) => {
  const prUrl = 'https://github.com/owner/repo/pull/123';
  const mock = {
    ok: true,
    owner: 'owner',
    repo: 'repo',
    pull: 123,
    file: 'schema.sql',
    dialect: 'postgres',
    summary: { tablesAdded: 1, tablesRemoved: 0, tablesModified: 0, breakingChanges: 0, riskScore: 12, riskLabel: 'low' },
    migration: 'CREATE TABLE users (id SERIAL PRIMARY KEY);',
    markdown: '## Schema Diff Summary\n\nNo breaking changes.',
    sqlFiles: [{ filename: 'schema.sql', status: 'modified', additions: 1, deletions: 0 }]
  };
  await page.route('**/api/github-pr-diff*', route => {
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mock) });
  });
  await page.goto(`${BASE_URL}/github-pr-schema-diff.html?pr=${encodeURIComponent(prUrl)}&file=schema.sql`);
  await expect(page.locator('#prUrl')).toHaveValue(prUrl);
  await expect(page.locator('#shareSection')).toBeVisible();
  await expect(page.locator('#shareUrl')).toHaveValue(/github-pr-schema-diff\.html\?pr=/);
  await expect(page.locator('#badgeMarkdown')).toHaveValue(/img\.shields\.io/);
});

// ───────────────────────────────────────────────
// CI/CD Setup Wizard Platform Landing Pages
// ───────────────────────────────────────────────

const wizardPlatforms = [
  { platform: 'github', h1: 'GitHub Actions Schema Diff Wizard', title: 'GitHub Actions Schema Diff Setup Wizard — SchemaLens' },
  { platform: 'gitlab', h1: 'GitLab CI Schema Diff Wizard', title: 'GitLab CI Schema Diff Setup Wizard — SchemaLens' },
  { platform: 'jenkins', h1: 'Jenkins Schema Diff Wizard', title: 'Jenkins Schema Diff Pipeline Setup Wizard — SchemaLens' },
  { platform: 'circleci', h1: 'CircleCI Schema Diff Wizard', title: 'CircleCI Schema Diff Setup Wizard — SchemaLens' },
  { platform: 'bitbucket', h1: 'Bitbucket Pipelines Schema Diff Wizard', title: 'Bitbucket Pipelines Schema Diff Setup Wizard — SchemaLens' },
  { platform: 'azure', h1: 'Azure DevOps Schema Diff Wizard', title: 'Azure DevOps Schema Diff Setup Wizard — SchemaLens' },
];

for (const { platform, h1, title } of wizardPlatforms) {
  test(`CI/CD Setup Wizard ?platform=${platform} loads with platform-specific SEO`, async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/tools/cicd-setup-wizard.html?platform=${platform}`);
    expect(response.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('h1')).toContainText(h1);
    const pageTitle = await page.title();
    expect(pageTitle).toBe(title);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description.toLowerCase()).toContain(platform === 'bitbucket' ? 'bitbucket' : platform);
  });
}

// ───────────────────────────────────────────────
// CI/CD Distribution Landing Pages
// ───────────────────────────────────────────────

test('Add schema diff to any repo page shows 6 platform cards', async ({ page }) => {
  await page.goto(`${BASE_URL}/tools/add-schema-diff-to-any-repo.html`);
  await expect(page.locator('h1')).toContainText('Add schema diff');
  await expect(page.locator('a.platform-card[href="cicd-setup-wizard.html?platform=github"]')).toContainText('GitHub Actions');
  await expect(page.locator('a.platform-card[href="cicd-setup-wizard.html?platform=gitlab"]')).toContainText('GitLab CI');
  await expect(page.locator('a.platform-card[href="cicd-setup-wizard.html?platform=jenkins"]')).toContainText('Jenkins');
  await expect(page.locator('a.platform-card[href="cicd-setup-wizard.html?platform=circleci"]')).toContainText('CircleCI');
  await expect(page.locator('a.platform-card[href="cicd-setup-wizard.html?platform=bitbucket"]')).toContainText('Bitbucket');
  await expect(page.locator('a.platform-card[href="cicd-setup-wizard.html?platform=azure"]')).toContainText('Azure DevOps');
});

test('GitLab 60-second page shows config and wizard CTA', async ({ page }) => {
  await page.goto(`${BASE_URL}/tools/gitlab-schema-diff-in-60-seconds.html`);
  await expect(page.locator('h1')).toContainText('GitLab repo');
  await expect(page.locator('a[href="cicd-setup-wizard.html?platform=gitlab"]').first()).toContainText('Generate');
  await expect(page.locator('.code-block')).toContainText('.gitlab-ci.yml');
});

const platform60sPages = [
  { key: 'github', name: 'GitHub Actions', configText: '.github/workflows/schema-diff.yml', h1Text: 'GitHub repo' },
  { key: 'jenkins', name: 'Jenkins', configText: 'Jenkinsfile', h1Text: 'Jenkins pipeline' },
  { key: 'circleci', name: 'CircleCI', configText: '.circleci/config.yml', h1Text: 'CircleCI pipeline' },
  { key: 'bitbucket', name: 'Bitbucket', configText: 'bitbucket-pipelines.yml', h1Text: 'Bitbucket repo' },
  { key: 'azure', name: 'Azure DevOps', configText: 'azure-pipelines.yml', h1Text: 'Azure DevOps repo' },
];

for (const { key, name, configText, h1Text } of platform60sPages) {
  test(`${name} 60-second page shows config and wizard CTA`, async ({ page }) => {
    await page.goto(`${BASE_URL}/tools/${key}-schema-diff-in-60-seconds.html`);
    await expect(page.locator('h1')).toContainText(h1Text);
    await expect(page.locator(`a[href="cicd-setup-wizard.html?platform=${key}"]`).first()).toContainText('Generate');
    await expect(page.locator('.code-block').first()).toContainText(configText);
  });
}

// ───────────────────────────────────────────────
// Team Checkout A/B Test
// ───────────────────────────────────────────────

test('team-buy control variant renders default headline', async ({ page }) => {
  await page.goto(`${BASE_URL}/team-buy.html`);
  await page.evaluate(() => localStorage.setItem('sl_team_buy_ab_variant', 'control'));
  await page.reload();
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('header.hero-buy h1')).toContainText('Catch schema drift before it breaks production.');
  await expect(page.locator('#pricingSection')).toBeVisible();
  await expect(page.locator('#roiSection')).toBeVisible();
});

test('team-buy v1 variant renders urgency headline and promoted ROI', async ({ page }) => {
  await page.goto(`${BASE_URL}/team-buy.html`);
  await page.evaluate(() => localStorage.setItem('sl_team_buy_ab_variant', 'v1'));
  await page.reload();
  await expect(page.locator('body')).toBeVisible();
  await expect(page.locator('header.hero-buy h1')).toContainText('Stop schema incidents before they hit production.');
  const roiBox = await page.locator('#roiSection').boundingBox();
  const pricingBox = await page.locator('#pricingSection').boundingBox();
  expect(roiBox && pricingBox ? roiBox.y < pricingBox.y : true).toBe(true);
  const yearlyClass = await page.locator('.billing-toggle button[data-period="yearly"]').getAttribute('class');
  expect(yearlyClass).toContain('active');
});

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

async function dismissEmailCapture(page) {
  await page.evaluate(() => {
    localStorage.setItem('schemalens_email_capture_dismissed', '1');
    localStorage.setItem('schemalens_diff_count', '99');
  });
}

test('app: load PostgreSQL sample and generate diff + migration', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await dismissEmailCapture(page);
  
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
  await dismissEmailCapture(page);
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

test('app: ?example=staging-vs-production loads sample schemas and auto-runs diff', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html?example=staging-vs-production`);
  await dismissEmailCapture(page);
  await page.waitForTimeout(800);

  // Should auto-run comparison and show results
  await page.waitForSelector('#results.active', { state: 'visible', timeout: 10000 });

  // Summary should show multiple tables changed
  const summary = await page.locator('#summaryBar').textContent();
  expect(summary).toContain('tables');

  // Migration SQL should contain ALTER TABLE or CREATE TABLE for the new order_items table
  await page.click('button[data-tab="migration"]');
  const migration = await page.locator('#migrationContainer').textContent();
  expect(migration).toMatch(/ALTER TABLE|CREATE TABLE/i);
});

test('app: breaking changes detection works for dropped column', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await dismissEmailCapture(page);
  
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

async function runDiff(page) {
  const schemaA = `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT NOT NULL, phone TEXT);`;
  const schemaB = `CREATE TABLE users (id SERIAL PRIMARY KEY, email TEXT NOT NULL);`;

  await page.fill('#schemaA', schemaA);
  await page.fill('#schemaB', schemaB);
  await page.waitForTimeout(200);

  await page.click('#compareBtn');
}

async function enableInterstitial(page) {
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('sl_paywall_timing_variant_v2_winner', 'interstitial');
    localStorage.setItem('schemalens_email_capture_dismissed', '1');
    localStorage.setItem('schemalens_diff_count', '99');
    // The paywall assignment script already ran; override the variant directly
    // so the pre-result interstitial is shown without a reload (which would re-run
    // the global beforeEach init script and reset the variant to control).
    window.SchemaLensPaywallVariantV2 = 'interstitial';
  });
}

test('app: pro preview interstitial appears before diff results', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await enableInterstitial(page);

  await runDiff(page);

  const interstitial = page.locator('#proPreviewInterstitial');
  await expect(interstitial).toHaveClass(/active/);
  await expect(page.locator('#proInterstitialBuyBtn')).toContainText('Lifetime Pro');
  await expect(page.locator('#proInterstitialContinueBtn')).toBeVisible();

  // Results should remain hidden until the user continues
  const visualDiff = page.locator('#visualDiff');
  await expect(visualDiff).not.toContainText('phone');
});

test('app: pro preview interstitial continue button reveals diff results', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await enableInterstitial(page);

  await runDiff(page);
  await page.click('#proInterstitialContinueBtn');

  await expect(page.locator('#proPreviewInterstitial')).not.toHaveClass(/active/);
  await expect(page.locator('#visualDiff')).toContainText('phone');
});

test('app: pro preview interstitial buy button links to Gumroad', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await enableInterstitial(page);

  await runDiff(page);

  const buyBtn = page.locator('#proInterstitialBuyBtn');
  await expect(buyBtn).toBeVisible();
  await expect(buyBtn).toHaveAttribute('href', /gumroad\.com\/l\/schemalens-lifetime/);
});

test('app: retired pro value banner does not render after diff results', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await enableInterstitial(page);

  await runDiff(page);
  await page.click('#proInterstitialContinueBtn');

  const banner = page.locator('#proValueBanner .pro-value-banner');
  await expect(banner).toHaveCount(0);
  const visualBanner = page.locator('#visualDiff > .pro-value-banner.inside-visual');
  await expect(visualBanner).toHaveCount(0);
});

test('app: ORM export generates Prisma and Drizzle schemas', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await dismissEmailCapture(page);
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

test('app: license modal opens and shows Gumroad buy button', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await dismissEmailCapture(page);
  
  const unlockBtn = page.locator('#licenseStatus').first();
  if (await unlockBtn.isVisible().catch(() => false)) {
    await unlockBtn.click();
    const modal = page.locator('#licenseModal').first();
    await expect(modal).toBeVisible();

    // Gumroad buy button should be present and open the overlay
    const buyBtn = modal.locator('#licenseModalBuyBtn').first();
    await expect(buyBtn).toBeVisible();
    await expect(buyBtn).toHaveAttribute('href', /gumroad\.com\/l\/schemalens-lifetime/);
    await expect(buyBtn).toHaveClass(/gumroad-button/);
    
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
  await dismissEmailCapture(page);
  await page.click('text=Load sample (PostgreSQL)');
  await page.waitForTimeout(300);
  await page.evaluate(() => { if (typeof loadSampleB === 'function') loadSampleB(); });
  await page.waitForTimeout(300);
  await page.click('#compareBtn');
  await page.waitForSelector('#results.active', { state: 'visible', timeout: 10000 });
  
  const shareBtn = page.locator('#shareBtn');
  if (await shareBtn.isVisible().catch(() => false)) {
    await shareBtn.click();
    await page.waitForTimeout(600);
    const btnText = await shareBtn.textContent();
    expect(btnText).toMatch(/Copied|URL ready|Share/);
  }
});

test('app: clear button resets editors', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await dismissEmailCapture(page);
  await page.click('text=Load sample (PostgreSQL)');
  await page.waitForTimeout(300);
  
  const clearBtn = page.locator('#clearBtn');
  if (await clearBtn.isVisible().catch(() => false)) {
    await clearBtn.click();
    const schemaA = await page.locator('#schemaA').inputValue();
    expect(schemaA.trim()).toBe('');
  }
});

test('app: CI/CD CTA banner appears after diff is generated', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('schemalens_email_capture_dismissed', '1');
    localStorage.setItem('schemalens_diff_count', '99');
  });

  // Load schemas and run diff
  await page.click('text=Load sample (PostgreSQL)');
  await page.waitForTimeout(300);
  await page.evaluate(() => { if (typeof loadSampleB === 'function') loadSampleB(); });
  await page.waitForTimeout(300);
  await page.click('#compareBtn');
  await page.waitForSelector('#results.active', { state: 'visible', timeout: 10000 });

  // CI/CD CTA should be visible in the visual diff panel
  const cta = page.locator('#cicdCtaBanner');
  await expect(cta).toBeVisible();

  const ctaText = await cta.textContent();
  expect(ctaText).toMatch(/add this check to your PRs/i);

  // Primary CTA should link to GitHub Action or setup wizard
  const primaryLink = cta.locator('a.btn-primary');
  const href = await primaryLink.getAttribute('href');
  expect(href).toMatch(/github-action\.html|tools\/cicd-setup-wizard\.html/);

  // Dismiss button should hide banner and persist
  await cta.locator('.cicd-cta-close').click();
  await expect(cta).toBeHidden();
  const dismissed = await page.evaluate(() => localStorage.getItem('sl_cicd_cta_dismissed_v2'));
  expect(dismissed).toBe('1');
});

test('app: Team drift-alerts CTA appears after diff is generated', async ({ page }) => {
  await page.goto(`${BASE_URL}/app.html`);
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('schemalens_email_capture_dismissed', '1');
    localStorage.setItem('schemalens_diff_count', '99');
  });

  // Load schemas and run diff
  await page.click('text=Load sample (PostgreSQL)');
  await page.waitForTimeout(300);
  await page.evaluate(() => { if (typeof loadSampleB === 'function') loadSampleB(); });
  await page.waitForTimeout(300);
  await page.click('#compareBtn');
  await page.waitForSelector('#results.active', { state: 'visible', timeout: 10000 });

  // Team drift CTA should be visible in the visual diff panel
  const cta = page.locator('#teamDriftCtaBannerInner');
  await expect(cta).toBeVisible();

  const ctaText = await cta.textContent();
  expect(ctaText).toMatch(/drift alert|breaking change|Team workspace/i);

  // Primary CTA should link to Team workspace preview
  const primaryLink = cta.locator('a.btn-primary');
  const href = await primaryLink.getAttribute('href');
  expect(href).toMatch(/team\/workspace-preview\.html/);

  // Dismiss button should hide banner and persist timestamp
  await cta.locator('.team-drift-close').click();
  await expect(cta).toBeHidden();
  const dismissedTs = await page.evaluate(() => localStorage.getItem('sl_team_drift_cta_dismissed'));
  expect(dismissedTs).not.toBeNull();
  expect(Number(dismissedTs)).toBeGreaterThan(0);
});

test('github app landing page shows PR comment preview and switches examples', async ({ page }) => {
  await page.goto(`${BASE_URL}/github-app.html`);
  await expect(page.locator('body')).toBeVisible();

  // Preview section is visible
  const preview = page.locator('.pr-comment-preview');
  await expect(preview).toBeVisible();

  // Safe example is shown by default
  await expect(page.locator('#previewBodySafe')).toBeVisible();
  await expect(page.locator('#previewBodyBreaking')).toBeHidden();

  // Safe example shows low risk and no breaking changes
  const safeText = await page.locator('#previewBodySafe').textContent();
  expect(safeText).toMatch(/Risk Score/i);
  expect(safeText).toMatch(/Low/i);

  // Switch to breaking example
  await page.click('[data-preview="breaking"]');
  await expect(page.locator('#previewBodySafe')).toBeHidden();
  await expect(page.locator('#previewBodyBreaking')).toBeVisible();

  // Breaking example shows high risk and breaking changes
  const breakingText = await page.locator('#previewBodyBreaking').textContent();
  expect(breakingText).toMatch(/Breaking Changes/i);
  expect(breakingText).toMatch(/High/i);

  // Comparison table and FAQ are present
  await expect(page.locator('.comparison-table')).toBeVisible();
  await expect(page.locator('.faq-item')).toHaveCount(5);
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

test('api: POST /api/schema-drift-webhook returns free-tier alert URL without token', async ({ request }) => {
  test.skip(process.env.SKIP_API_TESTS === 'true', 'API tests skipped for static server');
  if (true) test.skip(true, 'Static server does not support POST');
  const response = await request.post(`${BASE_URL}/api/schema-drift-webhook`, {
    data: {
      oldSchema: 'CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255));',
      newSchema: 'CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) NOT NULL);',
      dialect: 'postgres',
      metadata: { repo: 'test/repo', branch: 'main' }
    }
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.success).toBe(true);
  expect(body.tier).toBe('free');
  expect(body.alertId).toBeTruthy();
  expect(body.alertUrl).toContain('/schema-drift-alert.html#');
  expect(body.summary).toHaveProperty('tablesModified');
  expect(body.riskScore).toHaveProperty('score');
});

test('api: POST /api/schema-drift-webhook returns 401 for invalid token', async ({ request }) => {
  test.skip(process.env.SKIP_API_TESTS === 'true', 'API tests skipped for static server');
  if (true) test.skip(true, 'Static server does not support POST');
  const response = await request.post(`${BASE_URL}/api/schema-drift-webhook`, {
    data: { projectToken: 'invalid', oldSchema: 'CREATE TABLE t (id INT);', newSchema: 'CREATE TABLE t (id INT);' }
  });
  expect(response.status()).toBe(401);
});

test('schema drift alert page renders from URL hash', async ({ page }) => {
  const payload = {
    alertId: 'abc123',
    tier: 'free',
    summary: { tablesAdded: 1, tablesRemoved: 0, tablesModified: 0, breakingChangeCount: 0 },
    riskScore: { score: 10, label: 'Low', icon: '🟢' },
    breakingChanges: [],
    migration: 'CREATE TABLE users (id INT PRIMARY KEY);',
    metadata: { repo: 'test/repo', branch: 'main', detectedAt: new Date().toISOString() }
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  await page.goto(`${BASE_URL}/schema-drift-alert.html#${encoded}`);
  await expect(page.locator('text=Alert #abc123')).toBeVisible();
  await expect(page.locator('#tier-badge')).toHaveText('Free');
  await expect(page.locator('text=repo Schema Drift Alert')).toBeVisible();
  await expect(page.locator('text=CREATE TABLE users')).toBeVisible();
});

test('team schema drift dashboard loads with empty state', async ({ page }) => {
  await page.goto(`${BASE_URL}/team/schema-drift-dashboard.html`);
  await expect(page.locator('text=Team Schema Drift Dashboard')).toBeVisible();
  await expect(page.locator('text=No drift alerts yet')).toBeVisible();
});

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
  expect(body.diff.tablesModified).toBeDefined();
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

test('api: POST /api/founding-member returns valid license key', async ({ request }) => {
  test.skip(process.env.SKIP_API_TESTS === 'true', 'API tests skipped for static server');
  const response = await request.post(`${BASE_URL}/api/founding-member`, {
    data: { name: 'Test User', email: 'test@example.com', dialect: 'postgres' },
  });

  if (response.status() === 501) {
    test.skip(true, 'Static server does not support POST');
  }
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('success', true);
  expect(body).toHaveProperty('key');
  expect(body.key).toMatch(/^SL-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
  expect(body).toHaveProperty('activation_url');
  expect(body.activation_url).toContain(body.key);
});

test('api: POST /api/founding-member returns 400 for invalid input', async ({ request }) => {
  test.skip(process.env.SKIP_API_TESTS === 'true', 'API tests skipped for static server');
  const response = await request.post(`${BASE_URL}/api/founding-member`, {
    data: { name: 'A', email: 'invalid', dialect: 'postgres' },
  });

  if (response.status() === 501) {
    test.skip(true, 'Static server does not support POST');
  }
  expect(response.status()).toBe(400);
});

test('api: POST /api/feedback returns success', async ({ request }) => {
  test.skip(process.env.SKIP_API_TESTS === 'true', 'API tests skipped for static server');
  const response = await request.post(`${BASE_URL}/api/feedback`, {
    data: { message: 'Great tool!', category: 'praise', email: 'test@example.com', page_path: '/app.html' },
  });

  if (response.status() === 501) {
    test.skip(true, 'Static server does not support POST');
  }
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('success', true);
});

test('api: POST /api/feedback returns 400 for short message', async ({ request }) => {
  test.skip(process.env.SKIP_API_TESTS === 'true', 'API tests skipped for static server');
  const response = await request.post(`${BASE_URL}/api/feedback`, {
    data: { message: 'Hi' },
  });

  if (response.status() === 501) {
    test.skip(true, 'Static server does not support POST');
  }
  expect(response.status()).toBe(400);
});

test('api: POST /api/subscribe returns success', async ({ request }) => {
  test.skip(process.env.SKIP_API_TESTS === 'true', 'API tests skipped for static server');
  const response = await request.post(`${BASE_URL}/api/subscribe`, {
    data: { email: 'test-e2e@example.com', source: 'e2e_test' },
  });

  if (response.status() === 501) {
    test.skip(true, 'Static server does not support POST');
  }
  expect(response.status()).toBe(200);
  const json = await response.json();
  expect(json.success).toBe(true);
});

test('api: POST /api/subscribe returns 400 for invalid email', async ({ request }) => {
  test.skip(process.env.SKIP_API_TESTS === 'true', 'API tests skipped for static server');
  const response = await request.post(`${BASE_URL}/api/subscribe`, {
    data: { email: 'not-an-email' },
  });

  if (response.status() === 501) {
    test.skip(true, 'Static server does not support POST');
  }
  expect(response.status()).toBe(400);
});

test('api: POST /api/free-diff returns JSON diff', async ({ request }) => {
  test.skip(process.env.SKIP_API_TESTS === 'true', 'API tests skipped for static server');
  const response = await request.post(`${BASE_URL}/api/free-diff`, {
    data: {
      schemaA: 'CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT);',
      schemaB: 'CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT, email TEXT);',
      dialect: 'postgres',
    },
  });

  if (response.status() === 501) {
    test.skip(true, 'Static server does not support POST');
  }
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('summary');
  expect(body).toHaveProperty('riskScore');
  expect(body).toHaveProperty('breakingChanges');
  expect(body).toHaveProperty('migration');
  expect(body).toHaveProperty('rollback');
  expect(body.migration).toContain('ALTER TABLE');
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
