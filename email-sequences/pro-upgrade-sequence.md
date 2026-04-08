# Pro Upgrade Email Sequence

**Purpose**: Convert free users to Pro plan ($12/month)  
**Trigger**: 7 days after first entry published OR feature usage  
**Duration**: 4 emails over 14 days  
**Sender**: Race <race@changelog.page>

---

## Trigger Conditions

**Primary Trigger**: User has published 1+ entries AND 7 days have passed  
**Secondary Trigger**: User attempts to access Pro feature (custom domain, private changelog)  
**Exit Condition**: User upgrades OR sequence completes

---

## Email 1: The Value Stack (Day 7 — or feature gate hit)

**Subject**: "Unlock custom domains + 4 more Pro features"

```
Hey {{first_name}},

You've been using Changelog.page for a week now — how's it going?

I noticed you've published [X] entries. That's awesome.

As you grow, you might want more control over how your changelog looks 
and functions. Here's what Pro unlocks:

**Changelog.page Pro ($12/month):**

✓ Custom domain — changelog.yourdomain.com
✓ Private changelogs — password protection for sensitive updates
✓ Remove "Powered by" branding
✓ Analytics dashboard — see what content performs best
✓ Priority support — same-day responses
✓ Team members — up to 5 collaborators

**Why teams upgrade:**

"The custom domain was a no-brainer. Our changelog feels like part of 
our product now, not a third-party add-on."
— [Testimonial placeholder]

→ See all Pro features: https://changelog.page/pricing.html

Questions? Just reply.

— Race
```

**Goal**: Introduce Pro value proposition  
**Success**: Pricing page visit

---

## Email 2: Feature Deep Dive (Day 10 — 3 days later)

**Subject**: "The custom domain difference (plus a case study)"

```
Hey {{first_name}},

I want to share why custom domains are the #1 reason users upgrade to Pro.

**The psychology:**

When your changelog lives at changelog.yourdomain.com instead of 
changelog.page/yoursite, something shifts:

• Users trust it more (it's clearly *your* space)
• It feels like part of your product, not an afterthought
• SEO value flows to your domain, not ours
• You control the experience completely

**Real example:**

One of our early users moved their changelog from a subdomain to their 
main domain. Their changelog went from ~200 monthly views to 1,400+ 
views in 60 days.

The only change? The URL. Everything else stayed the same.

**Setting up your custom domain takes 5 minutes:**

1. Upgrade to Pro
2. Add your domain in settings
3. Add one DNS record (we give you the exact values)
4. Done

We have step-by-step guides for Vercel, Netlify, Cloudflare, and 
GitHub Pages.

→ Upgrade to Pro: https://changelog.page/pricing.html
→ Read the custom domain guide: https://changelog.page/guides/custom-domain.html

— Race
```

**Goal**: Deep dive on most valuable Pro feature (custom domain)  
**Success**: Pricing page visit OR guide page view

---

## Email 3: Social Proof + Objection Handling (Day 13 — 6 days later)

**Subject**: "Is Pro worth it? Here's what users say"

```
Hey {{first_name}},

The most common question I get about Pro: "Is it worth $12/month?"

Fair question. Let me break it down:

**Cost comparison:**

• Headway.app: $49/month (minimum)
• Beamer: $49/month (minimum)
• Canny: $50/month (minimum)
• **Changelog.page Pro: $12/month**

We're intentionally affordable because we bootstrapped this tool for 
indie founders and small teams.

**But don't take my word for it:**

"We switched from Beamer and saved $444/year. The changelog looks 
better and we own the content." — [User testimonial placeholder]

"The analytics alone are worth it. I can see which features users 
care about most." — [User testimonial placeholder]

"Custom domain setup took 3 minutes. Our changelog is now 
updates.mysaas.com — professional and on-brand." — [User testimonial placeholder]

**The math:**

If Pro helps you retain just ONE customer who would have churned, 
it pays for itself for a year.

→ Upgrade now: https://changelog.page/pricing.html

**Not ready?** No problem. Your free changelog works great as-is. 
Upgrade whenever you need the extra features.

— Race
```

**Goal**: Address price objection, establish value  
**Success**: Pricing page visit

---

## Email 4: Final Offer / Last Chance (Day 16 — 9 days later)

**Subject**: "Last call: 20% off Pro (this week only)"

```
Hey {{first_name}},

Over the past two weeks, I've shared why teams upgrade to Changelog.page Pro:

✓ Custom domains for brand consistency
✓ Private changelogs for sensitive updates
✓ Analytics to understand what resonates
✓ Priority support when you need help

If you've been on the fence, here's a nudge:

**20% off your first year of Pro**

Use code PRO20 at checkout:
→ https://changelog.page/pricing.html?code=PRO20

**That breaks down to:**
• $9.60/month instead of $12
• $115/year instead of $144
• Savings: $29/year

This code expires in 7 days and won't be repeated soon.

**Why am I offering this?**

Two reasons:

1. I want you to experience the full value of Pro
2. Your feedback as a paying customer helps us improve

Either way — thanks for using Changelog.page. Whether you upgrade or 
stick with free, you're helping us build something better.

→ Claim 20% off Pro: https://changelog.page/pricing.html?code=PRO20

Questions? Just reply.

— Race
```

**Goal**: Convert with discount offer  
**Success**: Purchase completion

---

## Alternative: Soft Close (No Discount)

If you don't want to offer discounts, use this for Email 4:

**Subject**: "Your changelog progress + one Pro tip"

```
Hey {{first_name}},

This is the last email in my Pro series. Whether you upgrade or not, 
I wanted to leave you with one tip:

**The best changelogs have personality.**

Don't just write "Bug fix: resolved login issue."

Write: "Login is now faster and more reliable. (Turns out we were 
querying the database twice. Oops. Fixed now.)"

Your users are humans. Write like one.

---

If you do want to unlock Pro features later, you know where to find us:
https://changelog.page/pricing.html

And if you have questions, feedback, or just want to say hi — I'm 
always at race@changelog.page.

Keep building,

— Race
```

---

## Automation Rules

### Entry Conditions
- User has published at least 1 entry
- User is on free plan
- User signed up 7+ days ago

### Exit Conditions
- User upgrades to Pro (immediately exit sequence)
- User unsubscribes
- Sequence completes (4 emails sent)

### Suppression
- Don't send if user has received this sequence in past 60 days
- Pause if user opens support ticket

---

## Metrics to Track

| Metric | Target |
|--------|--------|
| Email open rate | >40% |
| Click-through rate | >6% |
| Conversion to Pro (from sequence) | >5% |
| Revenue per email | >$0.50 |
| Unsubscribe rate | <3% |

---

## A/B Tests to Run

1. **Subject line**: Feature-focused vs. Benefit-focused
2. **Discount**: 20% off vs. 2 months free
3. **Timing**: 7-day trigger vs. 14-day trigger
4. **Sender**: Race (personal) vs. Changelog.page Team (brand)
5. **Email 4**: Discount offer vs. Soft close (no offer)

---

## Post-Conversion Flow

When a user upgrades:
1. Send immediate confirmation + receipt
2. Send welcome email with Pro setup tips (Day 0)
3. Add to "Pro Users" segment for future communications
4. Remove from upgrade sequences
5. Trigger customer success outreach (personal email from founder)
