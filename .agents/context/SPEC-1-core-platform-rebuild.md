# Spec 1 — Core Platform Rebuild
`ready-for-agent` (label to apply once published to a tracker — none currently connected for this repo)

## Problem Statement

Careerist has no real backend. `lib/auth.ts` is a mock that writes a fake user object to `localStorage`. The onboarding flow collects real answers (persona, grade, goals, field of study, etc.) but only saves them to `localStorage`, and no dashboard actually reads them back — `StudentDashboardHome.tsx` renders from a hardcoded mock object instead. As a result there is no durable, queryable record of who a user is or what they've told the platform, which means no feature can be aware of another feature, no session survives a real deployment, and nothing built on top of this (AI chat, cross-feature interlinking, the graduate dashboard) has real ground to stand on.

## Solution

Stand up Supabase (Postgres + Auth + Storage) as the system of record. Replace mock auth with real Supabase email/password auth. Create the three core tables (`profiles`, `events`, `recommendations`) with Row Level Security so a user can only ever read/write their own rows. Wire the onboarding flow to persist into `profiles` instead of `localStorage`, and wire dashboard routing/rendering to read the real persisted persona and answers instead of the hardcoded mock. This spec builds the ground floor only — no AI chat, no cross-feature recommendation logic, no graduate feature work. Those depend on this and are specced separately (Spec 2, Spec 3).

## User Stories

1. As a new user, I want to sign up with email and password, so that I have a persistent account instead of a fake `localStorage` session.
2. As a returning user, I want to log in and land back on my own dashboard with my own data, so that my progress isn't lost between sessions.
3. As a user, I want my session to persist across a page refresh, so that I'm not logged out every time I reload.
4. As a user, I want to log out and have my session actually cleared, so that a shared/public device doesn't stay logged in as me.
5. As a user, I want a password reset flow, so that I'm not locked out if I forget my password.
6. As a new user going through onboarding, I want my persona choice (high-school vs graduate) saved to my account, so that the app always knows which dashboard and question set apply to me.
7. As a high-school student, I want my onboarding answers (grade, subjects, goal, clarity level) saved to my profile, so that the dashboard can eventually use them instead of showing generic mock content.
8. As a graduate, I want my onboarding answers (status, field of study, what I'm looking for) saved to my profile, so that the graduate dashboard can eventually use them.
9. As a user who skips onboarding, I want to be routed to a sensible default (student dashboard, empty profile) rather than the app breaking or guessing my persona.
10. As a user, I want to be routed to `/student-dashboard` or `/graduate-dashboard` based on my actual saved persona, not a hardcoded default, so that the routing reflects who I actually am.
11. As a returning user who already completed onboarding, I want to skip onboarding entirely on future logins and go straight to my dashboard, so that I'm not re-asked the same questions.
12. As a developer, I want Row Level Security enforced on `profiles`, `events`, and `recommendations`, so that one user can never read or write another user's data even if the client is compromised.
13. As a developer, I want the `events` table to accept an append-only insert (no update/delete from the client), so that it stays a trustworthy audit log for later features to build on.
14. As a developer, I want the `recommendations` table to support a status transition (`active → dismissed` / `active → completed`) scoped to the owning user, so that later features (Spec 2 onward) can mark suggestions resolved.
15. As a product owner, I want the old `localStorage`-only onboarding save path fully removed once the new persistence lands, so the codebase doesn't have two competing sources of truth.
16. As a product owner, I want `lib/auth.ts`'s mock implementation fully removed, so nothing in the app can silently fall back to fake auth.
17. As a user, I want a clear, non-cryptic error if signup/login fails (wrong password, network issue, email already registered), so I'm not stuck guessing what went wrong.
18. As a developer, I want environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) documented and required at build time, so the app fails loudly in dev if misconfigured rather than silently falling back to mock behavior.

## Implementation Decisions

- **Auth**: Supabase email/password auth (`supabase-js`). Social login (Google, etc.) is out of scope for this spec — can be a fast follow, not blocking.
- **Schema**:
  - `profiles`: one row per `auth.users` id. Columns: `persona` (`high-school | graduate | null`), onboarding answer fields (grade, subjects, goal, clarity_level for students; status, field_of_study, looking_for for graduates — store persona-specific fields as JSONB rather than a wide sparse table, since the two persona shapes diverge and will diverge further when professional/entrepreneur personas are added later), `onboarding_completed_at`, `created_at`, `updated_at`.
  - `events`: append-only. Columns: `id`, `user_id`, `event_type` (text, no enum constraint yet — Spec 2/3 will define the vocabulary as they add event-writers), `payload` (JSONB), `feature_source` (text), `created_at`. Insert-only RLS policy for the owning user; no update/delete policy at all (enforce append-only at the DB level, not just convention).
  - `recommendations`: Columns: `id`, `user_id`, `type`, `payload` (JSONB), `source_feature`, `target_feature`, `status` (`active | dismissed | completed`, default `active`), `created_at`, `updated_at`. RLS: owning user can select all, update only `status`.
  - This spec creates the tables and RLS policies but does not populate `events`/`recommendations` with real writers yet — that's Spec 2/3. Creating them now means Spec 2/3 aren't blocked on a schema migration mid-build.
- **Migrations**: Supabase SQL migrations checked into `frontend/supabase/migrations/` (or a top-level `supabase/` dir if the repo is restructured to be less frontend-centric later — not this spec's call to make).
- **App.tsx routing**: `handleOnboardingComplete` and `handleOnboardingSkip` branch on the real `persona` value read from the just-saved profile, not a hardcoded `/student-dashboard` navigate call.
- **Onboarding persistence**: `OnboardingPage`'s completion handler writes to `profiles` via a Supabase client call instead of (or in addition to, transitionally) `localStorage.setItem`. Once verified working, the `localStorage` write path is deleted, not left as dead code.
- **Session handling**: Supabase's built-in session persistence (local storage-backed session token is fine here — that's Supabase's own mechanism, distinct from the app's current fully-mocked `localStorage` user object).

## Testing Decisions

No test framework currently exists in this repo (`package.json` has no test runner, no Vitest/Jest/RTL/Cypress). This spec establishes the first test seam.

- Add Vitest + React Testing Library (natural fit for a Vite project, minimal config).
- Test only external, observable behavior — not Supabase client internals:
  - Signing up creates a retrievable session and a corresponding `profiles` row.
  - Completing onboarding persists the expected fields and routes to the correct dashboard based on persona.
  - A logged-out user hitting a dashboard route is redirected to login.
  - RLS: a second test user cannot read the first user's `profiles`/`events`/`recommendations` rows (this can be tested directly against a local/test Supabase project via the client, without needing to spin up the full UI).
- No prior art in the codebase to follow — this is the first test infrastructure added.

## Out of Scope

- AI chat, Gemini integration, function-calling (Spec 2).
- Any `events`/`recommendations` writers or readers beyond the schema/RLS existing (Spec 2/3).
- Graduate-specific features beyond persona-based routing and profile field storage (Spec 3).
- Social login, MFA, email verification flows beyond Supabase's defaults.
- Migrating/backfilling any data from the old `localStorage` mock — there's no real user data to migrate, this is pre-launch.

## Further Notes

This is the seam everything else depends on. Spec 2 (chat/interlinking) and Spec 3 (graduate dashboard) should not start implementation until this spec's `profiles`/`events`/`recommendations` schema is live, even if their own specs are written in parallel.
