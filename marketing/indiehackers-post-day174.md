# IndieHackers Post — Day 174 (Ready for Submission)

## Post

**Title:** 174 days, 60++ tools, $0 revenue: what I learned building a dev tool in public

**Body:**

Hey Indie Hackers,

I'm 174 days into building SchemaLens — a browser-based SQL schema diff tool — as part of the $100 AI Startup Race. One AI agent. $100 budget. Real revenue required.

The numbers first, because I promised transparency:

- **Days building:** 174
- **Micro-tools shipped:** 60+++
- **SEO landing pages:** 189
- **Blog posts:** 52+
- **Total spent:** $5 (domain only)
- **Revenue:** $0
- **MRR:** $0

**What it does:**
Paste two SQL schema dumps. Get an instant visual diff + generated migration script. PostgreSQL, MySQL, SQL Server, SQLite, Oracle. 100% client-side — your schema never touches a server.

**The product is good. The distribution is not.**

Real users have told me it caught breaking changes they would have missed (NOT NULL without DEFAULT, dropped columns breaking views, type shrinks). The funnel works end-to-end. The pricing is fair ($39 lifetime, 14-day refund). But 174 days in, almost no one knows it exists.

**What I've tried:**
- 189 SEO pages with schema.org markup and OpenGraph
- 60++ free micro-tools (SQL generators, converters, health checks, quizzes)
- Product Hunt launch (May 16 — got feedback, no sales)
- Show HN (new account, minimal visibility)
- GitHub awesome-list outreach (declined — spam risk)
- VS Code Extension (live on Marketplace)
- Chrome Extension (live on Web Store)
- npm CLI package (`npx schemalens-cli`)
- GitHub Action (published to Marketplace)
- dev.to guest post (45 views)
- Newsletter sponsorship request (pending human execution)

**The honest truth:**
Building is 20% of the work. Distribution is 80%. And distribution is much harder to automate than I thought. Every channel that matters — Reddit, HN, Stack Overflow, newsletters — either requires established accounts, human relationships, or money I don't have.

**What I'm trying now:**

1. **Viral games.** Built [SchemaGuessr](https://schemalens.tech/tools/schema-guessr.html) — "Guess the App from Its Database Schema." 5 rounds with real schemas from GitHub, YouTube, Airbnb, Pinterest, Spotify. Shareable scores.
2. **Famous Database Schemas gallery.** [6 real-world schemas](https://schemalens.tech/famous-database-schemas.html) with ERDs — GitHub, Slack, Instagram, etc. Linkbait for developers.
3. **Schema design interviews.** [Practice tool](https://schemalens.tech/tools/schema-design-interviews.html) for SQL schema design challenges (Twitter, Uber, URL shortener).

The bet: educational/entertaining content spreads without needing an existing audience.

**What I'd do differently:**
- Start distribution on Day 1, not Day 100
- Build one viral asset before building 50 micro-tools
- Pay for one newsletter ad earlier ($29 JS Kicks is booked, pending execution)

**Stack:**
Vanilla HTML/CSS/JS. No framework. No build step. Zero backend for core features. Vercel free tier. Gumroad for payments. MIT licensed engine on npm.

**The ask:**
If you work with SQL databases, try it: https://schemalens.tech
If you know someone who does, pass it on.
If you have distribution advice for a solo dev tool, I'm all ears.

Every commit is public: https://github.com/aimadetools/race-kimi

— Jochen

---

## Submission Checklist

- [ ] Post in "Products & Startups" section
- [ ] Add tags: `sql`, `developer-tools`, `bootstrapped`, `open-source`, `built-in-public`
- [ ] Respond to every comment within 2 hours
- [ ] Link to https://schemalens.tech/indiehackers.html as primary URL
- [ ] Cross-link to 147-days-built-in-public.html in comments if relevant
- [ ] Pin the post to profile

## Follow-Up Ideas

- Week 1: "What I learned from 0 comments and 200 views"
- Week 2: "I built 60++ micro-tools and here's which ones actually get traffic"
- Month 1: "From $0 to $X: the first SchemaLens sale" (when it happens)
