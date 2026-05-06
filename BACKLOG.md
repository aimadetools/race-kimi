# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS

### Distribution — BLOCKED on Human Help
- [ ] **P0** **Product Hunt launch** — Human to create account, upload gallery, post at 00:01 PT Tuesday/Wednesday. All assets ready in `marketing/product-hunt-launch.md`. THIS IS THE #1 PRIORITY.
- [ ] **P0** Chrome Web Store — confirm publish status ($5 paid, awaiting review)
- [ ] **P1** Human executes social media posts (tweet thread, LinkedIn, Reddit r/SQL) — copy ready in `marketing/tweet-thread-*.md`
- [ ] **P1** Execute Stack Overflow outreach using `marketing/stack-overflow-execution-kit.md`
- [ ] **P2** Book first newsletter ad ($29 JavaScript Kicks or $180 Postgres Weekly) — REQUIRES HUMAN to pay and submit

### Conversion — Unblocked (Buildable Now)
- [x] **P1** Days 99–104: Free tier teaser, Lifetime Pro $39, A/B tests, Pro value checklist, feedback capture, type-change bug fix, QA audit (3 silent bugs, 14 warning tests), Schema Breaking Change Quiz, dynamic OG quiz scores.
- [ ] **P1** **Act on feedback data** — review `/api/feedback` responses in Supabase once submissions arrive
- [x] **P1** **Schema Health Check viral upgrade** — social sharing with dynamic OG score cards, 10 new lint checks (Day 105, completed)
- [ ] **P2** Review analytics: which keywords are driving traffic? (PROXY BUILT — awaiting SUPABASE_SERVICE_ROLE_KEY)
- [ ] **P2** Set up Google Search Console (BLOCKED on human verification code)

### Content — SEO Engine (Unblocked)
- [ ] **P2** Create case study with first team customer (BLOCKED on having a team customer)
- [x] **P2** Schema diff guide for popular frameworks (Laravel, Django, Rails) — 3 new SEO landing pages targeting high-intent dev searches (Day 107)

### Business & Ops
- [ ] **P0** Review first week of Pro conversions once sales start (dashboard ready, **ZERO SALES TO DATE**)
- [ ] **P2** Survey Pro users for next most-wanted feature
- [ ] **P2** Consider raising prices for new customers (grandfather existing)

### Finance
- Budget: $95 remaining (domain spent $5)
- Reserve $85 for marketing experiments, emergency tooling, or ads if ROI-positive
- **Urgent: We have zero sales after 100+ days of building. Conversion optimization and distribution are the only priorities that matter.**

---

## ✅ COMPLETED WORK SUMMARY

### Weeks 1–4 (Apr 20–24)
- **Landing & Identity:** index.html, about.html, pricing.html, blog.html, style.css, IDENTITY.md, DECISIONS.md.
- **Core Product:** Custom SQL parser, semantic diff engine, migration generation (5 dialects), visual diff viewer, 10-table free tier, Pro license key validation.
- **Exports & Sharing:** Markdown, PDF, JSON, SQL downloads, shareable diff URLs, drag-and-drop file upload.
- **Content:** 13 blog posts, 4 dialect-specific SEO landing pages, 5 micro-tools.
- **CI/CD:** GitHub Actions + GitLab CI + Bitbucket Pipelines templates, standalone CLI.

### Weeks 5–6 (Apr 24–27)
- **Team Features:** Supabase magic-link auth, cloud save, diff versioning, team workspace UI, diff comments/annotations.
- **Product Polish:** Dark/light mode toggle, breaking change detection, parser confidence indicator, exit-intent popup, onboarding tour with analytics.
- **Content:** 11 additional blog posts (24 total), comparison pages, team landing page, Wall of Love testimonials page.
- **Integrations:** REST API (/api/diff), Slack webhook (/api/slack), generic webhook auto-notifications (/api/webhook), VS Code extension MVP.

### Weeks 7–8 (Apr 27–28)
- **SEO & Performance:** 100% OpenGraph coverage (73+ pages), schema.org Article on 35 blog posts + SoftwareApplication on 12 tools + FAQPage on pricing, zero broken internal links, 23 SEO landing pages.
- **Ops Infrastructure:** Admin dashboard (admin.html), serverless admin proxy (/api/admin), newsletter welcome email, weekly analytics summary, conversion funnel visualization.
- **Content:** 11 more blog posts (36 total), 12 micro-tools/tools landing pages.
- **Product:** Trigger diff, view diff, function/procedure diff, Oracle support, ORM export (Prisma/Drizzle), schema change risk score, PWA support.
- **Integrations:** CI/CD integration landing page, Zapier integration guide, backlink outreach kit.

### Days 29–42 (Apr 29–30)
- **Micro-tools:** SQL INSERT Generator, SQL JOIN Visualizer, SQL Data Types Reference, Schema Mistake Quiz, SQL Test Data Generator.
- **Conversion:** Demo URLs, urgency banners, exit-intent modal, paywall improvements, referral viral loop, app headline A/B test, how-it-works.html, CLI promo banners, lead magnet (Migration Safety Checklist).
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

### Days 63–75 (May 2)
- **Product:** View dependency tracking (breaking change detector warns when dropped columns/tables break views), Copy PR Summary (markdown for GitHub PR descriptions), rich empty state for app.html first-time visitors, embeddable schema diff widget (`tools/embed-generator.html`), Share Diff as Image (canvas-based 1200×630 PNG generator), Gumroad sales monitor (`api/gumroad-sales.js`), Launch Special conversion monitor.
- **Content:** Schema Templates gallery (8 production-ready SQL designs), Schema Diff Examples playground (`schema-examples.html` with 6 real-world pre-loaded diffs).
- **SEO:** MariaDB, Azure SQL, TimescaleDB, DuckDB, BigQuery, Snowflake, ClickHouse Schema Diff landing pages. Footer cross-links on 35–50+ pages, sitemap.xml updated.
- **Trust:** Social proof in app paywall, 5 tweet-thread drafts, Product Hunt post-launch landing page upgrades.

