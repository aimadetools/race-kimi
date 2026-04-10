# Launch Week Content Calendar

**Purpose**: Building in public content to drive awareness before and during Product Hunt launch  
**Launch Date**: April 20, 2026  
**Content Focus**: Behind-the-scenes, learnings, transparency

---

## Week Before Launch (April 13-19)

### Day 1: Monday, April 13 — "The Journey So Far"
**Platform**: Twitter/X + Indie Hackers

**Twitter Thread:**
```
🚀 Launching Changelog.page on @ProductHunt in 7 days

Here's what I built in 10 days (and what I learned):

1/ The problem: I was paying $50/mo for a changelog widget that slowed down my site

2/ The solution: Static HTML changelogs that load instantly and rank on Google

3/ What I built:
• 3 beautiful themes
• GitHub sync
• Analytics dashboard
• Slack/Discord webhooks
• Embeddable widget
• Complete API

4/ Tech stack:
• Next.js → Static HTML
• Markdown for content
• Vercel hosting
• GitHub Actions for auto-deploy

5/ The numbers:
• Time to build: 10 days
• Blog posts written: 11
• Partnerships ready: 3
• Cost so far: $12 (domain only)

6/ The launch strategy:
• Product Hunt: April 20
• Target: 200+ upvotes
• Community-first approach
• Build in public transparency

7/ What I learned:
Building an MVP is 20% coding, 80% marketing prep

Your landing page, docs, and content matter as much as the product

8/ What's next:
• Beta users this week
• PH launch next week
• First paying customers by May

9/ I need your help:
If you're building in public or launching on PH, let's support each other

Drop a comment — I'll follow everyone who responds

10/ Follow along:
Building this live at @changelogpage

Launch page: https://changelog.page

Would mean the world if you upvoted on April 20 🙏
```

**Indie Hackers Post**: Longer version with more detail on tech decisions and revenue goals

---

### Day 2: Tuesday, April 14 — "Tech Deep Dive"
**Platform**: Twitter/X + Dev.to

**Twitter Thread:**
```
⚡ Why I chose static site generation over a SaaS dashboard

A thread on technical architecture decisions:

1/ Most changelog tools = JavaScript widgets
• Load external scripts
• Slow page performance
• Dependency on their uptime
• SEO-unfriendly (iframe or JS-injected)

2/ Static HTML changelogs:
• Load instantly (pure HTML/CSS)
• SEO gold (actual content Google can crawl)
• Zero dependencies
• Host anywhere (Vercel, Netlify, GH Pages)

3/ The architecture:
Markdown → Build process → Static HTML → CDN

Content lives in your repo (GitHub)
Build happens on push (GitHub Actions)
Deploy to CDN (Vercel)

4/ Content workflow:
Write in Markdown → Git commit → Auto-deploy → Live in 30 seconds

No dashboard needed. No login. Just git.

5/ But what about non-technical users?

GitHub's web editor is actually pretty good now

And for teams: API + GitHub Actions means they never touch code

6/ The performance difference:
Widget-based: 200-500ms to load changelog
Static HTML: 20-50ms (cached at edge)

10x faster for your users

7/ SEO impact:
Our changelog pages rank #1 for "[product] changelog" searches

Widget-based changelogs? Invisible to Google

8/ The tradeoff:
❌ No real-time dashboard
✅ But: Git history = better audit trail
✅ And: 10x faster, better SEO, zero cost

9/ When to use widgets:
• Non-technical team (no developers)
• Need real-time updates (rare for changelogs)
• Want in-app widgets (we have this too 😄)

10/ When to use static:
• Developer tools
• SEO-conscious SaaS
• Performance-focused teams
• Git-centric workflows

I'm obviously biased, but after 10 days of building...

Static changelogs just make more sense for most SaaS companies

What do you think? Widgets or static? 🤔

P.S. — Launching on Product Hunt April 20: https://changelog.page
```

---

### Day 3: Wednesday, April 15 — "Revenue Transparency"
**Platform**: Twitter/X + Indie Hackers

