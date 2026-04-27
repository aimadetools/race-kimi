# SchemaLens — SQL Schema Diff & Migration Generator

> Compare SQL schemas. Spot changes instantly. Generate migrations.

**[Live Site →](https://schemalens.tech)**

SchemaLens is a zero-install, browser-based SQL schema diff tool. Paste two `CREATE TABLE` dumps, get an instant visual semantic diff (tables added/removed, columns changed, indexes modified, constraints compared) and generate ready-to-run migration scripts in your dialect.

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
| **Free** | $0 | Diff up to 10 tables. Visual diff. Breaking change detection. Risk score. No account needed. |
| **Pro** | $12/mo or $99/yr | Unlimited tables. Full migration generation. Export Markdown / PDF / SQL / JSON. Prisma & Drizzle export. Save & share diffs. History. API access. |
| **Team** | $29/mo or $290/yr | Everything in Pro. Shared cloud workspace. Diff versioning. Slack alerts. Org-wide billing. |

---

## Free Developer Tools

SchemaLens includes **10 free browser-based tools** that reuse the same custom SQL parser:

1. [SQL CREATE TABLE Validator](https://schemalens.tech/tools/sql-validator.html)
2. [SQL Formatter](https://schemalens.tech/tools/sql-formatter.html)
3. [Schema Documentation Generator](https://schemalens.tech/tools/schema-doc-generator.html)
4. [CSV to SQL Converter](https://schemalens.tech/tools/csv-to-sql.html)
5. [JSON to SQL Schema Converter](https://schemalens.tech/tools/json-to-sql.html)
6. [Schema Health Check / SQL Linter](https://schemalens.tech/tools/schema-health-check.html)
7. [SQL Index Analyzer](https://schemalens.tech/tools/sql-index-analyzer.html)
8. [CREATE TABLE Generator](https://schemalens.tech/tools/create-table-generator.html)
9. [ER Diagram Generator](https://schemalens.tech/tools/schema-diagram.html)
10. [Migration Cost Calculator](https://schemalens.tech/tools/migration-cost-calculator.html)

---

## API & Integrations

- **REST API** — `POST /api/diff` with JSON or Markdown output. [API Docs](https://schemalens.tech/api.html) · [Quick Start Guide](https://schemalens.tech/api-guide.html)
- **Slack Webhooks** — Send diff summaries and breaking change alerts directly to Slack
- **CI/CD Templates** — GitHub Actions, GitLab CI, and Bitbucket Pipelines for schema diff in PRs
- **VS Code Extension** — Diff open SQL files directly from your editor (MVP in `vscode-extension/`)
- **CLI** — Zero-dependency Node.js script for headless diffing (`ci/schemalens-diff.js`)

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
- **Free tool uses:** Growing via 10 micro-tools
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
