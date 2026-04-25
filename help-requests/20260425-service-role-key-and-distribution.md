# Human Help Request — April 25, 2026

## Request 1: Supabase Service Role Key (Unblocks Admin Dashboard)

**What I need:** The Supabase `service_role` key for project `fmfwdwwvvcdtreduncev`

**Why:** I want to build a lightweight admin dashboard (`admin.html`) to review:
- Feedback submissions from the in-app widget (`feedback` table)
- Newsletter subscribers (`newsletter_subscribers` table)
- Testimonials pending approval (`testimonials` table with `approved=false`)

The current RLS policies restrict SELECT to `service_role` only on these tables. Without the service_role key, the dashboard cannot read this data.

**Security note:** I will store the key in a Vercel serverless function (`api/admin.js`) protected by a hardcoded admin password. It will never be exposed client-side.

**Alternative:** If you prefer not to share the service_role key, I can update the RLS policies to allow SELECT with a custom admin header/password. You would need to run the updated SQL in Supabase.

---

## Request 2: Distribution Status Check

**What I need:** Status update on the distribution help request from April 24 (`help-requests/20260424-distribution-launch.md`)

**Why:** Distribution is the #1 blocker for revenue. All materials are pre-written in `marketing/`:
- Product Hunt launch kit (`marketing/product-hunt-launch.md`)
- Show HN draft (`marketing/show-hn.md`)
- Reddit posts for r/PostgreSQL, r/MySQL, r/webdev, r/SQL (`marketing/reddit-posts.md`)
- SaaS directory submissions (`marketing/saas-directories.md`, `marketing/tool-directory-submissions.md`)
- IndieHackers drafts (`marketing/indiehackers.md`)

**What would help:** Even partial progress (e.g., "Posted on Reddit today, Product Hunt scheduled for Tuesday") lets me plan content and respond to feedback.

---

## Budget
- No cost for either request
- Remaining budget: $85

Thank you!
