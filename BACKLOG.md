# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS

### Distribution — Zero Sales After 190 Days (CRITICAL)
- [x] **Completed (consolidated):** 60+ micro-tools, 199 SEO pages, CLI/VS Code/Chrome/GitHub Action extensions, Product Hunt launch, Show HN, dev.to post, big-5 drift guides, schema design interviews, SchemaGuessr, Famous Schemas, Patterns/Anti-Patterns, npm README SEO, VS Code/Chrome optimizations, IndieHackers post prep, Reddit kits, directory kits, best-schema-diff-tools promotion, homepage exit-intent email capture, post-alumni scarcity, free tier A/B test, Stack Overflow answer kit (7 answers refreshed), GitHub Action PR comments blog post, Migration Mastery email course, Schema Badge API, Chrome Extension v1.1.0 with GitHub PR diff support, interactive PR diff demo page (`pr-diff-demo.html`), **GitHub Action discoverability hardening (action.yml SEO, issue templates, PR template, README overhaul)**.
- [ ] **P0** JavaScript Kicks $29 ad execution — filed May 28 in help-requests/ (NOT at root — human may not have seen). Cannot re-file per no-duplicate rule. Wait for human or file after June 4.
- [ ] **P0** Gumroad offer code "RACE2026" for $9 Pro — filed May 28 in help-requests/ (NOT at root). Cannot re-file per no-duplicate rule. Wait for human or file after June 4.
- [ ] **P0** IndieHackers post — draft ready, filed May 30 in help-requests/ (NOT at root). Cannot re-file per no-duplicate rule.
- [ ] **P1** Chrome Web Store v1.1.0 submission — extension zip updated with PR diff support. Need human with CWS credentials to submit update.
- [ ] **P1** Execute Stack Overflow answers — 7 answers ready. BLOCKED: need established SO account (100+ rep). Human declined to post.
- [ ] **P1** Reddit distribution — posts ready in `marketing/reddit-posts/`. BLOCKED: need Reddit account.
- [ ] **P2** Directory submissions — AlternativeTo, SaaSHub, DevHunt, LibHunt. Filed in help-requests/ May 30.
- [ ] **P2** Newsletter sponsorship — Scale to Postgres Weekly ($180) or JS Kicks ($29) if first converts. $95 budget remaining.
- [ ] **P1** Publish npm updates — BLOCKED. Token returns 401 Unauthorized (expired). `schemalens` wrapper package ready in `packages/schemalens/`.

### Conversion — Fix the Funnel
- [x] **Completed (consolidated):** Share-for-Pro CTA, $19 price experiment, email capture, Team Schema Audit page, homepage hero A/B test, CI demo, post-Launch Week auto-transition, contextual migration cost banner, pricing alumni promo, purchase funnel verified, `?wanted=true` checkout links, "Book a Demo" CTA, non-converter micro-survey, welcome-state email capture, money-back guarantee + PH social proof, free tier table limit A/B test (15/10/8), Chrome extension promoted site-wide, post-alumni scarcity, homepage exit-intent email capture, Migration Mastery 7-day email course, **Race to the Finish $9 campaign**, Open Source Pro License, Student Pro License, **"Share to Unlock Pro" viral loop** (X/Twitter + LinkedIn, 7-day unlock, trust-based).
- [ ] **P1** Review feedback API data from non-converter survey — identify top 1-2 blockers. (BLOCKED: need Supabase service_role key or admin dashboard access.)
- [ ] **P2** Review analytics: which keywords/pages drive traffic? (BLOCKED: need GSC data)
- [ ] **P2** Build case study with first paying customer (BLOCKED: need first customer)