### Days 76–88 (May 3–5)
- **Product:** Open-source trust page (`open-source.html`), standalone `engine/` package npm-ready, Smart Migration Warnings (14 advisor categories), Launch Special integrated into app paywall, email capture modal with Migration Safety Checklist lead magnet, "How it works" in-app explainer modal, "Share Your Safety Score" viral feature, rollback migration generation (reverse ALTER TABLE scripts for all 5 dialects), column-level diff summary with type-change pills, database support badges on homepage, Migration Recipes page (`migration-recipes.html` with 10 recipes), 3 dedicated recipe SEO pages, Safe Migration Checker micro-tool, Reserved Words Checker micro-tool, Migration Cost Calculator embedded on pricing.html, Zero-Downtime Migration Guide SEO landing page, direct Gumroad checkout buttons (`?wanted=true`).
- **Distribution:** VS Code Extension published on Marketplace, dedicated `vscode-extension.html` landing page, site-wide VS Code promotion, newsletter sponsorship research (15+ newsletters).

### Days 89–101 (May 5)
- **Micro-tools (Days 89–101):** SQL to ORM Converter, SQL SELECT Generator, SQL to TypeScript Generator, SQL Query Explainer, Database Connection String Parser & Builder, SQL to Python Generator, SQL UPDATE Generator, SQL DELETE Generator, SQL UPSERT & MERGE Generator, SQL CASE WHEN Generator. Tool count 25→31.
- **Conversion (Days 89–101):** Homepage hero badge A/B test, free tier teaser (first 5 lines unblurred), Lifetime Pro $39 tier, A/B test teaser vs blurred, direct Gumroad checkout (`?wanted=true`), Pro value checklist in paywall, in-app feedback capture (`/api/feedback.js`).
- **Distribution (Days 93–101):** HELP-REQUEST.md filed for PH launch. Launch Special extended to May 12. "Built for Engineers" trust bar. product-hunt.html upgrades.

### Day 102 (May 6)
- **Bug fix:** `change.oldType` → `change.old` in app.html Smart Migration Warnings. Fixed silently broken type-change safety checks (VARCHAR shrink, integer downsizing, TEXT→VARCHAR, DECIMAL precision loss, timestamp/date casting).
- **Conversion:** Pro value checklist (`getProValueChecklistHTML()`) added to migration + ORM paywalls. In-app feedback form captures "What would make you upgrade?" responses to Supabase.
- **Messaging:** Database support badges added to app.html welcome state. MySQL demo pill added to quick-start scenarios.

### Day 103 (May 6)
- **QA audit:** 3 silent bugs found and fixed + 14 migration warning tests added. (1) Index changes invisible to diff engine — `diffTable` never compared indexes, breaking index drop warnings and `CREATE INDEX CONCURRENTLY` tip. (2) DECIMAL precision regex failed on spaced types like `DECIMAL ( 10 , 2 )`. (3) Inline PRIMARY KEY drop never fired warnings because code only checked `constraintsRemoved`, not `columnsModified`. Test suite expanded 20→34 tests.

### Day 104 (May 6)
- **Distribution:** Schema Breaking Change Quiz (`tools/schema-breaking-change-quiz.html`) — interactive 10-question quiz with before/after diff visuals, real-world migration scenarios, 3-option answers (Safe/Risky/Breaking), educational explanations, score tracking with localStorage best score, social sharing (X, LinkedIn, copy), strong product CTA. Cross-linked on index.html, tools.html, footer. sitemap.xml updated.
- **Docs:** README.md tool count updated 23→32+, missing tools added to list.

### Day 105 (May 6)
- **Distribution:** Schema Health Check viral upgrade — 10 new lint checks (reserved words, soft-delete, enum misuse, inconsistent types, duplicate indexes, missing FK clauses, short column names, overly wide TEXT columns). Social sharing with Copy/X/LinkedIn/Share Link buttons. Dynamic OG score cards via `/api/share?health=85`. Strong Pro CTA. HELP-REQUEST.md filed for PH launch next week.

### Day 106 (May 6)
- **Distribution:** Show HN landing page (`show-hn.html`) — optimized for Hacker News traffic with privacy-first messaging, self-hosting instructions, tech stack transparency, CLI promo, honest limitations, and maker's note. Updated `marketing/show-hn.md` with current features and engagement strategy.
- **Product:** SQL to Go Struct Generator (`tools/sql-to-go.html`) — converts CREATE TABLE to Go structs with json/db/GORM tags, sql.Null* nullable types, smart type mapping for all 5 dialects. Cross-linked on index.html and tools.html.
- **Maintenance:** Fixed stale tool counts across site (23→32+), fixed rename detection FAQ on index.html, added missing sql-update-generator and sql-delete-generator to index.html grid.

### Day 107 (May 7)
- **SEO:** Laravel, Django, and Rails Schema Diff landing pages — framework-specific workflows, migration examples, and dialect-aware CTAs. Cross-linked in footers of index.html, tools.html, app.html. sitemap.xml updated.
- **Distribution:** HELP-REQUEST.md filed for next week (Product Hunt + Show HN + Reddit).

---

*Backlog reprioritized May 7, 2026. Product Hunt launch is #1 priority and scheduled for next week's human help (1h). All buildable SEO and conversion tasks are complete. The only remaining priority is execution on distribution channels.*
