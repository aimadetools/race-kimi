# SchemaLens — SQL Schema Diff & Migration Generator

> Compare SQL schemas. Spot changes instantly. Generate migrations.

[![npm](https://img.shields.io/npm/v/schemalens-cli?label=cli&style=flat-square)](https://www.npmjs.com/package/schemalens-cli)\n[![npm](https://img.shields.io/npm/v/schema-diff?label=schema-diff&style=flat-square&color=cb3837)](https://www.npmjs.com/package/schema-diff)
[![npm](https://img.shields.io/npm/v/schemalens-engine?label=engine&style=flat-square)](https://www.npmjs.com/package/schemalens-engine)
[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue?style=flat-square&logo=visualstudiocode)](https://marketplace.visualstudio.com/items?itemName=schemalens.schemalens)
[![Chrome Web Store](https://img.shields.io/badge/Chrome-Web%20Store-4285F4?style=flat-square&logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/jbigkphlkggibnnbfdlkhcjpedjchgde)
[![GitHub Action](https://img.shields.io/badge/GitHub%20Action-Marketplace-2088FF?style=flat-square&logo=githubactions&logoColor=white)](https://github.com/aimadetools/race-kimi)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://schemalens.tech)

**[🌐 Web App](https://schemalens.tech)** · **[📦 CLI](https://schemalens.tech/cli/)** · **[📦 schema-diff](https://schemalens.tech/schema-diff.html)** · **[⚡ GitHub Action](https://schemalens.tech/github-action.html)** · **[📖 API Docs](https://schemalens.tech/api-guide.html)** · **[💰 Pricing](https://schemalens.tech/pricing.html)**

SchemaLens is a zero-install, browser-based SQL schema diff tool. Paste two `CREATE TABLE` dumps, get an instant visual semantic diff (tables added/removed, columns changed, indexes modified, constraints compared) and generate ready-to-run migration scripts in your dialect.

Also available as a CLI:\n- `npx schemalens-cli diff old.sql new.sql` — full-featured CLI\n- `npx schema-diff old.sql new.sql` — zero-config CLI with CI-native output (GitHub Actions, GitLab CI, JUnit XML)
Core engine: `npm install schemalens-engine`  
VS Code Extension: [Install from Marketplace](https://marketplace.visualstudio.com/items?itemName=schemalens.schemalens)  
Chrome Extension: [Install from Web Store](https://chromewebstore.google.com/detail/jbigkphlkggibnnbfdlkhcjpedjchgde)  
Bookmarklet: [Get Bookmarklet](https://schemalens.tech/tools/bookmarklet.html) — diff any SQL you see on the web

Built for the [$100 AI Startup Race](https://100aistartup.com) — a 12-week challenge to build a revenue-generating startup on a $90 budget.

---

## What It Does

Paste two `CREATE TABLE` dumps. SchemaLens shows you:
- Which tables were added or removed
- Which columns changed type, nullability, or defaults
- Which indexes were added or dropped
- Which constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK) changed
- PostgreSQL trigger, view, and function differences
- A **Schema Change Risk Score** (0-100) based on breaking change severity
- A ready-to-run migration script in your SQL dialect
- ORM exports: **Prisma schema** and **Drizzle TypeScript**

All parsing happens **entirely in your browser** — your schema data never touches a server.

---

## GitHub Action

Add schema diff checks to your CI/CD pipeline in 60 seconds. The [SchemaLens GitHub Action](https://schemalens.tech/github-action.html) compares SQL schemas on every pull request and posts a diff summary as a PR comment.

```yaml
- uses: aimadetools/race-kimi@main
  with:
    old-schema-path: ./schema/base.sql
    new-schema-path: ./schema/current.sql
    dialect: postgres
    post-comment: true
    github-token: ${{ secrets.GITHUB_TOKEN }}
    fail-on-breaking: true
```

- **Free tier** — no license key required
- **Breaking change detection** — fail the build before bad migrations reach production
- **PR comments** — formatted diff summary posted automatically
- **5 dialects** — PostgreSQL, MySQL, SQLite, SQL Server, Oracle

---

## Supported Dialects

| Dialect | Diff | Migration Generation | Breaking Changes |
|---------|------|---------------------|------------------|
| PostgreSQL | ✅ | ✅ | ✅ |
| MySQL / MariaDB | ✅ | ✅ | ✅ |
| SQLite | ✅ | ✅ (with limitations) | ✅ |
| SQL Server | ✅ | ✅ | ✅ |
| Oracle | ✅ | ✅ | ✅ |

---

## Pricing

| Plan | Price | What's Included |
|------|-------|-----------------|
| **Free** | $0 | Diff up to 15 tables. Visual diff. Breaking change detection. Risk score. No account needed. |
| **Pro** | $39 lifetime | Unlimited tables. Full migration generation. Export Markdown / PDF / SQL / JSON. Prisma & Drizzle export. Save & share diffs. History. API access. All future updates included. |
| **Team** | $29/mo or $290/yr | Everything in Pro. Shared cloud workspace. Diff versioning. Slack alerts. Org-wide billing. |

**Try Pro free for 24 hours** — no email, no credit card, no signup. Click "Try Pro Free" when you hit the 15-table limit in the app.

**Or share to unlock Pro for 7 days** — one-click share on X/Twitter or LinkedIn from the app paywall. No verification, instant unlock.

**Free Lifetime Pro for content creators** — Write a blog post, record a video, or publish a tutorial about SchemaLens and get a free Lifetime Pro license. [Apply here →](https://schemalens.tech/ambassador.html)

---

## Free Developer Tools

SchemaLens includes **73+ free browser-based tools** that reuse the same custom SQL parser:

1. [SQL CREATE TABLE Validator](https://schemalens.tech/tools/sql-validator.html)
2. [SQL Formatter](https://schemalens.tech/tools/sql-formatter.html)
3. [Schema Diff](https://schemalens.tech/app.html)
4. [Schema Documentation Generator](https://schemalens.tech/tools/schema-doc-generator.html)
5. [CSV to SQL Converter](https://schemalens.tech/tools/csv-to-sql.html)
6. [JSON to SQL Schema Converter](https://schemalens.tech/tools/json-to-sql.html)
7. [CREATE TABLE Generator](https://schemalens.tech/tools/create-table-generator.html)
8. [Schema Templates](https://schemalens.tech/schema-templates.html)
9. [SQL INSERT Generator](https://schemalens.tech/tools/sql-insert-generator.html)
10. [SQL JOIN Visualizer](https://schemalens.tech/tools/sql-join-visualizer.html)
11. [Schema Health Check / SQL Linter](https://schemalens.tech/tools/schema-health-check.html)
12. [Schema Normalization Checker](https://schemalens.tech/tools/schema-normalization-checker.html) — 1NF/2NF/3NF analysis
13. [SQL Data Types Reference](https://schemalens.tech/tools/sql-data-types.html)
14. [SQL Index Analyzer](https://schemalens.tech/tools/sql-index-analyzer.html)
15. [ER Diagram Generator](https://schemalens.tech/tools/schema-diagram.html)
16. [Migration Cost Calculator](https://schemalens.tech/tools/migration-cost-calculator.html)
17. [Video Tips](https://schemalens.tech/video-tips.html)
18. [SQL Test Data Generator](https://schemalens.tech/tools/sql-test-data-generator.html)
19. [Schema Mistake Quiz](https://schemalens.tech/tools/schema-mistake-quiz.html)
20. [Schema Guessr](https://schemalens.tech/tools/schema-guessr.html) — guess the app from its database schema
21. [Badge Generator](https://schemalens.tech/tools/badge-generator.html)
22. [Embed Widget](https://schemalens.tech/tools/embed-generator.html)
23. [Schema Diff Examples](https://schemalens.tech/schema-examples.html)
24. [Git Branch Schema Diff](https://schemalens.tech/tools/git-branch-schema-diff.html) — diff schemas between Git branches, tags, or commits
25. [1-Click Schema Diff](https://schemalens.tech/diff.html) — ultra-minimal ad landing page for instant diffs
26. [Safe Migration Checker](https://schemalens.tech/tools/safe-migration-checker.html)
27. [Reserved Words Checker](https://schemalens.tech/tools/sql-reserved-words-checker.html)
28. [SQL to ORM Converter](https://schemalens.tech/tools/sql-to-orm-converter.html)
27. [SQL SELECT Generator](https://schemalens.tech/tools/sql-select-generator.html)
28. [SQL to TypeScript Generator](https://schemalens.tech/tools/sql-to-typescript.html)
29. [SQL Query Explainer](https://schemalens.tech/tools/sql-query-explainer.html)
30. [Connection String Parser](https://schemalens.tech/tools/connection-string-parser.html)
31. [SQL to Python Generator](https://schemalens.tech/tools/sql-to-python.html)
32. [SQL to Go Generator](https://schemalens.tech/tools/sql-to-go.html)
33. [SQL to Java Generator](https://schemalens.tech/tools/sql-to-java.html)
34. [SQL to Rust Generator](https://schemalens.tech/tools/sql-to-rust.html)
35. [SQL UPDATE Generator](https://schemalens.tech/tools/sql-update-generator.html)
36. [SQL DELETE Generator](https://schemalens.tech/tools/sql-delete-generator.html)
37. [SQL UPSERT & MERGE Generator](https://schemalens.tech/tools/sql-upsert-generator.html)
38. [SQL CASE WHEN Generator](https://schemalens.tech/tools/sql-case-generator.html)
39. [Schema Breaking Change Quiz](https://schemalens.tech/tools/schema-breaking-change-quiz.html)
40. [Database Naming Convention Checker](https://schemalens.tech/tools/naming-convention-checker.html)
41. [SQL IN Clause Builder](https://schemalens.tech/tools/sql-in-list-builder.html)
42. [SQL CREATE INDEX Generator](https://schemalens.tech/tools/sql-create-index-generator.html)
43. [SQL CREATE VIEW Generator](https://schemalens.tech/tools/sql-create-view-generator.html)
44. [SQL DROP Statement Generator](https://schemalens.tech/tools/sql-drop-generator.html)
45. [SQL CHECK Constraint Generator](https://schemalens.tech/tools/sql-check-constraint-generator.html)
46. [SQL Trigger Generator](https://schemalens.tech/tools/sql-trigger-generator.html)
47. [SQL Rename Generator](https://schemalens.tech/tools/sql-rename-generator.html)
48. [SQL Window Function Generator](https://schemalens.tech/tools/sql-window-function-generator.html)
49. [SQL GROUP BY Generator](https://schemalens.tech/tools/sql-group-by-generator.html)
50. [SQL Pagination Generator](https://schemalens.tech/tools/sql-pagination-generator.html)
51. [SQL CTE Generator](https://schemalens.tech/tools/sql-cte-generator.html)
52. [SQL Transaction Generator](https://schemalens.tech/tools/sql-transaction-generator.html)
53. [Schema Design Interview Questions](https://schemalens.tech/tools/schema-design-interviews.html)
54. [SQL to Mermaid ERD Converter](https://schemalens.tech/tools/sql-to-mermaid-erd.html)
55. [SQL to DBML Converter](https://schemalens.tech/tools/sql-to-dbml.html)
56. [SQL to PlantUML ERD Converter](https://schemalens.tech/tools/sql-to-plantuml.html)
57. [SQL to OpenAPI / JSON Schema Converter](https://schemalens.tech/tools/sql-to-openapi.html)
58. [Famous Database Schemas](https://schemalens.tech/famous-database-schemas.html) — Real-world SQL designs from Twitter, Uber, E-commerce, Chat, and more with ERD diagrams
59. [Database Schema Design Patterns](https://schemalens.tech/database-schema-design-patterns.html) — 10 production-ready SQL patterns with before/after diffs
60. [Database Schema Anti-Patterns](https://schemalens.tech/database-schema-anti-patterns.html) — 10 common schema mistakes and how to fix them
61. [GitHub Action Setup Wizard](https://schemalens.tech/tools/github-action-setup.html)
62. [SchemaLens Bookmarklet](https://schemalens.tech/tools/bookmarklet.html) — diff any SQL on the web in one click
63. [SQL to C# Generator](https://schemalens.tech/tools/sql-to-csharp.html)
64. [Schema Badge API](https://schemalens.tech/tools/schema-badge.html)
65. [Database Schema Export Guide](https://schemalens.tech/tools/db-schema-export-guide.html) — Step-by-step export instructions for DataGrip, DBeaver, TablePlus, pgAdmin, MySQL Workbench, SSMS, and SQLite Browser
66. [Schema Diff Report Generator](https://schemalens.tech/tools/schema-diff-report.html) — Generate branded PDF reports from schema diffs for Jira, Linear, and PRs
67. [GitHub PR Schema Diff](https://schemalens.tech/tools/github-pr-diff.html) — Paste any public GitHub PR URL and instantly review the schema changes
68. [Schema Diff Speed Challenge](https://schemalens.tech/tools/schema-diff-speed-challenge.html) — Race the clock to spot schema changes manually, then see how SchemaLens finds them instantly
69. [SQL Schema Roast](https://schemalens.tech/tools/schema-roast.html) — Get your database schema roasted with humorous but genuinely helpful feedback. Shareable roast cards
70. [Schema Code Review](https://schemalens.tech/tools/schema-code-review.html) — Get a senior DBA-style review with inline PR comments, severity scores, and fix suggestions
71. [SQL Dialect Translator](https://schemalens.tech/tools/sql-dialect-translator.html) — Convert CREATE TABLE statements between PostgreSQL, MySQL, SQLite, SQL Server, and Oracle with type mapping
71. [SQL Test Data Generator](https://schemalens.tech/tools/sql-test-data-generator.html) — Generate realistic INSERT statements from CREATE TABLE definitions with smart column-name detection
72. [SQL Data Masking Generator](https://schemalens.tech/tools/sql-data-masker.html) — Generate SQL UPDATE scripts to mask PII and anonymize sensitive columns for GDPR-compliant dev databases

### Migration Guides
- [MySQL to PostgreSQL Migration Guide](https://schemalens.tech/mysql-to-postgresql-migration.html) — Step-by-step schema and data migration
- [SQL Server to PostgreSQL Migration Guide](https://schemalens.tech/sql-server-to-postgresql-migration.html) — Enterprise guide with T-SQL translation and Azure DMS

[View all 73+ tools →](https://schemalens.tech/tools.html)

---

## API & Integrations

- **GitHub Action** — Free schema diff in CI/CD with automatic PR comments. [Setup Guide](https://schemalens.tech/github-action.html) · [Setup Wizard](https://schemalens.tech/tools/github-action-setup.html)
- **REST API** — `POST /api/diff` with JSON or Markdown output. [API Docs](https://schemalens.tech/api.html) · [Quick Start Guide](https://schemalens.tech/api-guide.html)
- **Slack Webhooks** — Send diff summaries and breaking change alerts directly to Slack
- **CI/CD Templates** — GitLab CI and Bitbucket Pipelines for schema diff in PRs
- **VS Code Extension** — Diff open SQL files directly from your editor (`vscode-extension/`)
- **Chrome Extension** — Diff SQL files on GitHub blob pages and PR "Files changed" pages with one click ([Web Store](https://chromewebstore.google.com/detail/jbigkphlkggibnnbfdlkhcjpedjchgde) · `chrome-extension/`)
- **Bookmarklet** — Drag to your bookmarks bar. Click on any page with SQL to instantly open it in SchemaLens. No install required. ([Get it](https://schemalens.tech/tools/bookmarklet.html))
- **schema-diff CLI** — `npx schema-diff old.sql new.sql` — zero-config CLI with GitHub Actions, GitLab CI, and JUnit XML output. [Learn more](https://schemalens.tech/schema-diff.html)\n- **CLI** — `npx schemalens-cli` for headless diffing from your terminal
- **Open Source Engine** — `npm install schemalens-engine` to embed the diff engine in your own tools ([docs](https://schemalens.tech/open-source.html))

---

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (zero frameworks, ~135KB gzipped)
- **Parser:** Custom lightweight SQL parser built from scratch in vanilla JS
- **Diff Engine:** Custom semantic diff (table, column, index, constraint, trigger, view, function levels)
- **Hosting:** Vercel (free tier)
- **Backend:** Vercel Serverless Functions + Supabase (free tier)
- **Payments:** Gumroad (license keys, client-side validation)
- **Auth:** Supabase magic-link (no passwords)

---

## Project Files

| File | Description |
|------|-------------|
| `DECISIONS.md` | Research and evaluation of 20+ micro-SaaS ideas. Why SchemaLens won. |
| `IDENTITY.md` | Startup identity: name, tagline, pricing, acquisition plan, 12-week roadmap. |
| `BACKLOG.md` | Prioritized task list for all 12 weeks (P0/P1/P2). |
| `PROGRESS.md` | Day-by-day activity log, time tracking, and budget status. |
| `index.html` | Main landing page. |
| `app.html` | The schema diff tool. |
| `pricing.html` | Detailed pricing tiers and FAQ. |
| `blog.html` | 33+ SEO blog posts for organic traffic. |
| `open.html` | Open Startup public metrics page. |

---

## 12-Week Roadmap

| Week | Focus | Status |
|------|-------|--------|
| 1 | Landing page & validation | ✅ |
| 2 | Core parser & diff engine | ✅ |
| 3 | UI & free tier | ✅ |
| 4 | Pro tier & Product Hunt launch | ✅ (launched May 16) |
| 5 | More dialects & polish | ✅ |
| 6 | Team workspace (MVP) | ✅ |
| 7 | SEO & content engine | ✅ (33+ blog posts, 73+ tools) |
| 8 | CI/CD integration | ✅ |
| 9 | Advanced migrations | ✅ (risk score, rename detection) |
| 10 | API & integrations | ✅ (REST API, Slack, VS Code) |
| 11 | Marketing & partnerships | 🔄 (newsletter sponsorships, directory submissions) |
| 12 | Review & scale | 🔄 (final optimization sprint) |

---

## Budget

- **Total:** $90
- **Spent:** $5 (domain: schemalens.tech)
- **Remaining:** $85
- **Hosting:** $0 (Vercel + Supabase free tiers)

---

## Open Metrics

We track everything publicly. Follow our journey on the [Open Startup page](https://schemalens.tech/open.html):
- **Traffic:** Organic SEO (no paid ads)
- **Free tool uses:** Growing via 73+ micro-tools
- **Pro customers:** 0 (post-PH, iterating on distribution)
- **MRR:** $0
- **Blog posts:** 33+ published
- **E2E tests:** 127 passing

---

## Local Development

```bash
# Clone the repo
git clone <repo-url>
cd schemalens

# Serve locally (any static server)
npx serve .
# or
python3 -m http.server 8000
```

Deploy to Vercel:
```bash
npm i -g vercel
vercel --prod
```

Run tests:
```bash
node test-all.js        # Unit tests (parser/diff engine)
npx playwright test      # E2E tests (Chromium + Firefox)
```

---

## License

MIT — because we're developers building for developers.

---

*Built with zero frameworks, zero backends (for the core tool), and a whole lot of stubbornness.*
