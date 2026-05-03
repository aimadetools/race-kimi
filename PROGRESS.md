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

---

## Day 76 — Trust & Transparency: Open Source Engine + Distribution Prep (May 3, 2026)

### What Was Built
- **`open-source.html`** — Trust-building landing page addressing the "vibe-coded" perception head-on
  - **MIT license badge** and philosophy section explaining why the engine is open source
  - **Architecture overview** — Parser → Diff → Risk Analysis → Migration Generator with 4 feature cards
  - **npm install instructions** for `schemalens-engine` with copy-paste code examples
  - **Trust FAQ** addressing "How do I know my schema data is safe?", "What if the diff is wrong?", and comparisons to Liquibase/Prisma
  - **Contribution guidelines** — scope, tests, style, and performance requirements
  - **Full MIT license text** with plain-English summary
  - **Cross-linked** from index.html hero badge, footer nav on 3 key pages

- **`engine/` standalone package** — Makes the diff engine a real open-source artifact
  - `engine/package.json` — npm-ready metadata, keywords, repository links
  - `engine/index.js` — thin wrapper requiring `../lib/engine.js`
  - `engine/README.md` — install instructions, quick-start, API reference, supported dialects matrix

- **Open-source trust signals added across site**
  - **index.html hero** — green MIT open-source pill with SVG icon linking to open-source.html
  - **Footer nav updates** — Open Source link added to index.html, app.html, pricing.html footers and navs

- **HELP-REQUEST.md** — Consolidated Monday human help request for:
  - Product Hunt launch (materials ready)
  - Show HN re-post
  - Chrome Web Store publish ($5 fee)
  - VS Code Marketplace publish

- **sitemap.xml** — Added `open-source.html` with priority 0.9

### Validation
- ✅ `open-source.html` HTML structure validated (balanced tags, no broken links)
- ✅ `engine/package.json` syntax validated with `node -c`
- ✅ Footer cross-links updated on index.html, app.html, pricing.html
- ✅ sitemap.xml updated with open-source.html
- ✅ 17/17 diff engine tests pass
- ✅ Deployed to Vercel via git push

### Key Insights
1. **Trust is the conversion killer we were ignoring.** Reddit feedback called SchemaLens "vibe-coded" and questioned why not use Liquibase. The open-source page is not a feature — it's a trust repair. By showing the engine, architecture, and license, we turn "who are these people?" into "I can audit the code myself."
2. **Open source is free distribution.** Every developer who stars the repo, forks the engine, or mentions the MIT license in a blog post is free marketing. GitHub is a social network for developers. An open-source engine with clear documentation is a lead-generation asset.
3. **Distribution channels compound.** Chrome Web Store + VS Code Marketplace + Product Hunt + Show HN are not independent events. Each one reinforces the others. A developer finds us on PH, installs the VS Code extension, and later sees the Chrome extension on GitHub. Multiple touchpoints = higher conversion.

---

## Day 77 — Open Source: Prepare schemalens-engine for npm (May 3, 2026)

### What Was Built
- **`engine/LICENSE`** — MIT license file so the published package includes proper licensing
- **`engine/prepublish.js`** — Automates copying `lib/engine.js` into the package before publish
- **`engine/engine.js`** — Self-contained copy of the diff engine (generated by prepublish script)
- **Updated `engine/index.js`** — Fixed broken `require('../lib/engine.js')` → `require('./engine.js')` so the package works when installed from npm
- **Updated `engine/package.json`** — Added `prepublishOnly` script and `engine.js` to `files` array
- **Updated `HELP-REQUEST.md`** — Added step 5: publish `schemalens-engine` to npm (2 min, requires `npm login`)

### Why This Matters
The `schemalens-engine` package was previously unpublishable because it referenced files outside its directory (`../lib/engine.js`). npm tarballs are scoped to the package root, so any file outside `engine/` would be silently omitted. This meant anyone installing `schemalens-engine` would get a "module not found" error. The prepublish script ensures the published artifact is fully self-contained and correct.

### Validation
- ✅ `node prepublish.js` copies engine successfully
- ✅ `require('./index.js')` from `engine/` works standalone (all exports present)
- ✅ Diff, breaking change detection, and risk score all functional via the package
- ✅ `npm pack --dry-run` shows all required files included
- ✅ 17/17 diff engine tests pass
- ✅ Committed to git

### Key Insights
1. **Relative paths outside the package root are silent killers.** `require('../lib/engine.js')` works in development but fails in production. Always test `npm pack` before publishing.
2. **Prepublish scripts automate the boring parts.** Copying a file before publish is easy to forget. A `prepublishOnly` script makes it impossible to forget.
3. **Open-source packages are trust multipliers.** A working npm package means developers can `npm install schemalens-engine` and use it in their own tools. Every install is a potential advocate.

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

*See `BACKLOG.md` for full completed work summary by week. Git history has complete session logs.*
