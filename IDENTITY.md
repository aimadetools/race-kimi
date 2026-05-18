# IDENTITY.md — SchemaLens Startup Identity

## Startup Name
**SchemaLens**

## Tagline
"Compare SQL schemas. Spot changes instantly. Generate migrations."

## Alternative Taglines
- "Schema diff, without the CLI."
- "From schema A to schema B in one paste."
- "The missing GUI for database migrations."

## Target Audience
- **Primary:** Backend developers (Node.js, Python, Go, Ruby, PHP) who write database migrations manually.
- **Secondary:** DBAs and tech leads reviewing migration PRs; devops engineers syncing staging/production schemas.
- **Tertiary:** Freelance developers maintaining legacy projects with undocumented schema drift.

## Problem Statement
Writing database migration scripts is tedious and error-prone. Developers currently:
1. Dump two schemas with `mysqldump` or `pg_dump`
2. Open them side-by-side in a text editor
3. Manually scan for differences
4. Write `ALTER TABLE` statements by hand
5. Hope they didn't miss a column type change or dropped index

Existing CLI tools work but have friction (install, configure, learn flags). Enterprise tools are expensive and overkill for most teams.

## Solution
SchemaLens is a zero-install, browser-based SQL schema diff tool. Paste two `CREATE TABLE` dumps, get a visual semantic diff (tables added/removed, columns changed, indexes modified) and generate ready-to-run migration scripts in your dialect.

## Exact Pricing Tiers

### Free — Forever
- Diff up to 15 tables per comparison
- Visual diff (added/removed/modified highlight)
- Basic text-only migration preview (first 3 changes)
- Single-user, no account required
- Data stays in browser (privacy-first)

### Pro — $39 one-time (lifetime access)
- Unlimited tables per comparison
- Full migration script generation (all dialects)
- Export diff as Markdown / PDF / SQL
- Save & share diff links (via localStorage export for now; cloud later)
- History of past diffs (localStorage)
- Priority support via email

### Team — $29/month or $290/year
- Everything in Pro
- Shared team workspace (cloud save, coming Week 6)
- Org-wide billing
- Slack notifications for schema drift (Webhook integration)
- Admin controls & user management
- API access (coming Week 10)

## Monetization Strategy
1. **Freemium with clear value unlock:** Free shows the problem (diff visual), Pro solves it (migration SQL). The moment a user sees a 20-table diff, they hit the paywall and understand the value.
2. **Gumroad for payment processing:** Sell license keys. Client-side validation unlocks Pro features. No backend needed initially.
3. **Team expansion:** Individual developers bring SchemaLens to work. Team plan has collaboration features that justify the upgrade.
4. **Content marketing SEO:** Rank for high-intent keywords like "compare mysql schemas", "generate alter table script", "postgres schema diff online". Organic traffic converts to Pro.

## User Acquisition Plan (Week by Week)

### Week 1 — Launch & Communities
- Post "Show HN" on Hacker News with a live demo
- Post on r/PostgreSQL, r/MySQL, r/webdev, r/SQL
- Share in backend-focused Discords (ByteByteGo, System Design Primer)
- Tweet thread: "I built a browser-based schema diff tool because I was tired of writing ALTER TABLE by hand"
- Goal: 500 site visits, 50 free tool uses, collect feedback

### Week 2 — Content & SEO Foundation
- Publish first blog post: "How to Safely Compare Database Schemas Before Deploying"
- Publish second blog post: "The Hidden Cost of Manual Migration Scripts"
- Submit to SaaS directories (AlternativeTo, Product Hunt upcoming, BetaList)
- Add schema diff tool to awesome-database-learning and similar GitHub lists
- Goal: Organic search indexing begins, 1,000 visits

### Week 3 — Refinement & Evangelism
- Reach out to 10 developer newsletter authors (ByteByteGo, Pointer.io, React Status, etc.)
- Post on IndieHackers with revenue goals and open metrics
- Create a 60-second demo video / GIF for social sharing
- Respond to Stack Overflow questions about schema comparison with a helpful answer + tool mention
- Goal: 2,000 visits, first waitlist signups for Pro

### Week 4 — Product Hunt Launch
- Full Product Hunt launch with demo video, maker comment, and special PH discount (30% off first year)
- Coordinate launch with Hacker News "Show HN" re-post
- Email subscribers from waitlist
- Goal: Top 5 Product of the Day, 5,000 visits, first 3 Pro sales

