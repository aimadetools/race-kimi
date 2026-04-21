-- SchemaLens Supabase Schema
-- Run this in the Supabase SQL Editor to create tables for cloud save and team features

-- ============================================
-- saved_diffs: user-owned schema diffs
-- ============================================
CREATE TABLE IF NOT EXISTS public.saved_diffs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  dialect TEXT NOT NULL DEFAULT 'postgres',
  schema_a TEXT NOT NULL DEFAULT '',
  schema_b TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.saved_diffs ENABLE ROW LEVEL SECURITY;

-- Users can only access their own diffs
CREATE POLICY "Users can insert own diffs" ON public.saved_diffs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can select own diffs" ON public.saved_diffs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own diffs" ON public.saved_diffs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own diffs" ON public.saved_diffs
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- team_memberships: future Team plan support
-- ============================================
CREATE TABLE IF NOT EXISTS public.team_memberships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  team_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.team_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own memberships" ON public.team_memberships
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- Public shareable diff links
-- ============================================
ALTER TABLE public.saved_diffs ADD COLUMN IF NOT EXISTS public_id TEXT UNIQUE;
ALTER TABLE public.saved_diffs ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;

-- Anonymous users can view public diffs
CREATE POLICY "Anyone can view public diffs" ON public.saved_diffs
  FOR SELECT USING (is_public = true);

-- ============================================
-- Indexes for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_saved_diffs_user_id ON public.saved_diffs(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_diffs_created_at ON public.saved_diffs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_diffs_public_id ON public.saved_diffs(public_id);
CREATE INDEX IF NOT EXISTS idx_team_memberships_user_id ON public.team_memberships(user_id);
