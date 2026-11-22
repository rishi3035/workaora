# Security and Privacy

What protects Workaora today, how each protection is tested, and what is still missing.

This is an engineering record, not legal advice. Legal questions are in `LEGAL_QUESTIONS.md` and need a qualified Indian lawyer.

**Last updated:** 22 November 2026 (end of Phase 1)

## Where things stand

- **There are no users and no personal data yet.** The development database holds three small tables and no accounts.
- The foundations below exist so that every feature built on top starts from a safe position.
- **No outside expert has reviewed any of this.** An external security review is planned before closed beta (Gate 2).

## Principles

1. **The database decides, not the screen.** Hiding a button is not security. Every permission is enforced in the database.
2. **Deny by default.** A new table starts with no permissions for anyone outside the database. Access is then granted deliberately, one permission at a time.
3. **Private data lives apart from public data**, in separate tables with stricter rules (D-014).
4. **Sensitive actions leave a permanent record** in an audit log that nobody can edit (D-035).
5. **Collect as little as possible**, and say plainly why.
6. **Safety for under-18s is designed in from the start**, and their sign-up stays off until it is legally and technically ready (D-012, D-022).
7. **Prove it with tests that try to break the rules.**

## Secrets

| Secret | What it can do | Where it lives |
|--------|----------------|----------------|
| Supabase **secret key** (`sb_secret_…`) | Skip the database's row rules; create, delete and sign in as any account | `.env.local` on the founder's computer only |
| Supabase **database password** | Full direct access to the database | The founder's password manager only |
| Supabase **publishable key** (`sb_publishable_…`) | Nothing beyond what the database rules allow. Designed to be public. | `.env.local`; later in every visitor's browser |
| GitHub and Supabase logins | Control of the code and the database | Protected by two-factor login |

**Rules**

- Secrets are never committed to Git, never pasted into a chat or screenshot, and never given a `NEXT_PUBLIC_` name.
- `.env.local` holds **development** keys only. Production keys will live only in the hosting provider's settings (D-004).
- GitHub holds no secrets. The automatic checks there need none.
- The AI assistant never needs to see a secret's value. It checks only a value's shape.

**If the secret key may have been exposed** (pasted somewhere, committed, shown on screen):

1. In the Supabase dashboard, go to **Project Settings → API Keys**, create a new secret key and delete the old one.
2. Put the new key in `.env.local`.
3. Run `npm.cmd run test:db` to confirm the new key works.
4. If it was committed to Git, tell whoever maintains the repository. Removing it from history is a separate, careful job, and the key must be replaced regardless.
5. Write down what happened and when.

## Protections in place, and how each is tested

### Secrets cannot reach a browser

| Protection | Tested by |
|------------|-----------|
| Files that use the secret key start with a "server-only" lock. If browser code imports one, the build fails. | Proven once by hand (the build failed with "'server-only' cannot be imported from a Client Component module"). A tripwire test fails if the lock is removed. |
| Screen files (`.tsx`) may not import the admin connection. | Lint rule |
| Only `src/lib/supabase/` may create a database connection. | Lint rule |
| A secret key pasted into a browser-visible setting stops the app at start-up, with advice to replace the key. | Automated test, and proven by hand |
| Git ignores `.env`, `.env.local`, `.env.production`, `.env.development`. | Tripwire test |
| The settings template contains names only, and no secret has a browser-visible name. | Tripwire test |
| Error messages never contain a setting's value. | Automated tests |

### The app refuses to run with bad settings

Missing, blank, wrongly shaped or misplaced settings stop the app at start-up with a plain-language list of what to fix. 24 automated tests cover the rules.

Only Supabase's new key format is accepted; the old `anon` and `service_role` keys are refused (D-040).

### The database protects itself

Every table follows the same pattern: Row Level Security on, all permissions removed, then only the needed ones given back. Changes happen through database functions that check who is asking and write to the audit log. Full details are in `DATABASE_SCHEMA.md`.

The outside roles are: **visitor** (not logged in), **user** (logged in), and **our server** (the secret key).

**Permission test matrix.** Every row is covered by the 25 automated tests in `tests/db/permissions.test.ts`, run against the real development database. A refusal must match the database's own reason code, so a test cannot pass because of a typo.

