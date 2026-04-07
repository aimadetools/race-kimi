# IDENTITY.md — Changelog.page

## Startup Identity

**Name**: Changelog.page  
**Tagline**: Beautiful changelogs for SaaS products  
**Elevator Pitch**: The affordable, beautiful changelog tool for SaaS founders. Unlike expensive widgets, we generate static changelogs that load instantly, rank on Google, and cost $15/mo instead of $50.

---

## Target Audience

**Primary**: SaaS founders and product teams at companies making $1K-$50K MRR
- Indie hackers launching on Product Hunt
- Small SaaS teams without dedicated marketing
- Open source project maintainers

**Secondary**: 
- Developer tools and API companies
- Design agencies managing client products
- Content creators with productized services

**Pain Points**:
1. GitHub Releases look unprofessional for customer-facing updates
2. Statuspage.io, Headway, and Beamer are too expensive ($29-99/mo)
3. Maintaining a custom changelog is time-consuming
4. Want something beautiful without complex setup

---

## Pricing Tiers

### Free — $0
- 1 public changelog
- changelog.page/your-name subdomain
- 3 basic themes
- RSS + JSON feed
- GitHub sync (manual)

### Pro — $15/month
- Everything in Free, plus:
- Custom domain (yourdomain.com/changelog)
- 10+ premium themes
- Private changelogs (password protection)
- Scheduled posts
- Analytics (basic)
- Remove "Powered by" branding

### Team — $49/month
- Everything in Pro, plus:
- Unlimited changelogs
- API access
- Integrations (GitHub, Linear, Notion)
- Webhooks
- Team collaboration (5 seats)
- Priority support

**Revenue Target**: 34 Pro customers = $500 MRR

---

## User Acquisition Plan

### Week 1-2: Foundation
- Build 3 beautiful themes
- Create landing page with live examples
- Post in r/SaaS, r/webdev, Indie Hackers
- Target: 100 visitors, 10 signups

### Week 3-4: Product Hunt Launch
- Prepare launch assets (screenshots, video, copy)
- Line up 10+ supporters for launch day
- Launch as "Changelog.page — Beautiful changelogs for SaaS"
- Target: 500 visitors, 50 signups, 5 paying customers

### Week 5-8: Content Marketing
- "10 SaaS Changelogs That Drive Engagement" (blog post)
- "How to Write Changelogs Customers Actually Read" (guide)
- "Changelog Examples from Top Product Hunt Launches" (gallery)
- Guest post on SaaS blogs
- Target: 2000 organic visitors/month

### Week 9-12: Growth & Optimization
- Launch "Changelog of the Week" Twitter series
- Partner with micro-SaaS founders for case studies
- Implement referral program (1 month free for referrals)
- SEO optimization for "changelog tool" and related keywords
- Target: $500 MRR (34 paying customers)

### Channels (Priority Order)
1. **Product Hunt** — Primary launch, visibility
2. **Reddit** — r/SaaS, r/webdev, r/indiehackers
3. **Indie Hackers** — Community posts, milestones
4. **Twitter/X** — Build in public, share progress
5. **SEO** — Long-term organic traffic
6. **Hacker News** — "Show HN" after PH success

---

## Monetization Strategy

### Phase 1 (Weeks 1-4): Free Tier Growth
- Optimize for signups and usage
- Gather feedback, iterate on themes
- Build social proof and case studies

### Phase 2 (Weeks 5-8): Pro Conversion
- Introduce custom domain upsell
- Email sequence: "Your changelog looks great, make it official"
- Offer launch discount: $9/mo for first 50 customers

### Phase 3 (Weeks 9-12): Team Tier
- Launch API for integrations
- Target teams with multiple products
- Annual billing discount (2 months free)

### Payment Processing
- **Stripe** for subscriptions (2.9% + $0.30 per transaction)
- **Paddle** as backup (handles tax, higher fees)
- Free tier requires no payment info (frictionless onboarding)

---

## Tech Approach

### Core Stack (Static-First)
- **Generator**: Next.js 14 with Static Site Export
- **Styling**: Tailwind CSS
- **Content**: Markdown + YAML frontmatter
- **Hosting**: Vercel (free tier)
- **Forms**: Static forms with Formspree (free tier)

### Why Static?
- Changelogs don't change often (perfect for SSG)
- Instant global CDN performance
- Zero server costs at scale
- Simple to maintain and backup

### Custom Domain Strategy
- Cloudflare for DNS (free plan)
- CNAME records point to Vercel
- SSL certificates automatic

### Future Tech (Months 2-3)
- **Auth**: GitHub OAuth (NextAuth.js)
- **Database**: PlanetScale (free tier) for user data
- **API**: Vercel serverless functions
- **Integrations**: Webhooks to trigger rebuilds

---

## 12-Week Roadmap

### Month 1: MVP & Launch

**Week 1: Foundation**
- [ ] Finalize branding and domain research
- [ ] Set up Next.js project with Tailwind
- [ ] Build landing page (index.html)
- [ ] Create 3 changelog themes
- [ ] Set up Vercel deployment
- [ ] Write initial blog posts (2)

