# Product Requirements

What each feature must do, from the user's point of view. Written phase by phase, just before a phase is built. How it is built is in that phase's plan.

The overall product scope is in `PHASE_0_PLAN.md` §2 (the MVP) and §4 (accounts and journeys). This file adds the detail needed to build and test.

**Status:** Phase 2 section proposed on 22 November 2026, awaiting founder approval.

---

## Phase 2: Accounts, login and age-aware onboarding

### Goal

An adult can create an account, prove they own their email, log in and out, recover a forgotten password, and complete a short onboarding that records who they are professionally and what they agreed to.

Someone who is not old enough is stopped politely, before giving us an email address, and nothing about them is kept.

### Who can have an account in Phase 2

| Age | What happens |
|-----|--------------|
| 18 or over | Can create an account |
| 16 or 17 | Cannot create an account **yet**. Sign-up for this age group stays off until the conditions in D-022 are met, and the guardian consent flow is built in Phase 11. |
| Under 16 | Cannot create an account (D-023) |

Everyone who is not eligible sees the same neutral message. It does not say which age would have been accepted.

### R1. Age check comes first

1. The first sign-up screen asks only for a date of birth. It does not ask for a name or email yet.
2. The screen is neutral: it does not state a minimum age or hint at the "right" answer.
3. A short notice says why we ask, and that the date is not kept if the person is not eligible.
4. If the person is not eligible:
   - they see: "Sorry, we can't create an account for you right now", with a link to more information;
   - nothing about them is stored on our servers;
   - the sign-up form stays unavailable on that device for 24 hours, so the date cannot simply be changed and retried (D-048, subject to legal advice).
5. If the person is eligible, they continue to choose how to sign up.
6. The date of birth is checked again, by the database, once the account exists. The first check is a courtesy; the database's check is the one that counts.
7. A date of birth is stored only for an eligible person, in a private table that no screen and no other user can read. It is never shown publicly and never placed in a web address, a log or analytics.

**Honest limit:** the date of birth is self-declared. A determined person can lie. Whether that is legally sufficient is an open question for the lawyer (`LEGAL_QUESTIONS.md` A3). The system records how each age was established, so stronger checks can be added without redesign.

### R2. Sign up with email and password

1. The person enters an email and a password.
2. Password rule: at least 10 characters. No forced mix of symbols, which research shows pushes people to weaker, reused passwords. The screen shows the rule before they type and says when it is met.
3. A bot check runs without puzzles in most cases (Cloudflare Turnstile).
4. We send a confirmation email. The account cannot be used until the link in it is opened.
5. The "check your email" screen offers to send the email again, with a short wait between tries.
6. **Privacy rule:** the screens never reveal whether an email address already has an account. Signing up with an existing address shows the same "check your email" screen.
7. The confirmation link works once and expires.

### R3. Sign up or log in with Google

1. One button: "Continue with Google".
2. We receive the person's name, email and Google account picture address from Google. We do not use the picture in Phase 2.
3. A new Google user goes through the same age check and onboarding as anyone else. If they skipped the first screen (for example by using the button on the login page), they are asked for their date of birth before anything else.

### R4. Log in and log out

1. Log in with email and password, or with Google.
2. A wrong email or password gives one message, "Email or password is incorrect", whichever was wrong.
3. Repeated failures are slowed down automatically.
4. Staying logged in: the person stays logged in on that device until they log out, or the session expires through inactivity.
5. "Log out" ends the session on that device and returns to the home page.

### R5. Forgotten password

1. The person enters their email. The screen always says "If that address has an account, we've sent a link", whether or not it does.
2. The link opens a screen to set a new password, under the same rule as sign-up.
3. The link works once and expires.
4. After the change, other devices are logged out.

### R6. Onboarding (adults)

Shown once, straight after the first login. Kept short: one screen, under a minute.

| Field | Required | Notes |
|-------|----------|-------|
| Name | Yes | As they want to be known professionally. Any script. |
| What they do | Yes, 1 to 3 | Chosen from a list of roles covering the creator economy, esports and organisations |
| Why they are here | Yes | Looking for work, hiring, or both |
| Languages they work in | Yes, at least 1 | From a list of Indian languages plus English |
| City | No | Free text for now |
| Agreement | Yes | Two separate tick boxes: the Terms, and the Privacy Notice. Neither is pre-ticked. |

1. Each agreement is recorded with what was agreed to, which version, when, and how (D-035).
2. Until onboarding is complete, the person can do nothing else in the product. The database enforces this, not just the screens.
3. After onboarding they land on a simple signed-in page that greets them by name and offers "Log out". Profiles arrive in Phase 3.

**Not in Phase 2:** usernames, profile pictures, headlines, bios and public profile pages. They belong to Phase 3.

### R7. Terms and Privacy Notice

1. Both exist as pages anyone can read without an account.
2. In Phase 2 they are **drafts**, clearly labelled "Draft: not yet reviewed by a lawyer". No real user may sign up until a lawyer has reviewed them (Gate 2).
3. Each has a version label, so we always know which text a person agreed to.

### R8. Every screen

- Works at phone width first, in light and dark, with the keyboard alone, and with a screen reader's labels in place.
- Has a loading state on every button that waits for the server.
- Shows errors next to the field they belong to, saying what is wrong and how to fix it.
- Never shows a raw technical error to the person.
- Passes the automated accessibility scan.

### R9. Things that must never happen

These are tested as "forbidden" cases.

| Must never happen | Enforced by |
|-------------------|-------------|
| A person who is not eligible ends up with a usable account | The database's own age check; the account is deleted |
| A date of birth is readable by another user, or by the person's own browser code | No read permission exists on that table |
| A person changes their own age group or account status | Those columns cannot be changed by users |
| An account that has not finished onboarding uses the product | Database rules require an "active" account |
| A screen reveals whether an email is registered | Identical responses, tested |
| The secret key or a login token reaches the browser | The Phase 1 locks, plus cookie settings |
| Sign-up for 16–17-year-olds turns on by accident | The switch has no effect in Phase 2 at all; under-18s are refused regardless of it |

### What "done" means for Phase 2

All of this works end to end against the development database:

1. An adult signs up with email, confirms it, completes onboarding, logs out, logs in again, and resets their password.
2. An adult signs up with Google and completes onboarding.
3. A person who gives an under-18 date of birth is stopped at the first screen and nothing is stored.
4. A person who slips past the first screen and gives an under-18 date after creating an account has that account deleted.
5. Every forbidden case in R9 is covered by an automated test.

### Open questions for the lawyer that affect this phase

| Question | In `LEGAL_QUESTIONS.md` | Effect if the answer differs from our assumption |
|----------|-------------------------|--------------------------------------------------|
| Is a self-declared date of birth enough for adults? | A3 | A stronger age check would be added to sign-up |
| May we block retries with a 24-hour marker on the device? | A7 | The marker is removed or changed |
| What must the privacy notice say at sign-up, and in which languages? | B1 | The notice text and possibly translations change |
| Is our tick-box agreement to the Terms valid? | C3 | Wording changes |

Phase 2 can be built on the assumptions above because no real user signs up until Gate 2. The answers are needed before closed beta.
