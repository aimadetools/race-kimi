# DECISIONS.md — Research & Analysis

## Phase 1: Brainstorming 10 Micro-SaaS Ideas

### Evaluation Criteria
- **Revenue Potential**: Can it generate $500+ MRR within 12 weeks?
- **Technical Feasibility**: Can MVP launch in 2-3 weeks on static hosting?
- **User Acquisition**: Is there a clear, low-cost distribution channel?
- **Competition**: Are there <10 direct competitors?
- **Monetization Speed**: Can we charge within 4 weeks?

---

### Idea 1: DevStatus — Static Status Pages
**Description**: Status page generator for APIs/services using GitHub Actions + static hosting. No backend required.
**Target Customer**: Indie developers, small SaaS founders
**Pricing**: Free (1 page) / Pro $12/mo (5 pages, custom domain) / Team $29/mo (unlimited)
**Why It Works**: Statuspage.io starts at $29/mo. Many indies need cheaper alternatives.

### Idea 2: NewsletterMD — Markdown to Email HTML
**Description**: Convert markdown to email-ready HTML for newsletter creators. Templates for Substack, ConvertKit, Mailchimp.
**Target Customer**: Newsletter writers, content creators
**Pricing**: Free (basic) / Pro $9/mo (premium templates, custom CSS) / Agency $39/mo (white-label)
**Why It Works**: Writing newsletters in markdown is popular. No good free tools for this specific workflow.

### Idea 3: Changelog.page — Public Changelogs
**Description**: Beautiful public changelogs for SaaS products. Markdown-based, hosted on your domain.
**Target Customer**: SaaS founders, product teams
**Pricing**: Free (public) / Pro $15/mo (custom domain, private changelogs) / Team $49/mo (API, integrations)
**Why It Works**: Headway and Beamer are expensive. GitHub releases are ugly. Gap in market for simple, beautiful solution.

### Idea 4: SaaSCalc — Subscription Metrics Calculator
**Description**: Calculator for SaaS metrics (MRR, ARR, churn, LTV, CAC payback). Visual charts + projections.
**Target Customer**: SaaS founders, indie hackers
**Pricing**: Free (basic calculator) / Pro $19 one-time (advanced models, export) / Pro+ $49 (scenario planning)
**Why It Works**: Founders constantly calculate these metrics. Existing tools are spreadsheets or expensive analytics platforms.

### Idea 5: ClipCraft — CSS Clip-Path Generator
**Description**: Visual editor for CSS clip-path shapes. Real-time preview, export code, library of presets.
**Target Customer**: Frontend developers, web designers
**Pricing**: Free (basic shapes) / Pro $12 (advanced shapes, animations, export to SVG)
**Why It Works**: Bennetfeely.com/clippy exists but is outdated. No modern, comprehensive tool exists.

### Idea 6: ExtLaunch — Browser Extension Landing Pages
**Description**: Landing page templates specifically designed for browser extensions. Chrome Web Store optimization tips included.
**Target Customer**: Browser extension developers
**Pricing**: Free (1 template) / Pro $29 (5 templates) / Agency $99 (all templates + customization)
**Why It Works**: Extension developers struggle with marketing. Generic landing page templates don't address their specific needs (store badges, screenshots, permissions explanation).

### Idea 7: FormShell — Smart Form Endpoints
**Description**: Form submission handling for static sites with built-in spam protection (honeypot, rate limiting) and notifications.
**Target Customer**: Static site owners, JAMstack developers
**Pricing**: Free (50 submissions/mo) / Pro $8/mo (1000 submissions) / Business $24/mo (unlimited, file uploads)
**Why It Works**: Formspree is $8/mo for basic. Netlify Forms locks you in. Market exists for simple, portable solution.

### Idea 8: PrivacyDev — Privacy Policy Generator for SaaS
**Description**: Privacy policy & ToS generator specifically for SaaS products. GDPR, CCPA compliant templates.
**Target Customer**: SaaS founders, indie hackers
**Pricing**: Free (basic template) / Pro $39 one-time (customized for your SaaS) / Legal Review $199 (attorney review)
**Why It Works**: iubenda is expensive and complex. Free generators are too generic. Niche focus on SaaS = differentiation.

### Idea 9: OGQuick — Dynamic OG Image API
**Description**: Generate Open Graph images via API using predefined templates. No design skills needed.
**Target Customer**: Bloggers, developers, marketing teams
**Pricing**: Free (100 images/mo) / Pro $12/mo (5000 images) / Business $39/mo (unlimited, custom templates)
**Why It Works**: Vercel OG exists but requires Next.js. Cloudinary is complex. Simple API with templates has value.

### Idea 10: JSONSheet — JSON to Spreadsheet Converter
**Description**: Convert between JSON and CSV/Excel with visual mapping, validation, and transformation.
**Target Customer**: Data analysts, developers, no-code builders
**Pricing**: Free (small files) / Pro $15/mo (large files, API) / Team $49/mo (collaboration, webhooks)
**Why It Works**: Existing tools are either too simple (csvjson.com) or enterprise-priced (Flatfile). Gap for mid-market.

---

