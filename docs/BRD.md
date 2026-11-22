# Workaora: Business Requirements Document (BRD)

## 1. Purpose, audience, date and status

| | |
|---|---|
| **Purpose** | State what business Workaora is trying to build, for whom, why, how success will be judged, and what is still unknown. The PRD (`PRODUCT_REQUIREMENTS.md`) turns this into a product. |
| **Audience** | The founder; future co-founders, advisers, lawyers, security reviewers and early team members; the AI assistant building the product. |
| **Date** | 22 November 2026 |
| **Version** | 1.0 |
| **Status** | **Draft for founder review. Not approved.** |
| **Source of truth** | `DECISIONS.md` (D-001 to D-054), `PHASE_0_PLAN.md` v2.2, `LEGAL_QUESTIONS.md`. Where this document and those disagree, those win and this document is wrong. |

**How claims are labelled in this document**

| Label | Meaning |
|-------|---------|
| **Approved** | The founder has accepted it. A decision number is given. |
| **Proposed** | A recommendation awaiting the founder's approval |
| **Assumption** | Believed but not tested |
| **Unresolved** | An open question; nobody has decided or found out |
| **Founder-stated** | Said by the founder in the brief or strategy document. Not independently checked. |

**Important limit: there is no user research yet.** No interviews, surveys, pilots or usage data exist. Everything about users and the market in this document is founder-stated or an assumption. Decision D-039 allowed building to start before validation; it did not replace validation.

---

## 2. Executive summary and product vision

Workaora is an India-first, work-first professional network and hiring platform for the creator economy and esports.

People who work in these fields (editors, designers, writers, creators, managers, players, coaches, casters and many more) show their work in a portfolio, get past collaborations confirmed by the people they worked with, and get discovered and hired. Creators, agencies, studios, esports organisations and brands find and hire them with more confidence than through direct messages and group chats.

**Vision (founder-stated, strategy document v1.0):** become the professional identity and opportunity layer for people who create, produce, distribute and grow digital content.

**Positioning (draft, `PHASE_0_PLAN.md` §1.5):** a work-first profile and hiring network for India's creator economy and esports industry. Show your work, get collaborations confirmed by the people you worked with, and get hired safely.

**What the first release must prove (approved, `PHASE_0_PLAN.md` §2.1):**

> A creator or organisation can post a real opportunity and safely hire someone they found through portfolios, faster and with more confidence than through DMs.

**Where things stand on 22 November 2026**

- The technical foundation (Phase 1) is built and approved: app skeleton, development database, security guard-rails, design system, automatic checks.
- No user-facing feature exists. Nobody can sign up.
- No validation has been done. No lawyer has been consulted.
- Money spent so far: the domain `workaora.co.in` (amount not recorded in the project). No paid service is in use.

---

## 3. Business context and opportunity

**Founder-stated context**

- Professionals in the creator economy and gaming are scattered across Instagram, LinkedIn, Discord, WhatsApp, Telegram, freelance marketplaces and private communities.
- No single destination is built around their professional identities, work, skills and hiring needs.
- India's creator economy and esports ecosystem are developing quickly.

**Why this could be an opportunity (assumptions from `PHASE_0_PLAN.md` §1.1)**

1. Hiring in this world may be frequent (per video, per month), which would give people a reason to return.
2. The work is visual, so a portfolio may judge skill faster than a CV. That is the main difference from LinkedIn.
3. Today's hiring workflow is messy, which may leave room for something better.
4. India-specific needs (₹ rates quoted per video, regional languages, WhatsApp as the default contact channel) may be poorly served by global tools.
5. Collaborations confirmed by both sides could build a trusted record that others cannot copy without both sides already present.
6. Visible safety (scam protection, organisation verification, guard-rails for younger talent) could itself be a reason to choose Workaora.

**What is not known**

- The size of the market. **No market-size figure is used in this document, because none has been researched.**
- How often hiring really happens, and for which roles.
- Whether the pain is strong enough to make people change behaviour.
- Whether anyone will pay.

---

## 4. Problems, pain points and evidence

### 4.1 Evidence available

| Source | What it is | Weight |
|--------|-----------|--------|
| The founder's master brief | The founder's description of the idea, users and constraints | Founder-stated |
| `Creator_Economy_Startup_Strategy.docx` v1.0 (20 Nov 2026) | The founder's working strategy document. It labels its own problem list as "hypotheses to validate". | Founder-stated |
| Founder decisions of 22 Nov 2026 | Choices on scope, age eligibility, safety and budget | Approved decisions, not evidence about users |
| The founder's own checks for the name | Trademark register (exact and phonetic) and LinkedIn searches found no match for "Workaora". Recorded as preliminary, not legal clearance (D-038). | Preliminary |
| User interviews, surveys, pilots, usage data | **None exist** | None |

### 4.2 Problems as stated by the founder

All are **unvalidated**.

| # | Problem | Who feels it | Source |
|---|---------|--------------|--------|
| P1 | Professionals lack a consistent, work-first identity suited to creator-economy and esports roles | Talent | Strategy doc §2; brief §1 |
| P2 | Talent discovery and hiring are spread across many informal channels | Hirers and talent | Strategy doc §2; brief §1 |
| P3 | Portfolio quality, work history, availability and pricing are hard to compare | Hirers | Strategy doc §2 |
| P4 | Industry conversation and community are separate from hiring and professional profiles | Both | Strategy doc §2 |
| P5 | People outside the major cities may find it harder to reach opportunities and networks | Talent | Strategy doc §2 |
| P6 | A professional may struggle to reach the right decision-maker and to show prior collaborations | Talent | Strategy doc §2 |
| P7 | A hirer may struggle to find reliable people with the right skills, style, availability and budget | Hirers | Strategy doc §2 |

### 4.3 Problems added during planning

Also **unvalidated**. These came from the planning work, not from users.

| # | Problem | Source |
|---|---------|--------|
| P8 | Job scams that ask applicants for fees are a risk on any hiring platform in India | `PHASE_0_PLAN.md` §1.2 (R4) |
| P9 | A meaningful share of gaming, esports, editing and streaming talent is aged 16–17, and informal channels offer them little protection | Founder's statement when rejecting an 18+ limit (D-012) |
| P10 | Posting "need an editor" in a public channel already gets fast replies, so a new product must be at least as quick | `PHASE_0_PLAN.md` §1.2 (R2) |

