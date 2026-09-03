# 06: Chat context + function-calling tools

**What to build:** The chat's context is assembled from the user's `profiles` row plus recent relevant `events` and active `recommendations` (not full raw chat history). The model gets `write_event` and `write_recommendation` function-calling tools, against a fixed, versioned vocabulary of event/recommendation types.

**Blocked by:** 01, 03, 05

**Status:** ready-for-agent

- [x] Chat references the user's real persona/onboarding answers without the user re-explaining themselves
- [x] A fixed `event_type` and `recommendation.type` vocabulary exists as a shared constants file (not free-text the model invents)
- [x] Mentioning a subject struggle in chat results in a new row in `recommendations` (or `events`, per vocabulary) scoped to the authenticated user
- [x] Context assembly uses recent events/active recommendations + last ~6-10 turns, not the full conversation history replayed every call
- [x] Rate/quota guard around the Gemini free tier with a user-visible message if exceeded (N/A using Groq OSS 120b)
