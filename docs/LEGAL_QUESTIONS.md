# Legal Questions for Qualified Indian Counsel

**Purpose:** a handoff brief for an Indian technology, privacy and employment lawyer. Nothing in our planning documents is legal advice. Each item lists what we *believe* and what we need confirmed.
**Status key:** Open · Answered (with date and summary) · Not needed
**Priority:** **P1** must be answered before designing the feature in detail (Gate 1 scoping consult, D-030). **P2** before closed beta (Gate 2). **P3** before public launch or the related feature.

**Platform summary for counsel:**
- An India-first professional network and hiring platform for the creator economy and esports.
- Users build profiles and portfolios, follow each other, and apply to jobs and freelance opportunities posted by organisations.
- Users aged **16+** are planned, with 16–17-year-olds subject to guardian consent and restrictions. Under-16s are blocked.
- No payments, messaging or video hosting in v1.
- Hosted on Supabase (database possibly in the Mumbai region), Vercel, Resend (email), Sentry and PostHog. Most are US companies.

---

## A. Children's personal data (DPDP Act 2023 + DPDP Rules 2025)

| # | Pri | Question | Our current belief / design |
|---|-----|----------|-----------------------------|
| A1 | P1 | Do we fall into any Fourth Schedule exemption (Rule 12) for processing 16–17-year-olds' data? | We believe not. We plan full verifiable parental consent. |
| A2 | P1 | What verification of the parent/guardian satisfies Rule 10 for a startup? Is a DigiLocker-based virtual token available to private companies, and on what terms? What else is acceptable (e.g. existing verified adult account, a document check without retaining copies)? | Guardian creates an adult account, adulthood verified by a counsel-approved method; no raw ID numbers stored. |
| A3 | P1 | What level of **age assurance** is expected to identify that a user is a child in the first place? Is a self-declared date of birth sufficient for adults absent red flags? | Self-declared DOB with neutral screen, report-triggered re-verification. We do not assume it is sufficient. |
| A4 | P1 | Does s.9(3) (no tracking/behavioural monitoring/targeted ads) prohibit product analytics, chronological feeds, search ranking or safety monitoring for minors? Which safety measures are permitted? | We plan aggregate-only analytics, no personalisation, chronological feed, safety moderation retained. |
| A5 | P1 | Exact commencement dates: Rule 10 and the main duties (we understand around 13–14 May 2027). Which obligations already apply today? | We plan to comply from launch regardless. |
| A6 | P2 | When a minor turns 18, must we obtain fresh consent from them? What happens to consents the guardian gave? | We plan to ask for the user's own consent and end guardian control. |
| A7 | P2 | Can we retain anything after blocking an under-16 sign-up (e.g. a hashed email) to prevent immediate re-registration with a false date? | We plan to delete everything unless advised otherwise. |
| A8 | P2 | If guardian consent is revoked, what must be deleted and how fast? What may be retained (e.g. safety reports, audit logs)? | Pause account, delete per policy, keep safety/audit records as advised. |
| A9 | P3 | Is a Data Protection Officer or an India-based contact required for us (Significant Data Fiduciary risk if we hold minors' data)? | Assume not an SDF at our scale; confirm. |

## B. General data protection

| # | Pri | Question | Our current belief / design |
|---|-----|----------|-----------------------------|
| B1 | P2 | Requirements for our privacy notice. Must notices be available in Eighth Schedule languages at launch (s.5(3)), or on request? | English at launch; translations budgeted (₹0–15k). |
| B2 | P2 | Is our **contact-sharing consent** model (per field, per organisation, per application, recorded, withdrawable) valid consent? What retention is appropriate after withdrawal or when an application closes? | Yes in design; retention period TBD. |
| B3 | P2 | Cross-border transfer: is processing by US-based processors (Vercel, Resend, Sentry, PostHog) currently permitted? Any contract terms (DPAs) we must have? | Permitted unless a country is restricted by notification; sign each provider's DPA. |
| B4 | P2 | Breach notification: timelines and content to the Data Protection Board and to users; any CERT-In reporting obligations (and their timelines) for an entity of our size. | Incident runbook to be written from your answer. |
| B5 | P2 | Grievance redressal: required contact details, response timelines, and any nominee rights we must support. | `data_requests` table supports access/correction/erasure/grievance/nominee. |
| B6 | P3 | Data retention schedule for profiles, applications, consents, audit logs, reports and deleted accounts. | To be set from your advice. |

## C. Contracts, Terms and minors

| # | Pri | Question | Our current belief / design |
|---|-----|----------|-----------------------------|
| C1 | P1 | Since minors cannot contract (Contract Act s.11), is guardian acceptance of the Terms on the minor's behalf effective? What wording is needed? | Guardian accepts the Terms for the minor. |
| C2 | P1 | Should minors be barred from owning organisation pages or posting opportunities? | Yes in v1 (D-026). |
| C3 | P2 | Enforceability of our click-wrap Terms for adults; limitation of liability for hires made through the platform. | Standard click-wrap with recorded acceptance. |

## D. Minors and work

| # | Pri | Question | Our current belief / design |
|---|-----|----------|-----------------------------|
| D1 | P1 | Does facilitating **freelance/remote creative work** (editing, design, writing) by 16–17-year-olds fall under the Child and Adolescent Labour Act's "employment" or "work"? Which conditions apply (hours, rest, night work, registers)? Do any apply to us as a platform, or only to the hiring organisation? | Allow only remote, non-hazardous, compensation-disclosed jobs from Verified organisations with guardian involvement (D-027). |
| D2 | P1 | Do the **NCPCR guidelines (2023)** on child participation in entertainment and social media apply to minors who work behind the camera (editing, thumbnails) or appear in content (creators, streamers)? Do they create duties for the platform? | Unclear; we would restrict on-camera minor work until advised. |
| D3 | P2 | What attestations should organisations give when marking a job "open to 16–17" (non-hazardous, no night work, guardian is party to the agreement)? Do these meaningfully reduce our liability? | Attestation stored with job (D-027). |
| D4 | P2 | Can minors receive payment directly, or must payment go to the guardian? (Relevant later if we add payments.) | Not in v1; note for Phase 3. |
| D5 | P2 | Esports: legal considerations for 16–17-year-old players in tryouts, contracts, prize money and travel. | Tryout listings only; no contracts via platform. |

## E. Platform and intermediary obligations

| # | Pri | Question | Our current belief / design |
|---|-----|----------|-----------------------------|
| E1 | P2 | Are we an intermediary under the IT Act and IT Rules 2021? Which due-diligence duties apply: grievance officer, published rules, takedown timelines, user notification? | Assume yes; build a grievance contact, published guidelines and takedown tooling. |
| E2 | P1 | Child-safety duties: reporting obligations under POCSO (e.g. s.19/s.21) and IT Act s.67B if we become aware of child sexual abuse material or grooming. Required preservation and takedown timelines; who must report and to whom. | We will write `runbooks/child-safety-escalation.md` from your answer. |
| E3 | P2 | Liability for fraudulent job listings, and whether our review/verification process creates added liability ("we reviewed it"). | Manual first-job review + Verified level; careful wording on what "Reviewed"/"Verified" mean. |
| E4 | P3 | Copyright: handling claims that portfolio items infringe someone else's work; takedown procedure. | Report reason "IP" + takedown process. |
| E5 | P3 | Consumer protection / e-commerce rules: do any apply before we charge money? | Assume not in v1. |

## F. Gaming law

| # | Pri | Question | Our current belief / design |
|---|-----|----------|-----------------------------|
| F1 | P2 | Commencement and current status of the Promotion and Regulation of Online Gaming Act, 2025 and any rules. | Treat as in force for policy purposes. |
| F2 | P2 | Would hosting job listings for real-money gaming companies count as "promotion"? What about jobs at such companies unrelated to money games? | Prohibit until advised. |
| F3 | P2 | Esports tournaments with entry fees and prize pools: permitted, restricted, or prohibited? Can we list jobs or tryouts for them? | Legally uncertain → not allowed until advised. |
| F4 | P3 | Sponsorships by real-money-gaming brands, crypto/NFT games, offshore operators. | Not allowed until advised. |

## G. Company, brand and tax

| # | Pri | Question | Our current belief / design |
|---|-----|----------|-----------------------------|
| G1 | P2 | Best entity type (Private Limited vs LLP) and timing; DPIIT startup recognition benefits. | Pvt Ltd before public launch. |
| G2 | P2 | Trademark classes to file (e.g. 9, 35, 42, 41) and clearance search for the chosen name. | 1–2 classes; budget ₹4.5–13.5k government fees (verify). |
| G3 | P3 | GST on foreign SaaS subscriptions paid by card; registration thresholds before we earn revenue. | Budget 18% GST as possible. |

---

## Answer log

| Date | Question(s) | Answer summary | Counsel | Decisions affected |
|------|-------------|----------------|---------|--------------------|
| – | – | – | – | – |
