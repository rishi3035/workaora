# Decision Log

Every important product, technical, legal or financial decision is recorded here so it is not lost between AI sessions.

**Status values**
- **Accepted:** the founder approved it as written.
- **Accepted (modified):** the founder approved it with changes, which are listed in the entry.
- **Accepted in principle:** approved, but facts must be verified before implementation (see "Verification").
- **Rejected:** the founder did not approve it. The replacement is noted.
- **Proposed:** awaiting founder approval. Nothing proposed is built until it is approved.

When a decision changes, the old text stays in the entry's history with the reason for the change.
Full reasoning is in `PHASE_0_PLAN.md` (section numbers in brackets). Legal points are tracked in `LEGAL_QUESTIONS.md`.

**Last updated:** 22 November 2026 (D-038 brand name, D-039 early foundation work)

---

## Summary table

| ID | Decision | Status |
|----|----------|--------|
| D-001 | Web-first Next.js app; native apps later on demand | Accepted |
| D-002 | Supabase (Postgres, Auth, Storage, RLS) | Accepted in principle |
| D-003 | Single app, feature-based modular monolith | Accepted |
| D-004 | Separate cloud Supabase `dev` / `prod`; migrations in Git; no Docker | Accepted |
| D-005 | Marketing wedge: production talent ⇄ creators/agencies/studios; platform supports all roles | Accepted (modified) |
| D-006 | MVP exclusions | Accepted |
| D-007 | Work-and-opportunity feed + Appreciate | Accepted |
| D-008 | One-way follows | Accepted |
| D-009 | Consent-based, field-specific contact disclosure | Accepted (modified) |
| D-010 | Verified credits with accept/decline/revoke/dispute | Accepted (modified) |
| D-011 | One account per human; organisations are pages | Accepted |
| D-012 | ~~18+ only~~ → **16+ with age-aware architecture** | Original Rejected; replacement Accepted (details in D-022–D-030, Accepted) |
| D-013 | Manual review before a new organisation's first job; verification and scam prevention | Accepted (modified) |
| D-014 | Private data in separate tables; tightly controlled staff permissions | Accepted |
| D-015 | Images only (JPEG/PNG/WebP, ≤5 MB), video via links | Accepted (implementation detail in D-031) |
| D-016 | Postgres full-text + trigram search | Accepted |
| D-017 | Resend for auth and notification email | Accepted in principle (verified) |
| D-018 | Vercel hosting on a paid plan for any commercial deployment | Accepted in principle (modified by D-032) |
| D-019 | Conservative real-money-gaming policy, pending legal review | Accepted (interim) |
| D-020 | Three spending gates; estimates are not targets | Accepted |
| D-021 | Project at a path without spaces; docs in `docs/` | Accepted |
| D-022 | Minor accounts built from the start but switched on only after legal sign-off | Accepted |
| D-023 | Under-16 sign-ups blocked; no profile created | Accepted |
| D-024 | Guardian consent through a guardian's own adult account | Accepted |
| D-025 | Privacy-by-default visibility for under-18 profiles | Accepted |
| D-026 | Under-18s cannot own organisations or post opportunities in v1 | Accepted |
| D-027 | Rules for opportunities open to under-18 applicants | Accepted |
| D-028 | Under-18 contact disclosure: email only, with guardian approval | Accepted |
| D-029 | No behavioural tracking, personalisation or ads for under-18s | Accepted |
| D-030 | Early legal scoping consultation at Gate 1 | Accepted |
| D-031 | Quarantine-and-reprocess image upload pipeline | Accepted |
| D-032 | No hosted deployments during the build; Vercel Pro from closed beta | Accepted |
| D-033 | Supabase Pro for `prod` from closed beta | Accepted |
| D-034 | Organisation trust levels (New → Reviewed → Verified) | Accepted |
| D-035 | Consent records and audit log as core tables | Accepted |
| D-036 | Never use user-editable auth metadata for permissions | Accepted |
| D-037 | Budget may exceed ₹3 lakh because of D-012: enable minors when funds allow, seek legal clinics, defer non-essentials | Accepted |
| D-038 | Brand name **Workaora**; domain `workaora.co.in` | Accepted |
| D-039 | Start ₹0-cost foundation work before validation completes; gates for spending, minors and launch unchanged | Accepted |
| D-040 | Use only Supabase's new publishable and secret keys; refuse the old anon/service_role keys | Accepted |
| D-041 | Staff roles can be granted by our server through an audited function, not only by hand | Accepted |
| D-042 | Only admins can change app settings; moderators cannot | Accepted |
| D-043 | App settings are public, non-secret switches readable by everyone | Accepted |
| D-044 | Visual direction: Studio's fonts and colours with Arena's shapes | Accepted |
| D-045 | Links and quiet buttons are ink-coloured with a red underline; red text is kept for errors | Proposed |

