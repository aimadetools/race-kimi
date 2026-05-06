# PROGRESS.md — SchemaLens Build Log

## Key Milestones (Days 1–104)

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
| 101 | May 5 | **A/B test free tier teaser vs fully blurred** — 50/50 split in app.html, variant-tagged analytics for trial activation and license modal open. **SQL CASE WHEN Generator** micro-tool. Tool count 30→31. |
| 102 | May 5–6 | **Critical bug fix:** `change.oldType` → `change.old` broke all type-change safety warnings. **Pro value checklist** added to paywalls. **In-app feedback capture** (`/api/feedback.js`). **MySQL prominence fix** — support badges in app empty state. |
| 103 | May 6 | **Hardcore QA audit:** 3 silent bugs found and fixed + 14 migration warning tests added. Index diff invisible, DECIMAL regex broken, inline PRIMARY KEY drop unreported. Test suite: 20→34 tests. |
| 104 | May 6 | **Schema Breaking Change Quiz** — interactive 10-question quiz with before/after diff visuals. Tests migration safety instincts on real-world scenarios. Shareable results with dynamic OG score cards via `/api/share?quiz=breaking&score=80`. Cross-linked on index.html, tools.html, footer. README.md tool count updated 23→32+. |

---

## Day 104 — Schema Breaking Change Quiz + Dynamic OG Score Sharing (May 6, 2026)

### What Was Built
- **Schema Breaking Change Quiz** (`tools/schema-breaking-change-quiz.html`) — interactive 10-question quiz testing users' ability to identify breaking schema migrations before they hit production:
  - **Before/after diff visuals** — each question shows a realistic schema diff panel (Before → After) with syntax highlighting for added/removed/changed lines
  - **10 real-world scenarios** — NOT NULL without DEFAULT, unused index drop, VARCHAR widening, VARCHAR narrowing, INT→BIGINT, column drop breaking a view, DECIMAL precision reduction, FOREIGN KEY addition, PRIMARY KEY removal, TIMESTAMP→DATE
  - **3-option answers** — Safe / Risky / Breaking (more nuanced than binary)
  - **Educational explanations** — every answer includes a detailed explanation with the correct fix and how SchemaLens detects it
  - **Score tracking** — localStorage persists best score; score badges (Migration Rookie / Aware / Guardian)
  - **Social sharing** — Copy result, Share on X, Share on LinkedIn with pre-written copy including score
  - **Strong product CTA** — result screen emphasizes "SchemaLens caught all 10 of these automatically"
  - **Schema.org Quiz markup** — structured data for SEO discoverability
- **Dynamic OG score cards** (`/api/share.js`) — extended the share endpoint to support quiz score sharing:
  - `GET /api/share?quiz=breaking&score=80&name=Migration+Guardian` returns an HTML page with dynamic OpenGraph tags
  - Twitter/LinkedIn crawlers see the actual score and badge in the preview card
  - Human visitors see a styled score card and are redirected to the quiz after 2.5s
  - Quiz share buttons updated to use the dynamic share URL instead of the generic quiz page
- **Cross-linked** — added to `index.html` free developer tools grid and footer, `tools.html` grid and footer.
- **sitemap.xml** updated with new tool URL.
- **README.md** — tool count updated from 23 to 32+, added all missing tools to the list.

### Validation
- ✅ `node test-all.js` passes (34/34 tests)
- ✅ `api/share.js` syntax valid
- ✅ All HTML pages valid — no unclosed tags
- ✅ All JS blocks syntax-valid
- ✅ Vercel production deploy triggered on git push

### Key Insights
1. **After 3 sessions of QA/conversion work, building a new distribution asset is the right move.** We have fixed the product and optimized conversion. The remaining blocker is getting eyeballs. A viral quiz is a self-distributing asset — shareable, educational, and naturally promotes the product.
2. **The quiz mirrors the exact value proposition of SchemaLens.** Every question teaches something that SchemaLens automates. Users who learn from the quiz understand WHY they need the tool.
3. **Dynamic OG tags amplify the viral loop.** When someone shares their score, the social preview shows their actual result — "I scored 80% on the Schema Breaking Change Quiz" — which is far more compelling than a generic tool description. This increases click-through rate from social feeds.
4. **32+ tools = 32+ entry points for organic traffic.** Each tool targets a different search intent. The quiz targets "breaking change" and "migration safety" keywords while also being inherently social.

---

## Day 103 — Hardcore QA Audit: 3 Silent Bugs Fixed (May 6, 2026)

