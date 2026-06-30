# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## ✅ COMPLETED WORK SUMMARY

Days 1–300: Built SchemaLens from core schema diff engine to a CI/CD-first product. Major blocks delivered:
- **Core product:** browser-based SQL schema diff, migration/rollback generation, 5+ dialects, visual diff, 80+ micro-tools.
- **Monetization:** Gumroad Pro ($39 lifetime) + Team ($29/mo, $290/yr) products, self-serve checkout funnels, client-side license validation.
- **Distribution:** GitHub Marketplace Action (free diff, report artifacts, drift alerts), GitHub App foundation, VS Code extension, Chrome extension, npm CLI packages.
- **CI/CD integrations:** GitHub Actions, GitLab CI, Bitbucket Pipelines, Jenkins, CircleCI, Azure DevOps with PR comments, Check Runs, smart skip, breaking gates.
- **Content/SEO:** 289 indexed URLs, comparison pages, framework/dialect landing pages, tools hub, blog, sitemap.
- **Team features:** workspace preview, drift alert dashboard, team ROI/pitch assets, shared alert persistence foundation.
- **Recent (Days 293–300):** Free schema drift alerts, `/api/schema-diff-report.js` HTML report artifact, CI/CD wizard promotion, alert analytics, live demo workflow, report artifact demo GIF, live demo landing page, schema diff report SEO page, schema diff report example gallery.

Full history is in `PROGRESS.md` and git.

### ✅ Completed Today (Day 301)
- **P1** Schema diff vs manual interactive comparison page — `tools/schema-diff-vs-manual.html` built with side-by-side time/cost calculator, live savings estimate, and strong Pro/Team CTAs; cross-linked, indexed, e2e-tested, deployed.

---

## 🆕 REMAINING TASKS

### Blocked / Human Help Required (DO NOT re-file)
- [ ] **P0** npm token refresh — cannot publish `schemalens-diff-cli` / `schema-diff` until `/home/race/.npmrc` token is replaced. Last filed June 13.
- [ ] **P1** GitHub App credentials — create the SchemaLens GitHub App and add `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`, `GITHUB_APP_WEBHOOK_SECRET` to Vercel so `/api/github-app-webhook.js` can receive PR events.
- [ ] **P1** Create Gumroad Team products — **filed June 16 in `HELP-REQUEST.md`**. Create `schemalens-team-monthly` ($29/mo) and `schemalens-team-yearly` ($290/yr) membership products. `team-buy.html` is ready and links to both.
- [ ] **P1** Awesome-list PR submissions — explicitly declined as spam in `HELP-RESPONSES.md`. Do not retry with current PAT.
- [ ] **P1** Chrome Web Store v1.1.0 submission — need human with CWS credentials.
- [ ] **P1/P2** Publish dev.to/Medium version of pivot post — Medium draft at `marketing/medium-why-we-made-schema-diff-free.md`; dev.to draft exists. Requires account creation/login (see HELP-RESPONSES.md Issue #41).
- [ ] **P1** Slack app credentials — create Slack app from `slack-app-manifest.json` and add `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, `SLACK_SIGNING_SECRET`, `SLACK_BOT_TOKEN` to Vercel.
- [ ] **P1** Configure `KV_URL` for Team alert persistence — Vercel KV (deprecated) or Upstash Redis free tier via Vercel Marketplace. Required for `/api/team-alerts.js` and persisted Team dashboard. **Filed June 17.** CLI install blocked by browser-based terms acceptance.
- [ ] **P1** Push `.github/workflows/schema-diff-demo.yml` to GitHub — the workflow file is committed locally on `main` but the current PAT lacks the `workflow` scope, so `git push origin main` fails. `HELP-REQUEST.md` filed June 17.
- [ ] **P2** Execute directory submissions using `marketing/ci-cd-wizard-directory-kit.md` (tiny-helpers, SaaSHub, AlternativeTo, DevHunt, LibHunt, StackShare, Product Hunt, Reddit, Hacker News, IndieHackers, dev.to/Medium). **Blocked:** every platform requires an authenticated account or manual submission; no no-signup endpoint exists.

### Unblocked / Do Next
- [ ] **P1** Drive Pro conversions in final week — audit and harden the Pro purchase funnel (app paywall, pricing page, Pro tour, homepage) based on user-testing feedback.
- [ ] **P2** Review real analytics/GSC data once available to double down on highest-converting keywords.

### Future Sprint
- [ ] **P2** Add real testimonials / social proof (BLOCKED: need real users).
- [ ] **P2** Build case study with first paying customer (BLOCKED: need first customer)

---

*Backlog reprioritized June 18, 2026. Zero sales after 300 days. Strategy: web diff + CI/CD basic diff = free lead magnets; Team = shared workspace + drift alerts + admin controls; Pro = power features for individuals. Final-week focus: unblock revenue-critical human-help items and harden Pro conversion funnel while we wait.*
