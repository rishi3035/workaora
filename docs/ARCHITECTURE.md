# Architecture

How Workaora is put together, and why. This describes what exists today. The plan for the full product is in `PHASE_0_PLAN.md` §3 to §5.

**Last updated:** 22 November 2026 (end of Phase 1)

## The short version

Workaora is **one web app** that talks to **one managed backend**.

```
   Visitor's browser
          │
          ▼
   Next.js app  ──────────────►  Supabase (Mumbai)
   (pages, forms, server code)   ├─ Postgres database, with Row Level Security
                                 ├─ Auth (accounts and logins)       not used yet
                                 └─ Storage (uploaded images)        not used yet
```

- **No separate API server, no microservices, no Docker.** Fewer parts means fewer things to break and to pay for (D-002, D-003).
- **The database protects itself.** Every table has rules deciding who can read or change each row. A bug in the app's code still cannot expose data the rules forbid.
- **Web first.** The site is built to work well on a phone's browser. Native Android and iOS apps come later, if real demand shows up (D-001).

## What it is built with

| Layer | Choice | Version today | Why |
|-------|--------|---------------|-----|
| Language | TypeScript, strict mode | 5.9 | Catches many mistakes before the code runs |
| Web framework | Next.js, App Router | 16.4 | Pages are rendered on the server, so shared links show previews and search engines can read public pages |
| UI library | React | 19.3 | |
| Styling | Tailwind CSS with Workaora's own tokens | 4.3 | See `DESIGN_SYSTEM.md` |
| Accessible building blocks | Radix | 1.8 | Dialogs and toasts that handle keyboard focus correctly |
| Input checking | Zod | 4.6 | One set of rules, used in the browser and on the server |
| Backend | Supabase: Postgres 17 | supabase-js 2.x | Managed database, logins and file storage in one place |
| Tests | Vitest, React Testing Library, axe-core | Vitest 5 | See `TESTING.md` |
| Checks on every upload | GitHub Actions | | See `.github/workflows/ci.yml` |
| Runtime | Node.js | 26 (recorded in `.nvmrc`) | |

This Next.js version is newer than most tutorials and AI training data. Its own documentation ships inside the project at `node_modules/next/dist/docs/`. Read the relevant page there before writing Next.js code (`AGENTS.md` says the same).

**Not in use yet, but planned:** Vercel (hosting, from closed beta), Resend (email, Phase 2), Cloudflare Turnstile (bot protection at sign-up, Phase 2), Sentry and PostHog (errors and analytics, Phase 10).

## Folder map

```
workaora/
├─ src/
│  ├─ app/                 Pages and routes. A folder here becomes a web address.
│  │  ├─ layout.tsx        The frame around every page: fonts, language, page title
│  │  ├─ page.tsx          The home page (a placeholder for now)
│  │  ├─ globals.css       The design tokens: colours, fonts, sizes
│  │  └─ dev/styleguide/   The style guide. Development only (see below).
│  ├─ features/            One folder per product feature. Empty until Phase 2.
│  ├─ ui/                  The design system's components: Button, Field, Dialog…
│  ├─ lib/
│  │  ├─ env/              Reads and checks the app's settings
│  │  └─ supabase/         The three database connections, and the table types
│  ├─ instrumentation.ts   Runs once at start-up; triggers the settings check
│  └─ instrumentation-node.ts   The settings check itself
├─ supabase/
│  ├─ migrations/          Every database change, in order, as SQL files
│  └─ config.toml          Settings for the Supabase command-line tool
├─ tests/db/               Tests that run against the real development database
├─ docs/                   All documentation
├─ .github/workflows/      The automatic checks GitHub runs
└─ .env.example            Template for the settings file (names only, no values)
```

## The rules that keep it safe and tidy

These are enforced by tools, not just by habit. Breaking one fails lint, the tests or the build.

1. **Three database connections, and only three** (`src/lib/supabase/`):

   | Connection | Where it runs | Key | What it can do |
   |------------|---------------|-----|----------------|
   | `browser.ts` | The visitor's browser | Publishable | Only what the database's rules allow |
   | `server.ts` | Our server, as the logged-in person | Publishable + their login cookies | The same: the rules apply in full |
   | `admin.ts` | Our server only | **Secret** | Skips the row rules. For rare, checked, logged actions only. |

   Nothing else may create a database connection (lint rule). The admin connection cannot be bundled into browser code (the build fails) and cannot be imported by a screen file (lint rule).

2. **Settings are read in one place** (`src/lib/env/`). The app checks them at start-up and refuses to run, with a plain-language message, if one is missing or wrong. Nothing else may read `process.env` (lint rule).

3. **Features stay separate.** A feature folder holds its own screens, data reading, data changing, input rules and tests. It may use `src/ui/` and `src/lib/`, but not reach into another feature's internals. See `src/features/README.md`.

4. **Every database change is a migration file.** Applied migrations are never edited. See `DATABASE_SCHEMA.md`.

5. **Design values come from tokens.** Tailwind's built-in colours are switched off. See `DESIGN_SYSTEM.md`.

## Two environments

| | Development | Production |
|---|-------------|------------|
| Database | `workaora-dev-mumbai` (Supabase, Mumbai, Free plan) | Does not exist yet. Created at closed beta, on the paid plan for backups (D-033). |
| Where the app runs | The founder's computer (`npm run dev`) | Not hosted yet. Vercel from closed beta (D-032). |
| Data | Test data only | Real users only |
| Keys | In `.env.local` on the founder's computer | Will live only in the hosting provider's settings |

Production keys never go on the development computer. Real user data is never copied into development (D-004).

The database tests refuse to run against any project except the registered development one (`tests/db/dev-project.ts`).

## Development-only pages

A page file named `page.dev.tsx` exists only while running `npm run dev`. In a production build it is left out entirely, along with anything only it uses. This is set in `next.config.ts`.

Today that covers the style guide at `/dev/styleguide`.

## How a request will flow (from Phase 2)

Today the app has one static page and reads no data. Once features exist, the pattern is:

1. **Reading data:** a page on the server uses the `server` connection. The database returns only the rows that person may see.
2. **Changing data:** a form calls a server action in the feature's `actions/` folder. The action checks the input with Zod, then calls the database. Anything sensitive goes through a database function that checks permissions again and writes to the audit log.
3. **The browser never holds a secret**, and never decides what someone is allowed to do.

A small "proxy" file that refreshes login cookies on each request is added with sign-in in Phase 2.

## What does not exist yet

Accounts and login, profiles, portfolios, organisations, opportunities, applications, search, the feed, notifications, moderation tools, image uploads, email, hosting, error monitoring and analytics. They arrive in Phases 2 to 10 (`PHASE_0_PLAN.md` §6).

## When this architecture should change

Only on evidence. The signals and the response to each are listed in `PHASE_0_PLAN.md` §3.5. In short: heavy mobile use and demand for an app leads to an Expo app; slow or poor search at scale leads to a search service; sustained database load leads to a larger database, caching and query tuning.

## Where decisions are recorded

Every choice above has an entry in `DECISIONS.md` with its reasoning: D-001 to D-004 (web-first, Supabase, single app, two environments), D-014 (private data and staff), D-031 to D-036 (uploads, hosting, backups, trust levels, audit log, permissions), D-040 (new Supabase keys), D-041 to D-043 (staff and settings), D-044 and D-045 (design).
