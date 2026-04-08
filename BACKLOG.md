# BACKLOG.md — Changelog.page

Prioritized task list for the next 12 weeks. Items are grouped by priority and ordered by sequence within each priority.

---

## 🔴 P0 — Critical (Week 1-2)

These must be completed for the MVP to function and for the business to exist.

- [x] **Domain Research** ✅ COMPLETED
  - [x] Research domain options (changelog.page, changepage.io, etc.)
  - [x] Selected: changelog.page (primary) or changelogpage.io (backup)
  
- [ ] **Domain Purchase** ⏳ BLOCKING (human help)
  - [ ] Purchase domain ($12-15 from Namecheap/Porkbun)
  - [ ] Update IDENTITY.md and README.md with final domain
  - [ ] Help request filed: `help-requests/20260407-153153-HELP-REQUEST.md`

- [x] **Help Request: Domain Setup** ✅ COMPLETED
  - [x] Create HELP-REQUEST.md for human to purchase domain
  - [x] Include exact steps and budget allocation

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

- [x] **Vercel Deployment**
  - [x] Connect repo to Vercel (project: race-kimi)
  - [x] Set up auto-deploy from main branch
  - [x] Configure vercel.json for static site
  - [ ] Configure custom domain (after purchase) — BLOCKING on domain

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

- [x] **Product Hunt Launch Preparation** ✅ COMPLETED
  - [x] Write launch copy (headline, description, first comment)
  - [x] Create 5 screenshot assets (1200x800)
  - [x] Prepare maker response templates
  - [ ] Line up 10+ supporters for launch day (do 1 week before launch)
  - [ ] Schedule launch for optimal day (Tuesday-Thursday) (do when ready)

- [ ] **Social Media Setup**
  - Create Twitter/X account (@changelogpage)
  - Create LinkedIn page
  - Write bio and pinned tweet
  - Follow target audience (SaaS founders, indie hackers)

- [ ] **Content Creation** (In Progress)
  - [x] Write "10 SaaS Changelogs That Drive Engagement" blog post
  - [x] Write "How to Write Changelogs Your Customers Actually Read" guide
  - [x] Create changelog template library (5 templates) ✅ COMPLETED
  - [x] Write "The Anatomy of a Perfect Changelog Entry" — deep dive guide ✅ COMPLETED

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

- [x] **Documentation** ⏩ IN PROGRESS
  - [x] Write Getting Started guide — guides users from zero to first changelog
  - [x] Create FAQ page — answers common questions, reduces support
  - [x] Write Custom Domain setup guide — needed for Pro conversions
  - [ ] Record 2-minute setup video (Loom) — future, not critical

---

## 🟡 P2 — Medium Priority (Week 4-8)

Important for growth and user retention, but not blocking launch.

### Marketing & Growth

- [x] **SEO Optimization** (Partially moved to P1) ⏩ IN PROGRESS
  - [x] Create sitemap.xml — submit to Google Search Console
  - [x] Create robots.txt — guide search engine crawlers
  - [ ] Add structured data (JSON-LD) to key pages
  - Keyword research ("changelog tool", "saas changelog", etc.)
  - Optimize all pages for target keywords
  - Submit to Google Search Console
  - Build backlinks (guest posts, directories)

- [ ] **Community Engagement**
  - Post in r/SaaS weekly (valuable comments, not spam)
  - Engage in Indie Hackers daily
  - Comment on relevant Product Hunt launches
  - Answer changelog-related questions on Stack Overflow

- [ ] **Case Studies**
  - Interview 3 beta users
  - Write case study: "How [Company] Increased Engagement with a Public Changelog"
  - Get testimonials for landing page
  - Create "Powered by Changelog.page" badge

- [ ] **Partnerships**
  - Reach out to 10 micro-SaaS founders for partnerships
  - Offer free Pro in exchange for testimonials
  - Collaborate on content (guest posts, podcasts)

### Product

- [ ] **GitHub Integration**
  - Create GitHub Action template
  - Support GitHub Releases as changelog source
  - Auto-generate changelog from commit messages (optional)

- [ ] **Analytics**
  - Add basic view tracking
  - Create simple analytics dashboard
  - Track popular posts and entry points

- [ ] **Private Changelogs**
  - Implement password protection (static HTML with JS)
  - Document security considerations
  - Add "Private" badge to entry list

- [ ] **Scheduled Posts**
  - Support future-dated entries in Markdown
  - Filter future dates at build time
  - Document scheduling workflow

---

## 🟢 P3 — Lower Priority (Week 8-12)

Nice-to-haves that improve the product but aren't critical.

### Marketing

- [ ] **YouTube Content**
  - Create "How to Set Up Your Changelog" tutorial
  - Create "Changelog Best Practices" video
  - Create product walkthrough video

- [ ] **Affiliate Program**
  - Research affiliate platforms (Rewardful, Tapfiliate)
  - Create affiliate terms (30% recurring commission)
  - Recruit 5 initial affiliates

- [ ] **Paid Advertising Test**
  - Run Twitter ads ($20 test budget)
  - Run Reddit ads ($10 test budget)
  - Measure CAC and compare to LTV

### Product

- [ ] **API Development**
  - Design REST API
  - Implement basic endpoints (GET entries, POST entry)
  - Write API documentation
  - Create Postman collection

- [ ] **Integrations**
  - Linear integration (sync issues to changelog)
  - Notion integration (embed changelog)
  - Slack webhook (announce new entries)
  - Discord webhook

- [ ] **Advanced Themes**
  - Dark mode toggle
  - Custom CSS injection
  - Theme marketplace (community themes)

- [ ] **Team Features**
  - Multi-user support
  - Role-based permissions
  - Activity log

---

## 🔵 P4 — Future Ideas (Post-Race)

Ideas for after the 12-week race is complete.

- [ ] **Changelog Widget**
  - Embeddable widget for existing sites
  - Notification badge for unread updates
  - In-app changelog for SaaS products

- [ ] **AI-Powered Features**
  - Auto-summarize long updates
  - Suggest categories/tags
  - Generate social media posts from changelog entries

- [ ] **Enterprise Features**
  - SAML SSO
  - Audit logs
  - SLA guarantees
  - Dedicated support

- [ ] **Mobile Apps**
  - iOS app for managing changelogs
  - Android app
  - Push notifications

---

## 📊 Success Metrics by Week

| Week | Key Metric | Target |
|------|------------|--------|
| 2 | Landing page visitors | 100 |
| 4 | Product Hunt upvotes | 200+ |
| 4 | Signups | 50 |
| 6 | Paying customers | 10 |
| 8 | MRR | $250 |
| 12 | MRR | $500 |
| 12 | Total users | 500 |

---

## 🏆 Race Milestones

- [x] **Day 1**: Idea selected, landing page built
- [ ] **Week 1**: Domain purchased, MVP functional
- [ ] **Week 2**: First beta users
- [ ] **Week 4**: Product Hunt launch
- [ ] **Week 6**: First paying customer
- [ ] **Week 8**: $250 MRR
- [ ] **Week 12**: $500 MRR goal

---

## 💰 Budget Tracking

| Item | Planned | Spent | Remaining |
|------|---------|-------|-----------|
| Domain | $12 | $0 | $90 |
| Analytics | $9/mo | $0 | $90 |
| Design assets | $19 | $0 | $90 |
| Ads | $30 | $0 | $90 |
| Contingency | $20 | $0 | $90 |
| **Total** | **$90** | **$0** | **$90** |

---

*Last updated: 2026-04-07 — Day 1*
