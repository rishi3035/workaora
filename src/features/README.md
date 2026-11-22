# Features

Each product feature gets its own folder here, for example `profiles/`, `jobs/`, `applications/`.

A feature folder keeps everything for that feature together:

| Folder or file | Holds |
|----------------|-------|
| `components/` | The feature's screens and pieces of screens |
| `queries/` | Code that reads data (server only) |
| `actions/` | Code that changes data (server only) |
| `schemas/` | The rules for valid input (shared by browser and server) |
| `*.test.ts(x)` | Tests, next to the code they test |

Rules:

- A feature may use `src/ui/` and `src/lib/`. It should not reach into another feature's internals.
- All database access goes through the connections in `src/lib/supabase/`.
- Folders are created when a feature is built, not before.

The planned features are listed in `docs/PHASE_0_PLAN.md` §3.4.
