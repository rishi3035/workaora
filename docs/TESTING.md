# Testing

How Workaora is tested, how to run the tests, and what they do and do not prove.

**Last updated:** 22 November 2026 (end of Phase 1)

## The idea

A feature is not done because its screen exists. It is done when tests prove it works, and prove that what should be refused is refused.

A successful build is not a working product. The build only shows the code compiles.

## The checks

| Check | Command | Needs | What it catches |
|-------|---------|-------|-----------------|
| Everything below marked ✓ | `npm.cmd run check` | Nothing | Run this before saving work to Git |
| ✓ Formatting | `npm.cmd run format:check` | Nothing | Untidy code layout. Fix with `npm.cmd run format`. |
| ✓ Lint | `npm.cmd run lint` | Nothing | Common mistakes, and Workaora's own safety rules |
| ✓ Type-check | `npm.cmd run typecheck` | Nothing | Code that uses data in ways that do not fit together, including misspelt table or column names |
| ✓ Tests | `npm.cmd run test` | Nothing | Behaviour that has changed or broken |
| Database tests | `npm.cmd run test:db` | Internet, `.env.local` | Database permissions that are wrong |
| Production build | `npm.cmd run build` | Nothing | Code that cannot be built, and secret-handling code reaching the browser |

`npm.cmd run check` stops at the first failure. Fix that, then run it again.

GitHub runs `check` and `build` automatically on every upload to `main` and every pull request. The database tests do not run there, because that would mean storing the secret key on GitHub.

## The tests that exist

**In `npm run check`: 71 tests, no network needed**

| File | What it covers |
|------|----------------|
| `src/app/page.test.tsx` | The home page shows its heading and its "in development" notice |
| `src/lib/env/schema.test.ts` | The settings rules: missing, blank, wrongly shaped and misplaced values; a secret in a browser-visible setting; an address with extra parts; error messages never showing a value |
| `src/lib/security-guards.test.ts` | Tripwires: the server-only lock is present, Git ignores `.env` files, the settings template has no values |
| `src/lib/db-test-guard.test.ts` | The database tests refuse any project except the development one |
| `src/ui/ui.test.tsx` | The design system: buttons, fields, checkbox, dialog, toast, avatar initials in several scripts, loading, empty and error states, keyboard use, and an automated accessibility check |

**In `npm run test:db`: 28 tests against the real development database**

| File | What it covers |
|------|----------------|
| `tests/db/connection.test.ts` | The address and keys work, and the publishable key is refused for admin-only requests |
| `tests/db/permissions.test.ts` | Who can and cannot read or change `staff`, `audit_log` and `app_settings`. The full list is in `SECURITY_PRIVACY.md`. |

The database tests create three temporary accounts with `@example.com` addresses and delete them at the end. They never switch sign-up for 16–17-year-olds on. Each run leaves a few permanent entries in the development audit log.

## The kinds of test, and when to use each

| Kind | Use it for | Where it lives |
|------|------------|----------------|
| **Logic test** | A rule or calculation with clear inputs and outputs | Next to the code, as `name.test.ts` |
| **Component test** | A piece of screen: what it shows, how it responds to the mouse and keyboard, what a screen reader is told | Next to the component, as `name.test.tsx` |
| **Tripwire test** | A safety rule that must never be quietly removed | `src/lib/security-guards.test.ts` |
| **Permission test** | Who may read or change data. Always includes the forbidden cases. | `tests/db/` |
| **Accessibility check** | Structure and labelling (automated); contrast (in a real browser) | `src/ui/ui.test.tsx`, and the scan button on the style guide |
| **End-to-end test** | A whole journey in a real browser, such as sign up → create profile → apply | **Not set up yet.** Playwright will be added in Phase 2, with the first real journey. |

## How to read a test

```tsx
test("an ordinary user cannot make themselves staff", async () => {
  const result = await ordinaryUser.client.from("staff").insert({ … });
  expectRefused(result, REFUSED.notAllowed);
});
```

- The sentence in quotes says, in plain language, what must be true.
- The lines inside try it.
- `expect…` states what must happen. If it does not, the test fails and says what happened instead.

## Rules for writing tests

1. **Name the test as a plain sentence** about behaviour, not about code.
2. **Test what a person relies on.** Find things by their label or role ("the button named Save"), the way a user or screen reader would.
3. **For every permission, test the forbidden case**, and check the reason it was refused. A test that passes on any error can hide a typo.
4. **Never use real personal data in a test.** Use made-up values and `@example.com` addresses.
5. **Never put a real key in a test.** Use clearly fake values such as `sb_secret_FAKE-not-a-real-key`.
6. **A test must clean up after itself.**
7. **When a bug is found, write a test that fails because of it first**, then fix it. The bug then cannot come back unnoticed.
8. **Never leave a test switched off or marked `.only`.** The test runner refuses `.only`.

## Before a feature is called done

- [ ] It works end to end against the real development database, not with made-up data
- [ ] `npm.cmd run check` passes
- [ ] `npm.cmd run test:db` passes, with new permission tests for anything it reads or changes
- [ ] Wrong input is refused with a helpful message, in the browser and on the server
- [ ] Loading, empty and error states exist and have been seen
- [ ] It works at phone width, in light and dark, and with the keyboard alone
- [ ] The accessibility scan on its screens finds no issues
- [ ] The founder has checked it by hand
- [ ] The documents are updated and the work is committed

Before each phase ends, run everything again from the top, including a full pass through the earlier features.

## What the tests do not prove

- **That real people can use it.** Only people can show that.
- **That it works on a real phone or with a real screen reader.** Phone width has been checked in a desktop browser only. An automated accessibility scan finds only some problems.
- **That it is secure against a determined attacker.** The tests cover the rules we thought of. An external security review is planned before closed beta.
- **That it is fast under load.** No load testing exists.
- **Whole user journeys.** There are no end-to-end tests yet.
- **The audit log's last line of defence.** The triggers that stop even the database owner editing it were checked in a local rehearsal only.

## When a check fails

1. Read the first failure. Later ones are often caused by it.
2. The message names the file and line, and what was expected against what happened.
3. If a test fails after an intended change, decide which is wrong: the code or the test. Never change a test just to make it pass.
4. If it fails on GitHub but passes on your computer, check that your work is uploaded and that `npm.cmd install` is up to date.
