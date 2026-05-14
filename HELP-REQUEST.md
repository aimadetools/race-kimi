# HELP-REQUEST.md — SchemaLens Human Help Request

## What
Execute the Product Hunt launch for SchemaLens. All assets are pre-built and ready. This is our #1 distribution priority and is blocking revenue. TODAY IS LAUNCH DAY (May 14, 2026).

## Steps

### 1. Create Product Hunt Account (~5 min)
1. Go to https://www.producthunt.com/ and sign up with Google or email.
2. Complete your maker profile (name, photo, bio).
3. Verify email if required.

### 2. Create the Post (~15 min)
1. Go to https://www.producthunt.com/posts/new
2. Fill in these EXACT values:

**Name:** SchemaLens

**Tagline:** Compare SQL schemas in your browser. Generate migrations instantly.

**Description (short):** Compare SQL schemas and generate migrations in your browser.

**Long Description:**
```
SchemaLens is a browser-based SQL schema diff tool for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.

Paste two CREATE TABLE dumps — old and new — and SchemaLens shows you a semantic, visual diff at the table and column level. It highlights added, removed, and modified columns, constraints, indexes, triggers, views, and functions. Then it generates ready-to-run ALTER TABLE migration scripts in the dialect you selected.

Key features:
- Semantic diff (not line-by-line text comparison)
- Migration SQL generation for 5 dialects
- Trigger, view, and function/procedure diff
- Drag-and-drop .sql file upload
- Share diffs via URL (base64-encoded, no backend)
- Export as Markdown, PDF, JSON, SQL, Prisma, or Drizzle
- Schema change risk score with breaking-change detection
- Client-side only — your schemas never leave your machine
- Free tier: 10 tables, visual diff + migration preview
- Pro tier: unlimited tables, full migrations, exports

CLI & CI/CD:
- npx schemalens-cli — run diffs locally or in CI
- GitHub Action with PR comments and breaking-change fails
- VS Code extension for in-editor diffing

Pricing:
- Free: 10 tables, visual diff, migration preview, 40+ micro-tools
- Lifetime Pro: $39 one-time — unlimited tables, all exports, all future updates
- Product Hunt exclusive: First 50 developers get free Lifetime Pro via our Founding Member giveaway (no credit card required)
```

**Category:** Developer Tools

**Topics:** PostgreSQL, MySQL, SQLite, SQL Server, Oracle, Database, Productivity, Open Source, Privacy, SaaS

**Website URL:** https://schemalens.tech

**Pricing:** Free, Paid

**Promo Offer (optional but recommended):** Product Hunt exclusive: First 50 developers get free Lifetime Pro via founding-member.html

**Gallery Images:** Upload 3-5 screenshots. If you don't have time to create custom ones, take screenshots of:
1. https://schemalens.tech/app.html with both schema panels filled and Visual Diff visible
2. https://schemalens.tech/app.html showing the Migration SQL tab
3. https://schemalens.tech/tools.html showing the tools grid
4. https://schemalens.tech/schema-examples.html showing an example diff
5. Any screenshot of the dark UI with syntax highlighting

### 3. Maker Comment (~5 min)
Immediately after posting, paste this as the FIRST comment:

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
- 40+ free micro-tools including SQL formatter, validator, JOIN visualizer, query explainer, schema health check, SQL to ORM/TypeScript/Python/Go converters, INSERT/UPDATE/DELETE/UPSERT generators, connection string parser, and more.

Built with: Vanilla HTML/CSS/JS. No React, no build step, no dependencies.

Pricing: Free for up to 10 tables. Lifetime Pro is $39 one-time for unlimited tables + all exports + all future updates.
Product Hunt exclusive: First 50 developers get free Lifetime Pro via our Founding Member giveaway — no credit card required, just honest feedback.

I'd love your feedback on:
1. Edge cases the parser misses (real schemas are weird!)
2. Which dialect or feature you'd want next
3. Whether the migration output works out-of-the-box for your setup

Thanks for checking it out! 🙏
```

### 4. Share & Amplify (~5 min)
1. Copy the PH post URL.
2. Share it on your personal Twitter/X and LinkedIn (if you have accounts).
3. Text/message 3-5 developer friends and ask them to upvote + comment.
4. IMPORTANT: Upvotes from NEW Product Hunt accounts are heavily discounted or ignored. Ask people who already have PH accounts.

## Time
30 minutes

## Priority
BLOCKING — This is our #1 revenue-unblocker. We have zero sales after 136 days. Product Hunt is our highest-leverage distribution event.

## Budget
$0 (Product Hunt is free to post)
