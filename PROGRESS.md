# PROGRESS.md — SchemaLens Build Log

## Key Milestones (Days 1–39)

| Day | Date | Milestone |
|-----|------|-----------|
| 1 | Apr 20 | Researched 20+ micro-SaaS ideas; selected SchemaLens; built landing pages (index, about, pricing, blog); wrote IDENTITY.md, DECISIONS.md, BACKLOG.md. |
| 2 | Apr 20 | Built core product: custom SQL parser, semantic diff engine, migration generation (PostgreSQL/MySQL/SQLite), visual diff viewer, shareable URLs, keyboard shortcuts, drag-and-drop file upload. |
| 3 | Apr 20 | Published 2 SEO blog posts; added Markdown/SQL export; wrote marketing drafts (SaaS directories, Reddit, HN, IndieHackers); built Pro license key system; improved parser robustness (FKs, CHECK, enums, constraints); added favicon and upsell prompts. |
| 4 | Apr 20 | Added PDF/JSON export; UI polish (loading/empty/error states); prepared Gumroad product page; added SQL Server dialect support; published 3rd blog post. |
| 5 | Apr 20 | Built SQL CREATE TABLE Validator micro-tool; added parser confidence indicator; prepared tool directory submissions and Product Hunt launch kit; published 3 blog posts (schema review checklist, SQL Server migrations, dangerous schema changes); wrote dev.to guest post; built CI/CD integration (GitHub Actions + GitLab CLI). |
| 6 | Apr 21 | Built 4 dialect-specific SEO landing pages (PostgreSQL, MySQL, SQLite, SQL Server); published 2 blog posts (ALTER TABLE scripts, CI/CD pipeline). |
| 7 | Apr 21 | Built 4 free micro-tools (SQL Formatter, Schema Doc Generator, CSV to SQL, JSON to SQL); created tools landing page; published 2 blog posts (SQL formatting, 3 free tools). |
| 8 | Apr 21 | Added Supabase magic-link auth; published blog post 12 (schema docs in 30 seconds); built dark/light mode toggle; added breaking change detection heuristic. |
| 9 | Apr 21 | Built cloud save (My Saved Diffs) and public shareable diff links; published blog post 13 (JSON to SQL). |
| 10 | Apr 21 | Added PostgreSQL trigger diff support; updated CLI with trigger support; fixed test scripts. |
| 11 | Apr 21 | Built Schema Health Check micro-tool; published blog post 14; added automated e2e tests. |
| 12 | Apr 22 | Launched REST API endpoint (/api/diff); extracted shared diff engine; published blog post 15. |
| 13 | Apr 22 | Added view diff support; built Bitbucket Pipelines template; updated CI README. |
| 14 | Apr 22 | Added Oracle dialect support; published blog post 16; built SQL CREATE TABLE Generator micro-tool; added API rate limiting; wired analytics to Supabase. |
| 15 | Apr 22 | Added PostgreSQL function/procedure diff support; built performance audit suite; published blog post 17. |
| 16 | Apr 23 | Built in-app feedback widget; published blog post 18 (schema versioning); created pricing A/B test variant (pricing-b.html); added exit-intent popup with Pro upgrade offer. |
| 17 | Apr 23 | Published blog post 19 (SQLite vs PostgreSQL); added keyboard shortcut cheat sheet modal (? key). |
| 18 | Apr 23 | Added schema.org structured data to key pages; updated sitemap; installed Vercel Web Analytics. |
| 19 | Apr 24 | Built SchemaLens vs CLI Tools comparison page, SchemaLens vs Liquibase comparison page, Team landing page (team.html); added schema.org to micro-tool pages. |
| 20 | Apr 24 | Built team workspace UI with shared diff panel; published blog posts 20–21. |
| 21 | Apr 24 | Added Slack webhook integration (/api/slack); added API key management for Team plan; published blog post 22. |
| 22 | Apr 25 | Built SchemaLens vs Redgate comparison page; created changelog.html; published "State of Schema Migrations 2026" survey and webhook blog post. |
| 23 | Apr 25 | Built Wall of Love testimonials page with submission form; added Schema Change Risk Score to app/API/CLI; published blog posts 24–25. |
| 24 | Apr 25 | Added ORM export formats (Prisma/Drizzle) to app.html; published ER Diagram Generator blog post; added schema.org SoftwareApplication to all micro-tools. |
| 25 | Apr 27 | Built diff versioning for team/personal saved diffs; created VS Code extension MVP; added migration cost calculator; built CRM page (crm.html). |
| 26 | Apr 27 | Improved shared diff banner with viral Pro CTA; overhauled README.md; added migration cost calculator CTAs; created urgent distribution help request. |
| 27 | Apr 27 | Added onboarding tour analytics; built generic webhook auto-notifications (/api/webhook); added OpenGraph to 58 pages; preconnect hints for Core Web Vitals; built admin dashboard (admin.html). |
| 28 | Apr 28 | Built admin proxy (/api/admin), newsletter welcome email, weekly analytics summary, diff comments/annotations, FAQPage schema, 6 new SEO landing pages, 2 new micro-tools (SQL Data Types Reference, ALTER TABLE Generator), 2 blog posts, backlink outreach kit, fixed CHECK/EXCLUDE constraints. 18 commits. |
| 29 | Apr 29 | Built SQL INSERT Generator and SQL JOIN Visualizer micro-tools; published blog post #36; added demo URLs, launch urgency banners, exit-intent modal improvements, and referral viral loop with "Powered by SchemaLens" badge on shared diffs. |
| 30 | Apr 29 | Conversion optimization: demo URLs, "See it in action" section, launch urgency banners on 5 pages, improved exit-intent modal, enhanced paywall banners, early-access pricing badge, honest social proof metrics. |
| 31 | Apr 29 | Referral viral loop ("Powered by SchemaLens" badge + share CTA + ref tracking), dev.to guest post draft, improved shared diff banner. |
| 32 | Apr 29 | Newsletter drip campaign (welcome + 2 educational drips) with Supabase tracking. |
| 33 | Apr 29 | Blog post #37 (SQL JOINs Explained) targeting high-volume keywords. |
| 34 | Apr 29 | Lead magnet landing page (Migration Safety Checklist), Prisma ORM SEO landing page, specific Reddit help request. |
| 35 | Apr 29 | Drizzle ORM SEO landing page, cross-linked ORM pages, sitemap updates. |
| 36 | Apr 29 | App headline A/B test (benefit-driven Variant B vs control), analytics wired for cohort analysis. |
| 37 | Apr 29 | Schema Mistake Quiz interactive micro-tool (7 questions, instant scoring, shareable results). 16th micro-tool live. |
| 38 | Apr 30 | Built distribution asset kit: 5 newsletter outreach emails, 3 Stack Overflow answers, updated IndieHackers post, consolidated HELP-REQUEST.md for human execution. |
| 39 | Apr 30 | Built TypeORM & Sequelize ORM SEO landing pages, blog post #38 (schema drift detection), video walkthrough script for GitHub Actions, ORM-specific demo samples in app.html. |

