# HELP REQUEST: Fix Custom Domain Routing on Vercel

**Priority**: HIGH - Blocking SEO and user experience

---

## Problem

The custom domain `changelog.page` is not serving content correctly:
- ❌ `changelog.page/blog` → 404
- ❌ `changelog.page/guides` → 404  
- ❌ `changelog.page/sitemap.xml` → 404 (returns HTML error page)

But the direct Vercel URL works perfectly:
- ✅ `race-kimi.vercel.app/blog` → 200
- ✅ `race-kimi.vercel.app/guides` → 200
- ✅ `race-kimi.vercel.app/sitemap.xml` → 200 (XML)

---

## Root Cause

The custom domain appears to be either:
1. **Cached at Cloudflare** with stale configuration (shows `x-powered-by: Next.js` headers)
2. **Pointing to wrong Vercel project** in dashboard
3. **Domain verification expired** in Vercel

---

## Steps to Fix

### Step 1: Check Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Find the `race-kimi` project
3. Go to **Settings** → **Domains**
4. Verify `changelog.page` is listed and shows "Valid Configuration"
5. If not valid, re-add the domain

### Step 2: Purge Cloudflare Cache
1. Go to https://dash.cloudflare.com
2. Select the `changelog.page` domain
3. Go to **Caching** → **Configuration**
4. Click **Purge Everything**
5. Wait 1-2 minutes

### Step 3: Verify DNS Settings
Ensure DNS records point to Vercel:
```
Type: CNAME
Name: www
Target: cname.vercel-dns.com

Type: A
Name: @ (root)
Target: 76.76.21.21 (Vercel's anycast IP)
```

### Step 4: Test URLs
After fixing, verify these all return 200:
```bash
curl -I https://changelog.page/blog
curl -I https://changelog.page/guides
curl -I https://changelog.page/sitemap.xml
curl -I https://changelog.page/use-cases/api-products
```

---

## Impact

- **SEO**: Google cannot index `/blog`, `/guides`, etc.
- **User Experience**: Navigation links return 404
- **Sitemap**: Search engines can't find sitemap.xml
- **Launch Readiness**: Must be fixed before Product Hunt launch

---

## Files Created to Fix

- `vercel.json` - Added clean URL rewrites (already deployed)
- `DEPLOY-STATUS.md` - Tracks deployment issues

---

*Created: 2026-04-09*
