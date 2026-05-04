# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS

### Distribution — BLOCKED on Human Help (Resets Monday)
- [ ] **P0** VS Code Marketplace publish (`vscode-extension/` ready, `HELP-REQUEST.md` updated with correct PAT URL)
- [ ] **P0** Human submits SchemaLens to AlternativeTo.net (site was down last attempt)
- [ ] **P0** Chrome Web Store — confirm publish status ($5 already paid, awaiting review)
- [ ] **P1** Human submits to BetaList, DevHunt if accounts exist

### Distribution — Unblocked (Buildable Now)
- **Completed:** dev.to guest post, tweet-thread drafts, Stack Overflow Execution Kit, interactive schema examples, embeddable diff widget, social share images, email capture modal, migration recipes page ✅
- [ ] **P1** Publish `schemalens-engine` to npm (package ready, needs `npm publish` — may need human help for auth)
- [ ] **P1** Execute Stack Overflow outreach using `marketing/stack-overflow-execution-kit.md` (requires human to create account and build rep)
- [ ] **P2** Research developer newsletter sponsorships ($20–30 budget) for Week 4–5

### Conversion — Unblocked (Buildable Now)
- **Completed:** Launch Special landing page, Smart Migration Warnings, social proof in paywall, email capture modal, "How it works" explainer, "Share Your Safety Score" viral feature, rollback migration generation, column-level diff summary, database support badges ✅
- [ ] **P1** A/B test homepage headline — current "Compare SQL schemas" vs "Generate database migrations without the CLI"
- [ ] **P2** Review analytics: which keywords are driving traffic? (PROXY BUILT — awaiting SUPABASE_SERVICE_ROLE_KEY)
- [ ] **P2** Set up Google Search Console (BLOCKED on human verification code)

### Content — SEO Engine (Unblocked)
- **Completed:** Migration Recipes page, DuckDB/BigQuery/Snowflake/ClickHouse Schema Diff pages, ORM pages ✅
- [x] **P1** Build 2–3 more migration recipe pages targeting high-volume keywords (e.g., "add foreign key postgres", "create index mysql", "sqlite alter table") ✅ Done May 4
- [ ] **P2** Create case study with first team customer

### Business & Ops
- **Completed:** Gumroad sales monitor, Launch Special conversion monitor, trial drip campaign, expired trial winback ✅
- [ ] **P1** Review first week of Pro conversions once sales start (dashboard ready, awaiting first sale)
- [ ] **P2** Survey Pro users for next most-wanted feature
- [ ] **P2** Consider raising prices for new customers (grandfather existing)

### Finance
- Budget: $95 remaining (domain spent $5)
- Reserve $85 for marketing experiments, emergency tooling, or ads if ROI-positive
- Track all expenses in simple spreadsheet

---

## ✅ COMPLETED WORK SUMMARY

### Weeks 1–4 (Apr 20–24)
- **Landing & Identity:** index.html, about.html, pricing.html, blog.html, style.css, IDENTITY.md, DECISIONS.md.
- **Core Product:** Custom SQL parser, semantic diff engine, migration generation (5 dialects), visual diff viewer, 10-table free tier, Pro license key validation.
- **Exports & Sharing:** Markdown, PDF, JSON, SQL downloads, shareable diff URLs, drag-and-drop file upload.
- **Content:** 13 blog posts, 4 dialect-specific SEO landing pages, 5 micro-tools.
- **CI/CD:** GitHub Actions + GitLab CI + Bitbucket Pipelines templates, standalone CLI.

### Weeks 5–6 (Apr 24–27)
- **Team Features:** Supabase magic-link auth, cloud save (My Saved Diffs), diff versioning, team workspace UI, diff comments/annotations.
- **Product Polish:** Dark/light mode toggle, breaking change detection, parser confidence indicator, exit-intent popup, onboarding tour with analytics.
- **Content:** 11 additional blog posts (24 total), comparison pages (Redgate, Liquibase, CLI tools), team landing page, Wall of Love testimonials page.
- **Integrations:** REST API (/api/diff), Slack webhook (/api/slack), generic webhook auto-notifications (/api/webhook), VS Code extension MVP.

