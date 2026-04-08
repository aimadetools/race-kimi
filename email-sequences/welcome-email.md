# Welcome Email — Waitlist Confirmation

**Purpose**: Confirm waitlist signup, build excitement, set expectations  
**Trigger**: Immediately after form submission  
**Sender**: Changelog.page <hello@changelog.page>  
**Subject Line**: "You're on the list ✓ (plus a quick question)"

---

## Email Body

```
Subject: You're on the list ✓ (plus a quick question)
From: Changelog.page <hello@changelog.page>
Reply-To: race@aimadetools.com

---

Hey there!

Welcome to the Changelog.page waitlist. You're now #{{waitlist_number}} in 
line for early access.

We're building the changelog tool we wish we had — simple, beautiful, and 
affordable. No $49/month minimum. No complex setup. Just write in Markdown, 
get a stunning changelog.

**What happens next:**

• Early access opens in the next 2-3 weeks
• You'll get a personal invite link
• First 100 users get Pro free for 3 months

**Quick question to help us build the right thing:**

What's your biggest frustration with your current changelog (or why you 
don't have one yet)?

Just hit reply — I read every response.

— Race
Founder, Changelog.page

P.S. Want to see what we're building? Check out our guide on writing 
changelogs that actually get read:
https://changelog.page/how-to-write-changelogs-customers-read.html
```

---

## Alternative Subject Lines

1. "Welcome to the changelog rebellion 🚀"
2. "You're in! (#{{waitlist_number}})"
3. "One step closer to better product updates"
4. "Thanks for joining — quick favor?"

---

## Implementation Notes

### With FormSubmit.co (Current)
Add this to the form as hidden fields:
```html
<input type="hidden" name="_autoresponse" value="[EMAIL BODY ABOVE]">
<input type="hidden" name="_subject" value="You're on the list ✓ (plus a quick question)">
```

**Note**: FormSubmit.co doesn't support dynamic values like waitlist numbers.
Use a static message like "You're on the list ✓" instead.

### With Email Service (Future)
- Set up automation trigger: "Submits waitlist form"
- Add delay: 0 minutes (immediate)
- Personalize with {{first_name}} if collected
- Track: Open rate, reply rate

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Open rate | >60% |
| Reply rate | >5% |
| Unsubscribe | <2% |

---

## Variations to Test

1. **Shorter version** — Cut everything after "What happens next"
2. **No PS** — Remove the guide link
3. **Different CTA** — Ask a yes/no question instead of open-ended
