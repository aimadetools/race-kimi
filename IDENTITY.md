# IDENTITY.md — FairSplit

## Startup Identity

| Field | Value |
|-------|-------|
| **Name** | FairSplit |
| **Tagline** | Split equity fairly. No lawyers. No fights. |
| **Target Audience** | Startup co-founders, indie hackers, side-project partners, and accelerator teams who need to decide equity splits and document them legally. |
| **Problem** | Co-founders default to 50/50 splits or waste thousands on lawyers for simple agreements. Unfair splits destroy startups. |
| **Solution** | A free, transparent equity calculator + premium agreement templates and a dynamic agreement generator. |

## Elevator Pitch

> Starting a company with a co-founder? Don't guess on equity. FairSplit is a free interactive calculator that helps co-founders split equity fairly based on time, money, skills, and IP—then instantly generates a customized co-founder agreement. No lawyers. No 50/50 guessing. No fights.

## Exact Pricing Tiers

| Tier | Price | What's Included |
|------|-------|-----------------|
| **Free** | $0 | Full interactive equity calculator; basic framework guide; email tips on co-founder negotiations. |
| **Essential Pack** | $49 one-time | 3 attorney-reviewed agreement templates (Standard Co-Founder Agreement, Vesting Agreement, IP Assignment) in Google Docs + Word formats. |
| **Custom Agreement** | $99 one-time | Dynamic agreement generator that takes your calculator inputs and produces a customized, ready-to-sign co-founder agreement document. |

*No subscriptions for now. One-time purchases reduce friction and let us monetize immediately.*

## User Acquisition Plan (Week by Week)

### Week 1 — Community Blast
- Post calculator on r/startups, r/Entrepreneur, and r/SideProject.
- Launch "Show HN" on Hacker News.
- Post project on Indie Hackers with a transparent revenue goal.
- Tweet the calculator with #buildinpublic and tag influential founders.
- Goal: 1,000 calculator uses, first 2-5 sales.

### Week 2 — Engagement & Feedback
- Respond to every comment and DM.
- Collect emails from calculator users (optional opt-in).
- Publish a Twitter/X thread: "Why 50/50 co-founder splits are usually wrong."
- Goal: 5-10 total sales.

### Week 3 — Content SEO Sprint
- Publish 2 blog posts: "The Only Fair Way to Split Equity with a Co-Founder" and "Vesting Schedules Explained for First-Time Founders."
- Share posts in founder Slack groups and Discord servers.
- Goal: Organic search traffic begins; 10-15 total sales.

### Week 4 — Newsletter & Partnership Push
- Pitch FairSplit as a resource to 5 startup newsletters (e.g., Starter Story, Kernal).
- Post in Y Combinator's internal forums and startup Discords.
- Goal: 20 total sales ($980 revenue).

### Week 8 — Scale Organic Channels
- Guest post on 2-3 indie founder blogs.
- Release a free "Co-Founder Equity Split Checklist" as a lead magnet.
- Launch a simple affiliate program for startup coaches (20% commission).
- Goal: 40 total sales ($2,000+ revenue).

### Week 12 — Product Expansion
- Add a "Vesting Calculator" feature.
- Introduce a "Co-Founder Quiz" for viral sharing.
- Evaluate introducing a low-tier subscription ($9/mo) for ongoing legal updates.
- Goal: 60+ sales ($3,000+ revenue), decision on subscription pivot.

## Monetization Strategy

1. **Immediate Revenue (Day 1):** Sell the Essential Pack ($49) via Stripe payment links embedded on the pricing page. No backend required.
2. **Upsell Revenue (Week 2-3):** Launch the Custom Agreement generator ($99) for users who want a tailored document instead of a template.
3. **Future Recurring (Week 12+):** Evaluate a "Founder Legal Bundle" subscription ($9-19/mo) that includes updated templates, new state-specific clauses, and access to a founder community.
4. **Affiliate Revenue (Week 8+):** Partner with startup coaches, accelerators, and online courses. Pay 20% commission on every sale.

## Tech Approach

- **Hosting:** Vercel (free tier) — auto-deploys from this repo on every push.
- **Frontend:** Static HTML, modern CSS (custom properties, dark theme), vanilla JavaScript.
- **Calculator:** Pure client-side JS. No backend, no database, no API keys needed.
- **Document Generation:** Client-side JS templating to generate customized `.doc` downloads (or PDF via simple libraries). If needed, a lightweight Vercel serverless function can handle PDF generation later.
- **Payments:** Stripe Payment Links for one-time digital product sales. Simple, fast, no checkout backend needed.
- **Analytics:** Plausible Analytics (lightweight, privacy-first) or Google Analytics 4.
- **Email Capture:** ConvertKit free tier or a simple form that posts to a Google Sheet via Apps Script.

## 12-Week Roadmap

| Week | Focus | Key Deliverables |
|------|-------|------------------|
| 1 | Launch & Traffic | index.html, calculator.js, pricing page, Stripe payment links, community launch. |
| 2 | Conversion Optimization | Email capture flow, about.html, blog.html with first post, refine copy based on feedback. |
| 3 | SEO & Content | 2 blog posts, meta tags, sitemap.xml, social sharing images, backlinks from founder communities. |
| 4 | Product Line Expansion | Launch Custom Agreement generator ($99), A/B test pricing page layouts. |
| 5 | Partnerships | Outreach to 10 startup newsletters/blogs, affiliate program setup. |
| 6 | Feature Addition | Vesting schedule calculator, interactive scenario comparisons. |
| 7 | Retention & Email | Automated email sequence for calculator users who don't buy (educational drip). |
| 8 | Viral Growth | "Co-Founder Quiz" for social sharing, referral tracking in URLs. |
| 9 | Advanced Content | Video explainer on equity splits, case studies from early customers. |
| 10 | Mobile Polish | PWA features, offline calculator, mobile-first UX improvements. |
| 11 | Pre-Subscription Prep | Survey existing customers on subscription interest, draft subscription terms. |
| 12 | Retrospective & Pivot Decision | Analyze revenue, decide on subscription model, set Q2 goals. |

## Success Metrics

- **Week 1:** 500+ calculator uses, 3+ sales.
- **Week 4:** $1,000 cumulative revenue.
- **Week 8:** $2,500 cumulative revenue, 5+ affiliate partners.
- **Week 12:** $4,000 cumulative revenue, 10+ blog posts indexed by Google.

## Budget Allocation ($90)

| Item | Estimated Cost |
|------|----------------|
| Domain (fairsplit.co or similar) | $12/year |
| Stripe fees | ~$0 (deducted from revenue) |
| Email tool (ConvertKit free up to 1k subs) | $0 |
| Analytics (Plausible $9/mo or GA4 free) | $0 (using GA4 free) |
| Ad spend (optional, Week 8+) | $20-50 |
| Contingency / tools | $28 |
| **Total** | **~$40-60** |

Remaining budget stays in reserve for unexpected costs or a small paid experiment.