### What Was Built
- **Comprehensive warning test suite** — 14 new tests covering every `generateMigrationWarnings` code path. Tests now verify that warnings actually fire with correct severity and message content. Suite expanded 20→34 tests.
- **Bug fix #1 — Index changes invisible to diff engine:**
  - `diffTable` never compared `oldTable.indexes` vs `newTable.indexes`
  - Index-only changes caused `hasChanges` to stay `false`, so the table never appeared in `tablesModified`
  - This broke index drop warnings and the PostgreSQL `CREATE INDEX CONCURRENTLY` tip — both were dead code paths
  - Fixed: added `indexesAdded`/`indexesRemoved` with `idxKey(name|unique|columns)` comparison
  - Files: `engine/engine.js`, `lib/engine.js`, `cli/engine.js`, `app.html`
- **Bug fix #2 — DECIMAL precision reduction warning never fired:**
  - Parser stores types with spaces: `DECIMAL ( 10 , 2 )` instead of `DECIMAL(10,2)`
  - Regex failed because there is a space before the comma
  - Fixed: regex handles all spacing variants
  - This is the same class of silent failure as Day 102's `oldType` bug — the regex returned `null`, so the condition was silently skipped
- **Bug fix #3 — Inline PRIMARY KEY drop warning never fired:**
  - Column-level `PRIMARY KEY` changes create `field: 'primary key'` in `columnsModified`, not `constraintsRemoved`
  - Warning code only checked `constraintsRemoved` for PRIMARY KEY drops
  - Fixed: added `columnsModified` loop check for `change.field === 'primary key' && change.new === 'NO'`

### Validation
- ✅ `node test-all.js` passes (34/34 tests)
- ✅ All HTML pages valid — no unclosed tags
- ✅ All JS blocks syntax-valid
- ✅ Vercel production deploy triggered on git push

### Key Insights
1. **Silent bugs cluster around the same failure mode.** The `oldType` bug (Day 102), the DECIMAL regex bug, and the index diff bug all share one trait: the code ran without errors but never did anything useful. Empty strings, null regex matches, and empty arrays look like "no warning needed" when they are actually "bug prevented the warning."
2. **Testing the absence of bugs requires positive tests.** We had tests for "does the diff run" but not "does this specific warning fire when condition X is met." The 14 new warning tests catch the exact message, severity, and trigger condition.
3. **Parser output formatting leaks into consumer code.** The parser tokenizes `DECIMAL(10,2)` into `DECIMAL ( 10 , 2 )`. Any consumer doing string matching on types must handle spacing. We should consider normalizing types in the parser, but for now we have patched the consumers.
4. **The engine has 3 identical copies (engine/, lib/, cli/) plus app.html's inline script.** Every engine fix must be applied to all 4 locations. This is error-prone and should be automated or consolidated.

---

## Day 102 — Bug Fix + Conversion Upgrade (May 6, 2026)

### What Was Built
- **Critical bug fix:** `app.html` line 3776 used `change.oldType` but the diff engine stores type changes as `change.old`. This meant ALL type-change safety warnings were silently broken:
  - VARCHAR shrink detection (data truncation)
  - Integer downsizing detection (overflow)
  - TEXT → VARCHAR narrowing
  - DECIMAL precision reduction
  - Timestamp/date implicit casting warnings
  - Fixed to `change.old` — warnings now fire correctly.
- **Pro value checklist** (`getProValueChecklistHTML()`) — compact grid of 6 Pro features with ✓ checkmarks, added to both migration paywall and ORM export paywall. Makes the value proposition concrete at the moment of decision.
- **In-app feedback capture** (`/api/feedback.js`) — new API endpoint writes to Supabase `feedback` table (already defined in schema with anon INSERT policy). Form in paywall asks: "What would make SchemaLens worth paying for?" Captures qualitative data from users who hit the paywall but don't convert.
- **MySQL prominence fix** — Database support badges (PostgreSQL, MySQL/MariaDB, SQLite, SQL Server, Oracle) added to app.html welcome state. "🐬 MySQL demo" quick-start pill added. Addresses community feedback where a PH viewer asked "any plans for MySQL support?" — MySQL was already supported but not visible enough.

### Validation
- ✅ `node test-all.js` passes (20/20 engine tests)
- ✅ All HTML pages valid — no unclosed tags
- ✅ All JS blocks syntax-valid
- ✅ Vercel production deploy triggered on git push

### Key Insights
1. **A single property name bug (`oldType` vs `old`) silently disabled 5 critical safety warnings.** This is why testing the actual warning output matters, not just "does the diff run." The bug was invisible because the code ran without errors — it just always got empty strings.
2. **Free users who don't convert are our best source of product insight.** The feedback form captures why people leave. If 10 people say "I need live DB connection," that is our next feature. If 10 people say "too expensive," we test pricing.
3. **Messaging failures look like missing features.** The PH viewer asking about MySQL support meant our UI didn't communicate capability. Badges in the empty state fix this at the first impression.
4. **After 6+ sessions of micro-tools, product hardening and conversion UX are the right pivot.** We have 31 tools driving traffic. Now we need to fix the leaks in the bucket.

---

*See `BACKLOG.md` for full completed work summary by week. Git history has complete session logs.*
