# PROGRESS.md — SchemaLens Build Log

## Key Milestones (Days 1–48)

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
| 39 | Apr 30 | TypeORM & Sequelize SEO landing pages, blog post #38 (schema drift detection), video walkthrough script for GitHub Actions, ORM-specific demo samples. |
| 40 | Apr 30 | schemalens-cli npm package, GitHub Action (action.yml), micro-tool #17 (SQL Test Data Generator), updated tools.html and sitemap.xml. CLI 8/8 tests pass. |
| 41 | Apr 30 | Blog post #39 (SQL test data guide). |
| 42 | Apr 30 | Trust & positioning fix: how-it-works.html (architecture transparency), CLI promo banners on index.html/app.html, landing page FAQ addressing trust objections. |
| 43 | Apr 30 | Blog post #40 (Complete SQL Migration Checklist); refreshed Product Hunt launch kit and all marketing assets with current stats. |
| 44 | Apr 30 | Product Hunt launch execution: regenerated gallery screenshots & demo video, created product-hunt.html with 30% off PH-exclusive offer. |
| 45 | Apr 30 | Chrome extension MVP (GitHub SQL file integration), blog post #41 (10 breaking schema changes), sitemap updates. |
| 46 | Apr 30 | Reddit trust/positioning fix: "When SchemaLens shines" section, trust bar, FAQ on "I already have migrations." Built Leads & Outreach CRM in admin.html. Prepared Monday launch materials. |
| 47 | Apr 30 | Newsletter launch broadcast endpoint (`/api/newsletter-launch.js`), admin dashboard controls, blog post #42 (5-minute schema review), 2 new Stack Overflow answer drafts. |
| 48 | Apr 30 | Built short-form video content system: 5 video scripts, vertical video generator (1080×1920), video-tips.html landing page with schema.org VideoGallery markup. 18th distribution channel live. |
| 49 | May 1 | Conversion optimization: 24-hour Pro trial, blurred migration preview for paywalled users, dynamic share page with OG tags (`/api/share.js`), trial FAQ on pricing page. |
| 50 | May 1 | Built Supabase and Neon schema diff SEO landing pages. Added schema.org SoftwareApplication markup, updated sitemap.xml, and cross-linked footers across 30+ pages. |
| 51 | May 1 | Built CLI landing page (`cli/index.html`) with install demo, output formats, CI example, and schema.org markup. Added optional email capture in Pro trial flow. Updated README badges and prominent CLI CTA. |
| 52 | May 1 | Built table rename detection heuristic: same structure + similar name = rename (not drop+add). Generates proper RENAME TABLE migration SQL. Visual diff, summary, markdown, CLI, and API all updated. Addresses Reddit differentiation feedback. |

---

---

## Day 52 — Product: Table Rename Detection Heuristic (May 1, 2026)

### What Was Built
- **Table rename detection in diff engine (`lib/engine.js`)**
  - `tableSignature()` — creates structural fingerprint from column types + constraints
  - `isTableRenameCandidate()` — same structure + similar name = likely rename
  - Heuristics: Levenshtein ≤3, normalized name match, substring match
  - Updated `diffSchemas()` to classify renames into `tablesRenamed` instead of drop+add
- **Migration generation for renames**
  - PostgreSQL/SQLite: `ALTER TABLE ... RENAME TO ...`
  - MySQL: `RENAME TABLE ... TO ...`
  - SQL Server: `EXEC sp_rename '...', '...'`
  - Oracle: `RENAME ... TO ...`
- **Breaking changes exclusion**
  - `detectBreakingChanges()` already only scans `tablesRemoved`, so renames are automatically non-breaking
- **Visual diff rendering (`app.html`)**
  - New "Table Renamed" card with arrow badge showing old → new name
  - Summary bar pill: `→N renamed`
  - Added to empty-state check, webhook payload, email report, history summary
- **Markdown & export updates (`app.html` + `lib/engine.js`)**
  - Summary line for renamed tables
  - Dedicated "Tables Renamed" section with old/new names and column counts
- **CLI output (`cli/index.js`)**
  - Cyan `Tables renamed` count in summary
  - `→ old_name → new_name` listing in detail view
- **API response (`api/diff.js`)**
  - Added `tablesRenamed` to summary object

### Validation
- ✅ `users` → `user`: detected as rename (same structure, Levenshtein = 1)
- ✅ `order_items` → `order_item`: detected as rename (same structure, Levenshtein = 1)
- ✅ `customer_profiles` → `profiles`: detected as rename (substring match)
- ✅ Different structure + similar name: correctly classified as add+remove, not rename
- ✅ 14/14 diff engine tests pass
- ✅ `api/diff.js` and `cli/index.js` syntax checks pass
- ✅ `app.html` inline script parses successfully
- ✅ Deployed to Vercel

