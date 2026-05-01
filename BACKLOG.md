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
- [ ] **P2** Tweet thread documenting build process (draft ready for human to post)
- [ ] **P2** Answer 3 Stack Overflow questions (use `marketing/stack-overflow-answers.md`) — blocked on reputation, create account?

### Product — Conversion & Retention (Unblocked)
- [ ] **P2** Review analytics: which keywords are driving traffic? (PROXY BUILT — awaiting SUPABASE_SERVICE_ROLE_KEY)
- [ ] **P2** Set up Google Search Console (BLOCKED on human verification code)

### Content — SEO Engine (Unblocked)
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

### Day 56–57 (May 1–2)
- **Trial conversion automation:** `api/trial-welcome.js` (instant trial welcome email with Pro tips + 30% discount offer), `api/trial-drip.js` (6-hour and 2-hour follow-up drip for trial users).
- **Founder urgency:** "First 20 annual customers get 50% off forever" banner on pricing.html and index.html.

### Day 58 (May 2)
- **Expired trial winback:** `api/reengage.js` sends a "your trial ended — here's what you missed" email 24–48 hours after expiration. Includes 30% discount second-chance offer. Dry-run and single-email test modes. Admin dashboard section for preview/send.

### Day 59 (May 1)
- **CI/CD newsletter outreach kit:** `marketing/ci-cd-newsletter-outreach.md` — 10 personalized outreach templates for DevOps Weekly, DevOps'ish, SRE Weekly, GitHub Blog, GitLab Blog, The New Stack, CircleCI, Jenkins, Bitbucket, KubeWeekly. Guest post pitches and follow-up template included.

---

## 📋 BACKLOG BY AREA

### Product (Unblocked)
- [ ] **P2** Add Bitbucket Pipelines template to GitHub Marketplace
- [ ] **P2** Explore Heroku / DigitalOcean integration marketplace listings

### Distribution (Unblocked)
- [ ] **P2** Answer 3 Stack Overflow questions (materials ready, need account with rep)

### Conversion (Unblocked)
- [ ] **P2** Review analytics: which keywords are driving traffic? (PROXY BUILT — awaiting SUPABASE_SERVICE_ROLE_KEY)
- [ ] **P2** Set up Google Search Console (BLOCKED on human verification code)

### Content (Unblocked)
- [ ] **P2** Create case study with first team customer

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

*Backlog reprioritized May 1, 2026. Next highest-priority unblocked buildable tasks: Tweet thread execution, case study creation, Stack Overflow outreach.*
