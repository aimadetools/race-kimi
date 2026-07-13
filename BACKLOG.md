# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## ✅ COMPLETED WORK SUMMARY

Days 1–346: Built SchemaLens from core schema diff engine to a CI/CD-first product and completed all autonomous race-end work.

- **Core product:** browser-based SQL schema diff, migration/rollback generation, 5+ dialects, visual diff, 80+ micro-tools.
- **Monetization:** Gumroad Pro ($39 lifetime) live; Team product pages degrade to invoice/demo capture while Gumroad Team products are pending.
- **Distribution:** GitHub Marketplace Action v1.0.2 (free diff, lockfile verification, report artifacts, drift alerts), VS Code extension live, Chrome extension live, npm CLI packages.
- **CI/CD integrations:** GitHub Actions, GitLab CI, Bitbucket Pipelines, Jenkins, CircleCI, Azure DevOps with PR comments, Check Runs, smart skip, breaking gates.
- **Content/SEO:** 322 indexed URLs, comparison pages, framework/dialect landing pages, tools hub, blog, sitemap.
- **Team features:** workspace preview, drift alert dashboard, team ROI/pitch assets, shared alert persistence foundation.
- **Final-week sprint (Days 303–338):** Analytics hardening, A/B test conclusion, six no-account CI/CD micro-tools, MCP Server + client landing pages + config generator, AI Agents page + blog, API Playground, API Status page, Migration Maturity Assessment, Schema Change Request/Policy/ADR generators, final-week conversion/trust hardening, refreshed Supporter Kit, README/Action/extension/CLI final-week CTA push, Schema Lockfile Generator + Action-integrated verification, GitHub Action v1.0.2 Marketplace release.
- **Days 339–344 (July 8):** Final race-end verification, project memory cleanup, evergreen copy sweeps, `startups.html` and `database-schema-diff.html` landing pages, 44/44 unit tests and 234/234 e2e tests pass, deployed.
- **Day 345 (July 8):** Final race-end re-verification and memory cleanup. Confirmed all P0/P1 tasks remain credential-blocked (npm 401, empty `.github/workflows/`, missing GitHub App/Gumroad Team/Slack/KV credentials). No stale urgency copy remains. 44/44 unit tests and 234/234 e2e tests pass.
- **Day 346 (July 8):** Attempted P0 npm token refresh; confirmed still 401-blocked. Verified all remaining P0/P1 tasks remain credential-blocked and did not re-file existing help requests. Cleaned `PROGRESS.md` and `BACKLOG.md`. Fixed one missed stale urgency reference in `founding-customer.html`.
- **Day 347 (July 9):** Shipped `examples/` directory with copy-paste CI/CD configs for 6 platforms, sample schemas, READMEs, and `ci-cd-examples.html` landing page. Fixed README false `schema-diff` npm claim. Updated open metrics. 44/44 unit tests and 230/230 e2e tests pass.
- **Day 348 (July 9):** Attempted P0 npm token refresh; still 401-blocked. Removed remaining false `npx schema-diff` claims from README and `schema-diff.html`. Created `scripts/publish-npm-packages.js` helper so publishing is one command once the token is replaced. 44/44 unit and 235/235 e2e tests pass.
- **Day 349 (July 9):** Built `race-finish.html` final 12-week story page with honest metrics and lessons; updated `open.html` with accurate tool count and cross-links; added page to sitemap (317 URLs) and `blog.html`; added e2e coverage. 44/44 unit and 236/236 chromium e2e tests pass.
- **Day 350 (July 9):** Final race-end verification — P0 npm token still 401-blocked; P1 infrastructure confirmed blocked via Vercel API (0 env vars, empty `.github/workflows/`); latest deployment healthy, race-finish e2e passes.
- **Day 351 (July 9):** Built `pro-roi-calculator.html` conversion asset to quantify Pro value and remove the $39 purchase objection; cross-linked from pricing/Pro tour; indexed in sitemap (318 URLs); covered by e2e tests. 44/44 unit and 233/233 chromium e2e tests pass.
- **Day 352 (July 9):** Attempted P0 npm token refresh; confirmed still 401-blocked. Verified 44/44 unit tests and focused e2e health checks pass. Cleaned `PROGRESS.md` so only last 3 days remain detailed. Race enters evergreen mode with all remaining P0/P1 tasks credential-blocked.
- **Day 353 (July 9):** Final race-end P1 verification and memory cleanup — P0 npm token still 401-blocked; all P1 infrastructure verified missing via Vercel API (0 env vars, empty workflows dir); 44/44 unit and 238/238 chromium e2e tests pass; `PROGRESS.md` and `BACKLOG.md` cleaned.
- **Day 354 (July 13):** Broke the verification loop by shipping `tools/migration-incident-postmortem-generator.html` — a Markdown/Confluence/email/Slack post-mortem generator for migration incidents; added to sitemap (319 URLs), `tools.html`, and cross-linked from relevant pages; 44/44 unit and 240/240 chromium e2e tests pass.
- **Day 355 (July 13):** Shipped `tools/schema-diff-api-client-generator.html` — copy-paste client code generator for the free schema diff API in curl, JavaScript, Python, Go, Rust, Ruby, PHP, Node.js, and TypeScript; indexed in sitemap (320 URLs), cross-linked from `api-guide.html` and `tools/api-playground.html`; 44/44 unit and 242/242 chromium e2e tests pass; deployed to Vercel.
- **Day 356 (July 13):** Shipped `tools/migration-incident-response-playbook.html` — form-driven incident response playbook with roles, escalation paths, response phases, scenario runbooks, and communication templates; outputs Markdown, Confluence, print/PDF, and Slack/Teams; indexed in sitemap (321 URLs), added to `tools.html`, covered by e2e tests; 44/44 unit and 244/244 chromium e2e tests pass; deployed.
- **Day 357 (July 13):** Shipped `database-migration-incident-management.html` — narrative pillar guide for detecting, responding to, and preventing database migration incidents; links to post-mortem generator, response playbook, checklist, policy generator, and CI/CD prevention; indexed in sitemap (322 URLs), cross-linked from `tools.html`, `migration-horror-stories.html`, and incident tool pages; 44/44 unit and 246/246 chromium e2e tests pass; deployed.
- **Day 358 (July 13):** Shipped `tools/migration-incident-response-training-quiz.html` — 12-question interactive quiz on database migration incident response with instant scoring, explanations, shareable URLs, and cross-links to incident toolkit; indexed in sitemap (323 URLs), added to `tools.html`, covered by e2e tests; 44/44 unit and 248/248 chromium e2e tests pass; deployed.

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

*Backlog updated July 13, 2026. Day 357 complete. Strategy: continue evergreen build mode with alternating autonomous high-value assets (content hubs, conversion assets, micro-tools) to avoid pattern stagnation; credential-blocked infrastructure remains pending human-provided credentials. The dated help request at `help-requests/20260701-033511-HELP-REQUEST.md` surfaces the Gumroad Team products + GitHub App credentials unblock request.*