---

## Founder-reviewed decisions (D-001 – D-021)

### D-001 · Web-first architecture · **Accepted**
Build a responsive, mobile-first web app with Next.js. No native Android/iOS apps at this stage. Keep shared logic (types, validation schemas, data access) in feature folders so an Expo app can reuse it later.
**Revisit when:** real user demand for a native app shows up, e.g. most sessions are on mobile and users ask for push notifications or an app. [§3.1]

### D-002 · Supabase backend · **Accepted in principle**
Use Supabase Postgres, Auth, Storage and Row Level Security. Add no other backend services unless a documented need appears.
**Verification before implementation:** current plan limits (checked 22 Nov 2026: Free has 500 MB database, 2 projects, pauses after 7 days idle; Pro is $25/mo); confirm the Mumbai region is available when creating the project. [§3.2]

### D-003 · Modular monolith · **Accepted**
One Next.js application, organised by feature folders. No microservices and no monorepo until mobile work starts. [§3.4]

### D-004 · Separate dev and prod · **Accepted**
- Two cloud Supabase projects. Migrations are versioned in Git.
- Production credentials are never stored on the development machine's default config.
- Production migrations run only through a documented, founder-approved step. No Docker unless a genuine need appears. [§3.3]

### D-005 · Market wedge · **Accepted (modified)**
- Marketing and outreach prioritise production talent (video editors, thumbnail designers, scriptwriters, motion designers) connecting with YouTubers, creators, agencies and production studios.
- **Modifications:**
  1. The data model and product support the full creator economy and esports ecosystem from day one.
  2. 8–10 esports interviews test whether esports deserves equal initial focus.
  3. The wedge is a go-to-market choice, never a product restriction. [§1.4, §8]

### D-006 · MVP exclusions · **Accepted**
Excluded from the initial release:
- communities
- direct messaging
- free-text social posts and comments
- native apps
- video hosting
- payments and subscriptions

Revisit only when validation shows real need. Never add them just to resemble LinkedIn, Instagram or Discord. [§2.3]

### D-007 · Initial feed · **Accepted**
The feed shows portfolio work and opportunities from followed people and organisations, plus a "Fresh work" view. The only reaction is "Appreciate". The feed is chronological. Under-18 handling is in D-029. [§2.2]

### D-008 · One-way follows · **Accepted**
No mutual connections. [§2.3]

### D-009 · Contact sharing · **Accepted (modified)**
**Original proposal:** reveal the applicant's opted-in contact details when they are shortlisted.
**Why it changed:** the founder required explicit, specific, recorded consent rather than disclosure triggered by shortlisting.
**Final rule:**
- All contact details are private by default.
- Shortlisting alone discloses nothing. After shortlisting, the organisation may send a *contact request*. The applicant chooses **which specific fields** (e.g. email only) to share with **that organisation for that application**.
- Each consent is stored with the field list, the notice version, a timestamp and the method.
- The applicant can withdraw consent at any time. The organisation then loses in-app access. The UI states honestly that details already seen cannot be "unseen".
- Access ends automatically when the application closes, after a retention period still to be set (see D-035).
- Every view of disclosed contact data is audit-logged.
- Under-18 rules are in D-028. [§5.5]

### D-010 · Verified credits · **Accepted (modified)**
**Modifications:**
- The display wording is **"Collaboration confirmed by X"**. It must never be presented as an endorsement.
- The credited party can accept or decline.
- After acceptance, either party can **revoke** at any time.
- Either party can **dispute** ("I never worked with this person"). A dispute hides the badge immediately and sends the credit to an admin review queue.
- Status is always one of: pending, confirmed, declined, revoked, disputed.
- Under-18 safeguards:
  - a minor's credits do not appear on other parties' public pages;
  - credit requests to or from minors create no contact channel;
  - credit actions are blockable and reportable.
- Remains late in the MVP; may move to v1.1 rather than delay the core product. [§2.2, §5.6]

