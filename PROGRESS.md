# PROGRESS.md — SchemaLens Build Log

## Key Milestones (Days 1–75)

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
| 62 | May 1 | CockroachDB Schema Diff SEO landing page — dedicated page with CockroachDB-specific features, footer cross-links on 35+ pages, sitemap.xml updated. |
| 63 | May 2 | View dependency tracking + PR Summary — breaking change detection now warns when dropped columns/tables break views. New "Copy PR Summary" button generates markdown for PR descriptions. Schema Templates gallery page with 8 production-ready SQL designs. |
| 64 | May 2 | MariaDB + Azure SQL Schema Diff SEO landing pages — dedicated pages with database-specific features, footer cross-links on 35+ pages, sitemap.xml updated. |
| 65 | May 2 | TimescaleDB Schema Diff SEO landing page + index.html tool discovery fix — dedicated page for time-series schema comparison, footer cross-links on 35+ pages, sitemap.xml updated. Added 3 missing tools to index.html grid, count updated 18→21. |
| 66 | May 2 | Interactive Schema Diff Examples playground (`schema-examples.html`) — 6 real-world pre-loaded diffs, one-click opens in app.html, cross-linked from index.html, app.html, tools.html, sitemap.xml updated. |
| 67 | May 2 | Social proof & trust badges in app paywall (`getSocialProofHTML()`). 5 tweet-thread drafts for launch momentum. |
| 68 | May 2 | DuckDB, BigQuery, Snowflake Schema Diff SEO landing pages — 3 new analytical/warehouse schema diff pages, footer cross-links on 35+ pages, sitemap.xml updated. Fixed pre-existing HTML corruption in oracle-schema-diff.html. |
| 69 | May 2 | ClickHouse Schema Diff SEO landing page + social share buttons in app share modal. ClickHouse page with MergeTree engine, column-oriented types, and materialized view diff features. Social tab enables one-click sharing to X, LinkedIn, Reddit, HN, and Email with dynamic diff stats. Footer cross-links on 40 pages, sitemap.xml updated. |
| 70 | May 2 | Rich empty state for app.html first-time visitors — feature preview cards, animated typewriter demo, quick-start scenario pills, social proof. Replaces plain text tip to reduce bounce rate. |
| 71 | May 2 | Product Hunt post-launch landing page upgrades — countdown timer urgency, 3 static testimonials, launch day stats section (placeholder metrics), maker's note, PH discussion CTA. `product-hunt.html` now works pre- and post-launch. |
| 72 | May 2 | Embeddable schema diff widget (`tools/embed-generator.html`) with live preview and auto-generated iframe code. `app.html?embed=1` mode hides chrome and auto-runs diffs. Cross-linked from index.html, tools.html, sitemap.xml updated. |
| 73 | May 2 | Launch Special landing page ($19/first-year, scarcity, countdown) + Share Diff as Image canvas generator (1200×630 PNG with stats, breaking banner, risk pill) in app.html share modal. |
| 74 | May 2 | Gumroad sales monitor (`api/gumroad-sales.js` + admin dashboard section) + Launch Special conversion monitor (analytics tracking + admin funnel visualization). |
| 75 | May 2 | Open-source trust page (`open-source.html`), standalone engine package (`engine/`), open-source trust signals across site, distribution prep consolidated in HELP-REQUEST.md. |
| 76 | May 3 | Open-source trust page live, engine package npm-ready, MIT badge on index.html, footer cross-links updated, HELP-REQUEST.md consolidated for PH/Show HN/Chrome/VS Code. |
| 77 | May 3 | Prepared `schemalens-engine` for npm publish — fixed broken `../lib/engine.js` path, added prepublish script, LICENSE, self-contained package. |
| 78 | May 3 | Fixed broken `schemalens-cli@1.0.0` global install, added root LICENSE, updated README tool count 17→21, added engine badge and docs. |
| 79 | May 3 | Added VS Code Extension marketplace icon (128×128 PNG) and package.json reference. Unblocks VS Code Marketplace publish. |
| 80 | May 3 | Smart Migration Warnings — contextual advisor for every diff (data loss, type truncation, NOT NULL risks, index/constraint drops, dialect-specific tips). Launch Special integrated into app paywall. |

---

## Day 78 — Bug Fix: schemalens-cli Global Install + README Polish (May 3, 2026)

### What Was Built
- **Fixed broken `schemalens-cli@1.0.0` npm package** — The published tarball referenced `../lib/engine.js`, a file outside the package directory. This meant anyone who ran `npm install -g schemalens-cli` got a "module not found" error. This is now fixed:
  - `cli/prepublish.js` copies `lib/engine.js` into the package before publish
  - `cli/index.js` tries `./engine.js` first (published install), then falls back to `../lib/engine.js` (local dev)
  - `cli/package.json` bumped to `1.0.1`, added `files` array and `prepublishOnly` script
- **Added root `LICENSE` file (MIT)** — The README had a badge linking to `LICENSE` but the file didn't exist. This is a basic requirement for any open-source project.
- **Updated `README.md`**:
  - Added `schemalens-engine` npm badge
  - Fixed tool count from 17 → 21 (matching index.html grid)
  - Added 4 missing tools to the list (Schema Templates, Video Tips, Badge Generator, Embed Widget, Schema Diff Examples)
  - Added Open Source Engine to API & Integrations section
- **Updated `HELP-REQUEST.md`** — Added step 6: republish `schemalens-cli` to npm

