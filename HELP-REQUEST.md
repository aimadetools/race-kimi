# HELP-REQUEST.md

## What
Final 48 hours of the $100 AI Startup Race: unblock the two infrastructure items that are the only realistic path to first revenue before July 10.

1. Create the two Gumroad Team plan products so `team-buy.html` can accept self-serve payments.
2. Create the SchemaLens GitHub App and add its credentials to Vercel so `/api/github-app-webhook.js` can post real schema diff comments on PRs.

## Steps

### Gumroad Team products (10 min)
1. Log in to the SchemaLens Gumroad account.
2. Create **SchemaLens Team — Monthly**:
   - URL slug: `schemalens-team-monthly`
   - Price: $29 USD / month (membership/recurring)
   - Description: Team plan for SchemaLens: shared workspace, Slack/Teams drift alerts, admin controls, API access, and everything in Pro. Cancel anytime.
3. Create **SchemaLens Team — Yearly**:
   - URL slug: `schemalens-team-yearly`
   - Price: $290 USD / year (membership/recurring)
   - Description: Team plan billed yearly — 2 months free vs monthly. Includes shared workspace, Slack/Teams drift alerts, admin controls, API access, and everything in Pro.
4. Verify checkout URLs load:
   - https://gumroad.com/l/schemalens-team-monthly
   - https://gumroad.com/l/schemalens-team-yearly
5. Reply with the live product URLs.

### GitHub App credentials (15 min)
1. Go to **GitHub → Settings → Developer settings → GitHub Apps → New GitHub App**.
2. Fill in:
   - **GitHub App name**: `SchemaLens Schema Diff`
   - **Homepage URL**: `https://schemalens.tech/github-app.html`
   - **Webhook URL**: `https://schemalens.tech/api/github-app-webhook`
   - **Webhook secret**: generate a strong random string and save it as `GITHUB_APP_WEBHOOK_SECRET`
   - **Permissions**: Contents (Read-only), Pull requests (Read & write), Metadata (Read-only)
   - **Subscribe to events**: Pull request
3. Copy the numeric **App ID** as `GITHUB_APP_ID`.
4. Generate and download a private key. Copy the full PEM text as `GITHUB_APP_PRIVATE_KEY`.
5. In the Vercel dashboard for `race-kimi`, add these environment variables to Production (and Preview):
   - `GITHUB_APP_ID`
   - `GITHUB_APP_PRIVATE_KEY`
   - `GITHUB_APP_WEBHOOK_SECRET`
6. Redeploy the latest `main` branch so the env vars are available to `/api/github-app-webhook.js`.

## Time
25 minutes total.

## Priority
Blocking for race-end revenue. Zero sales after 79 days; user testing identified CI/CD integrations as the real product and Team as the natural paid tier. These two items unlock self-serve Team checkout and the highest-leverage distribution channel (PR comments on every schema change).

## Budget
$0 — GitHub Apps and Gumroad memberships are free to create.
