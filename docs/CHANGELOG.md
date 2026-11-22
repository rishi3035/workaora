# Changelog

All notable changes to Workaora are recorded here, newest first.

## 2026-11-22: Interactive Working Prototype & Multi-Profile Architecture

- Built the interactive working prototype in `src/app/prototype-app.tsx` mounted at `/`.
- Implemented the Homepage Role Gateway with two distinct workspaces:
  - **Creator / Talent Studio**: Full portfolio management, live "+ Add New Portfolio Work" dialog, project editing/deletion, transparent rate card adjustment, and live update broadcasting.
  - **Manager / Agency Hub**: Multi-creator discovery feed across N creators (Aman Sharma, Rhea Sen, Kabir Joshi, Priya Nair), live broadcast tracking, role filtering, candidate shortlisting, and separate creator page deep-linking.
- Integrated bilateral Confirmed Collaborations (Rule D-010) and DPDP explicit contact sharing requests (Rule D-009).
- Clean discovery feed with D-007 "Appreciate" reaction signal and age-gate simulator (D-046/D-047).
- Updated documentation and verified all 71 unit tests, typechecks, and formatting checks pass.

## 2026-11-22: BRD and PRD drafted; Phase 2 on hold

- Added `BRD.md`: the Business Requirements Document. Draft for the founder's review.
- Rewrote `PRODUCT_REQUIREMENTS.md` as a whole-product PRD (version 2.0). The Phase 2 requirements from version 1.0 are kept under new IDs; Appendix A maps old to new.
- `PHASE_2_PLAN.md` now cites the new requirement IDs and is marked on hold until the BRD and PRD are approved.
- Corrected `PHASE_1_PLAN.md`: legal question A7 is priority 2, not priority 1.
- No code changed. Nothing is built.

## 2026-11-22: Phase 2 planned (not started)

- Added `PRODUCT_REQUIREMENTS.md` with the requirements for accounts, login and age-aware onboarding.
- Added `PHASE_2_PLAN.md`: ten steps with acceptance checks.
- Proposed decisions D-046 to D-054. All await the founder's approval.

## 2026-11-22: Phase 1 approved

- The founder approved Phase 1 (Foundation) as complete.
- Removed a stray test report file that had been committed by mistake and had failed GitHub's formatting check; its folder is now ignored.
- Next: Phase 2 (sign-up, login and age-aware onboarding), starting with a plan for the founder's approval.

## 2026-11-22: Phase 1, step 1.8 (documentation) and Phase 1 checklist

- Added `ARCHITECTURE.md`, `ENVIRONMENT_SETUP.md`, `SECURITY_PRIVACY.md` and `TESTING.md`.
- Ran the Phase 1 completion checklist: all checks, the build, the database tests, a scan of Git history for secrets, and a package vulnerability audit. All passed.

## 2026-11-22: Phase 1, step 1.7 (automatic checks on GitHub)

- Added `.github/workflows/ci.yml`: formatting, lint, type-check, tests and a production build on every upload to `main` and every pull request.
- Added `.nvmrc` and an `engines` entry so every machine uses Node.js 26.
- Proved the checks fail on a deliberately broken branch, then deleted the branch.

## 2026-11-22: Phase 1, step 1.6 (design system)

- Visual direction chosen by the founder: Studio's fonts and colours with Arena's shapes (D-044).
- Added design tokens, brand fonts and fonts for four Indian scripts.
- Added the core components in `src/ui/` with 28 tests.
- Added the development-only style guide at `/dev/styleguide` with a built-in accessibility scan.
- Development-only pages now use the `page.dev.tsx` naming rule and are left out of production builds.
- New packages: `radix-ui`, `clsx`, `tailwind-merge`; for testing: `axe-core`, `@testing-library/user-event`, `@testing-library/jest-dom`.
- Added `docs/DESIGN_SYSTEM.md`. Removed the temporary design-direction preview.

## 2026-11-22: Phase 1, step 1.5 (first database tables)

- Applied three migrations to the development database: `staff`, `audit_log`, `app_settings`, with their functions and rules.
- Sign-up for 16–17-year-olds is stored as a server-side switch and is off.
- Added 25 permission tests and a guard that keeps database tests on the development project.
- Added `npm run db:types` and typed the three database connections.
- Added `docs/DATABASE_SCHEMA.md`.
- Decisions D-041 to D-043.

## 2026-11-22: Phase 1, step 1.4 complete (development database connected)

- Development project `workaora-dev-mumbai` created by the founder in Mumbai (`ap-south-1`), replacing a first project that had been created in Seoul.
- Connection tests pass; the app starts with real settings; the Supabase command-line tool is logged in and linked.
- The settings check now rejects a project address with extra parts on the end.
- The start-up check moved to `src/instrumentation-node.ts`.
- README: Windows PowerShell note (`npm.cmd`, `npx.cmd`).

## 2026-11-22: Phase 1, step 1.4 preparation (development database)

- D-040 (new Supabase keys only) accepted.
- Added the Supabase command-line tool and `supabase/config.toml`.
- Added `npm run test:db` with three read-only connection tests.
- Fixed blank settings being reported twice.

## 2026-11-22: Phase 1, step 1.3 (structure and security guard-rails)

- Added three database connection modules: browser, server and admin. The admin one is locked to server code.
- Added a settings check that stops the app at start-up, with a plain-language message, if a setting is missing or wrong.
- Added `.env.example` (names only) and tripwire tests for the safety rules.
- Added lint rules that keep database connections and settings access in one place.
- Added `src/features/` and `src/ui/` with their conventions.
- New packages: `@supabase/supabase-js`, `@supabase/ssr`, `zod`, `server-only`.
- `npm run dev` now needs `.env.local` (created in step 1.4).

## 2026-11-22: Phase 1, step 1.2 (code-quality tools)

- Added Prettier (formatting), Vitest and React Testing Library (tests).
- Added the first two tests, for the home page.
- New commands: `npm run check` (everything), `npm run test`, `npm run test:watch`, `npm run format`, `npm run format:check`.
- Raised `@types/node` to version 26 to match Node.js 26.

## 2026-11-22: Phase 1, step 1.1 (app skeleton)

- Phase 1 plan approved (`docs/PHASE_1_PLAN.md`).
- Added the Next.js 16 app skeleton: TypeScript (strict), App Router, Tailwind CSS 4, ESLint.
- Added a temporary Workaora placeholder page and a temporary tab icon.
- Search-engine indexing switched off until public launch.
- New commands: `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`.

## 2026-11-22: Project created

- Brand name **Workaora** chosen (D-038); domain `workaora.co.in` registered by the founder.
- Repository created at `C:\dev\workaora`; planning documents moved into `docs/` (D-021).
- Added README, `.gitignore` (blocks secrets, env files and recovery codes) and `.gitattributes`.
- Decision D-039: start ₹0-cost foundation work before validation completes; validation and legal sign-off remain required at their gates.
- No application code yet.
