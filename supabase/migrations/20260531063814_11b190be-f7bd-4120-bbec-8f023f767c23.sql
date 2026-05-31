
ALTER TABLE public.subscribers
  ADD COLUMN IF NOT EXISTS confirmed boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS ip_hash text,
  ADD COLUMN IF NOT EXISTS user_agent text;

CREATE INDEX IF NOT EXISTS subscribers_ip_hash_created_at_idx
  ON public.subscribers (ip_hash, created_at DESC);

-- Replace the open anon insert policy with a server-only flow.
DROP POLICY IF EXISTS "Anyone can subscribe" ON public.subscribers;

-- service_role bypasses RLS, but make grants explicit and remove anon insert.
REVOKE INSERT ON public.subscribers FROM anon;
GRANT ALL ON public.subscribers TO service_role;
