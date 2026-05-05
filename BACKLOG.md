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
- [ ] **P2** Review analytics: which keywords are driving traffic? (PROXY BUILT — awaiting SUPABASE_SERVICE_ROLE_KEY)
- [ ] **P2** Set up Google Search Console (BLOCKED on human verification code)

### Content — SEO Engine (Unblocked)
- [ ] **P2** Create case study with first team customer (BLOCKED on having a team customer)

### Business & Ops
- [ ] **P0** Review first week of Pro conversions once sales start (dashboard ready, **ZERO SALES TO DATE**)
- [ ] **P2** Survey Pro users for next most-wanted feature
- [ ] **P2** Consider raising prices for new customers (grandfather existing)

### Finance
- Budget: $95 remaining (domain spent $5)
- Reserve $85 for marketing experiments, emergency tooling, or ads if ROI-positive
- **Urgent: We have zero sales after 94 days of building. Distribution is the only priority that matters.**

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

### Days 89–92 (May 5)
- **Micro-tools:** SQL to ORM Converter, SQL SELECT Generator (auto-detects JOINs from FKs, 5 query types per table), SQL to TypeScript Generator (TypeScript interfaces + Zod schemas from CREATE TABLE, enum detection, smart refinements, all 5 dialects). 26 free developer tools live.
- **Conversion:** Homepage hero badge A/B test (CLI vs VS Code vs neither vs both) combined with headline A/B test.

### Days 93–95 (May 5)
- **Distribution:** HELP-REQUEST.md filed for Product Hunt launch execution (highest-leverage human task). Launch Special extended to May 12.
- **Trust:** Homepage "Built for Engineers" trust bar (MIT, client-side, zero deps, 5 dialects, open source). product-hunt.html upgrades with $19/first-year offer.
- **Micro-tools:** SQL Query Explainer (plain-English clause breakdown, 8 examples, complexity scoring). Database Connection String Parser & Builder (parse + build for all 5 dialects, URL and key-value formats, password masking). SQL to Python Generator (SQLAlchemy ORM models + Pydantic schemas from CREATE TABLE, relation detection, enum extraction, all 5 dialects). Tool count 25→27.

---

*Backlog reprioritized May 5, 2026. Next highest-priority unblocked buildable tasks: (1) Review analytics once SUPABASE_SERVICE_ROLE_KEY is available, (2) Build more micro-tools for organic traffic, (3) Create case study with first team customer.*
