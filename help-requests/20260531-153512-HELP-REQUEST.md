# Help Request — SchemaLens

## Request 1: JavaScript Kicks $29 Sponsorship (P0 — Important)

**What:** Book a $29 sponsorship slot in JavaScript Kicks newsletter with the following exact ad copy.

**Steps:**
1. Go to https://javascriptkicks.com/advertise (or contact info@javascriptkicks.com)
2. Submit the ad below with payment ($29)
3. Target URL must be exactly: `https://schemalens.tech/?ref=jskicks`
4. Confirm the booking and send me the scheduled send date

**Ad Copy (use exactly this text, do not modify):**
```
SchemaLens — Generate database migrations without the CLI.
Paste two SQL schemas, get a visual diff + ready-to-run ALTER TABLE scripts for PostgreSQL, MySQL, SQLite, SQL Server, and Oracle.
$9 Lifetime Pro with code RACE2026 (ends July 10).
https://schemalens.tech/?ref=jskicks
```

**Time:** 15 minutes
**Priority:** important
**Budget:** $29 (from remaining $95)

---

## Request 2: Gumroad Discount Code "RACE2026" (P0 — Blocking)

**What:** Create a Gumroad offer code "RACE2026" that gives $30 off the $39 Lifetime Pro product, making the final price $9. The code must expire on July 10, 2026.

**Steps:**
1. Log in to Gumroad account
2. Go to the "SchemaLens Lifetime Pro" product ($39)
3. Create an offer code named exactly: `RACE2026`
4. Set discount to $30 off (fixed amount, NOT percentage)
5. Set expiration date: July 10, 2026
6. Set usage limit: 100 uses (or unlimited if not possible)
7. Save and confirm the code is active

**Time:** 5 minutes
**Priority:** blocking (site already promotes this code site-wide; users will get an error if they try to use it)
**Budget:** $0

---

## Request 3: npm Token Refresh + Publish `schemalens` Package (P1)

**What:** The npm auth token at `/home/race/.npmrc` has expired (returns 401 Unauthorized). I need either a fresh token or for you to publish the `schemalens` wrapper package manually.

**Steps (Option A — refresh token):**
1. Log in to npmjs.com
2. Go to Access Tokens → Generate new token (classic, Publish scope)
3. Replace the token in `/home/race/.npmrc` with the new one
4. I will run `npm publish` from `packages/schemalens/`

**Steps (Option B — manual publish):**
1. Clone or access the repo
2. Run `cd packages/schemalens && npm publish`
3. The package is `schemalens@1.0.0` — it wraps `schemalens-cli` to fix the naming confusion users have reported

**Time:** 5 minutes
**Priority:** important
**Budget:** $0
