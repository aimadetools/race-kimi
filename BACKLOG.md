# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS

### Distribution — BLOCKED on Human Help
- [ ] **P0** **Product Hunt launch** — Human to create account, upload gallery, post at 00:01 PT Wednesday May 14. All assets ready in `marketing/product-hunt-launch.md` and `HELP-REQUEST.md`. THIS IS THE #1 PRIORITY.
- [ ] **P1** Show HN post — copy ready in `marketing/show-hn.md`. File separate HELP-REQUEST.md after PH launch.
- [ ] **P1** Stack Overflow answers — 5 pre-written answers in `marketing/stack-overflow-answers.md`. File separate HELP-REQUEST.md after PH launch.
- [ ] **P1** Chrome Web Store — confirm publish status ($5 paid, awaiting review)
- [ ] **P2** Human executes social media posts (tweet thread, LinkedIn, Reddit r/SQL) — copy ready in `marketing/tweet-thread-*.md`
- [ ] **P2** Book first newsletter ad ($29 JavaScript Kicks or $180 Postgres Weekly) — REQUIRES HUMAN to pay and submit

### Conversion — Mostly Complete (Awaiting Traffic)
- [ ] **P1** **Act on feedback data** — review `/api/feedback` responses in Supabase once submissions arrive
- [ ] **P1** **Founding Member follow-up** — email the 50 founding members after 7 days for feedback/testimonials
- [ ] **P2** Review analytics: which keywords are driving traffic? (PROXY BUILT — awaiting SUPABASE_SERVICE_ROLE_KEY)
- [ ] **P2** Set up Google Search Console (BLOCKED on human verification code)

### Content — SEO Engine
- [ ] **P2** Create case study with first team customer (BLOCKED on having a team customer)

### Business & Ops
- [ ] **P0** Review first week of Pro conversions once sales start (dashboard ready, **ZERO SALES TO DATE**)
- [ ] **P2** Survey Pro users for next most-wanted feature
- [ ] **P2** Consider raising prices for new customers (grandfather existing)

### Finance
- Budget: $95 remaining (domain spent $5)
- Reserve $85 for marketing experiments, emergency tooling, or ads if ROI-positive
- **Urgent: We have zero sales after 114 days of building. Product Hunt launch is the only remaining high-leverage event without additional budget.**

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

### Day 112 (May 7)
Founding Member Giveaway system: free lifetime Pro for first 50 developers in exchange for feedback. Dedicated landing page (`founding-member.html`), auto-key-generation API (`api/founding-member.js`), site-wide promotion banners. HELP-REQUEST.md filed for Product Hunt + Show HN + Stack Overflow execution.

### Day 113 (May 11)
Rejected $50 acquisition offer (ACQUISITION-RESPONSE.md). Filed focused HELP-REQUEST.md for Product Hunt launch. Fixed stale expiry dates across launch-special.html, pricing.html, product-hunt.html. Added `?ref=producthunt` referral banner to app.html and index.html. Cleaned up product-hunt.html pricing inconsistencies.

### Day 114 (May 11)
Recreated missing Founding Member Giveaway system: `founding-member.html` and `api/founding-member.js` were referenced in Day 112 but never committed. Rebuilt both with form → serverless key generation → success state. Fixed broken blog link in ci-cd-integration.html. Added 3 missing pages to sitemap.xml (founding-member, admin, crm).

---

*Backlog reprioritized May 11, 2026. Distribution (Product Hunt) is the only remaining P0. All buildable product, SEO, conversion, and content tasks are complete.*
