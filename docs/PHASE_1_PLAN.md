# Phase 1 Plan: Foundation

**Status:** Approved by the founder on 22 Nov 2026. In progress.

| Step | Status |
|------|--------|
| 1.1 Create the Next.js app | Done 22 Nov 2026 |
| 1.2 Code-quality tools | Done 22 Nov 2026 |
| 1.3 Project structure and security guard-rails | Done 22 Nov 2026 |
| 1.4 Supabase development project | Done 22 Nov 2026 |
| 1.5 First database migrations | Done 22 Nov 2026 |
| 1.6 Design direction and design system | In progress: three directions built at `/dev/directions`; waiting for the founder's choice |
| 1.7–1.8 | Not started |

**Cost:** ₹0. Everything runs on your computer or on free tiers. Nothing is hosted publicly (D-032).
**Estimate:** about 3 focused weeks, roughly 5–6 calendar weeks at ~20 hours/week. Most of your time goes on reviewing, learning and checking, not typing code.
**Builds on:** PHASE_0_PLAN §3 (architecture), §5 (data and security), §6 (roadmap); DECISIONS D-001–D-004, D-014, D-021, D-022, D-035, D-036.

## What Phase 1 is (and is not)

Phase 1 builds the **ground floor** that every later feature stands on: the app skeleton, the database connection, the rules for changing the database safely, automatic quality checks, the security guard-rails, and the visual design system.

**At the end of Phase 1, a user can't do anything yet.** There is no sign-up, no profiles, no jobs. That is intentional. If the foundation is wrong, every later feature inherits the problem.

## Steps

Each step ends with acceptance checks. The step is done only when they all pass and you have checked them yourself. I commit and push to GitHub after each step.

### 1.1 Create the Next.js app

- **What:** generate the app skeleton inside `C:\dev\workaora`: TypeScript, App Router, Tailwind CSS, ESLint. Strict TypeScript settings.
- **Why:** this is the web app every page will live in (D-001).
- **You do:** nothing except watch, and open the page in your browser at the end.
- **Acceptance:**
  - `npm run dev` shows a Workaora placeholder page at `http://localhost:3000`;
  - `npm run build` succeeds;
  - `npm run lint` shows no errors.
- **You'll learn:** what `npm`, `package.json`, `node_modules` and a dev server are.
- **Result (22 Nov 2026):** done. Next.js 16.4.6, React 19.3, Tailwind CSS 4.3, TypeScript strict mode with extra checks.
  - `npm run lint`, `npm run typecheck` and `npm run build` all pass.
  - The placeholder page was checked in a browser at desktop and phone widths, with no console errors.
  - Search engines are told not to index the site until public launch.
  - The tab icon is a temporary monogram until the brand design is chosen in step 1.6.

### 1.2 Code-quality tools

- **What:**
  - Prettier for consistent formatting.
  - Vitest for automated tests, with one example test.
  - A single `npm run check` command that runs formatting, lint, type-check and tests together.
- **Why:** it catches mistakes before they reach users. AI-written code needs this safety net as much as human code does.
- **Acceptance:** `npm run check` passes. A deliberately broken test makes it fail, then we fix it.
- **You'll learn:** how to read a test, and what "type-check" means.
- **Result (22 Nov 2026):** done.
  - Prettier 3 (with Tailwind class sorting), Vitest 5 and React Testing Library are set up.
  - `npm run check` runs format check → lint → type-check → tests, and stops at the first failure.
  - First tests (`src/app/page.test.tsx`): the home page shows the Workaora heading and the "in development" notice.
  - Proof it catches mistakes: the heading was deliberately misspelt, the test failed with exit code 1, and it passed again once restored.
  - A real setup bug was also found and fixed: tests were not cleaning up after each other (`vitest.setup.ts` now does this).
  - `@types/node` was raised to version 26 to match the installed Node.js, which resolved a package version clash without forcing it.
  - Markdown files are excluded from auto-formatting, so the planning documents keep their hand-written layout.

### 1.3 Project structure and security guard-rails

- **What:**
  1. **Folders:** `src/features/`, `src/ui/`, `src/lib/` (PHASE_0_PLAN §3.4).
  2. **Three separate Supabase connection modules:**
     - *browser* (public key only);
     - *server* (acts as the logged-in user);
     - *admin* (secret key, which bypasses all security). The admin module is marked **server-only**, so the build fails if browser code ever imports it (D-014).
  3. **Environment-variable check:** the app refuses to start, with a clear message, if a required setting is missing or malformed.
  4. **`.env.example`:** a template listing the setting names, with no values. The real `.env.local` stays on your machine and is blocked from Git.
- **Why:** leaking the secret key is the single worst mistake possible with Supabase. We make it impossible by construction, not by being careful.
- **Acceptance:**
  - we deliberately import the admin module into browser code and the build **fails**, then we revert;
  - starting without `.env.local` gives a clear error, not a crash.
