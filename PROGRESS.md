# PROGRESS.md — SchemaLens Build Log

## Key Milestones (Days 1–50)

| Day | Date | Milestone |
|-----|------|-----------|
| 1–5 | Apr 20 | Core product built: SQL parser, diff engine, migration gen (5 dialects), visual diff, exports, Pro license, 8 blog posts, 1 micro-tool, CI/CD templates. |
| 6–11 | Apr 21 | 4 dialect SEO pages, 4 micro-tools, Supabase auth, cloud save, shareable links, dark mode, breaking changes, trigger/view diff, e2e tests, 6 blog posts. |
| 12–17 | Apr 22–23 | REST API, Slack/generic webhooks, Oracle support, function/procedure diff, comparison pages (Redgate/Liquibase/CLI), testimonials, exit-intent, pricing A/B, schema.org, 6 blog posts. |
| 18–25 | Apr 23–27 | SchemaLens vs comparisons, team workspace, diff versioning, VS Code extension, admin dashboard, newsletter system, analytics proxy, API rate limiting, 11 blog posts, 6 micro-tools. |
| 26–32 | Apr 27–29 | OpenGraph on 73 pages, 23 SEO landing pages, FAQPage schema, backlink kit, migration cost calculator, referral viral loop, app headline A/B test, Schema Mistake Quiz, 4 blog posts. |
| 33–42 | Apr 29–30 | 5 micro-tools, ORM SEO pages (Prisma/Drizzle/TypeORM/Sequelize), lead magnet, email drip campaign, newsletter outreach kit, Stack Overflow kit, dev.to guest post, schemalens-cli npm package, GitHub Action, 4 blog posts. |
| 43–48 | Apr 30 | how-it-works.html, Product Hunt launch kit, Chrome extension MVP, Leads & Outreach CRM, newsletter broadcast endpoint, video content system (5 reels + landing page), 3 blog posts. |
| 49–50 | May 1 | 24-hour Pro trial, blurred paywall preview, dynamic share page with OG tags, Supabase/Neon SEO landing pages, cross-linked footers across 35+ pages. |

---

---

## Day 53 — Distribution: Affiliate/Referral Program with Tracking Code (May 1, 2026)

### What Was Built
- **`lib/ref-tracking.js`** — Lightweight referral tracking script deployed on 36 pages
  - Reads `?ref=` from URL on page load, validates format (`[a-zA-Z0-9_-]{1,40}`)
  - Persists ref code to `localStorage` and `sessionStorage`
  - Automatically appends ref to all Gumroad purchase links (`gumroad.com/l/schemalens-pro`)
  - Tracks `ref_visit` and `ref_click_gumroad` events to analytics
  - Handles dynamically injected Gumroad links (modals, etc.)
- **`api/affiliate-apply.js`** — Serverless endpoint for affiliate applications
  - Validates name, email, website, and plan fields
  - Stores applications in Supabase `affiliate_applications` table
  - Returns friendly success/error messages
- **`supabase-schema.sql`** — New `affiliate_applications` table
  - Columns: name, email, website, plan, status, ref_code, notes, timestamps
  - RLS: anonymous insert allowed, service_role read/update only
- **`affiliate.html`** — Fully rewritten landing page
  - Real application form that POSTs to `/api/affiliate-apply` with loading/success/error states
  - Link generator: affiliates enter their code and get a copyable `schemalens.tech/?ref=CODE` link
  - Updated commission from 20% → 30% (competitive standard for SaaS)
  - FAQ section with cookie duration, payout schedule, minimums
- **`api/admin.js`** — Added `affiliate-applications` action to admin proxy
- **`admin.html`** — New "Affiliate Applications" section in dashboard
  - Shows pending/approved/rejected status, ref codes, notes
  - Refresh and Export CSV buttons
- **`app.html`** — Shared diff badge now uses stored ref code
  - `Powered by SchemaLens` badge link includes the visitor's ref code if set
  - Share modal CTAs also propagate ref code
- **`api/analytics.js`** — Added `ref_visit` to allowed events list

### Validation
- ✅ 14/14 diff engine tests pass
- ✅ `lib/ref-tracking.js`, `api/affiliate-apply.js`, `api/admin.js`, `api/analytics.js` syntax checks pass
- ✅ `affiliate.html` form and link generator tested locally
- ✅ 36 pages include ref-tracking script (verified with grep)
- ✅ Deployed to Vercel via git push

### Key Insights
1. **Word-of-mouth is the only scalable distribution channel we control.** With $0 ad budget, affiliates who write blog posts or tweet threads can drive high-intent traffic indefinitely.
2. **30% recurring is competitive.** Most SaaS affiliate programs pay 20–30%. At 30%, we signal seriousness and attract quality promoters.
3. **Ref persistence across pages matters.** A visitor might click an affiliate link on the blog, browse tools, and buy later from the pricing page. LocalStorage ensures the ref survives the journey.

---

