# 11: Graduate dashboard shell + card ordering

**What to build:** The graduate dashboard's default card order reads real `profiles` fields (no resume on file → Resume Builder first; low interview confidence → Interview Practice second; else default order). Explorer and Study & Succeed are confirmed absent from the graduate route tree entirely.

**Blocked by:** 03

**Status:** done

- [x] Card order changes correctly based on the profile fields described above (test at least both trigger conditions)
- [x] Graduate route tree has no Explorer or Study & Succeed routes/nav items — not hidden via a flag, genuinely absent
- [x] Existing `DocumentManager`/Resources section under graduate continues working unregressed
