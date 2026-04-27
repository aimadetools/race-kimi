# 🚨 URGENT — Human Help Request (April 27, 2026)

SchemaLens has been ready for launch for 3 days. The product is comprehensive (32 blog posts, 10 free tools, 5 dialects, Pro/Team tiers, API, CI/CD, VS Code extension). **Without distribution, we have $0 MRR and zero users.**

This request bundles the highest-impact actions that only a human can do.

---

## 1. Distribution — HIGHEST PRIORITY

All materials are pre-written in `marketing/`. Please execute as many as possible:

### P0 — Launch Today
- [ ] **Product Hunt** — Create account, submit using `marketing/product-hunt-launch.md` (gallery images in `marketing/gallery/`)
- [ ] **Show HN** — Post using `marketing/show-hn.md`
- [ ] **Reddit** — Post using `marketing/reddit-posts.md` to r/PostgreSQL, r/MySQL, r/webdev, r/SQL

### P1 — This Week
- [ ] **IndieHackers** — Post using `marketing/indiehackers.md`
- [ ] **SaaS Directories** — Submit using `marketing/saas-directories.md` (AlternativeTo, BetaList, DevHunt, SaaSHub)
- [ ] **Tool Directories** — Submit SQL Validator using `marketing/tool-directory-submissions.md` (tiny-helpers.dev, LibHunt, etc.)
- [ ] **Stack Overflow** — Answer 2-3 questions about schema comparison/migration with SchemaLens link

### P1 — GitHub Awesome Lists
SchemaLens fits perfectly on these lists. I tried to create issues but the PAT is repo-scoped only. Please create issues or PRs:
- [ ] [awesome-diff-tools](https://github.com/mmueller2012/awesome-diff-tools) — Databases section
- [ ] [awesome-mysql](https://github.com/shlomi-noach/awesome-mysql) — Schema or Toolkits section
- [ ] [awesome-db-tools](https://github.com/mgramin/awesome-db-tools) — Schema > Design or Documentations

---

## 2. Supabase Service Role Key

**What:** The `service_role` key for project `fmfwdwwvvcdtreduncev`

**Why:** Build an admin dashboard to review feedback submissions, newsletter subscribers, and pending testimonials. This lets us respond to users within minutes instead of never seeing their feedback.

**Security:** Stored in a Vercel serverless function (`api/admin.js`) protected by a hardcoded admin password. Never exposed client-side.

**Alternative:** If you prefer not to share the key, please run this SQL in Supabase to allow admin access with a custom header:
```sql
-- Allow SELECT on admin tables when X-Admin-Key header matches
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin read feedback" ON feedback FOR SELECT USING (current_setting('request.headers')::json->>'x-admin-key' = 'schemalens-admin-2026');
```

---

## 3. Quick Wins (5 minutes each)

- [ ] **Star the repo** on GitHub — social proof matters
- [ ] **Tweet/Post** the live site link to your network — even 10 visits could lead to first Pro sale
- [ ] **Share in 1 Discord/Slack** — any developer community you're in

---

## Context

- **Live site:** https://schemalens.tech
- **Budget remaining:** $85
- **Days since domain purchase:** 3
- **Current MRR:** $0
- **Current users:** 0 (no distribution yet)

The product is done. The only thing missing is eyeballs. Please help us find our first users.

Thank you!