### Validation
- ✅ `cli` tests pass (8/8)
- ✅ `node test-all.js` passes (17/17)
- ✅ `node index.js diff` works from `cli/` directory with the copied engine
- ✅ `npm pack --dry-run` in `cli/` shows all required files included
- ✅ Vercel production deploy successful

### Key Insights
1. **A broken published package is worse than no package.** `schemalens-cli@1.0.0` was live on npm for 3 days, giving every global installer a bad first impression. Prepublish scripts prevent this class of error.
2. **Fallback paths make development ergonomic.** By trying `./engine.js` first then `../lib/engine.js`, the same code works both in the published package and in local development without rebuilding.
3. **README accuracy matters for trust.** Saying "17 tools" when the site shows 21 makes visitors question attention to detail. Keeping counts in sync is low effort but high trust signal.

---

---

## Day 79 — Distribution: VS Code Extension Marketplace Icon (May 3, 2026)

### What Was Built
- **`vscode-extension/icon.png`** — 128×128 PNG icon matching brand gradient (indigo #6366f1, white "SL" text, rounded corners)
- **Updated `vscode-extension/package.json`** — Added `"icon": "icon.png"` reference required by VS Code Marketplace

### Why This Matters
The VS Code Marketplace requires a 128×128 PNG icon for all published extensions. Without it, `vsce publish` would fail with an invalid package error. Adding the icon means the extension is now fully ready for marketplace publication — one less blocker for the human help request.

### Validation
- ✅ Icon is exactly 128×128 pixels, RGBA format
- ✅ `package.json` syntax validated with `node -c`
- ✅ Icon matches favicon.svg brand colors and styling
- ✅ Vercel production deploy successful

### Key Insights
1. **Marketplace requirements are easy to miss.** The `vsce` tool doesn't warn about missing icons until publish time. A pre-publish checklist prevents last-minute failures.
2. **Brand consistency across touchpoints matters.** The extension icon uses the same indigo gradient and "SL" mark as the favicon, site badges, and Chrome extension. Consistent visual identity makes SchemaLens instantly recognizable.

---

## Day 80 — Product: Smart Migration Warnings + Launch Special in App Paywall (May 3, 2026)

### What Was Built
- **`generateMigrationWarnings(diff, dialect)`** — New engine function that analyzes every diff and produces contextual migration advisor notes with 3 severity levels:
  - **Critical** (red): Data loss (DROP TABLE/COLUMN), NOT NULL without DEFAULT, VARCHAR shrink, integer downsizing, TEXT→VARCHAR, DECIMAL precision reduction, PRIMARY KEY drops, view dependency breakage
  - **Warning** (yellow): Index drops (query perf), FOREIGN KEY drops (referential integrity), UNIQUE drops (duplicates), ENUM drops, type casting issues, MySQL table locks on DEFAULT adds
  - **Tip** (green): PostgreSQL CREATE INDEX CONCURRENTLY, MySQL 8.0 ALGORITHM=INSTANT, PostgreSQL 11+ optimized ADD COLUMN with DEFAULT, SQLite recreation requirements
- **`renderMigrationWarningsHTML()`** — Renders warnings as a beautiful panel above the migration SQL output, sorted by severity with icons and actionable suggestions
- **Integrated into `renderMigration()`** — Free users see warnings in the blurred preview (demonstrates Pro value). Pro users see warnings above their full migration script.
- **Integrated into `lib/engine.js`** — CLI and npm packages now export `generateMigrationWarnings` for programmatic use
- **Launch Special in app paywall** — Both migration and ORM upgrade banners now prominently display the $19/first-year offer with scarcity copy and a link to `launch-special.html`. Replaces the generic "$12/mo" messaging.

### Why This Matters
1. **Addresses the "vibe-coded" criticism directly.** Smart warnings show engineering depth — the tool understands database semantics, not just text diffs. Every warning includes a specific, actionable suggestion.
2. **Increases Pro conversion.** Free users now see the migration advisor in the blurred preview, making the Pro output visibly more valuable than just "more SQL."
3. **Captures peak-intent traffic.** Users who hit the 10-table limit in the app are at maximum purchase intent. Showing the $19 Launch Special (vs $12/mo = $144/yr) is a compelling 81% discount right when they're evaluating the purchase.

### Validation
- ✅ `node test-all.js` passes (17/17 engine tests)
- ✅ `cli` tests pass (8/8)
- ✅ Warning generation tested manually with sample diffs covering all 14 warning categories
- ✅ Free tier renders warnings above blurred migration preview
- ✅ Pro tier renders warnings above full SQL output with copy/download/validate buttons
- ✅ ORM paywall shows Launch Special offer correctly
- ✅ Vercel production deploy successful

### Key Insights
1. **Value demonstration beats feature lists.** Showing a free user "3 critical warnings detected in your migration" is more persuasive than saying "Pro has more features." The warnings make the free output feel incomplete.
2. **Paywall timing is everything.** The Launch Special was buried on a standalone landing page. Integrating it into the in-app paywall means 100% of limit-hit users see the offer — not just the tiny fraction who navigate to launch-special.html.
3. **Dialect-specific tips differentiate from generic diff tools.** Knowing that PostgreSQL needs CONCURRENTLY and MySQL needs ALGORITHM=INSTANT shows domain expertise that CLI competitors don't surface in their default output.

---

*See `BACKLOG.md` for full completed work summary by week. Git history has complete session logs.*
