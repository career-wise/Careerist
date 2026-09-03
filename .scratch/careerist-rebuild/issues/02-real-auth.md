# 02: Real auth (signup/login/logout/session)

**What to build:** Replace the mock `lib/auth.ts` with real Supabase email/password auth. A user can sign up, get a real session that survives a page refresh, log out and have it actually clear, and reset a forgotten password.

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] Signup creates a real Supabase auth user + session
- [ ] Session persists across a page refresh
- [ ] Logout clears the session (verified: no way to still act as that user after logout)
- [ ] Password reset flow works end-to-end
- [ ] Clear, non-cryptic error messages on failed signup/login (wrong password, duplicate email, network error)
- [ ] `lib/auth.ts` mock implementation fully deleted, not left as dead code
