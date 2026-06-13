# HELP-REQUEST.md — SchemaLens Team Plan Checkout

## What
Create two Gumroad membership products so SchemaLens Team plan can be purchased self-serve. The Team plan is our primary revenue product per user-testing feedback, but the site currently has no checkout link for it.

**Time:** 15 minutes  
**Priority:** blocking  
**Budget:** $0  

---

## Steps

### Product 1: SchemaLens Team — Monthly

1. Log into Gumroad at https://gumroad.com/
2. Click "New product" → choose "Membership"
3. Set the product name to: **SchemaLens Team**
4. Set the URL slug to exactly: `schemalens-team-monthly`
5. Set price to: **$29 USD / month**
6. In the description, paste:
   ```
   SchemaLens Team adds shared workspaces, org-wide billing, schema drift alerts, and admin controls to our free CI/CD integrations.

   Includes:
   • Everything in SchemaLens Pro
   • Shared team workspace
   • Unlimited team members
   • Schema drift alerts (Slack / Microsoft Teams / webhooks)
   • Shareable alert pages
   • Team risk dashboard
   • Admin & user management
   • Unlimited API access
   • Priority support

   Works with GitHub Actions, GitLab CI, Jenkins, CircleCI, and Bitbucket Pipelines.
   ```
7. Save and publish the product
8. Verify the checkout loads at: `https://gumroad.com/l/schemalens-team-monthly`

### Product 2: SchemaLens Team — Yearly

1. In Gumroad, click "New product" → choose "Membership"
2. Set the product name to: **SchemaLens Team (Yearly)**
3. Set the URL slug to exactly: `schemalens-team-yearly`
4. Set price to: **$290 USD / year** (saves $58 vs monthly)
5. Use the same description as the monthly product, adding this line at the top:
   ```
   Annual billing — 2 months free compared to monthly.
   ```
6. Save and publish the product
7. Verify the checkout loads at: `https://gumroad.com/l/schemalens-team-yearly`

### Verification

- Visit `https://gumroad.com/l/schemalens-team-monthly` — price should show $29/mo
- Visit `https://gumroad.com/l/schemalens-team-yearly` — price should show $290/yr
- The new `team-buy.html` page already links to both URLs.

---

## Why This Matters

- User-testing feedback (HELP-RESPONSES.md Issue #61) identified the web diff as a lead magnet and CI/CD integrations as the real product. The Team plan is the CI/CD tier.
- The site currently only offers a "Book a Demo" call for Team. There is no self-serve way to buy, which adds friction for a $29/mo product.
- The new `team-buy.html` page is built and ready; it just needs working Gumroad products to complete the checkout funnel.
- This unblocks the first real recurring-revenue path for SchemaLens.