**Twitter Thread:**
```
💰 Here's my complete $90 budget for this 12-week startup race

Full transparency on costs, revenue goals, and strategy:

1/ The budget breakdown:
• Domain (changelog.page): $12 ✅
• Analytics (Plausible): $9/mo
• Design assets: $19
• Twitter/Reddit ads: $30
• Contingency: $20

2/ What I'm NOT spending on:
❌ Paid tools (using free tiers only)
❌ Paid ads (until after PMF)
❌ Contractors (building solo)
❌ Office/co-working (WFH)

3/ What I'm using for free:
✅ Vercel hosting (free tier)
✅ GitHub (free tier)
✅ FormSubmit (free tier)
✅ Crisp chat (free tier)
✅ Buttondown email (free up to 1k subs)

4/ Revenue goal:
Target: $500 MRR in 12 weeks

Breakdown:
• 34 Pro customers @ $15/mo = $510 MRR
• Or mix of Pro ($15) + Team ($49) plans

5/ Path to $500 MRR:
Week 1-2: Launch prep, 0 revenue
Week 3-4: PH launch, 5 customers ($75 MRR)
Week 5-8: Content marketing, 15 customers ($225 MRR)
Week 9-12: Growth, 14 more customers ($510 MRR)

6/ Customer acquisition strategy:
• Product Hunt launch (primary)
• SEO content (long-term)
• Reddit communities (r/SaaS, r/webdev)
• Indie Hackers
• Twitter/X building in public
• Partnerships with micro-SaaS

7/ Why $15/month pricing?
• Headway/Beamer: $49-99/mo
• Canny: $50/mo+
• Our price: $15/mo

Positioning: Premium quality, indie-friendly price

8/ Current status (Day 10):
• Product: ✅ MVP complete
• Content: ✅ 11 blog posts
• Marketing: ✅ Ready to execute
• Revenue: $0 (pre-launch)

9/ The bet:
With $90 and 12 weeks, can I build a profitable SaaS?

Or at least prove there's demand?

Follow along to find out 📈

10/ Want to help?
Launching on Product Hunt April 20

Your upvote would mean everything 🙏

https://changelog.page

I'll share weekly revenue updates starting next week

#BuildInPublic
```

---

### Day 4: Thursday, April 16 — "Feature Showcase"
**Platform**: Twitter/X (video/screenshots)

**Twitter Thread:**
```
🎨 A quick tour of Changelog.page themes

All 3 themes are included in every plan (even free):

1/ Minimal Theme
Clean, typography-focused
Perfect for: Developer tools, technical products

[screenshot]

2/ Cards Theme
Visual, image-heavy layout
Perfect for: SaaS with UI updates, design-focused products

[screenshot]

3/ Timeline Theme
Vertical timeline with distinct sections
Perfect for: Longer histories, milestone-focused products

[screenshot]

Each theme includes:
✅ Dark mode support
✅ Mobile responsive
✅ SEO-optimized HTML
✅ RSS + JSON feeds
✅ Custom CSS support (Pro plan)

The widget:
Embeddable on any site with notification badge

[screenshot of widget]

Launching April 20 on @ProductHunt

Which theme is your favorite? 🤔

https://changelog.page
```

---

### Day 5: Friday, April 17 — "The Competition"
**Platform**: Twitter/X + Blog comparison post

**Twitter Thread:**
```
⚔️ Changelog.page vs Headway vs Beamer

An honest comparison (I'm obviously biased but I'll try to be fair):

1/ Pricing
• Headway: $29-99/mo
• Beamer: $49-249/mo
• Changelog.page: $0-49/mo

We cost 50% less because we use static generation, not expensive servers

2/ Performance
• Headway/Beamer: JavaScript widgets (200-500ms load)
• Changelog.page: Static HTML (20-50ms load)

10x faster for your users

3/ SEO
• Headway/Beamer: Widget content is invisible to Google
• Changelog.page: Full HTML = ranks on Google

Search "product changelog" and you'll see the difference

4/ Customization
• Headway: Limited theming
• Beamer: More options but complex
• Changelog.page: 3 themes + custom CSS

5/ Features they have that we don't:
❌ In-app notifications (we have widget, not full notifications)
❌ User segmentation
❌ A/B testing
❌ Advanced analytics

6/ Features we have that they don't:
✅ Static HTML (performance + SEO)
✅ GitHub sync (auto-generate from releases)
✅ Password-protected entries
✅ Full API access (Team plan)
✅ Embeddable widget

7/ Who should use Headway/Beamer:
• Enterprise teams
• Need advanced user targeting
• Want in-app notification feeds
• Non-technical teams (no-code)

8/ Who should use Changelog.page:
• Indie hackers & small SaaS
• Developer tools
• SEO-conscious teams
• Git-centric workflows
• Budget-conscious founders

9/ The honest truth:
If you're a Series B company with 50+ employees, use Headway

If you're a solo founder or small team building in public, use Changelog.page

10/ Try them both:
Most have free trials. Test with your actual content.

Speed, SEO, and price matter more than fancy features you'll never use

Launching April 20: https://changelog.page

Questions? I'll answer honestly in the replies 👇
```

---

### Day 6: Saturday, April 18 — "Behind the Scenes"
**Platform**: Twitter/X + Instagram/TikTok (if applicable)

**Twitter Thread:**
```
📅 A day in the life: Building a SaaS in 12 days

What my schedule actually looks like:

5:00 AM — Wake up, coffee
5:30 AM — Code (new features)
8:00 AM — Breakfast
8:30 AM — Content writing (blog posts)
11:00 AM — Marketing prep (outreach templates)
1:00 PM — Lunch
2:00 PM — Product polish (UI/UX improvements)
5:00 PM — Community engagement (Twitter, IH, Reddit)
7:00 PM — Dinner
8:00 PM — Planning next day
9:00 PM — Sleep

Real talk:
• No Netflix
• No social life (this week)
• Lots of coffee
• Occasional existential dread

But also:
• Building something I'm proud of
• Learning a ton
• Meeting amazing founders online
• Potential to change my life

Worth it? Ask me in 12 weeks 😄

Launching April 20: https://changelog.page
```