- **You'll learn:** public vs secret keys, and what "server-side" means.
- **Result (22 Nov 2026):** done. 31 automated tests pass.
  - **Three connections** in `src/lib/supabase/`: `browser.ts`, `server.ts`, `admin.ts`.
  - **Admin lock, proven two ways.** A page that imported the admin connection into browser code was added on purpose. Lint refused it, and the build failed with "'server-only' cannot be imported from a Client Component module". The page was then removed.
  - **Settings check, proven three ways** by starting the app:
    1. With no settings: it stopped and listed all three missing settings, with how to fix them.
    2. With a secret key pasted into a browser-visible setting: it stopped and said to remove and replace the key.
    3. With correctly shaped (fake) settings: it started and served the page.
  - **Error messages never show a setting's value.** Tests check this.
  - **Extra lint rules:** only `src/lib/supabase/` may create database connections; screen files (`.tsx`) may never import the admin connection; settings may only be read through `src/lib/env/`.
  - **Tripwire tests** (`src/lib/security-guards.test.ts`) fail if the server-only lock is removed, if Git stops ignoring `.env` files, or if the settings template gains a real value.
  - **New keys only (D-040, accepted).** The app accepts Supabase's new key format (`sb_publishable_…`, `sb_secret_…`) and refuses the old `anon`/`service_role` keys, which Supabase is retiring by the end of 2026.
  - **Consequence:** from this step, `npm run dev` refuses to start until `.env.local` exists (step 1.4). `npm run check` and `npm run build` work without it.
  - **Not done here:** the request proxy that refreshes login cookies. It belongs with sign-in in Phase 2.

### 1.4 Supabase development project

- **What:** create the free `dev` project and connect the app and the Supabase command-line tool to it.
- **You do (I guide you click by click):**
  1. Create a Supabase account (sign in with GitHub). You accept their terms yourself.
  2. Create a project named `workaora-dev`, region **Mumbai** if offered. Let Supabase generate a strong database password and **save it in a password manager**.
  3. Copy `.env.example` to `.env.local`, then paste in the project URL, the publishable key and the secret key yourself. I will never print secret values in chat or logs.
  4. Run `npx supabase login` (opens the browser) and `npx supabase link`.
- **Acceptance:** a check script confirms the app can reach the dev database. `git status` shows `.env.local` is **not** tracked.
- **You'll learn:** what a hosted database is; the dev vs prod separation (D-004).
- **Prepared (22 Nov 2026):**
  - The Supabase command-line tool (version 3.2) is installed as a project tool, and `supabase/config.toml` exists.
  - `npm run test:db` runs the database tests in `tests/db/`. The first three check that the project address and publishable key are accepted, that the secret key is accepted for an admin-only request, and that the publishable key is **refused** for the same request. They only read; they change nothing.
  - An empty `.env.local` was created from the template. Git ignores it.
  - A bug was fixed: a blank setting was reported twice (once as missing, once as wrongly shaped). It is now reported once, and a test covers it.
- **Result (22 Nov 2026):** done.
  - **Development project:** `workaora-dev-mumbai`, region `ap-south-1` (Mumbai), project reference `aysjinjtabhgozxxffwa`, Postgres 17, Free plan.
  - **`npm run test:db` passes 3 of 3** against it.
  - **The app starts** with the real settings and serves the page.
  - **The command-line tool is logged in and linked** to the project. `npx supabase migration list --remote` reaches the database and reports no migrations yet. It did not need the database password; it uses the login.
  - **`.env.local` is not tracked by Git** (checked before every commit).
  - **Region correction.** The first project (`workaora-dev`) was created in Seoul (`ap-northeast-2`). A region cannot be changed later, so the founder chose to recreate the project in Mumbai while it was still empty. The Seoul project is to be deleted by the founder.
  - **Two fixes from real use:**
    1. The settings check now rejects a project address with anything after the host (the dashboard shows it ending in `/rest/v1/`), and says what to remove.
    2. The start-up check moved into `src/instrumentation-node.ts`, which removed a Next.js warning.
  - **Wording to know:** the command-line tool calls any online project "production" in its messages. For us, the linked project is the **development** database. There is no production database yet.
  - **Windows note:** PowerShell on the founder's machine blocks `npm` and `npx` scripts, so use `npm.cmd` and `npx.cmd` (see README).

### 1.5 First database migrations

- **What:** the first three tables, each created by a migration file in `supabase/migrations/`:

  | Table | Purpose | Security |
  |-------|---------|----------|
  | `staff` | Who is an admin or moderator | RLS on. Nobody can read or write it through the app except staff; granting staff is done manually in the dashboard, and logged. |
  | `audit_log` | Permanent record of sensitive actions (D-035) | RLS on. Insert only through a database function. **No one** can edit or delete rows, not even staff. |
  | `app_settings` | Server-side switches, e.g. `minors_signup_enabled = false` (D-022) | RLS on. Readable by the server; writable by staff only. |

  Plus the helper function `is_staff()`, used by every later permission rule.
