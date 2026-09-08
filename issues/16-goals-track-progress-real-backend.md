# 16: Goals & Track Progress — real backend

**What to build:** Wire `GoalSetting.tsx` and `AcademicGoalTracker.tsx` to the new `goals` table instead of `AppContext`'s in-memory state seeded from `mockDatabase.ts`. Fix the "Add Goal" button, which currently just closes the modal without saving anything.

**Blocked by:** the `goals` table existing (SQL already provided — apply it if not already applied)

**Status:** ready-for-agent

- [x] Submitting the "Add Goal" form inserts a real row into `goals`, scoped to the authenticated user (RLS enforced)
- [x] Goal list on page load reads from `goals`, not `AppContext`'s mock seed
- [x] Updating progress/status persists (`updateGoalStatus` writes to the table, not just local state)
- [x] Deleting a goal removes the real row, not just the in-memory array entry
- [x] A goal created here writes a `goal_created` event using the existing `EVENT_TYPES` vocabulary, so chat/other features can eventually react to it
- [x] `mockDatabase.ts`'s goal seed data is no longer used as the source of truth (can stay as fixture data for tests, not as runtime state)
- [x] Refreshing the page shows the same goals as before refresh