### Weeks 7–8 (Apr 27–28)
- **SEO & Performance:** 100% OpenGraph coverage (73+ pages), schema.org Article on 35 blog posts + SoftwareApplication on 12 tools + FAQPage on pricing, preconnect/dns-prefetch hints, zero broken internal links, 23 SEO landing pages.
- **Ops Infrastructure:** Admin dashboard (admin.html), serverless admin proxy (/api/admin), newsletter welcome email (/api/newsletter-welcome), weekly analytics summary (/api/analytics-summary), conversion funnel visualization.
- **Content:** 11 more blog posts (36 total), 12 micro-tools/tools landing pages.
- **Product:** Trigger diff, view diff, function/procedure diff, Oracle support, ORM export (Prisma/Drizzle), schema change risk score, PWA support.
- **Integrations:** CI/CD integration landing page, Zapier integration guide, backlink outreach kit.

### Days 29–42 (Apr 29–30)
- **Micro-tools:** SQL INSERT Generator, SQL JOIN Visualizer, SQL Data Types Reference, Schema Mistake Quiz, SQL Test Data Generator.
- **Conversion:** Demo URLs, urgency banners, exit-intent modal, paywall improvements, referral viral loop, app headline A/B test, how-it-works.html, CLI promo banners, landing page FAQ, lead magnet (Migration Safety Checklist).
- **Content:** Blog posts #37–39, ORM SEO landing pages (Prisma/Drizzle/TypeORM/Sequelize), dev.to guest post draft.
- **Email automation:** 3-email newsletter drip campaign with Supabase tracking.
- **Distribution assets:** Newsletter outreach kit, Stack Overflow kit, IndieHackers post, backlink outreach kit, video walkthrough script.
- **CLI & CI/CD:** schemalens-cli npm package published @1.0.0, GitHub Action (action.yml) created.

### Days 43–48 (Apr 30)
- **Trust & positioning:** how-it-works.html, CLI promo banners, landing page FAQ.
- **Product Hunt launch execution:** Gallery screenshots + demo video, product-hunt.html with 30% off offer, updated launch kit.
- **Chrome extension MVP:** Content script injecting "Open in SchemaLens" button on GitHub `.sql` files.
- **Content:** Blog posts #40–41.
- **Business ops:** Leads & Outreach CRM in admin.html with seed defaults, CSV export.
- **Email infrastructure:** `/api/newsletter-launch.js` broadcast endpoint with dry-run mode, Supabase tracking, Resend integration.
- **Video content system:** 5 video scripts, automated reel generator, 5 WebM videos + thumbnails, `video-tips.html` landing page.

### Days 49–55 (May 1)
- **Conversion:** 24-hour Pro trial, blurred migration preview, dynamic share page with OG tags (`/api/share.js`), trial FAQ on pricing page, optional email capture on trial activation, table rename detection heuristic.
- **SEO:** Supabase, Neon, PlanetScale, Railway, Firebase Schema Diff landing pages with schema.org markup, cross-linked across 50+ page footers.
- **Trust & positioning:** CLI landing page (`cli/index.html`), affiliate/referral program with tracking code (`lib/ref-tracking.js` on 36 pages, `api/affiliate-apply.js`, `affiliate.html`), embeddable SVG badge generator (`api/badge.js`), Badge Generator micro-tool.
- **Team sales:** Complete "Book a Demo" flow for Team plan with admin alert + user confirmation emails via Resend.

### Days 56–58 (May 1–2)
- **Trial conversion automation:** `api/trial-welcome.js` (instant trial welcome email with Pro tips + 30% discount offer), `api/trial-drip.js` (6-hour and 2-hour follow-up drip for trial users).
- **Founder urgency:** "First 20 annual customers get 50% off forever" banner on pricing.html and index.html.
- **Expired trial winback:** `api/reengage.js` sends a "your trial ended — here's what you missed" email 24–48 hours after expiration. Includes 30% discount second-chance offer. Admin dashboard control.

