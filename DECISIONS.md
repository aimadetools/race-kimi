# DECISIONS.md — Research & Analysis

## Phase 1: Research — 10 Micro-SaaS Ideas Brainstormed

Constraints: $90 budget, 12 weeks, deploy on Vercel free tier, static HTML/JS for MVP, clear path to revenue within 4 weeks, $0 ad budget acquisition.

### 1. SchemaLens — SQL Schema Diff & Migration Generator
- **Description:** Paste two SQL CREATE TABLE dumps, get a semantic diff (not line-by-line text diff) showing added/removed tables, columns, indexes, and constraints. Generate ALTER TABLE migration scripts in PostgreSQL, MySQL, or SQLite dialects.
- **Target customer:** Backend developers, DBAs, tech leads managing database migrations.
- **Pricing model:** Freemium. Free = basic diff view up to 10 tables. Pro = unlimited, migration generation, save/share, team workspace.
- **Why it fits:** Entirely client-side with `node-sql-parser`. High time savings for devs. Strong search intent ("compare sql schemas", "generate migration script").

### 2. CSVQL Studio — Client-Side SQL Engine for CSV Files
- **Description:** Upload CSV files and query them with full SQL using DuckDB-WASM in the browser. No data leaves the device.
- **Target customer:** Data analysts, product managers, researchers.
- **Pricing model:** Freemium. Free = single file queries. Pro = multi-file joins, saved queries, charts, exports.
- **Why it fits:** Cutting-edge tech (DuckDB-WASM), privacy angle, entirely client-side.
- **RISK:** Saturated free market (ChatDB, Chat2DB, Beekeeper CSV SQL Tool, SQL Workbench, CSV Fiddle, CSV SQL Live, DataKit, RunSQL, etc.).

### 3. HARViz — HAR File Waterfall Analyzer
- **Description:** Drag-and-drop HAR files for beautiful waterfall charts and performance insights. Export PDF reports.
- **Target customer:** Frontend developers, performance consultants, QA engineers.
- **Pricing model:** Freemium. Free = single HAR view. Pro = compare HARs over time, branded reports, team sharing.
- **Why it fits:** Entirely client-side. Performance is a hot topic.
- **RISK:** Saturated (DebugBear, Google HAR Analyzer, HAR Viewer, har-analyzer.dev, Webvizio, Chrome DevTools).

### 4. TokenGuard — Design Token Accessibility Auditor
- **Description:** Paste design tokens JSON (or CSS variables), check every text/background combo for WCAG compliance. Export fixes.
- **Target customer:** Design system teams, accessibility consultants.
- **Pricing model:** Freemium. Free = basic contrast matrix. Pro = export reports, Figma plugin integration, team sharing.
- **Why it fits:** Client-side computation. Growing market (accessibility lawsuits increasing).
- **RISK:** Figma plugins like Stark and A11y exist. Free contrast checkers are abundant.

### 5. WebhookForge — Webhook Payload Simulator
- **Description:** Create mock webhook payloads for testing. Pre-built templates for Stripe, GitHub, Slack, etc. Sign payloads with HMAC secrets.
- **Target customer:** Developers building webhook consumers.
- **Pricing model:** Freemium. Free = basic templates. Pro = custom templates, team sharing, batch sending, scheduled delivery.
- **Why it fits:** Useful for local development. Client-side payload generation.
- **RISK:** Saturated (webhook.site, webhook-test.com, Beeceptor, RequestBin, Mocky, Hooklistener, TypedWebhook.tools, inventivehq.com generator).

### 6. SitemapViz — XML Sitemap Visualizer & SEO Analyzer
- **Description:** Paste sitemap.xml URL or upload file. Visualize URL hierarchy, find orphans, check metadata, export reports.
- **Target customer:** SEO professionals, content managers.
- **Pricing model:** Freemium. Free = single sitemap. Pro = crawl analysis, export reports, competitor comparison.
- **Why it fits:** Client-side for uploaded files.
- **RISK:** Several tools exist (Indexly, Digispot, Octopus.do, VisualSitemaps, SiteGPT).

### 7. Meeting Cost Calculator Live
- **Description:** Real-time meeting cost ticker. Input attendee salaries, watch cost accumulate like a taxi meter.
- **Target customer:** Managers, ops teams, meeting skeptics.
- **Pricing model:** Freemium. Free = basic timer. Pro = team dashboards, historical analytics, export reports.
- **Why it fits:** Viral potential. Entirely client-side.
- **RISK:** Saturated (FlowEfficiency, Filator, MeetCalc, Costie, Meeting Cost Live, Calculators.org, Levels.fyi, Meeting Cost Ticker, Capme, etc.).

