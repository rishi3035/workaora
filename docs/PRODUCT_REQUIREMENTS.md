# Workaora: Product Requirements Document (PRD)

| | |
|---|---|
| **Purpose** | Turn the business requirements (`BRD.md`) into a product experience and requirements that can be built and tested. |
| **Date** | 22 November 2026 |
| **Version** | 2.0. Replaces version 1.0, which covered Phase 2 only. Its nine requirements are kept; Appendix A shows where each went. |
| **Status** | **Draft for founder review. Not approved.** No implementation starts until the founder approves this document and the BRD. |
| **Source of truth** | `DECISIONS.md` (D-001 to D-054), `PHASE_0_PLAN.md` v2.2, `LEGAL_QUESTIONS.md`. Where this document disagrees with them, they win. |

**How to read the status of what is written here**

| Label | Meaning |
|-------|---------|
| **Approved** | Accepted by the founder. A decision number or plan section is cited. |
| **Proposed** | A recommendation awaiting approval. This includes the detailed acceptance criteria below, unless a decision is cited. |
| **Assumption** | Believed but not tested |
| **Unresolved** | Open; nobody has decided or found out |
| **To be decided (engineering)** | A technical limit that needs measurement or a deliberate choice |

**No user research exists.** Personas, journeys and priorities below are reasoned from the founder's brief and approved decisions, not from observed users.

**Under-18s.** The architecture supports users aged 16 and over (D-012), and every safeguard in D-022 to D-029 is carried into this document. Sign-up for 16–17-year-olds is **off**, and nothing here assumes it is legally cleared.

---

## 1. Product overview

### 1.1 What the product is

A website, designed for phones first, where:

- a professional builds a **work-first profile and portfolio**;
- a creator or organisation **posts an opportunity** and reviews applicants by their work;
- contact details are shared **only by the applicant's explicit choice**;
- past collaborations can be **confirmed by the other party**;
- everyone can **discover** people, organisations, work and opportunities, and **follow** what interests them.

### 1.2 Product goals

Each traces to a business goal in the BRD (section 19.4 has the full table).

| ID | Product goal | BRD goal |
|----|--------------|----------|
| PG1 | A hirer can go from "I need someone" to a shortlist of relevant, comparable candidates quickly | G1, G3 |
| PG2 | A professional can build a portfolio worth sharing in minutes | G2 |
| PG3 | People can find relevant people and opportunities without knowing anyone | G1, G5 |
| PG4 | Nobody's private details are exposed without their choice, and scams are stopped before they reach applicants | G4 |
| PG5 | Under-18s, once enabled, are protected by default at every step | G4 |
| PG6 | The product stays cheap to run and simple to operate | G6 |
| PG7 | What happens in the product can be measured without tracking under-18s | G7 |

### 1.3 Non-goals

Approved exclusions from the first release (D-006, D-001, D-015, `PHASE_0_PLAN.md` §2.3): communities; direct messaging; free-text posts and comments; native apps; video hosting; payments and subscriptions; CV or PDF uploads; two-way connections; login by phone code; real-money gaming listings (D-019).

The product is also not, for now: a brand–influencer deal marketplace, a contracts or escrow service, a general social network, or an analytics tool for creators.

### 1.4 Relationship to the BRD and other documents

| Document | Answers |
|----------|---------|
| `BRD.md` | Why, for whom, how success is judged, what is unknown |
| This PRD | What the product must do, in testable terms |
| `PHASE_n_PLAN.md` | How and in what order each part is built |
| `DATABASE_SCHEMA.md`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `SECURITY_PRIVACY.md`, `TESTING.md` | What has actually been built |

### 1.5 Where the build stands

Phase 1 (foundation) is complete. **None of the requirements below is built.** The Phase 2 plan covers the Accounts and Onboarding requirements and awaits approval.

---

## 2. Personas and jobs to be done

Personas are hypotheses (BRD section 8.2). A "job" is what the person is trying to get done, in their words.

### A. A creator or influencer seeking collaborators

| | |
|---|---|
| **Jobs** | "When I need an editor, designer or writer, help me find someone reliable fast." · "Let me judge their work without a long back-and-forth." · "Let me do this again next month without starting over." |
| **Success** | A shortlist of relevant people within days; a hire; coming back to post again |
| **Fears** | Wasting time on poor applicants; being flooded; looking unprofessional |
| **In the product** | Creates an organisation page for their channel (D-011), posts opportunities, reviews applicants, requests contact, confirms collaborations. Also has their own professional profile. |

### B. An editor or creative professional seeking work

| | |
|---|---|
| **Jobs** | "Give me one link that shows my best work." · "Show me real opportunities that fit what I do." · "Let me prove I really worked with the people I say I did." · "Don't expose my phone number to strangers." |
| **Success** | A portfolio they are proud to share; applications that get answers; confirmed collaborations |
| **Fears** | Scams; being ghosted; unpaid "test" work; their details being harvested |
| **In the product** | Builds a profile and portfolio, sets availability and an optional starting rate, searches and applies, chooses what contact details to share, requests confirmations |

### C. A creator or team seeking to find or replace a collaborator

| | |
|---|---|
| **Jobs** | "Let me compare several candidates against the same criteria." · "Let my colleague help review." · "Let me find people directly, not only wait for applications." |
| **Success** | A confident decision; a record of who decided what |
| **Fears** | A bad hire; losing track of candidates |
| **In the product** | An organisation with several members and roles, a pipeline per opportunity with status history, talent search |

### D. An esports player or team exploring opportunities

| | |
|---|---|
| **Jobs** (player, coach, analyst, caster) | "Give me a credible record of what I've achieved." · "Tell me about tryouts and roles." |
| **Jobs** (team or organiser) | "Help me find players and staff I can trust." |
| **Success** | A profile that reads as serious; hearing about relevant tryouts |
| **Fears** | Not being taken seriously; fake organisations; for younger players, unsafe contact |
| **In the product** | Roles such as player, coach, analyst and caster; achievements as portfolio items; links to match recordings; team history in experience; "tryout" as an opportunity type; following esports organisations |
| **Gap** | Game-specific fields (game, in-game role, rank) are **not** in the approved first release. They are a possible extension if esports validation is strong (`PHASE_0_PLAN.md` §4.3). See FR-PRO-11. |
| **Age** | Many esports people are under 18. Until 16–17-year-olds are enabled, they cannot have accounts. |

### E. A brand looking for creator collaborations

| | |
|---|---|
| **Evidence** | Only the founder's segment list. The approved plan advises against building brand–creator deal-making now (`PHASE_0_PLAN.md` §1.4). |
| **Supported in the first release as** | An organisation of type "brand" that posts an opportunity and reviews applicants, like any other organisation. |
| **Not supported** | Campaign briefs, creator audience data, rate cards for sponsored posts, contracts, payments. |
| **Recommendation (proposed)** | Keep it this way until interviews show a concrete need (BRD section 16.1). |

### Also served

- **A parent or guardian** of a 16–17-year-old: "Let me understand what my child is doing here, approve it, and stop it if I need to." (D-024)
- **A moderator**: "Show me what needs a decision, in order of urgency, and keep a record of what I did."

---

## 3. User journeys

Each step names the requirement that delivers it. Requirements are in section 5.

### 3.1 Landing, sign-up, onboarding and profile creation (all personas)

| Step | What happens | Requirement |
|------|--------------|-------------|
| 1 | Arrives on the home page, or on a shared profile or opportunity link, which can be read without an account | FR-PRO-02, FR-OPP-03 |
| 2 | Chooses "Create account". Gives a date of birth first. | FR-ACC-01 |
| 3 | Signs up with email and password, or Google; confirms the email | FR-ACC-03, FR-ACC-04 |
| 4 | Completes onboarding: name, roles, why they are here, languages, agreements | FR-ONB-01, FR-ACC-09 |
| 5 | Lands on their own profile with a clear list of what to add next | FR-PRO-01, FR-PRO-10 |
| 6 | Picks a username, adds a headline, bio, picture, skills, availability, an optional starting rate and links | FR-PRO-01 to FR-PRO-07 |
| 7 | Optionally adds private contact details, which nobody can see | FR-PRO-08 |

### 3.2 Building a work-first portfolio (personas B, D; also A)

| Step | What happens | Requirement |
|------|--------------|-------------|
| 1 | Chooses "Add work" | FR-POR-01 |
| 2 | Gives a title, their role on the project, a category and skills, and a description | FR-POR-01 |
| 3 | Adds media: uploads images, and/or pastes a link to a video hosted elsewhere | FR-POR-02, FR-POR-03 |
| 4 | Or adds an achievement: what, where, when, with a link as proof | FR-POR-04 |
| 5 | Reorders items, hides one, edits or deletes | FR-POR-05 |
| 6 | Optionally asks the person or organisation they worked with to confirm it | FR-CRD-01 |

### 3.3 Discovering and evaluating (personas A, C, D; also B)

| Step | What happens | Requirement |
|------|--------------|-------------|
| 1 | Opens "Discover" and chooses people, organisations, work or opportunities | FR-DIS-01, FR-OPP-03 |
| 2 | Filters by role, skill, language, availability, location or remote, opportunity type | FR-DIS-01, FR-DIS-02 |
| 3 | Opens a profile; sees the portfolio first, then experience, skills and confirmed collaborations | FR-POR-06, FR-PRO-02 |
| 4 | Follows the person or organisation to see their new work and opportunities | FR-FOL-01, FR-FOL-02 |

### 3.4 Posting an opportunity and hiring (personas A, C, E)

| Step | What happens | Requirement |
|------|--------------|-------------|
| 1 | Creates an organisation page for the channel, team or company | FR-ORG-01 |
| 2 | Optionally invites a colleague | FR-ORG-02 |
| 3 | Posts an opportunity from a template | FR-OPP-01 |
| 4 | If the organisation is new, the first listing waits for review | FR-OPP-02 |
| 5 | Applications arrive, each with chosen portfolio items | FR-APP-01, FR-APP-03 |
| 6 | Shortlists some; requests contact details | FR-APP-03, FR-CON-01 |
| 7 | Sees only what each applicant chose to share; contacts them outside the product | FR-CON-02 |
| 8 | Marks one as hired; closes the opportunity | FR-APP-03, FR-OPP-04 |
| 9 | Later confirms a collaboration when asked | FR-CRD-01 |

### 3.5 Finding and applying for work (personas B, D)

| Step | What happens | Requirement |
|------|--------------|-------------|
| 1 | Browses or searches opportunities | FR-OPP-03, FR-DIS-02 |
| 2 | Opens one; sees pay if given, the organisation and its trust level | FR-OPP-03, FR-ORG-03 |
| 3 | Applies with a short note and up to three portfolio items | FR-APP-01 |
| 4 | Tracks the status; is notified of changes | FR-APP-02, FR-NOT-01, FR-NOT-02 |
| 5 | Receives a contact request; chooses exactly which details to share, or declines | FR-CON-02 |
| 6 | Can withdraw the application or the shared details at any time | FR-APP-02, FR-CON-03 |

### 3.6 Initiating and managing a connection or conversation