### D-011 · Accounts and organisations · **Accepted**
- One individual account per human.
- Organisations (including a creator's channel or business) are pages managed by authorised members.
- Under-18 restrictions on owning organisations are in D-026. [§4.1]

### D-012 · Age eligibility · **Original Rejected → Replacement Accepted**
**Original proposal (rejected):** 18+ only at launch.
**Why it changed:** a meaningful part of the target audience (gaming, esports, editing, streaming) is 16–17. Excluding them would remove real talent.
**Replacement (accepted):**
- The platform supports users aged **16 and above**, subject to Indian law.
- Age-awareness is built into the architecture from the start: onboarding, data model, visibility, hiring, contact sharing, credits, and future messaging.
- A self-declared date of birth or checkbox is **not** assumed to be legally sufficient.
- No minor-facing feature launches without safeguards and legal review.

**Consequences:** new tables and flows (§5.1–5.4); new decisions D-022–D-030; added timeline (§6) and budget (§7, D-037).

### D-013 · Organisation review and scam prevention · **Accepted (modified)**
- A new organisation's first job listing needs manual admin approval before it is published.
- **Additions:**
  1. Organisation trust levels (D-034).
  2. Automatic holds on listings containing scam signals (fees, deposits, "pay to apply", requests for ID documents, off-platform payment links).
  3. A "suspected scam" report reason with priority review.
  4. A published "we never charge applicants" policy.
  5. Posting rate limits for new organisations. [§5.7]

### D-014 · Private data and staff permissions · **Accepted**
- Private contact data lives in `profile_private`.
- Date of birth and guardian data live in their own stricter tables (§5.1).
- Admin/moderator rights live in a `staff` table that users cannot edit.
- All access is enforced by database policies and server-side checks, never by hiding UI. [§5.3]

### D-015 · Portfolio uploads · **Accepted**
Images only (JPEG, PNG, WebP), ≤ 5 MB, compressed. Video via external links. No video hosting and no PDF/résumé uploads in v1. Upload pipeline details are in D-031. [§5.8]

### D-016 · Search · **Accepted**
Postgres full-text + trigram search. The long-term goal is discovery across professionals, skills, categories, portfolio items, organisations and opportunities. Search results respect under-18 visibility rules (D-025). [§3.2]

### D-017 · Transactional email (Resend) · **Accepted in principle, verified**
**Verification (22 Nov 2026):**
- The Free plan allows 100 emails/day and 3,000/month.
- Pro is commonly listed at about $20/mo for 50,000 emails with no daily cap. Confirm on the live pricing page before upgrading.

**Suitability:** fine for the build and closed beta. The 100/day cap will be hit once sign-ups grow, because verification, reset, guardian and notification emails all count. Plan to upgrade around public launch, with approval.
**Still to confirm before implementation:** where Resend processes data (cross-border transfer question in LEGAL_QUESTIONS.md). [§3.2]

### D-018 · Hosting (Vercel) · **Accepted in principle, verified; modified by D-032**
**Verification (22 Nov 2026):**
- Vercel's fair-use guidelines define commercial usage as any deployment used for the financial gain of anyone involved in producing the project. Hobby is restricted to non-commercial personal use.
- Pro is $20/member/month.

**Finding:** our earlier plan to use Hobby "for private development" is **not clearly permitted**, because this is a commercial startup.
**Modification (accepted 22 Nov 2026):** D-032. No hosted deployments during the build; Vercel Pro from closed beta. [§3.2]

### D-019 · Real-money gaming policy · **Accepted (interim)**
- Interim policy: no real-money gaming jobs, promotions or sponsorship listings.
- The Online Gaming Act, 2025 is **not** treated as settled in its interpretation, current commencement status or scope.
- A qualified Indian lawyer must review it before the policy is final.
- Activities are classified as Prohibited / Legally uncertain / Permitted, with uncertain treated as not allowed until advised (§5.10).

### D-020 · Budget gates · **Accepted**
- Three gates: Validation → Closed beta → Public launch.
- Budget is released only on evidence.
- Estimates are planning figures, not spending targets.
- Every paid subscription or significant spend needs explicit founder approval.
- D-037 covers the budget impact of D-012. [§7]

### D-021 · Project directory · **Accepted**
- The code lives in `C:\dev\workaora` (created 22 Nov 2026).
- Planning and technical docs live in its `docs/` folder (moved 22 Nov 2026).
- Clean Git practice: small commits, clear messages, no secrets. [§9]

---

## Decisions arising from D-012 and the conflict review (D-022 – D-037)

These arise from D-012 and from conflicts found during review round 1 (PHASE_0_PLAN §0.2). The founder approved all of them as proposed on 22 November 2026 (review round 2).

Points marked "depends on legal advice" (e.g. the guardian verification method in D-024, the exact conditions in D-027) may still change once counsel answers. Any such change will be logged here.

### D-022 · Minor accounts behind a launch switch · **Accepted**
- Build all age-aware structures from Phase 1.
- Keep **under-18 sign-up switched off** (a server-side feature flag) until three things are done:
  1. a lawyer has signed off;
  2. the guardian consent flow is built and tested;
  3. the security review covers minors' data paths.
- The closed beta runs with 18+ users. 16–17-year-olds are enabled as soon as those three conditions are met, before or at public launch.

**Why:** verifiable parental consent may depend on legal advice and identity tokens that a small startup may not be able to access quickly. A switch lets everything else proceed without launching minors unsafely.
**Alternative:** delay the entire beta until minor support is ready (adds months).

### D-023 · Under-16 handling · **Accepted**
- The date-of-birth screen is neutral: it does not reveal the cut-off.
- Under 16: sign-up stops, a friendly explanation is shown, and no profile is created.
- The auth record is deleted. What (if anything) may be kept to prevent immediate re-registration with a false date is a legal question.

### D-024 · Guardian consent model · **Accepted**
- A parent or lawful guardian creates their own adult account, links to the minor, and gives consent per purpose. Their adulthood is verified by a method the lawyer approves; DPDP Rule 10 allows details already held, details voluntarily provided, or a virtual token from an authorised entity such as DigiLocker.
- The guardian can see the minor's privacy settings, approve contact disclosures, and revoke consent, which pauses the minor's account.
- If consent is not completed within 14 days, the pending account and its data are deleted.
- The guardian must also accept the Terms on the minor's behalf, because minors cannot contract under Indian law.

### D-025 · Under-18 visibility defaults · **Accepted**
- Profiles are visible to **logged-in members only** and are hidden from search engines.
- Location is shown at state/region level only. Follower and following lists are hidden. Age is never shown publicly.
- Talent search shows minors **only to members of Verified organisations**, and only if the minor opts in with guardian approval.
- Minors' work does not appear in the logged-out "Fresh work" feed.
- Never public, for anyone under 18: phone, email, school, precise location, date of birth.

### D-026 · Under-18s cannot own organisations or post opportunities (v1) · **Accepted**
**Why:** minors cannot enter binding contracts under Indian law, so hiring obligations should sit with an adult.
A minor creator who needs to hire can have a guardian create and own the channel's organisation page, with the minor as a non-owner member.

### D-027 · Opportunities open to under-18 applicants · **Accepted**
- Jobs are closed to minors by default. An organisation can mark a job "open to 16–17-year-olds" only if all of these hold:
  1. the organisation is **Verified** (D-034);
  2. the job is remote;
  3. compensation is disclosed;
  4. the organisation attests that the work is non-hazardous, involves no night work, and that a guardian will be party to any agreement.
- Minors can apply only to such jobs. The guardian is notified of each application.
- Status-change emails to minors are copied to the guardian.
- Exact conditions depend on legal advice (child and adolescent labour law, NCPCR guidelines).

### D-028 · Under-18 contact disclosure · **Accepted**
- Minors can share **email only**: their own and/or their guardian's. Phone and WhatsApp numbers cannot be shared.
- Every disclosure needs the guardian's approval, and the guardian is copied on the disclosure.
- The future messaging design must default to no adult-to-minor messages outside an active application, visible to the guardian, logged and reportable.

### D-029 · No tracking or personalisation for under-18s · **Accepted**
- DPDP Act s.9(3) bars tracking, behavioural monitoring and targeted advertising directed at children.
- For under-18 users: no product-analytics identification (only aggregate counts), no session recording, no personalised ranking, no ads.
- The feed stays chronological.

### D-030 · Early legal scoping consultation · **Accepted**
- A short paid consultation with an Indian technology/privacy lawyer at Gate 1 (estimate ₹5,000–15,000; get quotes), using `LEGAL_QUESTIONS.md`.
- It confirms the direction on minors, consent and hiring before we design those flows in detail.
- The full legal review (Terms, Privacy, guidelines) follows at Gate 2.

### D-031 · Image upload pipeline · **Accepted**
- The browser compresses the image, then uploads it to a **private quarantine bucket** using a short-lived signed upload URL.
- A server step then:
  - checks the real file type from its bytes, not the name;
  - re-encodes the image, which **strips EXIF metadata including GPS location**;
  - caps the dimensions;
  - publishes the result to the public bucket;
  - deletes the original.

**Why:**
- Vercel functions cap request bodies at about 4.5 MB (verify in Vercel docs), which is below our 5 MB limit, so uploads go directly to storage.
- Photos can leak exact home locations through GPS metadata, which is critical for minors.

### D-032 · No hosted deployments during the build; Vercel Pro from closed beta · **Accepted**
- During development, run the app locally (free; no hosting needed).
- Subscribe to Vercel Pro (~$20/mo ≈ ₹1,800) only when closed-beta users need access.

**Alternative:** ask Vercel support whether a private, non-revenue prototype may use Hobby, and follow their written answer.

### D-033 · Supabase Pro for prod from closed beta · **Accepted**
Real users' personal data (including, later, minors') needs daily backups, and the project must not pause. Free projects pause after 7 days idle and lack the Pro backups.
So: Supabase Pro ($25/mo ≈ ₹2,250) for `prod` from the start of closed beta, not from public launch. `dev` stays on the Free plan.

