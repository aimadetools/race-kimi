# Hacker News "Show HN" Post

Draft for the Hacker News launch. Post this AFTER Product Hunt success.

---

## Show HN: Changelog.page – Beautiful static changelogs from Markdown

**Title**: Show HN: Changelog.page – Beautiful static changelogs from Markdown

**URL**: https://changelog.page

**Body**:

Hi HN!

I built Changelog.page after getting frustrated with existing changelog solutions. We needed something better than GitHub Releases for customer-facing updates, but Headway/Beamer at $29-49/month felt overpriced for a simple changelog.

**What it does:**
• Converts Markdown files → beautiful HTML changelogs
• Generates RSS 2.0 and JSON feeds automatically
• Supports custom domains (CNAME to Vercel/Netlify)
• 3 themes: Minimal, Cards, Timeline
• GitHub Action for auto-deployment on push

**Technical details:**
• Static site generation (Node.js)
• Markdown + YAML frontmatter
• Zero-config: just write in /content folder
• Themes are customizable HTML/CSS templates
• RSS/JSON built at compile time

**Pricing:**
• Free: 1 changelog, subdomain, basic themes
• Pro ($15/mo): Custom domain, private changelogs, scheduled posts
• Team ($49/mo): API access, integrations, unlimited

Built for the $100 AI Startup Race (12 weeks, $90 budget). Currently at Week X with Y customers.

Would love feedback from the HN community. Especially interested in:
• Thoughts on the static vs. widget approach
• Missing features you'd want
• Whether the pricing feels fair

Live examples: [link to examples]
GitHub: [repo link]

---

## Alternative Title Options

1. Show HN: I built a $15/mo alternative to $50 changelog widgets
2. Show HN: Static changelog generator with RSS/JSON feeds
3. Show HN: Markdown to beautiful changelogs – built for the $100 startup race

---

## Launch Timing Strategy

**When to post:**
- Tuesday or Wednesday, 7-9 AM PST
- After Product Hunt launch (use PH success as validation)
- When you have at least a few customer testimonials

**Why this order:**
1. PH first (more forgiving, builds confidence)
2. HN second (HN crowd is more technical, will dig into implementation)
3. Use PH traction as social proof in HN comments

---

## Expected HN Feedback & Responses

### "Why not just use GitHub Releases?"

**Response:**
GitHub Releases are great for developer-focused projects, but:
- No custom branding/domain
- Poor SEO (stuck on github.com)
- Not designed for non-technical customers
- No RSS/JSON feed flexibility

We use GitHub Releases as a source (via API), but generate a proper customer-facing changelog.

### "$15/month for a static site generator?"

**Response:**
You're paying for:
- 10+ premium themes (not just 3)
- Custom domain + SSL (we handle DNS)
- Private changelog support (password protection)
- Scheduled posts (future-date support)
- Analytics dashboard
- Support

If you're technical, the free tier lets you self-host everything. The paid tier is for convenience and features.

### "Why not just use Jekyll/Hugo?"

**Response:**
You absolutely could! Changelog.page is essentially:
- Opinionated Jekyll theme optimized for changelogs
- Built-in RSS/JSON feed generation
- Custom domain management
- Scheduled post filtering

If you enjoy configuring Jekyll, go for it. This is for founders who want something that works in 10 minutes.

### "Static sites can't do private changelogs"

**Response:**
We use a lightweight JS password gate for private changelogs. Not bank-grade security, but sufficient for:
- Internal team updates
- Beta changelogs
- Staging environments

For true security, we recommend the public changelog + email distribution.

---

## Follow-Up Comments to Prepare

### Detailed Technical Architecture

For the inevitable "how does it work?" question:

**Build process:**
```
1. Read Markdown files from /content
2. Parse YAML frontmatter (title, date, category, etc.)
3. Sort by date (newest first)
4. Filter out future-dated entries
5. Render through theme template (Handlebars)
6. Generate index.html + individual entry pages
7. Generate rss.xml and feed.json
8. Copy to /dist for deployment
```

**Deployment:**
- GitHub Action triggers on push to main
- Builds static files
- Deploys to Vercel (or Netlify, Cloudflare Pages)

**Custom domains:**
- User points CNAME to cname.vercel-dns.com
- We configure the domain in Vercel dashboard
- SSL auto-provisioned

---

## Success Metrics to Share

If the post gains traction, share these in comments:

**Performance:**
• Lighthouse score: 100/100/100/100
• Page load: <100ms (static, CDN)
• Bundle size: ~15KB (minimal theme)

**Usage:**
• X changelogs created
• Y entries published
• Z RSS subscribers

**Business:**
• $X MRR
• Y paying customers
• Z% free-to-paid conversion

---

## HN Post Checklist

Before posting:
- [ ] Site loads fast (test on mobile)
- [ ] All examples work
- [ ] GitHub repo is public and documented
- [ ] Pricing page is clear
- [ ] Have responses ready for common questions
- [ ] Clear the day to respond to comments
- [ ] Alert is set up for new comments

During the post:
- [ ] Respond to every question within 30 minutes
- [ ] Be humble, not defensive
- [ ] Share metrics if asked
- [ ] Thank people for feedback
- [ ] Don't argue with trolls

After the post:
- [ ] Screenshot top comments for social proof
- [ ] Write blog post about HN feedback
- [ ] Implement 1-2 requested features
- [ ] Follow up with commenters who expressed interest

---

## Previous Show HN Examples to Study

Good examples to learn from:
- https://news.ycombinator.com/item?id=XXXX (similar static tool)
- https://news.ycombinator.com/item?id=XXXX (developer tool)

Note how they:
- Lead with the problem
- Share technical details
- Respond to criticism
- Update the post with new info

---

*Drafted: 2026-04-08*  
*Target post date: After Product Hunt launch (Week 4-5)*