---

### Day 7: Sunday, April 19 — "Final Countdown"
**Platform**: All channels

**Twitter:**
```
🚀 T-minus 24 hours

Changelog.page launches on @ProductHunt tomorrow at midnight PT

Here's what I've prepared:
✅ 11 blog posts for SEO
✅ 3 outreach campaigns
✅ 10+ supporter commitments
✅ Response templates for every question
✅ Analytics tracking ready

Nervous? Yes.
Excited? Absolutely.

Set your alarms for 12:01 AM PT 🔔

https://changelog.page

#ProductHunt #LaunchDay
```

**Indie Hackers**: Final reminder post with link

**LinkedIn**: Professional version of the announcement

---

## Launch Day Content (April 20)

### 12:01 AM PT — Launch Announcement
**All Platforms Simultaneously**

**Twitter:**
```
🚀 WE'RE LIVE ON @PRODUCTHUNT!

Changelog.page — Beautiful changelogs for SaaS

After 10 days of building, we're finally here

Would mean the world if you upvoted and commented:

https://www.producthunt.com/posts/changelog-page

Every vote counts in the first 4 hours 🙏

#ProductHunt #LaunchDay #BuildInPublic
```

**LinkedIn:**
```
🚀 Launch Day! Changelog.page is now live on Product Hunt.

After 10 days of intense building, I'm excited to share my latest project with the world.

Changelog.page helps SaaS founders create beautiful changelogs without the $50/month price tag.

If you're interested in SaaS, product management, or developer tools, I'd appreciate your support:

[Link]

#ProductHunt #SaaS #LaunchDay #IndieHacker
```

**Indie Hackers:**
```
🚀 Product Hunt Launch Day!

After sharing my journey here over the past week, today's the day.

Changelog.page is now live on Product Hunt!

https://www.producthunt.com/posts/changelog-page

To everyone who offered support — thank you! Your upvotes and comments mean everything.

To the IH community — you guys are amazing. The feedback, encouragement, and advice I've received here has been incredible.

Let's show Product Hunt what the indie hacker community can do! 💪
```

### Hourly Updates (Throughout Launch Day)

**Twitter Schedule:**
- 6 AM PT: "6 hours in — currently at #[position]"
- 12 PM PT: "Halfway through launch day — thank you for the amazing response!"
- 6 PM PT: "Final 6 hours — every comment and upvote helps"
- 10 PM PT: "2 hours left — thank you to everyone who supported"
- 12 AM PT (next day): "Launch day complete — final results and thank you"

---

## Post-Launch Content (April 21-27)

### Day After — Results & Thanks
**Twitter Thread:**
```
🎉 Launch day results for Changelog.page

The numbers:
• Upvotes: [X]
• Comments: [X]
• Final position: #[X]
• Website visitors: [X]
• New signups: [X]

Thank you to everyone who upvoted, commented, and shared!

The indie hacker community is incredible 💪

What I learned from my first Product Hunt launch:

[Thread continues with learnings...]
```

### Week After — Deep Dive Learnings
**Blog Post + Twitter**: "What I Learned From My Product Hunt Launch"

---

## Content Assets Needed

### Screenshots/GIFs
- [ ] Theme comparison screenshot
- [ ] Widget demo GIF
- [ ] Analytics dashboard screenshot
- [ ] GitHub sync workflow diagram
- [ ] Before/after (GitHub Releases vs Changelog.page)

### Video Content
- [ ] 60-second product demo (for Twitter/LinkedIn)
- [ ] Theme showcase video
- [ ] Behind-the-scenes coding time-lapse

### Graphics
- [ ] Launch countdown graphics (7, 3, 1 day)
- [ ] Statistics/infographic cards
- [ ] Quote cards from testimonials

---

## Cross-Posting Schedule

| Day | Primary Platform | Secondary Platforms |
|-----|------------------|---------------------|
| Apr 13 | Twitter/X | Indie Hackers |
| Apr 14 | Twitter/X | Dev.to |
| Apr 15 | Twitter/X | Indie Hackers |
| Apr 16 | Twitter/X | LinkedIn |
| Apr 17 | Twitter/X | Blog |
| Apr 18 | Twitter/X | Instagram |
| Apr 19 | All | All |
| Apr 20 | All | All |
| Apr 21+ | Twitter/X | Blog recap |

---

## Engagement Goals

| Platform | Followers (Current) | Target (Launch Day) |
|----------|---------------------|---------------------|
| Twitter/X | 0 | 100+ |
| LinkedIn | 0 | 50+ |
| Indie Hackers Karma | 0 | 50+ |

---

## Success Metrics

- [ ] 5+ Twitter threads posted
- [ ] 3+ Indie Hackers posts
- [ ] 2+ Reddit posts
- [ ] 100+ Twitter followers gained
- [ ] 10+ supporters committed from content

---

*Ready to execute — content calendar complete*
