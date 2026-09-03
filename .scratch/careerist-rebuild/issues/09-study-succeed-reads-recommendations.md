# 09: Study & Succeed reads + dismisses recommendations

**What to build:** Study & Succeed queries `recommendations where target_feature = 'study_succeed' and status = 'active'` and renders them. A user can dismiss a recommendation and it stops reappearing.

**Blocked by:** 06

**Status:** completed

- [x] Mentioning a subject struggle in chat results in a resource suggestion visibly appearing in Study & Succeed
- [x] Dismissing a suggestion sets its `status` to `dismissed` and it no longer renders
- [x] Completing a resource marks the related recommendation `completed` and reflects that in the UI
