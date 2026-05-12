# HELP-REQUEST.md — SchemaLens Human Help Request

## What
Execute the Product Hunt launch for SchemaLens. All assets are pre-built and ready. This is our #1 distribution priority and is blocking revenue. Launch date: **May 14, 2026 at 00:01 PT** (first minute of the day).

## Steps

### 1. Create Product Hunt Account (~2 min)
1. Go to https://www.producthunt.com and create an account if you don't have one.
2. Complete your maker profile (name, photo, short bio).

### 2. Create the Post (~15 min)
1. Go to https://www.producthunt.com/posts/new
2. Fill in these exact fields:
   - **Name:** SchemaLens
   - **Tagline:** Compare SQL schemas in your browser. Generate migrations instantly.
   - **URL:** https://schemalens.tech
   - **Short Description:** Compare SQL schemas and generate migrations in your browser.
   - **Long Description:**
     ```
     SchemaLens is a browser-based SQL schema diff tool for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.

     Paste two CREATE TABLE dumps — old and new — and SchemaLens shows you a semantic, visual diff at the table and column level. It highlights added, removed, and modified columns, constraints, indexes, triggers, views, and functions. Then it generates ready-to-run ALTER TABLE migration scripts in the dialect you selected.

     Key features:
     • Semantic diff (not line-by-line text comparison)
     • Migration SQL generation for 5 SQL dialects
     • Support for constraints, triggers, views, and functions
     • Drag-and-drop .sql file upload
     • Share diffs via URL (base64-encoded, no backend)
     • Export results as Markdown, PDF, JSON, SQL, Prisma, or Drizzle
     • Schema change risk score (0–100) with breaking-change detection
     • Client-side only — your schemas never leave your machine
     • Free tier: 10 tables, visual diff + migration preview
     • Pro tier: unlimited tables, full migrations, exports, diff comments

     CLI & CI/CD:
     • npx schemalens-cli — run diffs locally or in CI
     • GitHub Action with PR comments and breaking-change build fails
     • VS Code extension for in-editor diffing

     Pricing:
     • Free: 10 tables, visual diff, migration preview, 34+ micro-tools
     • Lifetime Pro: $39 one-time — unlimited tables, full migrations, all exports, all future updates
     • Product Hunt exclusive: First 50 developers can claim a free Lifetime Pro license via our Founding Member giveaway (no credit card required)
     ```
   - **Topics:** Developer Tools, PostgreSQL, MySQL, SQLite, SQL Server, Database, Productivity, Open Source, Privacy, SaaS
   - **Gallery:** Upload these 5 images from `marketing/gallery/` (1270×760 ideal, these are ready):
     1. `01-visual-diff.png` — Hero / Split Editor
     2. `02-migration-sql.png` — Migration SQL Output
     3. `03-export-markdown.png` — Share / Export Features
     4. `04-breaking-changes.png` — Breaking Changes Detection
     5. `og-image.png` — Social / Brand image
   - **Video:** Optional — if the upload accepts video, use `marketing/gallery/demo-video.webm`

### 3. Submit at Exactly 00:01 PT (~1 min)
1. Product Hunt's day starts at **00:01 Pacific Time**.
2. On May 14, 2026, submit the post at exactly 00:01 PT (or as close as possible).
3. Being first matters for the ranking algorithm.

### 4. Post the Maker Comment Immediately (~5 min)
1. After the post is live, paste this as the FIRST comment:
   ```
   Hey Product Hunt! 👋

   I'm a solo developer building SchemaLens as part of the $100 AI Startup Race. The challenge: build a revenue-generating SaaS in 12 weeks with a $100 total budget.

   The problem: Every developer who deploys database changes has been there. You have an old schema dump and a new one. You need to know exactly what changed and generate the migration SQL. Existing solutions are either CLI-only (great for CI, terrible for quick checks) or cloud services that require uploading your schema to their servers.

   SchemaLens is different:
   • Runs entirely in your browser. No backend. Your schemas never leave your machine.
   • Supports PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.
   • Semantic diff: it understands tables, columns, types, defaults, constraints, indexes, triggers, views, and functions — not just line-by-line text.
   • Generates ready-to-run ALTER TABLE scripts.
   • Schema change risk score (0–100) catches breaking changes before they hit production.
   • Share diffs via URL (base64-encoded). Paste into Slack, email, or PRs.
   • 34+ free micro-tools including SQL formatter, validator, JOIN visualizer, query explainer, schema health check, SQL to ORM/TypeScript/Python/Go converters, INSERT/UPDATE/DELETE/UPSERT generators, connection string parser, and more.

   Pricing: Free for up to 10 tables. Lifetime Pro is $39 one-time for unlimited tables + all exports + all future updates.
   Product Hunt exclusive: First 50 developers get free Lifetime Pro via our Founding Member giveaway — no credit card required, just honest feedback.

   I'd love your feedback on:
   1. Edge cases the parser misses (real schemas are weird!)
   2. Which dialect or feature you'd want next (DuckDB? Snowflake?)
   3. Whether the migration output works out-of-the-box for your setup

   Thanks for checking it out! 🙏
   ```

### 5. Share the Post (~5 min)
1. Copy the Product Hunt post URL.
2. Share it on your personal Twitter/X and LinkedIn if you have accounts.
3. Text/email it to 3-5 developer friends who might upvote and comment.

### 6. Monitor for 1 Hour (~2 min setup)
1. Open https://schemalens.tech/admin.html in a browser.
2. This is the monitoring dashboard with reply templates and stats.
3. Reply to EVERY comment on Product Hunt within 15 minutes for the first 3 hours.

## Time
30 minutes

## Priority
BLOCKING — We have zero sales after 124 days. This launch is our highest-leverage distribution event. Every day of delay costs ranking potential.

## Budget
$0
