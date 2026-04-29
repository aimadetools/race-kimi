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

CREATE POLICY "Users can insert own memberships" ON public.team_memberships
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- Team workspace columns on saved_diffs
-- ============================================
ALTER TABLE public.saved_diffs ADD COLUMN IF NOT EXISTS team_name TEXT;

-- Team members can view diffs shared with their team
CREATE POLICY "Team members can view team diffs" ON public.saved_diffs
  FOR SELECT USING (
    team_name IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM public.team_memberships tm
      WHERE tm.team_name = saved_diffs.team_name
      AND tm.user_id = auth.uid()
    )
  );

-- Team members can insert diffs to their team
CREATE POLICY "Team members can insert team diffs" ON public.saved_diffs
  FOR INSERT WITH CHECK (
    team_name IS NULL OR
    EXISTS (
      SELECT 1 FROM public.team_memberships tm
      WHERE tm.team_name = saved_diffs.team_name
      AND tm.user_id = auth.uid()
    )
  );

-- ============================================
-- Public shareable diff links
-- ============================================
ALTER TABLE public.saved_diffs ADD COLUMN IF NOT EXISTS public_id TEXT UNIQUE;
ALTER TABLE public.saved_diffs ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;

-- Anonymous users can view public diffs
CREATE POLICY "Anyone can view public diffs" ON public.saved_diffs
  FOR SELECT USING (is_public = true);

-- ============================================
-- analytics_events: anonymous usage tracking
-- ============================================
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  page_path TEXT,
  session_hash TEXT,
  referrer TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for client-side analytics
CREATE POLICY "Allow anonymous analytics inserts" ON public.analytics_events
  FOR INSERT TO anon WITH CHECK (true);

-- Only service role can read analytics (no user-facing dashboard yet)
CREATE POLICY "Only service role can read analytics" ON public.analytics_events
  FOR SELECT TO service_role USING (true);

-- ============================================
-- newsletter_subscribers: email capture for launch announcements
-- ============================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source_page TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  welcome_sent_at TIMESTAMPTZ,
  drip_1_sent_at TIMESTAMPTZ,
  drip_2_sent_at TIMESTAMPTZ
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for newsletter signup
CREATE POLICY "Allow anonymous newsletter inserts" ON public.newsletter_subscribers
  FOR INSERT TO anon WITH CHECK (true);

-- Only service role can read subscriber list
CREATE POLICY "Only service role can read subscribers" ON public.newsletter_subscribers
  FOR SELECT TO service_role USING (true);

-- ============================================
-- feedback: in-app user feedback
-- ============================================
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  email TEXT,
  page_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for feedback widget
CREATE POLICY "Allow anonymous feedback inserts" ON public.feedback
  FOR INSERT TO anon WITH CHECK (true);

-- Only service role can read feedback
CREATE POLICY "Only service role can read feedback" ON public.feedback
  FOR SELECT TO service_role USING (true);

-- ============================================
-- Indexes for performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_saved_diffs_user_id ON public.saved_diffs(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_diffs_created_at ON public.saved_diffs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_diffs_public_id ON public.saved_diffs(public_id);
CREATE INDEX IF NOT EXISTS idx_team_memberships_user_id ON public.team_memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_team_memberships_team_name ON public.team_memberships(team_name);
CREATE INDEX IF NOT EXISTS idx_saved_diffs_team_name ON public.saved_diffs(team_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_category ON public.feedback(category);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON public.feedback(created_at DESC);

-- ============================================
-- Diff versioning support
-- ============================================
ALTER TABLE public.saved_diffs ADD COLUMN IF NOT EXISTS version_number INTEGER DEFAULT 1;
ALTER TABLE public.saved_diffs ADD COLUMN IF NOT EXISTS diff_group_id UUID REFERENCES public.saved_diffs(id);

CREATE INDEX IF NOT EXISTS idx_saved_diffs_group ON public.saved_diffs(diff_group_id, version_number DESC);
CREATE INDEX IF NOT EXISTS idx_saved_diffs_name_user ON public.saved_diffs(name, user_id);
CREATE INDEX IF NOT EXISTS idx_saved_diffs_name_team ON public.saved_diffs(name, team_name);

-- ============================================
-- testimonials: user-submitted testimonials for Wall of Love
-- ============================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  testimonial TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for testimonial submissions
CREATE POLICY "Allow anonymous testimonial inserts" ON public.testimonials
  FOR INSERT TO anon WITH CHECK (true);

-- Only show approved testimonials publicly
CREATE POLICY "Only show approved testimonials" ON public.testimonials
  FOR SELECT TO anon USING (approved = true);

-- Only service role can read unapproved testimonials
CREATE POLICY "Only service role can read all testimonials" ON public.testimonials
  FOR SELECT TO service_role USING (true);

CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON public.testimonials(approved, created_at DESC);

-- ============================================
-- diff_comments: team collaboration annotations
-- ============================================
CREATE TABLE IF NOT EXISTS public.diff_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  saved_diff_id UUID NOT NULL REFERENCES public.saved_diffs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  table_name TEXT NOT NULL,
  message TEXT NOT NULL CHECK (LENGTH(message) <= 2000),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.diff_comments ENABLE ROW LEVEL SECURITY;

-- Users can view comments on diffs they own
CREATE POLICY "Users can view comments on own diffs" ON public.diff_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.saved_diffs sd
      WHERE sd.id = diff_comments.saved_diff_id
      AND sd.user_id = auth.uid()
    )
  );

-- Team members can view comments on team diffs
CREATE POLICY "Team members can view team comments" ON public.diff_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.saved_diffs sd
      JOIN public.team_memberships tm ON tm.team_name = sd.team_name
      WHERE sd.id = diff_comments.saved_diff_id
      AND tm.user_id = auth.uid()
    )
  );

-- Anyone can view comments on public diffs
CREATE POLICY "Anyone can view comments on public diffs" ON public.diff_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.saved_diffs sd
      WHERE sd.id = diff_comments.saved_diff_id
      AND sd.is_public = true
    )
  );

-- Users can insert comments on accessible diffs
CREATE POLICY "Users can comment on accessible diffs" ON public.diff_comments
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND (
      EXISTS (
        SELECT 1 FROM public.saved_diffs sd
        WHERE sd.id = saved_diff_id
        AND (sd.user_id = auth.uid() OR sd.is_public = true OR EXISTS (
          SELECT 1 FROM public.team_memberships tm
          WHERE tm.team_name = sd.team_name AND tm.user_id = auth.uid()
        ))
      )
    )
  );

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments" ON public.diff_comments
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_diff_comments_diff ON public.diff_comments(saved_diff_id, table_name);
CREATE INDEX IF NOT EXISTS idx_diff_comments_created_at ON public.diff_comments(created_at DESC);
