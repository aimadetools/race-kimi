const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));

const slugToDate = {
  'compare-database-schemas-before-deploying.html': '2026-04-20',
  'hidden-cost-of-manual-migration-scripts.html': '2026-04-20',
  'postgresql-vs-mysql-schema-migration-gotchas.html': '2026-04-20',
  'how-we-parse-sql-in-the-browser.html': '2026-04-20',
  'schema-review-checklist.html': '2026-04-20',
  'sql-server-schema-migrations.html': '2026-04-20',
  'dangerous-schema-changes.html': '2026-04-20',
  'how-to-generate-alter-table-scripts-automatically.html': '2026-04-21',
  'schemalens-in-your-ci-cd-pipeline.html': '2026-04-21',
  'how-to-format-sql-for-readable-code-reviews.html': '2026-04-21',
  '3-free-tools-for-database-schema-management.html': '2026-04-21',
  'how-to-document-your-database-schema-in-30-seconds.html': '2026-04-21',
  'convert-json-to-sql-schema-in-seconds.html': '2026-04-21',
  'how-to-catch-schema-drift.html': '2026-04-22',
  'complete-guide-to-database-indexing-for-schema-changes.html': '2026-04-22',
  'sql-create-table-best-practices-for-production.html': '2026-04-23',
  'how-to-generate-er-diagrams-from-sql-automatically.html': '2026-04-25',
  'migrate-mysql-to-postgresql-without-data-loss.html': '2026-04-23',
  'sqlite-vs-postgresql-when-to-switch.html': '2026-04-23',
  'database-schema-versioning-best-practices.html': '2026-04-24',
  'from-spreadsheet-to-database-csv-migration-checklist.html': '2026-04-24',
  'how-to-design-a-schema-that-scales.html': '2026-04-24',
  'oracle-vs-postgresql-schema-migration-differences.html': '2026-04-24',
  'automating-schema-reviews-with-webhooks.html': '2026-04-22',
  'state-of-schema-migrations-2026.html': '2026-04-22',
  'why-your-team-needs-a-schema-review-process.html': '2026-04-22',
  'schemalens-vs-cli-tools-when-to-use-each.html': '2026-04-24',
  'schemalens-vs-liquibase-diff-tool-vs-migration-framework.html': '2026-04-25',
  'sql-index-analyzer-practical-guide.html': '2026-04-24',
  'generate-create-table-statements-visually.html': '2026-04-23',
  'oracle-schema-migrations-practical-guide.html': '2026-04-23',
  'convert-csv-to-sql-in-seconds.html': '2026-04-21',
  'the-real-cost-of-manual-database-migrations.html': '2026-04-27',
};

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : 'SchemaLens Blog';
}

function extractDescription(html) {
  const m = html.match(/<meta name="description" content="([^"]*)"/i);
  return m ? m[1].trim() : 'SchemaLens — compare SQL schemas, generate migrations, and diff database schemas in your browser.';
}

let updated = 0;
let skipped = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  if (html.includes('"@type": "Article"')) {
    skipped++;
    continue;
  }

  const title = extractTitle(html);
  const description = extractDescription(html);
  const date = slugToDate[file] || '2026-04-20';
  const url = `https://schemalens.tech/blog/${file}`;

  const schema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": ${JSON.stringify(title)},
  "description": ${JSON.stringify(description)},
  "url": ${JSON.stringify(url)},
  "datePublished": ${JSON.stringify(date)},
  "dateModified": ${JSON.stringify(date)},
  "author": {
    "@type": "Organization",
    "name": "SchemaLens",
    "url": "https://schemalens.tech"
  },
  "publisher": {
    "@type": "Organization",
    "name": "SchemaLens",
    "logo": {
      "@type": "ImageObject",
      "url": "https://schemalens.tech/favicon.svg"
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": ${JSON.stringify(url)}
  }
}
</script>
  <link rel="stylesheet" href="../style.css">`;

  const newHtml = html.replace(/\s*<link rel="stylesheet" href="\.\.\/style\.css">/, '\n  ' + schema);

  if (newHtml === html) {
    console.log(`WARN: Could not find style.css link in ${file}`);
    continue;
  }

  fs.writeFileSync(filePath, newHtml, 'utf8');
  updated++;
  console.log(`Updated: ${file}`);
}

console.log(`\nDone. Updated: ${updated}, Skipped (already had schema): ${skipped}`);