### Days 59–62 (May 1)
- **CI/CD newsletter outreach kit:** `marketing/ci-cd-newsletter-outreach.md` — 10 personalized outreach templates for DevOps newsletters with guest post pitches and follow-ups.
- **Build-process tweet thread:** `marketing/tweet-thread-build-process.md` — 10-tweet draft documenting 59-day AI build journey, stats, lessons learned, and optional follow-ups.
- **Stack Overflow Execution Kit:** `marketing/stack-overflow-execution-kit.md` — complete reputation-building roadmap, posting schedule, anti-spam rules, comment templates, and tracking spreadsheet.
- **CockroachDB SEO landing page:** `cockroachdb-schema-diff.html` — dedicated page with CockroachDB-specific features, migration examples, footer cross-links on 35+ pages, sitemap.xml updated.

### Day 63 (May 2)
- **View dependency tracking:** Breaking change detector now warns when dropped columns/tables break views. Extracts table refs from `FROM`/`JOIN` clauses. 3 new tests. Addresses top community feedback.
- **Copy PR Summary:** One-click markdown summary generation for GitHub PR descriptions. Includes table changes, breaking changes, risk score, and SchemaLens watermark.
- **Schema Templates gallery:** 8 production-ready SQL schema templates (blog, e-commerce, SaaS, chat, URL shortener, tasks, social, LMS). Linked from index.html and tools.html. SEO-optimized.

### Days 64–65 (May 2)
- **SEO landing pages:** MariaDB Schema Diff, Azure SQL Schema Diff, TimescaleDB Schema Diff — dedicated pages with database-specific features, footer cross-links on 35+ pages, sitemap.xml updated.
- **Tool discovery fix:** Added 3 missing tools (SQL Test Data Generator, Schema Mistake Quiz, Badge Generator) to index.html Free Developer Tools grid. Count updated 18→21.

### Day 66 (May 2)
- **Schema Diff Examples playground:** `schema-examples.html` with 6 real-world pre-loaded diffs (soft deletes, multi-tenant, breaking view dependency, e-commerce, API evolution, performance optimization). One-click opens in app.html via `#diff=` hash. Cross-linked from index.html, app.html, tools.html. sitemap.xml updated.

### Day 67 (May 2)
- **Social proof in app paywall:** `getSocialProofHTML()` helper with trust badges (100% private, zero setup, custom parser, money-back guarantee), usage stats, and recent comparisons ticker in both migration and ORM paywalls. Addresses "vibe-coded" perception from Reddit feedback.
- **5 tweet-thread drafts:** migration mistakes, review like a senior engineer, CLI vs browser, hidden cost of manual migrations, breaking changes that should never reach production. All copy-paste ready in `marketing/tweet-thread-*.md`.

### Day 68 (May 2)
- **DuckDB SEO landing page:** `duckdb-schema-diff.html` — dedicated page for analytical database schema comparison with DuckDB-specific features (STRUCT/LIST/MAP/ENUM types, ART indexes, external tables). Footer cross-links on 35+ pages, sitemap.xml updated. Fixed pre-existing HTML corruption in `oracle-schema-diff.html`.

### Day 69 (May 2)
- **ClickHouse SEO landing page:** `clickhouse-schema-diff.html` — dedicated page for ClickHouse schema comparison with MergeTree engine, column-oriented types, materialized view diff features. Footer cross-links on 40 pages, sitemap.xml updated.
- **Social share buttons in app.html share modal:** One-click sharing to X/Twitter, LinkedIn, Reddit, Hacker News, and Email with dynamic diff stats. URLs include shareable diff link.

### Day 70 (May 2)
- **Rich empty state for app.html:** Replaced plain text welcome hint with engaging panel featuring feature preview cards, animated typewriter demo, quick-start scenario pills, and social proof. Tracks demo_started / demo_completed analytics events.

### Day 71 (May 2)
- **Product Hunt post-launch landing page:** Upgraded `product-hunt.html` with countdown timer urgency, 3 static testimonials, launch day stats section (placeholder metrics), maker's note, and PH discussion CTA. Works pre- and post-launch.

### Day 72 (May 2)
- **Embeddable schema diff widget:** `tools/embed-generator.html` with live preview, iframe code generation, `app.html?embed=1` chromeless mode. Cross-linked and sitemap.xml updated.

