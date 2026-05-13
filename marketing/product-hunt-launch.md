# Product Hunt Launch Preparation — SchemaLens

Complete preparation kit for launching SchemaLens on Product Hunt.

---

## Tagline Options

1. **Compare SQL schemas in your browser. Generate migrations instantly.** (Recommended)
2. **Semantic schema diff for PostgreSQL, MySQL, SQLite & SQL Server.**
3. **Stop writing ALTER TABLE by hand.**
4. **The privacy-first schema diff tool — zero backend, zero signup.**
5. **Paste two schemas. See every change. Get the migration SQL.**

**Final choice:** Option 1 — it covers the what (compare schemas), the how (browser), and the outcome (migrations).

---

## Short Description (≤ 60 chars)

> Compare SQL schemas and generate migrations in your browser.

---

## Long Description

SchemaLens is a browser-based SQL schema diff tool for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.

Paste two CREATE TABLE dumps — old and new — and SchemaLens shows you a semantic, visual diff at the table and column level. It highlights added, removed, and modified columns, constraints, indexes, triggers, views, and functions. Then it generates ready-to-run ALTER TABLE migration scripts in the dialect you selected.

**Key features:**
- Semantic diff (not line-by-line text comparison)
- Migration SQL generation for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle
- Support for constraints: PRIMARY KEY, UNIQUE, FOREIGN KEY, CHECK, EXCLUDE
- Trigger, view, and function/procedure diff support
- Drag-and-drop .sql file upload
- Share diffs via URL (base64-encoded, no backend)
- Export results as Markdown, PDF, JSON, SQL, Prisma, or Drizzle
- Schema change risk score (0–100) with breaking-change detection
- Client-side only — your schemas never leave your machine
- Free tier: 10 tables, visual diff + migration preview
- Pro tier: unlimited tables, full migrations, exports, diff comments

**CLI & CI/CD:**
- `npx schemalens-cli` — run diffs locally, in CI, or in GitHub Actions
- GitHub Action with PR comments and breaking-change build fails
- GitLab CI and Bitbucket Pipelines templates included
- VS Code extension for in-editor diffing

**Why I built it:**
I was tired of squinting at text diffs between schema dumps and manually writing ALTER TABLE statements. Existing tools were either CLI-only (pg_dump, migra) or required uploading schemas to a cloud service. SchemaLens fills the gap: zero setup, zero backend, instant results — and now with a full CLI for CI/CD pipelines.

**Pricing:**
- Free: 10 tables, visual diff, migration preview, 36+ micro-tools
- Lifetime Pro: $39 one-time — unlimited tables, full migrations, all exports, shareable links, diff annotations, all future updates
- **Product Hunt exclusive:** First 50 developers can claim a free Lifetime Pro license via our Founding Member giveaway (no credit card required)

---

## Gallery Images (Required: 3-5 images, 1270×760 ideal)

### Image 1: Hero / Split Editor
**Spec:** Screenshot of app.html with both editors filled and the Visual Diff tab active.
**Content:**
- Left panel: Schema A (old) with 3 PostgreSQL tables
- Right panel: Schema B (new) with modified tables + 1 new table
- Bottom: Visual Diff showing added/removed/modified tables with color coding
- Clean dark UI, no browser chrome

### Image 2: Migration SQL Output
**Spec:** Screenshot of the Migration SQL tab.
**Content:**
- Syntax-highlighted ALTER TABLE statements
- Copy button visible
- Shows PostgreSQL-specific syntax (ALTER COLUMN ... TYPE)

### Image 3: Share / Export Features
**Spec:** Screenshot showing the Export Markdown tab or Share button.
**Content:**
- Markdown preview of a diff report
- Or: Share button with copied URL notification
- Shows Pro features

### Image 4: Supported Dialects
**Spec:** Simple graphic or screenshot collage.
**Content:**
- PostgreSQL, MySQL, SQLite, SQL Server, Oracle logos/names
- "5 dialects. One tool."

### Image 5: Privacy Promise
**Spec:** Simple text graphic on dark background.
**Content:**
- "Your schemas never leave your browser"
- Lock icon + "100% client-side"
- "No signup required"

**How to capture:**
1. Open app.html in Chrome at 1280×800 viewport
2. Use DevTools device toolbar to set exact resolution
3. Use a clean browser profile (no extensions visible)
4. Screenshots should show the tool in action with sample data

---

## Maker Comment (First Comment)

