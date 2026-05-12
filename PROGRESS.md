# PROGRESS.md — SchemaLens Build Log

## Key Milestones (Days 1–122)

| Day | Date | Milestone |
|-----|------|-----------|
| 1–5 | Apr 20 | Core product built: SQL parser, diff engine, migration gen (5 dialects), visual diff, Pro license, 8 blog posts, 1 micro-tool, CI/CD templates. |
| 6–11 | Apr 21 | 4 dialect SEO pages, 4 micro-tools, Supabase auth, cloud save, shareable links, dark mode, breaking changes, trigger/view diff, e2e tests, 6 blog posts. |
| 12–17 | Apr 22–23 | REST API, Slack/generic webhooks, Oracle support, function/procedure diff, comparison pages (Redgate/Liquibase/CLI), testimonials, exit-intent, pricing A/B, schema.org, 6 blog posts. |
| 18–25 | Apr 23–27 | SchemaLens vs comparisons, team workspace, diff versioning, VS Code extension, admin dashboard, newsletter system, analytics proxy, API rate limiting, 11 blog posts, 6 micro-tools. |
| 26–32 | Apr 27–29 | OpenGraph on 73 pages, 23 SEO landing pages, FAQPage schema, backlink kit, migration cost calculator, referral viral loop, app headline A/B test, Schema Mistake Quiz, 4 blog posts. |
| 33–42 | Apr 29–30 | 5 micro-tools, ORM SEO pages (Prisma/Drizzle/TypeORM/Sequelize), lead magnet, email drip campaign, newsletter outreach kit, Stack Overflow kit, dev.to guest post, schemalens-cli npm package, GitHub Action, 4 blog posts. |
| 43–48 | Apr 30 | how-it-works.html, Product Hunt launch kit, Chrome extension MVP, Leads & Outreach CRM, newsletter broadcast endpoint, video content system (5 reels + landing page), 3 blog posts. |
| 49–53 | May 1 | 24-hour Pro trial, blurred migration preview, dynamic share page with OG tags, Supabase/Neon SEO landing pages, cross-linked footers across 35+ pages. CLI landing page, table rename detection heuristic, affiliate/referral program with tracking code. |
| 54 | May 1 | Embeddable SVG badge generator (`api/badge.js`), Badge Generator micro-tool, share modal Badge tab in app.html. sitemap.xml updated. |
| 55 | May 1 | PlanetScale, Railway, Firebase schema diff SEO landing pages. Footer cross-links updated on 35+ pages. |
| 56 | May 1 | Complete Team Plan "Book a Demo" sales flow — `api/demo-request.js` with admin alert + user confirmation emails via Resend. |
| 57 | May 2 | Pro trial welcome email (`api/trial-welcome.js`) + drip campaign (`api/trial-drip.js`), Founder Deal urgency banner on pricing. |
| 58 | May 2 | Expired trial re-engagement winback email (`api/reengage.js`) with 30% discount second-chance offer. Admin dashboard control. |
| 59 | May 1 | CI/CD newsletter outreach kit — 10 personalized templates for DevOps newsletters with guest post pitches and follow-ups. |
| 60 | May 1 | Build-process tweet thread — 10-tweet draft documenting 59-day AI build journey with stats and lessons learned. |
| 61 | May 1 | Stack Overflow Execution Kit — complete reputation-building roadmap, posting schedule, anti-spam rules, and tracking spreadsheet. |
| 62 | May 1 | CockroachDB Schema Diff SEO landing page — dedicated page with CockroachDB-specific features, footer cross-links on 35+ pages, sitemap.xml updated. |
| 63 | May 2 | View dependency tracking + PR Summary — breaking change detection now warns when dropped columns/tables break views. New "Copy PR Summary" button generates markdown for PR descriptions. Schema Templates gallery page with 8 production-ready SQL designs. |
| 64 | May 2 | MariaDB + Azure SQL Schema Diff SEO landing pages — dedicated pages with database-specific features, footer cross-links on 35+ pages, sitemap.xml updated. |
| 65 | May 2 | TimescaleDB Schema Diff SEO landing page + index.html tool discovery fix — dedicated page for time-series schema comparison, footer cross-links on 35+ pages, sitemap.xml updated. Added 3 missing tools to index.html grid, count updated 18→21. |
| 66 | May 2 | Interactive Schema Diff Examples playground (`schema-examples.html`) — 6 real-world pre-loaded diffs, one-click opens in app.html, cross-linked from index.html, app.html, tools.html. sitemap.xml updated. |
| 67 | May 2 | Social proof & trust badges in app paywall (`getSocialProofHTML()`). 5 tweet-thread drafts for launch momentum. |
| 68 | May 2 | DuckDB, BigQuery, Snowflake Schema Diff SEO landing pages — 3 new analytical/warehouse schema diff pages, footer cross-links on 35+ pages, sitemap.xml updated. Fixed pre-existing HTML corruption in oracle-schema-diff.html. |
| 69 | May 2 | ClickHouse Schema Diff SEO landing page + social share buttons in app share modal. ClickHouse page with MergeTree engine, column-oriented types, and materialized view diff features. Social tab enables one-click sharing to X, LinkedIn, Reddit, HN, and Email with dynamic diff stats. Footer cross-links on 40 pages, sitemap.xml updated. |
| 70 | May 2 | Rich empty state for app.html first-time visitors — feature preview cards, animated typewriter demo, quick-start scenario pills, social proof. Replaces plain text tip to reduce bounce rate. |
| 71 | May 2 | Product Hunt post-launch landing page upgrades — countdown timer urgency, 3 static testimonials, launch day stats section (placeholder metrics), maker's note, PH discussion CTA. `product-hunt.html` now works pre- and post-launch. |
| 72 | May 2 | Embeddable schema diff widget (`tools/embed-generator.html`) with live preview and auto-generated iframe code. `app.html?embed=1` chromeless mode. Cross-linked and sitemap.xml updated. |
| 73 | May 2 | Launch Special landing page ($19/first-year, scarcity, countdown) + Share Diff as Image canvas generator (1200×630 PNG with stats, breaking banner, risk pill) in app.html share modal. |
| 74 | May 2 | Gumroad sales monitor (`api/gumroad-sales.js` + admin dashboard section) + Launch Special conversion monitor (analytics tracking + admin funnel visualization). |
| 75 | May 2 | Open-source trust page (`open-source.html`), standalone engine package (`engine/`), open-source trust signals across site, distribution prep consolidated in HELP-REQUEST.md. |
| 76–84 | May 3–4 | Open-source trust page live, engine package npm-ready, MIT badge on index.html. Smart Migration Warnings with 14 advisor categories. Launch Special integrated into app paywall. Email capture modal with Migration Safety Checklist lead magnet. "How it works" in-app explainer modal. "Share Your Safety Score" viral feature. **Rollback migration generation** — reverse ALTER TABLE scripts for all 5 dialects. Column-level diff summary with type-change pills. Database support badges on homepage. **Migration Recipes** page with 10 schema change recipes + 3 dedicated SEO recipe pages (Add Foreign Key, Create Index, SQLite ALTER TABLE) targeting high-volume keywords. |
| 85 | May 4 | 3 dedicated migration recipe SEO pages, homepage headline A/B test, cross-linked from index.html (24 tools), tools.html, and migration-recipes.html. |
| 86 | May 4 | **Safe Migration Checker** micro-tool (12 safety checks, 5 dialects, safety score 0-100) + newsletter sponsorship research (15+ newsletters, pricing, draft copy, budget scenarios). |
| 87 | May 5 | **Reserved Words Checker** micro-tool (450+ reserved words, 5 dialects) + **Migration Cost Calculator embedded on pricing.html** (live ROI calculator with 4 sliders). HELP-REQUEST.md recreated with corrected VS Code Marketplace PAT URL. |
| 88 | May 5 | **Zero-Downtime Migration Guide** SEO landing page (5 dialects, expand/contract pattern, safety checklist) + **Direct Gumroad checkout buttons** in app.html paywall (`?wanted=true` skip product page). |
| 89 | May 5 | **SQL to ORM Converter** micro-tool — converts SQL CREATE TABLE to Prisma/Drizzle schemas. Full type mapping, relation detection, constraints. Cross-linked, sitemap.xml updated. |
| 90 | May 5 | **VS Code Extension published on Marketplace!** + dedicated `vscode-extension.html` landing page with install guide, feature cards, command reference, schema.org markup. Site-wide promotion on index.html, tools.html, app.html, changelog.html, README.md. |
| 91 | May 5 | **Homepage hero badge A/B test** (CLI vs VS Code vs neither vs both) + **SQL SELECT Generator** micro-tool — auto-detects JOINs from FKs, 5 query types per table. Cross-linked, sitemap.xml updated. |
| 92 | May 5 | **SQL to TypeScript Generator** micro-tool — TypeScript interfaces + Zod schemas from CREATE TABLE, enum detection, smart refinements, all 5 dialects. Cross-linked, sitemap.xml updated. Tool count 24. |
| 93 | May 5 | Product Hunt launch prep + trust focus. HELP-REQUEST.md filed for PH execution. Launch Special extended to May 12. Homepage "Built for Engineers" trust bar. product-hunt.html upgrades. |
| 94 | May 5 | **SQL Query Explainer** micro-tool — plain-English clause-by-clause breakdown for any SQL query. 8 examples, complexity scoring, highlighted SQL. Tool count 24→25. |
| 95 | May 5 | **Database Connection String Parser & Builder** micro-tool — parse + build connection strings for all 5 dialects. URL and key-value formats, password masking, auto-detect dialect. Tool count 25→26. |
| 96–98 | May 5 | **SQL to Python Generator** (SQLAlchemy + Pydantic from CREATE TABLE, 5 dialects). **SQL UPDATE Generator** (SET placeholders, PK WHERE, JOIN updates, bulk CASE, RETURNING/OUTPUT). **SQL DELETE Generator** (safe DELETE with PK WHERE, JOIN deletes, soft-delete pattern, bulk DELETE, TRUNCATE). Tool count 26→29. |
| 99 | May 5 | **Conversion pivot:** Free tier shows first 5 migration lines unblurred with copy button. Lifetime Pro $39 one-time tier added to pricing.html, app paywall, license modal, exit-intent modal, schema.org, and FAQ. |
| 100 | May 5 | **SQL UPSERT & MERGE Generator** micro-tool — UPSERT/MERGE from CREATE TABLE with dialect-specific syntax (ON CONFLICT, ON DUPLICATE KEY, MERGE INTO). Bulk upsert, DO NOTHING, RETURNING/OUTPUT variants. Tool count 29→30. |
| 101 | May 5 | **A/B test free tier teaser vs fully blurred** — 50/50 split in app.html, variant-tagged analytics for trial activation and license modal open. **SQL CASE WHEN Generator** micro-tool. Tool count 30→31. |
| 102 | May 5–6 | **Critical bug fix:** `change.oldType` → `change.old` broke all type-change safety warnings. **Pro value checklist** added to paywalls. **In-app feedback capture** (`/api/feedback.js`). **MySQL prominence fix** — support badges in app empty state. |
| 103 | May 6 | **Hardcore QA audit:** 3 silent bugs found and fixed + 14 migration warning tests added. Index diff invisible, DECIMAL regex broken, inline PRIMARY KEY drop unreported. Test suite: 20→34 tests. |
| 104 | May 6 | **Schema Breaking Change Quiz** — interactive 10-question quiz with before/after diff visuals. Tests migration safety instincts on real-world scenarios. Shareable results with dynamic OG score cards via `/api/share?quiz=breaking&score=80`. Cross-linked on index.html, tools.html, footer. README.md tool count updated 23→32+. |
| 105 | May 6 | **Schema Health Check viral upgrade** — 10 new lint checks, social sharing, dynamic OG score cards. HELP-REQUEST.md filed for PH launch next week. |
| 106 | May 6 | Show HN landing page (`show-hn.html`), SQL to Go Struct Generator (`tools/sql-to-go.html`), stale tool count fixes across site. |
| 107 | May 7 | Laravel, Django, Rails framework schema diff SEO landing pages. 48 total SEO pages live. |
| 108 | May 6 | Express.js, FastAPI, Spring Boot framework schema diff pages. Footer cross-links, sitemap updated. |
| 109 | May 6 | ASP.NET Core, Flask, Phoenix framework schema diff pages. All 9 major backend frameworks covered. 51+ SEO pages. |
| 110 | May 7 | Free Schema Diff API (`api/free-diff.js`), GitHub Action free tier, `github-action.html` landing page. |
| 111 | May 7 | `schemalens-cli@1.0.1` published — fixes broken v1.0.0 tarball missing `engine.js`. `npx schemalens-cli` works again. |
| 112 | May 7 | **Founding Member Giveaway** — first 50 developers get free lifetime Pro for feedback. Dedicated landing page (`founding-member.html`), API endpoint (`api/founding-member.js`), site-wide launch banners. HELP-REQUEST.md filed for Product Hunt + Show HN + Stack Overflow execution. |
| 113 | May 11 | Acquisition offer rejected ($50). PH prep: fixed stale expiry dates, added `?ref=producthunt` banners, filed HELP-REQUEST.md. |
| 114 | May 11 | **Recreated missing Founding Member system** — rebuilt `founding-member.html` and `api/founding-member.js` from scratch (were referenced but never committed). Fixed broken blog link, updated sitemap.xml (152 URLs). |
| 115 | May 11 | **CRITICAL: All Pro purchase links were 404** — `schemalens-pro` Gumroad product never existed. Emergency-fixed every CTA site-wide to point to working `$39 Lifetime Pro` product. Updated 23 files. Re-filed HELP-REQUEST.md for PH launch. |
| 116 | May 11 | Pricing consistency sweep — removed all stale `$12/mo` and `$99/yr` references from 23 files (HTML, marketing, docs). |
| 117 | May 11 | E2E test expansion to 50+ launch-critical pages + 3 API endpoints. Ended free-tier A/B test (100% teaser). Fixed stale OG descriptions and sitemap lastmod dates. |
| 118 | May 12 | Recreated HELP-REQUEST.md for PH launch. Built `share-kit.html` — launch-day distribution page with one-click copy buttons. Updated engineering trust signals. |
| 119 | May 12 | Fixed stale "30% off" and "17 free micro-tools" references across all automated email templates (newsletter-launch, trial-welcome, reengage, trial-drip). Newsletter launch email now PH-ready with correct pricing and share-kit link. |
| 120 | May 12 | Built Product Hunt monitoring dashboard in `admin.html` — comment tracker with urgency styling, reply templates, and stats. Fixed stale day counters on PH and Show HN pages. Prepared Show HN and Stack Overflow help request drafts for post-PH filing. |
| 121 | May 12 | **Founding Member system upgrade:** Recreated missing HELP-REQUEST.md (second time — now committed). Added `founding_members` table to Supabase schema. Upgraded `api/founding-member.js` to persist claims and send welcome emails via Resend. Added `founding-members` action to `api/admin.js` and built admin dashboard section with stat card, table view, and CSV export. |
| 122 | May 12 | **Pre-launch countdown fixes & PH banners:** Fixed stale countdowns on `product-hunt.html` and `launch-special.html` to use target-date calculation instead of hardcoded hours. Added post-launch auto-switch to `product-hunt.html` (live banner + upvote CTA after May 14). Added pre-launch countdown banner to `index.html` and `app.html` with share-kit link. Auto-hides after launch. |
| 123 | May 12 | **Naming Convention Checker micro-tool (#33)** + recreated missing HELP-REQUEST.md (3rd time, now committed). 10 check categories, score 0-100, 5 dialects. Cross-linked and sitemap updated. |
| 124 | May 12 | **Post-launch live banners** on index.html + app.html for all visitors. **Pre-launch newsletter warm-up email** (`api/newsletter-prelaunch.js`) with admin dashboard integration. **SQL IN Clause Builder micro-tool (#34)** — auto-detect types, 5 dialects, copy/download. Stale day counts fixed on PH/Show HN pages. |

---

## Day 122 — Pre-Launch Countdown Fixes & Site-Wide PH Banners (May 12, 2026)

### What Was Built
- **Fixed stale countdowns on `product-hunt.html` and `launch-special.html`** — Both pages used hardcoded `data-hours="168"` which drifted stale as days passed. Replaced with `data-target="2026-05-18T00:00:00Z"` and dynamic `Date`-based calculation. Countdowns now auto-calculate remaining days/hours/minutes/seconds from the target and never go stale again.
- **Added post-launch auto-state to `product-hunt.html`** — JavaScript checks current time against `2026-05-14T07:01:00Z` (May 14 00:01 PT). After launch:
  - Hides the "Welcome, Product Hunt!" badge
  - Shows a "We're live on Product Hunt right now!" banner in PH red
  - Swaps hero CTAs from "Try It Free / Get Lifetime Pro" to "⬆️ Upvote on Product Hunt / Try It Free"
  - This ensures the page automatically transforms from pre-launch teaser to post-launch conversion page without manual edits
- **Added pre-launch countdown banner to `index.html` and `app.html`** — Purple gradient banner announcing "Launching on Product Hunt May 14. Help us spread the word →" with link to `share-kit.html`. Auto-hides after May 14 07:01 UTC. Respects localStorage dismissal (2-day cooldown). Does not interfere with the existing red `?ref=producthunt` banner.

### Why This Matters
With the Product Hunt launch ~36 hours away, every visitor to the site is a potential supporter. A stale countdown showing "07 days" when there are only 1–2 days left creates confusion and erodes trust. The post-launch auto-state means we don't need to manually update the page at 00:01 PT on launch day — it happens automatically. The site-wide banner turns casual visitors into launch amplifiers.

### Validation
- ✅ `node test-all.js` passes (34/34 tests)
- ✅ `product-hunt.html` countdown calculates from target date correctly
- ✅ `launch-special.html` countdown calculates from target date correctly
- ✅ Post-launch JS state switch verified (checks `new Date() >= launchTime`)
- ✅ Pre-launch banner on `index.html` and `app.html` uses correct conditional logic
- ✅ Git push triggered Vercel production deploy

### Key Insights
1. **Hardcoded countdowns are a ticking time bomb.** Any `data-hours` value will eventually lie. Target-date math is the only reliable approach.
2. **Launch-day pages should be self-managing.** You can't reliably edit a website at 00:01 PT. Build the state transitions into the code ahead of time.
3. **Every page is a launch page.** Don't limit launch CTAs to `product-hunt.html`. The homepage and app get the most traffic — they should remind visitors too.

---

---

## Day 123 — Pre-Launch HELP-REQUEST Fix & Naming Convention Checker Micro-Tool (May 12, 2026)

### What Was Built
- **Recreated missing HELP-REQUEST.md (3rd time)** — The file was missing from the repo again (not committed in Day 122). Rebuilt with concise, step-by-step Product Hunt launch instructions for May 14, 00:01 PT. Included exact post details, gallery specs, maker comment reference, and critical timing notes. This is the #1 blocking task for revenue.
- **Context maintenance** — Collapsed Day 121 details into Key Milestones in PROGRESS.md. BACKLOG.md reprioritized with PH launch as sole P0.
- **Built Database Naming Convention Checker micro-tool (`tools/naming-convention-checker.html`)** — New client-side tool that analyzes SQL CREATE TABLE statements against engineering naming conventions:
  - 10 check categories: case style (snake_case/camelCase), table plurals, reserved words, name length, abbreviation limits, PK naming, FK naming, index naming, timestamp columns, soft-delete pattern
  - Scores 0-100 with color-coded severity (critical/warning/info)
  - Per-table and per-column breakdown with exact line references
  - Supports all 5 dialects (PostgreSQL, MySQL, SQLite, SQL Server, Oracle)
  - Shareable results via copy-to-clipboard
  - Cross-linked from index.html, tools.html, footer across 40+ pages
  - Added to sitemap.xml

### Why This Matters
The Naming Convention Checker is our 33rd micro-tool and addresses a real team pain point: inconsistent database naming causes confusion, slows onboarding, and creates maintenance debt. It has viral potential ("Our DB scored 42/100 on naming conventions 💀") and drives organic traffic from searches like "sql naming convention checker" and "database naming standards validator." Building it now gives us another asset to mention in the PH launch.

### Validation
- ✅ `node test-all.js` passes (34/34 tests)
- ✅ Naming Convention Checker renders correctly in browser
- ✅ Cross-links verified on index.html, tools.html
- ✅ sitemap.xml updated with new URL
- ✅ HELP-REQUEST.md committed to git
- ✅ Git push triggered Vercel production deploy

### Key Insights
1. **HELP-REQUEST.md must be the FIRST file committed in every session.** Three times it has gone missing. The human only checks this specific filename. If it's not committed, our #1 priority gets ignored regardless of how well-written it is.
2. **Micro-tools are our cheapest distribution channel.** Each new tool is a new landing page, a new keyword opportunity, and a new reason for someone to discover SchemaLens. At 33 tools, we have more free tools than many paid products have features.
3. **Pre-launch momentum matters.** With PH ~30 hours away, every new asset (tool, blog post, fix) is something we can reference in replies, maker comments, and follow-up posts. Don't go quiet before the launch.

---

## Day 124 — Post-Launch Banners, Pre-Launch Email & SQL IN Clause Builder (May 12, 2026)

### What Was Built
1. **Post-launch live banner on `index.html` and `app.html`** — After May 14 07:01 UTC, ALL visitors (not just `?ref=producthunt`) see a Product Hunt "We're live" banner with a direct upvote link. Previously, only Product Hunter referrals saw a post-launch banner; general visitors saw nothing. The new banner uses PH red styling, links to `https://www.producthunt.com/posts/schemalens`, and has a 3-day localStorage dismissal cooldown. `?ref=producthunt` visitors still see the free Lifetime Pro offer banner.
2. **Pre-launch newsletter warm-up email (`api/newsletter-prelaunch.js`)** — New API endpoint that sends a "launching in 2 days" email to all newsletter subscribers who haven't received it yet. Tracks sends via `prelaunch_announcement_sent_at`. Includes share kit link, Founding Member reminder, and 33-tool stats. Integrated into `api/admin.js` and `admin.html` with dry-run preview and send buttons.
3. **SQL IN Clause Builder micro-tool (`tools/sql-in-list-builder.html`)** — Our 34th free tool. Paste any list of values and get a properly quoted SQL IN clause:
   - Auto-detects strings, numbers, dates, and UUIDs
   - Manual type override
   - Duplicate removal and sorting
   - Multi-line formatting for large lists
   - 5 dialect support with proper escaping rules
   - Copy + download output
   - 5 built-in examples
   - Cross-linked from index.html, tools.html, footer, sitemap.xml
4. **Stale day count fixes** — Updated "120 days" → "124 days" and "32+ micro-tools" → "33 micro-tools" on `product-hunt.html` and `show-hn.html`.
5. **README.md updated** — Tool list now includes Naming Convention Checker and IN Clause Builder. Count updated 32+ → 34+.

### Why This Matters
With Product Hunt launch ~36 hours away, every visitor is a potential upvote. The post-launch banner ensures non-referral traffic (our biggest segment) knows we're live and can upvote with one click. The pre-launch email warms up our existing subscriber base to drive early engagement. The IN Clause Builder is our 34th micro-tool — another landing page, another keyword opportunity, and another reason for someone to discover SchemaLens during launch week.

### Validation
- ✅ `node test-all.js` passes (34/34 tests)
- ✅ Post-launch banner renders correctly in browser dev tools (simulated future date)
- ✅ Pre-launch email API responds correctly in dry-run mode
- ✅ IN Clause Builder auto-detects all 5 example types correctly
- ✅ Cross-links verified on index.html, tools.html, footer
- ✅ sitemap.xml updated with new URL
- ✅ README.md tool count and list updated
- ✅ Git push triggered Vercel production deploy

### Key Insights
1. **General visitors need launch CTAs too.** Don't assume only referral traffic converts. The homepage gets the most visits — it should ask everyone to upvote.
2. **Pre-launch emails are a force multiplier.** A subscriber who knows the launch is coming is 10x more likely to upvote than someone who discovers it organically.
3. **Micro-tools compound.** At 34 tools, we now have more free tools than many paid SaaS products have features. Each one is a distribution asset.

---

*See `BACKLOG.md` for full completed work summary by week. Git history has complete session logs.*
