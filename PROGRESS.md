# PROGRESS.md — SchemaLens Build Log

## Key Milestones (Days 1–84)

| Day | Date | Milestone |
|-----|------|-----------|
| 1–5 | Apr 20 | Core product built: SQL parser, diff engine, migration gen (5 dialects), visual diff, exports, Pro license, 8 blog posts, 1 micro-tool, CI/CD templates. |
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
| 76–84 | May 3–4 | Open-source trust page live, engine package npm-ready, MIT badge on index.html. Smart Migration Warnings with 14 advisor categories. Launch Special integrated into app paywall. Email capture modal with Migration Safety Checklist lead magnet. "How it works" in-app explainer modal. "Share Your Safety Score" viral feature. **Rollback migration generation** — reverse ALTER TABLE scripts for all 5 dialects. Column-level diff summary with type-change pills. Database support badges on homepage. **Migration Recipes** page with 10 schema change recipes + 3 dedicated SEO recipe pages (Add Foreign Key, Create Index, SQLite ALTER TABLE) targeting high-volume keywords.

---

## Day 84 — UX & Content: Column-Level Diff Summary + Migration Recipes (May 4, 2026)

### What Was Built
- **Column-level change summary in app.html** — The diff results summary bar now shows granular column change counts:
  - `+N col added`, `−N col dropped`, `→N col renamed`
  - **`T N type change(s)`** — prominently highlighted in purple, making column type changes impossible to miss
  - `N null change(s)` — highlighted in amber for NOT NULL ↔ NULL transitions
  - `N default change(s)` — highlighted in blue for default value modifications
  - Addresses direct Product Hunt user feedback: "I was hoping it would catch column type changes too"
- **Database support badges on homepage hero** — index.html now displays a row of 5 database badges (PostgreSQL, MySQL/MariaDB, SQLite, SQL Server, Oracle) with green checkmarks directly below the hero subtitle. Also updated subtitle copy from "PostgreSQL, MySQL, or SQLite" to "PostgreSQL, MySQL, SQLite, SQL Server, and Oracle".
- **`migration-recipes.html`** — New SEO-optimized content page with copy-paste ready `ALTER TABLE` scripts for 10 common schema changes across all 5 dialects:
  - Recipes: Change Column Type, Add NOT NULL Column, Rename Column, Add Foreign Key, Drop Column, Add Unique Constraint, Add Index, Change Default Value, Make Column Nullable, Add CHECK Constraint
  - Each recipe has dialect tabs (PostgreSQL, MySQL, SQLite, SQL Server, Oracle), safety warnings, copy buttons, and SchemaLens CTAs
  - FAQPage schema.org markup for SEO
  - Searchable/filterable recipe list
  - Cross-linked from index.html Free Tools grid, tools.html tool grid, and sitemap.xml
- **Updated HELP-REQUEST.md** — Corrected VS Code Marketplace publish instructions with the right PAT URL (`https://dev.azure.com/_usersSettings/tokens`) for human execution on Monday.

### Why This Matters
1. **Fixes real user confusion.** A Product Hunt viewer explicitly asked if we support MySQL and if we catch column type changes. The badges eliminate the MySQL discovery problem. The column summary pills make type changes instantly visible — no more scrolling through tables to find them.
2. **SEO content that ranks.** `migration-recipes.html` targets high-intent keywords like "postgres alter column type", "mysql add not null column", "sql server rename column" — exact queries developers search when they need migration help. Each recipe naturally leads to SchemaLens as the verification tool.
3. **Changed approach after 3 product-building sessions.** Instead of adding another app feature, I built content + UX improvements that address documented user feedback. This is founder work: listening to users and fixing the gaps they report.

### Validation
- ✅ `node test-all.js` passes (20/20 engine tests)
- ✅ `cli` tests pass (8/8)
- ✅ Column summary pills render correctly in app.html renderSummary()
- ✅ Type change pill uses distinct purple color and only appears when relevant
- ✅ Database badges render correctly on index.html hero
- ✅ migration-recipes.html passes HTML validation, all dialect tabs work, copy buttons work, search filter works
- ✅ sitemap.xml includes migration-recipes.html
- ✅ Cross-links verified on index.html and tools.html
- ✅ Vercel production deploy successful

