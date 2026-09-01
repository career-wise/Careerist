# Careerist — Onboarding Flow v1 Spec
Personas: High School Student (11th/12th) · Graduate

---

## 1. Architecture

Single component, branching after persona selection. Replaces the current generic
3-step version in `frontend/src/components/shared/onboarding/OnboardingFlow.tsx`.

```
Step 0 — Persona select (shared)
   ├── High School track: Steps 1-5 (HS content)
   └── Graduate track: Steps 1-5 (Grad content)
Step 6 — Generating screen (shared, copy varies by persona)
```

State shape:
```ts
interface OnboardingAnswers {
  persona: 'high-school' | 'graduate' | '';
  // high-school fields
  grade?: '11' | '12';
  subjects?: string[];
  clarityLevel?: string;
  hasFieldInMind?: boolean;
  fieldsOfInterest?: string[];
  goal?: string;
  // graduate fields
  status?: string;
  fieldOfStudy?: string;
  lookingFor?: string[];
  resumeStatus?: string;
  interviewConfidence?: string;
  urgency?: string;
}
```

Routing on complete: `high-school` → `/student-dashboard`. `graduate` → `/graduate-dashboard`
(new route + new persona folder — doesn't exist yet, needs scaffolding, see Section 4).

Total steps deliberately kept at 6 (incl. persona pick) — long onboarding kills
completion rate for a 17-year-old on a phone. Every question must change either
the copy or the recommendations they see next; if it doesn't, cut it.

---

## 2. Step 0 — Persona Select (shared)

**Headline:** "Where are you right now?"
**Subhead:** "This changes everything you see next — pick what's actually true today."

Two large cards (reuse the `UserTypes.tsx` card treatment — rounded-3rem, image top,
gradient overlay, bold Clash Display title):

- **Card A:** "I'm in 11th or 12th grade" — "Figuring out what to study and where."
- **Card B:** "I've graduated" — "Looking for a job, internship, or what's next."

No back button on this step (it's the first). Skip button still available (defaults
to `high-school` persona with empty answers if skipped — don't force a persona guess).

---

## 3. High School Track (Steps 1-5)

### Step 1 — Grade
**Headline:** "Which year are you in?"
**Subhead:** "12th graders get more urgent, decision-focused guidance. 11th graders get more room to explore."
- 11th Grade
- 12th Grade

*Why this matters:* a 12th grader is months from applications — the dashboard should
open on "narrow it down now." An 11th grader has runway — dashboard opens on
"explore broadly first." Same data, different framing, and it costs you one tap.

### Step 2 — Subjects / Strengths
**Headline:** "What do you actually enjoy studying?"
**Subhead:** "Not what you're best at on paper. What doesn't feel like a chore."
Multi-select chips: Math · Physics · Biology · Chemistry · Computer Science ·
Economics/Commerce · Languages & Literature · History/Social Studies · Art & Design ·
Sports/Physical Ed

### Step 3 — Clarity Level
**Headline:** "How clear is your path right now?"
**Subhead:** "Be honest — this decides how much hand-holding you get."
Single select:
- "No idea what I want to do"
- "I know the general field, not the specifics"
- "I know the field, torn on college/major"
- "Deciding between 2-3 very different paths"

*This single field is your most important personalization lever* — it should
directly control tone and density of the dashboard home for this user: "no idea"
gets an exploration-first dashboard with the College/Major Explorer front and
center; "torn between paths" gets a comparison-tool-first dashboard.

### Step 4 — Field Interest (conditional)
Only shown if Step 3 ≠ "No idea what I want to do."
**Headline:** "Which fields are you drawn to?"
Multi-select: Engineering & Tech · Medicine & Healthcare · Business & Commerce ·
Law · Arts, Design & Media · Pure Sciences & Research · Humanities & Social Sciences

### Step 5 — Goal Right Now
**Headline:** "What would actually help you most right now?"
Single select:
- "Help me explore options broadly"
- "Help me choose the right degree/major"
- "Help me shortlist the right colleges"
- "Help me start building relevant skills early"

---

## 4. Graduate Track (Steps 1-5)

### Step 1 — Status
**Headline:** "What's your current situation?"
**Subhead:** "This sets your urgency level — no judgment either way."
Single select:
- "Final year — about to graduate"
- "Graduated, actively job hunting"
- "Graduated, employed but looking to switch"
- "Graduated, taking time before deciding next steps"

### Step 2 — Field of Study
**Headline:** "What did you study?"
Searchable select + "Other" free text: Computer Science/IT · Engineering (non-CS) ·
Commerce/Business/Finance · Arts/Humanities · Sciences · Design · Other

### Step 3 — What You're Looking For
**Headline:** "What are you actually looking for?"
**Subhead:** "Pick all that apply."
Multi-select: First full-time job · Internship · Switching fields entirely ·
Freelance/contract work · Still deciding

### Step 4 — Resume & Interview Readiness
Two quick single-selects on one screen (don't burn two full steps on this):
**"Do you have a resume ready?"** — Ready to go / Have one, needs work / Don't have one yet
**"How do you feel about interviews?"** — Confident / Some experience / Never really done one

*This directly drives dashboard prioritization:* "don't have one yet" → Resume
Builder is the first card they see. "Never done an interview" → Interview
Practice gets surfaced immediately, not buried in a menu.

### Step 5 — Urgency
**Headline:** "How soon do you need this to work?"
Single select:
- "ASAP — actively applying now"
- "Within the next 1-3 months"
- "No fixed timeline, just preparing"

---

## 5. Generating Screen (shared component, persona-aware copy)

Reuse the existing spinning-ring + Sparkles animation from current `OnboardingFlow.tsx`
— it's already good, don't rebuild it. Just swap the copy:

- **High School:** "Building your exploration map..." / "Matching your interests to real degree paths and colleges."
- **Graduate:** "Building your job search plan..." / "Prioritizing what to fix first based on where you actually are."

---

## 6. What's Missing in the Codebase to Support This

1. `frontend/src/components/graduate/` — doesn't exist. Needs its own dashboard,
   sidebar, and feature folders mirroring `student/` (dashboard, resources,
   prepareforfuture already fits graduates well; explorer&discover and
   study&succeed are high-school-specific and shouldn't leak into the graduate build).
2. `App.tsx` needs a `/graduate-dashboard/*` route added alongside `/student-dashboard/*`.
3. `OnboardingPage`'s `handleOnboardingComplete` in `App.tsx` currently always
   navigates to `/student-dashboard` regardless of answers — this needs to branch
   on `answers.persona`.
4. `UserTypes.tsx` copy needs updating: "College Students" → "Graduates," and the
   description should match graduate-track framing (job search, not "bridge campus to career").

---

## 7. Antigravity Prompts

Use these as direct prompts. Attach `OnboardingFlow.tsx`, `Button.tsx`, `Input.tsx`,
and `tailwind.config.js` as context each time so it matches existing conventions
instead of inventing new patterns.

### Prompt 1 — Rebuild the onboarding shell with branching
```
Rewrite frontend/src/components/shared/onboarding/OnboardingFlow.tsx to support
two branching persona tracks instead of the current generic 3-step flow.

Requirements:
- Step 0 is a persona picker with two large cards ("11th/12th grade" vs "Graduated"),
  styled like the existing UserTypes.tsx cards (rounded-[3rem], image background,
  gradient overlay, Clash Display headline).
- After persona is picked, branch into a persona-specific step sequence. Use the
  exact copy and options from the attached content spec (Section 3 for high-school,
  Section 4 for graduate).
- Keep the existing visual language: brand-ink/brand-mist/brand-neon/brand-slate
  colors, font-display for headlines, rounded-[2rem] option cards with the
  selected-state pattern already used (bg-brand-ink border, brand-neon dot indicator).
- Keep the existing floating step-counter header and skip button.
- Keep the existing "generating" screen, but make its two lines of copy conditional
  on answers.persona per the spec.
- On complete, call onComplete(answers) where answers includes a `persona` field
  plus all persona-specific fields collected — do not flatten or rename fields.
- Do not change Button.tsx, Input.tsx, or the Tailwind config. Match existing
  patterns exactly rather than introducing new ones.
```

### Prompt 2 — Scaffold the graduate dashboard folder
```
Create frontend/src/components/graduate/ mirroring the structure of
frontend/src/components/student/, with these subfolders only:
- dashboard/ (GraduateDashboard.tsx, GraduateDashboardHome.tsx, GraduateSidebar.tsx)
- prepareforfuture/ (reuse the same interview prep flow the student persona uses —
  do not duplicate the InterviewSetup/AIInterviewSession/InterviewReport components,
  import them from student/prepareforfuture instead)
- resources/ (DocumentManager.tsx — resume/document management, reuse the student
  version's structure but rename references from "study documents" to "resume/cover
  letter documents")

Do NOT create explorer&discover/ or study&succeed/ folders for this persona — those
are high-school-specific and out of scope for graduates in v1.

GraduateDashboardHome.tsx should prioritize its default card order based on
onboarding answers: if resumeStatus is "don't have one yet," Resume Builder is the
first card. If interviewConfidence is "never really done one," Interview Practice
is the second card. Otherwise default order is: Job Matches, Resume Builder,
Interview Practice, Skill Gaps.
```

### Prompt 3 — Fix routing for persona-based dashboard redirect
```
In frontend/src/App.tsx:
1. Add a new route: <Route path="/graduate-dashboard/*" element={<GraduateDashboard />} />
   and import it from ./components/graduate/dashboard/GraduateDashboard.
2. In OnboardingPage's handleOnboardingComplete, branch the navigate() call on
   data.persona: navigate to "/student-dashboard" if persona is "high-school",
   "/graduate-dashboard" if persona is "graduate".
3. Do the same branch in handleOnboardingSkip — default to "/student-dashboard"
   if no persona was picked.
```

### Prompt 4 — Fix UserTypes.tsx copy mismatch
```
In frontend/src/components/shared/landing/UserTypes.tsx, update the second
audience card: change title from "College Students" to "Graduates," and update
the description to focus on job search and interview readiness for people who've
already finished their degree — not campus-to-career bridging. Keep the exact
same visual structure, only change the title and description strings.
```

### What to attach when running these in Antigravity
- Always attach `tailwind.config.js` and one existing "good" component (`Hero.tsx`
  or `UserTypes.tsx`) so it stays inside your visual language instead of drifting.
- For Prompt 2, attach the full `student/` folder so it copies structure, not just guesses.
- Run Prompt 1 first and review the branching logic before running 2-4 — if the
  state shape changes, the later prompts need to match it.
