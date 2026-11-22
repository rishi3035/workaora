-- Migration 1 of 3: the private schema and the staff table.
--
-- "Staff" means people who run Workaora: admins and moderators.
-- This table is the ONLY place that decides who is staff (decision D-014).
-- It is never decided by anything a user can edit about themselves (D-036).

-- ---------------------------------------------------------------------------
-- 1. A private schema
-- ---------------------------------------------------------------------------
-- A schema is a folder inside the database. Supabase only lets the outside
-- world call things in the "public" schema. Helper functions that must not be
-- callable from a browser live in "private" instead.

create schema if not exists private;

revoke all on schema private from public, anon, authenticated, service_role;

-- Logged-in users and the server may *use* things here that we explicitly
-- allow below. Anonymous visitors get nothing.
grant usage on schema private to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- 2. The staff table
-- ---------------------------------------------------------------------------

create table public.staff (
  -- The person. If their account is deleted, their staff entry goes with it.
  user_id uuid primary key references auth.users (id) on delete cascade,

  role text not null
    constraint staff_role_valid check (role in ('admin', 'moderator')),

  granted_at timestamptz not null default now(),

  -- Who gave them the role. Kept even if that person's account is later removed.
  granted_by uuid references auth.users (id) on delete set null,

  -- Why. Required, so there is never an unexplained staff member.
  grant_reason text not null
    constraint staff_reason_present check (length(btrim(grant_reason)) >= 3)
);

comment on table public.staff is
  'Who is an admin or moderator. Changed only through public.set_staff_role or by the founder in the dashboard. Every change is written to audit_log.';

-- ---------------------------------------------------------------------------
-- 3. Lock the table down, then open only what is needed
-- ---------------------------------------------------------------------------

-- Row Level Security: the database checks every row against the rules below.
-- With RLS on and no rule that allows something, it is denied.
alter table public.staff enable row level security;

-- Start from zero permissions for everyone who connects from outside.
revoke all on table public.staff from public, anon, authenticated, service_role;

-- Reading only. Nobody outside the database can insert, update or delete
-- rows directly. (Which rows a logged-in user can read is decided by the
-- policy further down.)
grant select on table public.staff to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- 4. Helper functions: "is the current user staff?" / "…an admin?"
-- ---------------------------------------------------------------------------
-- "security definer" lets the function read the staff table even though the
-- person asking cannot. It answers only yes or no.
-- "set search_path = ''" forces every name inside to be written in full,
-- which blocks a known trick for hijacking such functions.

create function private.is_staff()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.staff s
    where s.user_id = (select auth.uid())
  );
$$;

create function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.staff s
    where s.user_id = (select auth.uid())
      and s.role = 'admin'
  );
$$;

revoke all on function private.is_staff() from public, anon, authenticated, service_role;
revoke all on function private.is_admin() from public, anon, authenticated, service_role;

-- Needed so the read rules (policies) can ask the question for a logged-in user.
grant execute on function private.is_staff() to authenticated, service_role;

-- ---------------------------------------------------------------------------
-- 5. The read rule
-- ---------------------------------------------------------------------------

create policy "Staff can see the staff list"
  on public.staff
  for select
  to authenticated
  using ((select private.is_staff()));
