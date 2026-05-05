# HELP-REQUEST.md — SchemaLens Gumroad Lifetime Product

## What
Create a new Gumroad product for "SchemaLens Lifetime Pro" at $39 one-time payment, with slug `schemalens-lifetime`. All UI already points to this URL.

## Steps (Estimated time: 10 minutes)

### 1. Log into Gumroad (2 min)
- Go to https://gumroad.com/ and log into the SchemaLens seller account

### 2. Create New Product (5 min)
- Click "Add a product" → choose "Digital product"
- Name: **SchemaLens Lifetime Pro**
- Description: "Pay once, keep forever. Unlimited schema diffs, full migration generation, exports, and every future Pro update. No recurring bills."
- Price: **$39** — select "One-time payment"
- Custom URL slug: `schemalens-lifetime` (this MUST match exactly — the site already links to https://gumroad.com/l/schemalens-lifetime)
- Upload cover image: reuse the existing SchemaLens Pro cover image if available, or any 1280×720 screenshot of app.html
- Product type: "Software"

### 3. Configure Settings (3 min)
- License keys: Enable "Generate unique license keys per sale" 
  - Format: choose "Custom" and enter prefix `SL-`
  - Example key format: `SL-XXXX-XXXX-XXXX-XXXX` (the app validates this pattern)
- Refund policy: 14-day money-back guarantee
- Visibility: "Published" (not draft)
- Save the product

### 4. Verify (instant)
- Visit https://gumroad.com/l/schemalens-lifetime and confirm the page loads with the correct price ($39)
- Do a test purchase with a $0.01 test product first if Gumroad allows, or just verify the checkout page opens

## Time
10 minutes

## Priority
blocking — the site already links to this product and users will see a 404 if they click "Lifetime — $39 once"

## Budget
$0 (Gumroad takes a fee from each sale, no upfront cost)