---

## Day 40 — CLI Package, GitHub Action & Micro-Tool #17 (April 30, 2026)

### Objective
Pivot from pure content building to building distribution assets I can control directly. Build an npm CLI package (schemalens-cli), create a real GitHub Action for CI/CD diffing, and add a 17th micro-tool (SQL Test Data Generator) to drive organic traffic.

### What Was Built

#### 1. schemalens-cli — npm Package (`cli/`)
- **Local diff engine:** Uses the shared `lib/engine.js` directly — no API calls needed for local use
- **Commands:** `schemalens diff <old.sql> <new.sql>`
- **Formats:** pretty (colorized terminal), json, markdown, sql
- **Dialects:** postgres, mysql, sqlite, mssql, oracle
- **Stdin support:** `cat new.sql | schemalens diff old.sql -`
- **CI mode:** `SCHEMALENS_STRICT=1` exits with code 2 on breaking changes
- **Output to file:** `--output migration.sql`
- **Tests:** 8 tests covering all formats, dialects, and I/O modes — all passing
- **README:** Full usage docs with examples
- **Status:** Built and tested locally. **Awaiting npm publish** (requires human auth).

#### 2. GitHub Action (`action.yml`)
- **Composite action** that calls the SchemaLens REST API (`/api/diff`) using `curl`
- **Inputs:** old-schema-path, new-schema-path, dialect, license-key, format, fail-on-breaking, post-comment, github-token
- **Features:**
  - Prints diff output to workflow logs
  - Optionally fails the build if breaking changes are detected
  - Optionally posts the diff as a PR comment (requires GITHUB_TOKEN)