**There is no in-product conversation in the first release.** Direct messaging is excluded (D-006), and following is one-way with no "connection requests" (D-008). A connection is made in three ways:

| Way | How | Requirement |
|-----|-----|-------------|
| Follow | One click; no approval needed; the other person is told | FR-FOL-01 |
| Apply | Through an opportunity | FR-APP-01 |
| Share contact | After a shortlist and a contact request, by the applicant's choice | FR-CON-01, FR-CON-02 |

**Gap this leaves (flagged, unresolved):** a hirer who finds someone through search has no way to reach them unless that person has put a public link on their profile, or the hirer posts an opportunity and they apply. Options and a recommendation are in section 10.4.

### 3.7 Reporting, blocking, moderation and account management (all personas)

| Step | What happens | Requirement |
|------|--------------|-------------|
| 1 | Reports a profile, portfolio item, opportunity or organisation, with a reason | FR-SAF-01 |
| 2 | Blocks a person | FR-SAF-02 |
| 3 | A moderator reviews, acts and records the action | FR-SAF-03 |
| 4 | Changes privacy and notification settings, password | FR-PRV-03 |
| 5 | Asks for a copy of their data, a correction, or raises a grievance | FR-PRV-02 |
| 6 | Deletes their account | FR-PRV-01 |

### 3.8 A 16–17-year-old and their guardian (built, switched off until D-022's conditions are met)

| Step | What happens | Requirement |
|------|--------------|-------------|
| 1 | Gives a date of birth; the account is created as "waiting for a guardian", invisible and unusable | FR-MIN-01 |
| 2 | Gives a guardian's email; the guardian gets an explanation and a link | FR-MIN-01 |
| 3 | The guardian creates their own adult account, is verified as an adult, accepts the terms for the minor and consents purpose by purpose | FR-MIN-01 |
| 4 | The account activates with protective defaults | FR-MIN-02 |
| 5 | The minor applies only to opportunities marked open to 16–17-year-olds by a verified organisation; the guardian is told | FR-OPP-05, FR-MIN-03 |
| 6 | A contact request needs the guardian's approval, and only email can be shared | FR-CON-02, FR-MIN-03 |
| 7 | The guardian can see settings and applications, and can withdraw consent, which pauses the account | FR-MIN-03 |
| 8 | At 18, the account becomes an adult account and the guardian's control ends | FR-MIN-04 |

---

## 4. Scope

### 4.1 Recommended first release

This is the approved MVP (`PHASE_0_PLAN.md` §2.2), restated. Nothing is added or removed.

| # | Area | In the first release | Build phase |
|---|------|----------------------|-------------|
| 1 | Accounts | Sign-up, login, reset, verification, Google, bot protection | 2 |
| 2 | Age-aware onboarding | Age check, account status, onboarding, consent records | 2 |
| 3 | Profiles | Fields, privacy settings, public page with link preview | 3 |
| 4 | Portfolio | Work and achievements; images uploaded; video by link | 4 |
| 5 | Organisations | Pages, members, invites, trust levels | 5 |
| 6 | Opportunities | Post, review queue, scam holds, browse | 5 |
| 7 | Applications | Apply, track, pipeline, status history | 6 |
| 8 | Contact sharing | Request, field-by-field consent, withdrawal, logging | 6 |
| 9 | Discovery | Search and filters for people, organisations, work and opportunities | 7 |
| 10 | Follow and feed | Follow, feed of work and opportunities, "Appreciate" | 7 |
| 11 | Notifications | In-app and email | 6 |
| 12 | Safety and privacy | Report, block, moderation, audit log, deletion, data requests, guidelines | 8 |
| 13 | Confirmed collaborations | Request, accept, decline, revoke, dispute. **May move to version 1.1** (D-010). | 9 |
| 14 | Under-18 support | Guardian consent and all safeguards. **Built; switched off until D-022 is satisfied.** | 11 |

**Why this is lean enough**

- It contains one loop only: show work → post an opportunity → apply → share contact → hire → confirm. Every item either is a step in that loop or protects people while it happens.
- The three most expensive things a social product can build (chat, comment moderation, video hosting) are excluded (D-006, D-015).
- It runs on one app and one managed backend, on free tiers while being built (D-002, D-003).

**Why it is still a lot.** For a solo founder building part-time, it is roughly 35 to 40 focused weeks (`PHASE_0_PLAN.md` §6). If time must be saved without harming safety, the approved order of cuts is: confirmed collaborations to version 1.1 first (D-010). **Proposed further candidates, not approved:** the feed's "Appreciate" reaction, the profile completeness indicator (FR-PRO-10), and the rate filter (FR-DIS-04).

### 4.2 Later scope (not approved; each needs evidence first)

| Item | Earliest | Trigger |
|------|----------|---------|
| Direct messaging, with under-18 restrictions built in (`PHASE_0_PLAN.md` §5.9) | Version 2 | Validated need that contact sharing does not meet |
| Communities | Version 2 | A need existing community tools do not meet |
| Free-text posts and comments | Version 1.1 or later | Users ask, and moderation capacity exists |
| Saved opportunities, saved people, recruiter filters, team directories, profile analytics | Phase 2 of the roadmap in the founder's brief | Usage |
| Game-specific esports fields | With or after Phase 3 | Esports interviews (FR-PRO-11) |
| Profile pictures for organisations beyond a logo; richer media | Later | Usage |
| Native apps | Later | Heavy phone use and demand (D-001) |
| Video hosting | Phase 4 | Paying demand |
| Paid tiers, featured opportunities | Phase 3 | Usage and tested willingness to pay |
| Brand collaboration marketplace, contracts, payments, escrow | Phase 3 or 4 | Evidence, plus legal and operational readiness |
| Matching and recommendations | Phase 4 | Enough data to be better than simple filters |
| Two-step login | Later | Before staff moderate real users, for staff accounts |

### 4.3 Explicit exclusions

Section 1.3. In addition: no follower counts as a ranking signal on their own (section 9.3); no public age; no public display of phone, email, school or precise location for under-18s (D-025).

---

## 5. Functional requirements

### 5.1 Conventions

- **ID:** `FR-AREA-NN`.
- **Priority:** **Must** (in the approved first release); **Should** (in the first release but may move to 1.1); **Could** (proposed, not approved); **Later** (excluded for now).
- **Phase:** the build phase in `PHASE_0_PLAN.md` §6.
- Scope membership is **approved** (`PHASE_0_PLAN.md` §2.2). The acceptance criteria are **proposed** unless a decision is cited.
- Every requirement inherits the common criteria in section 5.2.

### 5.2 Criteria common to every requirement

| ID | Applies to every screen and action |
|----|-----------------------------------|
| C1 | Works at 360px width without sideways scrolling, in light and dark |
| C2 | Works with the keyboard alone; focus is always visible |
| C3 | Every control has a label a screen reader can announce; the automated accessibility scan finds no issues |
| C4 | Every action that waits for the server shows a loading state and cannot be triggered twice |
| C5 | Every list has a loading, an empty and an error state |
| C6 | Input is checked in the browser and again on the server; the database has its own constraints |
| C7 | Errors say what is wrong and how to fix it, next to the field; no technical error text is shown |
| C8 | Permissions are enforced by the database, and an automated test tries the forbidden action for each role |
| C9 | Works for an account with no data, and for one with the maximum allowed |
| C10 | Text in any script (for example Devanagari, Tamil) is stored and shown correctly |

### 5.3 Accounts (`ACC`) · Phase 2

Decisions D-046 to D-054, which shape these, are **proposed**.