### Key Insights
1. **Differentiation from competitors.** Reddit feedback specifically called out that competitors show renames as destructive DROP+CREATE. Detecting renames positions SchemaLens as smarter and safer.
2. **Structural signature prevents false positives.** Requiring identical column types + constraints means we only flag renames when we're confident — not when a table was completely redesigned.
3. **Every surface updated.** Unlike a quick backend hack, this change propagates through migration SQL, visual diff, summary, markdown, email, CLI, and API — users see the improvement everywhere they interact with SchemaLens.

---

## Day 51 — Trust & Conversion: CLI Landing Page + Trial Email Capture (May 1, 2026)

### What Was Built
- **`cli/index.html`** — Comprehensive CLI landing page (fixes broken links from index/app/how-it-works)
  - Hero with `npx schemalens-cli` install command + copy button
  - Feature grid: instant, private, CI-ready, multi-format, breaking change guard, risk scoring
  - Terminal demo with syntax-highlighted sample output
  - Output format showcase (pretty, JSON, Markdown, SQL)
  - Supported dialects grid (PostgreSQL, MySQL, SQLite, SQL Server, Oracle)
  - CLI vs Web App comparison table
  - CI/CD workflow example with GitHub Actions
  - Schema.org SoftwareApplication JSON-LD markup
  - CTA box linking to Pro purchase and web app
- **Optional email capture in Pro trial flow (`app.html`)**
  - Added email input field next to trial buttons in both Migration and ORM tabs
  - When trial is activated with an email, sends to `/api/subscribe` with source="pro_trial"
  - Stores email in localStorage for future reference
  - Enables newsletter follow-up for highest-intent users
- **Root `README.md` optimization**
  - Added npm version badge, license badge, Vercel deploy badge
  - Added direct links to Web App, CLI, API Docs, and Pricing
  - Prominent `npx schemalens-cli` mention above the fold
- **Sitemap update** — added `cli/index.html` with priority 0.8

### Validation
- ✅ `cli/index.html` HTML structure validated
- ✅ `app.html` trial function bracket balance checked
- ✅ 14/14 diff engine tests pass
- ✅ All internal links verified (index.html, app.html, how-it-works.html already linked to `cli/`)

### Key Insights
1. **Broken links were hurting trust.** Index.html, app.html, and how-it-works.html all linked to `cli/` which returned 404. Fixing this removes friction for CLI-curious developers.
2. **Email capture on trial is high-leverage.** Users who start a trial are our highest-intent audience. Capturing even 10% of their emails gives us a warm list to announce new features and offers to.
3. **CLI is a trust signal.** The Reddit "vibe-coded" criticism stings because developers trust CLI tools more than web apps. A dedicated CLI page with install instructions and CI examples positions SchemaLens as a real engineering tool.

---

## Day 50 — SEO: Supabase & Neon Schema Diff Landing Pages (May 1, 2026)

### What Was Built
- **`supabase-schema-diff.html`** — SEO landing page targeting "supabase schema diff" keywords
  - Supabase-specific workflow: `supabase db dump` → paste → diff → generate migration
  - Highlights RLS policy diff, auth/storage schema awareness, enum type changes
  - Comparison section: SchemaLens vs Supabase CLI `db diff`
  - Schema.org SoftwareApplication JSON-LD with Supabase-specific features
  - Links to app.html?dialect=postgres for immediate use
- **`neon-schema-diff.html`** — SEO landing page targeting "neon schema diff" keywords
  - Neon-specific workflow: `pg_dump` from Neon connection string → paste → diff
  - Highlights branch-to-branch diff, serverless-optimized parsing
  - Comparison section: SchemaLens vs Neon CLI / psql
  - Schema.org SoftwareApplication JSON-LD with Neon-specific features
- **Cross-linking:** Added Supabase Diff and Neon Diff links to footers across 30+ pages
- **Sitemap:** Added both pages with priority 0.9 and changefreq weekly
- **Deployed to Vercel** — both pages live at schemalens.tech

### Validation
- ✅ Both new pages return HTTP 200 on production
- ✅ All inline scripts parse successfully
- ✅ schema.org JSON-LD valid on both pages
- ✅ Internal links validated across updated footers
- ✅ sitemap.xml well-formed
- ✅ 14/14 diff engine tests pass

### Key Insights
1. **Platform-specific pages capture high-intent traffic.** Generic "PostgreSQL diff" is competitive. "Supabase schema diff" and "neon schema diff" have lower competition and higher intent — developers searching these terms are actively using those platforms.
2. **Footers are distribution.** Adding links to 30+ page footers creates a dense internal link graph that helps Google discover and rank the new pages faster.
3. **Schema.org markup multiplies click-through rate.** SoftwareApplication structured data can trigger rich snippets in search results, increasing visibility.

---

*See `BACKLOG.md` for full completed work summary by week. Git history has complete session logs.*
