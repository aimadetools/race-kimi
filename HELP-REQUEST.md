# HELP-REQUEST.md — SchemaLens Human Help Request

## What
Execute the Product Hunt launch for SchemaLens. All assets are pre-built and ready. This is our #1 distribution priority and is blocking revenue. Product Hunt launch is scheduled for May 14, 2026 at 00:01 PT (first minute of the day). The sooner it is posted, the better.

## Steps

### 1. Create Product Hunt Post (~15 min)
1. Go to https://www.producthunt.com/posts/new
2. Log in or create a Product Hunt account if needed.
3. Fill in the following EXACT information:
   - **Name:** SchemaLens
   - **Tagline:** Compare SQL schemas in your browser. Generate migrations instantly.
   - **Short Description:** Compare SQL schemas and generate migrations in your browser.
   - **Category:** Developer Tools
   - **Topics:** SQL, PostgreSQL, MySQL, Database, Developer Tools
   - **Website URL:** https://schemalens.tech/?ref=producthunt
   - **GitHub URL:** https://github.com/schemalens/schemalens (if you have one, otherwise leave blank)
   - **Pricing:** Free + Paid ($39 one-time Lifetime Pro)
   - **App Store URL:** (leave blank)
   - **Play Store URL:** (leave blank)

4. **Long Description** — copy and paste this exactly:
```
SchemaLens is a browser-based SQL schema diff tool for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.

Paste two CREATE TABLE dumps — old and new — and SchemaLens shows you a semantic, visual diff at the table and column level. It highlights added, removed, and modified columns, constraints, indexes, triggers, views, and functions. Then it generates ready-to-run ALTER TABLE migration scripts in the dialect you selected.

Key features:
- Semantic diff (not line-by-line text comparison)
- Migration SQL generation for 5 dialects
- Support for constraints, triggers, views, and functions
- Drag-and-drop .sql file upload
- Share diffs via URL (no backend)
- Export as Markdown, PDF, JSON, SQL, Prisma, or Drizzle
- Schema change risk score (0–100) with breaking-change detection
- Client-side only — your schemas never leave your machine
- Free tier: 10 tables, visual diff + migration preview
- Pro tier: unlimited tables, full migrations, exports

CLI & CI/CD:
- npx schemalens-cli — run diffs locally or in CI
- GitHub Action with PR comments and breaking-change build fails
- VS Code extension for in-editor diffing

Pricing:
- Free: 10 tables, visual diff, migration preview, 35+ micro-tools
- Lifetime Pro: $39 one-time — unlimited tables, full migrations, all exports, all future updates
- Product Hunt exclusive: First 50 developers can claim a free Lifetime Pro license via our Founding Member giveaway — no credit card required, just honest feedback.
```

5. **Upload Gallery Images** — You need 3-5 images (1270×760 ideal). If pre-built gallery images exist in `marketing/gallery/`, use those. Otherwise:
   - Image 1: Screenshot of https://schemalens.tech/app.html with both schema panels filled and Visual Diff tab active. Use Chrome DevTools device toolbar at 1280×800.
   - Image 2: Screenshot of Migration SQL tab with syntax-highlighted ALTER TABLE statements.
   - Image 3: Screenshot of Export Markdown tab or Share modal.
   - Image 4: Simple graphic showing PostgreSQL, MySQL, SQLite, SQL Server, Oracle logos with text "5 dialects. One tool."
   - Image 5: Text graphic: "Your schemas never leave your browser" + "100% client-side" + "No signup required"

6. **Maker Settings:**
   - Check "I am the maker" (you are posting on behalf of SchemaLens)
   - If it asks for a hunter, you can hunt it yourself or request one from the PH community.

7. **Schedule:** Submit the post at 00:01 PT on May 14, 2026 (first minute of the day). If you cannot post at exactly 00:01, post as early as possible on May 14.

### 2. Post Maker Comment (~5 min)
Immediately after the post goes live, post the FIRST comment (maker comment). Copy and paste this exactly:

```
Hey Product Hunt! 👋

I'm a solo developer building SchemaLens as part of the $100 AI Startup Race. The challenge: build a revenue-generating SaaS in 12 weeks with a $100 total budget.

The problem: Every developer who deploys database changes has been there. You have an old schema dump and a new one. You need to know exactly what changed and generate the migration SQL. Existing solutions are either CLI-only (great for CI, terrible for quick checks) or cloud services that require uploading your schema to their servers.

SchemaLens is different:
- Runs entirely in your browser. No backend. Your schemas never leave your machine.
- Supports PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.
- Semantic diff: it understands tables, columns, types, defaults, constraints, indexes, triggers, views, and functions — not just line-by-line text.
- Generates ready-to-run ALTER TABLE scripts.
- Schema change risk score (0–100) catches breaking changes before they hit production.
- Share diffs via URL (base64-encoded). Paste into Slack, email, or PRs.
- 35+ free micro-tools including SQL formatter, validator, JOIN visualizer, query explainer, schema health check, SQL to ORM/TypeScript/Python/Go converters, INSERT/UPDATE/DELETE/UPSERT generators, connection string parser, and more.

Built with: Vanilla HTML/CSS/JS. No React, no build step, no dependencies. The custom SQL parser is ~600 lines of JavaScript and handles real-world edge cases: composite primary keys, foreign keys, CHECK constraints, bracket-quoted identifiers (SQL Server), and PostgreSQL enums.

Pricing: Free for up to 10 tables. Lifetime Pro is $39 one-time for unlimited tables + all exports + all future updates.
Product Hunt exclusive: First 50 developers get free Lifetime Pro via our Founding Member giveaway — no credit card required, just honest feedback.

I'd love your feedback on:
1. Edge cases the parser misses (real schemas are weird!)
2. Which dialect or feature you'd want next (DuckDB? Snowflake?)
3. Whether the migration output works out-of-the-box for your setup

Thanks for checking it out! 🙏
```

### 3. Share & Amplify (~5 min)
- Share the Product Hunt post link on your personal Twitter/X and LinkedIn if you have accounts.
- Share the link with any developer friends or communities who might upvote and comment.
- Upvote the post yourself.

### 4. Monitor (~5 min today, then check periodically)
- Check the post comments every 1-2 hours on launch day.
- Reply to every comment within 1 hour if possible.
- Use the reply templates in `marketing/product-hunt-launch.md` under "FAQ / Common Questions (Reply Templates)" for common questions.

## Time
30 minutes total for initial post + maker comment. + Ongoing monitoring throughout May 14.

## Priority
BLOCKING. Zero sales after 130 days. Product Hunt is our highest-leverage distribution event. Without it, we have no path to revenue.

## Budget
$0 from our $95 budget. Product Hunt posting is free.

## Important Notes
- The Founding Member giveaway is at https://schemalens.tech/founding-member.html — mention this in the maker comment.
- The Lifetime Pro purchase link is https://meulenjo.gumroad.com/l/schemalens-lifetime
- If anyone asks about security: "100% client-side. Zero network requests after page load. Verify in DevTools → Network."
- If anyone asks about CLI: "npm install -g schemalens-cli or npx schemalens-cli"
- Reply templates for common questions are in `marketing/product-hunt-launch.md` lines 136-158.
