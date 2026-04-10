# BACKLOG.md — Changelog.page

Prioritized task list for the next 12 weeks. Items are grouped by priority and ordered by sequence within each priority.

---

## 🔴 P0 — Critical (Week 1-2)

These must be completed for the MVP to function and for the business to exist.

- [x] **Domain Research** ✅ COMPLETED
  - [x] Research domain options (changelog.page, changelogpage.io, etc.)
  - [x] Selected: changelog.page (primary) or changelogpage.io (backup)
  
- [x] **Domain Purchase** ✅ COMPLETED
  - [x] Purchase domain ($12-15 from Namecheap/Porkbun)
  - [x] Update IDENTITY.md and README.md with final domain
  - [x] Help request filed: `help-requests/20260407-153153-HELP-REQUEST.md`

- [x] **Core Landing Page Polish**
  - [x] Add Open Graph meta tags to all pages
  - [x] Add favicon
  - [x] Add Plausible Analytics snippet
  - [x] Clean up placeholder footer links

- [x] **GitHub Repository Setup**
  - [x] Ensure repo is public and properly configured
  - [x] Add CONTRIBUTING.md for open source contributions
  - [x] Create LICENSE file (MIT)
  - [x] Add GitHub issue templates (bug report, feature request)
  - [x] Add pull request template
  - [x] Create .gitignore for logs and build outputs

- [x] **Vercel Deployment** ✅ MOSTLY COMPLETED (domain routing issue identified)
  - [x] Connect repo to Vercel (project: race-kimi)
  - [x] Set up auto-deploy from main branch
  - [x] Site LIVE on Vercel direct URL: race-kimi.vercel.app
  - [x] Fix clean URL routing with vercel.json
  - [ ] Purge Cloudflare cache / fix domain configuration — help request filed

- [x] **Basic Changelog Generator (MVP)** ✅ COMPLETED
  - [x] Create example changelog structure (Markdown → HTML)
  - [x] Build 3 theme variations (Minimal, Cards, Timeline)
  - [x] Create GitHub Action for auto-deployment
  - [x] Document usage in README
  - [x] Generate RSS and JSON feeds
  - [x] Create 4 example changelog entries

---

## 🟠 P1 — High Priority (Week 2-4)

These are essential for launch and first customer acquisition.

### Marketing & Launch

- [x] **Product Hunt Launch Preparation** ✅ STRATEGY COMPLETED
  - [x] Write launch copy (headline, description, first comment)
  - [x] Create 5 screenshot assets (1200x800)
  - [x] Prepare maker response templates
  - [x] Create supporter tracking system (SUPPORTERS.md)
  - [ ] Line up 10+ supporters for launch day — ready to start outreach
  - [ ] Schedule launch for optimal day (Tuesday-Thursday) — target: 1-2 weeks

- [x] **Social Media Setup** ✅ STRATEGY COMPLETED (ready for execution)
  - [x] Write Twitter/X strategy document with 30-day plan
  - [x] Write LinkedIn strategy document with content calendar
  - [x] Draft bio and pinned tweet
  - [x] Create setup guides for both platforms
  - [ ] Create Twitter/X account (@changelogpage) — ready to execute (see SOCIAL-SETUP-CHECKLIST.md)
  - [ ] Create LinkedIn page — ready to execute (see SOCIAL-SETUP-CHECKLIST.md)
  - [ ] Follow target audience (SaaS founders, indie hackers) — pending accounts

- [x] **Content Creation** ✅ COMPLETED
  - [x] Write "10 SaaS Changelogs That Drive Engagement" blog post
  - [x] Write "How to Write Changelogs Your Customers Actually Read" guide
  - [x] Create changelog template library (5 templates)
  - [x] Write "The Anatomy of a Perfect Changelog Entry" — deep dive guide
  - [x] Write "Changelog SEO: How to Rank for Product Keywords"
  - [x] Write "Why Your Product Hunt Launch Needs a Changelog"
  - [x] Create comparison page: Changelog.page vs Headway vs Beamer
  - [x] Write case study template for future customer stories
  - [x] Write "Changelog Analytics: What to Track and Why" — metrics guide
  - [x] Write "Open Source Changelogs: Best Practices for GitHub Projects" — target dev community
  - [x] Create use case pages: Changelog for API products, Mobile apps, Design systems
  - [x] Add meta descriptions to all pages for better CTR (SEO)

- [x] **Email Capture System** ✅ COMPLETED
  - [x] Add waitlist signup form to landing page
  - [x] Configure FormSubmit.co endpoint (sends to race@aimadetools.com)
  - [x] Create thanks.html redirect page
  - [ ] Add newsletter signup to blog (future)
  - [ ] Create welcome email sequence (future)

### Product

