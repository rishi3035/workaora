# Workaora

An India-first, work-first professional network and hiring platform for the creator economy and esports industry.

**Status:** Phase 1 (Foundation) is complete and approved (22 Nov 2026). Phase 2 (sign-up, login and age-aware onboarding) is planned but on hold: the BRD and PRD are drafted and must be reviewed and approved by the founder first. Nothing in Phase 2 is built. The app has a placeholder home page, a design system, a development database with its first three tables, and automatic checks. It has no user-facing features yet. Validation and legal review are still outstanding (see D-039).

**New to the project?** Start with [docs/ENVIRONMENT_SETUP.md](docs/ENVIRONMENT_SETUP.md), then [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Run it on your computer

Open a terminal in this folder (`C:\dev\workaora`), then:

> **Windows PowerShell note.** If a command fails with "running scripts is disabled on this system", type `npm.cmd` instead of `npm`, and `npx.cmd` instead of `npx` (for example `npm.cmd run dev`). PowerShell is blocking its own script version of the command; the `.cmd` version does the same job.

| Command | What it does |
|---------|--------------|
| `npm install` | Downloads the packages the app needs (first time, or after `package.json` changes) |
| `npm run dev` | Starts the app at http://localhost:3000. The style guide is at http://localhost:3000/dev/styleguide. Press Ctrl+C to stop. **Needs `.env.local`** (copy `.env.example` and fill it in); without it the app stops and tells you what is missing. |
| `npm run check` | **Runs every check below in one go. Run this before saving work to Git.** |
| `npm run format` | Tidies the code layout automatically |
| `npm run format:check` | Reports files whose layout isn't tidy, without changing them |
| `npm run lint` | Checks the code for common mistakes |
| `npm run typecheck` | Checks that the TypeScript types are consistent |
| `npm run test` | Runs the automated tests once |
| `npm run test:watch` | Re-runs tests automatically as files change |
| `npm run test:db` | Runs the database tests against the **development** database. Needs `.env.local` and an internet connection. Not part of `npm run check`. |
| `npm run db:types` | Regenerates the TypeScript descriptions of the database tables. Run after every database change. |
| `npm run build` | Builds the production version, to prove it compiles |

## Automatic checks on GitHub

Every upload to `main` is checked on GitHub: formatting, lint, type-check, tests and a production build. See the **Actions** tab of the repository. A green tick means all passed; a red cross means something needs fixing.

The checks run after the upload, so run `npm run check` yourself first. The database tests (`npm run test:db`) do not run on GitHub.

## Documentation

| Document | What it covers |
|----------|----------------|
| [docs/PHASE_2_PLAN.md](docs/PHASE_2_PLAN.md) | The next phase: accounts, login and age-aware onboarding. Proposed. |
| [docs/BRD.md](docs/BRD.md) | Business Requirements Document: the business case, users, goals, risks, measures and open questions. Draft. |
| [docs/PRODUCT_REQUIREMENTS.md](docs/PRODUCT_REQUIREMENTS.md) | Product Requirements Document: journeys, scope, functional requirements, screens, data, rules and tests. Draft. |
| [docs/PHASE_1_PLAN.md](docs/PHASE_1_PLAN.md) | Phase 1 (Foundation): complete. Steps, acceptance checks and results. |
| [docs/PHASE_0_PLAN.md](docs/PHASE_0_PLAN.md) | Business analysis, MVP scope, architecture, data and security model, roadmap, budget, validation plan |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | How the app is put together, the folder map, and the rules that keep it safe and tidy |
| [docs/ENVIRONMENT_SETUP.md](docs/ENVIRONMENT_SETUP.md) | Setting up a computer from nothing, everyday commands, troubleshooting |
| [docs/SECURITY_PRIVACY.md](docs/SECURITY_PRIVACY.md) | What protects the app, how each protection is tested, and what is still missing |
| [docs/TESTING.md](docs/TESTING.md) | The checks, how to run them, and what they do and do not prove |
| [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | How Workaora looks: colours, fonts, components, and what was checked for accessibility |
| [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) | The tables that exist, who can do what, and how to change the database safely |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Every important decision, its status and history |
| [docs/LEGAL_QUESTIONS.md](docs/LEGAL_QUESTIONS.md) | Questions for qualified Indian counsel |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | What changed, and when |

Still to come: deployment guide and runbooks (Phases 8 and 10). See PHASE_0_PLAN §9.4.

## Ground rules

- Never commit secrets: `.env` files, API keys, secret keys, recovery codes.
- `.env.local` holds keys for the **development** database only. Production keys never go on this computer.
- Database connections are created only in `src/lib/supabase/`. The admin connection is for server code only.
- Every database change is a migration file in `supabase/migrations/`.
- Every feature ships with tests, including permission tests.
- Important decisions are logged in `docs/DECISIONS.md` before they are implemented.

## Licence

Proprietary. All rights reserved. Not open source.
