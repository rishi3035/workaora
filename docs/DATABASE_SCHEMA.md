# Database Schema

What exists in the database today, who can do what, and how to change it safely.
The planned full schema for the product is in `PHASE_0_PLAN.md` §5.1. This file records only what has actually been built.

**Last updated:** 22 November 2026 (Phase 1, step 1.5)
**Database:** Supabase Postgres 17. Development project `workaora-dev-mumbai` (Mumbai). No production database exists yet.

## How the database is changed

Every change is a **migration**: a numbered SQL file in `supabase/migrations/`, saved in Git.

1. Write a new migration file. **Never edit a migration that has already been applied.** Fix mistakes with a new migration.
2. Rehearse it and review the SQL.
3. See what would be applied, without changing anything: `npx.cmd supabase db push --remote --dry-run`
4. Apply it to the development database, with the founder's approval: `npx.cmd supabase db push --remote`
5. Run the permission tests: `npm.cmd run test:db`
6. Refresh the TypeScript descriptions of the tables: `npm.cmd run db:types`
7. Update this file.

The Supabase tool calls any online project "production" in its messages. The linked project is our **development** database.

## The pattern every table follows

1. **Row Level Security is on.** The database checks every row against explicit rules.
2. **All permissions are removed** from the outside roles, then only what is needed is given back.
3. **Reading is controlled by a policy.** Writing happens only through database functions that check who is asking and record the action in the audit log.

The outside roles are:

| Role | Who it is |
|------|-----------|
| `anon` | A visitor who is not logged in |
| `authenticated` | A logged-in user |
| `service_role` | Our own server, using the secret key. It skips row rules, but still only has the table permissions we give it. |

## Tables

### `public.staff`

Who is an admin or moderator. The only source of staff rights (D-014, D-036).

| Column | Type | Notes |
|--------|------|-------|
| `user_id` | uuid, primary key | The account. Removed automatically if the account is deleted. |
| `role` | text | `admin` or `moderator` |
| `granted_at` | timestamp | |
| `granted_by` | uuid, optional | Who granted it |
| `grant_reason` | text | Required, at least 3 characters |

Staff entries link to the login account for now. When profiles are added (Phase 3), a profile shares the account's ID, so nothing needs to change.

### `public.audit_log`

A permanent, append-only record of sensitive actions (D-035).

| Column | Type | Notes |
|--------|------|-------|
| `id` | number, primary key | |
| `occurred_at` | timestamp | |
| `actor_id` | uuid, optional | Who did it. Not linked to accounts, so entries survive account deletion. |
| `actor_kind` | text | `authenticated`, `service_role`, or `direct` (dashboard or migration) |
| `action` | text | Dotted lowercase words, e.g. `staff.granted` |
| `target_type`, `target_id` | text, optional | What it happened to |
| `metadata` | JSON | Details, such as the reason |

Database triggers block every update, delete and truncate, for every role including the database owner.

Actions recorded so far: `staff.granted`, `staff.changed`, `staff.revoked`, `app_setting.changed`.

### `public.app_settings`

Public, non-secret product switches. **Never store a secret here.**

| Column | Type | Notes |
|--------|------|-------|
| `key` | text, primary key | Lowercase with underscores |
| `value` | JSON | A key ending in `_enabled` must be exactly `true` or `false` |
| `description` | text | Plain-language explanation |
| `updated_at`, `updated_by` | timestamp, uuid | |

| Setting | Value | Meaning |
|---------|-------|---------|
| `minors_signup_enabled` | `false` | Whether people aged 16–17 can sign up. Stays `false` until the three conditions in D-022 are met. |

## Who can do what

| | Visitor | Logged-in user | Moderator | Admin | Our server |
|---|---|---|---|---|---|
| Read `staff` | No | Sees no rows | Yes | Yes | Yes |
| Add, change or remove staff | No | No | No | No | Only through `set_staff_role`, with a reason |
| Read `audit_log` | No | Sees no rows | Yes | Yes | Yes |
| Add an audit entry | No | No | No | No | Only through `record_audit_event` |
| Edit or delete audit entries | No | No | No | No | No |
| Read `app_settings` | Yes | Yes | Yes | Yes | Yes |
| Change a setting | No | No | No | Only through `set_app_setting`, with a reason | No |

## Functions

| Function | Callable by | What it does |
|----------|-------------|--------------|
| `public.set_staff_role(user, role, reason, acting_user)` | Our server only | Grants a role, changes it, or removes it (role = null). A reason is required. Server code must first confirm the person asking is an admin. |
| `public.record_audit_event(actor, action, target_type, target_id, metadata)` | Our server only | Adds an audit entry |
| `public.set_app_setting(key, value, reason)` | Logged-in users, but it refuses anyone who is not an admin | Changes an existing setting and logs the old value, new value and reason (at least 10 characters) |
| `private.is_staff()` | Logged-in users and our server | Answers yes or no. Used by the read rules. |
| `private.is_admin()` | Database functions only | Answers yes or no |
| `private.write_audit(...)` | Database functions only | The single place that inserts audit entries |
| `private.audit_staff_change()` | A trigger | Logs every change to `staff`, however it is made |
| `private.reject_audit_log_change()` | A trigger | Blocks edits, deletes and truncation of `audit_log` |

The `private` schema is not reachable from a browser.

## How this is tested

| Test | Command | What it proves |
|------|---------|----------------|
| Permission tests (`tests/db/permissions.test.ts`) | `npm.cmd run test:db` | 25 tests against the development database. Each forbidden action is refused, and refused for the expected reason (the database's own error code). |
| Connection tests (`tests/db/connection.test.ts`) | same | The keys work, and the public key cannot do admin-only things |
| Dev-only guard (`src/lib/db-test-guard.test.ts`) | `npm.cmd run check` | The database tests refuse to run against any project except the registered development one |

The permission tests create three temporary accounts with `@example.com` addresses and delete them at the end. They never switch `minors_signup_enabled` on.

**Known limits:**
- The triggers that stop even the database owner from changing `audit_log` cannot be exercised through the app's connections. They were checked once in a local rehearsal, not by the automated tests.
- Each test run adds a few entries to the development audit log. They cannot be removed, by design.
- The database tests do not run on GitHub yet (see `PHASE_1_PLAN.md`, step 1.7).

## Migration history

| File | Applied to dev | What it did |
|------|----------------|-------------|
| `20261122130000_private_schema_and_staff.sql` | 22 Nov 2026 | `private` schema, `staff` table, `is_staff()` and `is_admin()` |
| `20261122130100_audit_log.sql` | 22 Nov 2026 | `audit_log` table, append-only triggers, staff change logging, `set_staff_role`, `record_audit_event` |
| `20261122130200_app_settings.sql` | 22 Nov 2026 | `app_settings` table, `minors_signup_enabled = false`, `set_app_setting` |
