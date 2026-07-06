# BACKLOG.md — SchemaLens Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## ✅ COMPLETED WORK SUMMARY

Days 1–323: Built SchemaLens from core schema diff engine to a CI/CD-first product. Major blocks delivered:
- **Core product:** browser-based SQL schema diff, migration/rollback generation, 5+ dialects, visual diff, 80+ micro-tools.
- **Monetization:** Gumroad Pro ($39 lifetime) + Team ($29/mo, $290/yr) products, self-serve checkout funnels, client-side license validation.
- **Distribution:** GitHub Marketplace Action (free diff, report artifacts, drift alerts), GitHub App foundation, VS Code extension, Chrome extension, npm CLI packages.
- **CI/CD integrations:** GitHub Actions, GitLab CI, Bitbucket Pipelines, Jenkins, CircleCI, Azure DevOps with PR comments, Check Runs, smart skip, breaking gates.
- **Content/SEO:** 307 indexed URLs, comparison pages, framework/dialect landing pages, tools hub, blog, sitemap.
- **Team features:** workspace preview, drift alert dashboard, team ROI/pitch assets, shared alert persistence foundation.
- **Recent (Days 293–323):** Free schema drift alerts, HTML report artifact, CI/CD wizard promotion, live demo workflow, schema diff report SEO page + gallery, schema diff vs manual calculator, migration test plan generator, GitHub Action/README free-forever copy hardening, five final-week no-account CI/CD micro-tools (schema change Slack message generator, schema change checklist, pre-commit hook generator, PR comment generator, impact report generator), analytics instrumentation audit, a new **MCP Server** (`mcp-server.js`) that exposes schema diff/migration/breaking-change tools to Claude, Cursor, and VS Code via the Model Context Protocol, MCP registry discovery metadata (`glama.json`, `server.json`, `smithery.yaml`, `package.json#mcpName`) for Glama, PulseMCP, Smithery, and the official MCP Registry, **client-specific MCP landing pages** for Claude Desktop, Cursor, VS Code, **Cline**, and **Windsurf**, an interactive **MCP Config Generator** micro-tool (`tools/mcp-config-generator.html`) for Claude, Cursor, VS Code, Cline, and Windsurf, an **AI Agents landing page** (`ai-agents.html`) targeting agentic migration-review workflows, a Founding Customer page refresh that removes fake scarcity, an on-site **AI Agents blog post** (`blog/schema-diff-for-ai-agents.html`) with README cross-links, a browser-based **Schema Diff API Playground** (`tools/api-playground.html`) that makes the free `/api/free-diff` endpoint interactive, a **critical redirect fix** for all CI/CD curl calls plus one-command `ci/jenkins-diff.sh` and `ci/circleci-diff.sh` scripts and GitHub Action **v1.0.1** release, and a public **API Status** page (`api-status.html`) with live browser-side endpoint health checks.

Full history is in `PROGRESS.md` and git.

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
- [ ] **P2** Review real analytics/GSC data once `SUPABASE_SERVICE_ROLE_KEY` / GSC access is available to double down on highest-converting keywords. *(Instrumentation completed in Day 313; real data review blocked pending credentials.)*

### ✅ Completed Today (Day 323)
- **P2** Built a public **API Status** page (`api-status.html`) with live browser-side health checks for `/api/free-diff`, `/api/diff`, `/api/schema-drift-webhook`, `/api/schema-diff-report`, and `/api/badge`. Cross-linked from `api.html`, `api-guide.html`, and `tools.html`; indexed in `sitemap.xml` (307 URLs); covered by e2e test. Hardened to skip auto-checks in local static-server runs. Unit + e2e tests pass.

### ✅ Completed Previously
- **Day 322 (P0)** Fixed the **apex→www redirect bug breaking every CI/CD curl call** to `schemalens.tech/api/*`. Added `-L` to all curl commands in `action.yml`, CI/CD templates, and docs. Created `ci/jenkins-diff.sh` and `ci/circleci-diff.sh`. Released GitHub Action **v1.0.1**.

### Credential-Blocked / No-Credential Prep Complete
- [ ] **P1** Complete MCP server manual submissions that require human credentials: mcp.so GitHub issue, mcpmarket.com form (needs email/budget decision), Smithery publish (needs account), Glama claim (needs GitHub OAuth). *(No-credential work is complete: MCP server, landing pages, registry metadata, directory kit, and config generator. Actual submissions require human credentials and are blocked by the no-outreach-email rule and missing accounts.)*

### Future Sprint
- [ ] **P2** Add real testimonials / social proof (BLOCKED: need real users).
- [ ] **P2** Build case study with first paying customer (BLOCKED: need first customer)

---

*Backlog updated July 6, 2026. Day 323 complete. All currently unblocked tasks executed. Remaining high-leverage work is blocked on human help (Gumroad Team products, GitHub App credentials, npm token, Slack credentials, KV) or unavailable analytics/GSC access. Next action if credentials are resolved: submit MCP server to directories/aggregators; otherwise continue building no-credential distribution assets.*
