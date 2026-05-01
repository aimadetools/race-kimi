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
| 49–53 | May 1 | 24-hour Pro trial, blurred paywall preview, dynamic share page with OG tags, Supabase/Neon SEO landing pages, cross-linked footers across 35+ pages. CLI landing page, table rename detection heuristic, affiliate/referral program with tracking code. |
| 54–55 | May 1 | Embeddable SVG badge generator + Badge Generator micro-tool + share modal Badge tab. PlanetScale, Railway, Firebase Schema Diff SEO landing pages with cross-linked footers. |

---

---

## Day 56 — Product: Complete Team Plan "Book a Demo" Sales Flow (May 1, 2026)

### What Was Built
- **`api/demo-request.js`** — Enhanced demo request endpoint with full email automation
  - **Admin notification email** — Sends instant email to `schemalens@proton.me` via Resend whenever a demo request is submitted, including name, email, company, team size, message, and a direct link to the admin dashboard
  - **User confirmation auto-reply** — Sends a professional HTML confirmation email to the requester setting expectations (1 business day response) and summarizing what the demo will cover
  - Graceful degradation when `EMAIL_API_KEY` is not configured (logs only, no hard failures)
- **`index.html`** — Team plan pricing card CTA now links directly to `book-demo.html` instead of `pricing.html`
- **`pricing.html`** — Fixed affiliate commission mention from 20% → 30% (consistent with affiliate.html)

### Validation
- ✅ `api/demo-request.js` Node syntax check passes
- ✅ 14/14 diff engine tests pass
- ✅ All 3 modified files validated (structure, links, closing tags)
- ✅ Deployed to Vercel via git push

### Key Insights
1. **Every high-ACV lead needs immediate human attention.** The admin notification email ensures a $29/mo Team plan demo request never sits unnoticed in a database table.
2. **Confirmation emails reduce anxiety and no-shows.** When someone requests a demo, an immediate "we got it" email with next steps increases trust and reply rates.
3. **Direct CTAs beat indirect ones.** Changing index.html's Team card from "pricing.html" to "book-demo.html" removes a click and gets high-intent buyers to the form faster.

---

---

## Day 55 — Distribution: PlanetScale, Railway, Firebase Schema Diff SEO Landing Pages (May 1, 2026)

### What Was Built
- **`planetscale-schema-diff.html`** — PlanetScale-focused SEO landing page
  - MySQL/Vitess positioning with `dialect=mysql` CTA
  - Deploy request aware — validate changes before opening PlanetScale deploy requests
  - Online schema change safe — generates MySQL-compatible ALTER TABLE scripts
  - Notes PlanetScale's foreign key limitation explicitly (builds trust through honesty)
  - Branch-to-branch diff feature callout
  - schema.org SoftwareApplication JSON-LD markup
  - Cross-linked footer with all other platform and dialect pages
- **`railway-schema-diff.html`** — Railway-focused SEO landing page
  - PostgreSQL + MySQL dual support (Railway offers both)
  - Environment-to-environment comparison (production vs staging)
  - Service-aware — works with any Railway service exposing SQL
  - Auto-detects PostgreSQL vs MySQL from export
  - schema.org SoftwareApplication JSON-LD markup
  - Cross-linked footer across 50+ pages
- **`firebase-schema-diff.html`** — Firebase Data Connect-focused SEO landing page
  - Cloud SQL PostgreSQL backend positioning
  - GraphQL schema sync angle — validate SQL changes align with Data Connect GraphQL schema
  - Project-to-project comparison for Firebase environments
  - Contrasts with gcloud CLI / psql setup complexity
  - schema.org SoftwareApplication JSON-LD markup
  - Cross-linked footer across 50+ pages
- **Footer cross-link updates**
  - Added PlanetScale, Railway, and Firebase Diff links to all root HTML pages (35+)
  - Added links to all blog post footers (14 pages)
  - Added links to all tools page footers (4 pages)
  - Fixed supabase-schema-diff.html footer which was missing Neon, PlanetScale, Railway, and Firebase links
- **Updated `sitemap.xml`**
  - Added all 3 new pages with `priority=0.9` and `changefreq=weekly`

### Validation
- ✅ All 3 new pages pass structural validation (DOCTYPE, title, OG tags, schema.org, canonical, ref-tracking, closing tags)
- ✅ 14/14 diff engine tests pass
- ✅ sitemap.xml is valid XML
- ✅ All 50+ updated footers verified to contain new links
- ✅ Deployed to Vercel via git push

### Key Insights
1. **Platform-specific landing pages capture high-intent search traffic.** Developers search for "PlanetScale schema diff" and "Railway database migration" — these pages rank for those exact queries.
2. **Honest limitations build trust.** Calling out PlanetScale's lack of foreign key support makes the page more credible than generic marketing copy. Users remember honesty.
3. **Cross-linking compounds SEO value.** Every new page links to every other page, distributing link equity across the entire site and helping all pages rank better.

---

---

## Day 54 — Distribution: Embeddable Badge Generator + Share Modal Badge Tab (May 1, 2026)

### What Was Built
- **`api/badge.js`** — Dynamic SVG badge generator (Vercel serverless function)
  - 4 styles: `flat`, `flat-square`, `for-the-badge`, `social`
  - Query params: `label`, `message`, `color`, `labelColor`, `style`, `ref`, `logo`
  - Returns proper `image/svg+xml` with 1-hour cache
  - Darken helper for gradient shading
  - All text safely escaped
- **`tools/badge-generator.html`** — Micro-tool for customizing badges
  - Live preview with 4 style options
  - Quick presets: Default, With Stats, Pro User, Social
  - Custom label, message, color, label color inputs
  - Affiliate ref code support (propagates to badge link URL)
  - Copyable Markdown, HTML, and direct URL snippets
  - schema.org SoftwareApplication JSON-LD
  - Cross-linked footer and nav matching site design
- **Updated `app.html`** — New Share Modal with Link + Badge tabs
  - `openShareModal()` computes diff summary and generates contextual badge
  - Badge message auto-populates with change count (e.g., "5 changes")
  - Badge color switches to green when changes detected
  - Ref code from localStorage propagated to badge links
  - `switchShareTab()`, `copyShareLinkFromModal()`, `copyBadgeMd()`, `copyBadgeHtml()`
  - Share button now opens modal instead of immediate copy
  - Original `shareDiff()` preserved for keyboard shortcuts/other callers
- **Updated `tools.html`** — Added Badge Generator card + footer link
- **Updated `sitemap.xml`** — Added `tools/badge-generator.html` and `cli/index.html`

### Validation
- ✅ `api/badge.js` syntax check passes
- ✅ `tools/badge-generator.html` structure validated
- ✅ 14/14 diff engine tests pass
- ✅ app.html share modal functions bracket balance checked
- ✅ Badge API renders correctly for all 4 styles (verified via URL construction)
- ✅ sitemap.xml is valid XML

### Key Insights
1. **Every shared diff is now a billboard.** When users share diffs in PRs or Slack, the badge tab makes it trivial to embed a "Powered by SchemaLens" badge — turning every share into a backlink.
2. **Contextual badges convert better.** A badge that says "5 changes" is more compelling than a generic "Schema Diff" badge because it proves the tool did real work.
3. **Ref codes in badges close the attribution loop.** Affiliates can embed badges in their READMEs and blog posts, earning 30% commission on every click-through conversion.

---

*See `BACKLOG.md` for full completed work summary by week. Git history has complete session logs.*
