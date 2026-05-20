# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS

### Distribution — Zero Sales After 151 Days (CRITICAL)
- [x] **P0** Make Founding Member program a distribution engine — require share/tweet/post in exchange for free Pro
- [x] **P0** Promote Founding Member program prominently in app paywall, exit-intent, homepage, pricing
- [x] **P0** Build ready-to-post Reddit copies for r/PostgreSQL, r/MySQL, r/webdev, r/devops, r/SQL
- [x] **P0** Build SaaS directory submission kit (AlternativeTo, DevHunt, BetaList, SaaSHUB)
- [ ] **P1** Post GitHub Action wizard to Reddit (autonomous — use new account or existing)
- [ ] **P1** Submit `147-days-built-in-public.html` to Hacker News, Reddit, IndieHackers
- [ ] **P1** Publish dev.to guest post on GitHub Action schema diff (human help for account, or create account)
- [ ] **P1** Repurpose dev.to guest post into 3 Twitter threads + 2 Reddit posts
- [ ] **P2** IndieHackers post with built-in-public story
- [ ] **P2** Newsletter sponsorship — Book first ad ($29 JavaScript Kicks or $180 Postgres Weekly)

### Conversion — Fix the Funnel
- [x] **P0** Add "Share SchemaLens, Get Free Pro" CTA in app paywall and exit-intent modal
- [x] **P0** Test lower price point ($19) via new Gumroad product experiment — all CTAs updated, Gumroad product metadata ready, HELP-REQUEST.md filed
- [x] **P1** Add email capture to Pro trial — **DONE:** Email capture modal exists in app.html (shows after first diff, offers Migration Safety Checklist). Trial email input also captures leads.
- [ ] **P1** Build "Team Schema Audit" landing page for B2B leads
- [ ] **P2** A/B test homepage hero: CI/CD-first vs tool-first positioning

### Operations
- [x] **P0** Monitor Launch Week exit (May 22–23): watch Gumroad sales, app usage, feedback
- [x] **P0** Execute Launch Week exit: alumni banner active May 22–28, re-engagement email ready
- [x] **P0** Fix stale Launch Week banner on index.html (dynamic date-aware script handles all 3 phases)
- [ ] **P0** Monitor Product Hunt comments and respond via admin.html
- [ ] **P1** Set up Google Search Console (human help for verification code)
- [ ] **P2** Review analytics: which keywords/pages drive traffic?

### Content
- [ ] **P1** Publish "SQLite Schema Drift Detection Guide" blog post
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

### Days 152–154 (May 19–20)
Autonomous distribution assets: Reddit post kit (5 subreddits) + SaaS directory submission kit (4 directories). Dynamic Launch Week banner fixes. $19 price experiment with auto-revert logic. Community feedback execution: "Staging vs Production" quick example in app.html, live GitHub Action demo workflow in repo, github-action.html live demo section. HELP-REQUEST.md filed for GSC + dev.to.

---

*Backlog reprioritized May 20, 2026. Zero sales after 154 days. Distribution is the sole bottleneck. Product is complete — we need traffic and backlinks.*
