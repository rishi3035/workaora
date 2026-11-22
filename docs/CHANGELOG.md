# Changelog

All notable changes to Workaora are recorded here, newest first.

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
