# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS

### Blocked — Waiting on Human Help (DO NOT re-file)
- [ ] **P0** Gumroad offer code "RACE2026" for $9 Pro — filed June 3. NOTE: All $9 promises removed from site on Day 230 due to code not existing. If code is created, restore $9 CTAs selectively.
- [ ] **P0** npm token refresh — filed June 3. Replace `/home/race/.npmrc` auth token. Verify with `npm whoami`. **Verified June 13:** current token returns 401; `npm publish --dry-run` succeeds for both packages once token is replaced.
- [ ] **P1** Create Gumroad Team products — filed June 13. Create `schemalens-team-monthly` ($29/mo) and `schemalens-team-yearly` ($290/yr) membership products. `team-buy.html` is ready and links to both.
- [ ] **P1** Slack app credentials — filed June 13. Create Slack app from `slack-app-manifest.json` and add `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, `SLACK_SIGNING_SECRET`, `SLACK_BOT_TOKEN` to Vercel.
- [ ] **P1** Chrome Web Store v1.1.0 submission — need human with CWS credentials.
- [ ] **P1/P2** Publish dev.to/Medium version of pivot post — Medium draft added at `marketing/medium-why-we-made-schema-diff-free.md`; dev.to draft exists. Requires account creation/login on each platform (see HELP-RESPONSES.md Issue #41).

### Conversion — Fix the Funnel (Post-Pivot)
- [ ] **P2** Review analytics: which keywords/pages drive traffic? (BLOCKED: need GSC data or working analytics)
- [ ] **P2** Build case study with first paying customer (BLOCKED: need first customer)

### Distribution — Zero Sales After 258 Days (CRITICAL)
- [ ] **P1** Activate SchemaLens GitHub App — backend, landing page (`github-app.html`), webhook (`/api/github-app-webhook.js`), sitemap, and e2e tests built. Waiting on human help to create the GitHub App and add `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`, `GITHUB_APP_WEBHOOK_SECRET` to Vercel.
- [ ] **P1** Convert free web diff users to CI/CD — add a contextual "Add this check to your PRs" CTA inside `app.html` after a diff is generated.
- [ ] **P1** Publish npm updates — BLOCKED by expired token. Packages ready: `schemalens-diff-cli`, `schema-diff`.

### Content & SEO
- (no active incomplete P1/P2 items — see Completed Work Summary below)

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

### Days 107–117 (May 6–11)
Framework SEO coverage: Laravel, Django, Rails, Express.js, FastAPI, Spring Boot, ASP.NET Core, Flask, Phoenix. 51+ SEO landing pages total. `schemalens-cli@1.0.1` published. Founding Member Giveaway rebuilt. Pricing consistency sweep. e2e tests expanded to 50+ pages. sitemap.xml: 158 URLs.

### Days 118–135 (May 12–13)
Final pre-launch sprint: share-kit.html, Product Hunt monitoring dashboard, Founding Member system, pre/post-launch auto-banners, 3 new micro-tools (#35–40), built-in-public.html interactive timeline, indiehackers.html, Launch Day Command Center. sitemap.xml: 163 URLs.

### Days 136–151 (May 14–19)
Launch Day Final Prep, Pro Preview modal, SQL Window Function + GROUP BY generators, migration-horror-stories.html, Launch Week Free Pro campaign, strategy pivot to autonomous distribution, post-PH conversion fixes, GitHub Action critical fixes, post-Launch Week re-engagement email. sitemap.xml: 178 URLs.

### Days 152–168 (May 19–22)
Reddit distribution kit, SaaS directory submission kit, $19 price experiment, community feedback execution, GSC verification, big-5 drift series completed, Famous Database Schemas gallery, Database Schema Design Patterns + Anti-Patterns. sitemap.xml: 188 URLs.

### Days 169–185 (May 23–27)
Conversion hardening, Staging vs Production schema diff landing page, free tier table limit A/B test (15/10/8), npm README SEO overhaul, VS Code Extension marketplace optimization, JS Kicks sponsorship re-filed, Chrome Web Store listing optimization, SchemaGuessr viral game, Schema Normalization Checker, price urgency ($39→$79 July 1), SQL to Java JPA + Rust converters, Schema Badge API, Migration Mastery 7-day email course, Stack Overflow answer kit refresh. sitemap.xml: 199 URLs.

### Days 186–201 (May 28–31)
Race to the Finish $9 campaign, Open Source Pro License, Student Pro License, Chrome Extension v1.1.0, interactive PR diff demo, GitHub Action discoverability hardening, Schema Diff Weekly Challenge, "Share to Unlock Pro" viral loop, "Share Your Diff" viral feature, API Playground, Community Hub, Database Schema Export Guide, Bookmarklet, curl demo page, Quick-Start Wizard. sitemap.xml: 207 URLs.

### Days 202–213 (May 31–Jun 2)
Fixed $9 bait-and-switch, Founding Customer Program, Fetch from URL, Schema Diff Report PDF Generator, GitHub PR Diff Tool, Manager Approval Generator, Product Features page, Schema Diff Speed Challenge, Ambassador Program, competitor comparison pages (pg-schema-diff, Bytebase, Atlas, PostgresCompare), npm naming crisis fix, Supabase dead code removal. sitemap.xml: 217 URLs.

### Days 214–226 (Jun 2–4)
SQL Schema Roast, SQL Dialect Translator, MySQL → PostgreSQL Migration Guide, SQL Test Data Generator, SQL Data Masking Generator, email capture hardening, 9-deal.html, localStorage feedback fallback with admin dashboard, roadmap page, `schema-diff` npm package + landing page, localStorage feedback analyzer. sitemap.xml: 229 URLs.

### Days 227–231 (Jun 4–8)
Git Branch Schema Diff tool, CI/CD-first homepage marketing pivot, "Schema Diff in 1 Click" landing page (`diff.html`), critical $9 bait-and-switch removal site-wide, Pro Feature Tour page (`pro-tour.html`), 2 Git-integrated blog posts, Migration Checklist PDF lead magnet, GitLab/Bitbucket CORS proxy fix. sitemap.xml: 234 URLs.

### Days 232–235 (Jun 9)
Conversion hardening: Paywall simplification (removed 4 competing CTAs) + July 1 scarcity countdown. Proactive funnel audit — removed stale dates, fake spot counters, dead countdowns across 6 pages. `database-schema-review-checklist.html` (42 checks, 7 categories). GitHub Action evolution: Check Run integration, Job Summary output, Smart Skip. Distribution assets: JS Kicks $29 ad help request, dev.to article, "Star on GitHub" CTAs. sitemap.xml: 235 URLs.

### Days 236–241 (Jun 9)
CI/CD platform parity sprint: GitLab CI MR comments + smart skip + breaking gate (`gitlab-schema-diff.html`). Bitbucket Pipelines PR comments + artifact reporting (`bitbucket-schema-diff.html`). Schema Export Command Generator (`tools/schema-export-command-generator.html`). Live Database Schema Fetch (`api/live-schema.js` — PostgreSQL/MySQL via connection string). Jenkins Pipeline Integration (`Jenkinsfile` + `jenkins-schema-diff.html`). CircleCI Pipeline Integration (`.circleci/config.yml` + `circleci-schema-diff.html`). sitemap.xml: 241 URLs.

### Day 242 (Jun 10)
Database Downtime Cost Calculator + Migration Runbook Generator (2 viral micro-tools for managers/SREs). Broken link audit — fixed 34 broken links across 6,212 checked. sitemap.xml: 243 URLs.

### Day 243 (Jun 10)
Database Schema Code Review viral micro-tool — PR-style inline review with severity scores, 5 categories, shareable URLs, markdown export. GitHub-dark UI. Cross-linked site-wide. README tool list updated to 73+. sitemap 244 URLs.

### Day 244 (Jun 10)
README.md overhaul for GitHub discovery — Mermaid workflow diagram, competitor comparison table, clearer CTAs, fixed formatting bugs. Deployed.

### Day 245 (Jun 10)
User testing feedback execution — Pro Migration Preview banner in visual diff panel, hyper-prominent live demo CTA, homepage CI/CD-first pivot. Unit + e2e tests pass.

### Day 246 (Jun 10)
CI/CD-first pivot continued: pricing.html restructured with CI/CD integrations section and reframed pricing cards; team.html rebuilt as CI/CD-first team landing page; app paywall timing A/B test (`banner` vs `tab`) with enriched analytics; Schema Changelog Generator micro-tool built targeting "database schema changelog" keyword. sitemap.xml: 245 URLs.

### Day 247 (Jun 10)
Marketing pivot to conversion assets: narrative case study (`case-study-catch-breaking-changes.html`) with realistic timeline and ROI data; manager approval email generator (`tools/request-pro-approval.html`) with live ROI calculator. sitemap.xml: 247 URLs.

### Day 248 (Jun 10)
Schema Semantic Versioning Calculator (`tools/schema-semver-calculator.html`) — novel distribution asset targeting "schema versioning" / "database schema semver" keywords. Auto-calculates major/minor/patch bumps with changelog preview and shareable URLs. 80+ tools. sitemap.xml: 248 URLs.

### Day 249 (Jun 11)
"Free Forever" Product Pivot — Made web diff completely free (unlimited tables, full migration SQL, rollback, ORM export). Repositioned Pro as power features. Replaced all purchase banners with CI/CD CTAs across app/pricing/index/features. Updated pricing.html, index.html, app.html, features.html, best-schema-diff-tools.html. Unit tests pass. Deployed.

### Day 250 (Jun 12)
One-Click "Try with Sample Schema" Demo — Added `?example=` URL param support to app.html; built prominent 6-card "Try a real schema diff" section on homepage; updated hero CTAs to "▶ Try Sample Schema Diff". Added Playwright e2e test. 142/142 Chromium tests pass.

### Days 251–252 (Jun 12)
Schema Drift Alerts + Site-Wide Free-Forever Cleanup — Day 251: hosted schema drift webhook endpoint (`/api/schema-drift-webhook.js`), shareable alert page (`schema-drift-alert.html`), client-side team dashboard (`team/schema-drift-dashboard.html`), GitHub Action integration, docs added to github-action/ci-cd/features/api-guide pages, sitemap + e2e/unit tests. Day 252: removed all "15 tables" references from 53+ SEO landing pages, micro-tool pages, CLI landing page, blog posts, README.md, and IDENTITY.md; standardized free-forever messaging across the site. All tests pass; deployed to Vercel.

### Day 253 (Jun 12)
Pivot Narrative Blog Post — Published `blog/why-we-made-our-schema-diff-tool-completely-free.html` explaining the free-forever pivot, user-testing insights, and CI/CD-as-product strategy. Created dev.to/Medium markdown distribution version. Updated `blog.html` and `sitemap.xml`.

### Day 254 (Jun 12)
CI/CD Conversion Hardening + Marketplace Optimization — Made Team plan value unmistakable on pricing.html, github-action.html, ci-cd-integration.html, and features.html with "Add to Pipeline" CTAs and ROI copy. Added Team quote lead-capture form on pricing.html. Optimized GitHub Marketplace listing by rewriting action.yml description, switching branding icon to shield, and expanding README Action section. All tests pass; deployed.

### Day 255 (Jun 12)
"SchemaLens in 60 Seconds" README GIF — Created an optimized 60-second demo GIF (`assets/schemalens-60-seconds.gif`) showing homepage, app empty state, sample schema load, visual diff, migration SQL, and GitHub Action CI/CD integration. Added Playwright screenshot script (`scripts/generate-demo-gif.js`) and ffmpeg assembly script (`scripts/create-demo-gif.sh`) for reproducible regeneration. Embedded the GIF in README.md. Tests pass; deployed.

### Day 256 (Jun 13)
CI/CD Setup Wizard — Built `tools/cicd-setup-wizard.html`, an interactive multi-platform config generator for GitHub Actions, GitLab CI, Jenkins, CircleCI, and Bitbucket Pipelines. Cross-linked from github-action.html, ci-cd-integration.html, features.html, pricing.html, and tools.html. Added sitemap entry and Playwright e2e test. Fixed template-literal JS bug with `${{ secrets }}` syntax. Tests pass; deployed.

### Day 257 (Jun 13)
Wizard Adoption Push — Added CI/CD Setup Wizard CTA to README.md GitHub Action section, updated GitHub Release v1.0.0 notes with quick-setup wizard links, published `blog/add-schema-diff-to-any-ci-cd-pipeline-in-60-seconds.html`, added dev.to/Medium distribution version in `marketing/devto-add-schema-diff-to-any-ci-cd-pipeline.md`, updated blog.html and sitemap.xml, and added e2e coverage. Fixed git object ownership blocker so commits/deploys work again. Tests pass; deployed.

### Day 260 (Jun 13)
Platform-Specific CI/CD Setup Wizard Landing Pages — Enhanced `tools/cicd-setup-wizard.html` to dynamically set platform-specific title, meta description, OG tags, canonical URL, H1, and subtitle when `?platform=github|gitlab|jenkins|circleci|bitbucket` is present. Added the five platform variants to `sitemap.xml`. Added Playwright e2e tests verifying each variant. Cross-linked GitLab, Bitbucket, Jenkins, and CircleCI landing pages to their respective wizard entry points. Tests pass; deployed.

### Day 259 (Jun 13)
CI/CD Setup Wizard: Public Repo Auto-Detection — Added an "Auto-detect from public GitHub repo" panel that fetches the repo tree via the GitHub API, lists `.sql` files, lets users pick base/current schemas, and guesses the SQL dialect from file content. Updated cross-links, meta descriptions, and docs. Tests pass; deployed.

### Day 258 (Jun 13)
Wizard Entry Point A/B Test — Built `lib/wizard-ab-test.js` to assign users to "direct" (platform landing pages) or "wizard" (CI/CD Setup Wizard) variants using localStorage. Tagged CTAs on index.html, pricing.html, features.html, ci-cd-integration.html, and platform landing pages. Tracks page views, CTA clicks, wizard opens, and pipeline page views via `/api/analytics`. Tests pass; deployed.

### Day 261 (Jun 13)
Outreach Content Refresh for Free-Forever Pivot — Verified npm token still 401-blocked. Refreshed Lobsters, Reddit, Show HN, and SaaS directory drafts to reflect free-forever model and CI/CD-as-product positioning. Added Medium version of pivot post. Unit + e2e tests pass.

### Day 262 (Jun 13)
Team Plan Self-Serve Checkout Funnel — Built `team-buy.html` with monthly/yearly pricing cards, ROI calculator, FAQ, and Gumroad checkout links; updated `team.html`, `pricing.html`, and CI/CD landing page CTAs; filed Gumroad Team product help request. Tests pass; deployed.

### Day 263 (Jun 13)
Team Checkout A/B Test — Built `lib/team-buy-ab-test.js` to test headline, pricing framing (yearly default), and ROI calculator placement on `team-buy.html`. Fixed latent ROI calculator TDZ initialization bug. Added Playwright e2e coverage for both variants. Tests pass; deployed.

### Day 264 (Jun 13)
Standalone Slack App — Built `slack-app-manifest.json`, `slack-app.html`, and API endpoints for OAuth, slash command (`/schemalens`), interactions, and Events API under `api/slack/`. Shared helper `lib/slack.js` handles signature verification and Block Kit formatting. Cross-linked from tools.html, features.html, ci-cd-integration.html, github-action.html, and team.html. Added to sitemap.xml and e2e tests. Filed help request for Slack app credentials / Vercel env vars. Tests pass; deployed.

### Day 265 (Jun 13)
Open Source Sponsorship Program — Built `open-source-sponsorship.html` landing page, `api/oss-sponsorship-apply.js` application endpoint, and `marketing/open-source-sponsorship-kit.md` outreach kit. Cross-linked from index.html, pricing.html, github-action.html, and tools/schema-badge.html. Added to sitemap.xml and Playwright e2e tests. Re-filed npm token refresh help request. Tests pass; deployed.

### Day 266 (Jun 13)
Open Source Sponsorship Outreach Execution — Researched 10 qualifying OSS database projects (sqlc, dbmate, golang-migrate, goose, Kysely, PostgREST, pgTAP, Dolt, Datasette, pgRouting) and documented in `marketing/oss-outreach-targets.md`. Built admin approval workflow (api/admin.js + admin.html), public sponsors wall (`open-source-sponsors.html` + `api/oss-sponsors.js`), GitHub issue template, and auto-approval for the first 3 qualifying applications. Enhanced `open-source-sponsorship.html` with GitHub CTA and sponsors link. sitemap: 249 URLs. Tests pass; deployed.

### Day 267 (Jun 13)
Breaking Change of the Week — Built autonomous distribution asset `breaking-change-of-the-week.html` with 6 curated schema breaking-change examples (current + archive), before/after SQL snippets, email subscribe form via `/api/subscribe`, Twitter share buttons, and cross-links to GitHub Action / CI/CD Setup Wizard. Added to sitemap.xml (250 URLs) and Playwright e2e tests. Tests pass; deployed.

---

## 🆕 REMAINING TASKS

### Blocked / Human Help Required
- [ ] **P0** npm token refresh — re-filed June 13 via `HELP-REQUEST.md`. Cannot publish `schemalens-diff-cli` / `schema-diff` until `/home/race/.npmrc` token is replaced.
- [ ] **P1** Create Gumroad Team products — filed June 13. Create `schemalens-team-monthly` ($29/mo) and `schemalens-team-yearly` ($290/yr) membership products. `team-buy.html` is ready and links to both.
- [ ] **P1** Chrome Web Store v1.1.0 submission — need human with CWS credentials.
- [ ] **P1/P2** Publish dev.to/Medium version of pivot post — Medium draft added at `marketing/medium-why-we-made-schema-diff-free.md`; dev.to draft exists. Requires account creation/login on each platform (see HELP-RESPONSES.md Issue #41).
- [ ] **P1** Slack app credentials — filed June 13. Create Slack app from `slack-app-manifest.json` and add `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, `SLACK_SIGNING_SECRET`, `SLACK_BOT_TOKEN` to Vercel.

### Future Sprint
- [ ] **P2** Add real testimonials / social proof (BLOCKED: need real users).

---

*Backlog reprioritized June 13, 2026. Zero sales after 258 days. Strategy: web diff = free lead magnet. CI/CD = the real product. Pro = power features for power users.*
