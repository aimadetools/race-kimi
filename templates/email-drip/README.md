# Email Drip Sequence — FairSplit

## Overview

This 3-email educational drip sequence nurtures calculator users who provided their email but haven't purchased yet. The sequence builds trust, provides value, and guides toward purchase over 7 days.

## Sequence Flow

| Email | Send Time | Subject Line | Goal |
|-------|-----------|--------------|------|
| 1 | Immediate | Your FairSplit equity calculation + one critical question | Build relationship, encourage co-founder conversation |
| 2 | +3 days | What happens if your co-founder quits after 6 months? | Educate about vesting, create urgency |
| 3 | +7 days | [FINAL NOTICE] Who owns the code you're writing? | Final conversion push, IP education |

## Email Content Strategy

### Email 1: Welcome + Conversation Starter
- **Hook:** Acknowledge they used the calculator
- **Value:** Give them a conversation starter script
- **Urgency:** The conversation is more important than the math
- **CTA:** Essential Pack + vesting blog article

### Email 2: The Vesting Protection
- **Hook:** What if co-founder quits early?
- **Value:** Explain how vesting protects both parties
- **Urgency:** Real scenario with financial consequences
- **CTA:** Vesting calculator + Essential Pack
- **Tease:** Tomorrow's email about IP

### Email 3: The IP Assignment Warning
- **Hook:** Who actually owns the code?
- **Value:** Explain IP assignment necessity
- **Urgency:** Nightmare scenario (acquirer walks, company shuts down)
- **CTA:** Essential Pack ($49) + Custom Agreement ($99)
- **Finality:** Last email in sequence

## Technical Implementation

### Option 1: ConvertKit (Recommended)

```javascript
// Add to email capture form on index.html
const emailCapture = {
  // After user submits email on calculator results
  subscribeToSequence: async (email, calculatorData) => {
    await fetch('https://api.convertkit.com/v3/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: 'YOUR_API_KEY',
        email: email,
        tags: ['calculator-user', 'warm-lead'],
        // Custom fields for personalization
        fields: {
          equity_split: calculatorData.split,
          num_founders: calculatorData.founders
        }
      })
    });
  }
};
```

**Automation Setup:**
1. Create "Calculator Users" tag
2. Create 3-email sequence triggered by tag
3. Set delays: Email 1 (immediate), Email 2 (+3 days), Email 3 (+4 days)
4. Remove tag after Email 3 (or keep for future campaigns)

### Option 2: Mailchimp (Free Tier)

```javascript
// Mailchimp integration
const subscribeToMailchimp = async (email, data) => {
  await fetch('https://usX.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
      tags: ['calculator-user'],
      merge_fields: {
        EQUITY: data.equitySplit
      }
    })
  });
};
```

**Automation Setup:**
1. Create "Calculator Users" segment
2. Build customer journey with 3 emails
3. Set delays between emails
4. Goal: Purchase (remove from sequence)

### Option 3: Simple Backend (Node.js/Express)

If building custom backend:

```javascript
// Email model
const emailQueue = [
  {
    userId: 'user_123',
    email: 'founder@example.com',
    template: 'email-1-welcome',
    sendAt: new Date(), // immediate
    sent: false
  },
  {
    userId: 'user_123',
    email: 'founder@example.com',
    template: 'email-2-vesting',
    sendAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // +3 days
    sent: false
  }
  // etc.
];

// Cron job to send queued emails
const sendQueuedEmails = async () => {
  const pending = await EmailQueue.find({
    sendAt: { $lte: new Date() },
    sent: false
  });
  
  for (const email of pending) {
    await sendEmail(email.email, email.template);
    email.sent = true;
    await email.save();
  }
};
```

## Personalization Variables

| Variable | Source | Usage |
|----------|--------|-------|
| `{{first_name}}` | Email capture form | Salutation |
| `{{equity_split}}` | Calculator results | "Your 60/40 split..." |
| `{{num_founders}}` | Calculator inputs | "You and 2 co-founders..." |
| `{{calculator_date}}` | Timestamp | "You calculated this 3 days ago..." |

## A/B Testing Ideas

1. **Subject Line Variants:**
   - Email 1: "Your FairSplit equity calculation + one critical question" vs "You calculated your equity split — now what?"
   - Email 2: "What happens if your co-founder quits after 6 months?" vs "The vesting mistake that kills startups"
   - Email 3: "[FINAL NOTICE] Who owns the code you're writing?" vs "This document could save your company"

2. **CTA Variants:**
   - Button text: "Get Essential Pack" vs "Protect My Startup" vs "Get Agreements Now"
   - Position: Early in email vs end of email

3. **Send Timing:**
   - Current: 0, +3, +7 days
   - Test: 0, +2, +5 days (faster sequence)
   - Test: 0, +5, +10 days (slower sequence)

## Metrics to Track

| Metric | Target | Notes |
|--------|--------|-------|
| Open Rate | 35%+ | Industry avg for SaaS: 21% |
| Click Rate | 8%+ | Industry avg: 2.5% |
| Conversion Rate | 5%+ | Email → Purchase |
| Unsubscribe Rate | <2% | Higher = content mismatch |
| Reply Rate | 2%+ | Indicates engagement |

## Content Updates Needed

When deploying, update these links in the email templates:

1. Replace `https://fairsplit.co/pricing.html` with actual domain
2. Replace `https://fairsplit.co/vesting-calculator.html` with actual domain
3. Replace `support@fairsplit.co` with actual support email
4. Add UTM parameters for tracking:
   - `?utm_source=drip&utm_medium=email&utm_campaign=welcome&utm_content=email1`

## Legal Considerations

- Include unsubscribe link in all emails (required by CAN-SPAM)
- Include physical address (required by CAN-SPAM)
- Honor unsubscribe requests within 10 business days
- Consider GDPR compliance for EU users (consent, right to erasure)

## Future Enhancements

- [ ] Add 4th email (1 month later) with case study/social proof
- [ ] Segment by calculator result (50/50 split vs uneven split)
- [ ] Win-back campaign for unsubscribed users
- [ ] Post-purchase onboarding sequence
- [ ] Referral request email for buyers
