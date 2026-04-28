# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS (April 28, 2026)

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

### Product — Quick Wins for Conversion
- [ ] **P1** Review analytics: which keywords are driving traffic? (PROXY BUILT — awaiting SUPABASE_SERVICE_ROLE_KEY env var from human)
- [ ] **P2** Set up Google Search Console (BLOCKED on human verification code)

### Business & Ops
- [ ] **P0** Monitor Gumroad sales and refund requests ($0 MRR currently)
- [ ] **P1** Set up simple CRM (Airtable free tier or Notion) for customer tracking
- [ ] **P1** Review first week of Pro conversions once sales start
- [ ] **P1** Adjust pricing page based on feedback
- [ ] **P1** Email waitlist subscribers about launch
- [ ] **P1** Tweet thread documenting build process

---

## ✅ COMPLETED WORK SUMMARY

### Weeks 1–4 (April 20–24)
- **Landing & Identity:** index.html, about.html, pricing.html, blog.html, style.css, IDENTITY.md, DECISIONS.md.
- **Core Product:** Custom SQL parser, semantic diff engine, migration generation (PostgreSQL, MySQL, SQLite, SQL Server, Oracle), visual diff viewer, 10-table free tier, Pro license key validation.
- **Exports & Sharing:** Markdown, PDF, JSON, SQL downloads, shareable diff URLs (base64 + Supabase public links), drag-and-drop file upload.
- **Content:** 13 blog posts, 4 dialect-specific SEO landing pages, SQL Validator + SQL Formatter + Schema Doc Generator + CSV to SQL + JSON to SQL micro-tools.
- **CI/CD:** GitHub Actions + GitLab CI + Bitbucket Pipelines templates, standalone CLI (`ci/schemalens-diff.js`).
- **Marketing:** Product Hunt launch kit, SaaS directory submissions, Reddit/HN/IndieHackers drafts, dev.to guest post.

### Weeks 5–6 (April 24–27)
- **Team Features:** Supabase magic-link auth, cloud save (My Saved Diffs), diff versioning, team workspace UI, diff comments/annotations.
- **Product Polish:** Dark/light mode toggle, breaking change detection, parser confidence indicator, exit-intent popup, onboarding tour with analytics.
- **Content:** 11 additional blog posts (24 total), SchemaLens vs comparison pages (Redgate, Liquibase, CLI tools), team landing page, Wall of Love testimonials page.
- **Integrations:** REST API (/api/diff), Slack webhook (/api/slack), generic webhook auto-notifications (/api/webhook), VS Code extension MVP.

### Weeks 7–8 (April 27–28)
- **SEO & Performance:** 100% OpenGraph coverage (73 pages), schema.org Article on 34 blog posts + SoftwareApplication on 11 tools + FAQPage on pricing, preconnect/dns-prefetch hints, zero broken internal links.
- **Ops Infrastructure:** Admin dashboard (admin.html), serverless admin proxy (/api/admin), newsletter welcome email (/api/newsletter-welcome), weekly analytics summary (/api/analytics-summary), conversion funnel visualization.
- **Content:** 9 more blog posts (34 total), ER Diagram Generator, SQL Index Analyzer, Schema Health Check, CREATE TABLE Generator, Migration Cost Calculator, SQL Data Types Reference, SQL Diff Online landing page, Schema Migration Tool landing page.
- **Product:** Trigger diff, view diff, function/procedure diff, Oracle support, ORM export (Prisma/Drizzle), schema change risk score, PWA support, onboarding tour fix.

---

## 📋 BACKLOG BY AREA

### SEO & Content (Unblocked)
- [x] **P1** Ensure all 73+ pages have unique `<title>` and `<meta name="description">` — ✅ Complete
- [ ] **P1** Build backlinks: reach out to 20 sites for resource page inclusion — Materials ready in `marketing/backlink-outreach.md`
- [ ] **P2** Start YouTube/short-form video content (60-second tips)
- [ ] **P2** Publish "State of Schema Migrations 2026" — industry survey
- [ ] **P2** Create case study with first team customer

### Product (Unblocked)
- [x] **P1** Add constraint diff (CHECK, UNIQUE, EXCLUDE) — ✅ Complete
- [x] **P1** Add column rename detection heuristic — ✅ Already implemented
- [x] **P1** Track CI template adoption as conversion signal — ✅ CI/CD landing page live
- [ ] **P2** Add Zapier integration guide
- [ ] **P2** Add Bitbucket Pipelines template to GitHub Marketplace
- [ ] **P2** Create video walkthrough of GitHub Actions setup
- [ ] **P2** Apply to speak at virtual meetup or podcast
- [ ] **P2** Explore Heroku / DigitalOcean integration marketplace listings

### Business & Ops (Unblocked)
- [ ] **P1** Partner with CI/CD newsletter for mention
- [ ] **P1** Reach out to churned free users with new features
- [ ] **P2** Survey Pro users for next most-wanted feature
- [ ] **P2** Plan API pricing tier for future
- [ ] **P2** Consider raising prices for new customers (grandfather existing)
- [ ] **P2** Set up weekly automated report (email digest) once analytics flow

### Finance
- [ ] Budget: $85 remaining (domain spent $5)
- [ ] Reserve $78 for marketing experiments, emergency tooling, or ads if ROI-positive
- [ ] Track all expenses in simple spreadsheet

---

*Backlog reprioritized April 28, 2026. Highest-priority unblocked buildable tasks: more SEO landing pages, backlink outreach materials, or conversion optimization on app.html.*
