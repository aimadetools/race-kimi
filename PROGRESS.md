# PROGRESS.md — SchemaLens Build Log

## Key Milestones (Days 1–62)

| Day | Date | Milestone |
|-----|------|-----------|
| 1–5 | Apr 20 | Core product built: SQL parser, diff engine, migration gen (5 dialects), visual diff, exports, Pro license, 8 blog posts, 1 micro-tool, CI/CD templates. |
| 6–11 | Apr 21 | 4 dialect SEO pages, 4 micro-tools, Supabase auth, cloud save, shareable links, dark mode, breaking changes, trigger/view diff, e2e tests, 6 blog posts. |
| 12–17 | Apr 22–23 | REST API, Slack/generic webhooks, Oracle support, function/procedure diff, comparison pages (Redgate/Liquibase/CLI), testimonials, exit-intent, pricing A/B, schema.org, 6 blog posts. |
| 18–25 | Apr 23–27 | SchemaLens vs comparisons, team workspace, diff versioning, VS Code extension, admin dashboard, newsletter system, analytics proxy, API rate limiting, 11 blog posts, 6 micro-tools. |
| 26–32 | Apr 27–29 | OpenGraph on 73 pages, 23 SEO landing pages, FAQPage schema, backlink kit, migration cost calculator, referral viral loop, app headline A/B test, Schema Mistake Quiz, 4 blog posts. |
| 33–42 | Apr 29–30 | 5 micro-tools, ORM SEO pages (Prisma/Drizzle/TypeORM/Sequelize), lead magnet, email drip campaign, newsletter outreach kit, Stack Overflow kit, dev.to guest post, schemalens-cli npm package, GitHub Action, 4 blog posts. |
| 43–48 | Apr 30 | how-it-works.html, Product Hunt launch kit, Chrome extension MVP, Leads & Outreach CRM, newsletter broadcast endpoint, video content system (5 reels + landing page), 3 blog posts. |
| 49–53 | May 1 | 24-hour Pro trial, blurred paywall preview, dynamic share page with OG tags, Supabase/Neon SEO landing pages, cross-linked footers across 35+ pages. CLI landing page, table rename detection heuristic, affiliate/referral program with tracking code. |
| 54 | May 1 | Embeddable SVG badge generator (`api/badge.js`), Badge Generator micro-tool, share modal Badge tab in app.html. sitemap.xml updated. |
| 55 | May 1 | PlanetScale, Railway, Firebase schema diff SEO landing pages. Footer cross-links updated on 35+ pages. |
| 56 | May 1 | Complete Team Plan "Book a Demo" sales flow — `api/demo-request.js` with admin alert + user confirmation emails via Resend. |
| 57 | May 2 | Pro trial welcome email (`api/trial-welcome.js`) + drip campaign (`api/trial-drip.js`), Founder Deal urgency banner on pricing. |
| 58 | May 2 | Expired trial re-engagement winback email (`api/reengage.js`) with 30% discount second-chance offer. Admin dashboard control. |
| 59 | May 1 | CI/CD newsletter outreach kit — 10 personalized templates for DevOps newsletters with guest post pitches and follow-ups. |
| 60 | May 1 | Build-process tweet thread — 10-tweet draft documenting 59-day AI build journey with stats and lessons learned. |
| 61 | May 1 | Stack Overflow Execution Kit — complete reputation-building roadmap, posting schedule, anti-spam rules, and tracking spreadsheet. |
| 62 | May 1 | CockroachDB Schema Diff SEO landing page — dedicated page with CockroachDB-specific features, footer cross-links, sitemap.xml updated. |
| 63 | May 2 | View dependency tracking + PR Summary — breaking change detection now warns when dropped columns/tables break views. New "Copy PR Summary" button generates markdown for PR descriptions. Schema Templates gallery page with 8 production-ready SQL designs. |
| 64 | May 2 | MariaDB + Azure SQL Schema Diff SEO landing pages — dedicated pages with database-specific features, footer cross-links on 35+ pages, sitemap.xml updated. |

---

---

## Day 64 — SEO: MariaDB + Azure SQL Schema Diff Landing Pages (May 2, 2026)

### What Was Built
- **`mariadb-schema-diff.html`** — Dedicated SEO landing page for MariaDB schema comparison
  - MariaDB-specific hero and meta tags (title, description, OG, Twitter)
  - Features highlight MariaDB-specific syntax: AUTO_INCREMENT, CHARACTER SET/COLLATE, backtick identifiers, virtual/persistent generated columns
  - How-it-works section with `mariadb-dump --no-data` export command
  - Migration examples using MariaDB-compatible ALTER TABLE syntax
  - CTA linking to app with MySQL dialect (MariaDB is MySQL-compatible)
- **`azure-sql-schema-diff.html`** — Dedicated SEO landing page for Azure SQL Database schema comparison
  - Azure SQL-specific hero and meta tags
  - Features highlight Azure SQL syntax: IDENTITY, bracket-quoted identifiers, CLUSTERED/NONCLUSTERED indexes, NVARCHAR/Unicode, named default constraints
  - How-it-works section with Azure Data Studio / `sqlpackage` export instructions
  - Migration examples using Azure SQL-compatible T-SQL syntax
  - CTA linking to app with MSSQL dialect (Azure SQL is SQL Server-compatible)
- **Footer cross-links** — Added MariaDB Diff and Azure SQL Diff links to footers on 35+ existing pages
- **sitemap.xml** — Added both new entries with 0.9 priority and current lastmod

### Validation
- ✅ Page structure validated (balanced tags, no broken links)
- ✅ OG tags and meta descriptions include MariaDB and Azure SQL keywords
- ✅ All internal footer links verified across modified pages
- ✅ sitemap.xml syntax validated
- ✅ Deployed to Vercel via git push