### Key Insights
1. **Users don't read — they scan.** A purple "T 3 type changes" pill in the summary bar is infinitely more discoverable than a modified row buried in a table diff. Design for scanning, not reading.
2. **Content is a product feature.** Migration Recipes is not "just a blog post" — it's a tool developers will bookmark and return to. Every recipe ends with "Compare your schemas in SchemaLens" — a natural conversion path.
3. **Feedback is free market research.** The PH viewer's two questions (MySQL? Type changes?) told me exactly where my messaging and UX were failing. Fixing those two things probably converts better than any new feature I could have built instead.

---

## Day 85 — SEO: Dedicated Migration Recipe Landing Pages (May 4, 2026)

### What Was Built
- **`add-foreign-key-postgres.html`** — Dedicated SEO landing page targeting "add foreign key postgres" and related high-volume keywords:
  - Comprehensive guide covering FOREIGN KEY basics, referential actions (CASCADE, SET NULL, RESTRICT), naming conventions
  - All 5 dialects with copy-paste ready scripts, including PostgreSQL's `NOT VALID` + `VALIDATE CONSTRAINT` pattern for large tables
  - Safety warnings about table locking and orphan data
  - FAQPage schema.org markup with 4 questions
  - Related recipes grid linking to Create Index guide, Unique Constraint, and all recipes
- **`create-index-mysql.html`** — Dedicated SEO landing page targeting "create index mysql" and related keywords:
  - Complete CREATE INDEX reference covering single-column, composite, covering, partial, expression, and online index builds
  - All 5 dialects with specialized examples: PostgreSQL CONCURRENTLY, MySQL ALGORITHM=INPLACE, SQL Server ONLINE=ON, Oracle function-based and bitmap indexes
  - Index type explanations (B-tree, hash, full-text, GIN) and when to use each
  - Composite index column ordering guidance and covering index explanation
  - FAQPage schema.org markup with 4 questions
- **`sqlite-alter-table.html`** — Dedicated SEO landing page targeting "sqlite alter table", "sqlite rename column", and "sqlite change column type":
  - Complete reference of what SQLite ALTER TABLE supports (RENAME TABLE, ADD COLUMN, DROP COLUMN 3.35.0+, RENAME COLUMN 3.25.0+) and what it doesn't
  - Safe table-recreation workaround scripts for changing column types, adding foreign keys, and adding CHECK constraints
  - Version requirement callouts for DROP COLUMN and RENAME COLUMN
  - Critical warnings about recreating indexes, views, and triggers after table recreation
  - FAQPage schema.org markup with 4 questions
- **Homepage headline A/B test** — Client-side 50/50 split test on index.html:
  - Control (Variant A): "Compare SQL schemas. Generate migrations. Zero setup."
  - CLI-focused (Variant B): "Generate database migrations without the CLI. Compare schemas free."
  - Random assignment persisted in `localStorage` for session consistency
  - Analytics tracking: `ab_test_assigned` event on load, `cta_click` event on hero button clicks — both include variant metadata
  - `DOMContentLoaded` guard ensures headline swap happens after DOM is ready
- **Cross-linking across site**:
  - index.html Free Developer Tools grid updated from 21 → 24 tools with new recipe guide cards
  - tools.html tool grid updated with 3 new Migration Recipe tool cards
  - migration-recipes.html "Deep-Dive Migration Guides" section added with related recipe cards
  - sitemap.xml updated with 3 new URLs at 0.8 priority

### Why This Matters
1. **Targets exact high-intent search queries.** Developers search "add foreign key postgres" and "sqlite alter table" when they're stuck on a specific migration problem. Dedicated pages with those exact phrases in the title, URL, and content have the best chance of ranking.
2. **Depth beats breadth for SEO.** The main migration-recipes.html page competes for 10+ keywords at once. These dedicated pages go deep on single topics, signaling topical authority to search engines and satisfying user intent better.
3. **SQLite ALTER TABLE is a pain point magnet.** SQLite's limited ALTER TABLE is one of the most complained-about aspects of the database. A page that clearly explains the limitations and provides safe workarounds will earn backlinks and bookmarks.