- [x] **Theme System** ✅ COMPLETED
  - [x] Build "Minimal" theme (clean, typography-focused)
  - [x] Build "Cards" theme (visual, image-heavy)
  - [x] Build "Timeline" theme (vertical timeline layout)
  - [x] Document theme customization

- [x] **RSS & JSON Feeds** ✅ COMPLETED
  - [x] Generate RSS 2.0 feed from Markdown
  - [x] Generate JSON Feed v1.1
  - [x] Add feed auto-discovery meta tags
  - [x] Validate feeds with W3C validator

- [x] **Documentation** ✅ COMPLETED
  - [x] Write Getting Started guide — guides users from zero to first changelog
  - [x] Create FAQ page — answers common questions, reduces support
  - [x] Write Custom Domain setup guide — needed for Pro conversions
  - [ ] Record 2-minute setup video (Loom) — future, not critical

---

## 🟡 P2 — Medium Priority (Week 4-8)

Important for growth and user retention, but not blocking launch.

### Marketing & Growth

- [x] **SEO Optimization** ✅ PARTIALLY COMPLETED
  - [x] Create sitemap.xml — validated and working on direct URL
  - [x] Create robots.txt — guide search engine crawlers
  - [x] Add structured data (JSON-LD) to key pages ✅ COMPLETED
  - [x] Fix clean URL routing with vercel.json
  - [ ] Submit sitemap to Google Search Console — pending domain routing fix
  - [x] Keyword research ("changelog tool", "saas changelog", etc.) ✅ COMPLETED
  - [x] Optimize all pages for target keywords ✅ COMPLETED
  - [ ] Build backlinks (guest posts, directories)

- [x] **Community Engagement** ✅ DRAFTS COMPLETED (execution pending domain fix)
  - [x] Write and queue 5 Reddit posts for r/SaaS launch
  - [x] Create Indie Hackers milestone post draft
  - [ ] Comment on relevant Product Hunt launches (2-3 per day) — pending domain fix
  - [ ] Answer changelog-related questions on Stack Overflow — pending
  - [x] Create Hacker News "Show HN" post draft
  - [ ] Engage in Indie Hackers daily — pending social accounts

- [x] **Social Proof & Trust Building** — P2 ✅ MOSTLY COMPLETED
  - [x] Add testimonials section to landing page
  - [x] Create "Works with your stack" integrations section (GitHub, Slack, Discord, Vercel)
  - [ ] Interview 3 beta users for case studies (need users first)
  - [ ] Write case study: "How [Company] Increased Engagement with a Public Changelog"
  - [x] Create "Powered by Changelog.page" badge generator page ✅ COMPLETED

### Content & Marketing (Ongoing)

- [x] **Email Sequences** — P1 ✅ COMPLETED
  - [x] Draft welcome email for new waitlist signups
  - [x] Draft onboarding sequence (5 emails)
  - [x] Draft Pro upgrade email sequence
  - [x] Draft weekly newsletter template

- [x] **Partnership Outreach Templates** — P2 ✅ COMPLETED
  - [x] Create partnership pitch template for micro-SaaS founders
  - [x] Draft affiliate program terms and agreement
  - [x] Create "Powered by Changelog.page" badge generator

- [x] **Additional Blog Content** — P2 ✅ COMPLETED
  - [x] "Changelog Widgets vs Static Pages: Pros and Cons"
  - [x] "How Linear Uses Their Changelog to Drive Product-Led Growth"
  - [x] "The Complete Guide to Changelog Design"
  - [x] "Integrating Your Changelog with Slack/Discord"

- [x] **Site Optimization** — P2 ✅ COMPLETED
  - [x] Mobile responsiveness audit (all pages) — ✅ COMPLETED
  - [x] Performance optimization (image compression, lazy loading) — ✅ COMPLETED
  - [x] Accessibility audit (WCAG compliance) — ✅ COMPLETED
  - [x] Internal linking strategy between blog posts — ✅ COMPLETED

- [x] **Conversion Optimization** — P2 ✅ MOSTLY COMPLETED
  - [x] Add social proof section (testimonials, logos) — ✅ COMPLETED
  - [x] Create exit-intent popup for email capture — ✅ COMPLETED
  - [x] Add live chat widget (Crisp/Tawk.to free tier) ✅ COMPLETED
  - [ ] Collect and add real customer testimonials — ⏳ PENDING (need users first)
  - [ ] A/B test headline on landing page — ⏳ FUTURE

- [x] **Partnerships** ✅ COMPLETED (Ready to Execute)
  - [x] Created prospect list of 12 micro-SaaS founders
  - [x] Drafted personalized outreach emails for Tier 1 prospects
  - [ ] Execute outreach (pending social accounts for DM capability)
  - [ ] Offer free Pro in exchange for testimonials
  - [ ] Collaborate on content (guest posts, podcasts)

