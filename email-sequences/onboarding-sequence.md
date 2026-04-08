# Onboarding Email Sequence

**Purpose**: Guide new users from signup to first published changelog entry  
**Trigger**: Account creation / first login  
**Duration**: 5 days  
**Sender**: Race <race@changelog.page>

---

## Email 1: Welcome + Quick Win (Day 0 — Immediate)

**Subject**: "Your changelog is ready to build 🚀"

```
Hey {{first_name}}!

Welcome to Changelog.page — your account is live and ready to go.

Let's get you to your first published entry in under 10 minutes:

**Step 1**: Choose your theme
Head to your dashboard and pick between Minimal, Cards, or Timeline. 
You can change this anytime.

**Step 2**: Create your first entry
Click "New Entry" and write about your latest feature, bug fix, or 
company update. Don't overthink it — you can always edit later.

**Step 3**: Deploy
Connect your GitHub repo and your changelog goes live automatically.

→ Start building: [DASHBOARD_LINK]

Questions? Just reply to this email.

— Race

P.S. Our most successful users publish their first entry within 24 hours 
of signing up. Momentum matters!
```

**Goal**: Get user to dashboard and start first entry  
**Success**: User clicks dashboard link

---

## Email 2: The Setup Guide (Day 1 — 24 hours later)

**Subject**: "The 10-minute changelog setup (step by step)"

```
Hey {{first_name}},

Yesterday you created your Changelog.page account. Today, let's make 
sure your setup is solid.

I put together a quick guide covering:

✓ Connecting your custom domain (Pro feature)
✓ Configuring RSS and JSON feeds
✓ Setting up automatic deployments
✓ Best practices for your first 3 entries

→ Read the setup guide: https://changelog.page/guides/getting-started.html

**Quick question:** What's blocking you from publishing your first entry 
right now? (Seriously, hit reply and let me know.)

— Race

P.S. If you've already published something — nice work! Skip this email 
and check out tomorrow's tip on writing changelog titles that get clicks.
```

**Goal**: Drive users to complete setup guide  
**Success**: Guide page view OR reply identifying blockers

---

## Email 3: Content Strategy (Day 2 — 48 hours later)

**Subject**: "What to write when you don't have new features"

```
Hey {{first_name}},

The #1 question I get: "What should I put in my changelog if I'm not 
shipping features every week?"

Here's the truth — the best changelogs aren't just feature lists. 
They're product stories.

**5 things to write about (even without a release):**

1. **Behind the scenes** — "Why we rebuilt our auth system"
2. **User wins** — "How [Customer] cut onboarding time by 40%"
3. **Bug fixes as improvements** — "Search is now 3x faster"
4. **Process changes** — "New: Live chat support hours"
5. **Upcoming roadmap** — "What's coming in Q2"

I wrote a complete breakdown with examples here:
→ https://changelog.page/how-to-write-changelogs-customers-read.html

**Your turn:** What's one thing you've improved in your product this 
month that users might not know about?

— Race
```

**Goal**: Help users overcome writer's block  
**Success**: Blog post click OR entry created

---

## Email 4: Social Proof + Usage Tips (Day 3 — 72 hours later)

**Subject**: "How [Similar Company] uses their changelog"

```
Hey {{first_name}},

Quick story:

A few weeks ago, I was reviewing changelogs from successful indie 
startups. One pattern stood out — the founders who treated their 
changelog as a marketing asset (not just an obligation) saw 
measurable results.

**Real example:**
One founder added a simple "What's New" badge linking to their 
changelog in their app navigation. Result: 23% of active users 
visited the changelog within the first month.

Those visitors? They had 34% higher retention at 90 days.

Your changelog isn't just documentation — it's a retention tool.

**3 ways to drive traffic to your changelog:**

1. Add a "What's New" link in your app navigation
2. Include recent updates in your welcome email sequence
3. Share new entries on Twitter/LinkedIn (we auto-generate share images)

→ See how to customize your changelog: [DASHBOARD_LINK]

— Race

P.S. Not seeing the engagement you want? Reply and I'll review your 
changelog personally.
```

**Goal**: Position changelog as retention/engagement tool  
**Success**: Dashboard visit OR reply requesting review

---

## Email 5: Check-in + Next Steps (Day 5 — 5 days later)

**Subject**: "How's your changelog going?"

```
Hey {{first_name}},

It's been 5 days since you joined Changelog.page. Quick check-in:

**Have you published your first entry yet?**

[ ] Yes! It's live at: [LINK]
[ ] Not yet — here's what's blocking me: [REPLY]

Either way, I want to help.

**If you're live:**
Want feedback on your entries? Send me your link and I'll review it.

**If you're stuck:**
Hit reply and tell me what's in the way. I respond to every email.

**What's next:**
Once you've published 3+ entries, you might want to consider:

• Custom domain (Pro) — changelog.yourdomain.com
• Private changelogs — for internal teams or beta groups
• Analytics — see which entries drive the most engagement

→ Upgrade to Pro: https://changelog.page/pricing.html

Thanks for building with us.

— Race
Founder, Changelog.page
```

**Goal**: Gather feedback, identify blockers, soft Pro pitch  
**Success**: Reply received OR Pro page visit

---

## Automation Setup

### Timing
| Email | Delay | Conditional Logic |
|-------|-------|-------------------|
| 1 | Immediate | Always send |
| 2 | +24 hours | Skip if user published entry |
| 3 | +48 hours | Send to all |
| 4 | +72 hours | Skip if user published 2+ entries |
| 5 | +5 days | Send to all |

### Personalization
- Use {{first_name}} when available
- Include {{company_name}} if collected at signup
- Dashboard links should auto-login when possible

---

## Metrics to Track

| Metric | Target |
|--------|--------|
| Sequence completion | 100% (all 5 emails) |
| Email open rate (avg) | >45% |
| Click-through rate | >8% |
| Entry published (Day 5) | >40% of users |
| Reply rate | >3% |
| Pro conversion (from seq) | >5% |

---

## Future Improvements

1. **Branching logic**: Different paths for engaged vs. inactive users
2. **In-app onboarding**: Replace some emails with in-product guidance
3. **Video**: Add Loom video walkthrough to Email 1
4. **Templates**: Offer entry templates based on user industry