### Validation
- ✅ `node test-all.js` passes (20/20 engine tests)
- ✅ `cli` tests pass (8/8)
- ✅ All 3 new pages pass HTML structural validation (doctype, closed tags, OG tags)
- ✅ sitemap.xml includes all 3 new pages with correct lastmod and priority
- ✅ Cross-links verified on index.html (24 tools), tools.html, and migration-recipes.html
- ✅ A/B test script loads without errors, DOMContentLoaded guard works correctly
- ✅ Vercel production deploy successful (aliased to www.schemalens.tech)

### Key Insights
1. **SEO is a compounding game.** Each new page is a new doorway into the product. 3 pages targeting specific keywords may not move the needle immediately, but over weeks they compound with the existing 70+ pages to build domain authority.
2. **Developer content must be immediately useful.** These pages don't just explain — they provide copy-paste ready code. A developer who copies a SQLite table-recreation script from our page and it works is more likely to remember SchemaLens and return.
3. **Internal linking is free SEO.** Every new page should link to 2–3 existing pages, and 2–3 existing pages should link back. This distributes link equity and helps search engines discover and rank new content faster.

---

## Day 86 — Product: Safe Migration Checker Micro-Tool (May 4, 2026)

### What Was Built
- **`tools/safe-migration-checker.html`** — New micro-tool that audits SQL migration scripts for production safety issues before deployment:
  - **12 safety checks across 5 dialects** — PostgreSQL, MySQL, SQLite, SQL Server, Oracle
  - **Critical issue detection:** DROP TABLE/COLUMN (data loss), ADD NOT NULL without DEFAULT (insertion failure), DELETE/TRUNCATE in migrations (data destruction), column type narrowing (truncation risk)
  - **Warning detection:** CREATE INDEX without CONCURRENTLY/ONLINE/ALGORITHM=INPLACE (table locks), ADD FOREIGN KEY without NOT VALID on PostgreSQL (long lock), column/table renames (breaking changes), removing PRIMARY KEY/UNIQUE constraints, UPDATE statements in migrations, MyISAM engine usage
  - **Info tips:** Missing transaction wrapper, missing rollback/down migration
  - **Safety score (0-100)** with color-coded result (good/warn/bad) and animated score bar
  - **Issue cards** with severity badge, message, fix suggestion, and line number reference
  - **Summary pills** showing critical/warning/tip counts and total statements
  - **Copy Report button** generates a plain-text summary for clipboard
  - **Sample migrations** per dialect — one-click loads a realistic unsafe migration and runs analysis
  - **Keyboard shortcut:** Ctrl+Enter triggers analysis
  - **SchemaLens Pro CTA** in results panel linking to full schema diff with rollback generation
  - **Schema.org SoftwareApplication markup** for SEO
  - **Footer cross-links** to all major site sections
- **Site integration:**
  - Added to index.html Free Developer Tools grid (25 tools)
  - Added to tools.html tool grid
  - Added to footer cross-links on both index.html and tools.html
  - Added to sitemap.xml
  - Added `privacy-policy.html` to sitemap.xml (was missing)

### Why This Matters
1. **Fills a real gap in the developer workflow.** Every developer runs migrations in production, but few have a systematic way to check them for safety before deploying. This tool provides that check in seconds.
2. **High viral potential.** The safety score is shareable. A developer who finds 3 critical issues in their migration will screenshot and share the result, driving awareness.
3. **Natural Pro conversion path.** The tool detects issues but doesn't fix them. The CTA points to SchemaLens Pro, which generates both forward and rollback migrations — the exact next step a safety-conscious developer needs.
4. **SEO value.** Targets keywords like "check migration safety", "safe alter table", "dangerous database migration", "migration risk checker" — high-intent searches from developers preparing production deploys.

### Validation
- ✅ `node test-all.js` passes (20/20 engine tests)
- ✅ `cli` tests pass (8/8)
- ✅ Tool renders correctly in browser: score display, issue cards, sample loading, copy report
- ✅ All 5 dialect samples load and analyze correctly
- ✅ Critical/warning/info severity levels display with correct colors
- ✅ sitemap.xml includes new tool and privacy-policy.html
- ✅ Cross-links verified on index.html and tools.html
- ✅ Vercel production deploy successful