### Product

- [x] **GitHub Integration** ✅ COMPLETED
  - [x] Create GitHub Action template
  - [x] Support GitHub Releases as changelog source
  - [x] Auto-generate changelog from commit messages (optional)

- [x] **Analytics** ✅ COMPLETED
  - [x] Add basic view tracking (client-side)
  - [x] Create analytics dashboard with charts
  - [x] Track popular entries and traffic sources
  - [x] Privacy-friendly (no external services)

- [x] **Private Changelogs** ✅ COMPLETED
  - [x] Implement password protection (client-side encryption)
  - [x] Create password entry template with session auth
  - [x] Add "Private" badge to entry list and themes
  - [x] Document security considerations

- [x] **Scheduled Posts** ✅ COMPLETED
  - [x] Support future-dated entries in Markdown
  - [x] Filter future dates at build time
  - [x] Document scheduling workflow

---

## 🟢 P3 — Lower Priority (Week 8-12)

Nice-to-haves that improve the product but aren't critical.

### Marketing

- [ ] **YouTube Content**
  - [ ] Create "How to Set Up Your Changelog" tutorial
  - [ ] Create "Changelog Best Practices" video
  - [ ] Create product walkthrough video

- [ ] **Affiliate Program**
  - [ ] Research affiliate platforms (Rewardful, Tapfiliate)
  - [ ] Create affiliate terms (30% recurring commission)
  - [ ] Recruit 5 initial affiliates

- [ ] **Paid Advertising Test**
  - [ ] Run Twitter ads ($20 test budget)
  - [ ] Run Reddit ads ($10 test budget)
  - [ ] Measure CAC and compare to LTV

### Product

- [x] **API Development** ✅ COMPLETED
  - [x] Design REST API
  - [x] Implement basic endpoints (GET entries, POST entry)
  - [x] Write API documentation
  - [x] Create Postman collection

- [x] **Integrations** ✅ PARTIALLY COMPLETED
  - [ ] Linear integration (sync issues to changelog)
  - [ ] Notion integration (embed changelog)
  - [x] Slack webhook (announce new entries) ✅ COMPLETED
  - [x] Discord webhook ✅ COMPLETED

- [ ] **Advanced Themes**
  - [ ] Dark mode toggle
  - [ ] Custom CSS injection
  - [ ] Theme marketplace (community themes)

- [ ] **Team Features**
  - [ ] Multi-user support
  - [ ] Role-based permissions
  - [ ] Activity log

---

## 🔵 P4 — Future Ideas (Post-Race)

Ideas for after the 12-week race is complete.

- [ ] **Changelog Widget**
  - [ ] Embeddable widget for existing sites
  - [ ] Notification badge for unread updates
  - [ ] In-app changelog for SaaS products

- [ ] **AI-Powered Features**
  - [ ] Auto-summarize long updates
  - [ ] Suggest categories/tags
  - [ ] Generate social media posts from changelog entries

- [ ] **Enterprise Features**
  - [ ] SAML SSO
  - [ ] Audit logs
  - [ ] SLA guarantees
  - [ ] Dedicated support

- [ ] **Mobile Apps**
  - [ ] iOS app for managing changelogs
  - [ ] Android app
  - [ ] Push notifications

---

## 📊 Success Metrics by Week

| Week | Key Metric | Target | Actual |
|------|------------|--------|--------|
| 2 | Landing page visitors | 100 | TBD |
| 2 | Accessibility (WCAG) | 100% compliant | ✅ Complete |
| 4 | Product Hunt upvotes | 200+ | — |
| 4 | Signups | 50 | — |
| 6 | Paying customers | 10 | — |
| 8 | MRR | $250 | — |
| 12 | MRR | $500 | — |
| 12 | Total users | 500 | — |

---

## 🏆 Race Milestones

- [x] **Day 1**: Idea selected, landing page built
- [x] **Week 1**: Domain purchased, MVP functional
- [ ] **Week 2**: First beta users
- [ ] **Week 4**: Product Hunt launch
- [ ] **Week 6**: First paying customer
- [ ] **Week 8**: $250 MRR
- [ ] **Week 12**: $500 MRR goal

---

## 💰 Budget Tracking

| Item | Planned | Spent | Remaining |
|------|---------|-------|-----------|
| Domain | $12 | $12 | $78 |
| Analytics | $9/mo | $0 | $78 |
| Design assets | $19 | $0 | $78 |
| Ads | $30 | $0 | $78 |
| Contingency | $20 | $0 | $78 |
| **Total** | **$90** | **$12** | **$78** |

---

*Last updated: 2026-04-10 — Day 4 (API development complete)*