| Who | Tries to | Expected |
|-----|----------|----------|
| Visitor | Read the staff list | Refused |
| Visitor | Read the audit log | Refused |
| Visitor | Read the switch for 16–17-year-old sign-up | Allowed; the value is `false` |
| Visitor | Change a setting, directly or through the function | Refused; the value stays `false` |
| User | Read the staff list | Sees no rows |
| User | Make themselves staff, directly or through the function | Refused; no staff entry is created |
| User | Read the audit log | Sees no rows |
| User | Write an audit entry, directly or through the function | Refused |
| User | Change a setting, directly or through the function | Refused; the value stays `false` |
| Moderator | Read the staff list | Allowed |
| Moderator | Read the audit log, including the entry for their own appointment | Allowed |
| Moderator | Promote themselves to admin | Refused |
| Moderator | Change a setting | Refused; the value stays `false` |
| Moderator | Edit or delete audit entries | Refused |
| Admin | Change a setting with a reason shorter than 10 characters | Refused |
| Admin | Store a value of the wrong kind in an on/off setting | Refused |
| Admin | Change a setting that does not exist | Refused |
| Admin | Change a setting with a proper reason | Allowed; the old value, new value, reason and admin are logged |
| Admin | Edit or delete audit entries | Refused |
| Our server | Edit or delete audit entries | Refused |
| Our server | Add staff by writing to the table directly | Refused |
| Our server | Grant a staff role with no reason, or with a role that does not exist | Refused |
| Our server | Change a setting | Refused: only a logged-in admin can |
| Our server | Record an audit event | Allowed, but only with a properly named action |
| Our server | Remove a staff member | Allowed; logged with the reason, and their access ends at once |
| Anyone | (final check) Sign-up for 16–17-year-olds | Off |

Three connection tests also confirm that the publishable key is refused for admin-only requests.

### Tests cannot touch the wrong database

The database tests create and delete test accounts. They refuse to run unless `.env.local` points at the registered development project. Seven offline tests cover this guard, including look-alike addresses.

### Development tools cannot reach the live site

Pages named `page.dev.tsx` are left out of production builds entirely. Confirmed by checking that the style guide and the accessibility scanner are absent from the production output.

### The code is checked on every upload

GitHub runs formatting, lint, type-check, tests and a production build on every upload to `main`. The workflow can only read the code, uses no secrets, and its actions are pinned to exact versions.

### Git history is clean

Checked on 22 November 2026 across all 15 commits: the real keys do not appear, no key-shaped text appears, and no `.env` or recovery-code file was ever committed.

## Personal data today

| Data | Stored? |
|------|---------|
| Accounts, emails, passwords | None. Sign-up is not built. Test accounts use `@example.com` addresses and are deleted after each test run. |
| Profiles, portfolios, applications, contact details | None. Not built. |
| Dates of birth, guardian details | None. Not built. |
| Audit log | Entries from test runs only, referring to deleted test accounts |
| Analytics, cookies, tracking | None |

**Services that handle anything today**

| Service | What it holds | Where |
|---------|---------------|-------|
| Supabase | The development database | Mumbai, India |
| GitHub | The source code and documents. No user data and no secrets. | United States |
| Google Fonts | Nothing about visitors. Fonts are downloaded once when the app is built and then served from our own address. | Build time only |

## Protection of under-18s

**Status: sign-up for 16–17-year-olds is switched off, and nothing for minors is built.**

- The switch (`minors_signup_enabled`) is stored in the database, is `false`, and can be changed only by a logged-in admin with a written reason, which is logged.
- Nothing reads the switch yet, because sign-up does not exist. Phase 2 adds the age-aware sign-up that enforces it in the database.
- The switch stays off until all three conditions in D-022 are met: a lawyer has signed off, the guardian consent flow is built and tested, and a security review has covered minors' data.

The full design (guardian consent, privacy defaults, hiring restrictions, contact sharing, no tracking) is in `PHASE_0_PLAN.md` §5.4 and decisions D-022 to D-029. **None of it is built yet.**

## What is missing

Listed honestly so nothing is assumed to exist.

| Gap | Planned for |
|-----|-------------|
| External security review | Before closed beta (Gate 2) |
| Legal review of privacy notice, terms, minors, intermediary duties | `LEGAL_QUESTIONS.md`; scoping consult at Gate 1, full review at Gate 2 |
| Sign-up protections: bot check, rate limits, email verification | Phase 2 |
| Private profile data, consent records, contact-sharing controls | Phases 3 and 6 |
| Safe image uploads (file checks, removal of location data) | Phase 4 |
| Reporting, blocking, moderation tools and runbooks | Phase 8 |
| Browser security headers (for example a Content Security Policy) | Phase 10, before any hosting |
| Error monitoring that hides personal data | Phase 10 |
| Backups and a tested restore | With the production database (closed beta) |
| Automatic updates for packages with known security problems | Not set up. `npm audit` reported 0 known vulnerabilities on 22 November 2026. |
| Blocking a failing upload to `main` | Needs a paid GitHub plan for private repositories. Today the checks report after the upload. |
| The triggers that stop even the database owner editing the audit log | Checked in a local rehearsal only, not by the automated tests |
| Tests with a real screen reader and on a real phone | Phase 10 |

## Rules for every future feature

Before a feature is called done:

1. Every new table has Row Level Security on, permissions removed, and only the needed ones granted back.
2. Private fields are in a separate table from public ones.
3. There is a permission test for each role that tries the forbidden action and checks the reason it was refused.
4. Input is checked on the server with the same rules as in the browser, and the database has its own constraints.
5. Sensitive actions write to the audit log.
6. The feature's effect on under-18s has been considered and written down.
7. This document and `DATABASE_SCHEMA.md` are updated.
