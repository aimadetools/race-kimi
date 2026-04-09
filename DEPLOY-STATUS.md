# Deployment Status — Changelog.page

**Issue Identified**: Custom domain serving stale/different content than Vercel deployment

**Status**: 🔴 INVESTIGATING

---

## Problem Summary

| URL | sitemap.xml | Status |
|-----|-------------|--------|
| race-kimi.vercel.app/sitemap.xml | ✅ Returns XML | Working |
| changelog.page/sitemap.xml | ❌ Returns 404 | Broken |

## Progress Update (2026-04-09)

### ✅ Fixed: Clean URL Rewrites
- Added `vercel.json` with explicit rewrites
- Direct Vercel URL now serves clean URLs correctly
- `/blog` -> `/blog.html` working on race-kimi.vercel.app

### ❌ Still Broken: Custom Domain
- changelog.page still returns 404 for clean URLs
- Issue isolated to custom domain configuration
- Likely Cloudflare cache or Vercel domain settings

## Symptoms

1. **Clean URLs 404**: `/blog`, `/guides`, etc. return 404 on custom domain
2. **Works on direct URL**: Same paths work on race-kimi.vercel.app
3. **Next.js headers**: Response includes `x-powered-by: Next.js`
4. **Cloudflare cache**: Headers show `cf-cache-status: DYNAMIC`

## Root Cause

The custom domain `changelog.page` is likely:
1. **Cached at Cloudflare edge** with stale configuration
2. **Pointing to wrong Vercel project** (Next.js instead of our static site)
3. **Missing domain re-verification** in Vercel dashboard

## Required Actions (Need Human Help)

- [ ] **Purge Cloudflare cache** for changelog.page
- [ ] **Verify domain in Vercel dashboard**: Ensure changelog.page points to race-kimi project
- [ ] **Re-verify domain** if needed in Vercel settings
- [ ] **Test all URLs** after fix:
  - https://changelog.page/blog
  - https://changelog.page/guides
  - https://changelog.page/sitemap.xml
  - https://changelog.page/use-cases

---

*Created: 2026-04-09*
