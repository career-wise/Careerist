# Careerist — Master Plan
*Zypher Software Solutions LLP — v1 (replaces all prior planning docs)*

**Supersedes:** `README.md`, `note.txt`, `# CareerWise Restructured Directory Plan.ini`, `careerist-onboarding-spec.md`.
**Kept, not superseded:** `i2u- Careerist.pdf` — this is your 19th ASCII I²U-2025 contest submission (Amal Jyothi College). It's a historical record, not a planning doc. Leave it in the repo untouched.

Delete the four superseded files once this doc is merged in. Everything useful from them (persona split, onboarding question flow, folder conventions) has been carried forward below.

---

## 1. What Careerist Is (v1 scope)

An AI career guidance platform for two personas — **high-school students (11th/12th)** and **graduates**. MVP: build for free/near-free, prove it's useful, monetize only if there's real pull. "Working professional" and "entrepreneur" personas are deferred but the architecture below is built so adding a third persona later is a config change, not a rewrite.

The one thing that makes this an actual product instead of a UI shell: **every feature reads and writes to a shared user state**, so the AI buddy and every dashboard feature are aware of each other. Section 3 is the core of this document — everything else supports it.

---

## 2. Architecture (free-tier MVP stack)

| Layer | Choice | Why |
|---|---|---|
| Frontend | Existing React/Vite/TS app | Already built, keep it |
| Backend/DB | **Supabase** (Postgres + Auth + Storage + Row Level Security) | Already a listed dependency, generous free tier, no server to host/maintain |
| AI | **Google Gemini API** (free tier, Flash model) | Best no-card standing free tier for reasoning/conversational quality; long context; good enough for career-guidance chat at MVP volume |
| State (client) | Zustand (already installed, currently unused) | Local cache/session layer only — **Supabase is the source of truth**, Zustand just avoids refetching on every navigation |

Do not build a custom FastAPI backend for v1. It means self-hosting somewhere with free-tier cold starts (Render/Railway), plus you'd be building auth/DB from scratch that Supabase gives you free. Not worth it at this stage.

**Privacy note for later:** Gemini's free tier trains on submitted prompts by default. Fine for MVP testing; if this scales with real student PII, budget for the paid tier or strip identifying details before sending prompts.

---

## 3. The Interlinking Model (this is the actual product)

Your instinct is right: it's not just "chat mentions a course → show it in explorer." It's **any feature detecting a signal about the user should be able to change behavior in any other feature.** Your interview-confidence example is exactly the pattern — a bad mock interview should make the chat proactively supportive, not wait for the user to bring it up.

### The mechanism

Three Supabase tables carry the entire system. This is deliberately simple — not a message queue, not a vector DB, just relational tables an LLM can read from and write to via function calling.

**`profiles`** — one row per user. Persona, onboarding answers, current goals summary, derived traits (confidence_level, engagement_level, etc.) that get updated over time, not just captured once at onboarding.

**`events`** — append-only log. Every meaningful action anywhere in the app writes a row: `{ user_id, event_type, payload, feature_source, created_at }`. Examples: `interview_completed_low_confidence`, `goal_created`, `goal_missed_deadline`, `resource_viewed`, `major_shortlisted`, `resume_gap_detected`, `chat_expressed_frustration`.

**`recommendations`** — structured, actionable suggestions: `{ user_id, type, payload, source_feature, target_feature, status }`. Type examples: `course`, `resource`, `action_item`, `motivational_nudge`, `goal_suggestion`. Status: `active | dismissed | completed`.

