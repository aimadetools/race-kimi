# HELP-REQUEST.md — SchemaLens Week 7 Blockers

## What
Three blocking requests for SchemaLens revenue and distribution. The root HELP-REQUEST.md file was lost — these requests have not yet reached you. Recreating in the correct location.

---

## Request 1: JavaScript Kicks $29 Sponsorship (P0 — Blocking)

**Time:** 10 minutes
**Priority:** blocking
**Budget:** $29 (from $95 remaining)

**Final unambiguous ad copy (ONE ad only — no conflicting versions):**

- **Headline:** Catch breaking database schema changes in every PR
- **Body:** SchemaLens diffs your SQL schemas and generates migration scripts — right in your browser, VS Code, or CI pipeline. Free for 15 tables. Lifetime Pro $39.
- **CTA:** Compare schemas free →
- **Target URL:** https://schemalens.tech/github-action.html
- **Image:** Use the SchemaLens logo at https://schemalens.tech/og-image.png (or any 1200×630 image from the site)

**Steps:**
1. Go to https://javascriptkicks.com/Advertising
2. Book a "Sponsored Link" for $29
3. Use the exact copy above
4. Target URL: https://schemalens.tech/github-action.html
5. Pay $29 from the SchemaLens budget
6. Confirm the booking date

**Why this matters:** This is our first and only paid ad. Previous requests (#44 and #45) were closed for having conflicting ad copy. This is the FINAL, single ad copy. The CI/GitHub Action angle is our highest-conversion landing page based on community feedback.

---

## Request 2: Gumroad Offer Code "RACE2026" (P0 — Blocking)

**Time:** 5 minutes
**Priority:** blocking
**Budget:** $0

**Steps:**
1. Log into Gumroad at https://gumroad.com/
2. Go to Products → "SchemaLens Lifetime Pro"
3. Click "Offer codes" tab
4. Click "Generate" or "New offer code"
5. Create an offer code with these exact settings:
   - Code: `RACE2026`
   - Discount: $30 off (so $39 → $9 final price)
   - Quantity: Unlimited (or 100)
   - Expires: July 10, 2026
6. Save the code
7. Verify it works by visiting https://gumroad.com/l/schemalens-lifetime/RACE2026 — the price should show $9.00 at checkout

**Why this matters:** Every CTA on the site currently says $39 (fixed the copy on Day 202 after discovering the code doesn't exist). Once the code exists, the /RACE2026 URLs will automatically show $9 checkout. This is our only impulse-buy pricing experiment.

---

## Request 3: npm Auth Token Refresh (P0 — Blocking)

**Time:** 2 minutes
**Priority:** blocking
**Budget:** $0

**Steps:**
1. Log into npm at https://www.npmjs.com/
2. Go to Access Tokens → Generate new token (Classic)
3. Select "Publish" scope
4. Copy the new token
5. Overwrite the file `/home/race/.npmrc` with exactly this content:
   ```
   //registry.npmjs.org/:_authToken=YOUR_NEW_TOKEN_HERE
   ```
6. Verify by running: `npm whoami` — it should return the npm username, not 401

**Why this matters:** Cannot publish `schemalens-cli`, `schemalens-engine`, or `schemalens-diff-cli`. npm publish returns 401 Unauthorized. Blocks all npm distribution updates.

---

*All three requests are independent. Any one that gets unblocked helps the business. Thank you.*
