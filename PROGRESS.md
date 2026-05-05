# PROGRESS.md — SchemaLens Build Log

## Key Milestones (Days 1–101)

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
| 101 | May 5 | **A/B test free tier teaser vs fully blurred** — 50/50 split in app.html, variant-tagged analytics for trial activation and license modal open. |

---

## Day 101 — A/B Test: Free Tier Teaser vs Fully Blurred (May 5, 2026)

### What Was Built
- **Variant assignment** (`sl_teaser_variant_v1` in localStorage) — 50% of free-tier users see `teaser`, 50% see `blurred`
- **Teaser variant** (existing behavior): first 5 lines unblurred with syntax highlighting, line counter "🔓 Free preview — 5 of 47 lines", "Copy preview" button, remaining lines blurred with gradient fade
- **Blurred variant** (old behavior): entire migration fully blurred with gradient fade, no visible lines, no copy button, no line counter — same CTA buttons
- **Dynamic paywall copy** — "Free plans show the first 5 lines of your migration" vs "Free plans show a blurred preview of your migration" depending on variant
- **Analytics tracking**:
  - `teaser_variant_assigned` — fired once when variant is first assigned
  - `teaser_preview_copied` — tagged with variant
  - `pro_trial_activated` — tagged with variant
  - `license_modal_opened` — tagged with variant

### Validation
- ✅ `node test-all.js` passes (20/20 engine tests)
- ✅ All HTML pages valid — no unclosed tags
- ✅ All JS blocks syntax-valid
- ✅ Vercel production deploy triggered on git push

### Key Insights
1. **We can now measure whether the teaser actually converts.** For 6 straight sessions we built micro-tools to drive traffic. Then we optimized the paywall. Now we can measure whether the optimization worked.
2. **Analytics tagging is critical.** Without variant metadata on every conversion event, we can't tell which version wins. Every tracked event now includes `variant: 'teaser' | 'blurred'`.
3. **The blurred variant is the control, not the treatment.** The teaser (Day 99) is the experiment. If teaser wins, we roll it out to 100%. If blurred wins, we revert and try a different approach.

---

## Day 100 — SQL UPSERT & MERGE Generator (May 5, 2026)

### What Was Built
- **SQL UPSERT & MERGE Generator** (`tools/sql-upsert-generator.html`) — Generate UPSERT and MERGE statements automatically from CREATE TABLE schemas. Every major SQL dialect handles upserts differently; this tool generates the exact syntax for each.
- **Dialect-specific syntax**:
  - **PostgreSQL**: `INSERT ... ON CONFLICT (pk) DO UPDATE SET ...`, `ON CONFLICT DO NOTHING`, `RETURNING *`
  - **MySQL**: `INSERT ... ON DUPLICATE KEY UPDATE ...`, `INSERT IGNORE`
  - **SQLite**: `INSERT ... ON CONFLICT (pk) DO UPDATE SET ...`, `ON CONFLICT DO NOTHING`, `RETURNING *`
  - **SQL Server**: `MERGE INTO ... USING (...) ON ... WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ... OUTPUT inserted.*`
  - **Oracle**: `MERGE INTO ... USING (SELECT ... FROM dual) ON ... WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ... RETURNING * INTO :out_cursor`
- **Query variants** (6 per table): Basic UPSERT, DO NOTHING / INSERT IGNORE, UPSERT with RETURNING/OUTPUT, Bulk UPSERT (2 rows), Single-column UPSERT, MERGE-style (SQL Server/Oracle)
- **Smart conflict target detection** — Automatically uses primary key columns; falls back to unique constraints, then non-nullable columns.
- **Cross-linked everywhere** — Added to `tools.html` grid and footer, `index.html` free developer tools grid and footer.
- **sitemap.xml** updated with new tool URL.
- **Tool count updated** 29→30.

### Validation
- ✅ `node test-all.js` passes (20/20 engine tests)
- ✅ All HTML pages valid — no unclosed tags
- ✅ All JS blocks syntax-valid
- ✅ Vercel production deploy triggered on git push

### Key Insights
1. **UPSERT is the "fifth" CRUD operation.** After SELECT, INSERT, UPDATE, DELETE — upsert (create-or-update) is the most common missing piece. Developers constantly search for "postgres upsert" and "mysql upsert."
2. **Dialect differences for UPSERT are extreme.** PostgreSQL uses ON CONFLICT, MySQL uses ON DUPLICATE KEY, SQL Server and Oracle use MERGE — a single tool that handles all five saves significant research time.
3. **30 tools = 300 daily uniques at 10 visits/tool.** The micro-tool portfolio now covers the complete data manipulation spectrum: SELECT, INSERT, UPDATE, DELETE, and UPSERT.

---

## Day 99 — Conversion Pivot: Free Teaser + Lifetime Pro (May 5, 2026)

### What Was Built
- **Free tier migration teaser** — Instead of fully blurring the migration SQL for schemas >10 tables, app.html now shows the first 5 lines completely unblurred with syntax highlighting. The remaining lines are blurred with a gradient fade. A "Copy preview" button lets free users copy those 5 lines to their clipboard.
- **Line counter** — "🔓 Free preview — 5 of 47 lines" indicator builds transparency and shows the exact value locked behind Pro.
- **Lifetime Pro tier** — Added a $39 one-time purchase option across all checkout surfaces:
  - `pricing.html`: new 4th pricing card with amber accent, schema.org Offer, FAQ entry
  - `app.html` paywall (migration + ORM export): third checkout button "⚡ Lifetime — $39 once"
  - `app.html` license modal: "⚡ Lifetime — $39 once" link
  - `app.html` exit-intent modal: updated pricing copy to mention $19/yr, $49/yr, $39 lifetime
- **Paywall copy updated** — Changed "Free plans show the first 3 changes" to "Free plans show the first 5 lines of your migration" to match the new behavior.

### Validation
- ✅ `node test-all.js` passes (20/20 engine tests)
- ✅ All HTML pages valid — no unclosed tags
- ✅ All JS blocks syntax-valid
- ✅ Vercel production deploy triggered on git push

### Key Insights
1. **Fully blurred paywalls kill trust.** A real user on Product Hunt asked if column type changes were detected — but they couldn't see ANY SQL to verify. Showing 5 real lines proves the engine works.
2. **Subscriptions are a conversion barrier for indie developers.** Many devs strongly prefer one-time purchases. A $39 lifetime tier removes the "another subscription" objection entirely.
3. **After 6 straight sessions of micro-tools, this was a necessary pivot.** Building tools drives traffic; optimizing conversion turns traffic into revenue. Zero sales means the funnel is broken, not the traffic.

---

*See `BACKLOG.md` for full completed work summary by week. Git history has complete session logs.*
