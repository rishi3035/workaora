# Phase 2 Plan: Accounts, Login and Age-Aware Onboarding

**Status:** Proposed on 22 November 2026, awaiting founder approval. Nothing in this plan has been built.
**What it must do:** `PRODUCT_REQUIREMENTS.md`, Phase 2 section.
**Cost:** ₹0. Every service used here has a free tier that covers development.
**Estimate:** about 3 focused weeks, roughly 6 calendar weeks at ~20 hours a week. To be re-judged after step 2.3, once the real pace is known.
**Builds on:** Phase 1 (complete), `PHASE_0_PLAN.md` §5, decisions D-012, D-014, D-022, D-023, D-035, D-036.

## Why this phase needs extra care

Phase 2 is the first time Workaora handles personal data: email addresses, passwords and dates of birth. It also builds the gate that keeps under-18s out until that is safe and lawful. Mistakes here are the costly kind, so every step ends with tests that try to break the rules.

## What changes for you

- You create up to three free accounts (Google Cloud, Cloudflare, Resend) and add a few records to your domain's settings. I guide each one click by click.
- You review and approve the database changes before they are applied, as in Phase 1.
- For the first time, you will be able to sign up and log in to Workaora on your own computer.

## The design in one page

**Sign-up order (D-046):**

```
1. Date of birth          →  not eligible?  →  polite stop. Nothing stored.
        │ eligible
        ▼
2. Email + password, or Google
        ▼
3. Confirm email (email sign-up only)
        ▼
4. Age checked again by the database   →  not eligible?  →  account deleted.
        ▼
5. Onboarding: name, roles, why here, languages, agreements
        ▼
6. Signed in
```

The age question comes before the email question, so we never collect an email address from someone we then turn away.

**Every account has a status**, and the database only lets an `active` account use the product:

| Status | Meaning | What the account can do |
|--------|---------|-------------------------|
| `pending_age` | Just created; age not yet checked by the database | Only submit a date of birth |
| `onboarding` | Adult confirmed; onboarding not finished | Only complete onboarding |
| `active` | Ready | Use the product |
| `blocked_age` | Failed the age check | Nothing. The server deletes the account at once; this status exists so nothing can happen in the gap. |
| `suspended`, `deleted` | For later phases | Nothing |

Users cannot change their own status or age group. Only database functions can.

**While sign-up for 16–17-year-olds is off, everyone under 18 is refused (D-047).** In Phase 2 the age check does not read the switch at all, so turning the switch on would change nothing. Phase 11 replaces the check with one that sends 16–17-year-olds to guardian consent.

## Steps

Each step ends with acceptance checks, your manual check, updated documents and a commit. Before every commit I run the checks and confirm only the expected files changed.

### 2.1 Login settings, as code

- **What:** set the development project's login rules in `supabase/config.toml` and apply them with the Supabase tool, so the settings are recorded in Git instead of living only in a dashboard.
  - Email confirmation required before an account can be used.
  - Minimum password length 10 (D-052).
  - Changing a password requires a recent login.
  - Allowed return addresses limited to `http://localhost:3000`.
  - Sign-up, login and email sending rate limits reviewed and written down.
- **You do:** approve the settings list before I apply it.
- **Acceptance:** the tool reports no difference between the file and the project. A sign-up with a 9-character password is refused by Supabase itself.
- **To verify at this step:** exactly which settings the tool can apply. Any it cannot are listed for you to set in the dashboard.

### 2.2 Database: accounts, age and consent

- **What:** new migrations, rehearsed locally and reviewed by you before applying.

  | Table | Purpose | Who can read | Who can write |
  |-------|---------|--------------|---------------|
  | `profiles` (minimal) | One row per account: name, why here, city, languages, status, age group | The owner. Other users from Phase 3. | The owner, for name, why here, city and languages only. Status and age group: database functions only. |
  | `age_records` | Date of birth and how it was established | **Nobody** through the app. Staff later, through a logged function. | A database function only |
  | `roles` | The list of professional roles | Everyone | Migrations only |
  | `profile_roles` | Which roles a person chose | The owner. Others from Phase 3. | A database function |
  | `consent_records` | What was agreed to, which version, when, how | The owner | A database function. Never deleted. |

- **Database functions:**
  - `age_eligibility(date)`: answers only "eligible or not" for a date of birth. Used by the first sign-up screen.
  - `complete_age_check(date)`: for a logged-in `pending_age` account. Eligible: stores the date privately and moves the account to `onboarding`. Not eligible: stores nothing and moves the account to `blocked_age`. One attempt only.
  - `complete_onboarding(...)`: checks the input, saves the profile, roles and consents together, and moves the account to `active`.
  - A trigger creates the `profiles` row, as `pending_age`, whenever an account is created.