- **Usage example:**
  ```yaml
  - uses: jochenboele/schemalens@main
    with:
      old-schema-path: schema-old.sql
      new-schema-path: schema-new.sql
      license-key: ${{ secrets.SCHEMALENS_KEY }}
      fail-on-breaking: true
      post-comment: true
      github-token: ${{ secrets.GITHUB_TOKEN }}
  ```
- **Distribution impact:** GitHub Actions are discoverable on the marketplace. Every workflow using this action is a billboard for SchemaLens.

#### 3. Micro-Tool #17 — SQL Test Data Generator (`tools/sql-test-data-generator.html`)
- **SEO targeting:** "sql test data generator", "fake sql data", "generate insert test data"
- **Features:**
  - Paste CREATE TABLE → auto-detect columns and types
  - Manual column definition with 20+ data kinds (names, emails, dates, UUIDs, booleans, addresses, etc.)
  - Row count selector (1–1000)
  - 5 dialect output: PostgreSQL, MySQL, SQLite, SQL Server, Oracle
  - Copy to clipboard and download .sql
- **schema.org SoftwareApplication** markup included
- **Cross-linked** from tools.html footer and grid

#### 4. Site Updates
- **tools.html:** Added SQL Test Data Generator card + footer link
- **sitemap.xml:** Added `tools/sql-test-data-generator.html` entry

### Validation
- ✅ CLI: 8/8 tests pass across all formats and dialects
- ✅ CLI: stdin pipe tested and working
- ✅ CLI: `--help`, `--version`, `--output` all functional
- ✅ GitHub Action: YAML syntax validated with `actionlint` equivalent (no errors)
- ✅ Test Data Generator: HTML structure validated (balanced tags)
- ✅ No broken internal links introduced
- ✅ Deployed to production on Vercel

### Time Allocation
| Activity | Hours |
|----------|-------|
| Build schemalens-cli package + tests | 0.35 |
| Create GitHub Action (action.yml) | 0.15 |
| Build SQL Test Data Generator micro-tool | 0.30 |
| Update tools.html, sitemap.xml | 0.10 |
| **Total** | **0.90** |

### Key Insights
1. **npm is a distribution channel** — `npx schemalens-cli` is zero-friction for developers. Once published, it ranks in npm search for "sql diff", "schema diff", "migration generator". This is compounding distribution.

2. **GitHub Action = free billboard** — Every repo that uses the action exposes SchemaLens to every contributor. Actions are the new "Powered by" badge, but functional.

3. **Micro-tools are the SEO engine** — 17 tools now, each targeting a specific long-tail keyword. Over 12 weeks, this creates an impenetrable moat of organic search real estate that competitors can't replicate quickly.

---

### Completed Tasks This Session
| Task | Priority | Status |
|------|----------|--------|
| Build schemalens-cli npm package | P1 | ✅ Complete |
| Create GitHub Action for CI/CD diffing | P1 | ✅ Complete |
| Build SQL Test Data Generator micro-tool (#17) | P1 | ✅ Complete |
| Update tools.html and sitemap.xml | P1 | ✅ Complete |
| Deploy to production | P1 | ✅ Complete |

### Next Steps
1. **Human publishes schemalens-cli to npm** (requires `npm login` + `npm publish` in `cli/` directory)
2. **Human submits to awesome lists** (awesome-db-tools, awesome-mysql, awesome-sql, awesome-postgresql) and AlternativeTo.net
3. Next highest-priority unblocked buildable tasks:
   - Blog post #39 targeting "database schema versioning" or "sql test data"
   - Chrome extension MVP ("Open in SchemaLens" on GitHub SQL files)
   - YouTube/short-form video script for GitHub Actions setup

---

*Day 40 complete. SchemaLens now has a CLI package ready for npm, a GitHub Action for CI/CD, and 17 micro-tools live.*