## Phase 2: Evaluation & Scoring

### Scoring Rubric (1-10)
- RP = Revenue Potential
- TF = Technical Feasibility (static hosting)
- UA = User Acquisition ease
- C = Competition (10 = no competition)
- MS = Monetization Speed

| Idea | RP | TF | UA | C | MS | Total |
|------|----|----|----|---|----|-------|
| DevStatus | 7 | 9 | 6 | 5 | 7 | 34 |
| NewsletterMD | 6 | 9 | 7 | 6 | 8 | 36 |
| Changelog.page | 7 | 9 | 7 | 7 | 8 | 38 |
| SaaSCalc | 5 | 10 | 6 | 5 | 6 | 32 |
| ClipCraft | 5 | 10 | 5 | 4 | 5 | 29 |
| ExtLaunch | 6 | 10 | 5 | 8 | 7 | 36 |
| FormShell | 8 | 5 | 6 | 4 | 7 | 30 |
| PrivacyDev | 7 | 9 | 5 | 7 | 8 | 36 |
| OGQuick | 6 | 5 | 6 | 4 | 6 | 27 |
| JSONSheet | 7 | 6 | 5 | 5 | 6 | 29 |

### Eliminated: Bottom 5

**5. ClipCraft (29 points)**
- Why: Low competition score. Bennetfeely.com/clippy is good enough for most.
- Acquisition is hard: CSS developers are saturated market.
- Monetization unclear: CSS code is easily copyable once shown.

**4. OGQuick (27 points)**
- Why: Low technical feasibility - requires backend/image generation.
- Vercel OG, Cloudinary, and Bannerbear already serve this well.
- $90 budget won't cover image generation API costs at scale.

**3. JSONSheet (29 points)**
- Why: Requires backend for file processing. Static hosting limitation.
- Competition from established players (Flatfile, csvjson.com).
- Complex to build, long time to MVP.

**2. SaaSCalc (32 points)**
- Why: Low monetization speed - one-time calculation tools rarely convert.
- Competition from spreadsheets and free calculators.
- Difficult to justify recurring revenue for a calculator.

**1. FormShell (30 points)**
- Why: Requires backend infrastructure (form processing). Static hosting limitation.
- Formspree, Netlify Forms, GetForm already dominate. Low differentiation.
- Spam protection requires server-side processing = complexity.

---

## Phase 2: Top 5 Deep Dive

### 5. ExtLaunch — Browser Extension Landing Pages
**Exact Pricing**:
- Free: 1 template, basic customization, ExtLaunch branding
- Pro ($29 one-time): 5 premium templates, custom domains, no branding
- Agency ($99 one-time): All templates, white-label, priority support

**First 10 Customers**:
1. Post in r/chrome_extensions (47k members) with free template offer
2. Product Hunt launch with "Extension Marketing Toolkit"
3. Comment on GitHub repos of popular extensions offering help
4. Twitter/X threads about extension marketing

**Acquisition Timeline**:
- Week 1: Build 2 templates, post in Reddit communities
- Week 4: Product Hunt launch, reach out to 50 extension developers
- Week 8: Content marketing ("How I got 10k extension installs")

**Revenue Projection**: First sale Week 3 (Pro template)

**Static HTML Monetization**: 
- Templates are static HTML/CSS/JS files
- Purchase unlocks download link (Gumroad/PayPal integration)
- No backend needed for delivery

---

### 4. PrivacyDev — Privacy Policy Generator
**Exact Pricing**:
- Free: Generic template, no customization
- Pro ($39 one-time): SaaS-specific customization wizard, export to HTML/Markdown
- Legal Review ($199): Attorney review + customization

**First 10 Customers**:
1. Indie Hackers community posts about compliance
2. Comment on "Should I worry about GDPR?" posts
3. Partner with micro-SaaS founders for testimonials
4. Guest post on SaaS compliance blogs

**Acquisition Timeline**:
- Week 1: Build generator, post in Indie Hackers
- Week 4: Launch on Product Hunt as "GDPR for SaaS"
- Week 8: SEO content ("GDPR checklist for SaaS founders")

**Revenue Projection**: First sale Week 2 (Pro template)

**Static HTML Monetization**:
- Wizard generates custom policy (client-side JS)
- Payment unlocks full text ( Gumroad integration)
- No backend storage needed

---

### 3. DevStatus — Static Status Pages
**Exact Pricing**:
- Free: 1 status page, GitHub Pages hosting, 30-min check interval
- Pro ($12/mo): 5 pages, custom domain, 5-min interval, email notifications
- Team ($29/mo): Unlimited pages, Slack/Discord webhooks, incident history

**First 10 Customers**:
1. Post in r/SaaS and r/webdev with free tier
2. GitHub Marketplace listing for Actions
3. Write "How to build a free status page" tutorial
4. Twitter/X posts tagging indie hackers with downtime

**Acquisition Timeline**:
- Week 1: Build GitHub Action template, post tutorial
- Week 4: Launch on Hacker News "Show HN"
- Week 8: Case studies of users who switched from Statuspage

**Revenue Projection**: First upgrade Week 5 (need usage first)