### Week 5-8 — SEO & Content Engine
- Publish one technical blog post per week
- Build free tools that drive traffic (e.g., "SQL Formatter", "CREATE TABLE Parser")
- Guest post on dev blogs about migrations
- Start collecting testimonials from early Pro users
- Goal: 10,000 monthly visits, 10 Pro customers

### Week 9-12 — Scale & Team Features
- Launch Team plan with shared workspace
- Build CI/CD integration guides (GitHub Actions, GitLab CI)
- Run a small sponsorship in a developer newsletter ($20-50)
- Apply to TinySeed or developer-tools accelerators
- Goal: 20 Pro/Team customers, $300 MRR

## Tech Approach

### MVP Stack (Weeks 1-4)
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (no framework — fastest to ship, zero bundle size)
- **Parser:** `node-sql-parser` (browser build via CDN) for MySQL, PostgreSQL, SQLite dialects
- **Diff Engine:** Custom semantic diff in pure JS (table-level, column-level, index-level comparison)
- **UI:** Dark theme, split-pane diff view, syntax-highlighted SQL output
- **Storage:** localStorage for history and saved diffs
- **Payments:** Gumroad for license key distribution; client-side key validation
- **Hosting:** Vercel (free tier), auto-deploy from GitHub
- **Analytics:** Plausible (lightweight, privacy-friendly, $9/mo — free tier or self-hosted later)

### Phase 2 Stack (Weeks 5-12)
- Add React/Vue if UI complexity demands it
- Vercel Serverless Functions for: external link checking (if expanding), cloud save, team auth
- Supabase (free tier) for cloud saves and team workspaces
- Stripe direct integration (replacing Gumroad) for lower fees

## 12-Week Roadmap

| Week | Focus | Key Deliverables |
|------|-------|------------------|
| 1 | **Landing Page & Validation** | index.html, about.html, pricing.html, blog.html. Waitlist signup. Social posts. |
| 2 | **Core Parser & Diff Engine** | Integrate node-sql-parser. Build semantic diff logic for tables, columns, indexes. |
| 3 | **UI & Free Tier** | Split-pane diff viewer. Syntax highlighting. Local storage. 10-table limit. |
| 4 | **Pro Tier & Product Hunt** | License key gating. Migration SQL generation. Product Hunt launch. First revenue. |
| 5 | **More Dialects & Polish** | Add SQL Server basics. Improve parser edge cases. Export Markdown/PDF. |
| 6 | **Team Workspace (MVP)** | Supabase auth. Cloud save for diffs. Share links. Team plan launch. |
| 7 | **SEO & Content** | Blog: 4 posts. Free micro-tools. Backlink building. Directory submissions. |
| 8 | **CI/CD Integration** | GitHub Action template. GitLab CI template. "SchemaLens in your pipeline" blog post. |
| 9 | **Advanced Migrations** | Detect renames (heuristic). Constraint diff. Foreign key migration support. |
| 10 | **API & Integrations** | REST API for programmatic diffs. Slack webhook for drift alerts. |
| 11 | **Marketing & Partnerships** | Newsletter sponsorships. Affiliate program. Integrate with ORM docs (Prisma, Drizzle). |
| 12 | **Review & Scale** | Analyze metrics. Double down on highest-converting channel. Plan next quarter. |

## Brand Voice
- **Clear over clever.** No buzzwords. Explain exactly what the tool does.
- **Developer-respectful.** No dark patterns. No forced signups. Privacy-first.
- **Confident but humble.** We solve one problem really well. We don't pretend to be a database platform.
- **Action-oriented.** "Paste. Compare. Migrate." Every sentence should move the user forward.

## Domain Strategy
- Primary: `schemalens.dev` (if available and affordable) or `schemalens.tech` initially
- Backup: `sqldiff.io`, `schemadiff.dev`
- Decision: Start on Vercel subdomain, buy domain in Week 2 if traction justifies $12 spend.

## Success Metrics (12-Week Targets)
- **Traffic:** 50,000 total visits
- **Free tool uses:** 5,000
- **Waitlist / trial signups:** 500
- **Pro customers:** 25
- **Team customers:** 5
- **MRR:** $425
- **Churn:** <5% monthly

## Risk Mitigation
- **Parser inaccuracy:** node-sql-parser is mature but edge cases exist. Display a "parser confidence" warning and allow manual override.
- **No payment willingness:** Keep free tier genuinely useful. If conversion is low, pivot to team/enterprise sales.
- **Competition from free CLI:** Emphasize speed (no install), shareability (send a link), and UX (visual diff beats terminal output).
- **Scope creep:** Strictly limit to schema diff in Q1. No query builder, no ER diagrams, no live DB connections until Q2.

---

*Identity locked. Building begins now.*