> Hey Product Hunt! 👋
>
> I'm a solo developer building SchemaLens as part of the $100 AI Startup Race. The challenge: build a revenue-generating SaaS in 12 weeks with a $100 total budget.
>
> **The problem:** Every developer who deploys database changes has been there. You have an old schema dump and a new one. You need to know exactly what changed and generate the migration SQL. Existing solutions are either CLI-only (great for CI, terrible for quick checks) or cloud services that require uploading your schema to their servers.
>
> **SchemaLens is different:**
> - Runs entirely in your browser. No backend. Your schemas never leave your machine.
> - Supports PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.
> - Semantic diff: it understands tables, columns, types, defaults, constraints, indexes, triggers, views, and functions — not just line-by-line text.
> - Generates ready-to-run ALTER TABLE scripts.
> - Schema change risk score (0–100) catches breaking changes before they hit production.
> - Share diffs via URL (base64-encoded). Paste into Slack, email, or PRs.
> - 35+ free micro-tools including SQL formatter, validator, JOIN visualizer, query explainer, schema health check, SQL to ORM/TypeScript/Python/Go converters, INSERT/UPDATE/DELETE/UPSERT generators, connection string parser, and more.
>
> **Built with:** Vanilla HTML/CSS/JS. No React, no build step, no dependencies. The custom SQL parser is ~600 lines of JavaScript and handles real-world edge cases: composite primary keys, foreign keys, CHECK constraints, bracket-quoted identifiers (SQL Server), and PostgreSQL enums.
>
> **Pricing:** Free for up to 10 tables. Lifetime Pro is $39 one-time for unlimited tables + all exports + all future updates.
> **Product Hunt exclusive:** First 50 developers get free Lifetime Pro via our Founding Member giveaway — no credit card required, just honest feedback.
>
> I'd love your feedback on:
> 1. Edge cases the parser misses (real schemas are weird!)
> 2. Which dialect or feature you'd want next (DuckDB? Snowflake?)
> 3. Whether the migration output works out-of-the-box for your setup
>
> Thanks for checking it out! 🙏

---

## FAQ / Common Questions (Reply Templates)

### Q: Is this secure? Do you store my schemas?
> Nope. SchemaLens is 100% client-side. The parser runs in your browser via JavaScript. Your SQL never hits a server. You can verify this by opening DevTools → Network — zero requests after the page loads.

### Q: What dialects are supported?
> PostgreSQL, MySQL/MariaDB, SQLite, SQL Server, and Oracle. DuckDB is on the roadmap.

### Q: How does the Pro license work?
> It's a client-side license key. You buy on Gumroad, get a key like `SL-XXXX-XXXX-XXXX-XXXX`, paste it into the app, and Pro features unlock instantly. No accounts, no tracking.

### Q: Can I use this in CI/CD?
> Yes. We publish a GitHub Action, GitLab CI template, and Bitbucket Pipelines template. You can also run `npx schemalens-cli` locally or in any CI system. It generates diffs, migration SQL, and exits with a non-zero code on breaking changes.

### Q: How accurate is the migration SQL?
> It's generated from the semantic diff, so it's deterministic. That said, always review migrations in staging before production. SchemaLens handles most common cases; complex renames or data migrations still need human judgment.

### Q: Is there a CLI version?
> Yes. `npm install -g schemalens-cli` or run `npx schemalens-cli` without installing. It supports 5 dialects, 4 output formats (SQL, Markdown, JSON, HTML), and CI mode with exit codes.

### Q: How do you make money with a static site?
> Gumroad license keys. The web tool works without a backend, so hosting is free (Vercel). The CLI is open-source on npm. Revenue is 100% margin minus Gumroad's fee.

---

## Launch Day Checklist

### 7 Days Before
- [ ] Create Product Hunt account (maker profile)
- [ ] Request to hunt the product (or find a hunter)
- [ ] Upload gallery images
- [ ] Fill product page with description, tags, topics
- [ ] Prepare maker comment
- [ ] Schedule social posts for launch day

### 1 Day Before
- [ ] Verify app.html loads fast (< 2s)
- [ ] Test Pro license flow end-to-end
- [ ] Test `npx schemalens-cli` works on a fresh machine
- [ ] Check all CTAs link correctly
- [ ] Prepare "Show HN" post for same day
- [ ] Notify email list / waitlist

### Launch Day
- [ ] Post goes live at 00:01 PT
- [ ] Publish maker comment immediately
- [ ] Share on Twitter/X, LinkedIn, IndieHackers
- [ ] Post "Show HN" thread
- [ ] Monitor comments and reply within 15 minutes
- [ ] Track upvotes hourly
- [ ] Send thank-you replies to early supporters

### Post-Launch
- [ ] Day 1: Analyze traffic, conversion rate
- [ ] Day 2: Publish "Behind the Build" thread
- [ ] Day 3: Follow up with press/outreach
- [ ] Week 1: Collect testimonials for landing page

---

## Launch Timing Strategy

**Best day:** Tuesday or Wednesday
**Best time:** 00:01 Pacific Time (first minute of the day)
**Why:** Product Hunt's ranking algorithm rewards early engagement. Being first gives you the full 24-hour cycle.

**Coordination with Show HN:**
- Post Show HN 2-3 hours after Product Hunt goes live
- Use different angles: PH = product focus, HN = technical deep dive
- Cross-link: mention PH on HN, mention HN on PH

---

## Tags & Topics

**Product Hunt Topics:**
- Developer Tools
- PostgreSQL
- MySQL
- SQLite
- SQL Server
- Database
- Productivity
- Open Source
- Privacy
- SaaS

**Hashtags for social:**
#Database #SQL #PostgreSQL #MySQL #SQLite #SQLServer #DeveloperTools #SchemaMigration #IndieDev #BuildInPublic

---

*Last updated: May 11, 2026*
