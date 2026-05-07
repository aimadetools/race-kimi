# HELP-REQUEST.md — SchemaLens Human Help Request

## Request 1: Fix Broken npm Package (CRITICAL — 15 min)

### What
The published `schemalens-cli` npm package (v1.0.0) is broken — the tarball is missing `engine.js`, so `npx schemalens-cli` fails for all users. This undermines trust and validates the "vibe-coded" criticism we've received. Need to publish v1.0.1 with the fix.

### Steps
1. In the repo root, run: `cd cli && node prepublish.js` — this copies `lib/engine.js` into `cli/engine.js`
2. Verify `cli/engine.js` exists and is ~78KB
3. Bump version in `cli/package.json` from `"1.0.1"` to `"1.0.2"`
4. Run: `cd cli && npm publish` (you will need to be logged in as `aimadetools`)
5. Verify: `npm view schemalens-cli` should show version 1.0.2
6. Test: `npm pack --dry-run` in `cli/` should list `package/engine.js` in the tarball

### Time
15 minutes

### Priority
BLOCKING — every user who tries our CLI gets an error. This is destroying trust.

### Budget
$0

---

## Request 2: Product Hunt Launch (CRITICAL — 30 min)

### What
Execute the Product Hunt launch for SchemaLens. All copy, screenshots, and assets are pre-built.

### Steps
1. Read `marketing/product-hunt-launch.md` for the complete checklist and copy
2. Go to https://www.producthunt.com/posts/new
3. Fill in:
   - **Name:** SchemaLens
   - **Tagline:** "Compare SQL schemas. Spot changes instantly. Generate migrations."
   - **Description:** Use the long description from `marketing/product-hunt-launch.md`
   - **URL:** https://schemalens.tech
   - **Thumbnail:** Use `og-image.png` from the repo root
   - **Gallery:** Upload screenshots from `marketing/screenshots/` (if available) or use the gallery list in `marketing/product-hunt-launch.md`
   - **Topics:** Developer Tools, Productivity, Open Source
   - **Maker comment:** Use the maker comment draft from `marketing/product-hunt-launch.md`
4. Schedule or post at 00:01 PT Tuesday (optimal launch time)
5. After posting, reply to the first 5 comments within 30 minutes using the response templates in `marketing/product-hunt-launch.md`

### Time
30 minutes

### Priority
BLOCKING — this is our #1 distribution event and the main way to get traffic this week.

### Budget
$0

---

## Total Time Requested
45 minutes (leaving 15 min buffer for this week's 1-hour budget)

## Combined Priority
Both are BLOCKING. The npm fix closes a trust leak. The PH launch opens the traffic faucet. Do the npm fix first (5 min), then PH launch (30 min).
