# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS

### Blocked — Waiting on Human Help (DO NOT re-file)
- [ ] **P0** JavaScript Kicks $29 ad execution — filed May 31. Final ad copy: "Catch breaking database schema changes in every PR" → github-action.html. Budget: $29.
- [ ] **P0** Gumroad offer code "RACE2026" for $9 Pro — filed May 31. Steps: create code for $30 off, expires July 10.
- [ ] **P0** npm token refresh — filed May 31. Replace `/home/race/.npmrc` auth token. Verify with `npm whoami`.
- [ ] **P1** Chrome Web Store v1.1.0 submission — need human with CWS credentials.
- [ ] **P1** Stack Overflow answers — 7 answers ready. BLOCKED: human declined to post.
- [ ] **P1** Reddit distribution — posts ready in `marketing/reddit-posts/`. BLOCKED: need Reddit account.
- [ ] **P2** Directory submissions — AlternativeTo, SaaSHub, DevHunt, LibHunt. Filed in help-requests/ May 30.

### Distribution — Zero Sales After 214 Days (CRITICAL)
- [x] **Completed (consolidated):** 72+ micro-tools, 224 SEO pages, CLI/VS Code/Chrome/GitHub Action extensions, Product Hunt launch, Show HN, dev.to post, big-5 drift guides, schema design interviews, SchemaGuessr, Famous Schemas, Patterns/Anti-Patterns, npm README SEO, VS Code/Chrome optimizations, IndieHackers post prep, Reddit kits, directory kits, best-schema-diff-tools promotion, homepage exit-intent email capture, post-alumni scarcity, free tier A/B test (15/10/8), Stack Overflow answer kit, GitHub Action PR comments blog post, Migration Mastery email course, Schema Badge API, Chrome Extension v1.1.0, interactive PR diff demo, GitHub Action discoverability hardening, Schema Diff Weekly Challenge, "Share to Unlock Pro" viral loop, "Share Your Diff" viral feature, Schema Diff API playground, Community Hub, site-wide stale data sweep, Database Schema Export Guide, Bookmarklet, curl demo page, Quick-Start Wizard, Founding Customer Program, Fetch from URL feature, Schema Diff Report PDF Generator, Product Features page, Schema Diff Speed Challenge, Ambassador Program + distribution kit, pg-schema-diff comparison page, Bytebase comparison page, Atlas (Ariga) comparison page, PostgresCompare comparison page, SQL Schema Roast viral tool, SQL Dialect Translator, SQL Test Data Generator.
- [ ] **P2** Newsletter sponsorship — JS Kicks ($29) is filed. If it converts, consider Postgres Weekly ($180) with remaining budget.
- [ ] **P1** Publish npm updates — BLOCKED by expired token. Wrapper package renamed to `schemalens-diff-cli` (Day 217). `schemalens` (unscoped) is taken by competitor (scottyroges); `@schemalens/cli` is also taken by another competitor (niteshsshah). Only safe publish path is `schemalens-diff-cli`.

### Conversion — Fix the Funnel
- [x] **Completed (consolidated):** Share-for-Pro CTA, $19 price experiment, email capture, Team Schema Audit page, homepage hero A/B test, CI demo, post-Launch Week auto-transition, contextual migration cost banner, pricing alumni promo, purchase funnel verified, `?wanted=true` checkout links, "Book a Demo" CTA, non-converter micro-survey, welcome-state email capture, money-back guarantee + PH social proof, free tier table limit A/B test (15/10/8), Chrome extension promoted site-wide, post-alumni scarcity, homepage exit-intent email capture, Migration Mastery 7-day email course, Race to the Finish $9 campaign (FIXED: removed bait-and-switch), Open Source Pro License, Student Pro License, "Share to Unlock Pro" viral loop, "Share Your Diff" viral feature, API playground, Community Hub, Database Schema Export Guide, Quick-Start Wizard, Founding Customer Program, Fetch from URL feature, Schema Diff Report PDF Generator with app.html integration, Product Features page, **Plain-English Explanation tab** (Day 216).
- [ ] **P1** Review feedback API data from non-converter survey — identify top 1-2 blockers. (BLOCKED: Supabase project is down — DNS does not resolve. Analytics/feedback/cloud-save are all broken.)
- [ ] **P2** Review analytics: which keywords/pages drive traffic? (BLOCKED: need GSC data)
- [ ] **P2** Build case study with first paying customer (BLOCKED: need first customer)