### D-034 · Organisation trust levels · **Accepted**
| Level | How it is reached | What it unlocks |
|-------|-------------------|-----------------|
| **New** | Created | Can draft jobs; the first job goes to manual review; low posting limits |
| **Reviewed** | First job approved by an admin | Jobs publish immediately unless they trip scam signals |
| **Verified** | Evidence checked by an admin (e.g. company domain email, CIN/GST/Udyam, or proof of owning the official channel) | Verified badge; can post jobs open to under-18s; can see opted-in minors in talent search |

Evidence documents are viewed and recorded as "checked" with a reference. Copies are **not** stored in v1, to avoid holding sensitive documents.

### D-035 · Consent records and audit log · **Accepted**
- A `consent_records` table stores every consent with purpose, notice version, method, who gave it (user or guardian), and when it was given or withdrawn.
- An append-only `audit_log` table records:
  - every staff action;
  - every view of disclosed contact data;
  - every access to age or guardian data;
  - every change to permissions.

Retention periods are to be set with legal advice.

### D-036 · Never trust user-editable auth metadata · **Accepted**
- Supabase lets users edit their own `user_metadata`. Permissions, age band and staff status must **never** be read from it.
- They come only from protected database tables, or from `app_metadata`, which only the server can set.

### D-037 · Budget impact of supporting under-18s · **Accepted: options (a) + (b) + (d)**
- Supporting 16–17-year-olds adds legal work, a guardian verification mechanism, a wider security review, possible notice translations and more moderation time.
- The revised six-month-equivalent estimate is **≈ ₹1.8–4.0 lakh** (§7). The upper end **exceeds the ₹3 lakh budget**.

