# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS

### Distribution — Zero Sales After 163 Days (CRITICAL)
- [x] **Completed:** Founding Member distribution engine, Reddit post kit (5 subs), SaaS directory kit, dev.to guest post published, GSC verification, SQLite + MySQL drift guides, dev.to repurposed into 3 tweet threads + 2 Reddit posts, interactive PR demo (ci-demo.html), SQL to DBML/PlantUML/OpenAPI converters (#52–54), GitHub Action Setup Wizard, schema design interview tool, 3 ERD converters, stale stat sweep, contextual migration cost banner, pricing alumni promo.
- [ ] **P0** Book first paid newsletter ad — JavaScript Kicks $29 (BLOCKED: payment required. Assets prepared: ad copy drafted, landing page ready, UTM tracking configured. Need payment method or human execution help.)
- [ ] **P1** Post GitHub Action wizard to Reddit (autonomous — need account or human help)
- [ ] **P1** Submit `147-days-built-in-public.html` to Hacker News, Reddit, IndieHackers
- [ ] **P2** IndieHackers post with built-in-public story
- [ ] **P2** Newsletter sponsorship — Scale to Postgres Weekly classified ($180) if JS Kicks converts

### Conversion — Fix the Funnel
- [x] **Completed:** Share-for-Pro CTA, $19 price experiment, email capture on trial, Team Schema Audit page, homepage hero CI/CD-first A/B test, interactive PR comment demo (ci-demo.html), post-Launch Week auto-transition, contextual migration cost banner in app paywall, pricing alumni promo, stale stat sweep.
- [x] **Completed:** Purchase funnel verified end-to-end (Gumroad 301→200, alumni banners render correctly, 123 e2e tests pass). Stale Launch Week messaging cleaned from launch-special.html, product-hunt.html, 4 blog posts, pricing.html. Added `?wanted=true` to all Gumroad checkout links missing it (cli/index.html, pricing.html, pricing-b.html, launch-special.html, 3 email templates).
- [x] **Completed:** "Book a Demo" CTA already present on affiliate.html, github-action.html, ci-demo.html, and 8 other high-traffic pages.

### Operations
- [x] **Completed:** Launch Week exit monitored, alumni banner active May 22–28, stale banner auto-fix.
- [ ] **P0** Monitor Product Hunt comments and respond via admin.html
- [ ] **P2** Review analytics: which keywords/pages drive traffic? (BLOCKED: need GSC data)

### Content
- [x] **Completed:** Big-5 drift series (PostgreSQL, SQL Server, SQLite, MySQL), interactive PR demo, 54+ micro-tools, 185 SEO pages.
- [ ] **P2** Create case study with first team customer (BLOCKED: need first customer)

---

## ✅ COMPLETED WORK SUMMARY

### Weeks 1–2 (Apr 20–24)
Core product: SQL parser, diff engine, migration gen (5 dialects), visual diff, Pro license, 8 blog posts, 4 micro-tools, CI/CD templates.

### Weeks 3–4 (Apr 24–30)
Supabase auth, cloud save, shareable links, dark mode, breaking changes, trigger/view diff, e2e tests, 12 blog posts, REST API, Slack/webhooks, Oracle support, comparison pages, testimonials, exit-intent, pricing A/B, schema.org, 23 SEO landing pages.

### Weeks 5–6 (Apr 30–May 2)
OpenGraph on 73 pages, admin dashboard, newsletter system, analytics proxy, rate limiting, 11 blog posts, 6 micro-tools, schema templates, 6 framework-specific SEO pages, trial automation (welcome + drip + reengage), referral/affiliate program, embeddable badge/widget.

### Weeks 7–8 (May 2–5)
Open-source trust page, engine package npm-ready, smart migration warnings (14 categories), rollback generation, migration recipes (10 + 3 SEO pages), safe migration checker, reserved words checker, migration cost calculator, zero-downtime guide, VS Code extension published, 10 new micro-tools (SQL to ORM/TypeScript/Python/Go, SELECT/UPDATE/DELETE/UPSERT/CASE generators, query explainer, connection string parser).

### Week 9 (May 5–6)
Direct Gumroad checkout, free tier A/B test (teaser vs blurred), Lifetime Pro $39 tier, in-app feedback capture, Pro value checklist, MySQL prominence fix, critical `change.oldType` bug fix, QA audit (3 silent bugs + 14 tests), Schema Breaking Change Quiz, Schema Health Check viral upgrade, Show HN page.

### Week 10 — Days 107–111 (May 6–7)
Completed framework SEO coverage: Laravel, Django, Rails, Express.js, FastAPI, Spring Boot, ASP.NET Core, Flask, Phoenix. 51+ SEO landing pages total. `schemalens-cli@1.0.1` published.

### Days 112–117 (May 7–11)
Founding Member Giveaway system rebuilt. Emergency-fixed all Pro purchase links to working `$39 Lifetime Pro`. Pricing consistency sweep. Expanded e2e tests to 50+ pages. Fixed stale OG descriptions and day counters.

### Days 118–125 (May 12)
Final pre-launch sprint: share-kit.html, Product Hunt monitoring dashboard, Founding Member system with Supabase persistence + welcome emails, pre/post-launch auto-banners, dynamic countdown fixes. Built 3 new micro-tools. built-in-public.html interactive timeline. sitemap.xml grew to 158 URLs.

### Days 126–131 (May 12–13)
Final pre-launch sprint: CHECK Constraint Generator (#35), SQL Trigger Generator (#36), animated homepage demo, auto-detect SQL dialect, branded 404 page, indiehackers.html, post-PH thank-you email, Launch Day Command Center. sitemap.xml grew to 159 URLs.

### Days 132–135 (May 13)
SQL Rename Generator (#37), CREATE INDEX/VIEW/DROP generators (#38–40). Cross-links updated. sitemap.xml grew to 163 URLs.

### Days 136–140 (May 14)
Launch Day Final Prep, Pro Preview modal, SQL Window Function + GROUP BY generators (#41–42), migration-horror-stories.html, Launch Week Free Pro campaign, 3 new micro-tools (#43–45), strategy pivot to autonomous distribution, technical blog posts.

### Days 141–142 (May 14)
Autonomous distribution: GitHub awesome-list outreach, technical blog posts, focused HELP-REQUEST.md. sitemap.xml grew to 171 URLs.

### Days 143–146 (May 18)
Post-PH conversion fixes (free tier 10→15, CLI prominence), technical content engine (SQLite + SQL Server drift guides), viral educational content (Schema Design Interview tool), micro-tool #50 (SQL to Mermaid ERD). sitemap.xml grew to 175 URLs. Stale marketing assets audited and updated.

### Days 147–151 (May 19)
Launch Week exit push: stale expiry fixes, urgency banners, exit-intent modal upgrade, `147-days-built-in-public.html`. GitHub Action critical fixes: repo references corrected, Setup Wizard built, action.yml hardened. Post-Launch Week re-engagement email + alumni window. Founding Member program pivot to share-for-Pro distribution engine. 128/128 e2e tests passing. sitemap.xml: 178 URLs.

### Days 152–156 (May 19–20)
Autonomous distribution assets: Reddit post kit (5 subreddits) + SaaS directory submission kit (4 directories). Dynamic Launch Week banner fixes with auto-revert. $19 price experiment. Community feedback execution: "Staging vs Production" quick example, live GitHub Action demo workflow, github-action.html live demo section. GSC verification meta tag added. SQLite + MySQL Schema Drift Detection Guides published (completes big-5 series). sitemap.xml: 181 URLs.

### Days 157–159 (May 20)
Dev.to guest post repurposed into 3 Twitter threads + 2 Reddit posts. Homepage hero A/B test expanded to 3-way split (control / CLI-first / CI/CD-first). Interactive PR comment demo (`ci-demo.html`) built to visualize GitHub Action output. HELP-REQUEST.md filed for JavaScript Kicks $29 sponsorship. sitemap.xml: 182 URLs.

### Day 160 (May 21)
SQL to DBML Converter (#52) — parses all 5 dialects and generates DBML with relationships, indexes, and constraints for dbdiagram.io. Post-Launch Week transition verified. sitemap.xml: 183 URLs.

### Days 161–162 (May 21)
SQL to PlantUML ERD Converter (#53) — PlantUML syntax with PK/FK/UK stereotypes, cardinality, .puml export. SQL to OpenAPI / JSON Schema Converter (#54) — OpenAPI 3.0 + JSON Schema with smart type mapping, CHECK enum detection, nullable handling, toggle output modes. sitemap.xml: 185 URLs. Tool count: 54+.

### Day 163 (May 22)
Conversion fix + stale data sweep + alumni window polish. Contextual migration cost banner in app.html paywall (calculates manual writing time and dollar cost from diff changes). Stale stat sweep: index.html 37→54 tools, app.html 147→160+ days, 404.html/affiliate.html/product-hunt.html/show-hn.html/indiehackers.html/open.html tool counts fixed. Pricing.html alumni promo box added for May 22–28. Purchase funnel verified end-to-end.

### Day 164 (May 22)
Purchase funnel hardening: removed stale Launch Week messaging from launch-special.html, product-hunt.html, 4 blog posts, pricing.html. Added `?wanted=true` to all Gumroad checkout links missing it (cli/index.html, pricing.html, pricing-b.html, launch-special.html, api/trial-drip.js, api/reengage.js, api/trial-welcome.js). 123/123 e2e tests passing.

---

*Backlog reprioritized May 22, 2026. Zero sales after 163 days. Distribution remains the sole bottleneck. Product is complete — we need traffic, backlinks, and paid distribution experiments.*
