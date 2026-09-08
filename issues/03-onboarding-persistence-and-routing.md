# 03: Onboarding persistence & persona routing

**What to build:** Onboarding answers save to the real `profiles` table instead of `localStorage`. Dashboard routing after onboarding (and on later logins) is driven by the real saved `persona` field, not a hardcoded default.

**Blocked by:** 01, 02

**Status:** ready-for-agent

- [ ] Completing onboarding as a high-school student saves persona + grade/subjects/goal/clarity fields to `profiles`
- [ ] Completing onboarding as a graduate saves persona + status/field_of_study/looking_for fields to `profiles`
- [ ] Skipping onboarding defaults to `high-school` persona with empty answers, routes to student dashboard, doesn't break
- [ ] `handleOnboardingComplete`/`handleOnboardingSkip` in `App.tsx` branch on the real saved persona, not a hardcoded `/student-dashboard` call
- [ ] A returning user who already completed onboarding skips it entirely and lands on their dashboard
- [ ] Old `localStorage.setItem` onboarding save path fully removed
