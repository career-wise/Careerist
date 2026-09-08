# 07: Interview Prep writes completion event

**What to build:** Completing a mock interview writes an `events` row recording the score/confidence signal and weak areas, using the vocabulary established in ticket 06 (or defined here if built in parallel — vocabulary must match ticket 06's).

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] Completing an interview session inserts an `events` row with `event_type` = the agreed low-confidence/completion type, correct `payload` shape, `feature_source` = interview-prep
- [ ] Verifiable directly by querying the table after a completed session (doesn't require chat to be built yet)
- [ ] Works identically whether triggered from the student or (later, reused) graduate interview flow
