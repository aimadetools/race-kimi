# SchemaLens Analytics Instrumentation Audit

**Date:** July 2, 2026  
**Status:** Homepage hero CTA instrumentation fixed and legacy `data-analytics` attributes now auto-tracked. Real usage review remains blocked pending `SUPABASE_SERVICE_ROLE_KEY` / GSC access.

## Why This Matters

Issue #61 (user testing) identified "no recurring use case" and "trust gap" as top-3 blockers. The CI/CD integrations are the real product, but we cannot optimize what we cannot measure. This audit closes the biggest instrumentation gaps so that once credentials are restored, every high-intent click is trackable.

## What Was Changed

### 1. Global `data-event` auto-tracking (`lib/analytics-client.js`)

Any element with a `data-event` attribute now automatically fires `SchemaLensAnalytics.track()` on click. Optional `data-event-platform` and `data-event-location` attributes are captured as metadata. This removes the need for inline `onclick` handlers on new CTAs.

### 2. Analytics client added to missing high-intent pages

The lightweight `lib/analytics-client.js` (auto page_view + UTM capture + data-event tracking) was added to:

- `features.html`
- `github-action.html`
- `how-it-works.html`
- `pro-tour.html`
- `blog.html`
- `team.html`
- `trust.html`
- `case-study-catch-breaking-changes.html`
- `staging-vs-production-schema-diff.html`

These pages previously had no client-side analytics at all or relied only on Vercel Web Analytics.

### 3. Homepage hero CTA tracking fixed (`index.html`)

The homepage previously had broken CTA tracking: an inline script referenced an undefined `track()` function, and the exit-intent modal referenced an undefined `window.trackEvent`. These are now fixed:

- Hero action links (`Try Sample Schema Diff`, `Compare Your Schemas`, `Add GitHub Action — Free`) use `data-event="homepage_hero_cta_click"` with `data-event-location` metadata.
- Hero badge links (CLI docs/copy, VS Code, GitHub Action, Chrome) use `data-event="homepage_hero_badge_click"`.
- Founding Member, share-to-unlock, star-on-GitHub, and checklist links are now instrumented.
- Sample-schema cards rely on auto-tracked `data-analytics` + `data-example` attributes; the redundant inline `SchemaLensAnalytics.track()` handler was removed to prevent double tracking.

### 4. Legacy `data-analytics` auto-tracking restored (`lib/analytics-client.js`)

Many CI/CD landing pages and micro-tools used `data-analytics="..."` attributes, but the analytics client only auto-tracked `data-event`. The client now tracks both selectors and captures `data-example` as metadata. This fixes CTA tracking across the CI/CD 60-second pages, `add-schema-diff-to-any-repo.html`, and other generated pages without requiring markup changes.

### 5. Global `trackEvent` alias for backward compatibility

`lib/analytics-client.js` now exposes `window.trackEvent` as an alias for `SchemaLensAnalytics.track`. This unblocks legacy tracking calls in `index.html` (exit-intent modal), `migration-checklist.html`, `migration-mastery.html`, `team-plan-comparison.html`, and `team-plan-one-pager.html`.

### 6. Conversion CTA tracking added

| Page | Tracked CTAs |
|------|--------------|
| `pricing.html` | `pricing_try_free`, `pricing_github_action`, `pricing_add_pipeline`, `pricing_team_plan_top`, `pricing_try_live_demo`, `pricing_buy_lifetime_pro`, `pricing_share_to_unlock`, `pricing_team_plan_bottom`, `pricing_buy_lifetime_bottom`, `pricing_open_app_share` |
| `team.html` | `team_hero_start_team`, `team_github_action_setup`, `team_github_action_setup_bottom`, `team_bottom_start_team`, `team_view_pricing` |
| `trust.html` | `trust_try_sample`, `trust_github_action` |
| `case-study-catch-breaking-changes.html` | `case_study_try_live_demo` |
| `staging-vs-production-schema-diff.html` | `staging_try_live_demo`, `staging_open_app`, `staging_try_url_diff`, `staging_connect_db`, `staging_run_live_demo`, `staging_github_action`, `staging_see_pr_demo`, `staging_setup_wizard`, `staging_buy_lifetime` |
| `tools.html` | `tools_card_<slug>` auto-generated for every tool-card button |

`github-action.html` already had `data-event` attributes on CTAs, but the analytics client was missing, so those events were never firing. Adding the client fixed that retroactively.

## Existing Strong Instrumentation

`app.html` already tracks the full funnel:

- `diff_run`, `export_sql`, `export_rollback_sql`, `export_pdf`, `export_json`, `export_markdown`, `export_orm`
- `share_diff`, `share_modal_open`, `share_link_copied`, `share_badge_*_copied`
- `pro_interstitial_shown`, `pro_interstitial_upgrade_click`, `pro_interstitial_team_click`, `pro_interstitial_continue_click`
- `cicd_cta_impression`, `cicd_cta_click`, `cicd_cta_dismissed`
- `team_drift_cta_shown`, `team_drift_cta_preview_click`, `team_drift_cta_buy_click`
- `final_week_banner_impression`, `final_week_banner_click`, `final_week_banner_dismissed`
- `license_modal_opened`, `license_activate`, `pro_trial_activated`
- `feedback_submitted`, `feedback_reason_submitted`, `newsletter_subscribed`

Micro-tools (PR comment generator, impact report generator, migration test plan generator, schema change checklist, pre-commit hook, etc.) each track `page_view`, generate/copy/download/share events.

## Remaining Gaps

The following high-traffic or high-intent pages still have only auto page_view (no custom CTA events):

- `launch-special.html` — has `final_week_buy_click` but only on Gumroad links; share/secondary CTAs not tracked.
- SEO landing pages (`postgres-schema-diff.html`, `mysql-schema-diff.html`, etc.) — analytics client present on some, but no custom events.
- `open.html`, `product-hunt.html`, `show-hn.html`, `indiehackers.html` — no analytics client.

These are lower priority than the core conversion funnel addressed above.

## How to Review Real Data

Once `SUPABASE_SERVICE_ROLE_KEY` is available:

1. Run `curl -H "x-analytics-token: $ANALYTICS_SUMMARY_TOKEN" https://schemalens.tech/api/analytics-summary` for a weekly summary.
2. Query the `analytics_events` table directly:
   - Top event types in the last 30 days
   - Funnel: `page_view` → `diff_run` → `pro_interstitial_shown` → `pro_interstitial_upgrade_click` / `team_drift_cta_click`
   - Conversion by entry page: `utm_visit` source/campaign → `diff_run` → `license_activate`
   - CI/CD intent: `cicd_cta_click`, `pricing_github_action`, `github_action_*` events
   - Team intent: `pricing_team_plan_*`, `team_*`, `team_lead_capture`
3. In the admin dashboard (`admin.html`), review event counts and A/B test variant assignments.
4. Compare with GSC search-query data to identify which landing pages drive the most `diff_run` events.

## Recommended Next Actions (when unblocked)

1. **Verify events are arriving** — check Vercel function logs for `ANALYTICS_EVENT` and ensure Supabase writes succeed.
2. **Build a conversion dashboard** — show weekly `diff_run` → `license_activate` rate and CTA click-through rates by page.
3. **Run A/B tests** — with instrumentation now complete, test headline/CTA variants on `pricing.html` and `team.html`.
4. **Add analytics clients to `open.html` / `product-hunt.html` / `show-hn.html` / `indiehackers.html`** — these distribution landing pages currently have no event tracking.
