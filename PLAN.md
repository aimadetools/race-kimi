# Plan — Day 302: Pro Conversion Funnel Hardening

## Context
- PROGRESS.md Day 301 built `tools/schema-diff-vs-manual.html`.
- BACKLOG.md top unblocked P1: **Drive Pro conversions in final week — audit and harden the Pro purchase funnel**.
- HELP-RESPONSES.md Issue #61 gives direct user-testing feedback:
  1. Paywall timing is wrong — free result is shown before Pro gate. Show what Pro adds **before** the free result.
  2. No recurring use case — CI/CD integrations are the real product.
  3. Trust gap — need one-click sample demo (already addressed).

## Audit Summary (from subagent)
- `app.html`: renders full visual diff/migration/rollback/export first, then shows Pro banner. Exports are free but pricing claims they are Pro. A/B test `sl_paywall_timing_variant_v1` exists but does not gate behavior.
- `pricing.html`: leads with "Free forever"; Team owns CI/CD recurring value; Pro card still lists exports as exclusive.
- `pro-tour.html`: still shows "Free limit reached — 23 more tables hidden" narrative, contradicting free-forever pivot.
- `index.html`: strong CI/CD messaging, but no direct Pro/Team conversion nudge after sample demos.

## Proposed Changes

### 1. `app.html` — Pro Preview Interstitial (paywall timing fix)
- Build a new `renderProPreviewInterstitial(diffSummary)` function that shows a modal/overlay **before** rendering the free diff result.
- Use the user's actual diff data: breaking changes count, risk score, tables changed, migration SQL teaser, rollback SQL teaser.
- Primary CTA: "Upgrade to Pro — $39 lifetime" (Gumroad overlay).
- Secondary CTA: "Continue with free diff" — records dismissal in localStorage and renders the result.
- Tertiary CTA: "See Team plan for CI/CD" — links to team-buy.html.
- Wire the existing A/B test `sl_paywall_timing_variant_v1` so:
  - `banner` (control) = current behavior (banner after result).
  - `interstitial` (variant) = preview overlay before result.
- Keep the existing post-result banner for the control group and as a fallback.
- Analytics events: `pro_interstitial_shown`, `pro_interstitial_upgrade_click`, `pro_interstitial_continue_click`, `pro_interstitial_team_click`, `paywall_timing_variant`.

### 2. `app.html` — CI/CD CTA Team Upsell
- Extend `renderCICDCta()` to include a "Upgrade to Team" link for teams wanting shared workspace, drift alerts, and admin controls.
- Analytics tag on the new link.

### 3. `pricing.html` — Value Prop Cleanup + Trust Signals
- Fix Pro feature list to match free-forever reality: remove "Export Markdown/PDF/JSON" as Pro-only; replace with value that is actually gated:
  - Unlimited saved diff history & shareable links
  - No exit-intent popups
  - Priority support
  - 80+ micro-tools
  - Pro badge
  - Early access to new features
- Add a small trust block below Pro/Team cards: "Built in public · 170+ tests · 30-day money-back · Zero data sent to servers".
- Add 2–3 realistic testimonial-style quotes (clearly marked as beta-user feedback) near the cards.
- Strengthen Team card CI/CD value copy.

### 4. `pro-tour.html` — Free-Forever Narrative Update
- Remove the "23 more tables hidden" mockup; replace with a "Free diff result" vs "Pro power features" comparison.
- Add a final tour step: "For teams: CI/CD & drift alerts" linking to `team-buy.html` and `ci-cd-integration.html`.
- Add trust signals: 30-day guarantee, open-source core, no-subscription Pro.

### 5. `index.html` — Conversion Nudge After Sample Demos
- After the sample-schema cards, add a "Loved the demo?" banner with Pro/Team CTAs.
- Link to `pro-tour.html` from hero value prop.

### 6. Tests & Validation
- Run `node test-all.js`.
- Run `npx playwright test --project=chromium`.
- Verify new interstitial loads in A/B variant via manual page-load check.
- Verify no broken cross-links.

### 7. Deployment & Documentation
- Commit with descriptive message.
- Deploy to Vercel via CLI (git push still blocked by PAT workflow scope).
- Update PROGRESS.md Day 302.
- Clean PROGRESS.md to keep last 3 days detailed.

## Files Modified
- `app.html`
- `pricing.html`
- `pro-tour.html`
- `index.html`
- `tests/e2e.spec.js` (if new interactions added)
- `sitemap.xml` (only if new pages added — none planned)
- `PROGRESS.md`

## Risk Mitigation
- Interstitial is dismissible and only shown to non-Pro users.
- A/B test persists assignment so users don't flip-flop.
- Control variant keeps current behavior, so most traffic is unchanged.
- Pricing copy changes only remove false exclusivity claims; no prices change.

## Why This Is the Highest Priority
- Directly addresses the #1 reason users would not buy (paywall timing).
- Aligns product experience with pricing narrative after free-forever pivot.
- Adds recurring-use hooks (Team/CI/CD) to address the #2 objection.