- **Age rule:** age is counted in whole years on today's date in India (IST). Someone whose birthday is today has had it.
- **Permission tests (new):**
  - A user cannot read any date of birth, including their own.
  - A user cannot change their status or age group.
  - A `pending_age` or `onboarding` account cannot do what an `active` one can.
  - `complete_age_check` cannot be called twice, and cannot be called for someone else.
  - Under-18 dates are refused on the boundary days: the day before an 18th birthday, the birthday itself, and 29 February birthdays.
  - A user cannot read another user's profile, roles or consents.
  - Consent records cannot be edited or deleted.
- **Acceptance:** rehearsal passes; you approve the SQL; migrations apply; all permission tests pass against the development database; `DATABASE_SCHEMA.md` is updated.

### 2.3 Session plumbing

- **What:**
  - `src/proxy.ts`: refreshes the login cookie on each request. This is the piece deferred from Phase 1.
  - One server-side helper that answers "who is logged in, and what is their status?" Every protected page uses it.
  - Routing rules by status: not logged in → login; `pending_age` → date of birth; `onboarding` → onboarding; `active` → the product.
  - The two return addresses Supabase sends people back to: one for email links, one for Google.
  - Log out.
- **Also:** set up Playwright for end-to-end tests, which drive a real browser through whole journeys.
- **Acceptance:** tests show each status is sent to the right place and cannot reach the others' pages by typing the address. Login cookies are not readable by browser scripts where the tools allow it; I will state exactly what is and is not achievable.
- **You'll learn:** what a session and a cookie are.

### 2.4 Sign up with email, and the age check

- **What:** the date-of-birth screen, the email and password screen, the "check your email" screen, the confirmation link, and the not-eligible page.
- **Email in this step:** Supabase's built-in sender. It is for testing only: about 2 emails an hour, and only to addresses in your Supabase organisation, which means yours. That is enough to build and test with.
- **You do:** sign up as yourself and confirm the email.
- **Acceptance:**
  - an adult can sign up and confirm;
  - an under-18 date is stopped at the first screen with nothing stored, checked by looking in the database;
  - an under-18 date given after the account exists gets the account deleted, checked the same way;
  - signing up twice with one email shows the same screen both times;
  - end-to-end tests cover each of these.

### 2.5 Log in, log out, forgotten password

- **Acceptance:** the journeys in requirements R4 and R5 work; wrong details give one identical message; a reset link works once; end-to-end tests cover them.

### 2.6 Onboarding and the signed-in page

- **What:** the onboarding screen, the role and language lists, the draft Terms and Privacy Notice pages with version labels (D-053), consent recording, and a simple signed-in page with the person's name and "Log out".
- **You do:** review the list of roles and languages before it goes into the database.
- **Acceptance:** an account cannot reach the signed-in page without completing onboarding; each agreement is recorded with its version; unticked agreements block completion; end-to-end test covers the journey.

### 2.7 Sign in with Google

- **You do:** create a free Google Cloud project and an OAuth client, and paste its ID and secret into the Supabase dashboard. The secret goes into Supabase only, never into the project files or this chat.
- **What I do:** the "Continue with Google" button and the return handling, including a new Google user who has not given a date of birth.
- **Acceptance:** an adult can sign up and log in with Google; a new Google user is asked for a date of birth before anything else; an under-18 date deletes the account.
- **Note:** while the Google app is in "testing" mode, only Google accounts you list can use it. That is right for now.

### 2.8 Bot protection and abuse limits

- **You do:** create a free Cloudflare account and a Turnstile widget, and paste its secret into the Supabase dashboard.
- **What I do:** add the check to sign-up, login and forgotten-password, and document every rate limit in force.
- **Acceptance:** a sign-up without a valid check is refused by Supabase itself, not just by our screen. Tests use Cloudflare's published test keys.

### 2.9 Real email delivery (Resend)

- **You do:** create a free Resend account, and add the DNS records it gives you to `workaora.co.in` at your domain registrar.
- **What I do:** point Supabase's emails at Resend, and write the confirmation and reset emails in Workaora's voice.
- **Acceptance:** confirmation and reset emails arrive from an `@workaora.co.in` address, at an address outside your Supabase organisation, and are not marked as spam in a Gmail inbox.
- **Limits:** Resend's free plan allows 100 emails a day. Supabase caps a custom sender at 30 emails an hour until raised. Both are fine for development and a closed beta.
- **This step can move to just before closed beta** if you would rather not touch DNS yet (D-054). Nothing else depends on it.

### 2.10 Hardening and review

