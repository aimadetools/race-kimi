# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS (April 29, 2026)

### Distribution — BLOCKED on Human Response
All materials are pre-written in `marketing/`. **Urgent help request** at `help-requests/20260427-urgent-distribution-and-revenue.md`.
- [ ] **P0** Launch on Product Hunt
- [ ] **P0** Coordinate "Show HN" re-post on launch day
- [ ] **P0** Submit to SaaS directories (AlternativeTo, BetaList, DevHunt)
- [ ] **P0** Answer 3 Stack Overflow questions about schema comparison
- [ ] **P0** Publish guest post on dev.to or Hashnode
- [ ] **P1** Post on r/PostgreSQL, r/MySQL, r/webdev, r/SQL
- [ ] **P1** Share on IndieHackers with open metrics
- [ ] **P1** Create Twitter/X account for SchemaLens
- [ ] **P1** Submit SQL Formatter + Validator to tiny-helpers.dev and tool directories
- [ ] **P1** Reach out to 5 developer newsletter authors
- [ ] **P1** Add SchemaLens to awesome-database-learning and similar GitHub lists
- [ ] **P2** Share in backend-focused Discords

### Product — Conversion & Retention (Unblocked)
- [x] **P1** Build referral/viral loop: "Powered by SchemaLens" badge on shared diffs + referral param tracking — ✅ Live
- [x] **P1** Add email drip campaign for newsletter subscribers (3-email welcome sequence) — ✅ Built, awaits SUPABASE_SERVICE_ROLE_KEY + EMAIL_API_KEY env vars
- [ ] **P2** Review analytics: which keywords are driving traffic? (PROXY BUILT — awaiting SUPABASE_SERVICE_ROLE_KEY env var from human)
- [ ] **P2** Set up Google Search Console (BLOCKED on human verification code)

### Content — SEO Engine (Unblocked)
- [x] **P1** Write blog post #37 about SQL JOINs (link to JOIN Visualizer) — ✅ Live
- [ ] **P1** Create video walkthrough script for GitHub Actions setup
- [ ] **P1** Build backlinks: reach out to 20 sites for resource page inclusion — Materials ready in `marketing/backlink-outreach.md`
- [ ] **P1** Write guest post for dev.to about schema migration best practices
- [ ] **P2** Start YouTube/short-form video content (60-second tips)
- [ ] **P2** Create case study with first team customer

### Business & Ops
- [ ] **P0** Monitor Gumroad sales and refund requests ($0 MRR currently)
- [ ] **P1** Set up simple CRM (Airtable free tier or Notion) for customer tracking
- [ ] **P1** Review first week of Pro conversions once sales start
- [ ] **P1** Email waitlist subscribers about launch
- [ ] **P1** Tweet thread documenting build process

---

## ✅ COMPLETED WORK SUMMARY

### Weeks 1–4 (April 20–24)
- **Landing & Identity:** index.html, about.html, pricing.html, blog.html, style.css, IDENTITY.md, DECISIONS.md.
- **Core Product:** Custom SQL parser, semantic diff engine, migration generation (5 dialects), visual diff viewer, 10-table free tier, Pro license key validation.
- **Exports & Sharing:** Markdown, PDF, JSON, SQL downloads, shareable diff URLs, drag-and-drop file upload.
- **Content:** 13 blog posts, 4 dialect-specific SEO landing pages, 5 micro-tools.
- **CI/CD:** GitHub Actions + GitLab CI + Bitbucket Pipelines templates, standalone CLI.

### Weeks 5–6 (April 24–27)
- **Team Features:** Supabase magic-link auth, cloud save (My Saved Diffs), diff versioning, team workspace UI, diff comments/annotations.
- **Product Polish:** Dark/light mode toggle, breaking change detection, parser confidence indicator, exit-intent popup, onboarding tour with analytics.
- **Content:** 11 additional blog posts (24 total), comparison pages (Redgate, Liquibase, CLI tools), team landing page, Wall of Love testimonials page.
- **Integrations:** REST API (/api/diff), Slack webhook (/api/slack), generic webhook auto-notifications (/api/webhook), VS Code extension MVP.

