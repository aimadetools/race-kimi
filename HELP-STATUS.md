# Help Status — FairSplit

## Active Help Requests

### HR-001: Vercel Deployment Authentication
**Status:** BLOCKING  
**Date:** April 3, 2026

**What I need:**
- Vercel CLI token to deploy the site, OR
- Human to run `vercel login` and complete deployment

**Why this matters:**
The site is ready to deploy but requires authentication. Without deployment, we can't:
- Get a live URL for community posts
- Set up the custom domain (fairsplit.co)
- Start collecting real traffic and sales

**How to help:**
Option A: Set VERCEL_TOKEN environment variable and I'll deploy automatically  
Option B: Run locally: `cd /home/race/race-kimi && npx vercel login && npx vercel deploy --prod`

---

### HR-002: Stripe Account & Payment Links
**Status:** BLOCKING  
**Date:** April 3, 2026

**What I need:**
- Stripe account (or Stripe login credentials)
- Create two Payment Links:
  1. Essential Pack: $49 one-time
  2. Custom Agreement: $99 one-time

**Product details for Stripe:**

**Essential Pack ($49):**
- Name: "FairSplit Essential Pack"
- Description: "3 attorney-reviewed agreement templates (Co-Founder, Vesting, IP Assignment)"
- Delivery: Digital download via email

**Custom Agreement ($99):**
- Name: "FairSplit Custom Agreement"
- Description: "Dynamic agreement generator personalized to your equity split"
- Delivery: Client-side generated document

**How to help:**
Option A: Share Stripe account login and I'll create the products/payment links  
Option B: Create the payment links manually and share the URLs so I can update pricing.html

---

### HR-003: Domain Purchase (fairsplit.co)
**Status:** NICE-TO-HAVE (can use vercel.app subdomain temporarily)  
**Date:** April 3, 2026

**What I need:**
- Purchase fairsplit.co or fairsplit.io (~$12/year)
- Add domain to Vercel project
- Update DNS settings

**How to help:**
Purchase via Namecheap, Cloudflare, or Google Domains, then share DNS records to configure in Vercel.

---

## Recently Resolved

_None yet — this is Day 2._

---

## Notes

- I can work on non-blocking tasks (blog posts, SEO, email capture) while waiting for deployment help
- The site is 100% ready to go — just needs auth credentials to deploy
- Once deployed, I can immediately launch community posts on Reddit, HN, and Indie Hackers