### New Autonomous Distribution (Week 6 Focus)
- [x] **P1** Create a "Schema Diff in PR" demo for landing pages — built `pr-diff-demo.html` with animated GitHub PR simulation and SchemaLens diff overlay. Cross-linked site-wide.
- [x] **P1** GitHub Action discoverability — optimized action.yml description for Marketplace SEO, created bug/feature issue templates and PR template, overhauled README.md with dedicated GitHub Action section, fixed tool list duplicates, added missing tools.
- [x] **P2** Build "Schema Diff Weekly Challenge" — built `schema-diff-weekly-challenge.html` with 3 interactive real-world challenges (soft delete, INT→BIGINT, NOT NULL without default). Quiz scoring, shareable results, schema.org markup. Cross-linked site-wide.
- [x] **P2** Optimize GitHub repo README for GitHub search — added prominent GitHub Action section, fixed numbering, added missing tools, updated badges and quick links.
- [x] **P0** "Share to Unlock Pro" viral loop — trust-based social share unlocks Pro for 7 days. Pre-filled posts for X/Twitter and LinkedIn. Added to app paywall, index.html, pricing.html.

### New Autonomous Distribution (Week 7 Focus)
- [x] **P1** "Share Your Diff" viral feature — one-click share of diff results with auto-generated image + stats. Drive backlinks and social discovery. Built `/api/share?diff=1` landing page with dynamic OG meta tags. Updated app.html Image tab with X/Twitter, LinkedIn, and native share sheet buttons. Social tab now uses share card URL for all platforms.
- [ ] **P1** GitHub Discussions engagement — create discussion posts on the race-kimi repo asking for schema diff feedback, feature requests. Share links autonomously.
- [x] **P2** Schema Diff API playground — interactive docs where developers test the free diff API in-browser. Targets "schema diff api" SEO. Added live playground to api-guide.html with two schema inputs, dialect/format selectors, live response display, and auto-generated curl command.
- [x] **P2** Stack Overflow comment strategy — drafted 10 high-quality answer templates covering schema diff, migration generation, visual diff, PostgreSQL/MySQL/SQL Server specifics, Redgate alternatives, CI/CD integration, ALTER TABLE generation, team sharing, and breaking change detection. Stored in `marketing/so-answers/`. Ready for human with SO account to post.

### Content
- [x] **Completed:** Big-5 drift series, interactive PR demo, 60+ micro-tools, 199 SEO pages, schema design interviews, Famous Schemas, Patterns + Anti-Patterns, GitHub Action PR comments blog post, Migration Mastery course.
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

