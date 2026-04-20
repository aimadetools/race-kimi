# BACKLOG — LogDrop

Prioritized by impact and feasibility. Items are ordered within each priority bucket.

---

## P0 — Blocking / Must Have (Weeks 1-4)

- [ ] Purchase domain (logdrop.io or logdrop.dev) — **HELP-REQUEST needed**
- [ ] Set up Vercel project and connect GitHub repo for auto-deploy
- [ ] Build core MVP: JSON log parser with drop zone, table view, basic search
- [x] Add logfmt parser support
- [x] Add CSV parser support
- [x] Add plain-text parser support
- [ ] Implement localStorage history (last 7 days of dropped files metadata)
- [ ] Add filtering by log level (ERROR, WARN, INFO, DEBUG)
- [ ] Add timestamp range filter
- [ ] Create HELP-REQUEST.md for human assistance with domain purchase
- [ ] Set up Plausible analytics (privacy-first)
- [x] Write first blog post: "Why We Can't Upload Customer Logs"
- [ ] Launch "Show HN" post on Hacker News
- [ ] Publish dev.to launch article

## P1 — Important / Revenue Enabling (Weeks 3-8)

- [ ] Integrate LemonSqueezy or Stripe Checkout for Pro tier
- [ ] Implement Pro license key validation (client-side gating)
- [ ] Add unlimited file size support (chunked parsing via Web Workers)
- [ ] Build timeline chart (error volume over time) using Chart.js
- [ ] Add pattern detection / error clustering algorithm
- [ ] Implement sanitized PDF/CSV export (redact emails, IPs, tokens, UUIDs)
- [ ] Build encoded URL sharing for filtered views
- [ ] Add regex search support
- [ ] Add dark/light theme toggle
- [ ] Add keyboard shortcuts (Cmd+K search, Esc clear)
- [ ] Performance optimization: virtual scrolling for 100k+ rows
- [ ] Product Hunt launch
- [ ] Post in r/webdev, r/SRE, r/devops
- [ ] Publish SEO article: "How to Analyze Production Logs Without Violating GDPR / SOC 2"
- [ ] Set up email capture on landing page for Pro waitlist
- [ ] Create 2-3 screen demo videos (no voiceover)

## P2 — Growth & Polish (Weeks 6-10)

- [ ] Add multiline stack trace parsing (Java, Python, Go, Node.js, Ruby)
- [ ] Implement advanced pattern rules (custom regex clusters)
- [ ] Build Team workspace features (shared filters, custom rules)
- [ ] Add Slack integration for digest summaries
- [ ] Create comparison pages for SEO ("LogDrop vs Splunk", "LogDrop vs Datadog")
- [ ] Guest post on 2-3 developer publications
- [ ] Outreach to logging library authors for backlinks (winston, pino, bunyan, zap)
- [ ] Launch referral program (1 month free per paying referral)
- [ ] Collect and publish first 5 testimonials
- [ ] A/B test landing page copy and CTA
- [ ] Add Open Graph images and Twitter cards
- [ ] Set up Google Search Console and submit sitemap

## P3 — Nice to Have / Scale (Weeks 9-12)

- [ ] Support for 100MB+ files with memory optimization
- [ ] Add WebAssembly parser for faster processing
- [ ] Build browser extension (Chrome/Firefox) for quick log analysis
- [ ] Add SSO readiness (SAML/OAuth) for Team tier enterprise conversations
- [ ] Create API documentation site
- [ ] Add changelog page with RSS feed
- [ ] Run $20-30 Twitter/X retargeting campaign targeting DevOps/SRE followers
- [ ] Explore partnerships with incident management tools (PagerDuty, Opsgenie)
- [ ] Consider affiliate program for developer influencers
- [ ] Build public roadmap page (Canny / GitHub Projects alternative)
- [ ] Add internationalization (i18n) framework for future languages
- [ ] Conduct 5 customer interviews for feedback

## Continuous / Ongoing

- [ ] Monitor HN/Reddit mentions and respond
- [ ] Update pricing data and competitor tracking
- [ ] Refresh blog content calendar (1 post per week target)
- [ ] Track key metrics: signups, activations, Pro conversions, churn
- [ ] Review and reduce bundle size / performance budget
- [ ] Security audit of client-side code
- [ ] Keep DECISIONS.md and IDENTITY.md updated as strategy evolves
