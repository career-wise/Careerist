# Spec 2 — AI Chat + Interlinking Engine
`ready-for-agent` (label to apply once published to a tracker — none currently connected for this repo)
**Depends on Spec 1** (`profiles`/`events`/`recommendations` schema and real auth must exist first).

## Problem Statement

`ChatPage.tsx` is entirely fake: a hardcoded seed conversation and a `setTimeout` that returns one canned string regardless of what the user types. There is no LLM call anywhere in the codebase. Beyond the chat itself being fake, nothing the user does anywhere in the app is visible to anything else — a bad mock interview doesn't make the chat more supportive, a course discussed in chat doesn't show up in the explorer, a stated goal is forgotten the moment the conversation ends. The product's core premise — an AI buddy that's aware of the whole user, and features that respond to signals from each other — doesn't exist yet.

## Solution

Replace the fake chat with a real Gemini API integration (free tier). On every message, assemble context from the user's `profiles` row plus recent relevant `events`/active `recommendations` (not the full raw conversation history dumped in — that's slow and unnecessary). Give the model function-calling tools to write new `events` and `recommendations` rows when it identifies something worth acting on (a struggle, a goal, an interest, a recommendation). Other features write `events` too (e.g., a completed mock interview writes a confidence-signal event), so the chat becomes reactive to things that happened outside the chat window, not just inside it. Target features (dashboard, explorer, study & succeed, goal setter, resources) read from `recommendations` filtered to themselves — they never call the LLM directly to "remember" something.

## User Stories