### 4.4 The gap

Nobody has yet been asked "tell me about the last time you hired someone" or "how did you get your last three clients". Until that happens, P1 to P10 describe a plausible world, not an observed one. Section 16 sets out how to close this gap.

---

## 5. Business goals and measurable outcomes

### 5.1 Goals

| ID | Goal | Status |
|----|------|--------|
| G1 | **Prove the hiring loop.** Real opportunities lead to real hires through portfolios on the platform. | Approved as the MVP's purpose (`PHASE_0_PLAN.md` §2.1) |
| G2 | **Build credible supply.** Professionals create complete, work-first profiles they are willing to share. | Proposed |
| G3 | **Build real demand.** Creators and organisations post genuine opportunities and come back to post again. | Proposed |
| G4 | **Be trusted and safe.** No user is scammed, harmed or exposed through the platform; under-18s are protected by design. | Approved in principle (D-012, D-013, D-014, D-022 to D-029); the measures here are proposed |
| G5 | **Earn repeat use.** People return because the product is useful, not because they are nagged. | Proposed |
| G6 | **Stay within means.** Spend in stages, only on evidence. | Approved (D-020, D-037) |
| G7 | **Learn before scaling.** Replace assumptions with evidence before spending heavily. | Approved in principle (`PHASE_0_PLAN.md` §8); postponed in practice by D-039 |

### 5.2 Targets

Three sets of numbers exist. Their status differs, so they are kept apart.

**(a) Validation targets: approved as internal targets** (`PHASE_0_PLAN.md` §8.3). These judge the manual pilot, before the product exists.

| Signal | Proceed if |
|--------|-----------|
| Hirers with a real, current need | At least 8 of 15 interviewed send one |
| Talent sign-ups with real portfolios | At least 50 |
| Shortlists leading to contact | At least 50% |
| Actual hires | At least 3 within 4 weeks |
| Repeat requests | At least 2 hirers return |
| Under-18 question (assumption A8) | At least half of interviewed hirers would consider 16–17 talent under safeguards, and most parents would complete a consent flow |

**(b) Early-product targets from the strategy document: founder-stated hypotheses, not approved as commitments.**

| Metric | Strategy document's proposed early target |
|--------|-------------------------------------------|
| Registered users | 500 to 1,000 |
| Completed profiles | At least 60% of registrations |
| Active creators or organisations | 30 to 50 |
| Legitimate job listings | 20 to 30 |
| Qualified applications | 100 or more |
| Successful collaborations | 10 or more |

The strategy document itself says these are hypotheses for an initial validation period, not benchmarks.

**(c) Targets proposed in this document: NOT approved.** Offered so that each goal has something measurable. Change or reject them freely.

| Goal | Proposed measure | Proposed target for the closed beta (50 to 100 invited adults) |
|------|------------------|----------------------------------------------------------------|
| G1 | Hires recorded on the platform | At least 5 |
| G1 | Median time from opportunity published to first shortlist | Under 72 hours |
| G2 | Share of new accounts with at least 3 portfolio items within 7 days | At least 50% |
| G3 | Share of organisations that post a second opportunity within 60 days | At least 30% |
| G3 | Open opportunities before inviting talent widely | At least 15 (already in `PHASE_0_PLAN.md` §10) |
| G4 | Confirmed scam listings that reached applicants | 0 |
| G4 | Median time to first review of a safety report | Under 24 hours |
| G5 | Share of accounts active in week 4 after joining | At least 25% |
| G6 | Infrastructure cost per month in closed beta | Within the planning range of ₹4,000 to ₹6,000 |

These numbers are judgement calls with no data behind them. Their main use is to force precise definitions (section 15) before anything is measured.

---

## 6. Non-goals and initial-scope exclusions

**Excluded from the first release (approved, D-006).** Not to be added to resemble LinkedIn, Instagram or Discord; revisit only when validation shows a real need.

- Communities
- Direct messaging
- Free-text social posts and comments
- Native Android and iOS apps (D-001)
- Video hosting (D-015)
- Payments and subscriptions

**Also outside the first release (approved in `PHASE_0_PLAN.md` §2.3)**

- CV or PDF uploads. The profile is the CV.
- Two-way "connections". Following is one-way (D-008).
- Login by phone code.
- Jobs and promotions for real-money gaming (D-019, interim).

**Business non-goals for now**

