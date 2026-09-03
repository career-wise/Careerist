# 05: Real AI chat reply (Gemini, no personalization yet)

**What to build:** `ChatPage.tsx` sends the user's message to a real Gemini API call (via a Supabase Edge Function proxy) and displays the real reply. Kills the fake `setTimeout` canned response and hardcoded seed conversation. No profile/event context assembly yet — that's ticket 06.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Typing a message and sending it produces a real, varying Gemini reply (not a fixed string)
- [ ] "AI is thinking" loading state shown while waiting on the API call
- [ ] A failed API call shows a graceful error message, not a silent hang or crash
- [ ] Gemini API key is not exposed to the client — call is proxied server-side
- [ ] Hardcoded seed conversation removed
