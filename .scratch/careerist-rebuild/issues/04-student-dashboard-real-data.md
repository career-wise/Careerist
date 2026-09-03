# 04: Student dashboard reads real profile data

**What to build:** `StudentDashboardHome.tsx` renders from the real saved onboarding answers in `profiles`, not the hardcoded mock `onboardingAnswers` object currently at the top of the file.

**Blocked by:** 03

**Status:** ready-for-agent

- [ ] The hardcoded `onboardingAnswers` object is deleted
- [ ] Dashboard copy/logic (e.g. "Since your goal is to X...") reflects the real saved goal, not a fake one
- [ ] Dashboard renders sensibly for a profile with minimal/skipped onboarding data (no crash on missing fields)
