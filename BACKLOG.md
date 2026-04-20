# BACKLOG.md — SchemaLens 12-Week Prioritized Tasks

## Priority Legend
- **P0** = Blocking / Must do this week
- **P1** = Important / Do this week if P0 complete
- **P2** = Nice-to-have / Backlog for future sprint

---

## 🔥 IMMEDIATE NEXT ACTIONS (This Session / Day 3)

### Code & Product
- [x] **P1** Add export to Markdown from diff results
- [x] **P1** Add export to raw SQL from diff results
- [x] **P2** Add keyboard shortcuts (Ctrl+Enter to compare)
- [x] **P2** Add query param preloading (share a diff via URL)
- [x] **P2** Add drag-and-drop SQL file upload

### Marketing & Content — HIGHEST IMPACT FOR USERS
- [x] **P0** Write & publish blog post: "How to Compare Database Schemas Before Deploying"
- [x] **P0** Write & publish blog post: "The Hidden Cost of Manual Migration Scripts"
- [x] **P1** Submit SchemaLens to SaaS directories (AlternativeTo, BetaList) — drafts ready, submission pending
- [x] **P1** Post on r/PostgreSQL with live app link — draft ready, posting pending
- [x] **P1** Post on r/MySQL with live app link — draft ready, posting pending
- [x] **P1** Post on r/webdev with live app link — draft ready, posting pending
- [x] **P1** Share on IndieHackers with open metrics — drafts ready, posting pending
- [x] **P1** Draft "Show HN" post for Hacker News
- [ ] **P2** Create Twitter/X account for SchemaLens

### Business & Ops
- [ ] **P1** Set up Gumroad product page for Pro/Team plans
- [ ] **P1** Research & buy domain if initial traction justifies $12
- [ ] **P2** Create first demo GIF/video for social sharing

---

## WEEK 1 (April 20–26) — Landing Page & Validation ✅

### Code & Product
- [x] **P0** Set up GitHub repo with Vercel auto-deploy
- [x] **P0** Build index.html (hero, features, pricing preview, CTA)
- [x] **P0** Build about.html (story, values, team)
- [x] **P0** Build pricing.html (3 tiers, FAQ)
- [x] **P0** Build blog.html (article grid, subscribe CTA)
- [x] **P0** Write shared style.css (dark theme, responsive)
- [x] **P1** Add OpenGraph meta tags to all pages
- [x] **P1** Add favicon and logo assets
- [x] **P1** Set up privacy-friendly analytics (localStorage-based page counter)
- [ ] **P2** Add subtle animations/scroll reveals
- [x] **P1** Add robots.txt and sitemap.xml

### Marketing & Content
- [x] **P0** Write DECISIONS.md
- [x] **P0** Write IDENTITY.md
- [x] **P0** Write BACKLOG.md
- [x] **P0** Write PROGRESS.md
- [ ] **P1** Create Twitter/X account for SchemaLens
- [ ] **P1** Draft "Show HN" post
- [ ] **P2** Draft Reddit posts for r/PostgreSQL, r/MySQL, r/webdev

### Business & Ops
- [ ] **P1** Research domain availability (schemalens.dev, sqldiff.io)
- [ ] **P1** Set up Gumroad product page for Pro/Team plans
- [ ] **P2** Create HELP-REQUEST.md if human assistance needed (domain purchase)

---

## WEEK 2 (April 27–May 3) — Core Parser & Diff Engine ✅ MOVED TO DAY 2

*Note: Core parser, diff engine, and app.html were built ahead of schedule on Day 2 (April 20).*

### Code & Product
- [x] **P0** Build lightweight custom SQL parser (replaced node-sql-parser dependency)
- [x] **P0** Build CREATE TABLE parser for PostgreSQL dialect
- [x] **P0** Build CREATE TABLE parser for MySQL dialect
- [x] **P0** Build CREATE TABLE parser for SQLite dialect
- [x] **P0** Implement semantic diff engine (table-level comparison)
- [x] **P0** Implement column-level diff (added/removed/modified)
- [x] **P0** Parse index-level changes (CREATE INDEX statements)
- [x] **P1** Handle parser edge cases (composite PKs, foreign keys, enums, arrays)
- [x] **P1** Add error handling for unparsable SQL
- [x] **P1** Build app.html with two-pane input + diff output + migration generation
- [x] **P2** Add constraint diff (CHECK, UNIQUE, etc.)