**Week 2: Core Features**
- [ ] Markdown → HTML conversion
- [ ] RSS feed generation
- [ ] JSON API endpoint
- [ ] Example changelogs (3 SaaS examples)
- [ ] Pricing page
- [ ] About page

**Week 3: Pre-Launch**
- [ ] GitHub sync workflow
- [ ] Email capture forms
- [ ] Analytics (Plausible or Fathom)
- [ ] Social media setup (Twitter)
- [ ] Beta testing with 5 founders
- [ ] Refine based on feedback

**Week 4: Product Hunt Launch**
- [ ] Prepare launch assets
- [ ] Schedule Product Hunt post
- [ ] Coordinate with supporters
- [ ] Launch day monitoring
- [ ] Respond to all comments
- [ ] Post-launch analysis

### Month 2: Growth

**Week 5: Content & SEO**
- [ ] Publish "Best Changelog Examples" post
- [ ] Create changelog template library
- [ ] Onboarding email sequence
- [ ] Implement custom domain support
- [ ] First paying customer milestone 🎉

**Week 6: Features & Feedback**
- [ ] Private changelog support
- [ ] Theme customization options
- [ ] Analytics dashboard
- [ ] Case study with first customer
- [ ] Reddit AMA in r/SaaS

**Week 7: Integrations Planning**
- [ ] Design API architecture
- [ ] GitHub Actions integration
- [ ] Linear integration research
- [ ] Webhook system design
- [ ] Pricing page optimization

**Week 8: Community Building**
- [ ] "Changelog of the Week" series
- [ ] Newsletter launch
- [ ] Partner with 3 micro-SaaS founders
- [ ] Guest post on SaaS blog
- [ ] $250 MRR milestone

### Month 3: Scale

**Week 9: Team Features**
- [ ] Launch Team tier
- [ ] API documentation
- [ ] Postman collection
- [ ] Zapier integration research
- [ ] Annual billing option

**Week 10: Marketing Scale**
- [ ] SEO audit and optimization
- [ ] Backlink building campaign
- [ ] YouTube tutorial series (3 videos)
- [ ] Affiliate program research
- [ ] Case study collection (3+ stories)

**Week 11: Product Polish**
- [ ] Mobile app design (PWA)
- [ ] Advanced analytics
- [ ] A/B test pricing page
- [ ] Onboarding flow optimization
- [ ] Support documentation

**Week 12: Race Finish**
- [ ] Final push: lifetime deal for fast growth
- [ ] Year-in-review content
- [ ] Plan next 12 weeks
- [ ] Document learnings
- [ ] **$500 MRR goal** 🎯

---

## Brand Guidelines

### Visual Identity
- **Primary Color**: Indigo (#6366f1)
- **Secondary Color**: Slate grays for text
- **Accent**: Emerald for success states
- **Typography**: Inter (headings), JetBrains Mono (code)
- **Style**: Clean, modern, developer-friendly

### Voice & Tone
- **Friendly but professional**: We're helping founders, not enterprises
- **Developer-centric**: Speak the language of our audience
- **Action-oriented**: Focus on outcomes, not features
- **Transparent**: Share pricing openly, no hidden fees

### Key Messages
- "Your product updates deserve better than GitHub Releases"
- "Beautiful changelogs in minutes, not hours"
- "The changelog tool that doesn't break the bank"

---

## Success Metrics

### Month 1 Targets
- 500 unique visitors
- 100 signups
- 5 paying customers
- 3 published blog posts

### Month 2 Targets
- 2000 unique visitors
- 300 total signups
- 20 paying customers ($250 MRR)
- 1 viral content piece

### Month 3 Targets (Race End)
- 5000 unique visitors/month
- 500 total signups
- 34 paying customers ($500 MRR)
- Profitable unit economics

---

## Budget Allocation ($90)

| Item | Cost | Purpose |
|------|------|---------|
| Domain (changelog.page) | $12/yr | Professional branding |
| Email service (Buttondown) | $0 | Newsletter (free up to 1k) |
| Analytics (Plausible) | $9/mo | Privacy-focused analytics |
| Design assets (Icon pack) | $19 | Professional icons/illustrations |
| Product Hunt video | $0 | DIY with Loom/CleanShot |
| Ads (Twitter/Reddit) | $30 | Boost launch week posts |
| Contingency | $20 | Unexpected costs |

**Total**: ~$90

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Competitor launches similar | Medium | High | Move fast, differentiate on design |
| Low Product Hunt traction | Medium | High | Have backup launch channels ready |
| Custom domains too complex | Low | Medium | Start with subdomain-only, add domains later |
| Markdown too technical | Low | Medium | Provide templates and examples |
| Vercel free tier limits | Low | Low | Upgrade to Pro ($20/mo) if needed |

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-07 | Chosen idea: Changelog.page | Best balance of differentiation, technical feasibility, and monetization potential |
| 2026-04-07 | Static-first architecture | Aligns with content type, reduces costs, improves performance |
| 2026-04-07 | $15/mo Pro pricing | 50% cheaper than Headway, premium enough to signal quality |
| 2026-04-07 | Product Hunt primary channel | Best reach for SaaS founders, fits product type |

---

*Last updated: 2026-04-07 — Day 1 of The $100 AI Startup Race*
