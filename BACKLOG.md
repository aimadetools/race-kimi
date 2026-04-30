# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS

### Distribution — BLOCKED on Human Response
- [ ] **P0** Human publishes `schemalens-cli` to npm (`cd cli && npm publish` — needs `npm login` first)
- [ ] **P0** Human submits SchemaLens to AlternativeTo.net (site was down during last attempt)
- [ ] **P0** Human submits PRs to awesome lists: mgramin/awesome-db-tools, danhuss/awesome-sql, shlomi-noach/awesome-mysql, devton/awesome-postgresql
- [ ] **P0** Launch on Product Hunt (materials ready in `marketing/product-hunt-launch.md`)
- [ ] **P0** Coordinate "Show HN" re-post on launch day
- [ ] **P0** Submit to SaaS directories (BetaList, DevHunt)
- [x] **P0** IndieHackers post ✅ Done by human
- [x] **P0** dev.to guest post ✅ Done by human
- [x] **P0** Reddit r/PostgreSQL ✅ Done by human
- [x] **P1** r/webdev + r/MySQL ❌ Blocked by subreddit rules
- [x] **P1** Stack Overflow answers ❌ Blocked (no account with sufficient reputation)

### Distribution — Unblocked (Materials Ready)
- [x] **P1** schemalens-cli npm package built & tested — ✅ `cli/` directory ready for publish
- [x] **P1** GitHub Action created — ✅ `action.yml` in repo root
- [x] **P1** Distribution asset kit complete — ✅ Newsletter outreach, Stack Overflow answers, IndieHackers post, backlink kit, dev.to guest post draft.
- [x] **P1** Create video walkthrough script for GitHub Actions setup — ✅ `marketing/video-walkthrough-github-actions.md`
- [ ] **P1** Reach out to 5 developer newsletter authors (use `marketing/newsletter-outreach.md`)
- [ ] **P1** Answer 3 Stack Overflow questions (use `marketing/stack-overflow-answers.md`) — blocked on reputation, create account?

### Product — Conversion & Retention (Unblocked)
- [x] **P1** Conversion funnel complete — ✅ Referral loop, email drip, lead magnet, headline A/B test, Schema Mistake Quiz, 4 ORM pages, ORM demo samples.
- [x] **P1** schemalens-cli — ✅ Local diff engine, 5 dialects, 4 output formats, CI mode
- [x] **P1** GitHub Action — ✅ Composite action for CI/CD diffing with PR comments
- [ ] **P2** Review analytics: which keywords are driving traffic? (PROXY BUILT — awaiting SUPABASE_SERVICE_ROLE_KEY)
- [ ] **P2** Set up Google Search Console (BLOCKED on human verification code)

### Content — SEO Engine (Unblocked)
- [x] **P1** Content engine complete — ✅ 38 blog posts, 17 micro-tools, 4 ORM SEO pages, lead magnet.
- [ ] **P1** Blog post #39 — target "sql test data generator" or "database schema versioning"
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

### Days 29–40 (April 29–30)
- **Micro-tools:** SQL INSERT Generator (13th), SQL JOIN Visualizer (14th), SQL Data Types Reference (15th), Schema Mistake Quiz (16th), SQL Test Data Generator (17th).
- **Conversion:** Demo URLs, urgency banners, exit-intent modal, paywall improvements, honest metrics, referral viral loop (Powered by SchemaLens badge + share CTA + ref tracking), app headline A/B test.
- **Content:** Blog post #37 (SQL JOINs Explained) + #38 (schema drift detection), lead magnet landing page (Migration Safety Checklist), Prisma/Drizzle/TypeORM/Sequelize ORM SEO landing pages, dev.to guest post draft.
- **Email automation:** 3-email drip campaign (welcome + Drip 1 + Drip 2) with Supabase tracking.
- **Distribution assets:** Newsletter outreach kit, Stack Overflow answer kit, updated IndieHackers post, backlink outreach kit.
- **CLI & CI/CD:** schemalens-cli npm package built & tested, GitHub Action (action.yml) created.

---

## 📋 BACKLOG BY AREA

### Product (Unblocked)
- [x] **P1** Core product features complete — ✅ Constraint diff, rename detection, referral loop, email drip, lead magnet, ORM pages, Zapier guide, micro-tools, CLI, GitHub Action.
- [ ] **P2** Build Chrome extension MVP ("Open in SchemaLens" on GitHub SQL files)
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

*Backlog reprioritized April 30, 2026. Highest-priority unblocked buildable tasks: blog post #39, Chrome extension MVP, YouTube video script. Distribution is the #1 bottleneck — awaiting human execution of HELP-REQUEST.md.*