**How a feature "talks" to another feature:**
1. A feature event happens (mock interview scored, low confidence signal detected) → writes to `events`.
2. Chat, on next open, pulls: profile + last N relevant events + active recommendations as context (not the entire raw chat history — that's expensive and unnecessary). It sees the low-confidence event and can proactively say something supportive and offer a targeted drill.
3. If chat (or any feature) decides on an action — "practice a follow-up drill," "check out this resource" — it writes a row to `recommendations` via function calling, tagged with which feature should surface it.
4. The target feature's dashboard queries `recommendations` where `target_feature = self` and `status = active`. It doesn't call the LLM to "remember" anything — it just reads the table.

This is deterministic and cheap (no LLM call needed just to render a dashboard card), and it's the only way this scales past 2 features without turning into spaghetti.

### Concrete interlink map (your job, thought through)

| Trigger (writes event) | Feature | What gets written | Who reads it → what happens |
|---|---|---|---|
| Mock interview scored low on confidence | Interview Prep | `event: interview_completed_low_confidence` | Chat opens next with supportive framing + specific tip; Goal Setter suggests "2 more practice interviews this week"; Dashboard shows a gentle nudge card |
| User mentions struggling with a subject in chat | Chat | `recommendation: resource (target: study_succeed)` + `event: subject_struggle` | Study & Succeed surfaces targeted technique/resource for that subject; Goal Setter offers a study goal |
| User shortlists/discusses a field of interest | Chat or Explorer | `recommendation: course/major (target: explorer)` | Explorer re-sorts to surface that field first; Career Path Planner weights suggested paths toward it |
| User sets a goal | Goal Setter | `event: goal_created` | Chat references it in later conversations unprompted ("how's [goal] going?"); Interview Prep suggests drills aligned to it if relevant |
| Resume has gaps (grad) | Resume Builder | `event: resume_gap_detected` | Chat offers to help fill it; Skill Gap tool flags it against target role |
| User picks a target career path | Career Path Planner | `event: path_selected` | Explorer filters by that path; Resources surfaces path-specific material; Chat tone biases toward it |
| Resource marked complete | Resources | `event: resource_completed` | Related `recommendation` auto-marked `completed`; dashboard progress updates; chat won't re-suggest it |
| Chat detects frustration/low confidence generally | Chat | `event: chat_expressed_frustration` | Dashboard surfaces encouragement; future chat sessions open warmer, not just transactional |

This table is the backbone — every new feature you build should ask "what event does this write, and what recommendation could it produce for another feature."

---

## 4. Feature Audit (what exists vs. what should exist)

Based on actually reading the current code, not assuming.

| Feature | Current state | Verdict |
|---|---|---|
| `lib/auth.ts` | Fully mocked, writes fake user to `localStorage`, no real backend | **Rebuild** — real Supabase auth |
| Onboarding flow | Well-designed question flow, branches by persona, but answers only go to `localStorage` and are never read by dashboards | **Keep the flow/copy, rebuild persistence** — write to `profiles` table |
| `ChatPage.tsx` | 100% hardcoded seed conversation + fake `setTimeout` canned reply, zero LLM calls | **Full rebuild** — real Gemini integration + function-calling to `events`/`recommendations` |
| `StudentDashboardHome.tsx` | Hardcoded fake `onboardingAnswers` object, ignores real profile entirely | **Rebuild** — must read from `profiles`/`recommendations`, not mock data |
| College & Major Explorer | Not yet audited line-by-line | **Audit next pass** — likely keep the concept, but data source needs to become recommendation-driven instead of a static list |
| Study & Succeed | Content quality unconfirmed by you — this was your explicit concern | **Dedicated content pass required** — don't guess at this in this document; needs its own audit session once architecture is in place |
| Goal Setter | Exists, isolated (no event writing) | **Keep concept, make interlink-aware** per Section 3 |
| Interview Prep / Mock Interview | Exists for student; spec correctly says reuse for graduate (don't duplicate) | **Keep, extend**: add event-writing on session completion (confidence score, weak areas) |
| Career Path Planner | You said this one's solid | **Keep, extend to graduate persona** with job-switch/advancement framing instead of major exploration |
| Resources (`DocumentManager.tsx`, graduate side) | Exists, isolated | **Keep, make interlink-aware** (surfaced by recommendations, not just static browsing) |
| Zustand | Installed, unused everywhere | **Start using it** — client-side cache of profile/session, not source of truth |

---

## 5. Graduate Dashboard — Final v1 Scope

Per your call to cut Job Matches (needs a real jobs data source/API — not a free-tier MVP item, revisit in v2 once there's traction to justify the cost):

- **Resume Builder** — new
- **Interview Practice** — reused from student `prepareforfuture/` (already the spec's plan, don't duplicate components)
- **Career Path Planner (grad-adapted)** — reframed for switching fields / advancing, not choosing a major
- **Skill Gap Tool** — new: target role → what's missing, feeds off the same `recommendations` mechanism
- Explorer and Study & Succeed stay high-school-only, as originally scoped — correct call, don't leak them into graduate.

Default card order on `GraduateDashboardHome`: if no resume on file → Resume Builder first; if `interview_confidence` signals low → Interview Practice second. Otherwise default order. (This logic already existed in the old spec — carried forward, not reinvented.)

---

## 6. Build Order

1. **Supabase setup** — schema for `profiles`, `events`, `recommendations`; real auth wiring (kills `lib/auth.ts` mock)
2. **Onboarding → Auth → DB** — hook the flow directly to Supabase inserts
3. **Real chat** — Gemini integration + function-calling to write `events`/`recommendations` (kills the fake `setTimeout` reply)
4. **Student dashboard → real data** — read from `profiles`/`recommendations`, kill hardcoded mock object
5. - [x] **06: Chat Context & Function Calling** (Feeds persona and history to LLM; allows LLM to insert recommendations).
   - [x] **07: Interview Prep writes completion event** (Captures signals for dashboard).
   - [ ] **08: Student Dashboard Real Data** (Reads events, progress, recommendations).
6. **Graduate dashboard build-out** — Resume Builder, Skill Gap, reused Interview Prep, adapted Career Path Planner
8. **Cross-feature wiring** — Goal Setter, Resources, Interview Prep event hooks per Section 3's map
9. **Docs cleanup** — delete the four superseded files, this doc becomes the living reference, update it as you build (don't let it rot back into a stale artifact)

---

## 7. Open Items (not resolved here, need a follow-up pass)

- Study & Succeed content — needs its own dedicated audit once you're ready; don't want to fabricate "proper content" without going through it deliberately.
- College/Major Explorer — needs the same line-by-line read the other features got in Section 4.
- Exact Gemini prompt/system design for the chat buddy's personality ("vigilant, intelligent, a friend") — worth its own pass once the function-calling plumbing exists.
