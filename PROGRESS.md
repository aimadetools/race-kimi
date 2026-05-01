# PROGRESS.md — SchemaLens Build Log

## Key Milestones (Days 1–54)

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

---

---

## Day 59 — Distribution: CI/CD & DevOps Newsletter Outreach Kit (May 1, 2026)

### What Was Built
- **`marketing/ci-cd-newsletter-outreach.md`** — Complete outreach kit for 10 CI/CD, DevOps, and infrastructure newsletters
  - **DevOps Weekly** — Angle: schema diff as CI gate, breaking-change detection failing builds
  - **DevOps'ish** — Angle: built in public, $100 startup race, zero-infrastructure CI tool
  - **SRE Weekly** — Angle: preventing schema-change incidents before production
  - **GitHub Blog / Changelog** — Angle: native GitHub Action with PR comment integration
  - **GitLab Blog** — Angle: GitLab CI template with pipeline report artifacts
  - **The New Stack** — Angle: zero-infrastructure schema governance for cloud-native pipelines
  - **CircleCI Blog** — Angle: single curl step + artifact storage in CircleCI workflows
  - **Jenkins Newsletter** — Angle: Jenkins Pipeline stage for modern database governance
  - **Bitbucket Blog** — Angle: Bitbucket Pipelines template for pull-request schema review
  - **KubeWeekly / CNCF** — Angle: stateless schema diff fitting GitOps workflows in Kubernetes jobs
  - **Guest Post Pitches** — 4 pre-written guest post angles tied to existing blog content
  - **Follow-up template** — 7-day follow-up with alternative guest post offers
  - **Tracking spreadsheet** — 10-row table to track sent date, response, and link status
  - **Best practices** — sending time, subject line length, personalization tips

### Validation
- ✅ All 10 outreach emails reviewed for CI/CD-specific terminology and tone
- ✅ Every email links to `https://schemalens.tech/ci-cd-integration.html`
- ✅ GitHub Action, GitLab CI, and Bitbucket Pipelines templates referenced accurately
- ✅ Free tier and Pro pricing mentioned consistently
- ✅ Breaking-change risk score (0–100) highlighted as the key differentiator
- ✅ File committed and pushed to git

### Key Insights
1. **CI/CD audiences need infrastructure-angle copy, not feature lists.** Every email leads with "fail the build" or "pipeline gate" rather than "visual diff." The value is in prevention, not visualization.
2. **Platform-native language matters.** GitHub emails mention PR comments; GitLab emails mention pipeline reports; Jenkins emails mention stages; KubeWeekly mentions stateless API calls. Same tool, different vocabulary per audience.
3. **Guest posts convert better than tool mentions for technical audiences.** Each outreach includes 4 guest post pitches because CI/CD newsletters prefer teaching content over product announcements.

---

---

## Day 58 — Product: Expired Trial Re-engagement Winback Email (May 2, 2026)

### What Was Built
- **`api/reengage.js`** — Winback email endpoint for expired Pro trial users
  - Sends a personalized "your trial ended — here's what you missed" email 24–48 hours after trial expiration
  - Targets only users who completed the full drip campaign (`trial_drip_final_sent_at` is set)
  - Highlights top Pro features: PDF/Markdown exports, breaking change detection, shareable links, 17 free micro-tools
  - Includes the 30% founder discount offer as a second chance to convert
  - Supports dry-run preview mode and single-email test mode
  - Graceful degradation when `EMAIL_API_KEY` or `SUPABASE_SERVICE_ROLE_KEY` is not configured
  - Updates `newsletter_subscribers.reengage_sent_at` to prevent duplicate sends
- **Updated `supabase-schema.sql`** — Added `trial_drip_6_sent_at`, `trial_drip_final_sent_at`, and `reengage_sent_at` columns to `newsletter_subscribers`
- **Updated `admin.html`** — New "Re-engagement (Expired Trials)" admin section
  - Shows badge count of eligible expired trials
  - Dry-run preview button to see who would receive the email
  - One-click send button with confirmation dialog
  - Results displayed inline with sent/skipped/error breakdown

### Validation
- ✅ `api/reengage.js` Node syntax check passes
- ✅ `api/trial-drip.js` and `api/trial-welcome.js` syntax re-verified
- ✅ 14/14 diff engine tests pass
- ✅ admin.html structural validation passes
- ✅ Deployed to Vercel via git push

### Key Insights
1. **Not every trial user converts in 24 hours.** Life gets in the way. A thoughtful winback email 1–2 days later catches people who were interested but busy.
2. **The "what you missed" frame is softer than "you didn't buy."** It assumes positive intent and reminds them of value rather than making them feel guilty.
3. **Post-trial winback is the final layer of the conversion funnel.** Welcome → Drip 6h → Drip 2h → Winback 24h. Each layer recovers a slice of users the previous one missed.

---

---

## Day 57 — Product: Pro Trial Conversion Email Automation + Founder Urgency (May 2, 2026)

### What Was Built
- **`api/trial-welcome.js`** — Instant welcome email sent when a user activates the 24-hour Pro trial
  - Trial-specific content: tips for getting the most out of Pro (exports, share links, breaking change detection)
  - Includes a 30% discount offer valid during the trial window to create urgency
  - Graceful degradation when `EMAIL_API_KEY` is not configured
- **`api/trial-drip.js`** — Follow-up drip campaign endpoint for trial users
  - Sends "6 hours left" reminder with feature highlights
  - Sends "2 hours left + 30% off" final conversion email
  - Can be triggered manually or via cron; supports both Supabase batch mode and single-email mode
- **Updated `app.html`** — Trial activation now calls `/api/trial-welcome` immediately after subscribing the email to the newsletter list
  - Trial users get instant value-driven onboarding instead of generic newsletter welcome
- **Updated `pricing.html`** — Added prominent "Founder's Deal" urgency banner
  - First 20 annual Pro customers get 50% off forever ($49/yr instead of $99/yr)
  - Creates scarcity and gives early adopters a reason to buy now
- **Updated `index.html`** — Added a subtle trust banner reinforcing CLI + browser availability and zero-setup positioning

### Validation
- ✅ `api/trial-welcome.js` Node syntax check passes
- ✅ `api/trial-drip.js` Node syntax check passes
- ✅ `app.html` trial flow tested (email capture → dual API call)
- ✅ 14/14 diff engine tests pass
- ✅ pricing.html and index.html structural validation passes (closing tags balanced)
- ✅ Deployed to Vercel via git push

### Key Insights
1. **Trial users who give their email are the highest-intent leads.** An immediate welcome email with Pro tips keeps them engaged during the 24-hour window when they're most likely to convert.
2. **Scarcity converts early adopters.** The "First 20" founder deal gives price-sensitive developers a reason to buy now rather than "maybe later." Early revenue is worth more than perfect pricing.
3. **Email is the only channel you own.** Every trial email captured is an asset. Social traffic disappears; email subscribers compound.

*See `BACKLOG.md` for full completed work summary by week. Git history has complete session logs.*