Options:
- (a) Keep the plan; enable minors only once funds allow.
- (b) Cut legal costs through incubator or startup legal clinics, or pro-bono programmes.
- (c) Raise the budget.
- (d) Defer non-essential spend such as the trademark's second class and paid marketing.

**Recommendation:** (a) + (b) + (d).

---

## Decisions after planning approval

### D-038 · Brand name: Workaora · **Accepted**
- **Name:** Workaora. **Domain:** `workaora.co.in` (registered by the founder). Instagram account and a project Gmail address created. GitHub two-factor login enabled.
- **Clearance status:** the founder searched the IP India trademark register (exact wordmark and phonetic) and LinkedIn on 22 Nov 2026 and found no matches. These are **preliminary checks, not legal clearance.** A formal clearance search and the filing decision (classes, timing) stay with counsel (LEGAL_QUESTIONS G2). Filing follows the D-037 budget approach (Gate 2).
- **Later (no spend now):** a grievance and support address on the domain (e.g. `support@workaora.co.in`) will look more trustworthy than Gmail. This is needed before public launch (LEGAL_QUESTIONS B5, E1).

### D-039 · Start foundation work before validation completes · **Accepted**
**What changed:** the plan (§6, §10) said product building starts after Gate 1 (validation). On 22 Nov 2026 the founder chose to treat assumptions A1–A8 as provisionally positive *for planning only* and to proceed now.
**What this allows:** Phase 1 (Foundation) and later phases, at ₹0 cost: local development, free tiers, no hosted deployments.
**What does not change:**
- Interviews, the concierge test and legal consultation are still to be done. Their results are recorded when available, and may change scope or the wedge (D-005).
- Spending gates stay in force (D-020). No paid service or subscription without explicit approval.
- Minor accounts stay switched off until legal sign-off, a tested guardian flow and a security review (D-022).
- Closed beta and public launch still need their gate evidence.