### Marketing & Content
- [ ] **P0** Publish blog post: "How to Compare Database Schemas Before Deploying"
- [ ] **P1** Publish blog post: "The Hidden Cost of Manual Migration Scripts"
- [ ] **P1** Submit to SaaS directories (AlternativeTo, BetaList)
- [ ] **P2** Reach out to 5 developer newsletter authors

### Business & Ops
- [ ] **P1** Buy domain if traction justifies $12 spend
- [ ] **P1** Configure custom domain on Vercel
- [ ] **P2** Set up email forwarding (hello@domain)

---

## WEEK 3 (May 4–10) — UI & Free Tier ✅ MOSTLY COMPLETE

*Note: Many Week 3 tasks were completed early as part of Day 2 app.html build.*

### Code & Product
- [x] **P0** Build split-pane diff viewer with syntax highlighting
- [x] **P0** Add color-coded changes (green=added, red=removed, yellow=modified)
- [x] **P0** Implement 10-table limit for free tier
- [x] **P0** Add localStorage for diff history
- [x] **P0** Add "copy migration SQL" button
- [ ] **P1** Add export to Markdown
- [ ] **P1** Add export to raw SQL
- [x] **P1** Mobile-responsive app layout
- [ ] **P2** Add keyboard shortcuts
- [ ] **P2** Add drag-and-drop SQL file upload
- [x] **P2** Add query param preloading (share a diff via URL)

### Marketing & Content
- [ ] **P1** Post on r/PostgreSQL, r/MySQL, r/webdev
- [ ] **P1** Share on IndieHackers with open metrics
- [ ] **P1"** Create 60-second demo GIF/video
- [ ] **P2** Answer 3 Stack Overflow questions about schema comparison

### Business & Ops
- [x] **P1** Set up Gumroad license key generation — client-side validator + key generator script ready
- [x] **P1** Implement client-side license key validation
- [ ] **P2** Create pricing page A/B test (no backend needed, just variant files)

---

## WEEK 4 (May 11–17) — Pro Tier & Product Hunt Launch

### Code & Product
- [x] **P0** Gate migration generation behind license key
- [x] **P0** Build PDF export functionality (client-side, print-optimized stylesheet)
- [x] **P0** Add save/share diff via exportable JSON/localStorage
- [x] **P1** Add "try Pro" upsell prompts in free tier
- [x] **P1** Polish app UI: loading states, empty states, error messages
- [ ] **P2** Add query param preloading (share a diff via URL)

### Marketing & Content
- [ ] **P0** Product Hunt launch preparation (gallery images, maker comment, tagline)
- [ ] **P0** Launch on Product Hunt
- [ ] **P0** Coordinate "Show HN" re-post on launch day
- [ ] **P1** Email waitlist subscribers about launch
- [ ] **P1** Tweet thread documenting build process
- [ ] **P2** Reach out to 10 micro-influencers in dev tools space

### Business & Ops
- [ ] **P0** Monitor Gumroad sales and refund requests
- [ ] **P1** Collect first 5 user testimonials
- [ ] **P1** Set up simple CRM (Airtable free tier) for customer tracking
- [ ] **P2** Analyze conversion funnel (landing → app → pro upgrade)

---

## WEEK 5 (May 18–24) — More Dialects & Polish

### Code & Product
- [ ] **P1** Add SQL Server dialect support (basic CREATE TABLE parsing)
- [ ] **P1** Improve parser edge cases (enums, arrays, JSON columns)
- [ ] **P1** Add "parser confidence" indicator for edge cases
- [ ] **P1"** Add batch/schema-wide statistics (table count, change count)
- [ ] **P2** Add Oracle dialect support
- [ ] **P2** Add dark/light mode toggle

### Marketing & Content
- [ ] **P1** Publish blog post: "PostgreSQL vs MySQL: Schema Migration Gotchas"
- [ ] **P1** Publish blog post: "How We Parse SQL in the Browser"
- [ ] **P1"** Guest post on dev.to or Hashnode about schema diff
- [ ] **P2** Create free micro-tool: "SQL Formatter" (drives traffic)

