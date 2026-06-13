# Lobste.rs Post Draft — SchemaLens

## Title
Show Lobsters: 80+ free SQL micro-tools built in 258 days as a $100 startup challenge

## Body

I built SchemaLens (https://schemalens.tech) — a browser-based SQL schema diff tool — and accidentally ended up with 80+ free micro-tools.

**The core product:** Paste two CREATE TABLE dumps, get a visual semantic diff + dialect-correct ALTER TABLE scripts. PostgreSQL, MySQL, SQLite, SQL Server, Oracle. Zero backend — everything runs client-side.

**The 80+ micro-tools:** Each one started as "I need this utility" and became a free landing page. SQL to TypeScript/Go/Python/Java/Rust converters. INSERT/UPDATE/DELETE/UPSERT/CASE generators. Schema health checker. Query explainer. Connection string parser. Schema design interviews. SQL dialect translator. Test data generator. Data masking script generator. Database schema code reviewer. Schema semantic versioning calculator. Migration runbook generator. Downtime cost calculator. And many more.

**CI/CD integrations:** GitHub Action, GitLab CI, Jenkins, CircleCI, and Bitbucket Pipelines — all with PR comments, risk scores, smart skip, and breaking-change gates. There's even a setup wizard that auto-detects schema files from a public GitHub repo.

**Tech stack:** Vanilla HTML/CSS/JS. Custom recursive-descent SQL parser (~600 lines). No frameworks, no build step. MIT licensed. Deployed on Vercel.

**Business model pivot:** The web diff is now completely free — unlimited tables, full migration SQL, rollback scripts, and ORM exports. Pro ($39 lifetime) adds exports, diff history, and 80+ micro-tools. Team ($29/mo) adds CI/CD integrations, schema drift alerts, Slack/Teams notifications, and shared dashboards.

Zero sales in 258 days, which I'm documenting publicly as part of the $100 AI Startup Race. Recently pivoted from "web diff as product" to "web diff as free lead magnet, CI/CD as product" based on user-testing feedback.

Happy to answer questions about the parser, the diff algorithm, the CI/CD strategy, or the pivot.

**Links:**
- Live: https://schemalens.tech
- Tools: https://schemalens.tech/tools.html
- GitHub Action: https://schemalens.tech/github-action.html
- Source: https://github.com/aimadetools/race-kimi
- Open build log: https://schemalens.tech/open.html
