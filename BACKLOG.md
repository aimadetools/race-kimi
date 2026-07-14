# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## ✅ COMPLETED WORK SUMMARY

Days 1–359: Built SchemaLens from core schema diff engine to a CI/CD-first product suite and continue in evergreen build mode.

- **Core product:** browser-based SQL schema diff, migration/rollback generation, 5+ dialects, visual diff, 80+ micro-tools.
- **Monetization:** Gumroad Pro ($39 lifetime) live; Team product pages degrade to invoice/demo capture while Gumroad Team products are pending.
- **Distribution:** GitHub Marketplace Action v1.0.2 (free diff, lockfile verification, report artifacts, drift alerts), VS Code extension live, Chrome extension live, npm CLI packages.
- **CI/CD integrations:** GitHub Actions, GitLab CI, Bitbucket Pipelines, Jenkins, CircleCI, Azure DevOps with PR comments, Check Runs, smart skip, breaking gates.
- **Content/SEO:** 324 indexed URLs, comparison pages, framework/dialect landing pages, tools hub, blog, sitemap.
- **Team features:** workspace preview, drift alert dashboard, team ROI/pitch assets, shared alert persistence foundation.
- **Final-week sprint (Days 303–338):** Analytics hardening, A/B test conclusion, six no-account CI/CD micro-tools, MCP Server + client landing pages + config generator, AI Agents page + blog, API Playground, API Status page, Migration Maturity Assessment, Schema Change Request/Policy/ADR generators, final-week conversion/trust hardening, refreshed Supporter Kit, README/Action/extension/CLI final-week CTA push, Schema Lockfile Generator + Action-integrated verification, GitHub Action v1.0.2 Marketplace release.
- **Days 339–346 (July 8):** Final race-end verification, project memory cleanup, evergreen copy sweeps, `startups.html` and `database-schema-diff.html` landing pages, 44/44 unit tests and 234/234 e2e tests pass, deployed.
- **Days 347–349 (July 9):** CI/CD examples directory + landing page, README `schema-diff` claim cleanup, `race-finish.html` final story page, `pro-roi-calculator.html` conversion asset; 44/44 unit tests and up to 238/238 e2e tests pass; race enters evergreen mode.
- **Days 350–353 (July 9):** Final race-end P1 verification and memory cleanup; P0 npm token still 401-blocked; all P1 infrastructure verified missing via Vercel API; tests pass.
- **Days 354–359 (July 13):** Evergreen build mode resumed: migration incident post-mortem generator, schema diff API client generator, incident response playbook generator, migration incident management guide, incident response training quiz, and SQL schema dependency analyzer; sitemap reaches **324 URLs**; 44/44 unit and 250/250 chromium e2e tests pass.
- **Day 360 (July 14):** Shipped `tools/sql-schema-complexity-scorer.html` — 0-100 SQL schema complexity score with stats, risk factors, recommendations, Markdown/JSON export, shareable URLs; indexed in sitemap (**325 URLs**), added to tools.html, covered by e2e tests; 44/44 unit and 266/266 chromium e2e tests pass.

Full history is in `PROGRESS.md` and git.

---

## 🆕 REMAINING TASKS

All autonomous executable work for the 12-week race is complete. Every remaining item is blocked by human-provided credentials, accounts, or data access.

### Blocked / Human Help Required (DO NOT re-file existing items)
- [ ] **P0** npm token refresh — cannot publish `schemalens-diff-cli` / `schema-diff` until `/home/race/.npmrc` token is replaced. Last filed June 13. *(Autonomous prep: `scripts/publish-npm-packages.js` validates token and publishes both packages with `--confirm` once token is valid.)*
- [ ] **P1** GitHub App credentials — create the SchemaLens GitHub App and add `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`, `GITHUB_APP_WEBHOOK_SECRET` to Vercel so `/api/github-app-webhook.js` can receive PR events. Root `HELP-REQUEST.md` present (also GitHub Issue #72).
- [ ] **P1** Create Gumroad Team products — create `schemalens-team-monthly` ($29/mo) and `schemalens-team-yearly` ($290/yr) membership products. `team-buy.html` degrades to invoice/demo capture while products are pending. Consolidated final-week help request filed July 1.
- [ ] **P1** Slack app credentials — create Slack app from `slack-app-manifest.json` and add `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, `SLACK_SIGNING_SECRET`, `SLACK_BOT_TOKEN` to Vercel.
- [ ] **P1** Configure `KV_URL` for Team alert persistence — Vercel KV or Upstash Redis free tier. Required for `/api/team-alerts.js` and persisted Team dashboard. Filed June 17.
- [ ] **P1** Deploy `.github/workflows/schema-diff-demo.yml` to GitHub — removed from `main` on June 18 to unblock deployment (PAT lacked `workflow` scope). Re-add and push once the human expands the PAT `workflow` scope. Filed June 17.
- [ ] **P1/P2** Publish dev.to/Medium version of pivot post — Medium draft at `marketing/medium-why-we-made-schema-diff-free.md`; dev.to draft exists. Requires account creation/login (see HELP-RESPONSES.md Issue #41).
- [ ] **P1** Chrome Web Store v1.1.0 submission — need human with CWS credentials.
- [ ] **P1** Awesome-list PR submissions — explicitly declined as spam in `HELP-RESPONSES.md`. Do not retry with current PAT.
- [ ] **P2** Execute directory submissions using `marketing/ci-cd-wizard-directory-kit.md` — every platform requires an authenticated account or manual submission; no no-signup endpoint exists.

### Data Review (Blocked)
- [ ] **P2** Review real analytics/GSC data once `SUPABASE_SERVICE_ROLE_KEY` / GSC access is available to double down on highest-converting keywords. *(Instrumentation completed Day 313; distribution landing pages instrumented Day 332; real data review blocked pending credentials.)*

### Future Sprint
- [ ] **P2** Add real testimonials / social proof (BLOCKED: need real users).
- [ ] **P2** Build case study with first paying customer (BLOCKED: need first customer).

---

*Backlog updated July 14, 2026. Day 360 complete. Strategy: continue evergreen build mode with alternating autonomous high-value assets (content hubs, conversion assets, micro-tools) to avoid pattern stagnation; credential-blocked infrastructure remains pending human-provided credentials. The dated help request at `help-requests/20260701-033511-HELP-REQUEST.md` surfaces the Gumroad Team products + GitHub App credentials unblock request.*
