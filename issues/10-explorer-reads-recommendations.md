# 10: Explorer reads + dismisses recommendations

**What to build:** College & Major Explorer queries `recommendations where target_feature = 'explorer' and status = 'active'` and uses them to re-sort/highlight relevant majors/colleges first. Same dismiss behavior as ticket 09.

**Blocked by:** 06

**Status:** completed

- [x] Discussing a field of interest in chat causes Explorer to surface related majors/colleges at the top on next visit
- [x] Dismissing a suggestion sets its `status` to `dismissed` and stops influencing the sort