**FR-ACC-01 · Must · Age check before sign-up**
- **Story:** As a visitor, I give my date of birth before anything else, so that I am not asked for personal details I cannot use.
- **Acceptance:** (1) The first sign-up screen asks only for a date of birth and states no minimum age. (2) A short notice says why it is asked and that it is not kept if the person is not eligible. (3) A not-eligible person sees one neutral message that does not reveal the accepted age. (4) Nothing about a not-eligible person is stored on the server. (5) The sign-up form is unavailable on that device for 24 hours afterwards (D-048, proposed; subject to legal advice A7). (6) While under-18 sign-up is off, everyone under 18 is not eligible (D-047, proposed).
- **Depends on:** nothing.
- **Edge and error cases:** impossible dates; future dates; birthday today counts as having had it; 29 February birthdays; date judged in Indian time; device clock wrong (the server's date is used); JavaScript disabled.

**FR-ACC-02 · Must · The database's own age check and account status**
- **Story:** As the business, I need the age rule enforced where it cannot be bypassed.
- **Acceptance:** (1) Every account has a status: pending age check, onboarding, active, blocked, suspended or deleted. (2) Only an active account can use any product feature; the database refuses others. (3) The age is checked again by the database once the account exists. (4) Not eligible at that point: the account becomes blocked and is deleted; no date of birth is stored. (5) Eligible: the date of birth is stored in a table nobody can read through the product. (6) The check can be attempted once per account. (7) A user cannot change their own status or age group. (8) How the age was established is recorded (D-049, proposed).
- **Depends on:** FR-ACC-01.
- **Edge and error cases:** deletion fails after blocking (the account stays blocked and unusable); the user tries to call the check twice or for another account; a logged-in user in "pending" tries to open any other page.

**FR-ACC-03 · Must · Sign up with email and password**
- **Story:** As an eligible visitor, I create an account with my email and a password.
- **Acceptance:** (1) Password of at least 10 characters, with no forced character mix (D-052, proposed). (2) The rule is shown before typing. (3) A confirmation email is sent; the account cannot be used until its link is opened. (4) The link works once and expires. (5) "Send again" is offered with a wait between tries. (6) Signing up with an address that already has an account shows the same "check your email" screen.
- **Depends on:** FR-ACC-01, FR-ACC-07; email delivery.
- **Edge and error cases:** email never arrives; link opened on a different device (the age is asked again after login); link expired or already used; email address with unusual but valid characters; very long password; password pasted from a manager.

**FR-ACC-04 · Must · Sign up or log in with Google**
- **Story:** As a visitor, I use my Google account so that I have one less password.
- **Acceptance:** (1) One "Continue with Google" button on sign-up and login. (2) A new Google user who has not given a date of birth is asked for it before anything else. (3) A not-eligible date deletes the account. (4) If the Google email matches an existing email account, the behaviour is defined and tested; **unresolved** whether they are linked automatically or the user is told to log in the original way.
- **Depends on:** FR-ACC-02; a Google Cloud project created by the founder.
- **Edge and error cases:** the user cancels at Google; Google returns an error; the Google account has no verified email.

**FR-ACC-05 · Must · Log in and log out**
- **Story:** As a member, I get back into my account, and can leave it on a shared device.
- **Acceptance:** (1) Wrong email or wrong password gives one identical message. (2) Repeated failures are slowed. (3) After login the person goes where their status sends them. (4) "Log out" ends the session on that device. (5) A suspended account is told it is suspended and how to appeal.
- **Depends on:** FR-ACC-03 or FR-ACC-04.
- **Edge and error cases:** unconfirmed email tries to log in; session expires mid-action (the person is asked to log in and returned to where they were); logged in on several devices.

**FR-ACC-06 · Must · Forgotten password**
- **Story:** As a member who forgot my password, I set a new one through my email.
- **Acceptance:** (1) The request screen gives the same message whether or not the address has an account. (2) The link works once and expires. (3) The new password follows the same rule. (4) Other devices are logged out afterwards.
- **Depends on:** email delivery.
- **Edge and error cases:** a Google-only account requests a reset; several requests in a row (only the latest link works); link opened while logged in as someone else.

**FR-ACC-07 · Must · Bot protection and rate limits**
- **Story:** As the business, I need sign-up, login and reset protected from automated abuse.
- **Acceptance:** (1) A bot check runs on sign-up, login and reset, and is enforced by the login service itself, not only by the screen. (2) Limits on attempts per address and per network are set and written down. (3) A person who fails the check is told what to do.
- **Depends on:** a Cloudflare Turnstile account created by the founder.
- **Edge and error cases:** the check's service is unreachable (sign-up fails safely with a clear message); legitimate users behind a shared network hitting limits.

**FR-ACC-08 · Must · Unfinished sign-ups are removed**
- **Story:** As the business, I do not keep personal data that serves no purpose.
- **Acceptance:** (1) An account that has not become active within 7 days is deleted with its email (D-050, proposed; period subject to legal advice B6). (2) The deletion is logged without personal details.
- **Depends on:** FR-ACC-02.
- **Edge and error cases:** the person returns on day 8 (they can sign up again); the job fails (it retries and reports).

**FR-ACC-09 · Must · Terms, privacy notice and recorded agreement**
- **Story:** As a member, I can read what I am agreeing to, and the business can show what I agreed to.
- **Acceptance:** (1) Terms and Privacy Notice are public pages with version labels. (2) Until a lawyer has reviewed them they are headed as drafts (D-053, proposed), and no real user may sign up. (3) Agreement is given by two separate boxes, neither pre-ticked. (4) Each agreement is recorded with purpose, version, time, method and who gave it (D-035). (5) Records cannot be edited or deleted; a withdrawal is a new entry. (6) When a version changes materially, members are asked to agree again; **unresolved** what counts as material.
- **Depends on:** legal review (B1, C3).

### 5.4 Onboarding (`ONB`) · Phase 2

**FR-ONB-01 · Must · Adult onboarding**
- **Story:** As a new member, I tell Workaora what I do in under a minute, so that what I see is relevant.
- **Acceptance:** (1) One screen: name; 1 to 3 roles from a list; why I am here (looking for work, hiring, both); at least one working language; city (optional); the two agreements. (2) The role list covers the creator economy, esports and organisational roles in the founder's brief. (3) Completing it makes the account active. (4) Until then no other feature is reachable; the database enforces this. (5) The name accepts any script.
- **Depends on:** FR-ACC-02, FR-ACC-09.
- **Edge and error cases:** the person closes the browser halfway (they resume at onboarding next login); a role they want is missing (they can pick "Other" and name it; **proposed**: the names are reviewed to extend the list); more than 3 roles chosen.

### 5.5 Profiles (`PRO`) · Phase 3

**FR-PRO-01 · Must · Create and edit a profile**
- **Story:** As a professional, I present who I am and what I do.
- **Acceptance:** (1) Fields as in section 8.1. (2) Changes save with confirmation, and are visible at once. (3) Only the owner can edit. (4) Text that looks like a phone number or email in a public field triggers a warning before saving; for under-18s it is refused (D-025).
- **Depends on:** FR-ONB-01.
- **Edge and error cases:** two tabs editing at once (the later save wins and says so); very long text (limits in section 8.1); offensive text (reportable; FR-SAF-01).

**FR-PRO-02 · Must · Username and shareable public profile**
- **Story:** As a professional, I have one link that shows my work, which looks good when shared.
- **Acceptance:** (1) A unique username, 3 to 30 characters: lowercase letters, digits and underscores. (2) Reserved and misleading names (for example "admin", "support", "workaora") are refused. (3) An adult's profile can be read without an account and shows a preview (name, headline, picture) when the link is shared. (4) An under-18's profile is visible to logged-in members only, is hidden from search engines and produces no preview (D-025). (5) Changing a username is allowed; **unresolved** how often, and whether the old one redirects.
- **Depends on:** FR-PRO-01.
- **Edge and error cases:** username taken between check and save; impersonation of a known creator (report reason "impersonation"; verification signals in section 12).

**FR-PRO-03 · Must · Roles, skills and languages**
- **Acceptance:** (1) Roles from the curated list; one marked as primary. (2) Skills from a list, with new ones suggested for approval. (3) Languages from a list. (4) Limits: 3 roles; **to be decided:** maximum skills (proposed 15).
- **Edge and error cases:** a suggested skill duplicates an existing one under another spelling.

**FR-PRO-04 · Must · Availability and optional starting rate**
- **Story:** As a professional, I signal whether I want work and, if I choose, what I start at.
- **Acceptance:** (1) Availability: open to work, busy, not looking. (2) Starting rate is optional, in whole rupees, with a unit: per hour, per video, per month, per project. (3) If given, it is shown as "Starts at ₹X per unit". (4) It can be cleared at any time.
- **Edge and error cases:** zero or absurd values (limits to be decided); rate given without a unit (refused).

**FR-PRO-05 · Must · Experience**
- **Acceptance:** (1) Entries with title, organisation name, start month, optional end month, description. (2) An entry may link to an organisation page on Workaora. (3) Ordered newest first. (4) A linked entry does not claim confirmation; only FR-CRD does.
- **Edge and error cases:** end before start (refused); overlapping entries (allowed).

**FR-PRO-06 · Must · External links**
- **Acceptance:** (1) Links to named platforms (YouTube, Instagram, X, Twitch, Discord, website and others). (2) Only web addresses beginning `https://` are accepted. (3) Links open in a new tab and are marked so that search engines do not treat them as endorsements. (4) **To be decided:** maximum number (proposed 8).
- **Edge and error cases:** a link to a harmful site (reportable; a block list is a later option).

**FR-PRO-07 · Must · Profile picture and cover image**
- **Acceptance:** (1) JPEG, PNG or WebP, up to 5 MB (D-015). (2) Every upload goes through the checked pipeline, which removes location data (D-031; FR-POR-02). (3) A person without a picture shows initials. (4) The picture can be removed.

**FR-PRO-08 · Must · Private contact details**
- **Story:** As a professional, I store how I can be reached, knowing nobody sees it unless I choose.
- **Acceptance:** (1) Contact email, phone and WhatsApp number are stored apart from the public profile (D-014). (2) Nobody but the owner can read them, except through an active disclosure (FR-CON-02). (3) Under-18s: the guardian can also see them, and only email can ever be disclosed (D-028).
- **Edge and error cases:** invalid number formats; the person removes a detail that is currently disclosed (the disclosure of that detail ends).

**FR-PRO-09 · Must · Visibility rules and privacy settings**
- **Acceptance:** (1) Settings: who can see the profile (everyone, or members only); whether search engines may list it; who can find me in talent search (everyone, verified organisations only, nobody); whether my follow lists are shown. (2) Adults default to public. (3) Under-18 values are forced to the protective setting by the database and cannot be loosened by the minor or the guardian beyond what D-025 allows. (4) Never public for anyone under 18: phone, email, school, precise location, date of birth. (5) Age is never shown for anyone.
- **Depends on:** FR-ACC-02.

**FR-PRO-10 · Should · Profile completeness guide**
- **Acceptance:** (1) The owner sees which steps remain (picture, headline, three portfolio items, skills, availability). (2) Nobody else sees it. (3) It disappears when complete.

**FR-PRO-11 · Could · Game-specific fields for esports**
- **Status:** not in the approved first release. Depends on the esports interviews (D-005; BRD question O3).
- **Would include:** game, in-game role, rank or tier, team history as structured entries.

### 5.6 Portfolio (`POR`) · Phase 4

**FR-POR-01 · Must · Add a piece of work**
- **Story:** As a professional, I show a piece of work and what I did on it.
- **Acceptance:** (1) Required: title, my role on the project, category. (2) Optional: description, skills used, date, a link, media. (3) At least one of: an image, a video link, or a link to the work. (4) It appears on the profile at once.
- **Edge and error cases:** no media and no link (refused); work made for a client who forbids sharing (the person's responsibility; guidelines say so; reportable).

**FR-POR-02 · Must · Image upload through the checked pipeline**
- **Acceptance (D-015, D-031):** (1) JPEG, PNG, WebP only; up to 5 MB each. (2) The browser compresses before sending and shows progress. (3) The file goes to a private holding area. (4) A server step checks the real file type from its contents, re-encodes the image (which removes location and camera data), limits its dimensions, publishes it and deletes the original. (5) A failed check tells the person why. (6) **To be decided (engineering):** images per item (proposed 10), uploads per day, maximum dimensions.
- **Edge and error cases:** a file renamed to look like an image; an animated or vector file (refused); connection lost mid-upload (can retry); the processing step fails (the item saves without that image and says so).

**FR-POR-03 · Must · Video by link**
- **Acceptance:** (1) A link from a supported platform (YouTube, Instagram, Vimeo, Twitch, Google Drive) is shown as an embedded player or a preview card. (2) Nothing is fetched from the other platform until the person presses play, where the platform allows it. (3) Unsupported links are shown as plain links. (4) No video file can be uploaded.
- **Edge and error cases:** the video is later deleted or made private (the item shows "no longer available"); a link to a non-video page.

**FR-POR-04 · Must · Achievements**
- **Acceptance:** (1) An item type with: what was achieved, event or organisation, date, optional placing, optional link as evidence. (2) Shown among portfolio items with a distinct label. (3) It is a claim, not a verification, and is labelled so unless confirmed (FR-CRD).

**FR-POR-05 · Must · Edit, reorder, hide, delete**
- **Acceptance:** (1) The owner can do all four. (2) A hidden item is visible only to the owner. (3) Deleting removes its images from storage. (4) Deleting an item attached to an open application: the application keeps a note that an item was removed.

**FR-POR-06 · Must · Portfolio display**
- **Acceptance:** (1) The profile shows the portfolio before anything else below the header. (2) A grid on wide screens, one column on phones. (3) Each item opens to its own page with its own address. (4) Images load only as they come into view, at a size suited to the screen.

### 5.7 Organisations (`ORG`) · Phase 5

**FR-ORG-01 · Must · Create an organisation page**
- **Story:** As a creator or company, I have an official page to hire from.
- **Acceptance:** (1) Any active adult can create one: name, type (agency, studio, esports organisation, brand, creator's business, other), about, logo, website, city. (2) The creator becomes its owner. (3) Under-18s cannot own or administer one (D-026). (4) It starts at trust level "New". (5) Reserved and misleading names are refused.
- **Edge and error cases:** two pages for the same real organisation (reportable; a merge is a moderator action).

**FR-ORG-02 · Must · Members, roles and invitations**
- **Acceptance:** (1) Roles: owner, admin, recruiter. (2) Invite by email; the link expires. (3) Only owners and admins manage members. (4) There is always at least one owner. (5) A member can leave. (6) Each member acts only within their own organisations; the database enforces it.
- **Edge and error cases:** the invited email has no account (they sign up first, then accept); the last owner tries to leave (refused until another owner exists).

**FR-ORG-03 · Must · Trust levels and verification**
- **Acceptance (D-034):** (1) New → Reviewed (first listing approved by a person) → Verified (evidence checked by a person). (2) The level is shown on the page and on every listing, with a plain explanation of what it does and does not mean. (3) Evidence is viewed and recorded as checked; copies are not stored. (4) Only Verified organisations can mark an opportunity open to 16–17-year-olds or find opted-in minors in search. (5) A level can be lowered by a moderator, with a reason, logged.
- **Edge and error cases:** evidence is ambiguous (stays Reviewed); a verified organisation changes its name (re-check).

### 5.8 Opportunities (`OPP`) · Phase 5

**FR-OPP-01 · Must · Post an opportunity**
- **Story:** As a hirer, I describe what I need in under two minutes.
- **Acceptance:** (1) Fields: title; description; roles; skills; type (full-time, part-time, freelance project, monthly retainer, internship, tryout); remote, on-site or hybrid; city if not remote; experience level; pay (optional: a range in rupees and a unit); deadline (optional). (2) Templates pre-fill common cases. (3) Draft, published, closed. (4) Only members with recruiter rights or above can post.
- **Edge and error cases:** pay minimum above maximum; deadline in the past; a listing for something that is not work (reportable).

**FR-OPP-02 · Must · First-listing review and scam holds**
- **Acceptance (D-013):** (1) The first listing from a New organisation is held until a person approves it. (2) Any listing containing scam signals is held: fees or deposits, "registration charge", requests for identity or bank documents, off-platform payment links, pay that is implausible for the work. (3) The poster is told it is under review, not why in detail. (4) Every opportunity page states that genuine employers never ask applicants to pay. (5) New organisations have a low posting limit. (6) Real-money gaming listings are refused (D-019).
- **Edge and error cases:** a legitimate listing mentions a refundable deposit for equipment (held; a person decides); a scammer edits a listing after approval (edits to pay or description re-run the checks).

**FR-OPP-03 · Must · Browse and view opportunities**
- **Acceptance:** (1) Published opportunities can be read without an account and show a preview when shared. (2) The page shows the organisation, its trust level, pay if given, type, location, deadline and how to apply. (3) Closed opportunities say so and cannot be applied to. (4) Filters as in FR-DIS-02.

**FR-OPP-04 · Must · Edit and close**
- **Acceptance:** (1) Members with rights can edit or close. (2) Closing tells applicants who are still undecided. (3) An opportunity past its deadline closes itself. (4) **Proposed:** one with no activity for 60 days asks its owner whether it is still open.

**FR-OPP-05 · Must before under-18 sign-up is enabled · Opportunities open to 16–17-year-olds**
- **Acceptance (D-027):** (1) Closed to minors by default. (2) Can be opened only by a Verified organisation, only if remote, only with pay stated, and only with the organisation attesting that the work is non-hazardous, involves no night work, and that a guardian will be party to any agreement. (3) The attestation is stored with who gave it and when. (4) Minors can see and apply to only these. (5) Exact conditions are subject to legal advice (D1 to D3).

### 5.9 Applications (`APP`) · Phase 6

**FR-APP-01 · Must · Apply**
- **Story:** As a professional, I apply with my work, not a form.
- **Acceptance:** (1) A short note and up to three of my portfolio items. (2) One application per person per opportunity. (3) Only to published opportunities before their deadline. (4) Not if either party has blocked the other. (5) A daily limit on applications.
- **Edge and error cases:** the opportunity closes while the form is open; the applicant has no portfolio items (they can apply with a note, and are encouraged to add work).

**FR-APP-02 · Must · Track and withdraw**
- **Acceptance:** (1) A list of my applications with status: submitted, viewed, shortlisted, not selected, hired, withdrawn. (2) I am notified of changes. (3) I can withdraw at any time; that ends any contact disclosure for it.

**FR-APP-03 · Must · Review pipeline**
- **Story:** As a hirer, I work through applicants and keep track of decisions.
- **Acceptance:** (1) Applicants listed with their chosen portfolio items visible without opening each profile. (2) Statuses can be changed by members with rights; each change records who and when. (3) Opening an application marks it viewed. (4) Members see only their own organisation's applications. (5) **Proposed:** a reminder for applications left undecided for 14 days.
- **Edge and error cases:** two members change a status at once; an applicant deletes their account (their application is removed and the pipeline says so).

### 5.10 Contact sharing (`CON`) · Phase 6

**FR-CON-01 · Must · Contact request**
- **Acceptance (D-009):** (1) Shortlisting discloses nothing. (2) After shortlisting, a member may send one contact request for that application. (3) The applicant sees exactly who is asking and for which opportunity. (4) A request expires if unanswered; **proposed** 14 days.

**FR-CON-02 · Must · Field-by-field consent**
- **Story:** As an applicant, I decide exactly what to share, with whom, for what.
- **Acceptance (D-009, D-028, D-035):** (1) The applicant ticks which stored details to share: email, phone, WhatsApp. Nothing is pre-ticked. (2) Declining is as easy as agreeing and has no penalty. (3) The consent is recorded: details, organisation, application, notice version, time, method. (4) Members read the details only through a function that checks an active disclosure and logs every view. (5) Under-18s: email only; each disclosure needs the guardian's approval; the guardian is copied.
- **Edge and error cases:** the applicant has stored no contact details (they are asked to add one or decline); the organisation is suspended (its disclosures end).

**FR-CON-03 · Must · Withdrawal and expiry**
- **Acceptance:** (1) The applicant, or the guardian for a minor, can withdraw at any time; access stops at once. (2) The screen says plainly that details already seen cannot be recalled. (3) Access ends automatically after the application is closed or not selected, after a period **to be decided** with legal advice (B2, B6).

### 5.11 Discovery (`DIS`) · Phase 7

**FR-DIS-01 · Must · Find people, organisations and work**
- **Acceptance:** (1) Search by words across names, headlines, skills and roles. (2) Filter people by role, skill, language, city or state, availability. (3) Results respect every visibility rule; an under-18 appears only to members of Verified organisations and only if opted in with guardian approval (D-025). (4) Typing mistakes of a letter or two still find results. (5) Results come 20 at a time.
- **Edge and error cases:** no results (suggest loosening a filter); a blocked person (never shown to the blocker, and the reverse).

**FR-DIS-02 · Must · Filter opportunities**
- **Acceptance:** by role, type, remote or city, experience level, and whether pay is stated. Under-18s see only opportunities open to them.

**FR-DIS-03 · Must · Stated ordering**
- **Acceptance:** the order of results follows the principles in section 9.3, and the page says how it is ordered.

**FR-DIS-04 · Could · Filter people by starting rate**
- **Status:** proposed, not approved. The rate is optional, so the filter would hide everyone who has not given one. If built, the page must say so.

### 5.12 Follow and feed (`FOL`) · Phase 7

**FR-FOL-01 · Must · Follow**
- **Acceptance (D-008):** (1) Follow a person or organisation with one action; no approval. (2) Unfollow the same way. (3) Blocked parties cannot follow each other. (4) Under-18s' follow lists are hidden (D-025).

**FR-FOL-02 · Must · Feed**
- **Acceptance (D-007, D-029):** (1) "Following": new portfolio items and new opportunities from those I follow, newest first. (2) "Fresh work": recent portfolio items from everyone whose visibility allows it. (3) No personalised ranking. (4) Under-18s' work never appears to logged-out visitors.
- **Edge and error cases:** following nobody (the empty state suggests people and organisations by my roles).

**FR-FOL-03 · Must · Appreciate**
- **Acceptance:** (1) One reaction on a portfolio item; pressing again removes it. (2) The owner is notified, with repeated notifications grouped. (3) No other reaction and no comments (D-006, D-007).

### 5.13 Notifications (`NOT`) · Phase 6

**FR-NOT-01 · Must · In-app notifications**
- **Acceptance:** (1) A list with unread count for: application received; status changed; contact request received, answered or expired; confirmation requested or answered; new follower; listing approved or held; report outcome. (2) Each links to the thing it is about. (3) Mark as read, singly or all.

**FR-NOT-02 · Must · Email notifications and controls**
- **Acceptance:** section 15. In short: transactional emails only; per-type switches; guardians copied on minors' hiring events (D-027, D-028).

### 5.14 Confirmed collaborations (`CRD`) · Phase 9

**FR-CRD-01 · Should · Request and answer**
- **Acceptance (D-010):** (1) The owner of a portfolio item asks a person or organisation on Workaora to confirm they worked together. (2) The other party can accept or decline. (3) Accepted: the item shows "Collaboration confirmed by X", with the note "Confirms they worked together. Not an endorsement." (4) Declined or pending: nothing is shown publicly. (5) A daily limit on requests.

**FR-CRD-02 · Should · Revoke and dispute**
- **Acceptance (D-010):** (1) Either party can revoke at any time. (2) Either can dispute; the badge is hidden at once and a moderator reviews. (3) Every state change is recorded. (4) Under-18s' confirmations never appear on the other party's public pages, and requests create no contact channel.

### 5.15 Safety and moderation (`SAF`) · Phase 8

**FR-SAF-01 · Must · Report**
- **Acceptance:** (1) Any profile, portfolio item, opportunity or organisation can be reported in two steps. (2) Reasons: spam, scam, harassment, impersonation, child safety, under-age user, copyright, other. (3) Child-safety and scam reports go to the front of the queue. (4) The reporter gets an acknowledgement and the outcome. (5) The reported party is not told who reported. (6) A daily limit on reports.

**FR-SAF-02 · Must · Block**
- **Acceptance:** (1) Blocking is immediate and silent. (2) Blocked parties cannot follow, appreciate, apply to each other's organisations' opportunities, request confirmations, or see each other in search. (3) A list of people I have blocked, with unblock.

**FR-SAF-03 · Must · Moderation tools and record**
- **Acceptance:** (1) Queues: reports, listings awaiting review, verification requests, confirmation disputes. (2) Actions: dismiss, hide content, remove content, suspend an account or organisation, restore. (3) Every action needs a reason and is written to the audit log, which nobody can edit (D-035). (4) Only staff can open these tools; admins can do what moderators cannot (D-042). (5) A suspended person is told why in general terms and how to appeal.

**FR-SAF-04 · Must · Published rules**
- **Acceptance:** community guidelines, the "never pay to apply" rule, and how to report, as public pages; subject to legal review (E1).

### 5.16 Privacy and account management (`PRV`) · Phase 8

**FR-PRV-01 · Must · Delete my account**
- **Acceptance:** (1) Available from settings, with a clear statement of what is removed. (2) Requires recent login. (3) Removes the profile, portfolio, images, applications and contact details. (4) What must be kept (for example safety reports and audit entries) is **unresolved** pending legal advice (B6). (5) An organisation with no other owner must be handed over or closed first.

**FR-PRV-02 · Must · Data requests**
- **Acceptance:** (1) Request a copy of my data, a correction, or raise a grievance. (2) Each request is tracked with a due date. (3) Response times and the grievance contact are **unresolved** pending legal advice (B5).

**FR-PRV-03 · Must · Settings**
- **Acceptance:** change password; privacy settings (FR-PRO-09); notification switches (section 15); blocked list; log out of other devices.

### 5.17 Under-18 support (`MIN`) · Phase 11

All are **Must before under-18 sign-up is enabled**. All are subject to legal sign-off (D-022).

**FR-MIN-01 · Must before under-18 sign-up is enabled · Guardian consent**
- **Acceptance (D-024):** (1) A 16–17-year-old's account is created as "waiting for a guardian": invisible, unusable, minimal data. (2) The guardian uses their own adult account and is verified as an adult by a method the lawyer approves (A2). (3) The guardian accepts the terms for the minor and consents purpose by purpose. (4) Not completed within 14 days: the pending account and its data are deleted. (5) No identity numbers are stored.

**FR-MIN-02 · Must before under-18 sign-up is enabled · Protective defaults**
- **Acceptance (D-025, D-029):** members-only profile; hidden from search engines; state-level location only; no public age; hidden follow lists; no link previews; no phone, email, school or precise location in public fields; no identification in analytics, no session recording, no personalised ranking, no advertising.

**FR-MIN-03 · Must before under-18 sign-up is enabled · Guardian oversight**
- **Acceptance (D-024, D-027, D-028):** the guardian can see the minor's settings and applications; is told of each application and status change; approves each contact disclosure and is copied; can withdraw consent, which pauses the account.

**FR-MIN-04 · Must before under-18 sign-up is enabled · Turning 18**
- **Acceptance:** the account becomes an adult account; the person is asked for their own consent and to review settings; the guardian's control ends. Mechanics subject to legal advice (A6).

**FR-MIN-05 · Must before under-18 sign-up is enabled · Child-safety handling**
- **Acceptance:** child-safety reports reach a priority queue with a written escalation procedure, including when authorities must be told (E2).

### 5.18 Later (`LAT`)

Not requirements. Listed so they are not forgotten: direct messaging; communities; posts and comments; saved items; recruiter filters; analytics for profiles; native apps; video hosting; paid tiers; brand marketplace; contracts and payments; matching.

---

## 6. Information architecture and screen inventory

### 6.1 Navigation

| Where | Items |
|-------|-------|
| Logged out | Home · Discover · Opportunities · Log in · Create account |
| Logged in, phone (bottom bar) | Feed · Discover · Opportunities · Notifications · Me |
| Logged in, wide screen (top bar) | The same, plus a search box and an organisation switcher for people who belong to one |
| "Me" menu | My profile · My applications · My organisations · Settings · Log out |

### 6.2 Screens

"Public" means readable without an account, subject to each person's visibility settings.

| # | Screen | Address (indicative) | Who | Phase |
|---|--------|----------------------|-----|-------|
| 1 | Home (landing) | `/` | Public | 10 |
| 2 | Create account: date of birth | `/signup` | Public | 2 |
| 3 | Create account: method | `/signup/account` | Public | 2 |
| 4 | Check your email | `/signup/check-email` | Public | 2 |
| 5 | Not eligible | `/signup/not-available` | Public | 2 |
| 6 | Log in | `/login` | Public | 2 |
| 7 | Forgotten password; set new password | `/forgot-password`, `/reset-password` | Public | 2 |
| 8 | Onboarding | `/onboarding` | New member | 2 |
| 9 | Terms; Privacy Notice; Guidelines; Safety | `/terms`, `/privacy`, `/guidelines`, `/safety` | Public | 2, 8 |
| 10 | Feed | `/feed` | Member | 7 |
| 11 | Discover: people, organisations, work | `/discover` | Public, with limits | 7 |
| 12 | Profile | `/@username` | Public for adults | 3 |
| 13 | Edit profile | `/settings/profile` | Owner | 3 |
| 14 | Portfolio item | `/@username/work/id` | As the profile | 4 |
| 15 | Add or edit portfolio item | `/work/new`, `/work/id/edit` | Owner | 4 |
| 16 | Organisation page | `/org/slug` | Public | 5 |
| 17 | Create or edit organisation; members | `/org/new`, `/org/slug/settings` | Owner, admin | 5 |
| 18 | Opportunities list | `/opportunities` | Public | 5 |
| 19 | Opportunity | `/opportunities/id` | Public | 5 |
| 20 | Post or edit an opportunity | `/org/slug/opportunities/new` | Recruiter and above | 5 |
| 21 | Apply | `/opportunities/id/apply` | Member | 6 |
| 22 | My applications | `/applications` | Member | 6 |
| 23 | Applicant pipeline | `/org/slug/opportunities/id/applicants` | Organisation members | 6 |
| 24 | Contact request (applicant's choice) | `/applications/id/contact` | Applicant; guardian | 6 |
| 25 | Notifications | `/notifications` | Member | 6 |
| 26 | Confirmation requests | `/confirmations` | Member | 9 |
| 27 | Settings: account, privacy, notifications, blocked, data | `/settings/...` | Member | 3, 8 |
| 28 | Report (a dialog on any screen) | n/a | Member | 8 |
| 29 | Moderation: reports, listings, verification, disputes, audit log | `/staff/...` | Staff | 5, 8, 9 |
| 30 | Guardian: invitation, consent, dashboard | `/guardian/...` | Guardian | 11 |
| 31 | Not found; error; suspended | n/a | Everyone | 2 |

Addresses are indicative and are settled in each phase's plan. No address ever contains a date of birth, an email or a phone number.

---

## 7. Wireframe descriptions

Text only. Every screen also meets the common criteria in section 5.2 and uses the design system (`DESIGN_SYSTEM.md`): warm paper background, ink text, cards with a red left edge, one primary button per screen.

### 7.1 Home (landing)

| | |
|---|---|
| **Purpose** | Say what Workaora is in one breath, and send people to the right start |
| **Components** | Headline and one sentence; two entry points, "I'm looking for work" and "I'm hiring"; a strip of recent public work; a strip of open opportunities; how it works in three steps; the safety promise (never pay to apply) |
| **Primary action** | Create account |
| **Empty** | With no public work or opportunities yet, the strips are omitted, not shown blank |
| **Loading** | The page is delivered already drawn; strips show placeholders |
| **Errors** | A strip that fails to load is hidden; the page still works |
| **Phone** | One column; the two entry points stacked as full-width buttons |

### 7.2 Create account: date of birth

| | |
|---|---|
| **Purpose** | Establish eligibility before asking for anything else |
| **Components** | Three fields (day, month, year) with one visible label; a one-sentence notice on why we ask; a link to the privacy notice |
| **Primary action** | Continue |
| **Empty** | Not applicable |
| **Loading** | The button shows a spinner and is disabled |
| **Errors** | "Enter a real date" under the fields. A not-eligible date goes to the neutral screen, not an error. |
| **Phone** | Number keypad for each field; fields in one row |

### 7.3 Create account: method

| | |
|---|---|
| **Purpose** | Create the login |
| **Components** | "Continue with Google"; a divider; email; password with the rule stated and a show/hide control; the bot check; a link to log in |
| **Primary action** | Create account |
| **Errors** | Under each field. A registered email does not produce an error (FR-ACC-03). |
| **Phone** | One column; the Google button first |

### 7.4 Onboarding

| | |
|---|---|
| **Purpose** | Capture the minimum that makes the product relevant |
| **Components** | Name; roles as selectable chips grouped by area, with a counter "2 of 3"; why I'm here as three large options; languages as chips; city; two agreement boxes with links |
| **Primary action** | Finish |
| **Errors** | A summary at the top listing what is missing, each linked to its field |
| **Phone** | Role chips wrap; groups can be collapsed |

### 7.5 Profile

| | |
|---|---|
| **Purpose** | Let someone judge a professional by their work in under a minute |
| **Components** | Header: picture or initials, name, headline, location, availability, optional "Starts at ₹X per unit", Follow and Share. Then, in order: portfolio grid; confirmed collaborations; skills and languages; experience; links. The owner also sees an edit button and the completeness guide. |
| **Primary action** | Visitor: Follow. Owner: Add work. |
| **Empty** | Owner with no portfolio: "Show your first piece of work" with a button. Visitor: "No work added yet". |
| **Loading** | Header placeholder, then a grid of placeholders |
| **Errors** | "This profile isn't available" for hidden, suspended, deleted or members-only profiles, without saying which |
| **Phone** | Header stacked; grid in one column; actions fixed at the bottom |

### 7.6 Portfolio item

| | |
|---|---|
| **Purpose** | Show one piece of work and the person's part in it |
| **Components** | Media first (images, or a video preview that loads the player on tap); title; role on the project; category and skills; description; date; link; confirmation badge if any; Appreciate; Report; who made it, with a link back |
| **Primary action** | Appreciate (visitor); Edit (owner) |
| **Errors** | An embedded video that no longer exists shows "This video is no longer available" with the original link |
| **Phone** | Images swipe; text below |

### 7.7 Add or edit a portfolio item

| | |
|---|---|
| **Purpose** | Add work quickly |
| **Components** | A choice between "Work" and "Achievement"; title; my role; category; skills; description; an upload area with per-file progress; a field for a video or work link with an instant preview; an optional "Ask someone to confirm this" |
| **Primary action** | Publish |
| **Loading** | Each image shows its own progress and can be cancelled; Publish waits for uploads |
| **Errors** | Per file: too large, wrong type, could not be processed. The rest of the form is kept. |
| **Phone** | Upload opens the phone's gallery or camera |

### 7.8 Discover

| | |
|---|---|
| **Purpose** | Find people, organisations and work without knowing anyone |
| **Components** | Tabs: People, Organisations, Work. A search box. Filters. Result cards: for a person, picture, name, headline, top roles, availability, and up to three portfolio thumbnails. A line stating how results are ordered. |
| **Primary action** | Open a result |
| **Empty** | "No one matches these filters" with a one-tap way to remove the narrowest filter |
| **Loading** | Card placeholders; more results load on reaching the end |
| **Phone** | Filters open as a full-screen sheet with "Show N results" |

### 7.9 Opportunities list and opportunity page

| | |
|---|---|
| **Purpose** | Find and judge an opportunity |
| **Components (list)** | Filters; cards with title, organisation and its trust level, type, remote or city, pay if given, time since posting |
| **Components (page)** | Title; organisation with trust level and a link; type, location, experience level, pay, deadline; description; skills; the "never pay to apply" notice; Apply; Share; Report |
| **Primary action** | Apply |
| **Empty** | "No open opportunities match. Follow organisations to hear when they post." |
| **Errors** | A closed opportunity shows its details with "This opportunity is closed" and no Apply |
| **Phone** | Apply fixed at the bottom |

### 7.10 Post an opportunity

| | |
|---|---|
| **Purpose** | Publish a real need in under two minutes |
| **Components** | A row of templates; title; roles and skills; type; remote or city; pay with unit, marked optional (no claim is made about its effect on applications until there is evidence); deadline; description; a preview |
| **Primary action** | Publish (or "Submit for review" for a New organisation) |
| **Errors** | Fields; and a plain notice if the listing is held for review |
| **Phone** | One column; preview on a second step |

### 7.11 Applicant pipeline

| | |
|---|---|
| **Purpose** | Compare applicants and decide |
| **Components** | Counts by status; applicant cards showing name, headline, the note, and the chosen portfolio items large enough to judge; actions: Shortlist, Not selected, Request contact, Mark hired; status history on each |
| **Primary action** | Shortlist |
| **Empty** | "No applications yet. Share this opportunity." with a copy-link button |
| **Loading** | Card placeholders |
| **Errors** | A failed status change says so and leaves the status as it was |
| **Phone** | One applicant per screen width; swipe or buttons to move between them |

### 7.12 Contact request (the applicant's choice)

| | |
|---|---|
| **Purpose** | Let the applicant decide exactly what to share |
| **Components** | Who is asking and for which opportunity, with the organisation's trust level; a tick box for each stored detail, none pre-ticked; what sharing means, in two sentences; how to withdraw later |
| **Primary action** | Share selected details. "Don't share" has equal weight. |
| **Empty** | No stored details: "Add a way to be contacted" with a link, or decline |
| **Under-18** | Only email is offered, and the screen says a guardian must approve |
| **Phone** | Full screen |

### 7.13 Notifications

| | |
|---|---|
| **Purpose** | Show what needs attention |
| **Components** | A list, newest first, unread marked; each says who did what and links to it; "Mark all as read" |
| **Empty** | "Nothing new" |
| **Phone** | Full screen from the bottom bar, with an unread count on the icon |

### 7.14 Settings: privacy

| | |
|---|---|
| **Purpose** | Put people in control of who sees what |
| **Components** | Each setting with a plain explanation and its current value; stored contact details with a note that nobody can see them; a list of current contact disclosures with "Withdraw" on each; download my data; delete my account |
| **Under-18** | Protective settings are shown as fixed, with a sentence explaining why |
| **Errors** | A failed save says so and restores the previous value |

### 7.15 Report dialog

| | |
|---|---|
| **Purpose** | Make reporting fast and safe |
| **Components** | What is being reported; reasons as a list; an optional description; a note that the other party will not be told who reported |
| **Primary action** | Send report |
| **After** | "Thanks. We'll tell you the outcome." and an offer to block the person |

### 7.16 Moderation queue

| | |
|---|---|
| **Purpose** | Let a moderator decide quickly and leave a record |
| **Components** | Tabs for each queue, with counts; child-safety and scam items first; each item shows the content, the reporter's reason, history for that account, and actions; a required reason field |
| **Empty** | "Nothing waiting" |
| **Phone** | Usable, but designed for a wide screen |

### 7.17 Guardian consent

| | |
|---|---|
| **Purpose** | Let a guardian understand and decide |
| **Components** | What Workaora is, in plain language; what the minor will and will not be able to do; what data is held; each purpose with its own tick box; how to withdraw; the adult-verification step |
| **Primary action** | Give consent. "I do not consent" has equal weight. |
| **Status** | Design subject to legal advice (A2, C1). Built in Phase 11. |

---

## 8. Profile and portfolio data model

Sizes and counts marked **TBD** are proposals to be confirmed during the phase that builds them.

### 8.1 Profile

| Field | Required | Visible to (adult) | Visible to (under-18) | Rules |
|-------|----------|--------------------|-----------------------|-------|
| Username | Yes (from Phase 3) | Everyone | Members | 3 to 30; lowercase letters, digits, underscore; unique; reserved words refused |
| Name | Yes | Everyone | Members | 2 to 60 characters; any script |
| Headline | No | Everyone | Members | Up to 120 |
| Bio | No | Everyone | Members | Up to 1,000 (TBD); contact details warned against, refused for under-18s |
| Picture, cover | No | Everyone | Members; no link preview | JPEG, PNG, WebP; up to 5 MB; processed (D-031) |
| Location | No | City | State only | Free text for now; **unresolved** whether to use a fixed list |
| Roles | Yes, 1 to 3 | Everyone | Members | From the list; one primary |
| Skills | No | Everyone | Members | From the list; up to 15 (TBD) |
| Languages | Yes, at least 1 | Everyone | Members | From the list |
| Why I'm here | Yes | Not shown; used for defaults | Not shown | Work, hire, or both |
| Availability | No | Everyone | Members | Open to work, busy, not looking |
| Starting rate and unit | No | Everyone, if given | Members, if given | Whole rupees; unit required with a value |
| Links | No | Everyone | Members | `https://` only; up to 8 (TBD) |
| Experience entries | No | Everyone | Members | Title, organisation, dates, description |
| Contact email, phone, WhatsApp | No | **Nobody**, except by an active disclosure | **Nobody**; guardian can see; only email can ever be disclosed | Stored in a separate table (D-014) |
| Date of birth | Yes | **Nobody** | **Nobody** | Its own table; no read access through the product |
| Age group | Derived | Never shown | Never shown | Cannot be changed by the user |
| Account status | System | Not shown | Not shown | Cannot be changed by the user |
| Privacy settings | System defaults | Owner | Owner and guardian | Under-18 values forced (D-025) |

**Ownership.** A person owns and edits their own profile. Staff can hide or suspend, with a logged reason. Nobody else can change it.

### 8.2 Portfolio item

| Field | Required | Rules |
|-------|----------|-------|
| Type | Yes | Work or achievement |
| Title | Yes | 3 to 100 characters |
| My role on the project | Yes for work | Up to 80; for example "Editor", "Thumbnail design" |
| Category | Yes | From the role and category list |
| Skills | No | From the skills list; up to 8 (TBD) |
| Description | No | Up to 2,000 (TBD) |
| Date | No | Month and year |
| Images | No | JPEG, PNG, WebP; up to 5 MB each; up to 10 per item (TBD); processed |
| Video or work link | No | Supported platforms embed; others shown as a link |
| For achievements: event or organisation, placing, evidence link | Event required | |
| Hidden | System | Owner can hide; staff can hide with a reason |
| Confirmation | Optional | Section 12.2 |

At least one of image, video link or work link is required.

**Visibility** follows the owner's profile. **Ownership:** the owner; staff can hide or remove with a logged reason.

### 8.3 What is deliberately absent

Follower counts as a headline number on a profile; a public age; a rating or score for people; "last seen" times; education; a CV file.

---

## 9. Discovery, search, filters and ordering

### 9.1 What can be searched

People, organisations, portfolio items and opportunities (D-016), using the database's own text search, which tolerates small typing mistakes. No paid search service.

### 9.2 Filters

| For | Filters |
|-----|---------|
| People | Role; skill; language; city or state; availability. **Could:** starting rate (FR-DIS-04). |
| Organisations | Type; city; trust level |
| Work | Category; skill |
| Opportunities | Role; type; remote or city; experience level; pay stated or not |

### 9.3 How results are ordered

No ranking formula has been tested, so none is promised. The first release uses simple, stated rules. The page tells people how results are ordered.

**Principles (proposed)**

1. **Match first.** Results that match more of what was typed and filtered come first.
2. **Then evidence of real work.** Among equal matches, profiles with portfolio items come before those without, and confirmed collaborations count for more than unconfirmed claims.
3. **Then recency.** Recently updated portfolios and recently posted opportunities come before stale ones.
4. **Availability matters for people.** "Open to work" comes before "busy" and "not looking".
5. **Popularity never decides alone.** Follower counts and appreciation counts are not used as a main signal, so established names do not bury newcomers and numbers cannot be bought.
6. **Nothing paid.** There is no paid placement in the first release. If it is ever added it must be labelled (BRD section 10.3).
7. **The same for everyone.** No personalised ordering (D-029 requires this for under-18s; applying it to all keeps one system).

The exact weights are an engineering choice for Phase 7, to be adjusted from real searches in the closed beta.

### 9.4 Safeguards

- Every result respects visibility settings, blocks, suspensions and age rules (D-025).
- Under-18s appear in people search only to members of Verified organisations, and only if opted in with guardian approval.
- Private fields are never searchable.
- Searches are rate-limited to hinder bulk copying of profiles.
- Search engines may list adult public profiles and published opportunities only, and only after public launch.

---

## 10. Connection, messaging and contact-sharing rules

### 10.1 What exists in the first release

| | Rule | Source |
|---|------|--------|
| Following | One-way; no approval; can be undone; blocked parties cannot follow | D-008 |
| Messaging | **None.** | D-006 |
| Contact sharing | Only after a shortlist and a request; by the applicant's explicit, specific, recorded choice | D-009 |

### 10.2 Contact-sharing rules in full

1. Contact details are private by default (D-014).
2. Shortlisting alone discloses nothing.
3. One contact request per application, from a member of the organisation that posted the opportunity.
4. The applicant sees who is asking and why, and chooses which details to share. Nothing is pre-ticked. Declining is as easy as agreeing.
5. Each consent is recorded with details, organisation, application, notice version, time and method (D-035).
6. Access is limited to members of that organisation, for that application.
7. Every view of the details is logged.
8. The applicant can withdraw at any time. The screen says honestly that details already seen cannot be recalled.
9. Access ends automatically when the application closes, after a period to be decided (B2, B6).
10. Under-18s: email only; each disclosure approved by the guardian, who is copied (D-028).

### 10.3 Spam and abuse prevention

| Measure | Applies to |
|---------|-----------|
| Daily limits | Applications, contact requests, follows, confirmation requests, reports |
| One request per application | Contact requests |
| Blocking ends everything between two parties | All |
| Every action is reportable | All |
| Organisations that misuse contact details lose their trust level or are suspended | Organisations |

### 10.4 The gap, and a proposal

**The gap.** A hirer who finds someone in search cannot reach them inside the product. They can only follow them, use a public link on the profile if there is one, or post an opportunity and hope the person applies. Persona C's job "let me find people directly" is only half met.

| Option | What it is | Fits approved decisions? |
|--------|-----------|--------------------------|
| (a) Leave it | As approved | Yes |
| (b) **Invite to apply** | A member of an organisation can send a person an invitation to one of that organisation's open opportunities. It is a notification with no free text. The person can apply, ignore it or block. | Yes. It is not messaging (D-006) and creates no contact channel. |
| (c) Messaging | Free-text conversation | No. Excluded by D-006. |

**FR-APP-04 · Could · Invite to apply (proposed, not approved)**
- **Acceptance:** (1) Only for an open opportunity of the inviter's organisation. (2) No free text. (3) A daily limit per organisation, lower for New organisations. (4) The invited person can turn invitations off. (5) Under-18s can be invited only by Verified organisations to opportunities open to them, and the guardian is told. (6) Blocked parties cannot invite.
- **Recommendation:** approve as a small addition in Phase 7, or hold until the closed beta shows whether the gap matters.

### 10.5 When messaging is built

The constraints are already recorded (`PHASE_0_PLAN.md` §5.9): no adult-to-minor messages except inside an active application with a Verified organisation and with guardian visibility; no images or links from adults to minors; every message reportable; immediate blocking; rate limits; retention as legal advice requires.

---

## 11. Opportunities

Opportunities **are** in the recommended first release (approved, `PHASE_0_PLAN.md` §2.2). The requirements are FR-OPP-01 to FR-OPP-05, FR-APP-01 to FR-APP-03 and FR-CON-01 to FR-CON-03.

**Why they are in.** The first release exists to prove the hiring loop. Without opportunities there is a portfolio site, which already exists elsewhere.

**Not in the first release:** saved opportunities; alerts by email for new matches; screening questions; featured listings; applying on behalf of a team.

---

## 12. Trust and quality

### 12.1 Signals shown on a profile or page

| Signal | Means | Does not mean |
|--------|-------|---------------|
| Email confirmed | The account controls that email | Identity |
| Confirmed collaboration | The named party confirms they worked together | An endorsement of quality |
| Organisation: Reviewed | A person approved its first listing | That it is a registered business |
| Organisation: Verified | A person checked evidence that it is what it says | A guarantee of conduct |
| Linked accounts | The person listed these links | That they own them. **Unresolved:** whether to add proof of ownership of a channel. |

Each signal carries a short explanation on the page. **No signal is called "verified person" in the first release**, because nothing checks a person's identity.

### 12.2 Ownership and attribution of work

- A person may show only work they made or contributed to, and must state their role. The guidelines say so.
- Confirmed collaborations (D-010) are the main defence against false claims.
- "Copyright" and "impersonation" are report reasons. A takedown process follows legal advice (E4).
- Disputed confirmations hide the badge at once.

### 12.3 Low-quality, duplicate and spam content

| Problem | Safeguard |
|---------|-----------|
| Empty or junk portfolio items | Required title, role and category; at least one image or link |
| The same item added many times | The same link or image twice on one profile triggers a warning |
| Irrelevant uploads | Reporting; moderators can hide; ordering favours complete, confirmed work |
| Mass sign-ups | Bot check; rate limits; unfinished sign-ups removed |
| Copied profiles | Search rate limits; impersonation reports |

### 12.4 Misleading claims

- Achievements are labelled as claims unless confirmed.
- Experience entries do not imply confirmation.
- Opportunities are checked for scam signals, and a New organisation's first listing is reviewed by a person (D-013).
- **Follower count is never the measure of quality.** It is not a ranking signal on its own (section 9.3) and is not displayed as a headline figure.

---

## 13. Video and media

### 13.1 First release (approved: D-015, D-031)

| Topic | Requirement |
|-------|-------------|
| Formats | Images: JPEG, PNG, WebP. No video files, no PDFs, no animated or vector images. |
| Size | Up to 5 MB per image |
| Upload progress | Per file, with cancel and retry |
| Processing | Checked, re-encoded, location data removed, dimensions limited, original deleted |
| Thumbnails and previews | Several sizes produced or requested so that a phone downloads a small file. **To be decided (engineering):** produce sizes at upload, or resize on request; the latter is a paid feature on Supabase. |
| Video | By link to YouTube, Instagram, Vimeo, Twitch or Google Drive. The player loads only on tap. |
| Playback performance | The other platform's responsibility; our page must not slow down before the tap |
| Accessibility | Every image can carry a description (**proposed**: a prompt, not a requirement, in the first release). Videos rely on the host's captions. |
| Copyright | Report reason and takedown (E4) |
| Storage | Supabase Storage |

### 13.2 Cost controls

- Compression in the browser before upload.
- Limits per item and per day. **To be decided:** exact numbers.
- Deleting an item or an account deletes its images.
- Storage per professional is tracked (BRD section 15).
- **To be decided (engineering):** a total storage allowance per account.

### 13.3 Video hosting: a future option, deliberately deferred

Hosting video means storing large files, converting each into several qualities, delivering them over a content network, and paying for all three as usage grows. It also brings copyright handling for hosted files. It is excluded until there is paying demand (D-015; Phase 4).

**If it is ever built, these need decisions first:** which managed service; maximum length and size; who may upload; how conversion is paid for; caption support; a copyright process for hosted files; a cost ceiling per account.

---

## 14. Privacy, security, accessibility and performance

### 14.1 Data involved

| Data | Sensitivity | Where it lives |
|------|-------------|----------------|
| Email, password (never stored readably) | High | The login service |
| Date of birth | High | Its own table; no read access |
| Contact email, phone, WhatsApp | High | A separate private table |
| Guardian link and consent | High | Their own tables (Phase 11) |
| Profile and portfolio | Public by choice | Public tables with visibility rules |
| Applications and notes | Private to the applicant and the organisation | |
| Consent records, audit log | Records | Cannot be edited |
| Reports | Private to staff and the reporter | |

### 14.2 Privacy requirements

| ID | Requirement |
|----|-------------|
| PR-1 | Collect only what a feature needs; say why at the point of asking |
| PR-2 | Private data is stored apart from public data (D-014) |
| PR-3 | Contact details are disclosed only by specific, recorded, withdrawable consent (D-009) |
| PR-4 | Every access to disclosed contact details, age data or guardian data is logged (D-035) |
| PR-5 | People can see, correct and delete their data, and withdraw consents (FR-PRV) |
| PR-6 | No tracking, profiling or advertising aimed at under-18s (D-029) |
| PR-7 | No personal data in web addresses, logs, error reports or analytics events |
| PR-8 | Retention periods are set with legal advice (B6) and enforced by scheduled deletion |
| PR-9 | Real user data is never copied into the development database (D-004) |

### 14.3 Security requirements

| ID | Requirement |
|----|-------------|
| SR-1 | Row-level rules on every table; deny by default |
| SR-2 | Secrets never reach the browser or Git (enforced by tools) |
| SR-3 | Permissions never rely on anything a user can edit about themselves (D-036) |
| SR-4 | All input checked on the server; database constraints as the last line |
| SR-5 | Sensitive changes go through database functions that check the caller and write to the audit log |
| SR-6 | Uploads checked, re-encoded and size-limited (D-031) |
| SR-7 | Rate limits on sign-up, login, applications, reports, searches and requests |
| SR-8 | Browser security headers before any hosting |
| SR-9 | Backups and a tested restore before real users (D-033) |
| SR-10 | An independent security review before closed beta |
| SR-11 | Staff accounts protected by two-step login before they moderate real users (**proposed**) |

### 14.4 Accessibility requirements

| ID | Requirement |
|----|-------------|
| AR-1 | Aim: WCAG 2.2 level AA. **Proposed as the target; not a legal claim.** |
| AR-2 | Text contrast at least 4.5 to 1; controls and focus at least 3 to 1 |
| AR-3 | Everything works with the keyboard alone |
| AR-4 | Every control and image has a text alternative |
| AR-5 | Nothing relies on colour alone |
| AR-6 | Motion is reduced for people who ask their device for that |
| AR-7 | Touch targets at least 44px for primary actions |
| AR-8 | Text can be enlarged to 200% without loss |
| AR-9 | Tested with a real screen reader and on a real phone before closed beta |

### 14.5 Performance requirements

**Proposed targets, to be confirmed by measurement.** India-first means mid-range Android phones on mobile data.

| ID | Requirement | Proposed target |
|----|-------------|-----------------|
| PF-1 | A public profile's main content appears | Within 2.5 seconds on a mid-range phone on a 4G connection |
| PF-2 | The page responds to a tap | Within 200 milliseconds |
| PF-3 | Layout does not jump while loading | Layout shift score under 0.1 |
| PF-4 | Lists load in pages | 20 items at a time |
| PF-5 | Images are sized for the screen and load as they come into view | Always |
| PF-6 | A search returns | Within 1 second at 10,000 profiles |
| PF-7 | Works on a slow connection | Usable, with clear loading states, on a simulated slow 3G connection |

---

## 15. Notifications and email

### 15.1 Events

| Event | In-app | Email | Can be switched off? |
|-------|--------|-------|----------------------|
| Confirm your email; reset your password; security alerts | n/a | Yes | No. Required for the account. |
| Application received (to the organisation) | Yes | Yes, grouped | Yes |
| Application status changed (to the applicant) | Yes | Yes | Yes, except the final outcome (**proposed**) |
| Contact request received | Yes | Yes | No. It needs a decision. |
| Contact request answered or expired | Yes | Yes | Yes |
| Confirmation requested; answered; disputed | Yes | Yes | Yes |
| New follower; appreciation | Yes | No | Yes |
| Listing approved, held or removed | Yes | Yes | No |
| Report outcome | Yes | Yes | No |
| Moderation action on my account | Yes | Yes | No |
| Guardian: invitation; application made; status changed; approval needed | n/a | Yes | No (D-027, D-028) |

### 15.2 Rules

1. **Transactional only.** No marketing email in the first release. Any later marketing email needs separate, explicit agreement.
2. **Grouping.** Several events of one kind in a short time are sent as one email.
3. **A ceiling** on emails per person per day. **To be decided:** the number.
4. **Every email** says why it was sent and links to the notification settings.
5. **No personal details of other people** in an email beyond a name and the opportunity title. Contact details are never emailed.
6. **Under-18s:** hiring emails are copied to the guardian.
7. Emails come from an `@workaora.co.in` address once real delivery is set up (D-017, D-054).
8. Phone push notifications are not in the first release.

---

## 16. Analytics and event taxonomy

### 16.1 Rules

- **Under-18s are never identified in analytics.** Only anonymous totals (D-029).
- **No personal data in any event:** no names, emails, phone numbers, dates of birth, free text or search words.
- Prefer counting from the database over tracking in the browser.
- Analytics tooling is switched on only with the founder's approval (Phase 10).
- Whether a consent banner or notice is required is a legal question (B1).

### 16.2 Events

Properties are categories and counts only.

| Area | Event | When | Properties |
|------|-------|------|------------|
| **Activation** | `signup_started` | Date-of-birth screen opened | entry point |
| | `age_check_result` | After the check | eligible or not (no date) |
| | `account_created` | Account exists | method: email or google |
| | `email_confirmed` | Link opened | |
| | `onboarding_completed` | Account becomes active | number of roles; intent |
| **Portfolio** | `profile_field_completed` | A profile section first filled | which section |
| | `portfolio_item_started` | Add form opened | type |
| | `portfolio_item_published` | Published | type; image count; has video link |
| | `upload_failed` | An image is refused | reason category |
| **Discovery** | `search_performed` | A search runs | kind; filters used (names only); result count band |
| | `search_result_opened` | A result is opened | kind; position band |
| | `profile_viewed`, `opportunity_viewed` | Page opened | viewer logged in or not; source |
| | `follow_added` | Follow | target kind |
| **Connection attempts** | `application_started`, `application_submitted` | Apply form opened; sent | items attached |
| | `invite_sent` | If FR-APP-04 is approved | |
| | `contact_requested` | Request sent | |
| **Replies** | `application_status_changed` | Any change | from; to; hours since applying, in bands |
| | `contact_request_answered` | Applicant decides | shared or declined; which kinds of detail |
| **Successful collaboration** | `application_hired` | Marked hired | days since posting, in bands |
| | `credit_requested`, `credit_confirmed`, `credit_declined`, `credit_disputed` | Each state | |
| **Retention** | `session_started` | First activity in a visit | logged in or not |
| | Weekly activity | Calculated, not tracked | |
| **Hiring side** | `organisation_created`, `opportunity_published`, `opportunity_held`, `opportunity_closed` | Each | type; trust level; reason category |
| **Reports** | `report_submitted`, `report_resolved`, `block_added` | Each | target kind; reason; outcome; hours to first review, in bands |
| **Performance** | `page_load` | Sampled | page kind; load-time band; connection type |
| | `error_shown` | An error state is displayed | page kind; error category |

### 16.3 What cannot be measured well

- **A hire that happens off the platform.** Workaora knows only what someone marks (BRD section 15.3).
- **The quality of a collaboration.** There are no ratings in the first release, on purpose.
- **Anything about under-18s individually.**

---

## 17. Non-functional requirements and how each is tested

| ID | Requirement | How it is tested |
|----|-------------|------------------|
| NF-1 | **Permissions.** No role can read or change what it should not. | Automated tests against the development database that attempt each forbidden action as each role and check the reason for refusal |
| NF-2 | **Secrets.** No secret in the browser bundle, Git or logs. | Build-time lock; lint rules; tripwire tests; a scan of Git history at each phase end |
| NF-3 | **Age rules.** No ineligible person holds a usable account; no date of birth is readable. | Permission tests on boundary dates; end-to-end tests of both refusal paths |
| NF-4 | **Privacy of contact details.** Visible only through an active disclosure. | Permission tests as an unrelated user, an unrelated organisation, the same organisation on another application, and after withdrawal |
| NF-5 | **Accessibility** (section 14.4). | Automated scan on every screen in light and dark; keyboard tests; a screen-reader pass and a real-phone pass before closed beta |
| NF-6 | **Performance** (section 14.5). | Measured in a browser throttled to a mid-range phone on 4G, for the profile, opportunity, discover and feed pages, before closed beta |
| NF-7 | **Reliability.** A failure in one part of a page does not break the rest. | Tests that force a failure in each data source and check the page still renders with an error state |
| NF-8 | **Input safety.** No script or markup supplied by a user is ever executed. | Tests submitting markup in every text field; review of every place user text is shown |
| NF-9 | **Upload safety.** | Tests with oversized files, renamed files, and images carrying location data |
| NF-10 | **Rate limits.** | Tests that exceed each limit and expect refusal |
| NF-11 | **Auditability.** Every sensitive action leaves an entry that cannot be changed. | Tests that perform each action and read the log; tests that try to edit it |
| NF-12 | **Recoverability.** Data can be restored. | A restore rehearsal on the production plan before real users |
| NF-13 | **Internationalisation.** Names and text in Indian scripts are stored, searched and shown correctly. | Tests with Devanagari, Tamil, Bengali and Telugu samples |
| NF-14 | **Compatibility.** Current Chrome on Android, Safari on iPhone, and current desktop browsers. | A manual pass per phase; **to be decided:** the oldest versions supported |
| NF-15 | **Cost.** Stays within the planning ranges. | Monthly review of bills against active accounts |
| NF-16 | **Maintainability.** A beginner can follow the code and documents. | Every phase updates the documents; lint, type-check and tests on every upload |
| NF-17 | **No development tools in production.** | A check that development-only pages are absent from the production build |

---

## 18. Acceptance and release readiness

### 18.1 A requirement is accepted when

1. Its acceptance criteria and the common criteria (section 5.2) pass.
2. It works end to end against the development database with real, not made-up, data flow.
3. Its forbidden cases have passing tests.
4. Its documents are updated.
5. The founder has tried it.

### 18.2 Ready for closed beta (Gate 2)

- [ ] Every **Must** requirement in Phases 2 to 8 is accepted. Confirmed collaborations (Phase 9) accepted, or formally moved to version 1.1.
- [ ] Every "must never happen" case has a passing test.
- [ ] Automated checks, database tests and end-to-end tests pass; the production build succeeds.
- [ ] Accessibility: scans clean; screen-reader and real-phone passes done.
- [ ] Performance measured against section 14.5.
- [ ] An independent security review is done and its findings resolved or accepted in writing.
- [ ] A lawyer has reviewed the terms, privacy notice and guidelines, and answered the P1 and P2 questions that apply.
- [ ] Production database on the paid plan with backups; a restore rehearsed.
- [ ] Hosting on a plan that permits commercial use.
- [ ] Error monitoring that hides personal data.
- [ ] An incident procedure and a moderation procedure exist in writing.
- [ ] A grievance contact exists.
- [ ] Under-18 sign-up is **off**.
- [ ] At least 15 real opportunities are ready to be posted.
- [ ] The founder approves the spend and the release.

### 18.3 Ready to enable 16–17-year-olds

- [ ] Legal sign-off on the under-18 design (D-022).
- [ ] The guardian consent flow is built and tested (FR-MIN-01 to FR-MIN-05).
- [ ] The security review has covered minors' data paths.
- [ ] A child-safety escalation procedure exists in writing.
- [ ] The founder approves turning the switch on, with a written reason, which is logged.

### 18.4 Ready for public launch (Gate 3)

- [ ] Closed-beta evidence against the measures in the BRD.
- [ ] The issues found in the beta are resolved or accepted in writing.
- [ ] Search engines are allowed to list public pages.
- [ ] Email delivery from the Workaora domain is proven.
- [ ] The founder approves the launch.

---

## 19. Dependencies, risks, open questions and traceability

### 19.1 Dependencies

| Requirement area | Depends on |
|------------------|-----------|
| Accounts | Supabase login service; Google Cloud; Cloudflare Turnstile; email delivery |
| Profiles, portfolio | Storage; the upload pipeline |
| Opportunities | Organisations; moderation tools for the review queue |
| Contact sharing | Applications; consent records; the audit log (built in Phase 1) |
| Discovery | Enough profiles and opportunities to search |
| Notifications | Email delivery from the Workaora domain |
| Under-18 support | Legal answers A1 to A8, C1, C2, D1 to D3, E2; a way to verify a guardian |
| Closed beta | Lawyer; security review; paid plans; real opportunities |

### 19.2 Product risks

| Risk | Where it is handled |
|------|---------------------|
| The first release is large for one part-time builder | Section 4.1; cuts in the approved order |
| No way to reach someone found in search | Section 10.4 |
| Portfolio creation is too slow | FR-POR-01 to 03; experiment E3 in the BRD |
| Review queues overwhelm one moderator | FR-OPP-02 limits; FR-SAF-03; BRD risk R8 |
| The age check is only self-declared | FR-ACC-02; legal question A3 |
| Requirements written without user research turn out wrong | BRD sections 16 and 18 |

Business risks are in the BRD, section 13.

### 19.3 Unresolved questions

| # | Question | Affects | Who decides |
|---|----------|---------|-------------|
| U1 | Is "Invite to apply" (FR-APP-04) in the first release? | Phase 7 | Founder |
| U2 | Do esports game fields (FR-PRO-11) enter the first release? | Phase 3 | Founder, after interviews |
| U3 | What happens when a Google email matches an existing email account? | FR-ACC-04 | Founder, with engineering advice |
| U4 | How often can a username change, and do old ones redirect? | FR-PRO-02 | Founder |
| U5 | Is location free text or a fixed list of cities and states? | FR-PRO-01; search | Founder |
| U6 | What counts as a "hire" for measurement? | BRD section 15.3 | Founder |
| U7 | Retention periods, and what survives account deletion | FR-PRV-01, FR-CON-03, FR-ACC-08 | Lawyer |
| U8 | Is a 24-hour device marker after an age refusal acceptable? | FR-ACC-01 | Lawyer |
| U9 | How is a guardian verified? | FR-MIN-01 | Lawyer |
| U10 | Exact conditions for opportunities open to minors | FR-OPP-05 | Lawyer |
| U11 | Limits marked "to be decided": items, images, skills, links, daily limits, storage per account | Several | Engineering proposes, founder approves |
| U12 | Oldest browser versions supported | NF-14 | Engineering proposes, founder approves |
| U13 | Should owning a linked channel be provable? | Section 12.1 | Founder |
| U14 | Are image sizes produced at upload, or resized on request (a paid feature)? | Section 13.1 | Engineering proposes, founder approves |

### 19.4 Traceability: business goals to requirements to measures

| BRD goal | Product goal | Requirements | Measures (BRD section 15) |
|----------|--------------|--------------|---------------------------|
| G1 Prove the hiring loop | PG1, PG3 | FR-OPP-01 to 04; FR-APP-01 to 03; FR-CON-01 to 03; FR-DIS-01 to 03 | Hires recorded; shortlist rate; contact shared; time to first status change |
| G2 Credible supply | PG2 | FR-ONB-01; FR-PRO-01 to 10; FR-POR-01 to 06; FR-CRD-01, 02 | Activated professionals; portfolio depth; profile completeness; confirmed collaborations |
| G3 Real demand | PG1 | FR-ORG-01 to 03; FR-OPP-01 to 04; FR-APP-03 | Activated hirers; repeat hirers; opportunities with at least 3 applications |
| G4 Trusted and safe | PG4, PG5 | FR-ACC-01, 02, 07; FR-PRO-08, 09; FR-OPP-02, 05; FR-CON-01 to 03; FR-SAF-01 to 04; FR-PRV-01 to 03; FR-MIN-01 to 05; sections 12 and 14 | Scam listings reaching applicants; time to first review; listings held; accounts suspended; reports upheld |
| G5 Repeat use | PG3 | FR-FOL-01 to 03; FR-NOT-01, 02; FR-DIS-01 to 03 | Week-1, week-4 and week-12 return; repeat applicants |
| G6 Within means | PG6 | Section 13.2; FR-POR-02; NF-15; scope in section 4 | Infrastructure cost per active account; storage per professional; moderator minutes |
| G7 Learn before scaling | PG7 | Section 16; NF-11 | Every measure above being available by closed beta |

---

## Appendix A. Where version 1.0's requirements went

Version 1.0 of this document covered Phase 2 only and numbered its requirements R1 to R9. Nothing was dropped.

| Version 1.0 | Now |
|-------------|-----|
| R1 Age check comes first | FR-ACC-01, FR-ACC-02 |
| R2 Sign up with email and password | FR-ACC-03, FR-ACC-07 |
| R3 Sign up or log in with Google | FR-ACC-04 |
| R4 Log in and log out | FR-ACC-05 |
| R5 Forgotten password | FR-ACC-06 |
| R6 Onboarding (adults) | FR-ONB-01 |
| R7 Terms and Privacy Notice | FR-ACC-09 |
| R8 Every screen | Section 5.2 (C1 to C10) |
| R9 Things that must never happen | FR-ACC-02; NF-1, NF-2, NF-3; section 18.2 |
| "What done means for Phase 2" | `PHASE_2_PLAN.md`, "Phase 2 is complete when" |
