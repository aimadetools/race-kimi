# SchemaLens — SQL Schema Diff & Migration Generator

> Compare SQL schemas. Spot changes instantly. Generate migrations.

[![npm](https://img.shields.io/npm/v/schemalens-cli?label=cli&style=flat-square)](https://www.npmjs.com/package/schemalens-cli)
[![npm](https://img.shields.io/npm/v/schemalens-engine?label=engine&style=flat-square)](https://www.npmjs.com/package/schemalens-engine)
[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue?style=flat-square&logo=visualstudiocode)](https://marketplace.visualstudio.com/items?itemName=schemalens.schemalens)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://schemalens.tech)

**[🌐 Web App](https://schemalens.tech)** · **[📦 CLI](https://schemalens.tech/cli/)** · **[📖 API Docs](https://schemalens.tech/api-guide.html)** · **[💰 Pricing](https://schemalens.tech/pricing.html)**

SchemaLens is a zero-install, browser-based SQL schema diff tool. Paste two `CREATE TABLE` dumps, get an instant visual semantic diff (tables added/removed, columns changed, indexes modified, constraints compared) and generate ready-to-run migration scripts in your dialect.

Also available as a CLI: `npx schemalens-cli diff old.sql new.sql`  
Core engine: `npm install schemalens-engine`

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

---

## Free Developer Tools

SchemaLens includes **49+ free browser-based tools** that reuse the same custom SQL parser:

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
12. [SQL Data Types Reference](https://schemalens.tech/tools/sql-data-types.html)
13. [SQL Index Analyzer](https://schemalens.tech/tools/sql-index-analyzer.html)
14. [ER Diagram Generator](https://schemalens.tech/tools/schema-diagram.html)
15. [Migration Cost Calculator](https://schemalens.tech/tools/migration-cost-calculator.html)
16. [Video Tips](https://schemalens.tech/video-tips.html)
17. [SQL Test Data Generator](https://schemalens.tech/tools/sql-test-data-generator.html)
18. [Schema Mistake Quiz](https://schemalens.tech/tools/schema-mistake-quiz.html)
19. [Badge Generator](https://schemalens.tech/tools/badge-generator.html)
20. [Embed Widget](https://schemalens.tech/tools/embed-generator.html)
21. [Schema Diff Examples](https://schemalens.tech/schema-examples.html)
22. [Safe Migration Checker](https://schemalens.tech/tools/safe-migration-checker.html)
23. [Reserved Words Checker](https://schemalens.tech/tools/sql-reserved-words-checker.html)
24. [SQL to ORM Converter](https://schemalens.tech/tools/sql-to-orm-converter.html)
25. [SQL SELECT Generator](https://schemalens.tech/tools/sql-select-generator.html)
26. [SQL to TypeScript Generator](https://schemalens.tech/tools/sql-to-typescript.html)
27. [SQL Query Explainer](https://schemalens.tech/tools/sql-query-explainer.html)
28. [Connection String Parser](https://schemalens.tech/tools/connection-string-parser.html)
29. [SQL to Python Generator](https://schemalens.tech/tools/sql-to-python.html)
30. [SQL to Go Generator](https://schemalens.tech/tools/sql-to-go.html)
31. [SQL UPDATE Generator](https://schemalens.tech/tools/sql-update-generator.html)
32. [SQL DELETE Generator](https://schemalens.tech/tools/sql-delete-generator.html)
33. [SQL UPSERT & MERGE Generator](https://schemalens.tech/tools/sql-upsert-generator.html)
34. [SQL CASE WHEN Generator](https://schemalens.tech/tools/sql-case-generator.html)
35. [Schema Breaking Change Quiz](https://schemalens.tech/tools/schema-breaking-change-quiz.html)
36. [Database Naming Convention Checker](https://schemalens.tech/tools/naming-convention-checker.html)
37. [SQL IN Clause Builder](https://schemalens.tech/tools/sql-in-list-builder.html)
38. [SQL CREATE INDEX Generator](https://schemalens.tech/tools/sql-create-index-generator.html)
39. [SQL CREATE VIEW Generator](https://schemalens.tech/tools/sql-create-view-generator.html)
40. [SQL DROP Statement Generator](https://schemalens.tech/tools/sql-drop-generator.html)
41. [SQL CHECK Constraint Generator](https://schemalens.tech/tools/sql-check-constraint-generator.html)
42. [SQL Trigger Generator](https://schemalens.tech/tools/sql-trigger-generator.html)
43. [SQL Rename Generator](https://schemalens.tech/tools/sql-rename-generator.html)
44. [SQL Window Function Generator](https://schemalens.tech/tools/sql-window-function-generator.html)
45. [SQL GROUP BY Generator](https://schemalens.tech/tools/sql-group-by-generator.html)
46. [SQL Pagination Generator](https://schemalens.tech/tools/sql-pagination-generator.html)
47. [SQL CTE Generator](https://schemalens.tech/tools/sql-cte-generator.html)
48. [SQL Transaction Generator](https://schemalens.tech/tools/sql-transaction-generator.html)
49. [Schema Design Interview Questions](https://schemalens.tech/tools/schema-design-interviews.html)

[View all tools →](https://schemalens.tech/tools.html)

---

## API & Integrations

- **REST API** — `POST /api/diff` with JSON or Markdown output. [API Docs](https://schemalens.tech/api.html) · [Quick Start Guide](https://schemalens.tech/api-guide.html)
- **Slack Webhooks** — Send diff summaries and breaking change alerts directly to Slack
- **CI/CD Templates** — GitHub Actions, GitLab CI, and Bitbucket Pipelines for schema diff in PRs
- **VS Code Extension** — Diff open SQL files directly from your editor (`vscode-extension/`)
- **Chrome Extension** — Open any `.sql` file on GitHub directly in SchemaLens (`chrome-extension/`)
- **CLI** — `npx schemalens-cli` for headless diffing from your terminal
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
| `blog.html` | 32 SEO blog posts for organic traffic. |
| `open.html` | Open Startup public metrics page. |

---

## 12-Week Roadmap

| Week | Focus | Status |
|------|-------|--------|
| 1 | Landing page & validation | ✅ |
| 2 | Core parser & diff engine | ✅ |
| 3 | UI & free tier | ✅ |
| 4 | Pro tier & Product Hunt launch | ⏳ (blocked on human distribution) |
| 5 | More dialects & polish | ✅ |
| 6 | Team workspace (MVP) | ✅ |
| 7 | SEO & content engine | ✅ (32 blog posts, 10 tools) |
| 8 | CI/CD integration | ✅ |
| 9 | Advanced migrations | ✅ (risk score, rename detection) |
| 10 | API & integrations | ✅ (REST API, Slack, VS Code) |
| 11 | Marketing & partnerships | ⏳ |
| 12 | Review & scale | ⏳ |

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
- **Free tool uses:** Growing via 36+ micro-tools
- **Pro customers:** 0 (pre-launch)
- **MRR:** $0 (pre-launch)
- **Blog posts:** 32 published
- **E2E tests:** 94 passing

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