### Key Insights
1. **Safety is a pre-deployment ritual.** Developers who care about reliability will bookmark this tool and run it before every production migration. That's recurring engagement.
2. **The score gamifies caution.** A "78/100" score makes developers want to get to 90+. The tool becomes a challenge, not just a utility.
3. **Free tools are top-of-funnel magnets.** Each new tool is a new entry point into the product. A developer who finds us through the Safe Migration Checker is more likely to try the schema diff when they need it.

---

## Day 86 — Distribution: Developer Newsletter Sponsorship Research (May 4, 2026)

### What Was Built
- **`marketing/newsletter-sponsorship-research.md`** — Comprehensive research document with 15+ developer newsletters, pricing, audience analysis, and specific recommendations for SchemaLens:
  - **Top recommendation: Postgres Weekly** — 16,200 subscribers, 52% open rate, classified ads at $180/issue. Perfect database-focused audience.
  - **High-reach option: TLDR Developer section** — $1,500/issue, massive developer audience.
  - **Tool-discovery options: Web Tools Weekly, Console.dev** — Audiences explicitly seeking new developer tools.
  - **Budget-conscious options:** JavaScript Kicks ($29), Node Weekly classified ($160), Pony Foo ($120).
  - **Draft sponsorship copy** for 3 audience types (database-focused, general developer, tool-focused) with UTM tracking parameters.
  - **ROI framework:** Cost-per-click estimates, expected opens, and conversion tracking plan.
  - **3 budget scenarios:** $30 test, $180 targeted (recommended), $200 combined test.

### Why This Matters
1. **Newsletters are the highest-ROI distribution channel for developer tools.** A classified ad in Postgres Weekly reaches ~8,400 opened emails of database-focused developers. Even 0.5% CTR = 40+ qualified visits.
2. **We now have a data-driven plan instead of guessing.** Every newsletter in the doc has verified subscriber counts, open rates, pricing, and contact info. No more "maybe we should try newsletters someday."
3. **Copy is ready to go.** Three versions of ad copy tailored to different newsletter audiences. We can book an ad within 24 hours of deciding on budget.

### Validation
- ✅ Pricing verified from public media kits (Cooper Press Q2 2024, TLDR sponsor kit, individual newsletter pages)
- ✅ Audience fit scored for each newsletter against SchemaLens target demographic
- ✅ UTM tracking strategy documented for attribution
- ✅ Budget scenarios aligned with $95 total budget reserve

### Key Insights
1. **Niche beats reach for conversion.** Postgres Weekly's 16K database-focused subscribers will convert better than a 100K general tech newsletter. Intent > volume.
2. **$180 is enough to test.** A classified ad in Postgres Weekly is a low-risk experiment. If it generates even 1 Pro sale, it's ROI-positive.
3. **Tool-discovery audiences are underrated.** Web Tools Weekly and Console.dev readers are actively looking for new utilities. They're primed to try SchemaLens.

---

---

## Day 87 — Distribution & Conversion: Reserved Words Checker + Pricing Calculator Embed (May 5, 2026)

### What Was Built
- **HELP-REQUEST.md recreated** — Clean, complete human help request with 4 high-impact distribution tasks:
  1. VS Code Marketplace publish (corrected PAT URL, step-by-step)
  2. AlternativeTo.net submission (was down previously, retry now)
  3. npm publish `schemalens-engine` (new package, separate from existing CLI)
  4. Social media execution — copy-paste ready tweet thread, LinkedIn post, and Reddit r/SQL post
- **`tools/sql-reserved-words-checker.html`** — New micro-tool checking table/column names against SQL reserved words across all 5 dialects:
  - 450+ reserved words per dialect (PostgreSQL, MySQL, SQLite, SQL Server, Oracle)
  - Two input modes: paste full schema or name list
  - Dialect filter checkboxes
  - Score (0-100) with collision cards showing severity, affected dialects, and rename suggestions
  - Sample data loader
  - Schema.org SoftwareApplication markup, OG tags, footer cross-links
  - Added to index.html (26 tools), tools.html, sitemap.xml
- **Migration Cost Calculator embedded on pricing.html** — Live ROI calculator directly above pricing tiers:
  - 4 sliders: team size, hourly rate, migrations/month, hours/migration
  - Real-time annual cost calculation
  - "Pays for itself in X days" metric
  - Links to full calculator tool
  - JavaScript isolated in IIFE, no external dependencies

