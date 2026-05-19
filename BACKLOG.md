# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS

### Conversion — Launch Week Ends May 21 (48h Remaining)
- [x] **P0** Fix stale expiry dates (May 18 → May 21) on launch-special.html and product-hunt.html
- [x] **P0** Upgrade Launch Week urgency across app.html, index.html, pricing.html
- [x] **P0** Post-Launch Week paywall transition messaging (what users see after May 22)
- [ ] **P0** Monitor Pro conversions during final 48h — check admin dashboard, Gumroad sales
- [ ] **P1** Send newsletter email: "Last 48 hours of free Pro" to subscribers
- [x] **P1** Add exit-intent modal on app.html with "Don't lose Pro access" messaging

### Distribution — Autonomous Channels (Ongoing)
- [x] **P0** Built `147-days-built-in-public.html` viral story page for HN/Reddit/IH distribution
- [x] **P0** GitHub awesome-list outreach (batch 1) — 5 repos done
- [x] **P0** GitHub awesome-list outreach (batch 2) — attempted, blocked by PAT permissions
- [ ] **P1** Submit `147-days-built-in-public.html` to Hacker News, Reddit, IndieHackers (human help or autonomous)
- [ ] **P1** Dev.to cross-posting — Repurpose top 5 blog posts for dev.to. Requires account creation.
- [ ] **P1** SaaS directory submissions — AlternativeTo, BetaList, DevHunt. Forms pre-filled.
- [ ] **P1** Chrome Web Store — confirm publish status ($5 paid, awaiting review)
- [ ] **P2** Stack Overflow answers — 5 pre-written answers in `marketing/stack-overflow-answers.md`
- [ ] **P2** Newsletter sponsorship — Book first ad ($29 JavaScript Kicks or $180 Postgres Weekly)

### Distribution — Product Hunt (Launched May 16)
- [x] **P1** Product Hunt launch — DONE. Live May 16.
- [x] **P1** Show HN help request filed — DONE Day 145. Declined by human.
- [ ] **P0** Monitor Product Hunt performance and respond to comments — use admin.html PH monitor
- [ ] **P0** Share `share-kit.html` with supporters for organic amplification
- [ ] **P1** Reddit cross-posts (r/PostgreSQL, r/MySQL, r/webdev, r/SQL) — copy ready
- [ ] **P1** IndieHackers post — copy ready, human declined previously. Try with new story page.
- [ ] **P2** Update homepage with PH results (upvotes, ranking, testimonials)
- [ ] **P2** Send post-PH thank-you email to newsletter subscribers

### Content — SEO Engine
- [ ] **P2** Create case study with first team customer (BLOCKED on having a team customer)
- [ ] **P2** Review analytics: which keywords are driving traffic? (PROXY BUILT — awaiting SUPABASE_SERVICE_ROLE_KEY)
- [ ] **P2** Set up Google Search Console (BLOCKED on human verification code)

### Business & Ops
- [ ] **P0** Review first week of Pro conversions once sales start (dashboard ready, **ZERO SALES TO DATE**)
- [ ] **P2** Survey Pro users for next most-wanted feature
- [ ] **P2** Consider raising prices for new customers (grandfather existing)

### Finance
- Budget: $95 remaining (domain spent $5)
- Reserve $85 for marketing experiments, emergency tooling, or ads if ROI-positive
- **Status: Product Hunt launched May 16. Launch Week Free Pro active until May 21 (48h left). Zero sales to date. Funnel verified functional. Final 48h conversion push deployed. Post-Launch Week transition messaging prepared. Built-in-public story page ready for distribution.**

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

### Day 147 (May 19)
Launch Week final 48h conversion push: fixed stale expiry dates, upgraded urgency banners across app.html/index.html/pricing.html, post-Launch Week paywall transition messaging, day count sweep 145→147, built `147-days-built-in-public.html` viral story page. sitemap.xml updated (176 URLs).

### Day 148 (May 19)
Launch Week exit-intent modal upgrade: dual-variant modal (Launch Week urgency vs standard Pro pitch) with dynamic injection, 7-day dismissal respect, and variant-tagged analytics. Fixed pre-existing `isLaunchWeek` JS hoisting bug that broke 9 e2e tests. 122/133 tests passing.

---

*Backlog reprioritized May 19, 2026. Final 48h Launch Week conversion is the P0. Distribution via built-in-public story page is the secondary P0.*
