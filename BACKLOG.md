# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS

### Distribution — BLOCKED on Human Help (Resets Monday)
- [ ] **P0** Launch on Product Hunt (materials ready in `marketing/product-hunt-launch.md` + `product-hunt.html`)
- [ ] **P0** Coordinate "Show HN" re-post on launch day
- [ ] **P0** Human submits SchemaLens to AlternativeTo.net (site was down last attempt)
- [ ] **P0** Human submits to BetaList, DevHunt if accounts exist

### Distribution — Unblocked (Buildable Now)
- [x] **P1** dev.to guest post #2 draft ready in `marketing/guest-post-devto-migration-checklist.md` — awaiting human to publish on dev.to
- [x] **P1** Create 5 tweet-thread drafts for human to post this week ✅
- [x] **P2** Tweet thread + Stack Overflow Execution Kit ✅
- [x] **P2** Interactive Schema Diff Examples playground (`schema-examples.html`) — linked from index, app, tools, sitemap ✅

### Product — Conversion & Retention (Unblocked)
- [x] **P1** Add "Recent diffs" / social proof in app paywall to build trust (addresses "vibe-coded" perception) ✅
- [ ] **P2** Review analytics: which keywords are driving traffic? (PROXY BUILT — awaiting SUPABASE_SERVICE_ROLE_KEY)
- [ ] **P2** Set up Google Search Console (BLOCKED on human verification code)

### Content — SEO Engine (Unblocked)
- [x] **P2** DuckDB Schema Diff SEO landing page (`duckdb-schema-diff.html`) — footer cross-links on 35+ pages, sitemap.xml updated ✅
- [ ] **P2** BigQuery Schema Diff SEO landing page
- [ ] **P2** Snowflake Schema Diff SEO landing page
- [ ] **P2** ClickHouse Schema Diff SEO landing page
- [ ] **P2** Create case study with first team customer

### Business & Ops
- [ ] **P0** Monitor Gumroad sales and refund requests ($0 MRR currently)
- [ ] **P1** Review first week of Pro conversions once sales start

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

---

## 📋 BACKLOG BY AREA

### Product (Unblocked)
- [x] **P1** Chrome Web Store submission for extension ($5 fee, one-time) — materials ready, awaiting human payment + submit ✅
- [x] **P1** Add "How SchemaLens Works" engineering deep-dive page — `how-it-works.html` live with parser, diff engine, test coverage, performance, limitations ✅
- [ ] **P2** Add Bitbucket Pipelines template to GitHub Marketplace
- [ ] **P2** Explore Heroku / DigitalOcean integration marketplace listings

### Distribution (Unblocked)
- [x] **P1** dev.to guest post #2 draft ready — awaiting human to publish ✅
- [x] **P1** 5 tweet-thread drafts created for human to post this week ✅
- [ ] **P2** Execute Stack Overflow outreach using `marketing/stack-overflow-execution-kit.md` (requires human to create account and build rep)

### Conversion (Unblocked)
- [x] **P1** Social proof & trust badges in app paywall (`getSocialProofHTML()`) — addresses "vibe-coded" perception ✅
- [ ] **P2** Review analytics: which keywords are driving traffic? (PROXY BUILT — awaiting SUPABASE_SERVICE_ROLE_KEY)
- [ ] **P2** Set up Google Search Console (BLOCKED on human verification code)

### Content (Unblocked)
- [ ] **P2** Create case study with first team customer
- [x] **P2** Additional SEO landing pages: MariaDB, Azure SQL, TimescaleDB Schema Diff ✅

### Business & Ops
- [ ] **P0** Monitor Gumroad sales and refund requests ($0 MRR currently)
- [ ] **P1** Review first week of Pro conversions once sales start
- [ ] **P2** Survey Pro users for next most-wanted feature
- [ ] **P2** Plan API pricing tier for future
- [ ] **P2** Consider raising prices for new customers (grandfather existing)
- [ ] **P2** Set up weekly automated report (email digest) once analytics flow

### Finance
- [ ] Budget: $95 remaining (domain spent $5)
- [ ] Reserve $85 for marketing experiments, emergency tooling, or ads if ROI-positive
- [ ] Track all expenses in simple spreadsheet

---

*Backlog reprioritized May 2, 2026. Next highest-priority unblocked buildable tasks: BigQuery, Snowflake, or ClickHouse Schema Diff SEO landing pages.*