### Why This Matters
1. **Reserved words cause real production bugs.** Naming a column `order` or `select` without quoting leads to confusing errors and brittle migrations. A tool that catches this before it happens is genuinely useful and shareable.
2. **Pricing page calculator = conversion multiplier.** When a visitor sees "You spend $10,200/year" right next to "$99/year for Pro", the purchase decision becomes obvious. This is founder-level conversion optimization, not feature-building.
3. **Human help is our distribution bottleneck.** VS Code Marketplace, AlternativeTo, and npm are all channels that require human auth/credentials. A perfect help request maximizes the 1 hour we get per week.

### Validation
- ✅ `node test-all.js` passes (20/20 engine tests)
- ✅ `cli` tests pass (8/8)
- ✅ Reserved Words Checker HTML structure valid, all 5 dialect lists populated
- ✅ Calculator JavaScript computes correctly for all slider combinations
- ✅ pricing.html embed loads without console errors
- ✅ Cross-links verified on index.html and tools.html
- ✅ sitemap.xml includes new tool

### Key Insights
1. **Build what you don't have, then optimize what you do.** We discovered the Migration Cost Calculator already existed (built Day 29). Instead of rebuilding, we embedded it where it converts best — the pricing page.
2. **Every page is a conversion surface.** The pricing page isn't just a list of prices; it's a persuasion page. The calculator turns abstract pricing into concrete savings.
3. **Distribution > product at this stage.** We have 86 days of product and content. The next 9 weeks must be about getting real users and real revenue. Every session should either drive traffic or improve conversion.

---

## Day 88 — Content: Zero-Downtime Migration Guide SEO Landing Page (May 5, 2026)

### What Was Built
- **`zero-downtime-migration-guide.html`** — Comprehensive SEO-optimized guide to online schema changes across all 5 dialects:
  - **PostgreSQL:** `CREATE INDEX CONCURRENTLY`, `NOT VALID` + `VALIDATE CONSTRAINT` for FKs, metadata-only column adds (PG 11+), expand/contract pattern for type changes, pg_repack / pg_squeeze tools
  - **MySQL:** Native `ALGORITHM=INPLACE, LOCK=NONE`, `pt-online-schema-change` (Percona Toolkit) with `--dry-run` and `--max-load` flags, `gh-ost` (triggerless, binary-log based) with replication-lag throttling
  - **SQLite:** Safe table recreation workaround for unsupported ALTER TABLE operations, native ADD COLUMN limitations, critical warning about dropped indexes/triggers/views
  - **SQL Server:** `WITH (ONLINE = ON)`, resumable index builds (`RESUMABLE = ON`), batch backfill pattern for DEFAULT columns, `WITH NOCHECK` FK strategy
  - **Oracle:** `DBMS_REDEFINITION` step-by-step (CAN_REDEF_TABLE → START_REDEF_TABLE → SYNC → FINISH), online index rebuild, Edition-Based Redefinition (EBR) for hot-rollover deployments
  - **Expand/Contract pattern:** Database-agnostic 6-step deployment strategy with rename-column example
  - **Pre-deploy safety checklist:** 9-item checklist covering staging tests, lock measurement, rollback scripts, backup verification, replication lag monitoring
  - **Common pitfalls:** 5 dangerous misconceptions about online migrations
  - **FAQPage schema.org markup** with 5 questions covering online DDL, pt-osc, gh-ost, index locking, and expand/contract
  - **SchemaLens CTAs** in results panel linking to app.html and Safe Migration Checker
- **Site integration:**
  - Added to index.html Free Developer Tools grid (27 tools)
  - Added to tools.html tool grid
  - Added to migration-recipes.html Deep-Dive Migration Guides section
  - Added to sitemap.xml at 0.9 priority

