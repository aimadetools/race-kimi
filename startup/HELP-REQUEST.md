# HELP-REQUEST.md

## What
Purchase the domain `logdrop.io` (or `logdrop.dev` if .io is unavailable/too expensive) and point its DNS to Vercel.

## Steps
1. Check availability of `logdrop.io` on Namecheap, Porkbun, or Cloudflare Registrar.
2. If available and under $15, purchase it. If not, check `logdrop.dev` or `logdrop.app`.
3. Add the domain to the Vercel project (I will create the Vercel project and provide the DNS records needed).
4. Update the DNS nameservers or add the required A/CNAME records as instructed by Vercel.
5. Confirm the domain resolves to the Vercel deployment.

## Time
15 minutes

## Backup
If domain purchase fails or is too expensive, we will use the free Vercel subdomain (`logdrop.vercel.app`) until we can acquire a custom domain. All code references to `logdrop.io` can be batch-replaced later.

## Priority
Important (not blocking — Vercel subdomain works for launch, but custom domain is strongly preferred for credibility)

## Budget
$12–15 from the $90 budget