1. As a student, I want to type a real message and get a real, contextual AI reply, so that the chat is actually useful instead of a canned line.
2. As a returning user, I want the chat to already know my persona and onboarding answers without me re-explaining myself, so that it feels like it actually knows me.
3. As a student who just bombed a mock interview (low confidence score recorded), I want the chat to proactively bring it up with encouragement and a concrete tip the next time I open it, so that I'm not left to spiral alone.
4. As a student who mentions struggling with a subject in chat, I want that struggle to show up as a suggested resource in Study & Succeed without me having to go find it myself.
5. As a student who discusses a field of interest in chat, I want the College & Major Explorer to surface majors/colleges related to that field, so the two features feel connected instead of siloed.
6. As a user, I want the chat to remember a goal I mentioned in a previous session and ask about it later, so it feels like an ongoing relationship, not a stateless Q&A box.
7. As a graduate, I want the chat to notice a resume gap and offer to help fill it, so I don't have to separately dig through my resume looking for what's missing.
8. As a user, I want a suggestion the chat makes (a course, a resource, an action item) to actually appear in the relevant dashboard section, so "the chat mentioned it" and "it's in my dashboard" are the same thing, not two disconnected experiences.
9. As a user, I want to dismiss a suggestion I don't want, so it stops showing up and the chat doesn't keep repeating it.
10. As a user, I want a resource I've completed to be marked done everywhere it's referenced (dashboard, chat's memory of me), so I'm not asked to do the same thing twice.
11. As a developer, I want the chat's context window built from structured data (profile + recent events + active recommendations) rather than full raw chat history, so response latency and free-tier token usage stay predictable as conversations get long.
12. As a developer, I want a defined, small vocabulary of `event_type` and `recommendation.type` values (not an open free-text field the model invents new values for on a whim), so downstream features can reliably query for exactly what they expect.
13. As a product owner, I want a rate/quota guard around the Gemini free tier, so a burst of usage doesn't silently fail requests with no fallback message to the user.
14. As a user, I want a clear "the AI is thinking" state and a graceful error message if the AI call fails, so the chat doesn't look broken when it's just a network/API hiccup.
15. As a developer, I want the interview-prep module to write a `events` row on session completion (score, confidence signal, weak areas) using the same event schema the chat consumes, so the interlink in story 3 actually has data to read.
16. As a product owner, I want the chat's system prompt/personality (vigilant, intelligent, a genuine friend — not a generic corporate assistant) defined and reviewable as its own artifact, so tone can be iterated on without touching the function-calling plumbing.

## Implementation Decisions

- **AI provider**: Google Gemini API, free tier (Flash model). API key stored server-side/via environment variable, never exposed to the client directly — calls proxied through a lightweight server function (Supabase Edge Function is the natural fit given Spec 1's stack, avoiding a second backend).
- **Context assembly per message**: `profiles` row + last N (start with ~10–15) relevant `events` for that user + all `active` `recommendations` for that user, serialized into the system/context portion of the prompt. Full raw chat history is not replayed in full on every call — recent turns only (e.g., last 6–10 messages) plus the structured context above.
- **Function-calling tools exposed to the model**:
  - `write_event(event_type, payload, feature_source)` — for signals worth logging (frustration detected, interest expressed, struggle mentioned).
  - `write_recommendation(type, payload, target_feature)` — for actionable suggestions the model wants surfaced elsewhere.
  - Both tools insert directly into Spec 1's tables, scoped to the authenticated user via RLS (the Edge Function call carries the user's auth context, not a service-role bypass).
- **Event/recommendation vocabulary**: A fixed, versioned list of `event_type` values (e.g., `interview_completed_low_confidence`, `subject_struggle`, `goal_created`, `resume_gap_detected`, `chat_expressed_frustration`, `interest_expressed`) and `recommendation.type` values (`course`, `resource`, `action_item`, `motivational_nudge`, `goal_suggestion`). Defined as a shared constants file both the chat function-calling schema and any feature writers import — not left to free-text drift.
- **Feature-side writers**: Interview Prep writes its completion event directly (not via the chat) — the chat is one writer/reader among several, not the only path data flows through.
- **Feature-side readers**: Each target feature (Study & Succeed, Explorer, Goal Setter, Resources, dashboard) queries `recommendations where target_feature = self and status = active`. This spec only needs to prove the pattern works end-to-end for one or two target features (Study & Succeed and Explorer, matching the examples above) — wiring every remaining feature is incremental follow-up work, not blocking this spec's completion.
- **System prompt**: Written and stored as its own reviewable file/config (not inlined ad hoc in the function-calling code), so tone iteration doesn't require touching integration logic.

## Testing Decisions

Builds on Spec 1's Vitest + RTL setup.

- Test external behavior, not model output text (LLM responses aren't deterministic — don't assert on exact wording):
  - Sending a message that should trigger `write_recommendation` results in a new row in `recommendations` with the expected `target_feature`.
  - A feature reading `recommendations` renders what's actually in the table (mock the table content, assert the UI reflects it — decouples UI tests from live model calls).
  - The interview-prep completion writer produces an `events` row with the correct `event_type` and payload shape.
  - A failed Gemini API call surfaces the graceful error state, not a silent hang or crash.
- Mock the Gemini API call in unit/component tests; a small number of manual/integration smoke tests against the real API are acceptable for verifying the function-calling contract actually works, but shouldn't run on every CI build against a rate-limited free tier.

## Out of Scope

- Wiring every single feature (Goal Setter, all of Resources, Career Path Planner) into the recommendation-reading pattern — this spec proves the pattern on Study & Succeed and Explorer; the rest is incremental, tracked separately.
- Any paid-tier fallback (Groq, OpenRouter) if Gemini free tier is exceeded — noted as a future item, not built here.
- Graduate-specific chat behavior beyond what the shared context/tooling already supports generically (Spec 3 covers graduate-specific features).
- Content/copy quality of Study & Succeed itself — this spec makes it interlink-aware, it does not fix its underlying content (that's a separate audit per the master plan).

## Further Notes

The system prompt/personality work (story 16) is worth treating almost as its own mini-spec once the plumbing here is proven — "vigilant, intelligent, a friend" is a product/tone decision, not just an engineering one, and deserves deliberate iteration rather than being bolted on as an afterthought to the function-calling work.
