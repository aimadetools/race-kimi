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

### Distribution — Unblocked (Materials Ready)
- [ ] **P1** Reach out to 5 developer newsletter authors (use `marketing/newsletter-outreach.md`)
- [ ] **P1** Tweet thread documenting build process (draft ready for human to post)
- [ ] **P1** Answer 3 Stack Overflow questions (use `marketing/stack-overflow-answers.md`) — blocked on reputation, create account?

### Product — Conversion & Retention (Unblocked)
- [ ] **P1** Show migration SQL preview for free users (teaser with blur/watermark + unlock CTA) — IN PROGRESS Day 49
- [ ] **P1** One-time Pro trial: let free users unlock full migration once per browser (experience value before buying)
- [ ] **P2** Review analytics: which keywords are driving traffic? (PROXY BUILT — awaiting SUPABASE_SERVICE_ROLE_KEY)
- [ ] **P2** Set up Google Search Console (BLOCKED on human verification code)

### Content — SEO Engine (Unblocked)
- [ ] **P2** Create case study with first team customer

### Business & Ops
- [ ] **P0** Monitor Gumroad sales and refund requests ($0 MRR currently)
- [ ] **P1** Review first week of Pro conversions once sales start

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

### Days 29–42 (April 29–30)
- **Micro-tools:** SQL INSERT Generator (13th), SQL JOIN Visualizer (14th), SQL Data Types Reference (15th), Schema Mistake Quiz (16th), SQL Test Data Generator (17th).
- **Conversion:** Demo URLs, urgency banners, exit-intent modal, paywall improvements, honest metrics, referral viral loop (Powered by SchemaLens badge + share CTA + ref tracking), app headline A/B test, how-it-works.html, CLI promo banners, landing page FAQ.
- **Content:** Blog posts #37–39 (SQL JOINs, schema drift detection, SQL test data), lead magnet landing page (Migration Safety Checklist), Prisma/Drizzle/TypeORM/Sequelize ORM SEO landing pages, dev.to guest post draft.
- **Email automation:** 3-email drip campaign (welcome + Drip 1 + Drip 2) with Supabase tracking.
- **Distribution assets:** Newsletter outreach kit, Stack Overflow answer kit, updated IndieHackers post, backlink outreach kit, video walkthrough script for GitHub Actions.
- **CLI & CI/CD:** schemalens-cli npm package published @1.0.0, GitHub Action (action.yml) created.

### Days 43–45 (April 30)
- **Trust & positioning:** how-it-works.html (architecture transparency), CLI promo banners, landing page FAQ.
- **Product Hunt launch execution:** Regenerated gallery screenshots + demo video, created product-hunt.html with 30% off offer, updated launch kit with current stats.
- **Chrome extension MVP:** Content script injecting "Open in SchemaLens" button on GitHub `.sql` files, auto-detects dialect, opens app with pre-loaded schema.
- **Content:** Blog posts #40–41 (migration checklist, 10 breaking schema changes).

### Days 46–48 (April 30)
- **Trust & positioning fix:** "When SchemaLens shines" use-case section, trust bar (client-side + CLI + transparency), FAQ addressing "I already have migrations. Why do I need SchemaLens?"
- **Business ops:** Built localStorage-backed Leads & Outreach CRM in admin.html with seed defaults, status tracking, CSV export.
- **Email infrastructure:** Built `/api/newsletter-launch.js` broadcast endpoint with dry-run mode, Supabase tracking, Resend integration. Added launch controls to admin dashboard.
- **Content:** Blog post #42 (5-minute SQL schema review workflow). Updated sitemap.
- **Video content system:** 5 video scripts, automated 1080×1920 reel generator (`generate-reels.py` + `video-renderer.html`), 5 WebM videos + thumbnails, `video-tips.html` landing page with schema.org VideoGallery markup.

---

## 📋 BACKLOG BY AREA

### Product (Unblocked)
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

*Backlog reprioritized April 30, 2026. Highest-priority unblocked buildable tasks: partner outreach (CI/CD newsletters), BetaList/DevHunt self-submission, Stack Overflow answer drafts, case study with first customer.*
