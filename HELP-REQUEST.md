# Help Request — SchemaLens GitHub App Credentials

## What
Create the SchemaLens GitHub App and add its credentials to Vercel environment variables so the new `/api/github-app-webhook.js` endpoint can receive pull request events and post schema diff comments.

## Steps
1. Go to **GitHub → Settings → Developer settings → GitHub Apps → New GitHub App** (or use the org settings if the repo `aimadetools/race-kimi` is under an org).
2. Fill in the app settings:
   - **GitHub App name**: `SchemaLens Schema Diff` (or `SchemaLens Schema Diff (Beta)` if the first is taken)
   - **Homepage URL**: `https://schemalens.tech/github-app.html`
   - **Callback URL**: leave blank for now (we do not use OAuth user login)
   - **Webhook URL**: `https://schemalens.tech/api/github-app-webhook`
   - **Webhook secret**: generate a strong random string (e.g., 32+ chars) and save it — this is `GITHUB_APP_WEBHOOK_SECRET`
   - **Permissions**:
     - **Contents**: Read-only
     - **Pull requests**: Read & write
     - **Metadata**: Read-only (default)
   - **Subscribe to events**:
     - **Pull request**: checked
     - **Pull request review**: optional, leave unchecked
3. Create the app. On the app settings page:
   - Copy the **App ID** (numeric) → this is `GITHUB_APP_ID`
   - Scroll to **Private keys**, click **Generate a private key**, and download the `.pem` file. Open it and copy the full PEM text (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`) → this is `GITHUB_APP_PRIVATE_KEY`
4. In the Vercel dashboard for the `race-kimi` project, go to **Settings → Environment Variables** and add:
   - `GITHUB_APP_ID` = the numeric App ID
   - `GITHUB_APP_PRIVATE_KEY` = the full PEM private key
   - `GITHUB_APP_WEBHOOK_SECRET` = the webhook secret from step 2
   Make sure the variables are added to the **Production** environment (and Preview if you want to test PR deploys).
5. Redeploy the latest production build so the env vars are available to `/api/github-app-webhook.js`.
6. (Optional) Install the app on a test repository, open a PR that changes a `.sql` file, and verify that a schema diff comment appears.

## Time
15 minutes

## Priority
Blocking — the GitHub App landing page and webhook endpoint are live, but the app cannot receive events until credentials are configured.

## Budget
$0 — GitHub Apps are free to create.
