# Workaora

An India-first, work-first professional network and hiring platform for the creator economy and esports industry.

**Status:** Phase 1 (Foundation) in progress. The app is an empty skeleton with a placeholder page. Validation and legal review are still outstanding (see D-039).

## Run it on your computer

Open a terminal in this folder (`C:\dev\workaora`), then:

| Command | What it does |
|---------|--------------|
| `npm install` | Downloads the packages the app needs (first time, or after `package.json` changes) |
| `npm run dev` | Starts the app at http://localhost:3000. Press Ctrl+C to stop. |
| `npm run lint` | Checks the code for common mistakes |
| `npm run typecheck` | Checks that the TypeScript types are consistent |
| `npm run build` | Builds the production version, to prove it compiles |

## Documentation

| Document | What it covers |
|----------|----------------|
| [docs/PHASE_1_PLAN.md](docs/PHASE_1_PLAN.md) | The current phase: steps, acceptance checks and progress |
| [docs/PHASE_0_PLAN.md](docs/PHASE_0_PLAN.md) | Business analysis, MVP scope, architecture, data and security model, roadmap, budget, validation plan |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Every important decision, its status and history |
| [docs/LEGAL_QUESTIONS.md](docs/LEGAL_QUESTIONS.md) | Questions for qualified Indian counsel |
| [docs/CHANGELOG.md](docs/CHANGELOG.md) | What changed, and when |

More documents (architecture, database schema, environment setup, testing, security and privacy) are added in Phase 1. See PHASE_0_PLAN §9.4.

## Ground rules

- Never commit secrets: `.env` files, API keys, service-role keys, recovery codes.
- Every database change is a migration file in `supabase/migrations/`.
- Every feature ships with tests, including permission tests.
- Important decisions are logged in `docs/DECISIONS.md` before they are implemented.

## Licence

Proprietary. All rights reserved. Not open source.