- **Not a brand–influencer deal marketplace.** That field needs payments and trust infrastructure, and the plan advises avoiding it for now (`PHASE_0_PLAN.md` §1.4). A brand can still take part as an organisation that posts an opportunity.
- **Not a payments, escrow or contracts business** (Phase 3 at the earliest, and only if justified).
- **Not a general social network.** Engagement for its own sake is not a goal.
- **Not global.** India first.
- **No paid marketing before there is evidence of demand** (founder's brief §10).
- **No under-18 accounts until the three conditions in D-022 are met.**

---

## 7. Target market and India focus

### 7.1 What is decided

| Item | Decision |
|------|----------|
| Geography | India first. Architecture and brand should be able to expand later (strategy document). |
| Audience | The whole creator economy and esports ecosystem can register and use every feature from day one (D-005). |
| Marketing focus at launch | Production talent (video editors, thumbnail designers, scriptwriters, motion designers) and those who hire them (YouTubers, creators, agencies, production studios) (D-005). |
| The focus is not a restriction | The wedge is a go-to-market choice and must never limit the product (D-005). |
| Esports | 8 to 10 interviews decide whether esports gets equal launch focus (D-005). |
| Age | 16 and over by design; under-18 sign-up off until D-022's conditions are met (D-012, D-022). |
| Language of the product | English at launch. Users' names and content may be in any script. Notices in other languages are a legal question (B1). |

### 7.2 What is assumed

- The cities named in the founder's brief (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Pune) are the main hubs. **Not checked.**
- Most use will be on phones. Hence a mobile-first website (D-001). **Not measured.**
- Much of the work is remote, so city matters less for hiring than language and skill. **Not checked.**

### 7.3 Research questions

| # | Question | How to find out |
|---|----------|-----------------|
| M1 | Which roles are hired most often, and how often? | Interviews with hirers (section 16) |
| M2 | Where do hirers and talent actually gather today, by role and by city? | Interviews; observing public communities |
| M3 | What do people pay and charge, and per what unit? | Interviews |
| M4 | Is esports hiring in India frequent enough to deserve equal focus? | The 8 to 10 esports interviews (D-005) |
| M5 | How many active hirers exist in the launch wedge? | Desk research with cited sources; none done yet |
| M6 | Which existing products do these users already use for this, and what do they dislike? | Competitor teardown (`PHASE_0_PLAN.md` §1.6); interviews |
| M7 | Do users prefer English, or would regional-language interfaces matter? | Interviews |

**Competitors.** `PHASE_0_PLAN.md` §1.6 lists LinkedIn, Instagram, Discord, Behance, Dribbble, Fiverr, Upwork, Contra, Internshala, Wellfound, Hitmarker, Talentrack and CreateCrew, with the real incumbent being direct messages, group chats and referrals. That list describes general positioning from public knowledge. **No teardown has been done and no competitor figures are claimed.**

---

## 8. User segments and personas

### 8.1 Segments (founder-stated; strategy document §3)

| Segment | Examples | Main need (founder-stated) |
|---------|----------|----------------------------|
| Creators | YouTubers, streamers, influencers, podcasters, educators | Build a presence, find collaborators, hire teams |
| Creative professionals | Video editors, designers, writers, photographers, producers | Show work, get discovered, win projects |
| Creator operations | Managers, channel strategists, social media managers | Find clients, collaborators and career opportunities |
| Gaming and esports | Players, coaches, analysts, casters, tournament staff | Build competitive credentials and connect with teams |
| Organisations | Agencies, esports teams, studios, creator-led companies | Recruit, build teams, represent the organisation |
| Brands and partners | Marketing teams, sponsors, agencies | Find suitable creators and creative talent |

The full role list in the founder's brief (§1) covers more than forty roles. All can register (D-005).

### 8.2 Personas

**These personas are hypotheses.** They are written to make requirements concrete. No real person has been interviewed. Names are role labels, not people.

| | Persona | Wants | Motivations (assumed) | Constraints (assumed) |
|---|---------|-------|-----------------------|------------------------|
| A | **The creator who needs collaborators.** A YouTuber or streamer who hires editors, thumbnail designers or writers. | Find someone reliable quickly; judge their work at a glance | Publishing schedule; quality; not wasting time on poor applicants | Little time; small or irregular budget; hires informally; may not think of themselves as an "employer" |
| B | **The creative professional seeking work.** An editor, designer, writer or motion designer. | A portfolio worth sharing; a steady flow of real opportunities; proof of past work | Income; recognition; better clients | Already has work scattered across Drive, Instagram and YouTube; wary of scams; may be 16–17 |
| C | **The team replacing or adding a collaborator.** A creator's team, agency or studio with an existing process. | Compare several candidates against clear criteria; involve a colleague | Continuity; reducing the risk of a bad hire | Needs more than one person to have access; needs to look professional |
| D | **The esports player or professional.** A player, coach, analyst or caster, or a team looking for one. | A credible record of achievements; to hear about tryouts and roles | Being taken seriously; finding a team | Scene is close-knit and Discord-based; many are under 18; achievements are hard to prove |
| E | **The brand seeking creator collaborations.** A marketing team or agency. | Suitable creators or creative talent for a campaign | Reach; fit; reliability | Slower, more formal processes; expects payment and contract handling |

**Is persona E supported by the evidence?** Only by the founder's segment list. The approved plan advises against building for brand–creator deal-making now (`PHASE_0_PLAN.md` §1.4). **Recommendation:** in the first release a brand takes part as an organisation that posts an opportunity and reviews applicants, exactly like any other organisation. A dedicated brand-collaboration product stays a later option (Phase 3 or 4), to be justified by evidence.

### 8.3 Two more people the product must serve

| Person | Why they matter |
|--------|-----------------|
| **The parent or guardian** of a 16–17-year-old | Must understand and approve; controls consent (D-024). Assumption A8 asks whether they will complete a consent flow. |
| **The moderator** (at first, the founder) | Reviews first listings, organisation verification, reports and credit disputes. Their time is a real cost (section 13). |

---

## 9. Stakeholders and responsibilities

No named owners are assigned here beyond roles that exist today. Where a role is unfilled, it says so.

| Stakeholder | Interest | Responsibility | Filled today? |
|-------------|----------|----------------|---------------|
| Founder | The business succeeding | Every product, legal and money decision; approvals at each gate; user interviews; first moderator and support contact | Yes |
| AI assistant (Claude) | Building what was approved | Design, code, tests and documentation; explaining; flagging risks; never deciding scope, spend, legal or security matters alone | Yes |
| Qualified Indian lawyer | n/a | Answer `LEGAL_QUESTIONS.md`; review terms, privacy notice, minors' design, labour and gaming questions | **No.** Not yet engaged. |
| Security reviewer | n/a | Independent review before closed beta, including minors' data paths | **No.** Planned at Gate 2. |
| Brand or logo designer | n/a | Visual identity beyond the design system | **No.** Budgeted, not engaged. |
| Talent users | Being found and hired; safety | Honest profiles; following the guidelines | None yet |
| Hirers and organisations | Finding good people | Honest listings; never charging applicants | None yet |
| Parents and guardians | Their child's safety | Consent and oversight | None yet |
| Grievance contact | Legal duty, to be confirmed (B5, E1) | Receive and answer complaints within the required time | **Unresolved** who this is and what is required |
| Service providers | n/a | Supabase (database), GitHub (code). Later, each only with approval: Vercel, Resend, Cloudflare, Google, Sentry, PostHog. | Supabase and GitHub in use |
| Regulators and authorities | Compliance | See section 14 | n/a |

---

## 10. Business model

### 10.1 Approved position

- The first release is **free for everyone** and contains no payment features (D-006).
- Monetisation is considered only after meaningful usage (Phase 3) and every idea must be validated first (founder's brief §7, §9).
- Professionals are not charged simply to apply for ordinary opportunities (strategy document §10).
- Applicants are never charged by hirers; this is a published rule (D-013).

### 10.2 Options for later (none approved)

| Option | Who pays | For what | Strength | Risk |
|--------|----------|----------|----------|------|
| Featured or "spotlight" opportunities | Hirers | More visibility for a genuine opening | Simple; value is easy to understand | Paid visibility can undermine trust in ranking; needs volume first |
| Recruiter or organisation subscription | Agencies, studios, esports organisations, frequent hirers | Advanced search, saved talent lists, more seats, pipeline tools | Recurring income from those most likely to have budgets | Few such organisations may exist; unproven willingness to pay |
| Professional premium | Talent | Analytics, enhanced portfolio tools | Large potential base | Charging the side with least money; risk of "pay to be seen" |
| Creator premium | Creators | Team management, analytics | | Unproven |
| Success or transaction fee | Hirer | A completed hire or project | Aligned with value delivered | Needs payments, contracts and dispute handling; legal and operational weight; easy to bypass off-platform |
| Brand collaboration marketplace | Brands | Finding and contracting creators | Larger budgets | A different and crowded business; needs payments and trust infrastructure |

The strategy document lists illustrative prices (Professional ₹199, Creator ₹499, Recruiter ₹1,499, Organisation ₹4,999 and up, per month). It calls them prices to test, not established market prices. **They are not adopted here.**

### 10.3 Recommendation (proposed)

1. **Stay free through closed beta and public launch.** The scarce thing is proof that the hiring loop works, not revenue.
2. **Learn willingness to pay during validation**, by asking about real past spending and by making a real offer in the manual pilot ("would you pay ₹X for this shortlist?"), not by asking opinions.
3. **First paid test, when usage justifies it: hirer-side.** Either featured opportunities or an organisation subscription, whichever the evidence favours. Hirers hold the budgets, and charging talent conflicts with the trust goal.
4. **Rule for any paid visibility:** it is always labelled, and it never overrides safety checks or the scam review.
5. **Defer transaction fees and the brand marketplace** until there is a legal and operational case.

### 10.4 Risks to the model

- The most frequent hirers (small and mid-sized creators) may have the smallest budgets.
- Hires can be completed off-platform, so anything charged on completion is easy to avoid.
- Introducing payment brings tax, consumer-protection and payments regulation (`LEGAL_QUESTIONS.md` D4, E5, G3).

---

## 11. Go-to-market and validation

### 11.1 Commitments (approved)

| Commitment | Source |
|------------|--------|
| India first; launch marketing aimed at production talent and their hirers; platform open to all roles | D-005 |
| Validation through interviews and a manual hiring pilot, 18+ only | `PHASE_0_PLAN.md` §8, conflict C12 |
| Closed beta with 50 to 100 invited adults before public launch | `PHASE_0_PLAN.md` §6; D-022 |
| No expensive marketing before evidence of demand | Founder's brief §10 |
| Spending released at three gates | D-020 |
| At least 15 real open opportunities before inviting talent widely | `PHASE_0_PLAN.md` §10 |

### 11.2 Sequence (approved in `PHASE_0_PLAN.md` §10, as internal goals)

| Stage | Who | How |
|-------|-----|-----|
| First 100 | People from the interviews and the manual pilot | Personally onboarded by the founder |
| First 500 | Their collaborators; two or three creator or esports communities; one or two college clubs in one city | Each hire invites the other side; job links shared into communities. Student outreach is 18+ until minors are enabled. |
| First 1,000 | A second city; esports if validated | Content from Workaora's own data; confirmed-collaboration badges shared on social platforms |

Keep roughly 20 to 30 active professionals per open opportunity. If opportunities run dry, pause talent outreach and recruit hirers.

### 11.3 Feedback loops (proposed)

| Loop | Frequency |
|------|-----------|
| A short call or message exchange with every early hirer after each opportunity closes | Per opportunity |
| A check-in with every early professional after their first application | Once |
| Review of reports, scam holds and support messages | Weekly |
| Review of the metrics in section 15 | Weekly |
| A written note of what was learned and what will change | Monthly |

### 11.4 Experiments (not commitments)

| Experiment | Tests | Cost | Stop if |
|------------|-------|------|---------|
| Manual hiring pilot with a form and hand-made shortlists | Whether hirers act on shortlists and return | Founder time; optional vouchers (₹5,000 to ₹10,000 budgeted) | Hirers do not contact anyone from the shortlists |
| Community-led discovery: partnering with two or three existing editor, creator or esports communities | Whether community owners will share opportunities and whether members sign up | Founder time | Community owners see no benefit |
| College creator or gaming clubs (18+) | Whether clubs bring serious early talent | Small event costs within the ₹30,000 to ₹50,000 launch budget | Sign-ups do not complete portfolios |
| Content built from Workaora's own data, such as typical rates by role | Whether useful content brings the right people | Founder time | It brings readers but not sign-ups |
| Small creator collaborations | Whether a known creator posting a real opportunity brings applicants | Within the launch budget | Applicants are low quality |
| **Paid acquisition** (ads) | Whether paid sign-ups become active users at an acceptable cost | **Not budgeted. Not approved.** | Not to be run before the hiring loop is proven; then only as a small, capped test with a pre-agreed cost limit |

---

## 12. Assumptions, dependencies, constraints and open questions

### 12.1 Assumptions to test (`PHASE_0_PLAN.md` §1.3)

| ID | Assumption |
|----|------------|
| A1 | Regular hirers find current hiring painful enough to try something new |
| A2 | Talent will maintain a portfolio here; it must be faster than a Drive folder |
| A3 | Hirers prefer structured portfolios to replies in direct messages |
| A4 | One niche produces enough real opportunities to keep talent engaged weekly |
| A5 | Confirmed collaborations are valued by both sides |
| A6 | Esports hiring volume justifies equal initial focus |
| A7 | Someone will eventually pay for hiring tools |
| A8 | Hirers will work with 16–17-year-old talent under the safeguards, and guardians will complete a consent flow |

**Status of all eight: untested.** D-039 treats them as "provisionally positive for planning only".

### 12.2 Dependencies

| Dependency | Needed for | Status |
|------------|-----------|--------|
| Founder's time for interviews and the pilot | Validation; Gate 1 | Not started |
| A qualified Indian lawyer | Guardian flow, notices, terms, minors, labour and gaming questions | Not engaged |
| A legally acceptable way to verify a guardian | Enabling 16–17-year-olds | Unknown (A2 in `LEGAL_QUESTIONS.md`) |
| An external security review | Closed beta | Not arranged |
| Supabase, GitHub | Building | In use, free plans |
| Vercel, Resend, Cloudflare, Google | Hosting, email, bot protection, Google sign-in | Not yet set up |
| Hirers willing to post real opportunities | Everything | None recruited |

### 12.3 Constraints

| Constraint | Detail |
|------------|--------|
| Money | ₹2 to 3 lakh available. Planning estimate to public launch ₹1.75 to 4.0 lakh, so the upper end exceeds the budget; handled by enabling minors when funds allow, seeking low-cost legal help and deferring non-essentials (D-037). |
| People | One founder, part-time, learning to build with AI assistance |
| Time | About 35 to 40 focused weeks of building; roughly 16 to 18 calendar months at about 20 hours a week (`PHASE_0_PLAN.md` §6). An estimate, not a deadline. |
| Quality bar | Security, privacy and child safety are non-negotiable; quality over speed (founder's instructions) |
| Technology | Web first; Supabase; one app; images only, video by link (D-001 to D-003, D-015) |
| Law | Under-18 sign-up stays off until legal sign-off (D-022) |

### 12.4 Open questions

| # | Question | Blocks |
|---|----------|--------|
| O1 | When will the interviews and the manual pilot be done? | Gate 1; confidence in everything else |
| O2 | Which lawyer, and when? | Guardian flow; real users |
| O3 | Does esports get equal launch focus, and do esports-specific profile fields enter the first release? | Profile design (Phase 3); marketing |
| O4 | What counts as a "successful connection" and a "hire" for measurement? | Section 15 |
| O5 | Are 16–17-year-olds enabled before or after the closed beta? | Roadmap order (Phase 11 can move earlier) |
| O6 | What may be kept after refusing an under-age sign-up, and for how long must other data be kept? | Phase 2 design (D-048, D-050); `LEGAL_QUESTIONS.md` A7, B6 |
| O7 | Who is the grievance contact, and what must they do? | Public launch (B5, E1) |
| O8 | What has been spent so far, and what is the ceiling? | Budget tracking |
| O9 | Which company structure, and when? | Gate 2 (G1) |

---

## 13. Risks and mitigations

Likelihood and impact are judgements, not measurements.

| # | Risk | Likelihood | Impact | Mitigation | Status |
|---|------|-----------|--------|------------|--------|
| R1 | **Marketplace cold start.** Talent leaves if there are no opportunities; hirers leave if there is no good talent. | High | Very high | Narrow marketing wedge (D-005); manual recruitment of both sides; 15 opportunities before wide talent invites; a feed made of work and opportunities, which stays useful with few users (D-007) | Planned |
| R2 | **"Direct messages are good enough."** | High | Very high | Posting must take under two minutes; applications arrive with portfolios attached; test in the pilot before building further | Untested |
| R3 | **Trust and fraud: fake recruiters and fee scams.** | Medium | Very high | First listing of every new organisation reviewed by a person; automatic holds on scam signals; trust levels; "we never charge applicants" rule; priority scam reports (D-013, D-034) | Designed, not built |
| R4 | **Harm to under-18s** (exploitation, grooming, unsafe work, data misuse). | Low to medium | Severe | Sign-up off until legal sign-off; guardian consent; private-by-default profiles; no adult-to-minor messaging; verified organisations only; priority child-safety queue (D-022 to D-029) | Designed, not built |
| R5 | **Low-quality or irrelevant uploads** make discovery useless. | Medium | High | Portfolio items need a title, role and category; reporting; moderation can hide items; ranking favours complete profiles and confirmed work, never follower counts alone | Designed, not built |
| R6 | **Misleading claims and stolen work.** | Medium | High | Confirmed collaborations with dispute handling (D-010); copyright reporting and takedown (E4); impersonation as a report reason | Designed, not built |
| R7 | **Privacy failure**: contact details or dates of birth exposed. | Low to medium | Severe | Private data in separate tables; field-by-field consent for contact sharing; every view logged (D-009, D-014, D-035); permission tests that try the forbidden action | Foundations built and tested; features not built |
| R8 | **Moderation burden** exceeds one person. | High as usage grows | High | Rate limits; automatic holds; clear queues; text-and-comment features excluded from the first release, which removes the heaviest moderation load (D-006) | Partly by design |
| R9 | **Copyright and intellectual property** complaints. | Medium | Medium to high | Takedown process; no video hosting, so most video stays on platforms with their own processes; legal review (E4) | Not built |
| R10 | **Security mistake by a beginner-led build.** | Medium | Severe | Database rules on every table; guard-rails enforced by tools; automated permission tests; external review before closed beta | Foundations in place; review not arranged |
| R11 | **Operational burden on a solo, part-time founder.** | High | High | Small phases; only legal and security work outsourced; quality over speed | Accepted |
| R12 | **Infrastructure and storage costs** grow faster than value. | Low at first | Medium | Images only, compressed, with size and count limits; video by link; free tiers during building; cost per active user tracked (section 15) | By design |
| R13 | **Legal non-compliance** (children's data, labour law, intermediary duties, gaming law). | Medium | Severe | `LEGAL_QUESTIONS.md`; early consultation (D-030); conservative interim rules (D-019) | Lawyer not engaged |
| R14 | **Building before validating** produces the wrong product. | Medium to high | High | Early phases are needed whichever audience comes first; wedge-specific choices kept easy to change (D-039) | Accepted risk |
| R15 | **Monetisation never works.** | Unknown | High later | No payment features until usage; test willingness to pay early and cheaply | Open |
| R16 | **Cost overrun from supporting under-18s.** | Medium | Medium | D-037 | Accepted approach |
| R17 | **Dependence on single providers** (Supabase, later Vercel). | Low | Medium | Standard Postgres; migrations in Git; no provider-specific lock-in beyond convenience | By design |

---

## 14. Legal, privacy, security and compliance: matters to investigate

**This section gives no legal conclusions.** It lists what needs a qualified Indian lawyer and jurisdiction-specific review. The detailed questions, with priorities, are in `LEGAL_QUESTIONS.md`.

| Area | To investigate | Questions |
|------|----------------|-----------|
| Children's personal data | Whether and how parental consent must be verified for under-18s; what level of age checking is expected; what tracking is prohibited; what happens at 18 | A1 to A9 |
| General data protection | What notices must say and in which languages; validity of the contact-sharing consent model; transfers to providers outside India; breach reporting; grievance handling; retention periods | B1 to B6 |
| Contracts and minors | Whether a guardian can accept terms for a minor; whether minors may own organisation pages; enforceability of click-through terms | C1 to C3 |
| Minors and work | Whether remote creative work by 16–17-year-olds is regulated employment; whether child-artist guidelines apply; what hirers must attest; payment to minors; esports specifics | D1 to D5 |
| Platform duties | Whether Workaora is an intermediary and what that requires; child-safety reporting duties; liability for fraudulent listings; copyright complaints; consumer-protection rules | E1 to E5 |
| Gaming law | Status and scope of the Online Gaming Act, 2025; what counts as promotion; tournaments with entry fees; sponsorships | F1 to F4 |
| Company, brand and tax | Entity type and timing; trademark classes and clearance; tax on foreign subscriptions | G1 to G3 |

**Security matters to arrange**

- An independent security review before closed beta, covering minors' data paths (Gate 2).
- Backups and a tested restore, with the production database.
- A written incident procedure before any real user signs up.

**Standing rules already approved**

- No feature involving under-18s launches without safeguards and legal review (D-012, D-022).
- No real user signs up before the terms and privacy notice have been reviewed by a lawyer (Gate 2).
- The interim gaming policy treats anything legally uncertain as not allowed (D-019).

---

## 15. Success metrics and measurement plan

### 15.1 Principles

- Measure the hiring loop, not vanity numbers. Downloads and impressions are not goals.
- Define each metric precisely before measuring it.
- **No behavioural tracking of under-18s** (D-029). For them, only anonymous totals are kept.
- Prefer numbers the database already holds (applications, statuses, consents) over tracking scripts.
- No targets are attached below except where marked. Section 5.2 holds the targets and their status.

### 15.2 Metrics

| Area | Metric | Definition | Source |
|------|--------|------------|--------|
| **Supply and demand balance** | Active professionals per open opportunity | Professionals active in the last 30 days ÷ opportunities open now | Database |
| | Opportunities with at least 3 applications within 7 days | Share of published opportunities | Database |
| | Professionals who saw no relevant opportunity in 30 days | Share of active professionals whose chosen roles matched no open opportunity | Database |
| **Activation** | Sign-up completion | Accounts that reach "active" ÷ accounts created | Database |
| | Activated professional | Has a profile with name, role, at least one skill and at least one portfolio item within 7 days | Database |
| | Activated hirer | Has an organisation page and one published opportunity within 14 days | Database |
| **Portfolio completion** | Portfolio depth | Share of professionals with at least 3 items | Database |
| | Profile completeness | Share of defined profile fields filled, as a distribution | Database |
| **Discovery** | Searches that lead to a profile view | Share of talent searches followed by opening a result | Analytics (adults only) |
| | Opportunity views that lead to an application | Applications ÷ unique viewers of an opportunity | Analytics (adults only) + database |
| | Searches with no results | Share, with the filters used | Analytics (adults only) |
| **Response** | Time to first status change | From application to the hirer first changing its status | Database |
| | Applications never reviewed | Share still "submitted" 14 days after applying | Database |
| | Contact requests answered | Share answered within 7 days, split into shared and declined | Database |
| **Successful connections** | Shortlist rate | Shortlisted ÷ applications | Database |
| | Contact shared | Applications with at least one contact detail shared | Database |
| | Hire recorded | Applications marked "hired" | Database |
| | Confirmed collaboration | Credits confirmed by the other party | Database |
| **Repeat usage** | Repeat hirers | Organisations posting a second opportunity within 60 days | Database |
| | Repeat applicants | Professionals applying to a second opportunity within 30 days | Database |
| **Retention** | Week-1, week-4 and week-12 return | Share of each sign-up week's accounts active in that later week | Analytics (adults only) |
| **Content quality** | Reported items upheld | Reports that led to action ÷ reports | Database |
| | Items hidden by moderators | Per 100 items published | Database |
| | Portfolio items with a confirmed collaboration | Share | Database |
| **Trust and safety** | Listings held for review; listings rejected | Counts and reasons | Database |
| | Time to first review of a report | Median, and separately for child-safety and scam reports | Database |
| | Accounts suspended | Count and reason | Database |
| **Cost to serve** | Infrastructure cost per active account | Monthly bills ÷ accounts active that month | Bills + database |
| | Storage per professional | Image storage ÷ professionals with a portfolio | Supabase dashboard |
| | Moderator minutes per week | Time spent on queues | Founder's log |
| | Emails sent per active account | To watch email limits and cost | Email provider |

### 15.3 What "hired" means: unresolved (O4)

A hire is completed off the platform, so Workaora only knows about it if someone says so. Options: the hirer marks it; the professional confirms it; or a confirmed collaboration later stands as proof. **Recommendation:** count "hirer marked hired" as the headline figure and "confirmed collaboration" as the stricter one, and report both.

### 15.4 Measurement plan

| When | What exists | How it is measured |
|------|-------------|--------------------|
| Validation (now) | No product | A spreadsheet: interviews held, needs received, shortlists sent, contacts made, hires, repeats |
| Building (Phases 2 to 9) | Product in development | No user metrics. Engineering checks only. |
| Closed beta (Phase 10) | Product with invited adults | Database reports for every "Database" metric above; privacy-respecting analytics for adults; a weekly review |
| After minors are enabled | Under-18 accounts | Anonymous totals only for those accounts (D-029) |
| Public launch | Open sign-up | The same, plus cost-to-serve monthly |

Analytics tooling is planned for Phase 10 and needs the founder's approval before any is switched on.

---

## 16. Discovery interviews and experiments

All participants must be 18 or over (conflict C12 in `PHASE_0_PLAN.md`). Tell everyone honestly that this is research and a manual pilot.

### 16.1 Interviews (approved plan, `PHASE_0_PLAN.md` §8.1)

| Group | Number | Tests |
|-------|--------|-------|
| Hirers: creators who hired in the last 3 months, plus 3 to 5 agencies or studios | 15 | A1, A3, A7; P2, P3, P7, P10 |
| Talent: editors, thumbnail designers, scriptwriters, social media managers | 15 | A2, A5; P1, P6, P8 |
| Esports: organisations, tournament organisers, coaches, analysts, casters | 8 to 10 | A6; persona D |
| Young-talent view: 18–19-year-olds about their experience at 16–17 | 5 | A8; P9 |
| Parents of 16–17-year-old creators or gamers | 3 to 5 | A8 |

**Recommended addition (proposed):** 3 to 5 brand or agency marketers, to test whether persona E deserves anything beyond posting an opportunity.

**Ask about what people did, not what they think.** "Would you use this?" produces polite, useless answers.

- "Tell me about the last time you hired someone for your channel or team. Where did you look? How long did it take? What went wrong?"
- "How did you judge whether they were good?"
- "Have you been scammed, ghosted or badly let down? What happened?"
- "How did you get your last three clients? Where is your portfolio today, and when did you last update it?"
- "What do you pay or charge, and per what?"
- To hirers: "Have you worked with someone aged 16 or 17? What would worry you?"
- To parents: "What would you need to see before your child took paid creative work online?"
- "What did you last pay for to help with this, and how much?"

**What to record for each interview:** role, how recently they hired or were hired, where it happened, time taken, what went wrong, money involved, and one direct quote.

### 16.2 Experiments

| # | Experiment | Assumption tested | Pass signal |
|---|------------|-------------------|-------------|
| E1 | **Manual hiring pilot** (`PHASE_0_PLAN.md` §8.2): a form for talent, real needs from hirers, a hand-picked shortlist within 24 hours | A1, A3, A4 | The approved targets in section 5.2(a) |
| E2 | **A real price offer** inside the pilot | A7 | Any hirer agrees to pay, or explains concretely why not |
| E3 | **Portfolio effort test**: ask ten professionals to assemble three work samples with titles and roles, and time them | A2 | Most finish in under ten minutes without help |
| E4 | **Confirmation test**: ask five pilot hirers to confirm in writing that a named professional worked with them | A5 | Most agree without hesitation; note any worries about endorsement |
| E5 | **Guardian consent walkthrough**: show parents a paper or clickable mock of the consent steps | A8 | Most say they would complete it; note where they stop |
| E6 | **Esports comparison**: compare urgency and frequency in esports interviews against production talent | A6 | A clear answer either way |
| E7 | **Competitor teardown**: use each listed product for an hour | Differentiation | A written list of what each does well and badly for these users |

### 16.3 What would change the plan

| If the evidence shows | Then |
|-----------------------|------|
| Hirers will not act on shortlists | Rethink the core proposition before building further |
| Talent will not assemble a portfolio | Make portfolio creation radically simpler, or import from where work already lives |
| Esports shows stronger pull | Give esports equal or leading launch focus; bring esports profile fields forward |
| Parents will not complete consent | Keep the architecture but deprioritise enabling 16–17-year-olds |
| Nobody would ever pay | Revisit the business model before public launch |

---

## 17. Decisions: decided, proposed, unresolved

### 17.1 Decided (founder-approved)

| Area | Decisions |
|------|-----------|
| Product shape | Web first (D-001); work-and-opportunity feed with one "Appreciate" reaction (D-007); one-way follows (D-008); one account per person, organisations as pages (D-011) |
| Scope | First-release exclusions (D-006); images only, video by link (D-015); database search, no paid search service (D-016) |
| Market | Launch wedge with the whole ecosystem supported; esports to be tested (D-005) |
| Trust and safety | Contact sharing by explicit, specific, recorded, withdrawable consent (D-009); confirmed collaborations with accept, decline, revoke and dispute (D-010); first-listing review and scam prevention (D-013); organisation trust levels (D-034); real-money gaming excluded for now (D-019) |
| Age | 16 and over by design (D-012); under-18 sign-up off until three conditions are met (D-022); under-16s blocked (D-023); guardian consent through a guardian's own account (D-024); private defaults (D-025); no organisation ownership or posting by minors (D-026); rules for opportunities open to minors (D-027); email-only contact sharing with guardian approval (D-028); no tracking (D-029) |
| Technology and security | Supabase (D-002); one app (D-003); separate development and production (D-004); private data and staff rights kept apart (D-014); upload pipeline (D-031); audit log and consent records (D-035); never trust user-editable data for permissions (D-036); new Supabase keys only (D-040); staff and settings rules (D-041 to D-043) |
| Money and operations | Three spending gates (D-020); budget response (D-037); hosting and database plans from closed beta (D-032, D-033); email and hosting providers in principle (D-017, D-018); early legal consultation (D-030); project location (D-021) |
| Brand and design | Name Workaora and domain (D-038); visual direction (D-044); ink-coloured links (D-045) |
| Process | Building may proceed before validation, with gates unchanged (D-039) |

### 17.2 Proposed (awaiting approval)

| Item | Where |
|------|-------|
| Phase 2 sign-up and login decisions D-046 to D-054 | `DECISIONS.md`, `PHASE_2_PLAN.md` |
| This BRD and the PRD | These documents |
| Goals G2, G3, G5 and the targets in section 5.2(c) | Section 5 |
| A brand takes part only as an organisation in the first release | Section 8.2 |
| Free through launch; first paid test on the hirer side; paid visibility always labelled | Section 10.3 |
| Feedback loops and the experiment list | Sections 11.3, 11.4, 16.2 |
| Counting "hired" two ways | Section 15.3 |
| Adding 3 to 5 brand or agency interviews | Section 16.1 |

### 17.3 Unresolved

Open questions O1 to O9 (section 12.4), research questions M1 to M7 (section 7.3), every question in `LEGAL_QUESTIONS.md`, and all eight assumptions A1 to A8.

---

## 18. Executive decision brief: the five decisions that matter most next

| # | Decision | Why now | Options | Recommendation |
|---|----------|---------|---------|----------------|
| 1 | **When validation happens.** Set dates for the interviews and the manual pilot. | Every assumption is untested, and each phase built before validation raises the cost of being wrong (R14). | (a) Pause building until Gate 1 evidence exists. (b) Run validation alongside Phase 2, with a fixed date. (c) Keep postponing. | **(b)**, with a calendar date for the first ten interviews. Phase 2's work is needed whichever audience comes first, so little is wasted. |
| 2 | **Engage a lawyer for the scoping consultation** (D-030). | The guardian flow, the age check, the notices and the terms all wait on answers. No real user can sign up without them. | (a) Book now. (b) Wait until closed beta is near. | **(a).** It is budgeted at ₹5,000 to ₹15,000 and unblocks the most expensive unknowns. |
| 3 | **Approve, change or reject the Phase 2 decisions D-046 to D-054**, especially refusing all under-18s with no waiting list until the guardian flow exists (D-047). | Phase 2 cannot start without them. | Approve as proposed; change individual items; hold until the lawyer answers. | Approve for building, on the understanding that no real user signs up before legal review. |
| 4 | **Esports: equal launch focus or not, and whether esports profile fields enter the first release.** | It shapes the profile design in Phase 3 and all launch messaging. | (a) Decide after the esports interviews. (b) Decide now. | **(a)**, and schedule those interviews first, so the answer exists before Phase 3 starts. |
| 5 | **Approve the success measures and their definitions**, including what counts as a hire (sections 5.2 and 15.3). | Without agreed definitions, the closed beta cannot be judged, and Gate 2 and Gate 3 have nothing to test against. | Accept the proposed measures; replace them; defer. | Accept the definitions now; treat the target numbers as provisional until the pilot gives real figures. |

Also worth deciding soon: whether 16–17-year-olds are enabled before or after the closed beta (O5), and what the spending ceiling is given the estimate's upper end (O8).

---

## 19. Strategic Expansion: Social Discovery Feed, Custom Creator Pages & Platform-Managed Infrastructure

### 19.1 Strategic Pillars Overview (Approved Product Direction)

To ensure Workaora evolves beyond a purely transactional hiring directory into the daily operating system and discovery layer for India's creator economy, three foundational pillars expand the product surface:

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           WORKAORA PLATFORM ECOSYSTEM                           │
├───────────────────────────────┬─────────────────────────────────────────────────┤
│    1. SOCIAL DISCOVERY FEED   │ 2. CUSTOM CREATOR PAGES & PORTFOLIO BUILDER    │
│    (Instagram/LinkedIn Style) │ (No-Code Personal Storefront & Showcase)        │
│                               │                                                 │
│ • Real-time Work Drops & Art  │ • Unique Slugs: workaora.com/@handle            │
│ • Proof Badges (Retention/AVD)│ • Distinctive Templates (Cyberpunk, Minimalist, │
│ • Interactive Likes & Views   │   Vibrant Creator Gold, Hyper-Dark Grid)        │
│ • Threaded Creator Comments   │ • Custom Layouts (Masonry, Cinema, Case Studies)│
│ • "Publish to Feed" Workflow  │ • Direct "Book / Hire Me" Conversion Drawer     │
├───────────────────────────────┴─────────────────────────────────────────────────┤
│                   3. PLATFORM-MANAGED TECHNICAL INFRASTRUCTURE                  │
│                   (Zero-Config Hosting, CDN & Performance)                      │
│                                                                                 │
│ • Zero DNS, server, or SSL setup required from creators                         │
│ • Automated India-edge CDN (Mumbai & Delhi PoPs, sub-300ms latency)             │
│ • Lossless image & video transcoding (WebP/AVIF auto-pipeline)                  │
│ • Built-in DPDP-compliant analytics (profile views, CTR, engagement)            │
│ • Dynamic OpenGraph cards for WhatsApp, Twitter, and Discord sharing            │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 19.2 Pillar 1: Social Discovery Feed (Community & Discovery Engine)
- **The Problem:** Traditional hiring marketplaces suffer from low daily active usage (DAU/MAU); creators only log in when desperately seeking a gig, and managers only log in when hiring.
- **The Solution:** An Instagram/LinkedIn-style work discovery feed where creators showcase recent edits, thumbnail concepts, 3D renders, and stream graphics.
- **Key Engagement Loops:**
  1. **Work Drops:** Creators publish portfolio snippets and project breakdowns with live performance proof (e.g. "68% 30s Retention", "1.4M Organic Views").
  2. **Interactivity:** Real-time Likes, Impression/View counters, and Threaded Comments between creators and talent managers.
  3. **Organic Discovery & Inbound Leads:** Managers scrolling the feed can immediately click "Hire Creator" or "View Full Portfolio" directly from an impressive work drop.

### 19.3 Pillar 2: Custom Creator Pages (Bespoke Portfolio & Homepage)
- **The Problem:** Creators currently maintain fragmented links: Linktree for links, Google Drive for raw video files, Behance for art, and Twitter for proof. These links are unbranded, slow, and lack conversion mechanics.
- **The Solution:** Every creator on Workaora receives a dedicated, customizable personal homepage and portfolio (`workaora.com/@handle`).
- **Creator Expression & Customization Controls:**
  - **Themes & Aesthetics:** Instant switching between curated aesthetic templates:
    - *Cyberpunk Esports:* Slate-black background, neon cyan/violet accents, high-energy gaming vibe.
    - *Minimalist Studio:* Monochrome crisp editorial layout, stone borders, understated luxury.
    - *Vibrant Gold:* Amber/warm highlights, high-energy entertainment and lifestyle creator aesthetic.
    - *Hyper-Dark Grid:* Deep obsidian black, neon emerald accents, tech-forward monospace grid.
  - **Layout Modes:** Masonry Gallery (art, thumbnails, stills), Cinema Showreel (widescreen hero video spotlight), and Case Study Cards (retention analytics + before/after breakdowns).
  - **Conversion-Ready:** Prominent rate cards, verified turnaround SLAs, and DPDP-compliant direct contact dispatch buttons.

### 19.4 Pillar 3: Platform-Managed Technical Setup (Infrastructure Abstraction)
- **The Problem:** Creators are visual storytellers, not DevOps engineers. Setting up custom websites requires purchasing domains, configuring Cloudflare/Vercel DNS, SSL certificates, responsive HTML/CSS, and media compression.
- **The Solution:** Workaora completely abstracts the technical layer behind the scenes:
  - **Instant Slug Routing:** Instant provision of `workaora.com/@handle` or custom vanity domains with zero DNS friction.
  - **Global Media CDN:** Edge-accelerated asset delivery across India (Mumbai & Delhi PoPs), ensuring video showreels and high-res art load in under 300ms on mobile connections.
  - **Automated Transcoding:** Automatic conversion of images to WebP/AVIF and video streaming optimization.
  - **Dynamic OpenGraph Meta:** Automated generation of rich preview cards when links are shared on WhatsApp, LinkedIn, X, or Discord.
  - **Zero-Config Analytics:** Real-time traffic, profile views, and manager engagement statistics delivered natively without third-party tracking scripts.

