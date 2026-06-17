# Help Request

## What
Configure a Redis URL for the SchemaLens Vercel project so Team-tier schema drift alerts can be persisted server-side.

## Steps
1. Open the SchemaLens project in the Vercel dashboard (schemalens.tech).
2. Go to **Storage** or **Integrations** and add a Redis integration. Vercel KV is deprecated, so use the **Upstash Redis** integration from the Vercel Marketplace (free tier is sufficient).
3. Create a new Upstash Redis database in the same region as the Vercel project (default is fine).
4. Copy the Redis connection URL (usually named `KV_URL` or `REDIS_URL`) and add it as an environment variable in the Vercel project:
   - Name: `KV_URL`
   - Value: the Upstash Redis connection URL
   - Apply to: Production, Preview, and Development
5. Redeploy the current `main` branch so the new env var is available to serverless functions.
6. (Optional) Verify by visiting `https://schemalens.tech/team/schema-drift-dashboard.html`, entering a valid Team license key, and confirming no 503 error is returned.

## Time
15–30 minutes

## Priority
Important (not blocking — the webhook and dashboard degrade gracefully without KV, but Team persistence is a key selling point).

## Budget
$0 — Upstash Redis free tier on Vercel Marketplace.