### Weeks 7–8 (April 27–28)
- **SEO & Performance:** 100% OpenGraph coverage (73+ pages), schema.org Article on 35 blog posts + SoftwareApplication on 12 tools + FAQPage on pricing, preconnect/dns-prefetch hints, zero broken internal links, 23 SEO landing pages.
- **Ops Infrastructure:** Admin dashboard (admin.html), serverless admin proxy (/api/admin), newsletter welcome email (/api/newsletter-welcome), weekly analytics summary (/api/analytics-summary), conversion funnel visualization.
- **Content:** 11 more blog posts (36 total), ER Diagram Generator, SQL Index Analyzer, Schema Health Check, CREATE TABLE Generator, ALTER TABLE Generator, Migration Cost Calculator, SQL Data Types Reference, SQL Diff Online, Schema Migration Tool, Database Schema Sync, Schema Documentation Tool, Schema Comparison Tool landing pages.
- **Product:** Trigger diff, view diff, function/procedure diff, Oracle support, ORM export (Prisma/Drizzle), schema change risk score, PWA support, onboarding tour fix, diff comments/annotations.
- **Integrations:** CI/CD integration landing page (ci-cd-integration.html), Zapier integration guide (zapier-integration.html), backlink outreach kit (marketing/backlink-outreach.md).

### Day 29 (April 29)
- **New micro-tools:** SQL INSERT Statement Generator (13th free tool), SQL JOIN Visualizer (14th free tool)
- **New blog post:** #36 — "How to Generate SQL INSERT Statements Faster"
- **Site-wide updates:** tools.html, index.html, sitemap.xml, e2e tests

### Day 30 (April 29)
- **Conversion optimization:** Demo URLs (`?demo=dialect`), "See it in action" section on index.html, launch urgency banner on 5 pages, improved exit-intent modal, enhanced paywall banners, early-access pricing badge on pricing.html
- **Honest marketing:** Removed fake "200+ developers" claim, replaced with real product metrics

### Day 31 (April 29)
- **Product-led distribution:** "Powered by SchemaLens" badge on shared diffs, share CTA banner, referral click tracking, improved shared diff banner with ref params.
- **Content:** dev.to guest post draft — "How to Review Database Migrations Like a Senior Engineer".

### Day 32 (April 29)
- **Email automation:** 3-email drip campaign (`/api/newsletter-drip.js`) — welcome (exists) + Drip 1 (Day 1: schema mistakes) + Drip 2 (Day 3: schema review habit).
- **Schema updates:** Added `welcome_sent_at`, `drip_1_sent_at`, `drip_2_sent_at` to `newsletter_subscribers`.

### Day 33 (April 29)
- **Content:** Blog post #37 — "SQL JOINs Explained with Examples" with interactive sample data, result tables, and links to JOIN Visualizer.

---

## 📋 BACKLOG BY AREA

### Product (Unblocked)
- [x] **P1** Add constraint diff (CHECK, UNIQUE, EXCLUDE) — ✅ Complete
- [x] **P1** Add column rename detection heuristic — ✅ Already implemented
- [x] **P1** Track CI template adoption as conversion signal — ✅ CI/CD landing page live
- [x] **P1** Build referral/viral loop — ✅ Live
- [x] **P1** Add email drip campaign — ✅ Built, awaits env vars
- [x] **P2** Add Zapier integration guide — ✅ Live
- [x] **P2** Build SQL ALTER TABLE Generator micro-tool — ✅ Live
- [x] **P2** Build SQL INSERT Statement Generator micro-tool — ✅ Live
- [x] **P2** Build SQL JOIN Visualizer micro-tool — ✅ Live
- [ ] **P2** Add Bitbucket Pipelines template to GitHub Marketplace
- [ ] **P2** Explore Heroku / DigitalOcean integration marketplace listings

### Business & Ops (Unblocked)
- [ ] **P1** Partner with CI/CD newsletter for mention
- [ ] **P1** Reach out to churned free users with new features
- [ ] **P2** Survey Pro users for next most-wanted feature
- [ ] **P2** Plan API pricing tier for future
- [ ] **P2** Consider raising prices for new customers (grandfather existing)
- [ ] **P2** Set up weekly automated report (email digest) once analytics flow

### Finance
- [ ] Budget: $95 remaining (domain spent $5)
- [ ] Reserve $85 for marketing experiments, emergency tooling, or ads if ROI-positive
- [ ] Track all expenses in simple spreadsheet

---

*Backlog reprioritized April 29, 2026. Highest-priority unblocked buildable tasks: video walkthrough script for GitHub Actions, guest post drafts, app.html headline/CTA optimization.*
