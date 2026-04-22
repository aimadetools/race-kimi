const { test, expect } = require('@playwright/test');

const sampleSmall = `CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255) NOT NULL);`;

const sampleMedium = `
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255),
  body TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_posts_user ON posts(user_id);
`;

const sampleLarge = Array(20).fill(0).map((_, i) => `
CREATE TABLE table_${i} (
  id SERIAL PRIMARY KEY,
  col_a VARCHAR(255),
  col_b INTEGER DEFAULT 0,
  col_c TIMESTAMP DEFAULT NOW(),
  col_d BOOLEAN DEFAULT false,
  col_e TEXT,
  FOREIGN KEY (col_a) REFERENCES table_0(col_a)
);
CREATE INDEX idx_table_${i}_a ON table_${i}(col_a);
CREATE INDEX idx_table_${i}_b ON table_${i}(col_b);
`).join('\n');

async function measureParser(page, sqlA, sqlB) {
  return page.evaluate(async ({ sqlA, sqlB }) => {
    const start = performance.now();
    const schemaA = parseSQL(sqlA, 'postgres');
    const schemaB = parseSQL(sqlB, 'postgres');
    const diff = diffSchemas(schemaA, schemaB);
    const migration = generateMigration(diff, 'postgres');
    const end = performance.now();
    return {
      parseTime: end - start,
      tablesA: Object.keys(schemaA.tables).length,
      tablesB: Object.keys(schemaB.tables).length,
    };
  }, { sqlA, sqlB });
}

test.describe('Performance Audit', () => {
  test('page load metrics', async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error('Console error:', msg.text());
      }
    });

    const navigationStart = Date.now();
    await page.goto('/app.html');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - navigationStart;

    const perf = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
        loadComplete: nav.loadEventEnd - nav.startTime,
        transferSize: nav.transferSize,
        encodedBodySize: nav.encodedBodySize,
        decodedBodySize: nav.decodedBodySize,
      };
    });

    console.log('\n=== Page Load Metrics ===');
    console.log(`Navigation time: ${loadTime}ms`);
    console.log(`DOMContentLoaded: ${perf.domContentLoaded.toFixed(1)}ms`);
    console.log(`Load complete: ${perf.loadComplete.toFixed(1)}ms`);
    console.log(`Transfer size: ${(perf.transferSize / 1024).toFixed(1)} KB`);
    console.log(`Encoded body size: ${(perf.encodedBodySize / 1024).toFixed(1)} KB`);
    console.log(`Decoded body size: ${(perf.decodedBodySize / 1024).toFixed(1)} KB`);

    expect(perf.domContentLoaded).toBeLessThan(2000);
    expect(perf.loadComplete).toBeLessThan(3000);
  });

  test('parser speed - small schema', async ({ page }) => {
    await page.goto('/app.html');
    await page.waitForLoadState('networkidle');

    const result = await measureParser(page, sampleSmall, sampleSmall + '\nALTER TABLE users ADD COLUMN phone VARCHAR(20);');
    console.log('\n=== Parser Speed - Small Schema ===');
    console.log(`Tables: ${result.tablesA} → ${result.tablesB}`);
    console.log(`Total time: ${result.parseTime.toFixed(2)}ms`);
    expect(result.parseTime).toBeLessThan(50);
  });

  test('parser speed - medium schema', async ({ page }) => {
    await page.goto('/app.html');
    await page.waitForLoadState('networkidle');

    const modified = sampleMedium.replace('published BOOLEAN DEFAULT false,', 'published BOOLEAN DEFAULT false,\n  slug VARCHAR(100) UNIQUE,');
    const result = await measureParser(page, sampleMedium, modified);
    console.log('\n=== Parser Speed - Medium Schema ===');
    console.log(`Tables: ${result.tablesA} → ${result.tablesB}`);
    console.log(`Total time: ${result.parseTime.toFixed(2)}ms`);
    expect(result.parseTime).toBeLessThan(100);
  });

  test('parser speed - large schema', async ({ page }) => {
    await page.goto('/app.html');
    await page.waitForLoadState('networkidle');

    const modified = sampleLarge.replace('col_a VARCHAR(255),', 'col_a VARCHAR(255),\n  col_f JSONB,');
    const result = await measureParser(page, sampleLarge, modified);
    console.log('\n=== Parser Speed - Large Schema ===');
    console.log(`Tables: ${result.tablesA} → ${result.tablesB}`);
    console.log(`Total time: ${result.parseTime.toFixed(2)}ms`);
    expect(result.parseTime).toBeLessThan(500);
  });

  test('memory usage', async ({ page }) => {
    await page.goto('/app.html');
    await page.waitForLoadState('networkidle');

    const before = await page.evaluate(() => {
      if (performance.memory) {
        return performance.memory.usedJSHeapSize;
      }
      return 0;
    });

    // Run multiple diffs to stress test
    for (let i = 0; i < 10; i++) {
      await measureParser(page, sampleMedium, sampleMedium + `\nALTER TABLE users ADD COLUMN temp_${i} VARCHAR(20);`);
    }

    const after = await page.evaluate(() => {
      if (performance.memory) {
        return performance.memory.usedJSHeapSize;
      }
      return 0;
    });

    if (before && after) {
      const diff = (after - before) / 1024 / 1024;
      console.log('\n=== Memory Usage ===');
      console.log(`Before: ${(before / 1024 / 1024).toFixed(1)} MB`);
      console.log(`After: ${(after / 1024 / 1024).toFixed(1)} MB`);
      console.log(`Delta: ${diff.toFixed(1)} MB`);
    } else {
      console.log('\n=== Memory Usage ===');
      console.log('performance.memory not available in this browser');
    }
  });
});