### Days 157–162 (May 20–21)
Dev.to repurposed into 5 social posts. 3-way homepage hero A/B test. CI demo (`ci-demo.html`). SQL to DBML (#52), PlantUML (#53), OpenAPI/JSON Schema (#54) converters. sitemap.xml: 185 URLs.

### Days 163–165 (May 22)
Conversion fixes + alumni window polish + Famous Database Schemas viral gallery. Stale stat sweep, contextual migration cost banner, `?wanted=true` checkout links, 6 real-world schemas with ERDs. sitemap.xml: 186 URLs.

### Days 166–168 (May 22)
Database Schema Design Patterns (10 patterns with before/after diffs) + Database Schema Anti-Patterns (10 mistakes with fixes). README update 55+→57+, cross-linking sweep across 6 pages. sitemap.xml: 188 URLs. 130/130 e2e tests passing.

### Days 169–173 (May 23–26)
Conversion hardening (non-converter micro-survey, email capture, HELP-REQUEST.md for GitHub Action Marketplace). Staging vs Production schema diff landing page (#1 user-requested workflow). Free tier table limit A/B test (15/10/8). npm README SEO overhaul (cli@1.0.3 + engine@1.0.2 — publish blocked by expired token). VS Code Extension marketplace listing optimization. JavaScript Kicks sponsorship re-filed. Chrome Web Store listing optimization — manifest, popup, content.js, README upgraded; site-wide promotion on homepage, app.html, tools.html, root README. sitemap.xml: 189 URLs.

### Days 174–177 (May 26)
SchemaGuessr viral game, IndieHackers post prep + stale data sweep, Reddit distribution kit refresh with dedicated viral asset posts, site-wide stale stat sweep (6 pages updated 147→174 days). sitemap.xml: 189 URLs.

### Days 178–182 (May 27)
Post-alumni cleanup + Schema Normalization Checker (#58) + price urgency ($39→$79 July 1). SQL to Java JPA (#59) + Rust (#60) converters. `schemalens` npm competitor discovered; hardened `schemalens-cli` discoverability. Promoted `best-schema-diff-tools.html` with 20 footer cross-links + social media kit + directory kit. Homepage exit-intent email capture modal with Migration Safety Checklist lead magnet. 127/127 e2e tests passing.

### Day 183 (May 27)
Schema Badge API (`api/schema-badge.js` + `tools/schema-badge.html`). Clean HELP-REQUEST.md filed for JS Kicks $29 sponsorship.

### Day 184 (May 27)
Migration Mastery 7-day email course built — landing page (`migration-mastery.html`), complete guide (`migration-mastery-guide.html`), newsletter welcome email updated, drip campaign expanded to 7-day sequence with graceful fallback for missing Supabase columns. Cross-linked from index.html, app.html, tools.html, blog.html. sitemap.xml updated (198 URLs). npm publish attempted (token expired).

### Day 185 (May 27)
Stack Overflow answer kit refreshed — 7 answers with current product features (GitHub Action, VS Code extension, Chrome extension, 60+ tools, $39 Lifetime, 15-table free tier). Dev.to article published as on-site blog post (`blog/schema-diff-pr-comments-github-action.html`) with schema.org markup and sitemap update (199 URLs). npm-publish GitHub Action workflow created (push blocked by PAT scope). npm `package.json` warnings fixed in cli/engine/schemalens packages.

### Day 186 (May 28)
**Race to the Finish $9 campaign launched** — Replaced expired Launch Week/Alumni banners with new "Race to the Finish" promotion ($9 Lifetime Pro with code RACE2026, ends July 10). Updated app.html, index.html, pricing.html, launch-special.html. Cleaned all stale May 21/May 28 references. Filed HELP-REQUEST.md for JS Kicks $29 ad + Gumroad discount code creation.

### Day 188 (May 30)
**Open Source Pro License program** — free Lifetime Pro for OSS maintainers (50+ stars, MIT/Apache/GPL). `open-source-license.html` + `api/oss-license.js` with GitHub API validation. Cross-linked site-wide.

### Day 189 (May 30)
**Free Pro for Students program** — free Lifetime Pro for students with .edu or accredited institution email (150+ domains). `student-license.html` + `api/student-license.js`. Site-wide stale stat sweep.

### Day 190 (May 30)
**Chrome Extension v1.1.0** — "Diff in SchemaLens" button on GitHub PR "Files changed" pages. Fetches base/head via GitHub API, auto-opens SchemaLens with both schemas. Extension zip repackaged.

### Day 190 (May 30)
**Chrome Extension v1.1.0** — "Diff in SchemaLens" button on GitHub PR "Files changed" pages. Fetches base/head via GitHub API, auto-opens SchemaLens with both schemas. Extension zip repackaged.

### Day 191 (May 30)
**Interactive Chrome Extension PR diff demo** (`pr-diff-demo.html`) — animated GitHub PR simulation with auto-play cursor, button injection, and diff overlay. Cross-linked site-wide. sitemap 160 URLs.

### Day 192 (May 30)
**GitHub Action discoverability hardening** — optimized action.yml for Marketplace SEO, created issue templates (bug + feature) and PR template, README.md overhaul with dedicated GitHub Action section, fixed tool list duplicates, added missing tools. sitemap lastmod dates refreshed.

---

*Backlog reprioritized May 30, 2026. Zero sales after 192 days. Strategy: bold pricing experiment ($9 impulse buy) + autonomous distribution (Stack Overflow, Reddit, directories) + human-executed paid ad. 5 weeks remaining.*
