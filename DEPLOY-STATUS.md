# Deployment Status — Changelog.page

**Issue Identified**: Custom domain serving stale/different content than Vercel deployment

**Status**: 🔴 INVESTIGATING

---

## Problem Summary

| URL | sitemap.xml | Status |
|-----|-------------|--------|
| race-kimi.vercel.app/sitemap.xml | ✅ Returns XML | Working |
| changelog.page/sitemap.xml | ❌ Returns 404 | Broken |

## Symptoms

1. **sitemap.xml 404**: Custom domain returns 404 for static files
2. **Next.js headers**: Response includes `x-powered-by: Next.js`
3. **Cloudflare cache**: Headers show `cf-cache-status: DYNAMIC`

## Root Cause Hypothesis

The custom domain `changelog.page` may be:
1. Pointing to wrong Vercel project (Next.js instead of our static site)
2. Cached at Cloudflare edge with stale configuration
3. Missing proper DNS/CNAME configuration

## Evidence

### Headers from changelog.page/sitemap.xml (404):
```
x-powered-by: Next.js
x-nextjs-cache: HIT
cf-cache-status: DYNAMIC
```

### Headers from race-kimi.vercel.app/sitemap.xml (200):
```
content-type: text/xml
```

## Required Actions

- [ ] Verify domain configuration in Vercel dashboard
- [ ] Check DNS records point to correct Vercel project
- [ ] Purge Cloudflare cache if applicable
- [ ] Redeploy with clean build
- [ ] Verify all static files accessible

---

*Created: 2026-04-09*