- **Dev-only guard:** the database tests will refuse to run unless `.env.local` points at the registered development project (`aysjinjtabhgozxxffwa`), so tests that create and delete data can never touch a production database (D-004).
- **Permission tests** (run against `dev` with temporary test users that are deleted afterwards). Each one *tries* the forbidden action and checks that it fails:
  - an anonymous visitor cannot read `staff` or `audit_log`;
  - a normal user cannot make themselves staff;
  - a normal user cannot change `app_settings`;
  - staff cannot update or delete `audit_log` rows;
  - `minors_signup_enabled` starts as `false`.
- **Acceptance:** all permission tests pass. You can see the tables in the Supabase dashboard.
- **You'll learn:** tables, migrations, and Row Level Security, the most important security idea in the whole project.
- **Result (22 Nov 2026):** done. Full details are in `docs/DATABASE_SCHEMA.md`.
  - **Three migrations applied** to `workaora-dev-mumbai` after the founder reviewed and approved the SQL.
  - **Rehearsed first** on a throwaway in-memory database: 38 of 38 checks passed. A dry run then confirmed which files would be applied.
  - **28 database tests pass** against the real development database: 25 permission tests and 3 connection tests. Every refused action is checked against the database's own reason code, so a test cannot pass because of a typo.
  - **Read back from the database:** Row Level Security is on for all three tables; visitors can read only `app_settings`; no outside role can insert, update, delete or truncate any table; `minors_signup_enabled` is `false`.
  - **Clean state afterwards:** 0 accounts, 0 staff, no leftover test accounts.
  - **Dev-only guard:** the database tests refuse to run against any project other than `aysjinjtabhgozxxffwa`. Seven offline tests cover the guard.
  - **Typed connections:** `npm run db:types` generates `src/lib/supabase/database.types.ts`, and the three connections use it, so a misspelt table or column name is caught by the type-check.
  - **Decisions made here** (accepted by the founder with the SQL): D-041, D-042, D-043.
  - **Known limits:** the owner-blocking triggers on `audit_log` were checked in the rehearsal only; each test run leaves a few permanent entries in the development audit log.

### 1.6 Design direction and design system

- **What:**
  1. I show you **2–3 distinct visual directions** for Workaora as previews: colour, typography, density and tone. Each comes in light and dark versions.
  2. **You choose one (or mix).** This is your decision.
  3. I turn your choice into **design tokens**: named colours, font sizes, spacing and corner radii, used everywhere instead of one-off values.
  4. Core components: Button, Input, Textarea, Select, Checkbox, Card, Badge, Avatar, Dialog, Toast, Skeleton (loading), Empty state, Error state.
  5. A style-guide page at `/dev/styleguide`, available only in development, showing every component in light and dark at phone and desktop widths.
- **Considerations built in:**
  - text contrast that meets accessibility guidelines;
  - visible keyboard focus;
  - fonts that render Indian scripts (Devanagari, Tamil, etc.) properly in names and bios, using Noto Sans fallbacks;
  - small font files for fast loading on mobile data.
- **Acceptance:**
  - you approve the look;
  - an automated accessibility scan of the style-guide page reports no serious issues;
  - every component works with keyboard only.
- **You'll learn:** what a design system is, and why consistency makes the product feel premium.

### 1.7 Automatic checks on GitHub (CI)

- **What:** a GitHub Actions workflow that runs `npm run check` and `npm run build` on every upload. GitHub shows a green tick or a red cross.
- **Database tests in CI:** **not in Phase 1.** Running them on GitHub would mean storing the dev project's secret key in GitHub. Instead, permission tests run on your machine before each commit, and we revisit this in Phase 2 (see Open questions).
- **Cost:** private repositories get a free monthly Actions allowance. Our usage should stay well inside it. I'll verify the current allowance before enabling it.
- **Acceptance:** a green tick on GitHub for the latest commit. A deliberately failing check shows a red cross.

### 1.8 Documentation

- **What:** create `docs/ARCHITECTURE.md`, `ENVIRONMENT_SETUP.md` (how to set up a fresh machine from scratch), `DATABASE_SCHEMA.md`, `SECURITY_PRIVACY.md` (with the permission test matrix), and `TESTING.md`. Update `README.md` and `CHANGELOG.md`.
- **Acceptance:** you can follow `ENVIRONMENT_SETUP.md` to understand how the project runs.

## Phase 1 is complete when

- [ ] All step acceptance checks pass.
- [ ] `npm run check` and `npm run build` pass locally and on GitHub.
- [ ] All permission tests pass against `dev`.
- [ ] No secret value appears anywhere in Git history (checked with a secret scan).
- [ ] You have seen the app, the style guide and the dashboard tables yourself.
- [ ] Docs are updated and committed.
- [ ] You approve moving to Phase 2 (Auth + age-aware onboarding).

## Your decisions during Phase 1

| When | Decision |
|------|----------|
| Before 1.1 | Approve this plan |
| 1.4 | Create the Supabase account and project (free); accept their terms yourself |
| 1.6 | Choose the visual direction |
| End | Approve Phase 1 as complete |

## Open questions (not blocking Phase 1)

- **Database tests in CI from Phase 2:** store dev-project secrets in GitHub, or keep them local-only? To decide in Phase 2.
- **Figma:** still useful for quick wireframes of later screens. Optional, since the design system lives in code.