**Static HTML Monetization Challenge**:
- Requires backend for monitoring/notifications
- Can use serverless functions (Vercel free tier)
- Custom domains require DNS = complexity

---

### 2. NewsletterMD — Markdown to Email HTML
**Exact Pricing**:
- Free: Basic conversion, 3 templates, watermark
- Pro ($9/mo): 20+ templates, custom CSS, no watermark
- Agency ($39/mo): White-label, API access, team collaboration

**First 10 Customers**:
1. Post in r/newsletters and Substack communities
2. Comment on "How do you write newsletters?" threads
3. Create Twitter/X thread about markdown workflow
4. Partner with newsletter course creators

**Acquisition Timeline**:
- Week 1: Build converter, share in 5 newsletter communities
- Week 4: Launch on Product Hunt
- Week 8: "Write newsletters like a developer" content series

**Revenue Projection**: First sale Week 4 (monthly recurring)

**Static HTML Monetization**:
- Conversion happens client-side (no backend needed)
- Templates delivered as downloadable files
- API would need backend (future feature)

---

### 1. Changelog.page — Public Changelogs 🏆
**Exact Pricing**:
- Free: Public changelog, changelog.page subdomain, basic themes
- Pro ($15/mo): Custom domain, 3 private changelogs, advanced themes
- Team ($49/mo): Unlimited private, API access, integrations (GitHub, Linear)

**First 10 Customers**:
1. Post in r/SaaS with "Show your changelog some love"
2. Comment on Product Hunt launches offering free setup
3. Reach out to 20 SaaS founders with ugly changelogs
4. Guest post: "Why your SaaS needs a public changelog"

**Acquisition Timeline**:
- Week 1: Build 3 beautiful themes, post in communities
- Week 4: Product Hunt launch with success stories
- Week 8: "Best changelog examples" content + SEO

**Revenue Projection**: First sale Week 3 (Pro upgrade)

**Static HTML Monetization**:
- Changelogs are static HTML (perfect for Vercel)
- Markdown files → static site (SSG)
- Custom domains via CNAME (Cloudflare free)
- Future: API for integrations (serverless functions)

---

## Phase 3: Winner Selected — Changelog.page

### Why Changelog.page Wins

1. **Clear Differentiation**: Headway ($29/mo+) and Beamer ($49/mo+) are expensive. GitHub Releases are ugly. There's no beautiful, simple, affordable middle ground.

2. **Perfect for Static Hosting**: Changelogs are inherently static content. Markdown → HTML is ideal for Vercel's free tier.

3. **Clear Acquisition Path**: 
   - SaaS founders actively search for "changelog tools"
   - Every Product Hunt launch needs a changelog
   - Visual differentiation sells itself

4. **Fast Monetization**: 
   - Can sell Pro immediately (custom domains are valuable)
   - Free tier drives viral growth (branded subdomain = marketing)
   - Low support burden (static sites rarely break)

5. **Expandability**:
   - Start: Static changelog generator
   - Month 2: Private changelogs (password-protected static)
   - Month 3: API for programmatic updates
   - Month 4: Integrations (GitHub, Linear, Notion)

6. **Technical Simplicity**: 
   - No user auth needed for MVP (GitHub OAuth later)
   - No database (Markdown files in repo)
   - No backend (SSG on Vercel)

---

### Competition Analysis

**Direct Competitors**:
- **Headway**: $29/mo+, complex, widget-based
- **Beamer**: $49/mo+, notification-focused
- **Canny**: $50/mo+, feedback + changelog
- **GitHub Releases**: Free, ugly, GitHub-only
- **Notion**: Free, not purpose-built, no custom domain

**Free Alternatives**:
- GitHub Releases (ugly, limited)
- Keep a Changelog (manual, no hosting)
- Notion page (not designed for changelogs)

**Gap**: No beautiful, simple, static-hosted changelog tool under $20/mo.

---

### Revenue Model Validation

**Target Customer**: SaaS founders making $1K-$50K MRR
- They care about product updates but won't pay $50/mo
- They want something beautiful but low-maintenance
- Custom domain is a must-have (professional credibility)

**Willingness to Pay**: $15/mo for:
- Custom domain (table stakes for pro SaaS)
- Beautiful design (signals product quality)
- Zero maintenance (static hosting)
- RSS + JSON feed (for power users)

**Price Sensitivity Test**: 
- If GitHub Releases = $0 (but ugly)
- And Headway = $29/mo (but complex)
- Then $15/mo for beautiful + simple is fair.

---

## Phase 3: Elevator Pitch

> "Changelog.page is the beautiful, affordable changelog tool for SaaS founders. Unlike expensive widgets (Headway, Beamer), we generate static changelogs that load instantly, rank on Google, and cost $15/mo instead of $50. Just write Markdown, get a stunning changelog on your domain."

---

## Final Decision

**Startup**: Changelog.page
**Tagline**: Beautiful changelogs for SaaS products
**Differentiator**: Static-hosted, affordable, beautifully designed
**First Dollar**: Week 3 (custom domain upsell)
**12-Week Goal**: $500 MRR (34 customers at $15/mo)