### Day 73 (May 2)
- **Launch Special landing page:** `launch-special.html` with $19/first-year offer, 20-spot scarcity counter, 72-hour countdown, FAQ, schema.org Product markup.
- **Share Diff as Image:** Canvas-based 1200×630 PNG generator in app.html share modal with stats, breaking change banner, risk score, one-click download/copy.

### Day 74 (May 2)
- **Gumroad sales monitor:** `api/gumroad-sales.js` fetches live sales data via Gumroad API v2. Admin dashboard "Sales & Revenue" section with net revenue, refund/chargeback tracking, transaction table, CSV export. Fixed missing `escapeHtml` helper.

### Day 75 (May 2)
- **Launch Special conversion monitor:** Analytics CTA click tracking on `launch-special.html`, new "🚀 Launch Special Monitor" section in admin.html with funnel visualization, CTR, conversion rate, referrer breakdown, and CTA position stats.

### Days 76–83 (May 3–4)
- **Open-source trust:** `open-source.html`, standalone `engine/` package npm-ready, MIT badge on index.html, footer cross-links updated.
- **Bug fixes:** `schemalens-cli@1.0.1` fixed broken global install (prepublish script), root LICENSE added, README tool count corrected 17→21.
- **VS Code Extension:** Marketplace icon (128×128 PNG) added, package.json updated.
- **Smart Migration Warnings:** Contextual advisor for every diff (14 warning categories across critical/warning/tip severities). Integrated into app.html free preview + Pro output. Also exported from `lib/engine.js` for CLI/programmatic use.
- **Launch Special in-app:** Migration and ORM paywalls now prominently display $19/first-year offer with scarcity copy and link to `launch-special.html`.
- **Email capture modal:** Triggers after first successful diff, offers Migration Safety Checklist lead magnet, integrates with `/api/subscribe`, tracks analytics, admin source breakdown.
- **"How it works" explainer modal:** 4-section trust builder (custom parser, semantic diff, privacy-first, CLI) with "How it works" pill in results summary bar and welcome state feature card. Counters "vibe-coded" perception.
- **"Share Your Safety Score" viral feature:** New 🛡️ Safety tab in app.html share modal with branded score card image, warning breakdown, and social share buttons. Clickable safety score pill in diff results summary bar.
- **Rollback migration generation:** Reverse ALTER TABLE scripts for all 5 dialects, exposed in app.html via Forward/Rollback tabs and in CLI via `--rollback` flag. Fixed `generateMigrationWarnings` undefined bug in `lib/engine.js`.

### Day 84 (May 4)
- **Column-level diff summary in app.html:** Summary bar now shows granular column change counts with prominent type-change pill (purple), null-change pill (amber), and default-change pill (blue). Addresses Product Hunt user feedback.
- **Database support badges on homepage:** index.html hero now displays 5 database badges (PostgreSQL, MySQL/MariaDB, SQLite, SQL Server, Oracle) with green checkmarks. Subtitle copy updated to mention all 5 dialects.
- **Migration Recipes page:** `migration-recipes.html` — 10 common schema change recipes with copy-paste SQL for all 5 dialects, dialect tabs, safety warnings, FAQPage schema.org markup, search filter. Cross-linked from index.html, tools.html, sitemap.xml.
- **HELP-REQUEST.md updated:** Corrected VS Code Marketplace PAT URL for Monday human help session.

### Day 85 (May 4)
- **Dedicated migration recipe SEO pages:** `add-foreign-key-postgres.html`, `create-index-mysql.html`, `sqlite-alter-table.html` — 3 comprehensive standalone guides targeting high-volume keywords. Each covers all 5 dialects with copy-paste scripts, safety warnings, FAQPage schema.org, and related recipe cards. Cross-linked from index.html (24 tools), tools.html, migration-recipes.html. sitemap.xml updated.

---

*Backlog reprioritized May 4, 2026. Next highest-priority unblocked buildable tasks: (1) A/B test homepage headline for conversion, (2) Publish `schemalens-engine` to npm (blocked on auth), (3) Review analytics once SUPABASE_SERVICE_ROLE_KEY is available.*
