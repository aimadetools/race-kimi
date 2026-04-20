# IDENTITY.md — LogDrop

## Startup Identity

**Name:** LogDrop  
**Tagline:** Production log analysis that stays on your machine.  
**Domain:** logdrop.io (target) or logdrop.dev (fallback)  
**Category:** Privacy-First Developer Tools  

---

## Mission

Every day, developers and support teams receive log files containing API keys, user PII, and internal system details. They're told to debug fast — but also told never to upload those logs to third-party tools. LogDrop solves this paradox by analyzing logs entirely inside the browser. Zero uploads. Zero data leakage. Zero trust required.

---

## Target Audience

| Segment | Role | Pain |
|---------|------|------|
| Primary | Backend Developers / SREs | Need to analyze customer logs but can't upload to SaaS due to compliance |
| Secondary | Technical Support Engineers | Receive sensitive logs from customers; company policy forbids uploads |
| Tertiary | QA Engineers | Analyze large test-run logs without corporate approval for cloud tools |

---

## Pricing Tiers

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | Files up to 5MB, JSON/logfmt/CSV/text, basic search & filter, 7-day local history, single user |
| Pro | $19/mo or $180/yr | Unlimited file size, all formats + multiline stack traces, pattern detection, team sharing via encoded URLs, sanitized PDF/CSV export, priority support |
| Team | $49/mo | Everything in Pro + up to 10 seats, shared workspace, custom pattern rules, Slack digest summaries |

---

## User Acquisition Plan

### Week 1
- Launch "Show HN" post with angle: "I built a log analyzer that never uploads your data."
- Publish dev.to article: "Why We Can't Upload Customer Logs (And What I Built Instead)"
- Share in 5 relevant Slack/Discord communities

### Week 2
- Post in r/webdev, r/SRE, r/devops
- Launch on Indie Hackers
- Start Twitter/X thread on privacy-first devtools

### Week 3
- Product Hunt launch
- Email 20 developer newsletter authors
- Add email capture to landing page for Pro waitlist

### Week 4
- Publish SEO article: "How to Analyze Production Logs Without Violating GDPR / SOC 2"
- Guest post on dev.to or Medium publication

### Week 5-6
- Create 3 video demos (screen + captions, no voiceover)
- Post on Twitter/X, LinkedIn, YouTube

### Week 7-8
- Outreach to logging library maintainers (winston, pino, bunyan, zap, serilog) for backlinks
- Publish comparison: "LogDrop vs Splunk vs Datadog for Incident Response"

### Week 9-10
- Launch referral program: 1 month free per paying referral
- Collect testimonials from early Pro users

### Week 11-12
- Run $20-30 Twitter/X retargeting campaign targeting DevOps/SRE followers
- Evaluate SEO performance, double down on top 3 keywords

---

## Monetization Strategy

1. **Month 1 (Weeks 1-4):** Free tool + email waitlist. No payment. Build trust and usage.
2. **Month 2 (Weeks 5-8):** Launch Pro tier via LemonSqueezy or Stripe Checkout. Gated features: unlimited size, pattern detection, export.
3. **Month 3 (Weeks 9-12):** Launch Team tier. Add sharing + collaboration.
4. **Month 4+:** Enterprise conversations (SSO, audit logs). Add annual billing discount.

---

## Tech Approach

| Layer | Choice | Reason |
|-------|--------|--------|
| Frontend | Vanilla HTML/CSS/JS | Zero dependencies, fast load, easy to host |
| Styling | Modern CSS (Grid/Flex), dark theme | Developer aesthetic |
| Parsing | FileReader API + Web Workers | Non-blocking, handles large files |
| Storage | localStorage + IndexedDB | No server needed for MVP |
| Charts | Chart.js | Lightweight, good timeline viz |
| Hosting | Vercel (free tier) | Auto-deploy on push, serverless ready |
| Payments | LemonSqueezy or Stripe Checkout | Easiest integration for static sites |
| Analytics | Plausible (privacy-first) | Aligns with brand values, ~$9/mo |

---

## 12-Week Roadmap

| Week | Milestone | Deliverable |
|------|-----------|-------------|
| 1 | Landing page + brand | index.html, about.html, pricing.html, blog.html |
| 2 | Core MVP | JSON log parser, drop zone, table view, basic search |
| 3 | Format expansion | Add logfmt, CSV, plain text parsers |
| 4 | Payments + Pro gate | Integrate LemonSqueezy/Stripe, unlock Pro features |
| 5 | Visualization | Timeline chart, level distribution pie chart |
| 6 | Intelligence | Error pattern detection, duplicate clustering |
| 7 | Collaboration | Encoded URL sharing, export sanitized PDF/CSV |
| 8 | Polish + Themes | Dark/light mode, keyboard shortcuts, perf optimization |
| 9 | Marketing content | 3 blog posts, 2 video demos, SEO optimization |
| 10 | Community | Referral program, testimonials, newsletter launch |
| 11 | Scale | 100MB+ file support, memory optimization, Web Workers batching |
| 12 | Retrospective | Analyze metrics, plan next quarter, investor update |

---

## Budget Allocation (from $90)

| Item | Cost | Status |
|------|------|--------|
| Domain (logdrop.io or .dev) | $12-15 | Pending human help |
| Plausible Analytics (annual) | $0 (use free trial / self-hosted) | - |
| LemonSqueezy / Stripe | $0 (transaction fees only) | - |
| Twitter/X ads (test) | $20 | Week 11-12 |
| Contingency / tools | $55-58 | Reserve |

---

## Differentiation

- **Privacy as core feature, not afterthought:** Every competitor requires upload or SaaS signup. LogDrop is architected for zero-network analysis.
- **Support-team friendly:** Built for the person who got a 30MB log file in Zendesk and has no idea what's safe to use.
- **Incremental value:** Free tier is genuinely useful. Pro adds power features, not paywalls basic functionality.
