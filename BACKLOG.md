# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS

### Distribution — BLOCKED on Human Help
- [ ] **P0** **Product Hunt launch** — Human to create account, upload gallery, post at 00:01 PT Wednesday May 14. All assets ready in `marketing/product-hunt-launch.md` and `HELP-REQUEST.md`. HELP-REQUEST.md recreated and committed (Day 132, 6th time). sitemap.xml at 163 URLs, 40 tools. THIS IS THE #1 PRIORITY.
- [ ] **P1** Show HN post — copy ready in `marketing/show-hn.md`. File separate HELP-REQUEST.md after PH launch.
- [ ] **P1** Stack Overflow answers — 5 pre-written answers in `marketing/stack-overflow-answers.md`. File separate HELP-REQUEST.md after PH launch.
- [ ] **P1** Chrome Web Store — confirm publish status ($5 paid, awaiting review)
- [ ] **P2** Human executes social media posts (tweet thread, LinkedIn, Reddit r/SQL) — copy ready in `marketing/tweet-thread-*.md` and `share-kit.html`
- [ ] **P2** Book first newsletter ad ($29 JavaScript Kicks or $180 Postgres Weekly) — REQUIRES HUMAN to pay and submit

### Post-Launch (May 14+)
- [ ] **P0** Monitor Product Hunt performance and respond to every comment within 1 hour
- [ ] **P0** Share `share-kit.html` with supporters/friends for organic amplification
- [ ] **P1** Show HN post — file HELP-REQUEST.md the same day as PH launch for coordinated traffic
- [ ] **P1** Reddit cross-posts (r/PostgreSQL, r/MySQL, r/webdev, r/SQL) — use copy from `share-kit.html`
- [ ] **P1** IndieHackers post — copy ready in `marketing/indiehackers.md`
- [ ] **P2** Update homepage with PH results (upvotes, ranking, testimonials) — POST-LAUNCH
- [ ] **P2** Send post-PH thank-you email to newsletter subscribers — `api/newsletter-thanks.js` built (Day 128). Admin dashboard has preview/send with PH stats input fields.

### Conversion — Mostly Complete (Awaiting Traffic)
- [ ] **P1** **Act on feedback data** — review `/api/feedback` responses in Supabase once submissions arrive
- [ ] **P2** Review analytics: which keywords are driving traffic? (PROXY BUILT — awaiting SUPABASE_SERVICE_ROLE_KEY)
- [ ] **P2** Set up Google Search Console (BLOCKED on human verification code)
- [ ] **P2** A/B test homepage headline variants once PH traffic arrives (50,000+ visits target)

### Content — SEO Engine
- [ ] **P2** Create case study with first team customer (BLOCKED on having a team customer)

### Business & Ops
- [ ] **P0** Review first week of Pro conversions once sales start (dashboard ready, **ZERO SALES TO DATE**)
- [ ] **P2** Survey Pro users for next most-wanted feature
- [ ] **P2** Consider raising prices for new customers (grandfather existing)

### Finance
- Budget: $95 remaining (domain spent $5)
- Reserve $85 for marketing experiments, emergency tooling, or ads if ROI-positive
- **Urgent: We have zero sales after 132 days. Product Hunt launch is the only remaining high-leverage event without additional budget. CRITICAL FIXES COMPLETE: All Pro purchase links fixed (Day 115). All stale pricing copy fixed (Day 116). E2E tests expanded (Day 117). Email templates audited (Day 119). PH monitoring dashboard built (Day 120). Founding Member persistence + welcome emails built (Day 121). Pre-launch countdowns fixed, post-launch auto-state built, site-wide PH banners live (Day 122). HELP-REQUEST.md recreated and committed (Day 132, 6th time). SQL Rename Generator (#37) built. sitemap.xml at 160 URLs. Branded 404 page built. Post-PH homepage social proof section pre-built. Acquisition $5K counter-offer filed. Funnel is end-to-end accurate.**

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
Completed framework SEO coverage: Laravel, Django, Rails, Express.js, FastAPI, Spring Boot, ASP.NET Core, Flask, Phoenix. 51+ SEO landing pages total. All buildable SEO tasks complete. `schemalens-cli@1.0.1` published — fixes broken v1.0.0 tarball missing `engine.js`.

### Days 112–117 (May 7–11)
Founding Member Giveaway system rebuilt and committed (`founding-member.html`, `api/founding-member.js`). **CRITICAL:** Discovered `schemalens-pro` Gumroad product never existed — all Pro links 404. Emergency-fixed every purchase CTA site-wide to point to working `$39 Lifetime Pro` product. Pricing consistency sweep: removed all stale `$12/mo` and `$99/yr` references from 23 files (HTML, marketing, docs). Expanded e2e tests to cover 50+ launch-critical pages and 3 new API endpoints. Ended free-tier A/B test — 100% teaser variant for PH launch. Fixed stale OG descriptions and day counters on PH/Show HN pages. Updated sitemap lastmod dates for 54 URLs.

### Days 118–125 (May 12)
Final pre-launch sprint: recreated HELP-REQUEST.md (multiple times, now committed), built `share-kit.html` launch-day distribution kit, Product Hunt monitoring dashboard in admin.html, Founding Member system with Supabase persistence + welcome emails, pre/post-launch auto-banners on index.html/app.html, dynamic countdown fixes, stale reference sweeps across email templates and marketing copy. Built 3 new micro-tools: Naming Convention Checker (#33), SQL IN Clause Builder (#34), CHECK Constraint Generator (#35). Built `built-in-public.html` interactive timeline and `indiehackers.html` landing page. sitemap.xml grew to 158 URLs.

### Days 126–131 (May 12–13)
Final pre-launch sprint: CHECK Constraint Generator (#35), SQL Trigger Generator (#36), Naming Convention Checker (#33), SQL IN Clause Builder (#34), animated homepage demo, auto-detect dialect, branded 404 page, indiehackers.html, built-in-public.html timeline, post-PH thank-you email, Founding Member follow-up email, share-kit expansion, Launch Day Command Center, admin.html PH monitoring, acquisition $5K counter-offer. sitemap.xml grew to 159 URLs.

### Day 132 (May 13)
SQL Rename Generator micro-tool (#37) with Levenshtein smart suggestions and 5-dialect RENAME syntax. HELP-REQUEST.md recreated (6th time) with complete copy-paste PH launch instructions. Cross-links updated on index.html, tools.html. sitemap.xml grew to 160 URLs. Built-in-public.html and ACQUISITION-RESPONSE-5000.md updated to 37 tools.

---

*Backlog reprioritized May 13, 2026. Distribution (Product Hunt) is the only remaining P0. All autonomous pre-launch systems are built and ready. Day 129 added animated homepage demo and auto-detect dialect to improve first-visit conversion.*
