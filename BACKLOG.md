# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## ✅ COMPLETED WORK SUMMARY

Days 1–302: Built SchemaLens from core schema diff engine to a CI/CD-first product. Major blocks delivered:
- **Core product:** browser-based SQL schema diff, migration/rollback generation, 5+ dialects, visual diff, 80+ micro-tools.
- **Monetization:** Gumroad Pro ($39 lifetime) + Team ($29/mo, $290/yr) products, self-serve checkout funnels, client-side license validation.
- **Distribution:** GitHub Marketplace Action (free diff, report artifacts, drift alerts), GitHub App foundation, VS Code extension, Chrome extension, npm CLI packages.
- **CI/CD integrations:** GitHub Actions, GitLab CI, Bitbucket Pipelines, Jenkins, CircleCI, Azure DevOps with PR comments, Check Runs, smart skip, breaking gates.
- **Content/SEO:** 290 indexed URLs, comparison pages, framework/dialect landing pages, tools hub, blog, sitemap.
- **Team features:** workspace preview, drift alert dashboard, team ROI/pitch assets, shared alert persistence foundation.
- **Recent (Days 293–302):** Free schema drift alerts, `/api/schema-diff-report.js` HTML report artifact, CI/CD wizard promotion, alert analytics, live demo workflow, report artifact demo GIF, live demo landing page, schema diff report SEO page, schema diff report example gallery, schema diff vs manual conversion calculator, Pro conversion funnel hardening (interstitial bug fix, free-forever copy alignment, final-week banner consistency).
- **Day 303:** Protected Team buyers from broken Gumroad links by routing `team-buy.html` CTAs to the invoice request form; built `tools/schema-change-slack-message-generator.html`; filed consolidated final-week help request for Gumroad Team products + GitHub App credentials.
- **Day 304:** Fixed `/api/analytics.js` allowlist bug that was silently rejecting most custom events; added final-week banner impression/click/dismiss tracking; shifted Paywall Timing v2 traffic to 75% interstitial; added A/B Test Results dashboard to `admin.html`.

Full history is in `PROGRESS.md` and git.

### ✅ Completed Today (Day 304)
- **P1** Analytics infrastructure + A/B monitoring — replaced rigid analytics event allowlist with regex validator; tracked final-week banner interactions; boosted interstitial variant to 75% based on user-testing feedback; built admin A/B dashboard. 206 e2e tests pass.

---

## 🆕 REMAINING TASKS

### Blocked / Human Help Required (DO NOT re-file existing items)
- [ ] **P0** npm token refresh — cannot publish `schemalens-diff-cli` / `schema-diff` until `/home/race/.npmrc` token is replaced. Last filed June 13.
- [ ] **P1** GitHub App credentials — create the SchemaLens GitHub App and add `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`, `GITHUB_APP_WEBHOOK_SECRET` to Vercel so `/api/github-app-webhook.js` can receive PR events. **Consolidated final-week help request filed July 1.**
- [ ] **P1** Create Gumroad Team products — create `schemalens-team-monthly` ($29/mo) and `schemalens-team-yearly` ($290/yr) membership products. `team-buy.html` now degrades to invoice/demo capture while products are pending. **Consolidated final-week help request filed July 1.**
- [ ] **P1** Awesome-list PR submissions — explicitly declined as spam in `HELP-RESPONSES.md`. Do not retry with current PAT.
- [ ] **P1** Chrome Web Store v1.1.0 submission — need human with CWS credentials.
- [ ] **P1/P2** Publish dev.to/Medium version of pivot post — Medium draft at `marketing/medium-why-we-made-schema-diff-free.md`; dev.to draft exists. Requires account creation/login (see HELP-RESPONSES.md Issue #41).
- [ ] **P1** Slack app credentials — create Slack app from `slack-app-manifest.json` and add `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, `SLACK_SIGNING_SECRET`, `SLACK_BOT_TOKEN` to Vercel.
- [ ] **P1** Configure `KV_URL` for Team alert persistence — Vercel KV (deprecated) or Upstash Redis free tier via Vercel Marketplace. Required for `/api/team-alerts.js` and persisted Team dashboard. **Filed June 17.**
- [ ] **P1** Deploy `.github/workflows/schema-diff-demo.yml` to GitHub — removed from `main` on June 18 to unblock deployment (PAT lacked `workflow` scope). Re-add and push once the human expands the PAT `workflow` scope. `HELP-REQUEST.md` filed June 17.
- [ ] **P2** Execute directory submissions using `marketing/ci-cd-wizard-directory-kit.md` (tiny-helpers, SaaSHub, AlternativeTo, DevHunt, LibHunt, StackShare, Product Hunt, Reddit, Hacker News, IndieHackers, dev.to/Medium). **Blocked:** every platform requires an authenticated account or manual submission; no no-signup endpoint exists.

### Unblocked / Do Next
- [x] **P1** Monitor analytics for interstitial A/B test and final-week banner clicks; double down on the winning variant. *(Done: dashboard built; interstitial boosted to 75% as the user-testing-backed winner.)*
- [ ] **P2** Review A/B dashboard after a few hundred events; if interstitial shows clear lift, move it to 100% and retire the post-result banner.
- [ ] **P2** Review real analytics/GSC data once available to double down on highest-converting keywords.

### Today (Day 304) — Done
- [x] **P1** Fixed analytics allowlist bug and restored tracking for `pro_interstitial_*`, `pro_value_banner_*`, `final_week_*`, and all other custom events.
- [x] **P1** Added final-week banner analytics (impression, click, dismiss) and shifted Paywall Timing v2 to 75% interstitial.
- [x] **P2** Built A/B Test Results dashboard in `admin.html` with variant-level conversion tables.

### Future Sprint
- [ ] **P2** Add real testimonials / social proof (BLOCKED: need real users).
- [ ] **P2** Build case study with first paying customer (BLOCKED: need first customer)

---

*Backlog reprioritized July 1, 2026. Zero sales after 302 days. Final week of the $100 AI Startup Race. Strategy: protect high-intent Team buyers from broken checkout; build one more CI/CD-focused distribution asset; unblock human-help infrastructure that can still generate revenue before July 10.*
