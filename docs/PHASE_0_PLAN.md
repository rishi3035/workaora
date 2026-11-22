# Phase 0 Plan: Research, MVP, Architecture and Execution

**Version:** 2.1 (APPROVED by founder on 22 Nov 2026; implementation not started)
**Date:** 22 November 2026
**Builds on:** `Creator_Economy_Startup_Strategy.docx` (v1.0)
**Companion files:**
- `DECISIONS.md`: status of every decision. All of D-001 to D-037 are now settled (D-012's original proposal was rejected and replaced).
- `LEGAL_QUESTIONS.md`: questions for a qualified Indian lawyer.

No application code has been written. Prices and legal sources were checked on 22 November 2026 (see Sources). Market statements are hypotheses until validated.

---

## 0. What changed in version 2

### 0.1 Summary of founder decisions applied

- **Age eligibility changed from 18+ to 16+.** Age-awareness is now part of the architecture: onboarding, data model, visibility, hiring, contact sharing, credits, analytics and future messaging (§5).
- **Contact sharing changed.** Shortlisting no longer reveals anything. Applicants give explicit, field-specific, recorded and withdrawable consent (§5.5).
- **Verified credits** now include accept, decline, revoke and dispute. The wording is "Collaboration confirmed", never an endorsement (§5.6).
- **Organisation review** now includes trust levels, scam signals and verification (§5.7).
- **Esports interviews** were added to validation; the platform supports all roles from day one (§1.4, §8).
- **Timeline** reset to a quality-first, part-time plan: roughly **14–18 months** to public launch at about 20 hours per week. To be re-estimated after Phase 1, once your real pace is known (§6).
- **Budget** re-estimated. The upper end now exceeds ₹3 lakh because of under-18 support (§7, D-037).
- **Vercel and Resend** terms were checked again. Our earlier "Hobby for private dev" plan is not clearly allowed (§3.2, D-032).

**Version 2.1 (22 Nov 2026):** the founder approved D-022–D-037 as proposed. Status labels below were updated to "Accepted". No other content changed.

**Version 2.2 (22 Nov 2026):**
- Brand name is **Workaora** (D-038).
- The repo is at `C:\dev\workaora`, with these docs in `docs/`.
- Foundation work starts before validation completes (D-039). The validation and legal steps in §8 and §10 remain outstanding, and gates are unchanged.

### 0.2 Conflicts found between decisions, and how they are resolved

| # | Conflict | Resolution (and its status) |
|---|----------|-----------------------------|
| C1 | **D-012 (16+) vs safe launch.** The law requires verifiable parental consent for anyone under 18. The mechanism may depend on legal advice and identity tokens (e.g. DigiLocker) that take time to arrange. | Build every age-aware structure from Phase 1. Keep under-18 sign-up behind a server-side switch until legal sign-off, a tested guardian flow and a security review are all done. Closed beta is 18+. *D-022, Accepted* |
| C2 | **D-012 vs D-020 budget.** Minors add legal, verification and moderation costs. The upper estimate exceeds ₹3 lakh. | Stage the spending, look for incubator legal clinics, and defer non-essential spend. *D-037, Accepted: options (a)+(b)+(d)* |
| C3 | **D-012 vs D-011 (creators can own organisation pages).** Minors cannot form binding contracts under Indian law, but owning a page that hires creates hiring obligations. | Under-18s cannot own organisations or post jobs in v1. A guardian can own the page with the minor as a member. *D-026, Accepted* |
| C4 | **D-012 vs D-009 (contact sharing).** Consent from a minor alone is not valid consent for processing their data. | Minors share email only, and every disclosure needs guardian approval with the guardian copied. *D-028, Accepted* |
| C5 | **D-012 vs D-007/D-016 (feed, search, SEO).** Public discoverability of minors creates safety risk, and DPDP bars behavioural monitoring of children. | Minors are members-only and hidden from search engines. Verified organisations see them in talent search only with opt-in. Chronological feed, no tracking. *D-025, D-029, Accepted* |
| C6 | **D-012 vs D-010 (credits).** A confirmed credit could publicly link a minor's name to an adult's or organisation's page. | Minors' credits show only on the minor's own (members-only) profile, never on the other party's public page. *Accepted within D-010* |
| C7 | **D-012 vs D-013 (organisation review).** Minor-eligible jobs need stronger trust than "first job reviewed". | Add a "Verified" organisation level, required for minor-eligible jobs. *D-034, D-027, Accepted* |
| C8 | **D-015 (5 MB uploads) vs Vercel's ~4.5 MB request-body limit** | Upload directly to a private storage bucket, then reprocess on the server. This also strips GPS metadata. *D-031, Accepted* |
| C9 | **D-018 (Hobby for private dev) vs Vercel's definition of commercial use** | Run locally during the build. Vercel Pro from closed beta, or get a written OK from Vercel support. *D-032, Accepted* |
| C10 | **D-004/D-020 (Supabase Pro at public launch) vs real personal data in closed beta** | Supabase Pro for `prod` from closed beta: backups and no pausing. *D-033, Accepted* |
| C11 | **D-012 vs Terms of Service.** A minor's acceptance of the Terms may not be a valid contract. | The guardian accepts the Terms on the minor's behalf. *Within D-024, Accepted; lawyer to confirm* |
| C12 | **Validation (Phase 0) vs minors.** Interviews and the concierge form would collect minors' data without guardian consent. | Phase 0 research is 18+ only. Learn about 16–17-year-olds by interviewing 18–19-year-olds about their recent experience, and parents. *Applied in §8* |

---

## 1. The business: opportunities, risks, assumptions

### 1.1 What is genuinely strong

1. **The hiring loop is frequent (hypothesis).** Creators hire editors, thumbnail designers and writers per video or per month, which gives users a reason to come back.
2. **The work is visual.** A portfolio shows skill faster than a CV, which is our main difference from LinkedIn.
3. **Today's workflow is messy.** Hiring happens across X, Instagram DMs, Discord, WhatsApp groups and referrals.
4. **India-specific needs** that global tools handle poorly:
   - ₹ rates, often per video;
   - regional-language content;
   - WhatsApp as the default contact channel;
   - a large 16–17 talent pool that needs safe handling.
5. **Confirmed collaborations as a moat.** Two-sided confirmed credits build a trusted collaboration graph that competitors cannot copy without both sides already being present.
6. **Safety as a feature.** Visible scam protection, organisation verification and a safe experience for teenage talent can be a trust advantage over DMs and Telegram groups. Positioning hypothesis: parents and young talent prefer a platform with guardrails.

### 1.2 Biggest risks (ranked)

| # | Risk | Mitigation |
|---|------|------------|
| R1 | **Cold start / empty marketplace** | Narrow marketing wedge, manual recruitment on both sides, a feed built from work and jobs |
| R2 | **"DMs are good enough"** | Posting a job takes under 2 minutes; applications arrive with portfolios; validate first |
| R3 | **Scope creep** | D-006 exclusions; strict phase acceptance criteria |
| R4 | **Job scams and fake recruiters** | Trust levels, first-job review, scam-signal holds, "we never charge applicants" policy |
| R5 | **Harm to minors** (exploitation, grooming, unsafe work, data misuse) | Age-aware architecture, guardian consent, privacy defaults, no adult–minor messaging, Verified-only minor jobs, a priority child-safety report queue, legal review |
| R6 | **Legal non-compliance** (DPDP children's provisions, labour law, intermediary rules, gaming law) | Legal questions logged from day one, early consultation, minors behind a switch until sign-off |
| R7 | **Security mistakes by a beginner** | RLS on every table, private data in separate tables, permission tests, audit log, external review |
| R8 | **Unproven monetisation** | No payments until usage exists |
| R9 | **Founder bandwidth** (part-time, learning) | Quality-first timeline, small phases, outsource only legal and security review |
| R10 | **Cost overrun from under-18 support** | Spending gates, D-037 options |

### 1.3 Assumptions to test

- A1: Regular hirers find current hiring painful enough to try something new.
- A2: Talent will maintain a portfolio here; it must be faster than a Drive folder.
- A3: Hirers prefer structured portfolios to DM replies.
- A4: One niche produces enough real opportunities to keep talent engaged weekly.
- A5: Confirmed collaborations are valued by both sides.
- A6: Esports hiring volume justifies equal initial focus (tested with 8–10 interviews).
- A7: Someone will eventually pay for hiring tools.
- A8: Hirers are willing to work with 16–17-year-old talent under the safeguards, and guardians are willing to complete a consent flow. *New: if guardians won't complete consent, minor support may see little use despite its cost.*

### 1.4 Market wedge (D-005)

- **Marketing wedge:** production talent (video editors, thumbnail designers, scriptwriters, motion designers) ⇄ YouTubers, creators, agencies and production studios.
- **Product scope:** all creator-economy, esports and organisation roles can register and use every feature from day one.
- **Esports check:** 8–10 interviews with esports professionals and organisations. If esports shows equal or stronger pull (urgency, frequency, willingness to participate), it gets equal launch focus.
- **Avoid for now:** creator ⇄ brand deal-making (crowded, and it needs payments and trust infrastructure).

### 1.5 Positioning (draft)

> *A work-first profile and hiring network for India's creator economy and esports industry. Show your work, get collaborations confirmed by the people you worked with, and get hired safely.*

### 1.6 Competitive landscape (to verify in a teardown)

General positioning only. No metrics are claimed. In Phase 0, spend about an hour using each product.

| Product | Good at | Gap for our users |
|---------|---------|-------------------|
| LinkedIn | Professional identity, corporate hiring | CV-first; creator and esports roles feel out of place |
| Instagram | Visual discovery | No hiring workflow; DMs are chaotic |
| Discord | Community, chat | No searchable professional identity |
| Behance / Dribbble | Design portfolios | Design-centric, global, weak for video and esports roles |
| Fiverr / Upwork | Paid gigs | Fees, global competition, transaction-shaped |
| Contra | Commission-free freelance profiles | India and creator fit *to verify* |
| Internshala / Wellfound | Internships, startup jobs | Not portfolio- or creator-specific |
| Hitmarker | Gaming/esports job listings | A job board, not a network; *verify India relevance* |
| Talentrack, CreateCrew | *Not yet researched* | Teardown needed |
| **DMs + WhatsApp/Telegram groups + referrals** | Free, fast, trusted | No proof, no structure, no protection, unsafe for minors |

---

## 2. The MVP

### 2.1 What the MVP must prove

> **A creator or organisation can post a real opportunity and safely hire someone they found through portfolios, faster and with more confidence than through DMs.**

### 2.2 In the MVP (v1.0)

| # | Feature | Key rules |
|---|---------|-----------|
| 1 | **Auth** | Email + password, Google sign-in, email verification, password reset, secure sessions, Cloudflare Turnstile on sign-up |
| 2 | **Age-aware onboarding** | Neutral date-of-birth screen. Under 16: blocked. 16–17: guardian flow (switched off until D-022 conditions are met). 18+: roles, intent (work/hire/both), city, languages. Privacy notice and consent recorded. |
| 3 | **Profiles** | Avatar, cover, name, username, headline, bio, location, roles, skills, languages, availability, optional ₹ starting rate, social links, experience. Shareable link previews for adults. Age-based visibility (§5.4). |
| 4 | **Portfolio** | Work items and achievements. Images go through the secure pipeline (D-031). Video via links (YouTube, Instagram, Vimeo, Twitch, Drive). |
| 5 | **Organisations** | Pages with owner/admin/recruiter members, invites, trust levels (D-034). Adults only as owners. |
| 6 | **Opportunities** | Full job fields. First job of a New organisation goes to review. Scam-signal holds. Optional "open to 16–17" flag (D-027). |
| 7 | **Applications** | Apply with a note and up to 3 portfolio items. Statuses: submitted → viewed → shortlisted → rejected/hired, or withdrawn. Status history kept. |
| 8 | **Consent-based contact sharing** | Organisation requests contact. The applicant picks specific fields to share; consent is recorded and withdrawable. Guardian approval for minors (§5.5). |
| 9 | **Discovery** | Talent and job search with filters (role, skill, city, language, availability, job type, remote). Age-aware results. |
| 10 | **Follow + feed** | Following feed (work and jobs from people you follow) + Fresh work. Chronological. "Appreciate" only. |
| 11 | **Notifications** | In-app + email for important events. Guardians are copied on minors' hiring events. |
| 12 | **Safety & privacy** | Report (with child-safety and scam reasons), block, admin dashboard (reports, job review, organisation verification, credit disputes, suspensions), audit log, account deletion, data access requests, grievance contact, community guidelines. |
| 13 | **Verified credits** | Request → accept/decline → revoke → dispute. Last MVP feature; may slip to v1.1. |

### 2.3 Excluded from the MVP (D-006)

| Feature | Revisit when |
|---------|--------------|
| Communities | Validation shows a need Discord does not meet |
| Direct messaging | v2, with under-18 restrictions designed in (§5.9) |
| Free-text posts and comments | Users ask for them and moderation capacity exists |
| Native apps | Demand proven (D-001) |
| Video hosting | Phase 4, paying demand |
| Payments and subscriptions | Phase 3, after usage |
| Résumé/PDF uploads | Clear need; the profile is the résumé |
| Two-way connections | Not planned (D-008) |
| Phone OTP login | Later (needs DLT registration and costs money per SMS) |

### 2.4 Phase 1 completion requirement (revised)

**Adults**
- A user can register, complete onboarding, create a profile, add portfolio work, discover others, follow them, find a job, apply, consent to share contact details, and receive notifications.
- An organisation can create its page, pass review, publish an opportunity, manage applications, and request contact details.

**Minors** (once the switch is on)
- A 16–17-year-old can sign up only after verified guardian consent. Their profile has minor defaults.
- They can apply only to eligible jobs.
- Contact sharing requires guardian approval.
- Every rule is covered by automated permission tests.

---

## 3. Architecture

### 3.1 Web-first (D-001, accepted)

- A Next.js web app, mobile-first and responsive.
- Expo native apps later, sharing TypeScript types, Zod schemas and data access from feature folders.
- **Why:** server-rendered pages give link previews on WhatsApp/Instagram and let search engines index public profiles and jobs. It is also one codebase for a beginner to learn.

### 3.2 Stack

| Layer | Choice | Cost | Notes |
|-------|--------|------|-------|
| Language | TypeScript | Free | |
| Web | Next.js (App Router) | Free | |
| Styling | Tailwind CSS + own design tokens; Radix primitives for accessibility | Free | |
| Validation | Zod (shared by browser and server) + database constraints | Free | |
| Backend | Supabase: Postgres, Auth, Storage, RLS | Free (dev) → Pro $25/mo (prod, from closed beta, D-033) | Choose the Mumbai region if available |
| Server logic | Next.js server actions + Postgres functions/triggers | Free | Supabase Edge Functions only if needed |
| Email | Resend | Free (100/day, 3,000/mo) → ~$20/mo when volume needs it | Verified 22 Nov 2026 |
| Images | Supabase Storage + server re-encoding (D-031) | Included | Strips EXIF/GPS |
| Video | External links only | Free | |
| Search | Postgres full-text + `pg_trgm` | Free | |
| Hosting | Local during build. **Vercel Pro from closed beta** (D-032). | $20/mo from closed beta | Hobby is non-commercial; Vercel defines commercial broadly |
| Feature flags | A simple `app_settings` table read on the server | Free | Controls the under-18 sign-up switch |
| CI | GitHub Actions | Free | |
| Errors | Sentry free tier | Free | Scrub personal data from error reports |
| Analytics | PostHog free tier, **adults only, identified; under-18s aggregate only** (D-029) | Free | |
| Tests | Vitest, Playwright, permission tests against `dev` | Free | |
| Design | Figma (free) for wireframes; design system in code | Free | |

### 3.3 Environments (D-004)

- **`dev` Supabase project:** test data allowed; free plan (pauses when idle).
- **`prod` Supabase project:** real users only. Pro plan from closed beta.
- **Credentials are separated.** The local `.env.local` file contains **dev** keys only. Production keys live only in Vercel's environment settings, and production migrations run through a documented command you approve each time.
- **No Docker.** All schema changes are migration files in Git, applied to `dev` first and to `prod` only after tests pass.
- **Never** copy real production data into `dev`.

### 3.4 Code structure (D-003)

```
/app                  → routes and pages
/src/features/<name>/ → components, queries, actions, schemas, tests
   auth · onboarding · age-guardian · profiles · portfolio · orgs · jobs
   applications · contact-sharing · feed · search · notifications
   credits · moderation · privacy (consents, data requests)
/src/ui/              → design system
/src/lib/             → Supabase clients (browser / server / admin-server-only), helpers
/supabase/migrations  → ordered SQL migrations
/docs                 → all documentation (§9.4)
```
The Supabase "admin" (service-role) client sits in a server-only module. The build fails if browser code imports it.

### 3.5 When the architecture must evolve

| Signal | Change |
|--------|--------|
| Mobile-heavy usage + demand for an app or push notifications | Expo app; restructure into a monorepo |
| Search slow or irrelevant at tens of thousands of profiles | Dedicated search service |
| Sustained high database load | Bigger compute, caching, query tuning |
| Validated demand for chat | Messaging per §5.9 |
| Paying demand for video | A managed video provider |

---

## 4. Product structure

### 4.1 Account model

- One account per human; multiple roles per person.
- Organisations are pages with members: owner, admin, recruiter. **Owners and admins must be 18+** (D-026).
- **Age bands** are derived from the private date of birth:
  - `under_16`: blocked;
  - `minor` (16–17): restricted;
  - `adult` (18+).
- **Guardian link:** an adult account linked to a minor account, with consent records.
- **Staff:** admins and moderators in a separate table.

### 4.2 Feature map

```
Public (logged out) → Adult profiles, portfolios, organisation pages, open jobs (indexable)
                      Minors' content: NOT visible
Adult talent        → Profile · Portfolio · Credits · Apply · Track · Share contact (consent)
                      Follow · Feed · Appreciate · Notifications · Privacy settings
Minor talent (16–17)→ Same as adult talent, except: members-only profile, eligible jobs only,
                      email-only contact with guardian approval, no organisation ownership,
                      no tracking or personalisation
Guardian            → Link to minor · Consent per purpose · Approve contact disclosures
                      View minor's privacy settings and applications · Revoke consent
Hirer (org member)  → Organisation page · Team · Post jobs · Pipeline · Request contact
                      Talent search (minors only if organisation is Verified and the minor opted in)
                      Confirm/decline/revoke/dispute credits
Everyone            → Report · Block · Settings · Download my data · Delete account · Grievance
Staff               → Reports (child-safety priority) · Job review · Organisation verification
                      Credit disputes · Suspensions · Audit log viewer
```

### 4.3 User journeys

**Adult professional (video editor, Pune)**
1. Opens a shared job link, signs up with Google, enters date of birth (adult).
2. Picks roles, intent, languages, city. Reads the privacy notice; consent is recorded.
3. Adds portfolio items. Images are reprocessed and location data stripped automatically.
4. Applies to a job with a note and 2 items.
5. Is shortlisted. The organisation sends a contact request. The editor chooses "email only" for this organisation; consent is recorded.
6. Later, tags the creator on the portfolio item. The creator confirms, and the item shows "Collaboration confirmed by …".

**16–17-year-old thumbnail designer** (after the switch is on)
1. Signs up and enters date of birth. The account is created in a **pending guardian** state: nothing is visible and only minimal data is stored.
2. Enters a parent's email. The parent receives an explanation and a link.
3. The parent creates or logs into an adult account, verifies adulthood by the approved method, reads the notice, accepts the Terms for the minor, and consents per purpose.
4. The account activates with minor defaults: members-only, state-level location, no public age, hidden follower lists.
5. The minor applies to a job marked "open to 16–17" by a Verified organisation. The guardian is notified.
6. The organisation requests contact. The minor proposes email sharing, the guardian approves, and the guardian is copied.
7. If the guardian doesn't complete consent within 14 days, the pending account is deleted.

**Creator hiring (adult YouTuber)**
1. Signs up as "I'm hiring" and creates the channel's organisation page (New level).
2. Posts an opportunity from a template in under 2 minutes. The first post goes to review.
3. Reviews portfolios, shortlists, requests contact. Sees only the fields each applicant consents to.
4. Marks hired, closes the job, and confirms credits later.

**Esports professional (adult analyst)**
- Roles, achievements (tournament placings), VOD links, team history.
- Follows esports organisations and applies to tryouts. Game-specific fields come later if esports validation is strong.

**Organisation (agency/esports organisation)**
1. Owner creates the page and invites recruiters.
2. The first job is reviewed, which makes the organisation Reviewed.
3. Optionally applies for Verified status with evidence, which unlocks minor-eligible jobs and minors in talent search.

**Recruiter**
- Works only within their own organisations' jobs and applications. The database enforces this.
- Every view of a candidate's contact details is logged.

**Guardian**
- Has one adult account, possibly linked to more than one minor.
- Dashboard per minor: settings, applications, disclosure approvals, and a "revoke consent" button, which pauses the minor's account and begins deletion per policy.

---

## 5. Data, security, privacy and child safety

### 5.1 Tables

Notation: `pk` primary key, `fk` foreign key, `uq` unique. `*` = protected column that users cannot change; only staff or database functions can. All tables have `created_at`; editable ones have `updated_at`.

```
-- Identity, age, guardian
profiles              id pk = auth user id · username uq · display_name · headline · bio
                      · region_public (state-level) · city (private for minors) · languages[]
                      · avatar_path · cover_path · availability · starting_rate_inr · rate_unit
                      · intent · account_state* (pending_guardian|active|paused|suspended|deleted)
                      · age_band* (minor|adult)            -- derived; DOB itself is NOT here
age_records           profile_id pk/fk · date_of_birth · declared_at · assurance_method*
                      · assurance_reference* · reviewed_by*          -- owner can't read others; staff via audited function
guardian_links        id · minor_id fk · guardian_id fk · relationship · status* (invited|verified|revoked|expired)
                      · invite_token_hash · invited_at · verified_at · revoked_at · expires_at
                      · verification_method* · verification_reference*  (no raw ID numbers stored)
profile_private       profile_id pk/fk · contact_email · phone · whatsapp   -- owner only (+ guardian for minors)
privacy_settings      profile_id pk/fk · profile_visibility (public|members) · search_indexable
                      · discoverable_by (everyone|verified_orgs|none) · show_follow_lists
                      -- minors: forced values enforced by DB trigger
staff                 profile_id pk/fk · role (admin|moderator) · granted_by · granted_at
app_settings          key pk · value     -- e.g. minors_signup_enabled = false; staff-only write

-- Professional identity
roles, skills         curated lookups (category: creator_economy|esports|business)
profile_roles         profile_id · role_id · is_primary
profile_skills        profile_id · skill_id
profile_links         id · profile_id · platform · url
experiences           id · profile_id · title · org_name · organisation_id null · dates · description

-- Portfolio & credits
portfolio_items       id · profile_id · kind (work|achievement) · title · description · role_on_project
                      · external_url · embed_provider · cover_path · event_name/date · is_hidden*
portfolio_media       id · item_id · path · position · width · height · processed_at*
upload_quarantine     id · uploader_id · storage_path · status (pending|accepted|rejected) · reason
portfolio_tags        item_id · skill_id
credits               id · item_id · requester_id · credited_profile_id | credited_org_id (exactly one)
                      · status* (pending|confirmed|declined|revoked|disputed)
                      · responded_by · responded_at · revoked_by · revoked_at
credit_disputes       id · credit_id · raised_by · reason · status (open|upheld|rejected) · resolved_by

-- Organisations & hiring
organisations         id · slug uq · name · type · about · logo_path · website · city
                      · trust_level* (new|reviewed|verified) · is_suspended*
organisation_members  org_id · profile_id · role (owner|admin|recruiter)   -- owner/admin must be adult (trigger)
organisation_invites  id · org_id · email · role · token_hash · expires_at · accepted_at
org_verifications     id · org_id · evidence_type · evidence_reference · status · reviewed_by · notes
jobs                  id · org_id · posted_by · title · description · employment_type · work_mode
                      · city · experience_level · comp_min · comp_max · comp_unit · deadline
                      · status* (draft|pending_review|open|closed|removed) · review_reason*
                      · open_to_minors · minor_attestation (jsonb: non_hazardous, no_night_work,
                        guardian_party_to_agreement) · attested_by · attested_at
job_roles, job_skills
applications          id · job_id · applicant_id · note · portfolio_item_ids (≤3)
                      · status* · applicant_age_band_at_apply*    uq(job_id, applicant_id)
application_events    id · application_id · from_status · to_status · changed_by · created_at

-- Consent & contact sharing
consent_records       id · profile_id · given_by (self|guardian) · given_by_id · purpose
                      · notice_version · method · granted_at · withdrawn_at
contact_requests      id · application_id · requested_by · requested_at · status (open|answered|expired)
contact_disclosures   id · application_id · org_id · profile_id · fields[] (email|phone|whatsapp)
                      · consent_record_id · guardian_approval_id null · granted_at · withdrawn_at · expires_at

-- Social
follows               follower_id · followed_profile_id | followed_org_id (exactly one)
appreciations         profile_id · item_id
notifications         id · recipient_id · type · actor_id · entity_type · entity_id · read_at

-- Safety, privacy, audit
blocks                blocker_id · blocked_id
reports               id · reporter_id · target_type · target_id
                      · reason (spam|scam|harassment|impersonation|child_safety|underage_user|ip|other)
                      · priority* · details · status
moderation_actions    id · staff_id · target_type · target_id · action · reason · report_id
data_requests         id · profile_id · type (access|correction|erasure|grievance|nominee)
                      · status · due_at · closed_at · notes
audit_log             id · actor_id · action · target_type · target_id · metadata · created_at   -- append-only
```

**Not created in v1:** posts, comments, communities, messages, education, connections.

**New because of under-18 support (D-012):**
- tables: `age_records`, `guardian_links`, `privacy_settings`, `consent_records`, `contact_requests`, `contact_disclosures`, `app_settings`, `org_verifications`, `upload_quarantine`, `credit_disputes`, `data_requests`, `audit_log`;
- columns: `profiles.account_state`, `profiles.age_band`, `jobs.open_to_minors` + attestation, `applications.applicant_age_band_at_apply`;
- report reasons: `child_safety` and `underage_user`.

Some of these (consent, audit, disputes, data requests) would be needed for adults too. Under-18 support made them non-optional.

### 5.2 Indexes and performance

- Unique `profiles(username)`; trigram on `display_name`, `headline`.
- Filters: `profile_roles(role_id)`, `profile_skills(skill_id)`, `profiles(age_band, account_state)`, `privacy_settings(discoverable_by)`.
- `jobs(status, created_at desc)`, `jobs(open_to_minors) where status='open'`; full-text on jobs.
- `applications(job_id, status)`, `applications(applicant_id)`.
- `portfolio_items(created_at desc)`, `follows(follower_id)`, `notifications(recipient_id, read_at, created_at desc)`.
- `audit_log(target_type, target_id, created_at)`.
- Cursor pagination everywhere (20 items per page).

### 5.3 Permission model (Row Level Security + server functions)

Helper database functions (security-definer, tested): `is_staff()`, `is_adult(profile)`, `is_guardian_of(minor)`, `is_org_member(org, roles[])`, `can_view_profile(viewer, profile)`.

| Table | Read | Write |
|-------|------|-------|
| profiles | `can_view_profile()`: adults public; minors to logged-in members only; never pending/suspended/deleted | Owner, safe columns only; protected columns via functions |
| age_records | **Nobody directly.** Owner sees their own age band only; staff through an audited function | Created once at onboarding through a function; corrections via staff |
| guardian_links | The minor and the guardian | Through invite/verify/revoke functions only |
| profile_private | Owner; guardian of a minor | Owner; guardian of a minor |
| privacy_settings | Owner, guardian | Owner, guardian. A trigger forces minor defaults that cannot be loosened. |
| portfolio_* | Follows the owner's profile visibility | Owner |
| credits | Confirmed: visible to anyone who can see the item; a minor's credits never appear on the other party's pages. Pending/disputed: the two parties + staff. | Requester creates; credited party accepts/declines; either revokes or disputes, through functions |
| organisations | Anyone | Owner/admin (adults); trust level by staff only |
| organisation_members | Anyone (team list); minors' membership hidden from the public | Invites/functions; owner/admin role requires an adult |
| jobs | Open jobs: anyone; all statuses: organisation members, staff | Recruiter+ members; status transitions via functions; `open_to_minors` only if the organisation is Verified (trigger) |
| applications | Applicant, the applicant's guardian, members of the job's organisation | Insert by applicant (job open, before deadline, not blocked, minors only on `open_to_minors` jobs); status via `set_application_status()` / `withdraw_application()` |
| contact_disclosures | Read via `get_disclosed_contact(application)` only: checks membership, an active disclosure, application not closed; **writes an audit entry on every read** | Created by the applicant (+ guardian approval for minors); withdrawn by applicant or guardian |
| consent_records | Owner, guardian, staff | Functions only; never deleted (withdrawal is a new timestamp) |
| follows / appreciations | Anyone (follow lists hidden for minors) | Self; blocked users cannot follow or appreciate |
| notifications | Recipient | Triggers only; recipient marks as read |
| reports | Staff; the reporter sees their own | Any member |
| staff, moderation_actions, app_settings, org_verifications, credit_disputes, data_requests | Staff (owners see their own data requests) | Staff / functions |
| audit_log | Staff | Insert-only via functions; no update or delete for anyone |

### 5.4 Under-18 safeguards (architecture requirements)

| Area | Safeguard |
|------|-----------|
| **Onboarding** | Neutral date-of-birth screen; under 16 blocked (D-023); 16–17 kept in `pending_guardian` with minimal data until verified guardian consent (D-024); 14-day expiry; guardian accepts the Terms |
| **Age assurance** | A self-declared date of birth is **not** assumed sufficient. Guardian adulthood verification uses a method approved by the lawyer. An `underage_user` report reason triggers re-verification. Adults' age assurance level is a legal question. |
| **Date of birth** | Stored only in `age_records`; never in the profile, auth metadata, URLs, logs or analytics |
| **Visibility** | Members-only, not search-indexed, state-level location, no public age, hidden follow lists, no link-preview images on social apps (D-025) |
| **Never exposed for anyone under 18** | Phone, email, school, precise location, date of birth, other sensitive data. **Free-text fields are checked** for phone numbers/emails on save, with a warning, because minors may paste them into bios. |
| **Hiring** | Eligible jobs only (D-027); guardian notified of applications and status changes; minors cannot own organisations or post jobs (D-026) |
| **Contact sharing** | Email only; per-disclosure guardian approval; guardian copied (D-028) |
| **Credits** | Not shown on other parties' pages; no contact channel; reportable |
| **Discovery** | Only Verified organisations' members, only with opt-in |
| **Analytics/feeds** | No tracking, behavioural monitoring, personalisation or ads (D-029) |
| **Moderation** | `child_safety` reports go to a priority queue with a documented escalation runbook (including when to involve authorities; lawyer to confirm duties) |
| **Turning 18** | A scheduled job moves the account to adult, asks for the user's own consent and settings review, and ends the guardian's control (legal question on mechanics) |
| **Future messaging** | §5.9 |
| **Testing** | Every safeguard has automated tests that attempt the forbidden action (e.g. an unverified organisation tries to see a minor in search) |

### 5.5 Contact sharing workflow (D-009 modified, D-028)

1. The organisation shortlists the applicant. **Nothing is disclosed.**
2. The organisation clicks "Request contact details", which creates a `contact_request`. The applicant is notified.
3. The applicant sees exactly who is asking, for which job, and checkboxes for each field they have saved: email / phone / WhatsApp. Minors see email only.
4. For a minor: the request goes to the guardian, who approves or declines it. The guardian is copied on the disclosure.
5. A `consent_record` and a `contact_disclosure` are created. They are tied to that organisation, that application, the chosen fields and the notice version.
6. Organisation members read the contact details only through `get_disclosed_contact()`. Each read is audit-logged.
7. Withdrawal: the applicant (or guardian) can withdraw at any time, and in-app access stops at once. Access also ends automatically when the application is closed or rejected, after a set period. The UI states that details already viewed cannot be recalled.
8. Requests expire after 14 days if unanswered (proposed).

### 5.6 Verified credits workflow (D-010 modified)

```
requested ──accept──▶ confirmed ──revoke (either party)──▶ revoked
    │                    │
    └─decline─▶ declined └─dispute (either party)──▶ disputed ──staff review──▶ confirmed | revoked
```
- Badge text: "Collaboration confirmed by {name}", with a tooltip: "Confirms they worked together. Not an endorsement."
- A dispute hides the badge immediately. Staff review it, and every outcome is logged.
- Rate limits on credit requests prevent spam.

### 5.7 Organisation trust and scam prevention (D-013, D-034)

- **Trust levels:** New → Reviewed (first job approved) → Verified (evidence checked; copies not stored in v1).
- **Scam signals** hold a job for review. Examples:
  - fees or deposits, "registration charge";
  - requests for Aadhaar/PAN/bank details;
  - Telegram or off-platform payment links;
  - unrealistic pay for minimal work.
- A "Suspected scam" report reason, prioritised.
- Policy published on every job page: "Legitimate employers never ask you to pay."
- Posting limits for New organisations. Repeat offenders are suspended, and the action is logged.

### 5.8 Uploads (D-015, D-031)

1. The browser checks type and size and compresses to WebP.
2. A server action issues a short-lived signed URL for the private `quarantine` bucket.
3. The browser uploads directly to storage. The bucket enforces 5 MB and image MIME types.
4. A server action:
   - downloads the file;
   - checks its real file type from its bytes;
   - re-encodes it, which removes EXIF/GPS metadata;
   - caps the dimensions;
   - writes it to the public bucket under the owner's folder;
   - deletes the quarantine file;
   - records the result.
5. SVG and animated formats are rejected. Per-user daily upload limits apply.

### 5.9 Future messaging constraints (recorded now; built in v2 only after validation)

- No adult-to-minor messages except within an active application with a Verified organisation, with guardian visibility.
- No images or links from adults to minors.
- All messages are reportable, and blocking is immediate.
- Messages are retained for safety review per legal advice.
- Rate limits; keyword safety prompts.

### 5.10 Legal position (not legal advice)

The lawyer handoff list is in `LEGAL_QUESTIONS.md`.

**Confirmed from statute or official text (application to us still needs a lawyer):**
- **DPDP Act 2023:**
  - A "child" is anyone under 18.
  - s.9(1): verifiable consent of a parent or lawful guardian before processing a child's personal data.
  - s.9(2): no processing likely to harm a child's well-being.
  - s.9(3): no tracking, behavioural monitoring or targeted advertising directed at children.
  - s.5(3): users can access notices in English or any Eighth Schedule language.
  - Breaches of the children's obligations carry the Act's highest penalty band.
- **DPDP Rules 2025:**
  - Notified November 2025. Most data-fiduciary duties, including Rule 10 (verifiable parental consent), apply after 18 months (around 13–14 May 2027; exact date to confirm).
  - Rule 10 lets the fiduciary verify that the parent is an identifiable adult using details it already holds, details voluntarily provided, or a virtual token from an authorised entity (e.g. DigiLocker).
  - The Fourth Schedule exempts certain entity classes (e.g. healthcare, education, child care) and certain purposes. Our platform appears not to be in an exempt class. That is an assumption for the lawyer to confirm.
- **Indian Contract Act 1872, s.11:** minors are not competent to contract, so agreements with minors are void.
- **Child and Adolescent Labour (Prohibition and Regulation) Act 1986, as amended 2016:**
  - Employment of under-14s is prohibited, with narrow exceptions.
  - Adolescents (14–18) are barred from scheduled hazardous occupations and processes.
  - Working-hour and rest conditions are set by the Act and its rules (exact limits to confirm).
- **NCPCR guidelines (finalised 2023)** on child participation in entertainment extend to social media and OTT content. Whether they apply to minors working *behind* the camera (e.g. editing) is unclear.
- **Online Gaming Act 2025:** bans online money games and their promotion; recognises esports. Commencement status to confirm.

**Assumptions (unconfirmed):**
- Our platform is a "data fiduciary" and likely an "intermediary" under the IT Act.
- The 16–17 freelance creative work we facilitate is "non-hazardous".
- The guardian-account approach satisfies Rule 10.
- Self-declared age is acceptable for adults absent red flags.
- Cross-border processing by US-based processors (Vercel, Resend, Sentry, PostHog) is currently permitted.

**Recommendations (our policy choices):** everything in §5.4–5.9, D-022–D-029, and the gaming classification below.

**Gaming activity classification (D-019, interim until lawyer review):**

| Category | Examples | Interim policy |
|----------|----------|----------------|
| **Prohibited** | Jobs or promotion for online money games (fantasy with cash stakes, rummy/poker for money, betting); payment facilitation for such games | Not allowed |
| **Legally uncertain** | Sponsorships from real-money gaming brands; esports tournaments with entry fees and prize pools; "prediction" or skill-contest content with cash; crypto/NFT games; offshore gaming operators | **Not allowed until a lawyer advises** |
| **Permitted** | Esports roles (players, coaches, analysts, casters, managers, tournament staff), game development, game content creation, community management for non-money games, online social games | Allowed |

---

## 6. Roadmap (quality-first, part-time)

**Assumption:** about 15–20 focused hours per week, learning while building. Estimates are in **focused weeks** (40 hours of work). Calendar time is roughly double. This is a planning estimate, not a deadline. Each phase finishes only when its acceptance criteria pass.

| Phase | Focused weeks | Scope | Depends on |
|-------|---------------|-------|------------|
| **0. Validate + set up** | 3–4 | Interviews (incl. esports), concierge test (18+ only), teardown, name/domain/trademark search, tool installs, wireframes, **legal scoping consult (D-030)** | – |
| **1. Foundation** | 3 | Repo at `C:\dev\…`, Next.js, Supabase `dev`, migrations workflow, CI, design tokens + core components, server-only admin client guard, `app_settings`, `audit_log`, `staff` | 0 |
| **2. Auth + age-aware onboarding** | 3 | Auth flows, Resend, Turnstile, date-of-birth screen, `age_records`, under-16 block, account states, consent records + privacy notice, adult onboarding | 1 |
| **3. Profiles + privacy** | 3 | Profiles, `profile_private`, `privacy_settings` with minor-forcing triggers, visibility function, link previews (adults), PII-in-bio warning | 2 |
| **4. Portfolio + secure uploads** | 3 | Quarantine pipeline, EXIF stripping, items/media/tags, video embeds, achievements | 3 |
| **5. Organisations + jobs + trust** | 3–4 | Organisations, members, invites (adult-only owners/admins), trust levels, verification queue, jobs, review queue, scam signals, `open_to_minors` rules | 3 |
| **6. Applications + contact consent + notifications** | 4 | Apply rules, status functions, pipeline UI, contact requests/disclosures/withdrawal, audit-logged reads, in-app + email notifications | 4, 5 |
| **7. Discovery + feed** | 2–3 | Age-aware talent/job search, follows, feed, Fresh work, appreciations, pagination | 4, 5 |
| **8. Safety, privacy rights, admin** | 3 | Reports (priority child-safety/scam), blocks, admin dashboard, suspensions, data requests (access/erasure/grievance), account deletion, guidelines | 3–7 |
| **9. Verified credits** | 2 | Full state machine, disputes queue (may slip to v1.1) | 4–6 |
| **10. Hardening + closed beta (18+)** | 3–4 | Full permission test suite, regression, accessibility, performance, Sentry/PostHog (adult-only identification), backups, legal pages, **external security review**, Supabase Pro + Vercel Pro (approval), closed beta with 50–100 adults | all |
| **11. Guardian consent + minors enablement** | 3–4 | Guardian accounts and verification (approved method), consent per purpose, guardian dashboard, guardian approvals for disclosures, turning-18 job, minors' security review, **legal sign-off** → switch on (approval) | 2–8, legal |
| **Public launch** | – | Only with your approval at Gate 3 | 10, (11) |

**Total:** about **35–40 focused weeks**.
- At ~20 hours/week, that is roughly **16–18 calendar months** to public launch with minors enabled, and roughly **14–16 months** to an adult-only closed beta.
- At ~30 hours/week, it takes about a third less time.

These are honest beginner estimates. AI assistance speeds up coding, but learning, testing and fixing still take time. We re-estimate after Phase 1, once your real pace is known.

**Ways to shorten without cutting quality:**
- move verified credits to v1.1 (–2 weeks);
- run Phase 0 interviews alongside Phase 1 setup (–1–2 weeks);
- keep Phase 11 after the beta (it is already off the beta's critical path).

**Phase 11 can move earlier**, building straight after Phase 8, if you prefer minors in the closed beta. The legal sign-off is still required before the switch turns on.

**Every phase follows the same loop:** explain → build → test (automated + your manual check) → fix → security check → document → commit → your approval → next.

**Definition of done for every feature:**
- works end-to-end against the real `dev` database;
- permissions enforced **and tested**, including age rules;
- validation in place;
- loading/empty/error states;
- works at phone width;
- documented and committed.

---

## 7. Budget (estimates, not quotes or targets)

**Planning rate:** ₹90 = $1. Card payments abroad may add 2–3.5% forex markup, and some services add 18% GST. **Nothing is purchased without your explicit approval.**

### 7.1 Recurring tools

| Item | During build | From closed beta | Notes |
|------|-------------|------------------|-------|
| Supabase | Free (`dev`) | Pro ≈ ₹2,250/mo (`prod`) | D-033 |
| Vercel | ₹0 (run locally) | Pro ≈ ₹1,800/mo | D-032 |
| Resend | Free | Free → Pro ≈ ₹1,800/mo when volume requires | D-017 |
| Domain | – | ≈ ₹800–1,500/yr | After Gate 1 |
| Business email | Optional | ≈ ₹100–300/user/mo (*estimate*) | Needed for a grievance contact |
| GitHub, Sentry, PostHog, Figma, Turnstile | Free | Free | |
| Claude | Your existing plan | – | Excluded from totals |
| App stores | Deferred | Deferred | D-001 |

**Run-rate:** ≈ ₹0/mo during the build; ≈ ₹4,000–6,000/mo in closed beta; ≈ ₹6,000–7,000/mo after launch.

### 7.2 Total planning estimate (to public launch)

| Category | Low | High | Change from v1 |
|----------|-----|------|----------------|
| Validation (thank-you vouchers) | ₹5,000 | ₹10,000 | – |
| Legal scoping consult (Gate 1) | ₹5,000 | ₹15,000 | **New** (D-030) |
| Brand/logo | ₹5,000 | ₹15,000 | – |
| Domain | ₹1,000 | ₹1,500 | – |
| Trademark (1–2 classes) | ₹4,500 | ₹13,500 | – (verify fees on ipindia.gov.in) |
| Company incorporation | ₹10,000 | ₹20,000 | – |
| Full legal review (Terms, privacy, guidelines, minors, labour, gaming, intermediary) | ₹35,000 | ₹85,000 | **Up** (was ₹15–40k) |
| Guardian/age verification mechanism | ₹0 | ₹25,000 | **New**, depends on legal advice and method |
| Notice translations (if required for launch) | ₹0 | ₹15,000 | **New** |
| External security review (incl. minors' data paths) | ₹25,000 | ₹50,000 | **Up** (was ₹20–40k) |
| Infra: closed beta (≈2 mo) + 3 mo after launch | ₹25,000 | ₹35,000 | **Up** (Pro tiers from closed beta) |
| Launch marketing (no paid ads) | ₹30,000 | ₹50,000 | – |
| **Subtotal** | **₹1,45,500** | **₹3,35,000** | |
| Contingency (20%) | ₹29,100 | ₹67,000 | |
| **Total** | **≈ ₹1.75 lakh** | **≈ ₹4.0 lakh** | v1 was ₹1.3–2.5 lakh |

**Important:** the upper estimate exceeds your ₹2–3 lakh budget. The main drivers are legal and security work for under-18 support. Approved response (D-037):
- enable minors when funds allow;
- look for startup/incubator legal clinics;
- defer the second trademark class and some marketing.

Spending is also spread over a longer timeline (12–16 months), and nothing above is committed.

### 7.3 Spending gates (D-020)

| Gate | Evidence required | Unlocks | Cumulative ceiling (planning) |
|------|-------------------|---------|-------------------------------|
| **G1: Validation** | §8.3 criteria met | Domain, logo, legal scoping consult, start building | ≈ ₹45,000 |
| **G2: Closed beta** | MVP passes acceptance + security review; real hires in beta | Company, full legal review, trademark, Pro tiers, minors' verification mechanism | ≈ ₹2,00,000 |
| **G3: Public launch** | Beta retention and hiring evidence; legal sign-off | Launch marketing, scaling tiers | Remaining approved budget |

---

## 8. Validation (before heavy building)

### 8.1 Interviews (18+ only)

- **15 hirers:** creators who hired in the last 3 months + 3–5 agencies/studios.
- **15 talent:** editors, thumbnail designers, scriptwriters, social media managers.
- **8–10 esports:** organisations, tournament organisers, coaches, analysts, casters.
- **5 young-talent perspectives:** 18–19-year-olds about their experience at 16–17, plus 3–5 parents of 16–17-year-old creators/gamers. These test A8: would guardians complete a consent flow?

Ask about **past behaviour**, not opinions:
- "Last time you hired, where did you look, how long did it take, what went wrong?"
- "How did you judge quality?"
- "Have you been scammed or ghosted?"
- "How did you get your last 3 clients?"
- "What do you charge or pay, and per what?"
- Hirers: "Would you hire a skilled 16–17-year-old? What would worry you?"
- Parents: "What would you need to see before letting your child take paid creative work online?"

### 8.2 Concierge test

- Match hirers to talent by hand for 2–4 weeks: a Google Form for talent (**confirm 18+; no minors**), real hiring needs from interviewed hirers, a hand-picked shortlist within 24 hours.
- Track contact, hires, repeats and willingness to pay.
- Tell participants honestly that it is a manual pilot. The form gets a short privacy notice that says how long data will be kept.

### 8.3 Pass/fail (internal targets, not industry benchmarks)

| Signal | Proceed if |
|--------|-----------|
| Hirers with a real current need | ≥ 8 of 15 send one |
| Talent sign-ups with real portfolios | ≥ 50 |
| Shortlists leading to contact | ≥ 50% |
| Actual hires | ≥ 3 within 4 weeks |
| Repeat requests | ≥ 2 hirers return |
| Esports | Compare urgency and frequency against production talent; decide focus |
| Minors (A8) | ≥ half of interviewed hirers would consider 16–17 talent under safeguards, *and* most parents would complete a consent flow. If not, deprioritise Phase 11 (not abandon it). |

**Positive feedback is not validation.** Only actual hiring activity, repeat use and participation count.

---

## 9. Development environment

### 9.1 Current machine (checked 22 Nov 2026)

Git, Node.js/npm, VS Code and GitHub CLI are **not installed**. Python is only the Windows Store placeholder, which we don't need.

### 9.2 Install (after you approve the plan)

```powershell
winget install --id Git.Git -e
```
```powershell
winget install --id OpenJS.NodeJS.LTS -e
```
```powershell
winget install --id Microsoft.VisualStudioCode -e
```
```powershell
winget install --id GitHub.cli -e
```
Reopen the terminal, then:
```powershell
git --version; node --version; npm --version; gh --version
```
Each should print a version number. "Not recognized" means you need to restart the terminal, or the install failed. Send me the exact message.

### 9.3 Accounts

| Account | When | Cost |
|---------|------|------|
| GitHub (enable 2FA) | Now | Free |
| Figma | Phase 0 | Free |
| Supabase (`dev`; Mumbai region if available) | Phase 1 | Free |
| Google Cloud OAuth client | Phase 2 | Free |
| Resend, Cloudflare (Turnstile) | Phase 2 | Free |
| Sentry, PostHog | Phase 10 | Free |
| Vercel (Pro) + Supabase `prod` (Pro) | Phase 10, **with approval** | ≈ ₹4,000/mo |
| Domain registrar | After G1, **with approval** | ≈ ₹1,000/yr |

You accept each service's terms yourself. I never enter passwords or accept agreements for you.

### 9.4 Documentation plan

The current files stay in this folder until the repo exists. When the repo is created, they move to `C:\dev\<project-name>\docs\` (D-021):

| File | Created in |
|------|-----------|
| `PHASE_0_PLAN.md`, `DECISIONS.md`, `LEGAL_QUESTIONS.md` | Now |
| `README.md`, `ENVIRONMENT_SETUP.md`, `ARCHITECTURE.md` | Phase 1 |
| `PRODUCT_REQUIREMENTS.md` | Phase 1 (from §2 and §4) |
| `DATABASE_SCHEMA.md` | Phase 1, updated with every migration |
| `SECURITY_PRIVACY.md` (incl. child-safety model and the permission test matrix) | Phase 1, updated every phase |
| `TESTING.md` | Phase 1 |
| `DEPLOYMENT.md` | Phase 10 |
| `CHANGELOG.md`, `API_DOCUMENTATION.md` | Phase 1 onward |
| `runbooks/child-safety-escalation.md`, `runbooks/data-requests.md`, `runbooks/incident-response.md` | Phase 8 |

---

## 10. Execution plan

**Weeks 1–2**
1. ~~Approve or adjust D-022–D-037 in `DECISIONS.md`.~~ Done 22 Nov 2026.
2. ~~Shortlist 3 names; check domains, trademark search, social handles.~~ Done: **Workaora**, `workaora.co.in`, preliminary trademark search clear (D-038).
3. ~~Install tools (§9.2); create GitHub account.~~ Done 22 Nov 2026. Figma account still to do.
4. Start interviews (§8.1).
5. Get 2–3 quotes for the legal scoping consult using `LEGAL_QUESTIONS.md`.

**Weeks 3–6**

6. Finish interviews; write up the top pain points with real quotes.
7. Run the concierge test (18+). Do the competitor teardown. Make wireframes (profile, portfolio item, job post, job page, pipeline, contact consent screen, guardian consent screen, feed).
8. Legal scoping consult (if approved). Update the decisions with the lawyer's answers.
9. **Gate G1 review together:** proceed, adjust wedge/esports focus, or rethink.

**Phase 1 starts now, in parallel with validation (D-039).** It is ₹0-cost work only. Gate evidence is still required before spending, the closed beta, minor accounts and public launch.

**Then:** Phases 1–11 one at a time, each ending with tests passing, your manual check, updated docs and a Git commit. Closed beta (adults) → minors switched on after legal sign-off → **Gate G3: you approve public launch.**

**First users** (internal goals, not benchmarks):
- **100:** concierge participants, personally onboarded; ≥ 15 real open opportunities before wider invites.
- **500:** hires invite their creators; editor and esports Discord partnerships; 1–2 college clubs in one city. Student outreach is 18+ until minors are enabled.
- **1,000:** content from our own data, shared confirmed-collaboration badges, a second city, and esports focus if validated.
- Keep about 20–30 active talent per open opportunity. If jobs run dry, pause talent outreach and recruit hirers.

---

## 11. Decisions approved on 22 Nov 2026 (D-022 – D-037)

The founder approved all of these as proposed. Full text is in `DECISIONS.md`.

**Still open:**
- legal answers (`LEGAL_QUESTIONS.md`), which may refine D-023, D-024, D-027 and D-019;
- project/brand name;
- choice of lawyer;
- each spending gate review;
- approval of each paid subscription when it becomes due.

1. **D-022:** minors behind a switch; closed beta is 18+.
2. **D-023:** under-16 handling.
3. **D-024:** guardian account model and 14-day expiry.
4. **D-025:** under-18 visibility defaults.
5. **D-026:** under-18s cannot own organisations or post jobs.
6. **D-027:** rules for minor-eligible jobs.
7. **D-028:** minors share email only, with guardian approval.
8. **D-029:** no tracking or personalisation for minors.
9. **D-030:** legal scoping consult at Gate 1 (₹5–15k estimate).
10. **D-031:** quarantine upload pipeline.
11. **D-032:** no hosted deployments during the build; Vercel Pro from closed beta.
12. **D-033:** Supabase Pro for `prod` from closed beta.
13. **D-034:** organisation trust levels and verification evidence.
14. **D-035:** consent records and audit log.
15. **D-036:** never use user-editable auth metadata for permissions.
16. **D-037:** how to handle a budget that may exceed ₹3 lakh.

---

## Sources (checked 22 Nov 2026)

- Supabase pricing: https://supabase.com/pricing
- Vercel pricing and Hobby restrictions: https://vercel.com/pricing · https://vercel.com/docs/plans/hobby
- Vercel fair-use guidelines (commercial-usage definition): https://vercel.com/docs/limits/fair-use-guidelines
- Resend pricing and limits: https://resend.com/pricing · https://resend.com/docs/knowledge-base/resend-sending-limits
- Expo pricing (future mobile): https://expo.dev/pricing
- DPDP Rules 2025, PIB release: https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf
- DPDP Rules analysis: https://www.barandbench.com/view-point/meity-notifies-final-digital-personal-data-protection-rules-2025
- DPDP Rule 10 (children) commentary: https://www.taxmann.com/post/blog/childrens-data-verifiable-parental-consent-dpdp · https://elplaw.in/leadership/processing-of-childrens-personal-data-under-the-dpdp-act-what-does-it-means-for-businesses-3/
- DPDP Rule 12 / Fourth Schedule: https://dpdpa.com/dpdparules/rule12.html
- DSCI brief (Rule 10 commencement date): https://www.dsci.in/files/content/knowledge-centre/2025/Insight-Brief-on-DPDP-Rules.pdf
- Child and Adolescent Labour Act (Ministry of Labour): https://labour.gov.in/sites/default/files/the_child_and_adolescent_labour_prohibition_amp_regulation_act_1986_0.pdf
- NCPCR guidelines on child participation in entertainment: https://mib.gov.in/sites/default/files/Guidelines%20NCPCR.pdf · https://theprint.in/india/ncpcr-finalises-guidelines-for-child-artistes-in-entertainment-industry-covers-social-media-ott-platforms/1582332
- Online Gaming Act 2025: https://www.indiacode.nic.in/bitstream/123456789/22148/1/a2025-32.pdf
- Statute points on the DPDP Act s.2, s.5, s.9 and Contract Act s.11 come from the Acts' text. Confirm current versions with a lawyer.
