# Help Request — Slack App Credentials & Vercel Env Vars

## What
Deploy the new SchemaLens Slack app by creating it in the Slack API console and adding the required environment variables to Vercel.

**Time:** 15 minutes  
**Priority:** P1 (unblocks a new CI/CD distribution channel)  
**Budget:** $0 (Slack apps are free)  

---

## Background
SchemaLens now has a full Slack app integration (not just Incoming Webhooks):

- Landing page: `slack-app.html`
- App manifest: `slack-app-manifest.json`
- API endpoints:
  - `/api/slack/oauth` — OAuth install callback
  - `/api/slack/command` — `/schemalens` slash command
  - `/api/slack/interactions` — Block actions / shortcuts
  - `/api/slack/events` — Events API (url_verification, app_home_opened)
- Shared helper: `lib/slack.js`

The existing `/api/slack.js` webhook forwarder remains unchanged for users who prefer Slack Incoming Webhooks.

---

## Steps

### 1. Create the Slack app

1. Go to https://api.slack.com/apps
2. Click **Create New App** → **From manifest**
3. Choose a workspace (a dev workspace is fine)
4. Paste the contents of `slack-app-manifest.json` from the repo root
5. Click **Create**
6. Note the **Client ID**, **Client Secret**, and **Signing Secret** on the **Basic Information** page

### 2. Install to your workspace

1. In the Slack app sidebar, go to **OAuth & Permissions**
2. Under **Redirect URLs**, add: `https://schemalens.tech/api/slack/oauth`
3. Click **Install to Workspace**
4. After authorizing, copy the **Bot User OAuth Token** (starts with `xoxb-`)

### 3. Add environment variables to Vercel

In the Vercel dashboard for the `race-kimi` project, add these environment variables:

| Name | Value |
|------|-------|
| `SLACK_CLIENT_ID` | Client ID from step 1 |
| `SLACK_CLIENT_SECRET` | Client Secret from step 1 |
| `SLACK_SIGNING_SECRET` | Signing Secret from step 1 |
| `SLACK_BOT_TOKEN` | Bot User OAuth Token from step 2 |

Make sure they are applied to **Production** (and Preview if you want to test there).

### 4. Verify

1. Visit `https://schemalens.tech/slack-app.html`
2. Click **Add to Slack**
3. Complete OAuth
4. In Slack, type `/schemalens https://example.com/a.sql https://example.com/b.sql --dialect postgres`
5. You should see a diff report posted in the channel

---

## Verification Checklist

- [ ] Slack app created from `slack-app-manifest.json`
- [ ] OAuth redirect URL set to `https://schemalens.tech/api/slack/oauth`
- [ ] All 4 env vars added to Vercel production
- [ ] `/schemalens` slash command responds in Slack
- [ ] Events API URL verifies successfully in Slack app settings

---

## Why This Matters

- User testing (HELP-RESPONSES.md Issue #61) identified CI/CD integrations as the real product. Slack is a natural alerting surface for CI/CD.
- The Slack app is a zero-cost distribution asset that puts SchemaLens directly where engineering teams already communicate.
- It supports the free-forever pivot: the slash command drives awareness of the free web diff, while CI/CD alerts are a Team-plan feature.
