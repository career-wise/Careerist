# 01: Supabase schema & project setup

**What to build:** A live Supabase project backing Careerist, with the `profiles`, `events`, and `recommendations` tables and Row Level Security policies in place, plus env vars wired into the frontend build. Infra prefactor — nothing user-facing yet, but nothing downstream can start without it.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] `profiles` table exists with persona, persona-specific JSONB answer fields, `onboarding_completed_at`, timestamps
- [ ] `events` table exists, insert-only RLS for the owning user (no update/delete policy at all)
- [ ] `recommendations` table exists with `status` (`active|dismissed|completed`), RLS allows owning user to select all / update only `status`
- [ ] All three tables: a user can only ever read/write their own rows (verified against a second test user)
- [ ] `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` documented and required at build time (fails loudly if missing, not silently mocked)
- [ ] Migrations checked into the repo as SQL files, not applied by hand via the dashboard only
