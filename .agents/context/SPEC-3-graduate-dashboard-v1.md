# Spec 3 — Graduate Dashboard v1
`ready-for-agent` (label to apply once published to a tracker — none currently connected for this repo)
**Depends on Spec 1** (schema/auth/onboarding persistence) and benefits from Spec 2 (interlinking) but core dashboard/features can be built with Spec 1 alone; interlink wiring layers on once Spec 2 lands.

## Problem Statement

The graduate side of Careerist is a skeleton: only `dashboard/` and `resources/` exist under `components/graduate/`. There's no Resume Builder, no reused interview prep wiring, no career-path content adapted for graduates, and the previously-drafted plan's "Job Matches" card requires a real jobs data source that isn't a free-tier MVP item. Graduates currently have nothing resembling the guidance the platform promises.

## Solution

Build out `components/graduate/` with four features: Resume Builder (new), Interview Practice (imported/reused from `student/prepareforfuture`, not duplicated), a graduate-adapted Career Path Planner (reframed around switching fields/advancing, not choosing a major), and a Skill Gap tool (target role → what's missing). Job Matches is explicitly cut from v1. Default dashboard card order is driven by onboarding signals already captured in Spec 1's `profiles` schema (no resume on file → Resume Builder first; low interview confidence → Interview Practice second).

## User Stories

1. As a graduate, I want a Resume Builder so I can create/upload and improve my resume within the platform instead of having no resume tooling at all.
2. As a graduate with no resume on file, I want Resume Builder to be the first thing I see on my dashboard, so the platform prioritizes my most urgent gap instead of showing me a generic layout.
3. As a graduate, I want to practice mock interviews using the same interview prep flow students use, so I get the same quality experience without the team building and maintaining two versions of the same feature.
4. As a graduate who reported low interview confidence during onboarding, I want Interview Practice to be prioritized near the top of my dashboard, so the platform responds to what I actually told it.
5. As a graduate, I want a Career Path Planner reframed around switching fields or advancing in my current one, so the tool doesn't talk to me like I'm still choosing a college major.
6. As a graduate targeting a specific role, I want a Skill Gap tool that tells me what I'm missing for that role, so I know concretely what to work on instead of guessing.
7. As a graduate, I want the Explorer and Study & Succeed sections to NOT appear in my dashboard, since those are high-school-specific and irrelevant to someone who's already graduated.
8. As a graduate, I want my existing `DocumentManager`/Resources section to keep working alongside the new features, so this build doesn't regress what already exists.
9. As a product owner, I want "Job Matches" explicitly absent from v1 (not half-built with fake data), so we don't ship a feature that looks broken because there's no real jobs data behind it.
10. As a developer, I want the interview-prep components imported directly from `student/prepareforfuture` rather than copy-pasted into a graduate-specific folder, so a bug fix or improvement doesn't need to be made twice.
11. As a graduate, I want my resume-completeness and skill-gap status to be visible at a glance on the dashboard, so I don't have to open each tool individually to know where I stand.
12. As a product owner, I want the default card ordering logic (resume-first, interview-practice-second, else default order) to read from the real `profiles` fields established in Spec 1, not a hardcoded mock, so it actually reflects the individual graduate.

## Implementation Decisions

- **Folder structure**: `components/graduate/` gains `resume/` (Resume Builder), `career-path/` (adapted planner), `skill-gap/` (new tool). `prepareforfuture/` is NOT duplicated — graduate dashboard imports the existing `InterviewSetup`/`AIInterviewSession`/`InterviewReport` components from `student/prepareforfuture`.
- **Resume Builder**: v1 scope is structured input (sections: experience, education, skills) plus export/download — not AI-generated resume content in this spec (that could be a fast-follow once Spec 2's interlinking is live and could flag gaps automatically).
- **Career Path Planner (graduate variant)**: Reuses the underlying planner component/logic where the mechanics are shared with the student version, but with graduate-specific framing/copy and input questions (current role/field → target role/field, not subject interests → major).
- **Skill Gap tool**: Takes a target role as input, compares against a skills list (can start with a static reference table of common skills per role category — doesn't require a live jobs API, keeping it free-tier-compatible) and produces a gap list. This is intentionally simple in v1; sophistication (dynamic role data) is a later iteration.
- **Job Matches**: Not built. No stub, no placeholder card with fake listings — simply absent from v1 navigation/dashboard.
- **Dashboard card ordering**: `GraduateDashboardHome.tsx` reads `resumeStatus` and `interviewConfidence` (or equivalent fields) from the real `profiles` row (per Spec 1) to determine card order, replacing any hardcoded default.
- **Explorer / Study & Succeed**: Confirmed absent from graduate routes/sidebar — not hidden via a feature flag that could accidentally be turned on, just not present in the graduate route tree at all.

## Testing Decisions

Builds on Spec 1's Vitest + RTL setup.

- Test external behavior:
  - A graduate profile with no resume on file renders Resume Builder as the first dashboard card.
  - A graduate profile with low interview confidence renders Interview Practice as the second card.
  - Interview Practice on the graduate dashboard renders the same underlying component instance/props contract as the student version (proves reuse, not duplication — e.g., a snapshot or prop-shape test rather than duplicating the student test suite).
  - Graduate route tree does not expose Explorer or Study & Succeed routes/nav items.
  - Skill Gap tool given a target role returns a non-empty, role-relevant gap list from the reference table.
- No prior art for Resume Builder/Skill Gap (new components); Interview Practice reuse should be tested by confirming import/composition, not by re-testing interview logic already covered wherever the student version's tests live (or will live, once Spec 2 or a follow-up establishes them).

## Out of Scope

- Job Matches (explicitly cut, revisit only once a jobs data source is budgeted for).
- AI-generated resume content/suggestions (Resume Builder v1 is structured manual input + export only).
- Dynamic/live skill-gap data sourced from a real job-market API (v1 uses a static reference table).
- Full interlinking wiring for graduate features into Spec 2's `recommendations` system beyond what's naturally inherited by reusing student components — deeper graduate-specific interlink logic (e.g., resume gap → chat proactive offer) is Spec 2 follow-up work, not this spec.

## Further Notes

Resume Builder and Skill Gap are the two genuinely new components here — worth prototyping their data shape (what a "resume" and a "skill gap result" look like as records) early, since Spec 2's function-calling tools will eventually need to read/write against those same shapes for the "chat notices a resume gap" interlink to work without a schema mismatch later.
