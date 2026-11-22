# Workaora

An India-first, work-first professional network and hiring platform for the creator economy and esports industry.

**Status:** Phase 1 (Foundation) in progress. The app is an empty skeleton with a placeholder page. Validation and legal review are still outstanding (see D-039).

## Run it on your computer

Open a terminal in this folder (`C:\dev\workaora`), then:

> **Windows PowerShell note.** If a command fails with "running scripts is disabled on this system", type `npm.cmd` instead of `npm`, and `npx.cmd` instead of `npx` (for example `npm.cmd run dev`). PowerShell is blocking its own script version of the command; the `.cmd` version does the same job.

| Command | What it does |
|---------|--------------|
| `npm install` | Downloads the packages the app needs (first time, or after `package.json` changes) |
| `npm run dev` | Starts the app at http://localhost:3000. Press Ctrl+C to stop. **Needs `.env.local`** (copy `.env.example` and fill it in); without it the app stops and tells you what is missing. |
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

## Documentation

| Document | What it covers |
|----------|----------------|
| [docs/PHASE_1_PLAN.md](docs/PHASE_1_PLAN.md) | The current phase: steps, acceptance checks and progress |
| [docs/PHASE_0_PLAN.md](docs/PHASE_0_PLAN.md) | Business analysis, MVP scope, architecture, data and security model, roadmap, budget, validation plan |
| [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) | The tables that exist, who can do what, and how to change the database safely |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Every important decision, its status and history |
| [docs/LEGAL_QUESTIONS.md](docs/LEGAL_QUESTIONS.md) | Questions for qualified Indian counsel |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | What changed, and when |

More documents (architecture, database schema, environment setup, testing, security and privacy) are added in Phase 1. See PHASE_0_PLAN §9.4.

## Ground rules

- Never commit secrets: `.env` files, API keys, secret keys, recovery codes.
- `.env.local` holds keys for the **development** database only. Production keys never go on this computer.
- Database connections are created only in `src/lib/supabase/`. The admin connection is for server code only.
- Every database change is a migration file in `supabase/migrations/`.
- Every feature ships with tests, including permission tests.
- Important decisions are logged in `docs/DECISIONS.md` before they are implemented.

## Licence

Proprietary. All rights reserved. Not open source.