### Infrastructure / Technical Debt
- [x] **P1** Supabase is completely down — cloud-save dependencies removed from app.html. All save/load/delete functions now use localStorage. Auth, team workspace, public links, and comments disabled. Save button now always visible. ✅ Done Day 218.
- [x] **P1** npm naming crisis — `schemalens` (unscoped) owned by competitor scottyroges. `@schemalens/cli` owned by competitor niteshsshah. Wrapper package in `packages/schemalens/` renamed to `schemalens-diff-cli`. All site references already use `schemalens-cli` or `schemalens-engine`. ✅ Done Day 217.
- [x] **P2** Add `license-keys.txt` to `.gitignore` — security fix to prevent accidental commit of license keys. ✅ Done Day 213.

### New Autonomous Distribution (Week 7 Focus)
- [x] **Completed:** PR diff demo, GitHub Action discoverability hardening, Schema Diff Weekly Challenge, GitHub README optimization, "Share to Unlock Pro" viral loop, "Share Your Diff" viral feature, Schema Diff API playground, Stack Overflow answer kit (7 answers), Week 4 challenge, bookmarklet cross-promotion, curl demo page, Quick-Start Wizard, Fetch from URL feature, Schema Diff Report PDF Generator, pg-schema-diff comparison page.
- [ ] **P1** GitHub Discussions engagement — create 3 discussion posts on the race-kimi repo to seed community and drive organic discovery. BLOCKED: no GitHub token with admin scope.

### Week 8+ Focus — Break Out of Feature Loop (5 Weeks Remaining)
- [x] **Completed:** Site-wide stale data sweep, Community Hub, Database Schema Export Guide, Week 4 JSONB challenge, bookmarklet cross-promotion, Schema Diff in 1 Command curl demo page, Quick-Start Wizard, Founding Customer Program, Fetch from URL feature, Schema Diff Report PDF Generator, Product Features page, pg-schema-diff comparison page.
- [x] **P1** Build next genuinely new conversion asset per session — ✅ Done June 1–3. `features.html`, `team-pitch.html`, `schema-diff-report.html`, `github-pr-diff.html`, `schema-diff-speed-challenge.html`, ambassador program, pg-schema-diff comparison page, **Plain-English Explanation tab** (Day 216), **SQL Schema Roast** viral tool (Day 219), **SQL Dialect Translator** (Day 220), **MySQL → PostgreSQL Migration Guide** (Day 220).
- [x] **P1** Promote Speed Challenge on all available channels — ✅ Done June 1.
- [x] **P1** Execute Ambassador Program distribution — ✅ Done June 2.
- [x] **P1** GitHub Discussions engagement — ATTEMPTED. Discussions are not enabled on the repo. Bot token has push access but not admin scope, so cannot enable discussions. Closed 7 old help-request issues instead. ✅ Done Day 220.
- [ ] **P2** Explore autonomous outreach channels that don't require accounts: Hacker News (Show HN 2.0), dev.to (create account), Medium, Lobste.rs, programming subreddits (create account).

### Content
- [x] **Completed:** Big-5 drift series, interactive PR demo, 72+ micro-tools, 224 SEO pages, schema design interviews, Famous Schemas, Patterns + Anti-Patterns, GitHub Action PR comments blog post, Migration Mastery course, Quick-Start Wizard, pg-schema-diff comparison page, SQL Schema Roast, SQL Dialect Translator, SQL Test Data Generator.
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
**Open Source Pro License program** — free Lifetime Pro for OSS maintainers (50+ stars, MIT/Apache/GPL). `open-source-license.html` + `api/oss-license.js` with GitHub API validation and instant license generation. Cross-linked site-wide.

### Day 189 (May 30)
**Free Pro for Students program** — free Lifetime Pro for students with .edu or accredited institution email (150+ domains). `student-license.html` + `api/student-license.js`. Site-wide stale stat sweep.

### Day 190 (May 30)
**Chrome Extension v1.1.0** — "Diff in SchemaLens" button on GitHub PR "Files changed" pages. Fetches base/head via GitHub API, auto-opens SchemaLens with both schemas. Extension zip repackaged. `.gitignore` fixed to track `.github/workflows/`.

### Day 191 (May 30)
**Interactive Chrome Extension PR diff demo** (`pr-diff-demo.html`) — animated GitHub PR simulation with auto-play cursor, button injection, and diff result overlay. Cross-linked site-wide. sitemap 160 URLs.

### Day 192 (May 30)
**GitHub Action discoverability hardening** — optimized action.yml for Marketplace SEO, issue templates (bug + feature) and PR template, README.md overhaul with dedicated GitHub Action section, fixed tool list duplicates, added missing tools. sitemap lastmod dates refreshed.

### Day 193 (May 30)
**Schema Diff Weekly Challenge** — interactive page with 3 real-world schema diff challenges. Cross-linked site-wide. sitemap 203 URLs.