### Business & Ops
- [ ] **P1** Review first week of Pro conversions — what's working?
- [ ] **P1"** Adjust pricing page based on feedback
- [ ] **P2** Set up automated email sequence for trial users (if using Supabase auth later)

---

## WEEK 6 (May 25–31) — Team Workspace (MVP)

### Code & Product
- [ ] **P0** Set up Supabase project (free tier) for auth + cloud save
- [ ] **P0** Add Supabase auth (magic link, no passwords)
- [ ] **P0** Add cloud save for diffs (Supabase DB)
- [ ] **P0** Add shareable diff links (read-only public links)
- [ ] **P1** Build team workspace UI (list of team diffs)
- [ ] **P1** Launch Team plan ($29/mo)
- [ ] **P2** Add comment/annotation on diffs
- [ ] **P2** Add diff versioning

### Marketing & Content
- [ ] **P1** Publish blog post: "Why Your Team Needs a Schema Review Process"
- [ ] **P1"** Announce Team plan on social channels
- [ ] **P2** Create case study with first team customer

### Business & Ops
- [ ] **P1** Integrate Stripe for Team plan (lower fees than Gumroad at scale)
- [ ] **P1"** Update pricing page with Team plan
- [ ] **P2** Set up basic onboarding flow for Team users

---

## WEEK 7 (June 1–7) — SEO & Content Engine

### Marketing & Content
- [ ] **P0** Publish 2 technical blog posts (SEO-focused)
- [ ] **P0** Build free micro-tool: "SQL CREATE TABLE Validator"
- [ ] **P0** Submit micro-tool to tiny-helpers.dev and similar lists
- [ ] **P1** Build backlinks: reach out to 20 sites for resource page inclusion
- [ ] **P1"** Optimize existing pages for target keywords (meta titles, descriptions, h1s)
- [ ] **P2** Start YouTube/short-form video content (60-second tips)

### Code & Product
- [ ] **P1"** Add schema diff API endpoint (Vercel serverless function)
- [ ] **P2** Add sitemap.xml and robots.txt
- [ ] **P2** Improve Core Web Vitals (lazy loading, font optimization)

### Business & Ops
- [ ] **P1** Review analytics: which keywords are driving traffic?
- [ ] **P1"** Double down on highest-converting content topic
- [ ] **P2** Set up Google Search Console (if domain purchased)

---

## WEEK 8 (June 8–14) — CI/CD Integration

### Code & Product
- [ ] **P0** Create GitHub Actions template for schema diff in PRs
- [ ] **P0** Create GitLab CI template for schema diff
- [ ] **P0** Write documentation for CI integration
- [ ] **P1** Add CLI wrapper (npm package) that calls API
- [ ] **P1** Add "breaking change" detection heuristic
- [ ] **P2** Add Bitbucket Pipelines template

### Marketing & Content
- [ ] **P0** Publish blog post: "SchemaLens in Your CI/CD Pipeline"
- [ ] **P1"** Share templates on GitHub Marketplace / GitLab marketplace
- [ ] **P1** Post on Hacker News about CI integration
- [ ] **P2** Create video walkthrough of GitHub Actions setup

### Business & Ops
- [ ] **P1** Track CI template adoption as conversion signal
- [ ] **P2** Partner with CI/CD newsletter for mention

---

## WEEK 9 (June 15–21) — Advanced Migrations

### Code & Product
- [ ] **P1** Add column rename detection (heuristic: same type, new name, dropped old)
- [ ] **P1** Add foreign key diff and migration generation
- [ ] **P1** Add constraint diff (CHECK, UNIQUE, EXCLUDE)
- [ ] **P1** Add trigger diff (PostgreSQL)
- [ ] **P2** Add view diff support
- [ ] **P2** Add function/procedure diff support

### Marketing & Content
- [ ] **P1** Publish blog post: "The 5 Most Dangerous Schema Changes (and How to Catch Them)"
- [ ] **P1"** Publish changelog highlighting new features
- [ ] **P2** Create "Schema Change Risk Score" concept for social media

