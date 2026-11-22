# Environment Setup

How to get Workaora running on a Windows computer from nothing. Follow it top to bottom on a new machine, or use the last sections as a reference.

**Last updated:** 22 November 2026 (end of Phase 1)
**Time needed:** about 30 minutes, most of it waiting for downloads.

## Important: `npm.cmd`, not `npm`

On Windows PowerShell, the commands `npm` and `npx` may fail with:

> running scripts is disabled on this system

If so, type `npm.cmd` and `npx.cmd` instead. This guide uses those forms throughout. They do exactly the same job.

The cause is a Windows security setting called the execution policy. It can be relaxed, but that is a security decision for the computer's owner, and using `.cmd` avoids the need.

## 1. Install the tools

Open PowerShell and run each line. Windows will ask for permission for each installer.

```powershell
winget install --id Git.Git -e
winget install --id OpenJS.NodeJS.LTS -e
winget install --id Microsoft.VisualStudioCode -e
winget install --id GitHub.cli -e
```

| Tool | What it is for |
|------|----------------|
| Git | Saves the full history of the code |
| Node.js (with npm) | Runs and builds the app. The project needs version 26 or newer. |
| VS Code | For reading and editing files |
| GitHub CLI (`gh`) | Connects this computer to GitHub |

**Close PowerShell and open it again**, then check:

```powershell
git --version; node --version; npm.cmd --version; gh --version
```

Each should print a version number. "Not recognized" means the window was not reopened, or the install failed.

## 2. Connect to GitHub

```powershell
gh auth login
```

Choose GitHub.com, HTTPS, and "Login with a web browser". Sign in on GitHub's own page. Answer **Yes** when asked whether to authenticate Git.

Then tell Git who you are. Use GitHub's private "noreply" email so your real address does not appear in the code history. Find yours at GitHub → Settings → Emails.

```powershell
git config --global user.name "Your Name"
git config --global user.email "12345678+your-username@users.noreply.github.com"
git config --global init.defaultBranch main
```

## 3. Get the code

Use a folder path without spaces (D-021).

```powershell
mkdir C:\dev
cd C:\dev
gh repo clone Aviiiii1402/workaora
cd workaora
npm.cmd install
```

`npm.cmd install` downloads the packages the app needs into a folder called `node_modules`. It takes a few minutes the first time.

## 4. Add the settings file

The app needs three values from the **development** Supabase project (`workaora-dev-mumbai`).

1. Make your own copy of the template:

   ```powershell
   Copy-Item .env.example .env.local
   code .env.local
   ```

2. In the Supabase dashboard, open the project and go to **Project Settings → API Keys**.
3. Paste each value straight after its `=` sign, with no spaces or quotes:

   | Setting | What to paste |
   |---------|---------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | The project's address, **only up to `.supabase.co`**. The dashboard may show it ending in `/rest/v1/`; leave that part out. |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | The key starting with `sb_publishable_` |
   | `SUPABASE_SECRET_KEY` | The key starting with `sb_secret_` |

4. Save the file.

**Rules for this file**

- It stays on this computer. Git is set up to ignore it, and a test fails if that ever changes.
- It holds keys for the **development** project only. Production keys never go on this computer.
- Never paste the secret key into a chat, a screenshot, an email or a note.

If a value is wrong, the app says which one and how to fix it when it starts.

## 5. Connect the Supabase tool

This lets you apply database changes and run the database tests.

```powershell
npx.cmd supabase login
```

Press Enter, then approve the login in the browser.

```powershell
npx.cmd supabase link --project-ref aysjinjtabhgozxxffwa
```

That reference is the development project's. It is part of the project's public address, so it is not a secret.

The Supabase tool calls any online project "production" in its messages. For us the linked project is the **development** database.

## 6. Run it

```powershell
npm.cmd run dev
```

Open `http://localhost:3000`. The style guide is at `http://localhost:3000/dev/styleguide`. Press Ctrl+C in the terminal to stop.

## 7. Confirm everything works

```powershell
npm.cmd run check
npm.cmd run test:db
```

- `check` runs formatting, lint, type-check and the tests that need no network. It should end with all tests passing.
- `test:db` runs the tests against the development database. It needs an internet connection and `.env.local`.

## Everyday commands

| Command | What it does |
|---------|--------------|
| `npm.cmd run dev` | Starts the app on this computer |
| `npm.cmd run check` | Runs every check that needs no network. **Run before saving work to Git.** |
| `npm.cmd run format` | Tidies the code layout automatically |
| `npm.cmd run test:db` | Runs the database tests against the development database |
| `npm.cmd run db:types` | Refreshes the app's description of the database tables. Run after every database change. |
| `npm.cmd run build` | Builds the production version, to prove it compiles |
| `npx.cmd supabase db push --remote --dry-run` | Shows which database changes would be applied, without applying them |
| `npx.cmd supabase db push --remote` | Applies new database changes to the development database. **Only after the SQL has been reviewed and approved.** |

## Accounts this project uses

| Service | What for | Plan today |
|---------|----------|------------|
| GitHub | Code, history, automatic checks | Free |
| Supabase | Development database (`workaora-dev-mumbai`, Mumbai) | Free |

More are added later, each only with the founder's approval: Google Cloud (Google sign-in), Resend, Cloudflare, Vercel, Sentry, PostHog. See `PHASE_0_PLAN.md` §9.3.

Turn on two-factor login for every one of these accounts.

## Troubleshooting

| What you see | What to do |
|--------------|------------|
| "running scripts is disabled on this system" | Use `npm.cmd` / `npx.cmd` (see the top of this guide) |
| "Workaora can't start because some settings are missing or wrong" | Read the list under the message. It names each setting and what is wrong. Fix `.env.local` and start again. |
| "…must be only the project address…" | Remove everything after `.supabase.co` in `NEXT_PUBLIC_SUPABASE_URL` |
| "Database tests stopped: .env.local does not point at the development project" | `.env.local` has another project's address. The database tests only run against the development project. |
| "Another next dev server is already running" | The app is already running in another terminal. Use that one, or stop it with Ctrl+C. |
| A command is "not recognized" just after installing | Close the terminal and open a new one |
| `npm.cmd install` shows a version conflict | Do not add `--force`. Read which package conflicts and ask for help; forcing can install a broken combination. |
| The free Supabase project is "paused" | Free projects pause after about a week without use. Open the dashboard and choose to restore it. |

## Working with Claude Code

- Project notes for the AI assistant live in `AGENTS.md` and in `docs/`.
- `.claude/launch.json` tells Claude's browser preview how to start the app.
- The assistant never needs the secret key or the database password. If it asks for one, something is wrong: stop and question it.