- **What:**
  - Full run of every test, including a pass through Phase 1's.
  - Accessibility scan of every new screen, in light and dark.
  - Keyboard-only walk through each journey.
  - A review of what lands in logs and error messages, to confirm no email, password or date of birth appears.
  - Clean-up of unfinished sign-ups (D-050): a scheduled job that deletes accounts still `pending_age` or `onboarding` after 7 days.
  - Documents updated: `DATABASE_SCHEMA.md`, `SECURITY_PRIVACY.md`, `TESTING.md`, `ARCHITECTURE.md`, `ENVIRONMENT_SETUP.md`.
- **Acceptance:** the "done" list in `PRODUCT_REQUIREMENTS.md` passes, and you have walked through each journey yourself.

## Phase 2 is complete when

- [ ] Every step's acceptance checks pass.
- [ ] `npm run check`, `npm run test:db`, the end-to-end tests and the production build all pass.
- [ ] GitHub's checks are green.
- [ ] Every "must never happen" item in the requirements has a passing test.
- [ ] The development database holds no leftover test accounts.
- [ ] No secret is in Git, and no personal data is in logs.
- [ ] Documents are updated.
- [ ] **Founder:** you have signed up, logged in, reset a password and tried an under-18 date yourself.
- [ ] **Founder:** you approve moving to Phase 3 (profiles).

## Decisions I need from you

Full text is in `DECISIONS.md`. All are proposed, not final.

| ID | Decision | My recommendation |
|----|----------|-------------------|
| D-046 | Ask for date of birth before email | Yes |
| D-047 | While the switch is off, refuse everyone under 18 with one neutral message, and keep no waiting list for them | Yes |
| D-048 | After a refusal, block retries on that device for 24 hours | Yes, subject to the lawyer |
| D-049 | A self-declared date of birth is the only age check for adults in Phase 2 | Yes for building; the lawyer must confirm before real users |
| D-050 | Delete unfinished sign-ups after 7 days | Yes |
| D-051 | Sign-in methods: email with password, and Google. No phone codes or emailed login links yet. | Yes |
| D-052 | Passwords: at least 10 characters, no forced symbols | Yes |
| D-053 | Show draft Terms and Privacy Notice, labelled as drafts, until a lawyer reviews them | Yes |
| D-054 | Use Supabase's test sender first; move to Resend at step 2.9 or just before closed beta | Your choice on timing |

## Accounts you will create

| Service | Step | Cost | What you paste where |
|---------|------|------|----------------------|
| Google Cloud | 2.7 | Free | Client ID and secret → Supabase dashboard |
| Cloudflare (Turnstile) | 2.8 | Free | Site key → `.env.local` (it is public). Secret → Supabase dashboard. |
| Resend | 2.9 | Free | API key → Supabase dashboard. DNS records → your domain registrar. |

You accept each service's terms yourself. No secret from any of them goes into the project files, Git or this chat. Turn on two-factor login for each.

## What Phase 2 does not include

| Not included | Where it belongs |
|--------------|------------------|
| Sign-up for 16–17-year-olds and guardian consent | Phase 11, after legal sign-off |
| Usernames, pictures, public profiles | Phase 3 |
| Deleting your own account, downloading your data | Phase 8 |
| Two-step login for users | Later; noted as a future option |
| A "remember this device" choice, login from phone codes | Not planned yet |
| Hosting, so anyone else can try it | Closed beta |

## Risks, and how the plan handles them

| Risk | Handling |
|------|----------|
| Someone lies about their age | Cannot be fully prevented with a self-declared date. Recorded honestly; the lawyer decides whether more is needed (A3). The design lets a stronger check be added. |
| A bug lets a refused person keep an account | The status `blocked_age` makes the account useless even if deletion fails; a test covers the gap. |
| A date of birth leaks | It lives in its own table with no read permission for anyone using the app. Tests try to read it as every role. |
| The legal answers change the design | No real user signs up before Gate 2. The age check and the notices are isolated so they can change without touching the rest. |
| Phase 2 takes longer than estimated | Step 2.9 can move later. Steps 2.7 and 2.8 can swap order. Nothing is cut from the safety work. |
| Supabase or Next.js behave differently from what I expect | Both are newer than my training data. I read their current documentation at each step and say so when something differs from this plan. |

## Still outstanding from Phase 0

Interviews, the manual hiring test, the competitor review and the legal consultation are not done (D-039). Phase 2 does not wait for them, but closed beta does.

## Sources checked for this plan (22 November 2026)

- Supabase built-in email limits and custom senders: https://supabase.com/docs/guides/auth/auth-smtp
- Supabase bot protection with Turnstile: https://supabase.com/docs/guides/auth/auth-captcha
- Supabase password rules and leaked-password checking (paid plan only): https://supabase.com/docs/guides/auth/password-security
- Supabase production checklist: https://supabase.com/docs/guides/deployment/going-into-prod
- Next.js 16 request proxy and authentication guides: bundled in `node_modules/next/dist/docs/`