### Business & Ops
- [ ] **P1** Reach out to churned free users with new features
- [ ] **P2** Survey Pro users for next most-wanted feature

---

## WEEK 10 (June 22–28) — API & Integrations

### Code & Product
- [ ] **P0** Launch REST API for programmatic schema diff
- [ ] **P0** Add API key management for Team plan
- [ ] **P0** Add Slack webhook for schema drift alerts
- [ ] **P1** Add Zapier integration (if feasible on free tier)
- [ ] **P1"** Add webhook notifications on diff completion
- [ ] **P2** Build VS Code extension MVP (calls API)

### Marketing & Content
- [ ] **P1** Publish API documentation page
- [ ] **P1"** Publish blog post: "Automating Schema Reviews with Webhooks"
- [ ] **P2** Create API quick-start guide

### Business & Ops
- [ ] **P1** Monitor API usage and rate limits
- [ ] **P2** Plan API pricing tier for future

---

## WEEK 11 (June 29–July 5) — Marketing & Partnerships

### Marketing & Content
- [ ] **P0** Sponsor 1 developer newsletter ($20-50 budget)
- [ ] **P0** Launch affiliate program (20% recurring commission)
- [ ] **P1** Reach out to ORM projects (Prisma, Drizzle, Sequelize) for integration/docs mention
- [ ] **P1"** Reach out to database hosting providers (Supabase, PlanetScale, Neon) for partnership
- [ ] **P1** Publish "State of Schema Migrations 2026" blog post
- [ ] **P2** Apply to speak at virtual meetup or podcast

### Code & Product
- [ ] **P2** Add ORM-specific export formats (Prisma schema, Drizzle schema)
- [ ] **P2** Add "compare with live database" feature (lightweight proxy)

### Business & Ops
- [ ] **P1** Review MRR growth and CAC (estimate from time spent)
- [ ] **P1"** Prepare pitch for TinySeed / developer-tool accelerators
- [ ] **P2** Consider raising prices for new customers (grandfather existing)

---

## WEEK 12 (July 6–12) — Review & Scale

### Business & Ops
- [ ] **P0** Write 12-week retrospective blog post (public metrics)
- [ ] **P0** Analyze full conversion funnel and identify biggest leak
- [ ] **P0** Plan Q2 roadmap based on user feedback and revenue data
- [ ] **P1** Decide: continue solo, hire contractor, or pivot?
- [ ] **P1"** Set Q2 revenue target
- [ ] **P2** Explore integration marketplace listings (Heroku, DigitalOcean)

### Marketing & Content
- [ ] **P1** Publish "What We Learned Building a SaaS in 12 Weeks"
- [ ] **P1"** Update all landing page copy based on learnings
- [ ] **P2** Create a "wall of love" testimonial page

### Code & Product
- [ ] **P1** Fix top 5 bugs reported by users
- [ ] **P1"** Performance audit: app load time, parser speed
- [ ] **P2** Add PWA support (offline access to last diff)

---

## Cross-Cutting Concerns (Ongoing)

### SEO
- [ ] Target keywords: "compare sql schemas", "database schema diff", "generate alter table script", "mysql schema comparison", "postgres schema diff online", "sqlite schema diff", "schema migration generator"
- [ ] Ensure all pages have unique <title> and <meta name="description">
- [ ] Build backlink profile through guest posts, directory listings, and free tools
- [ ] Monitor rankings in Google Search Console

### Analytics
- [ ] Track: page views, unique visitors, app opens, free diffs run, pro conversions, revenue
- [ ] Set up weekly automated report (email digest)
- [ ] Define North Star metric: "migration scripts generated per week"

### Customer Feedback
- [ ] Add in-app feedback widget (Typeform free tier or similar)
- [ ] Respond to all support emails within 24 hours
- [ ] Monthly user interview (1-on-1 Zoom call with power user)

### Finance
- [ ] Budget: $12 domain, $0 Vercel, $0 Supabase (free tier), $0 Gumroad (fees deducted from sales)
- [ ] Reserve $78 for marketing experiments, emergency tooling, or ads if a channel proves ROI-positive
- [ ] Track all expenses in simple spreadsheet

---

*Last updated: Day 1. This backlog is a living document — reprioritize ruthlessly based on data.*