**Risk accepted:** building before evidence could mean rework if validation shifts the wedge.
**Mitigation:** the first phases (foundation, auth, age-aware onboarding, profiles, portfolio) are needed whichever audience we start with. Wedge-specific choices (role taxonomy, job templates, marketing copy) stay easy to change.

### D-040 · New Supabase keys only · **Accepted**
- **What:** the app accepts only Supabase's new key format: a publishable key (`sb_publishable_…`) for the browser and a secret key (`sb_secret_…`) for the server. It refuses the old `anon` and `service_role` keys at start-up.
- **Why:**
  - Supabase's documentation says the old keys are being retired by the end of 2026 (exact date not published). Building on them now would mean a forced change within weeks.
  - Supabase rejects the new secret key if it is ever used from a browser, which is an extra safety net.
- **Setting names:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`.
- **Status note:** implemented in Phase 1 step 1.3. Confirmed by the founder on 22 Nov 2026.
- **Source:** https://supabase.com/docs/guides/getting-started/api-keys (checked 22 Nov 2026).

### D-041 · Staff roles through an audited server function · **Accepted**
- **What:** `public.set_staff_role` grants, changes or removes a staff role. It is callable only with the secret key, requires a reason, and every change is written to the audit log by a trigger.
- **What changed:** the Phase 1 plan said staff would be granted only by hand in the Supabase dashboard.
- **Why:** the permission tests need to create a test admin, and a future admin screen needs the same function.
- **Trade-off accepted:** a leaked secret key could grant staff. A leaked secret key can already sign in as any user, so this adds little real risk. Protecting the secret key remains the priority (server-only lock, never in Git).
- **Rule for callers:** server code must confirm the person asking is an admin before calling it.

### D-042 · Only admins change app settings · **Accepted**
- `public.set_app_setting` refuses moderators, ordinary users, visitors and the server itself. It needs a logged-in admin and a reason of at least 10 characters, and logs the old and new value.
- **Why:** the switches include sign-up for 16–17-year-olds (D-022), which is too important for a moderator role.

### D-043 · App settings are public · **Accepted**
- Anyone, including a visitor who is not logged in, can read `app_settings`. They are on/off switches the pages need, not secrets.
- **Rule:** never store a secret in this table. Secrets live in environment settings.

### D-044 · Visual direction · **Accepted**
- **What:** Studio's fonts (Bricolage Grotesque, Instrument Sans) and colours (warm paper, ink, one red) with Arena's shapes (4px corners, soft outlines, a red bar on the left edge of cards). Light and dark versions.
- **How it was chosen:** three directions (Studio, Arena, Signal) were built as a live preview. The founder chose a mix, reviewed it as a fourth option, and approved it on 22 Nov 2026.
- **Recorded in:** `docs/DESIGN_SYSTEM.md`.

### D-045 · Links are ink-coloured, not red · **Proposed**
- **What changed from the approved preview:** in the preview, links and quiet buttons ("View all", "Save") were red text. In the design system they are ink-coloured with a red underline.
- **Why:** error messages are also red. Red links next to red errors would make it hard to tell "something is wrong" from "you can click this", especially for people who see colour differently.
- **Status note:** implemented as the safer default. Awaiting founder confirmation; it is a small change to reverse.

---

## Change history

| Date | Change | Reason |
|------|--------|--------|
| 2026-11-22 | D-001–D-021 created as Proposed | Phase 0 planning |
| 2026-11-22 | D-001–D-011, D-013–D-021 accepted (some modified); D-012 rejected and replaced; D-022–D-037 added as Proposed | Founder review round 1 |
| 2026-11-22 | D-022–D-037 accepted as proposed; D-037 resolved as options (a)+(b)+(d) | Founder review round 2 |
| 2026-11-22 | D-038 (Workaora) and D-039 (₹0 foundation work before validation) accepted; D-021 path set to `C:\dev\workaora` | Founder instruction after choosing the name |
| 2026-11-22 | D-040 (new Supabase keys only) proposed, then accepted by the founder | Supabase is retiring the old keys by end of 2026 |
| 2026-11-22 | D-041, D-042, D-043 accepted | Founder reviewed them with the step 1.5 migrations and approved applying them |
| 2026-11-22 | D-044 accepted (visual direction); D-045 proposed (ink-coloured links) | Founder chose the mix from a live preview; D-045 arose while building the design system |