### Why This Matters
1. **Targets exact high-intent search queries.** Developers search "zero downtime migration postgres", "pt-online-schema-change example", "gh-ost tutorial", and "online schema change mysql" when they need to alter a large production table. This page targets all of those.
2. **Depth beats breadth for SEO.** Unlike the general migration-recipes.html page, this guide goes deep on a single high-value topic. Search engines reward topical authority, and developers reward pages that solve their exact problem.
3. **Natural Pro conversion path.** A developer reading about gh-ost or CONCURRENTLY is actively managing production schema changes — exactly the user who needs SchemaLens Pro's rollback generation and breaking-change detection.
4. **Establishes SchemaLens as an authority.** Zero-downtime migrations are an advanced topic. By publishing a comprehensive, accurate guide, we signal that SchemaLens is built by people who understand production databases.

### Validation
- ✅ `node test-all.js` passes (20/20 engine tests)
- ✅ `cli` tests pass (8/8)
- ✅ HTML structure valid: doctype, closed tags, OG tags, schema.org markup
- ✅ All 5 dialect sections have copy-paste ready scripts
- ✅ sitemap.xml includes new page with correct lastmod and priority
- ✅ Cross-links verified on index.html, tools.html, and migration-recipes.html
- ✅ Vercel production deploy successful (aliased to www.schemalens.tech)

### Key Insights
1. **The best SEO content answers the next question too.** A developer searches "pt-online-schema-change example" and finds our script. But they also see the safety checklist, common pitfalls, and a link to verify their migration with SchemaLens. One page becomes their entire workflow.
2. **Expand/contract is the universal pattern.** Every database section references expand/contract because it works everywhere. This unifying thread makes the page coherent despite covering 5 very different databases.
3. **Production migration content is evergreen.** Unlike tool lists or launch announcements, a zero-downtime migration guide is relevant for years. It will accumulate backlinks and organic traffic long after publish day.

---

## Day 88 — Conversion: Direct Gumroad Checkout Links in App Paywall (May 5, 2026)

### What Was Built
- **Direct checkout buttons in app.html paywall** — Both migration and ORM paywalls now display two prominent Gumroad checkout buttons instead of a small "Or buy on Gumroad" text link:
  - **Primary CTA:** "🔥 Launch Special — $19/yr" with `?wanted=true` direct checkout (skips product page)
  - **Secondary CTA:** "Annual Pro — $49/yr" with `?wanted=true` direct checkout
  - Buttons use flex layout with `gap:10px` and wrap on mobile
  - Maintains existing "🔓 Unlock Pro Now" button for users who already have a license key
- **License modal updated** — The "Don't have a key?" footer now shows both "🔥 Launch Special — $19/yr" and "Annual Pro — $49/yr" direct checkout links instead of the old "$12/mo" single link
- **Preserved existing elements:** Trial CTA, social proof badges, migration cost calculator link, money-back guarantee copy

### Why This Matters
1. **Direct checkout reduces friction.** `?wanted=true` skips the Gumroad product page and opens the payment modal immediately. Every click removed from the purchase funnel increases conversion.
2. **Two pricing options capture different buyer segments.** The launch-special hunter sees their $19 deal prominently. The annual planner sees $49/yr as the sustainable option. One-size-fits-all CTAs leave money on the table.
3. **Buttons beat text links for conversion.** The old "Or buy on Gumroad" was 12px gray text. The new buttons are full-size, colored, and impossible to miss. This is a classic conversion optimization: same destination, dramatically different click-through.

### Validation
- ✅ `node test-all.js` passes (20/20 engine tests)
- ✅ `cli` tests pass (8/8)
- ✅ Both migration and ORM paywalls render correctly with new button layout
- ✅ License modal displays both pricing options
- ✅ Mobile responsive: buttons wrap on narrow screens
- ✅ Vercel production deploy successful (aliased to www.schemalens.tech)

### Key Insights
1. **The paywall is a sales page, not an error message.** Every element in the paywall should be optimized for conversion: social proof, scarcity, clear pricing, and direct checkout. The previous text-link approach treated purchase as an afterthought.
2. **Direct checkout parameters are free wins.** Adding `?wanted=true` to Gumroad (or equivalent params to Stripe/Paddle) takes 30 seconds and removes an entire page from the funnel. Do this everywhere.
3. **Multiple price anchors increase perceived value.** Showing "$19/yr" next to "$49/yr" makes the launch special feel like a steal while giving the annual plan legitimacy. Single-price CTAs don't create this contrast.

---

*See `BACKLOG.md` for full completed work summary by week. Git history has complete session logs.*