### 8. Docker Compose Visualizer
- **Description:** Paste docker-compose.yml, get interactive architecture diagram showing services, networks, volumes, dependencies.
- **Target customer:** DevOps engineers, backend developers.
- **Pricing model:** Freemium. Free = basic graph. Pro = export PNG/SVG, private sharing, interactive editing.
- **Why it fits:** Client-side YAML parsing + Mermaid/Cytoscape. Visually impressive.
- **RISK:** Some tools exist (yamltools.dev, derlin's mermaid generator, pmsipilot CLI), but fewer than 5 polished free online tools.

### 9. SaaS Metrics Calculator
- **Description:** Input MRR, churn, CAC, calculate LTV, payback period, Rule of 40, runway. Scenario modeling.
- **Target customer:** SaaS founders, indie hackers, VCs.
- **Pricing model:** Freemium. Free = basic calculator. Pro = save scenarios, export investor-ready reports, benchmarks.
- **Why it fits:** Client-side math. Founders have budget.
- **RISK:** Saturated (smartfree.net, liminfo.com, buildmvpfast.com, nxcode.io, quickfnd.com, mohidulalam.com/tools, rizzcalc.com, etc.).

### 10. OpenAPI Diff Tool
- **Description:** Compare two OpenAPI specs, detect breaking changes, visualize differences.
- **Target customer:** API developers, platform teams.
- **Pricing model:** Freemium. Free = basic diff. Pro = CI integration, breaking change reports, team sharing.
- **Why it fits:** Client-side parsing.
- **RISK:** Saturated (oasdiff, openapi-diff CLI, ApiNotes, CodeRifts, Coderifts GitHub App).

---

## Phase 2: Evaluation

Scoring (1-10): Revenue Potential | Technical Feasibility | User Acquisition Ease | Competition (lower is better, inverted) | Monetization Speed

| Idea | Revenue | Tech | Acquisition | Competition | Monetization Speed | Total |
|------|---------|------|-------------|-------------|-------------------|-------|
| SchemaLens | 8 | 7 | 7 | 8 | 8 | 38 |
| CSVQL Studio | 8 | 9 | 7 | 3 | 7 | 34 |
| HARViz | 6 | 8 | 6 | 4 | 7 | 31 |
| TokenGuard | 7 | 8 | 5 | 4 | 6 | 30 |
| WebhookForge | 6 | 7 | 6 | 3 | 7 | 29 |
| SitemapViz | 5 | 8 | 5 | 5 | 5 | 28 |
| Meeting Cost Calc | 4 | 9 | 7 | 2 | 5 | 27 |
| Docker Compose Viz | 6 | 8 | 6 | 7 | 6 | 33 |
| SaaS Metrics Calc | 5 | 9 | 5 | 2 | 5 | 26 |
| OpenAPI Diff | 7 | 7 | 6 | 4 | 6 | 30 |

*Note: Competition score is inverted — higher means LESS competition (more opportunity).*

### Eliminated (with reasoning)

1. **CSVQL Studio** — 8+ free tools exist (ChatDB, Chat2DB, Beekeeper, SQL Workbench, CSV Fiddle, CSV SQL Live, DataKit, RunSQL). Market is saturated with free offerings. Hard to differentiate and charge.
2. **HARViz** — DebugBear, Google HAR Analyzer, HAR Viewer, har-analyzer.dev, Webvizio all offer free online analysis. Chrome DevTools is built-in. Too many free alternatives.
3. **Meeting Cost Calculator** — 9+ free calculators exist. Viral but impossible to monetize against free competitors.
4. **SaaS Metrics Calculator** — 6+ free calculators exist. Founders will use free spreadsheets before paying.
5. **WebhookForge** — webhook.site, Beeceptor, RequestBin, Mocky, Hooklistener, TypedWebhook.tools all have generous free tiers. Sending webhooks needs infrastructure; receiving is covered.

### Top 5 Mini Business Plans

#### 1. SchemaLens (Winner — detailed in Phase 3)

#### 2. Docker Compose Visualizer
- **Pricing:** Free = Mermaid graph. Pro $9/mo = interactive Cytoscape graph, PNG/SVG export, save diagrams, share links.
- **First 10 customers:** Post on r/docker, r/devops, Hacker News "Show HN". Target Docker tutorial authors.
- **Acquisition:** Week 1: Reddit + HN. Week 4: Product Hunt. Week 8: Blog posts on Docker best practices + SEO.
- **Revenue projection:** Month 2 first paid conversion (freemium friction is low).
- **Static monetization:** Export formats, saved diagrams (localStorage for free, cloud for pro).

#### 3. TokenGuard
- **Pricing:** Free = contrast matrix for 10 colors. Pro $12/mo = unlimited tokens, export to CSS/JSON/Figma, team library.
- **First 10 customers:** Post on r/web_design, r/accessibility, design system Slack communities.
- **Acquisition:** Week 1: Design communities. Week 4: Product Hunt. Week 8: Content marketing on WCAG 2.2.
- **Revenue projection:** Month 3 first paid (designers are slower to convert).
- **Static monetization:** Export formats, saved palettes (localStorage + license key).

#### 4. OpenAPI Diff Tool
- **Pricing:** Free = diff 2 specs. Pro $15/mo = breaking change detection, CI config generator, team sharing, API access.
- **First 10 customers:** Post on r/APIs, r/webdev, API-focused Discords.
- **Acquisition:** Week 1: Dev communities. Week 4: Product Hunt. Week 8: Technical blog posts on API versioning.
- **Revenue projection:** Month 2 first paid.
- **Static monetization:** Breaking change analysis, export formats.

#### 5. SitemapViz
- **Pricing:** Free = single sitemap tree. Pro $10/mo = competitor sitemap comparison, export reports, scheduled monitoring.
- **First 10 customers:** SEO Twitter, r/SEO, IndieHackers.
- **Acquisition:** Week 1: SEO communities. Week 4: Product Hunt. Week 8: SEO blog content.
- **Revenue projection:** Month 2-3 first paid.
- **Static monetization:** Export PDF/CSV, comparison tool.

---

## Phase 3: Decision — Winner

**Chosen: SchemaLens — SQL Schema Diff & Migration Generator**

### Why SchemaLens Wins

1. **Validated demand, but underserved online.** Schema diff is a real pain point. Existing solutions are mostly CLI tools (Prisma migrate diff, schemalex, migra, postgres_schema_diff) or expensive desktop software (Redgate Schema Compare at $369+/user). There is no polished, modern, browser-based schema diff tool with migration generation. Pricecalc.net recently added a basic feature (Oct 2025), proving demand, but it's not a dedicated product.

2. **High willingness to pay.** Database migrations are high-stakes. Developers and teams will pay to avoid production incidents caused by missed schema changes. Migration script generation saves hours of tedious, error-prone manual work.

3. **Clear search intent.** People search: "compare sql schemas online", "generate alter table script", "database schema diff tool", "mysql schema comparison". These are specific, high-intent queries.

4. **Client-side MVP is feasible.** Using `node-sql-parser` (browser-compatible), we can parse CREATE TABLE statements for PostgreSQL, MySQL, and SQLite entirely in the browser. No backend needed for core functionality. Migration generation is deterministic code — also client-side.

5. **Natural freemium gate.** Free users can see the diff visually. Paid users get the migration SQL scripts — a clear value unlock. Export, sharing, and team features add more Pro value.

6. **Defensible over time.** We can add more dialects (SQL Server, Oracle), reverse-engineer schemas from live DB connections (later, with lightweight backend), and integrate with CI/CD platforms.

### Elevator Pitch

"SchemaLens compares two SQL database schemas in your browser and instantly generates the migration scripts to get from one to the other. No CLI to install, no database connection required, no data leaves your machine. Perfect for code reviews, staging-to-production checks, and writing migrations without the grunt work."

### Competitive Landscape
- **Redgate Schema Compare:** $369+/user/year, Windows-only, enterprise sales cycle.
- **Prisma migrate diff:** CLI-only, requires Prisma setup, developer friction.
- **schemalex / migra:** CLI-only, technical users only.
- **postgres_schema_diff:** CLI-only, PostgreSQL-only.
- **pricecalc.net feature:** Basic, not dedicated, calculator-site UX.
- **SchemaLens differentiation:** Zero-setup browser tool, beautiful UX, multi-dialect, migration generation, shareable diffs.

### Budget Allocation (from $90)
- Domain: ~$12 (first year)
- Remaining: $78 for marketing tools, Gumroad fees, possible API credits for future backend features, or emergency ad spend.

---

*Decision made on Day 1. Time to build.*
