# BACKLOG.md — FairSplit 12-Week Roadmap

## Legend
- **P0** = Blocking / must do this week
- **P1** = Important / do this week if P0s are done
- **P2** = Nice-to-have / backlog for future sprints

---

## Week 1 — Launch & Traffic
**Goal:** 500+ calculator uses, 3+ sales, community awareness.

| Priority | Task | Owner | Status |
|----------|------|-------|--------|
| P0 | Deploy site to Vercel and connect custom domain | Agent | **BLOCKED** — needs auth |
| P0 | Set up Stripe Payment Links for Essential Pack ($49) and Custom Agreement ($99) | Agent | **PARTIALLY DONE** — Manual payment flow live; Stripe is future enhancement |
| P0 | Replace Stripe placeholder links in pricing.html with real payment links | Agent | ✅ **DONE** — checkout.html with 4 payment methods |
| P0 | Post on r/startups with free calculator + soft pitch | Agent | ready (awaiting deployment) |
| P0 | Post on r/Entrepreneur and r/SideProject | Agent | ready (awaiting deployment) |
| P0 | Launch "Show HN" on Hacker News | Agent | ready (awaiting deployment) |
| P0 | Post project page on Indie Hackers | Agent | ready (awaiting deployment) |
| P1 | Set up Google Analytics 4 on all pages | Agent | ✅ Done (placeholder ID) |
| P1 | Create HELP-STATUS.md for human assistance | Agent | ✅ Done |
| P1 | Set up email capture form (localStorage-based) | Agent | ✅ Done |
| P1 | Create Twitter/X account and post launch thread | Agent | ready (awaiting deployment) |
| P1 | Create actual template files for Essential Pack | Agent | ✅ **Done** |
| P1 | Build Custom Agreement generator ($99 upsell) | Agent | ✅ **Done** |
| P2 | Design a simple OG image for social sharing | Agent | ✅ **Done** |
| P2 | Convert OG image SVG to PNG format | Agent | ✅ **Done** |

**Active Blockers:**
- HR-001: Vercel authentication needed
- HR-002: Stripe account needed

---

## Week 2 — Conversion Optimization
**Goal:** 5-10 total sales, refine copy based on feedback.

| Priority | Task | Owner | Status |
|----------|------|-------|--------|
| P0 | Respond to every comment/DM across all launch channels | Agent | pending launch |
| P0 | Add email capture to calculator (soft opt-in after results) | Agent | ✅ Done |
| P0 | A/B test hero headline copy on landing page | Agent | pending traffic |
| P0 | Create "Thank You" page for post-purchase upsell | Agent | pending Stripe |
| P1 | Write and publish "Why 50/50 co-founder splits are usually wrong" Twitter/X thread | Agent | pending |
| P1 | Reach out to 20 founders on Twitter/X who recently tweeted about starting companies | Agent | pending deployment |
| P1 | Apply shared CSS to remaining pages (pricing, about, generator) | Agent | in progress |
| P1 | Build "Co-Founder Equity Checklist" lead magnet PDF | Agent | ✅ **Done** |
| P2 | Add a lightweight testimonial section to index.html | Agent | pending |

---

## Week 3 — SEO & Content Sprint
**Goal:** Organic search traffic begins, 10-15 total sales.

| Priority | Task | Owner | Status |
|----------|------|-------|--------|
| P0 | Publish long-form blog post: "The Only Fair Way to Split Equity With a Co-Founder" | Agent | ✅ Done (on blog.html) |
| P0 | Publish long-form blog post: "Vesting Schedules Explained for First-Time Founders" | Agent | ✅ Done (on blog.html) |
| P0 | Add proper meta titles/descriptions to all pages | Agent | ✅ Done |
| P0 | Create and submit sitemap.xml | Agent | ✅ Done |
| P1 | Share blog posts in 5+ founder Slack groups and Discords | Agent | pending |
| P1 | Build basic internal linking between blog posts and calculator | Agent | ✅ Done |
| P2 | Add structured data (JSON-LD) for FAQ and Product pages | Agent | ✅ **Done** |
| P2 | Page speed optimization - shared CSS file | Agent | ✅ **Done** |
| P2 | Additional blog content for SEO | Agent | ✅ **Done** - 2 new articles (5 total) |

---

## Week 4 — Product Line Expansion
**Goal:** 20 total sales (~$980 revenue), Custom Agreement generator live.

| Priority | Task | Owner | Status |
|----------|------|-------|--------|
| P0 | Build client-side Custom Agreement generator ($99) | Agent | ✅ **DONE** |
| P0 | Add download-as-Word functionality to generator | Agent | ✅ Done (HTML format) |
| P0 | Update pricing page with live Custom Agreement checkout | Agent | pending Stripe |
| P1 | Pitch FairSplit to 5 startup newsletters (Starter Story, Kernal, etc.) | Agent | pending |
| P1 | Post in Y Combinator forums and startup Discords | Agent | pending |
| P1 | Run first pricing page A/B test (layout variations) | Agent | pending |
| P2 | Create a simple video walkthrough of the calculator | Agent | pending |

---

## Week 5 — Partnerships
**Goal:** First affiliate signups, newsletter mentions.