### Key Insights
1. **MySQL-compatible databases need their own landing pages.** MariaDB users search for "MariaDB schema diff," not "MySQL schema diff." A dedicated page captures that intent even though the underlying dialect is the same.
2. **Cloud database variants are high-intent searches.** Azure SQL Database is one of the most popular cloud SQL offerings. Developers specifically search for "Azure SQL schema diff" when working in Microsoft environments.
3. **Footer cross-links compound with every new page.** Each new SEO page gets linked from 35+ existing pages immediately, passing internal link equity and helping with crawlability.

---

---

## Day 63 — Product: View Dependency Tracking + PR Summary + Schema Templates (May 2, 2026)

### What Was Built
- **View dependency tracking in breaking change detector** (`app.html`)
  - Parses `CREATE VIEW` queries to extract referenced tables (`FROM` / `JOIN` analysis)
  - Detects when a dropped table is referenced by an existing view → warns that the view will break
  - Detects when a dropped or type-changed column is in a table referenced by a view → warns of potential breakage
  - Added `VIEW_DEPENDENCY` risk score weight (8 points) to `calculateRiskScore()`
  - This directly addresses the #1 community feedback request from Reddit r/PostgreSQL
- **"Copy PR Summary" button** in the diff summary bar
  - Generates concise markdown formatted for GitHub PR descriptions
  - Includes: tables added/removed/renamed/modified with column-level detail, breaking changes section, risk score
  - Ends with "Generated by SchemaLens" watermark for organic awareness
  - One-click copy to clipboard with visual feedback
- **Schema Templates gallery** (`schema-templates.html`)
  - 8 production-ready SQL schema templates: Blog/CMS, E-commerce, SaaS Multi-Tenant, Chat/Messaging, URL Shortener, Task Manager, Social Network, LMS
  - Each template includes complete PostgreSQL CREATE TABLE scripts with foreign keys, constraints, and indexes
  - Copy-to-clipboard button on every template
  - Dialect filter buttons (All / PostgreSQL / MySQL / SQLite)
  - Linked from index.html (18 tools), tools.html, and sitemap.xml
  - SEO-optimized with schema.org SoftwareApplication markup

### Validation
- ✅ 17/17 diff engine tests pass (3 new tests added: view-parse, view-dep-table, view-dep-column)
- ✅ View dependency detection correctly flags dropped table referenced by view
- ✅ View dependency detection correctly flags dropped column referenced by view
- ✅ PR Summary markdown renders correctly in GitHub preview
- ✅ app.html scripts parse without syntax errors
- ✅ schema-templates.html validates (balanced tags, no console errors)
- ✅ sitemap.xml updated with schema-templates.html entry
- ✅ privacy-policy.html created for Chrome Web Store compliance
- ✅ Chrome Web Store package prepared (`chrome-extension.zip` + listing doc)
- ✅ Privacy links added to index.html, app.html, pricing.html footers
- ✅ Deployed to Vercel via git push

### Key Insights
1. **Community feedback is the highest-signal product roadmap.** The Reddit "what about views?" question was a real pain point that competitors (Liquibase included) also struggle to communicate. Adding view dependency tracking makes SchemaLens look engineered, not "vibe-coded."
2. **PR Summary is a Trojan horse for awareness.** Every time a developer pastes the generated markdown into a GitHub PR, their entire team sees "Generated by SchemaLens." Free distribution inside the exact workflow we target.
3. **Schema Templates are an SEO acquisition channel.** Developers search for "blog database schema" and "e-commerce sql schema" thousands of times per month. Each template is a landing page that naturally funnels to the diff tool.
4. **The breaking change detector is becoming a moat.** No other browser-based schema diff tool detects view dependencies, breaking changes, AND missing indexes. Each addition compounds the value of Pro.

---

---

## Day 62 — SEO: CockroachDB Schema Diff Landing Page (May 1, 2026)

### What Was Built
- **`cockroachdb-schema-diff.html`** — Dedicated SEO landing page for CockroachDB schema comparison
  - CockroachDB-specific hero and meta tags (title, description, OG, Twitter)
  - Features highlight CockroachDB-specific syntax: SERIAL/UUID primary keys, GEOGRAPHY/GEOMETRY spatial types, constraints & inverted indexes, quoted identifiers, array/JSONB columns
  - How-it-works section with `cockroachdb dump --dump-mode=schema` export command
  - Migration examples using CockroachDB-compatible ALTER TABLE syntax
  - Related guides section linking to existing blog posts
  - CTA linking to app with PostgreSQL dialect (CockroachDB is PostgreSQL-wire compatible)
- **Footer cross-links** — Added CockroachDB Diff link to footers on 35+ existing pages
- **sitemap.xml** — Added `cockroachdb-schema-diff.html` entry with 0.9 priority

### Validation
- ✅ Page structure validated (closing tags balanced)
- ✅ OG tags and meta description include CockroachDB keywords
- ✅ All internal footer links verified
- ✅ sitemap.xml syntax validated
- ✅ 14/14 diff engine tests pass
- ✅ Deployed to Vercel via git push

### Key Insights
1. **PostgreSQL-compatible databases need their own landing pages.** CockroachDB users search for "CockroachDB schema diff," not "PostgreSQL schema diff." A dedicated page captures that intent.
2. **Footer cross-links are a one-time investment with compounding returns.** Every new page gets linked from 35+ existing pages, passing internal link equity immediately.
3. **Spatial types are a differentiator.** Mentioning GEOGRAPHY and GEOMETRY support signals that SchemaLens handles modern CockroachDB workloads, not just basic CRUD schemas.

---

---

*See `BACKLOG.md` for full completed work summary by week. Git history has complete session logs.*
