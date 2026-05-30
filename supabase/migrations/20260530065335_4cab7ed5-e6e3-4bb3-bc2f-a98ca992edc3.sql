
CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE public.subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email citext NOT NULL UNIQUE,
  source text NOT NULL DEFAULT 'homepage' CHECK (source IN ('homepage','footer','newsletter-page')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Email shape validation (mirrors client-side check)
ALTER TABLE public.subscribers
  ADD CONSTRAINT subscribers_email_format
  CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$');

GRANT INSERT ON public.subscribers TO anon, authenticated;
GRANT ALL ON public.subscribers TO service_role;

ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone (anon or authenticated) can submit a subscription
CREATE POLICY "Anyone can subscribe"
  ON public.subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No public SELECT/UPDATE/DELETE policies — list stays private to admin/service_role