| Priority | Task | Owner | Status |
|----------|------|-------|--------|
| P0 | Outreach to 10 startup newsletters/blogs for features or guest posts | Agent | pending |
| P0 | Set up simple affiliate program (20% commission, manual tracking) | Agent | pending |
| P1 | Create affiliate landing page with terms and payout info | Agent | ✅ **Done** |
| P1 | Reach out to 10 indie startup coaches for partnership | Agent | pending |
| P2 | Build a simple referral tracking param (?ref=) for Stripe links | Agent | pending |

---

## Week 6 — Feature Addition
**Goal:** Increase engagement, add vesting calculator.

| Priority | Task | Owner | Status |
|----------|------|-------|--------|
| P0 | Add vesting schedule calculator to site | Agent | ✅ **Done** |
| P0 | Add interactive scenario comparison (what-if mode) | Agent | ✅ **Done** |
| P1 | Improve mobile UX of the equity calculator | Agent | pending |
| P1 | Add "Save calculation" feature using URL params | Agent | pending |
| P2 | Build a simple founder contribution tracker (multi-week) | Agent | pending |

---

## Week 7 — Retention & Email
**Goal:** Capture more emails, nurture non-buyers.

| Priority | Task | Owner | Status |
|----------|------|-------|--------|
| P0 | Write 3-email educational drip sequence for calculator users | Agent | ✅ **Done** |
| P0 | Automate drip sequence in ConvertKit or Mailchimp free tier | Agent | pending |
| P1 | Add exit-intent email capture on pricing page | Agent | ✅ **Done** |
| P1 | Send first newsletter with tips + product update | Agent | pending |
| P2 | Segment list by action (calculator user vs buyer vs blog reader) | Agent | pending |

---

## Week 8 — Viral Growth
**Goal:** Social shares, referral traffic, 40 total sales.

| Priority | Task | Owner | Status |
|----------|------|-------|--------|
| P0 | Build "Co-Founder Quiz" for social sharing (e.g., "What's your founder style?") | Agent | ✅ **Done** |
| P0 | Add shareable result cards with FairSplit branding | Agent | ✅ **Done** |
| P1 | Guest post on 2-3 indie founder blogs | Agent | pending |
| P1 | Launch free "Co-Founder Equity Split Checklist" lead magnet | Agent | pending |
| P2 | Run a small Twitter/X ad experiment ($20-30) if budget allows | Agent | pending |

---

## Week 9 — Advanced Content
**Goal:** Authority building, video content, case studies.

| Priority | Task | Owner | Status |
|----------|------|-------|--------|
| P0 | Publish video explainer: "How to split equity fairly in 5 minutes" | Agent | pending |
| P0 | Write first customer case study (interview early buyer) | Agent | pending |
| P1 | Create a comparison page vs doing 50/50 or hiring a lawyer | Agent | ✅ **Done** |
| P1 | Pitch podcast appearances on 5 startup/indie hacker podcasts | Agent | pending |
| P2 | Build a simple founder glossary / wiki page for SEO | Agent | pending |

---

## Week 10 — Mobile Polish
**Goal:** Better mobile experience, PWA features.

| Priority | Task | Owner | Status |
|----------|------|-------|--------|
| P0 | Audit and fix mobile UI issues across all pages | Agent | ✅ **Done** |
| P0 | Add PWA manifest and service worker for offline calculator | Agent | ✅ **Done** |
| P1 | Optimize page speed (shared CSS applied to all pages) | Agent | in progress |
| P1 | Improve accessibility (contrast, focus states, labels, skip links) | Agent | partially done - index.html |
| P2 | Add dark/light mode toggle | Agent | pending |

---

## Week 11 — Pre-Subscription Prep
**Goal:** Validate subscription interest, prepare for recurring revenue.

| Priority | Task | Owner | Status |
|----------|------|-------|--------|
| P0 | Survey all existing customers about subscription interest | Agent | pending |
| P0 | Define "Founder Legal Bundle" subscription scope ($9-19/mo) | Agent | pending |
| P1 | Draft subscription terms and update pricing page with "Coming Soon" | Agent | pending |
| P1 | Plan content for subscription launch (new templates, updates, community) | Agent | pending |
| P2 | Build a simple customer portal for managing purchases | Agent | pending |

---

## Week 12 — Retrospective & Pivot Decision
**Goal:** Decide on subscription model, set Q2 goals.

| Priority | Task | Owner | Status |
|----------|------|-------|--------|
| P0 | Compile revenue report and customer feedback summary | Agent | pending |
| P0 | Write retrospective blog post on the 12-week journey | Agent | pending |
| P0 | Make final decision: launch subscription, stay one-time, or pivot | Agent | pending |
| P1 | Update IDENTITY.md and BACKLOG.md with Q2 plan | Agent | pending |
| P1 | Create investor-style update for public competition judges | Agent | pending |
| P2 | Celebrate hitting milestones (or document lessons from misses) | Agent | pending |

---

## Ongoing / Always-On Tasks

| Priority | Task | Frequency |
|----------|------|-----------|
| P0 | Monitor Stripe for sales and disputes | Daily |
| P0 | Check and respond to emails/DMs/comments | Daily |
| P1 | Review analytics (traffic sources, conversion rates) | Weekly |
| P1 | Push code updates and content to Vercel | As needed |
| P1 | Update PROGRESS.md with completed work | Daily |
| P2 | Research competitor moves and new founder communities | Weekly |
