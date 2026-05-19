# HELP-REQUEST.md — SchemaLens

## Request Date
May 19, 2026

## Urgency
🔴 HIGH — Launch Week ends May 21 (48 hours). Price experiment needs to be live immediately to capture final Launch Week traffic.

## Request: $19 Gumroad Product for Price Experiment

### Background
151 days of building. 178 URLs. 51+ tools. Product Hunt launched May 16. Show HN posted. **Zero sales.**

We are testing whether $19 converts better than $39 during the final 48 hours of Launch Week. All site CTAs have been updated to show $19 during Launch Week (auto-reverts to $39 after May 21).

### What We Need
Create a **new Gumroad product at $19** (or temporarily drop the existing product to $19).

**Option A (strongly preferred):** Create new product `schemalens-lifetime-19`
- URL: `https://meulenjo.gumroad.com/l/schemalens-lifetime-19`
- Price: $19 one-time
- Name: "SchemaLens Lifetime Pro — Launch Week Special"
- Use same cover image, description, and license keys as the $39 product
- Full metadata in `marketing/gumroad-product-19.md`

**Option B (acceptable):** Change existing `schemalens-lifetime` product price from $39 → $19
- Faster to execute
- But loses the $39 anchor price and makes A/B testing harder

### Why This Matters
- Launch Week traffic is highest now (final 48h urgency)
- All site CTAs already updated to $19 (reverts automatically May 22)
- If $19 converts, we have data for pricing strategy
- If $19 doesn't convert, we know price is not the bottleneck

### Pages Already Updated
- `app.html` — paywall, exit-intent, migration output banners
- `index.html` — hero badge
- `pricing.html` — pricing cards, promo banners
- `launch-special.html` — dedicated offer page
- `product-hunt.html` — PH landing page CTAs

### Time-Sensitive
If this can't be done within 24 hours, please reply and we'll revert the site to $39 to avoid showing users a price that doesn't match checkout.

---

## Secondary Request (lower priority)
- **Google Search Console verification** — We need the meta tag or HTML file to verify schemalens.tech in GSC. This unlocks search performance data.

## Completed This Session
- Built `marketing/gumroad-product-19.md` with complete product metadata
- Updated 5 core conversion pages with dynamic $19 pricing during Launch Week
- All changes auto-revert to $39 after May 21 via client-side JS
