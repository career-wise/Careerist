# 19: Resume Builder — wizard + AI content + persistence

**What to build:** Replace the current free-form manual `ResumeBuilder.tsx` with a fixed-sequence wizard (work/project history → education → skills → achievements) that saves real answers to the new `resumes` table, and uses Groq to turn the student's raw answers into resume-quality bullet phrasing they can then edit.

**Blocked by:** the `resumes` table existing (SQL already provided)

**Status:** ready-for-agent

- [ ] Wizard steps are fixed and identical for every user (not an adaptive/branching interview — that's explicitly out of scope for this ticket)
- [ ] Raw answers at each step are sent to Groq, which returns phrased resume bullets/summary text, shown to the user as an editable draft (not silently auto-applied without the user seeing it)
- [ ] Final structured content (experience/education/skills/projects) saves to `resumes.content` as jsonb, scoped to the authenticated user
- [ ] Reopening Resume Builder loads the existing saved resume instead of starting blank
- [ ] Editing previously-generated content after the AI phrasing step persists the edit (user's edit wins, not overwritten by regeneration)
- [ ] No rendering/PDF work here — that's Ticket 20. This ticket ends with structured, persisted, AI-assisted content

## Out of Scope

- Adaptive/branching interview logic (explicitly decided against — fixed wizard only)
- Visual resume rendering and PDF export (Ticket 20)