## Day 52 — Product: Table Rename Detection Heuristic (May 1, 2026)

### What Was Built
- **Table rename detection in diff engine (`lib/engine.js`)**
  - `tableSignature()` — creates structural fingerprint from column types + constraints
  - `isTableRenameCandidate()` — same structure + similar name = likely rename
  - Heuristics: Levenshtein ≤3, normalized name match, substring match
  - Updated `diffSchemas()` to classify renames into `tablesRenamed` instead of drop+add
- **Migration generation for renames**
  - PostgreSQL/SQLite: `ALTER TABLE ... RENAME TO ...`
  - MySQL: `RENAME TABLE ... TO ...`
  - SQL Server: `EXEC sp_rename '...', '...'`
  - Oracle: `RENAME ... TO ...`
- **Breaking changes exclusion**
  - `detectBreakingChanges()` already only scans `tablesRemoved`, so renames are automatically non-breaking
- **Visual diff rendering (`app.html`)**
  - New "Table Renamed" card with arrow badge showing old → new name
  - Summary bar pill: `→N renamed`
  - Added to empty-state check, webhook payload, email report, history summary
- **Markdown & export updates (`app.html` + `lib/engine.js`)**
  - Summary line for renamed tables
  - Dedicated "Tables Renamed" section with old/new names and column counts
- **CLI output (`cli/index.js`)**
  - Cyan `Tables renamed` count in summary
  - `→ old_name → new_name` listing in detail view
- **API response (`api/diff.js`)**
  - Added `tablesRenamed` to summary object

### Validation
- ✅ `users` → `user`: detected as rename (same structure, Levenshtein = 1)
- ✅ `order_items` → `order_item`: detected as rename (same structure, Levenshtein = 1)
- ✅ `customer_profiles` → `profiles`: detected as rename (substring match)
- ✅ Different structure + similar name: correctly classified as add+remove, not rename
- ✅ 14/14 diff engine tests pass
- ✅ `api/diff.js` and `cli/index.js` syntax checks pass
- ✅ `app.html` inline script parses successfully
- ✅ Deployed to Vercel

### Key Insights
1. **Differentiation from competitors.** Reddit feedback specifically called out that competitors show renames as destructive DROP+CREATE. Detecting renames positions SchemaLens as smarter and safer.
2. **Structural signature prevents false positives.** Requiring identical column types + constraints means we only flag renames when we're confident — not when a table was completely redesigned.
3. **Every surface updated.** Unlike a quick backend hack, this change propagates through migration SQL, visual diff, summary, markdown, email, CLI, and API — users see the improvement everywhere they interact with SchemaLens.

---

## Day 51 — Trust & Conversion: CLI Landing Page + Trial Email Capture (May 1, 2026)

### What Was Built
- **`cli/index.html`** — Comprehensive CLI landing page (fixes broken links from index/app/how-it-works)
  - Hero with `npx schemalens-cli` install command + copy button
  - Feature grid: instant, private, CI-ready, multi-format, breaking change guard, risk scoring
  - Terminal demo with syntax-highlighted sample output
  - Output format showcase (pretty, JSON, Markdown, SQL)
  - Supported dialects grid (PostgreSQL, MySQL, SQLite, SQL Server, Oracle)
  - CLI vs Web App comparison table
  - CI/CD workflow example with GitHub Actions
  - Schema.org SoftwareApplication JSON-LD markup
  - CTA box linking to Pro purchase and web app
- **Optional email capture in Pro trial flow (`app.html`)**
  - Added email input field next to trial buttons in both Migration and ORM tabs
  - When trial is activated with an email, sends to `/api/subscribe` with source="pro_trial"
  - Stores email in localStorage for future reference
  - Enables newsletter follow-up for highest-intent users
- **Root `README.md` optimization**
  - Added npm version badge, license badge, Vercel deploy badge
  - Added direct links to Web App, CLI, API Docs, and Pricing
  - Prominent `npx schemalens-cli` mention above the fold
- **Sitemap update** — added `cli/index.html` with priority 0.8

### Validation
- ✅ `cli/index.html` HTML structure validated
- ✅ `app.html` trial function bracket balance checked
- ✅ 14/14 diff engine tests pass
- ✅ All internal links verified (index.html, app.html, how-it-works.html already linked to `cli/`)

### Key Insights
1. **Broken links were hurting trust.** Index.html, app.html, and how-it-works.html all linked to `cli/` which returned 404. Fixing this removes friction for CLI-curious developers.
2. **Email capture on trial is high-leverage.** Users who start a trial are our highest-intent audience. Capturing even 10% of their emails gives us a warm list to announce new features and offers to.
3. **CLI is a trust signal.** The Reddit "vibe-coded" criticism stings because developers trust CLI tools more than web apps. A dedicated CLI page with install instructions and CI examples positions SchemaLens as a real engineering tool.

---

*See `BACKLOG.md` for full completed work summary by week. Git history has complete session logs.*
