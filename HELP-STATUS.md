# Human Help Status

## ✅ Completed Requests
The human has completed these requests. Read the responses carefully and act on them.

### [HELP] HELP-REQUEST.md — Human Assistance Needed
**Human response (closed 2026-04-21):**
Social Media - WAITING ON DOMAIN

  We'll create a Twitter/X account once you've chosen your final domain. The domain purchase includes 1 email mailbox, so
  let me know your preferred email alias (e.g. hello@, support@, team@) when you pick a domain.

  Domain

  schemalens.dev is taken. You have web search available, so check domain availability yourself and request the one you
  want.

  Tool Directory Submissions - WAITING ON DOMAIN

  We'll submit to directories once you have a custom domain.

  Supabase - DONE ✅

  - Project URL: https://fmfwdwwvvcdtreduncev.supabase.co
  - Anon key:
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZndkd3d2dmNkdHJlZHVuY2V2Iiwicm9sZSI6ImFub24iLCJ
  pYXQiOjE3NzY3NjIyMTAsImV4cCI6MjA5MjMzODIxMH0.tMXibqq5XPRGSdxfrNqCPgJRk3IYtvu5aCQVutZN9gw
  - Free tier. You handle schema design, RLS policies, and frontend integration.

  Demo Video - NOT AVAILABLE

  Generate screenshots or GIFs programmatically with your code.

  Budget spent: $0

  Time spent: 10min. You have 50min left this week.

---

## ⏳ Pending Requests

### [HELP] Domain Purchase — schemalens.app
**Requested:** 2026-04-21

**Status:** Pending human action

I checked domain availability via DNS lookup. `schemalens.dev` is taken, but several alternatives are available:

| Domain | Status | Notes |
|--------|--------|-------|
| **schemalens.app** | ✅ AVAILABLE | Recommended — preserves brand, modern .app TLD, ~$12-15/year |
| schemalens.co | ✅ AVAILABLE | Good backup option |
| schemalens.xyz | ✅ AVAILABLE | Less professional |
| sqldiff.io | ✅ AVAILABLE | Descriptive but abandons SchemaLens brand |
| schemadiff.dev | ✅ AVAILABLE | Descriptive but abandons SchemaLens brand |

**Recommended: schemalens.app**

Rationale:
- Preserves the established SchemaLens brand (used across 23+ pages, 11 blog posts, 4 tools)
- .app is Google-managed, modern, and signals "this is a tool/application"
- Cost fits within $90 budget (~$12-15/year)
- No rebranding work required

**Request:**
1. Purchase `schemalens.app` for 1 year
2. Set up email forwarding for `hello@schemalens.app`
3. Configure domain on Vercel (I will update all internal links once confirmed)

Once the domain is live, we can immediately unlock:
- Twitter/X account creation
- Tool directory submissions (tiny-helpers.dev, AlternativeTo, etc.)
- Product Hunt launch with custom domain
- Custom email for support/sales

---

### [HELP] Supabase Schema Setup
**Requested:** 2026-04-21

**Status:** Pending human action

The Supabase project is created. I need the following tables set up in the Supabase dashboard to enable Week 6 features (cloud save, team workspace):

**Table: `saved_diffs`**
```sql
create table saved_diffs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  title text not null,
  schema_a text not null,
  schema_b text not null,
  dialect text not null default 'postgres',
  diff_result jsonb,
  migration_sql text,
  is_public boolean default false,
  public_slug text unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: users can only see their own diffs
alter table saved_diffs enable row level security;
create policy "Users can CRUD their own diffs"
  on saved_diffs for all
  using (auth.uid() = user_id);

-- Public diffs are readable by anyone
create policy "Public diffs are viewable by everyone"
  on saved_diffs for select
  using (is_public = true);
```

**Table: `team_memberships`** (for future Team plan)
```sql
create table team_memberships (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  team_id uuid not null,
  role text not null default 'member', -- 'admin', 'member'
  created_at timestamptz default now()
);

alter table team_memberships enable row level security;
create policy "Users can view their own memberships"
  on team_memberships for select
  using (auth.uid() = user_id);
```

Please run these SQL statements in the Supabase SQL Editor. Once done, I can integrate cloud save into the app.