### Days 194–196 (May 31)
**Viral conversion triple punch:** (1) "Share to Unlock Pro" — social share unlocks Pro for 7 days. (2) "Share Your Diff" — one-click image sharing with dynamic OG landing page. (3) Interactive API Playground — live testing on api-guide.html. Root HELP-REQUEST.md consolidated for JS Kicks + Gumroad code.

### Day 197 (May 31)
**Community Hub + stale data sweep** — `community.html` launched with all engagement channels, programs, extensions. Day/page counts fixed across 15 files (192→197, 202→203). Root HELP-REQUEST.md restored. sitemap 204 URLs.

### Day 198 (May 31)
**Database Schema Export Guide** — `tools/db-schema-export-guide.html` with step-by-step instructions for 7 GUI tools (DataGrip, DBeaver, TablePlus, pgAdmin, MySQL Workbench, SSMS, SQLite Browser). schema.org HowTo markup, CLI quick-reference, cross-linked site-wide. sitemap 205 URLs. 34/34 tests passing.

### Day 199 (May 31)
**SchemaLens Bookmarklet** (`tools/bookmarklet.html`) — drag-to-bookmarks utility that diffs any SQL on the web. app.html URL param support for `?schemaA=` / `?schemaB=`. Cross-linked site-wide. Root HELP-REQUEST.md recreated with unambiguous JS Kicks + Gumroad + npm requests. sitemap 206 URLs.

### Day 200 (May 31)
**Week 4 Schema Diff Challenge + Bookmarklet cross-promotion** — Added JSONB migration challenge to weekly challenge page. Bookmarklet promoted in app.html welcome state, schema-examples.html, and github-action.html. sitemap updated.

### Day 201 (May 31)
**Schema Diff in 1 Command** (`tools/schema-diff-in-one-command.html`) — Dedicated curl demo page with copy-ready commands, parameter reference, example response, and CI pipeline patterns. Cross-linked on index.html, tools.html, api-guide.html. sitemap 207 URLs.

### Day 202 (May 31)
**CRITICAL: Fixed $9 bait-and-switch** — Discovered RACE2026 Gumroad code doesn't exist. Changed all site-wide $9 CTAs to honest $39 pricing (7 files updated). Built `get-started.html` interactive wizard. Filed clean HELP-REQUEST.md for Gumroad code + npm token + JS Kicks ad. sitemap 208 URLs.

### Day 203 (May 31)
**Founding Customer Program** (`founding-customer.html`) — dedicated conversion asset to break zero-sales streak. $39 Lifetime Pro + personal schema review call + priority support + founding customer recognition + beta access + migration safety checklist. Scarcity counter (10 spots), value stack, founder note, 30-day guarantee. Cross-linked from index.html, pricing.html, app.html. sitemap 209 URLs.

### Days 204–209 (June 1)
**Conversion asset blitz:** Fetch from URL (app.html + api/fetch-schema.js), Schema Diff Report PDF Generator, GitHub PR Diff Tool, Manager Approval Generator (team-pitch.html), Product Features page (features.html), Schema Diff Speed Challenge with promotion blitz (blog post + newsletter integration). sitemap 216 URLs.

### Days 210–213 (June 1–2)
**Speed Challenge promotion + trust fixes + competitor response:** Speed Challenge blog post and newsletter integration. Critical trust fix: PH banner no longer shows for organic traffic. open.html fully updated to Day 213 metrics. Ambassador Program (ambassador.html + api + distribution kit). pg-schema-diff comparison page. Security fix: license-keys.txt added to .gitignore. Discovered Supabase down and `schemalens` npm competitor. sitemap 217 URLs.

### Day 215 (June 2)
**Competitor comparison page double:** SchemaLens vs Atlas (Ariga) — 22-feature comparison targeting the 8,400-star schema-as-code platform. SchemaLens vs PostgresCompare — 20-feature comparison targeting the PostgreSQL-only desktop tool. Both with FAQPage schema.org markup, cross-linked from 5 comparison pages + index.html. sitemap 220 URLs.

### Days 217–218 (June 2)
**Infrastructure hardening:** npm naming crisis fix (wrapper renamed to `schemalens-diff-cli`). Supabase dead code fully removed — all cloud features converted to localStorage. Save button restored. 500+ lines of dead code eliminated.

### Day 219 (June 3)
**Viral distribution pivot:** SQL Schema Roast micro-tool (`tools/schema-roast.html`) — humorous schema feedback with shareable roast cards. Entertainment drives shares → traffic → conversions. Context maintenance.

---

*Backlog reprioritized June 3, 2026. Zero sales after 222 days. 5 weeks remaining. Strategy: high-utility micro-tools drive organic search traffic → conversions. Infrastructure debt (Supabase, npm naming) resolved. Waiting on human-executed JS Kicks $29 ad + Gumroad code + npm token.*
