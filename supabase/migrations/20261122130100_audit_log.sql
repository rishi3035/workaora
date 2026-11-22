-- Migration 2 of 3: the audit log, and automatic logging of staff changes.
--
-- The audit log is a permanent diary of sensitive actions (decision D-035).
-- Rows can be added. They can never be edited or deleted, by anyone.

-- ---------------------------------------------------------------------------
-- 1. The table
-- ---------------------------------------------------------------------------

create table public.audit_log (
  id bigint generated always as identity primary key,
  occurred_at timestamptz not null default now(),

  -- Who did it. Empty when it was the system or the founder in the dashboard.
  -- Deliberately NOT linked to the accounts table: an audit entry must
  -- survive even if the account is later deleted.
  actor_id uuid,

  -- How the action arrived: 'authenticated' (a logged-in user),
  -- 'service_role' (our server), or 'direct' (dashboard or a migration).
  actor_kind text not null,

  -- What happened, as dotted words, e.g. 'staff.granted'.
  action text not null
    constraint audit_action_format
    check (action ~ '^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$'),

  -- What it happened to, e.g. target_type 'user' and that user's id.
  target_type text,
  target_id text,

  -- Extra details, such as the reason given.
  metadata jsonb not null default '{}'::jsonb
);

comment on table public.audit_log is
  'Append-only record of sensitive actions. Rows are added only by database functions. Updates, deletes and truncation are blocked for everyone.';

create index audit_log_occurred_at_idx
  on public.audit_log (occurred_at desc);

create index audit_log_target_idx
  on public.audit_log (target_type, target_id, occurred_at desc);

-- ---------------------------------------------------------------------------
-- 2. Lock it down: staff may read; nobody may write directly
-- ---------------------------------------------------------------------------

alter table public.audit_log enable row level security;

revoke all on table public.audit_log from public, anon, authenticated, service_role;

grant select on table public.audit_log to authenticated, service_role;

create policy "Staff can read the audit log"
  on public.audit_log
  for select
  to authenticated
  using ((select private.is_staff()));

-- ---------------------------------------------------------------------------
-- 3. Append-only, enforced by the database itself
-- ---------------------------------------------------------------------------
-- Even a role that somehow gained write permission is stopped here.

create function private.reject_audit_log_change()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  raise exception 'audit_log is append-only: % is not allowed', tg_op
    using errcode = 'insufficient_privilege';
end;
$$;

revoke all on function private.reject_audit_log_change()
  from public, anon, authenticated, service_role;

create trigger audit_log_block_update_delete
  before update or delete on public.audit_log
  for each row
  execute function private.reject_audit_log_change();

create trigger audit_log_block_truncate
  before truncate on public.audit_log
  for each statement
  execute function private.reject_audit_log_change();

-- ---------------------------------------------------------------------------
-- 4. The one way to add an entry (internal)
-- ---------------------------------------------------------------------------
-- Other database functions call this. Nothing outside the database can.

create function private.write_audit(
  p_action text,
  p_target_type text,
  p_target_id text,
  p_metadata jsonb default '{}'::jsonb,
  p_actor_id uuid default null
)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id bigint;
begin
  insert into public.audit_log (actor_id, actor_kind, action, target_type, target_id, metadata)
  values (
    -- Prefer an actor named by our server, then the logged-in user,
    -- then one noted earlier in the same transaction (see set_staff_role).
    coalesce(
      p_actor_id,
      auth.uid(),
      nullif(current_setting('workaora.acting_user', true), '')::uuid
    ),
    coalesce(nullif(auth.role(), ''), 'direct'),
    p_action,
    p_target_type,
    p_target_id,
    coalesce(p_metadata, '{}'::jsonb)
  )
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function private.write_audit(text, text, text, jsonb, uuid)
  from public, anon, authenticated, service_role;

-- ---------------------------------------------------------------------------
-- 5. A way for OUR SERVER to add an entry
-- ---------------------------------------------------------------------------
-- Callable only with the secret key (the service_role). Logged-in users and
-- visitors cannot call it, so nobody can write fake entries.

create function public.record_audit_event(
  p_actor_id uuid,
  p_action text,
  p_target_type text default null,
  p_target_id text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns bigint
language sql
security definer
set search_path = ''
as $$
  select private.write_audit(p_action, p_target_type, p_target_id, p_metadata, p_actor_id);
$$;

revoke all on function public.record_audit_event(uuid, text, text, text, jsonb)
  from public, anon, authenticated, service_role;

grant execute on function public.record_audit_event(uuid, text, text, text, jsonb)
  to service_role;

-- ---------------------------------------------------------------------------
-- 6. Every change to the staff table is logged automatically
-- ---------------------------------------------------------------------------
-- This fires no matter how the change is made, including by hand in the
-- Supabase dashboard.

create function private.audit_staff_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  -- A reason noted earlier in the same transaction, if any (used for removals).
  v_reason text := nullif(current_setting('workaora.audit_reason', true), '');
begin
  if tg_op = 'INSERT' then
    perform private.write_audit(
      'staff.granted', 'user', new.user_id::text,
      jsonb_build_object('role', new.role, 'reason', new.grant_reason, 'granted_by', new.granted_by)
    );
    return new;

  elsif tg_op = 'UPDATE' then
    if new.user_id <> old.user_id then
      raise exception 'A staff entry cannot be moved to a different person'
        using errcode = 'check_violation';
    end if;
    perform private.write_audit(
      'staff.changed', 'user', new.user_id::text,
      jsonb_build_object('old_role', old.role, 'new_role', new.role, 'reason', new.grant_reason, 'granted_by', new.granted_by)
    );
    return new;

  else
    perform private.write_audit(
      'staff.revoked', 'user', old.user_id::text,
      jsonb_build_object('role', old.role, 'reason', v_reason)
    );
    return old;
  end if;
end;
$$;

revoke all on function private.audit_staff_change()
  from public, anon, authenticated, service_role;

create trigger staff_audit
  after insert or update or delete on public.staff
  for each row
  execute function private.audit_staff_change();

-- ---------------------------------------------------------------------------
-- 7. Granting or removing a staff role (our server only)
-- ---------------------------------------------------------------------------
-- p_role: 'admin', 'moderator', or NULL to remove the person from staff.
-- p_reason: required.
-- p_acting_user_id: the admin our server has confirmed is making the change.
--
-- Callable only with the secret key. The server code that calls it must
-- first check that the person asking is an admin.

create function public.set_staff_role(
  p_user_id uuid,
  p_role text,
  p_reason text,
  p_acting_user_id uuid default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_user_id is null then
    raise exception 'A user is required' using errcode = 'check_violation';
  end if;

  if p_reason is null or length(btrim(p_reason)) < 3 then
    raise exception 'A reason is required' using errcode = 'check_violation';
  end if;

  -- Note the actor and reason for the audit entries written by the trigger.
  -- "true" means these notes vanish when this transaction ends.
  perform set_config('workaora.acting_user', coalesce(p_acting_user_id::text, ''), true);
  perform set_config('workaora.audit_reason', btrim(p_reason), true);

  if p_role is null then
    delete from public.staff where user_id = p_user_id;
  else
    insert into public.staff (user_id, role, granted_by, grant_reason)
    values (p_user_id, p_role, p_acting_user_id, btrim(p_reason))
    on conflict (user_id) do update
      set role = excluded.role,
          granted_by = excluded.granted_by,
          grant_reason = excluded.grant_reason,
          granted_at = now();
  end if;
end;
$$;

revoke all on function public.set_staff_role(uuid, text, text, uuid)
  from public, anon, authenticated, service_role;

grant execute on function public.set_staff_role(uuid, text, text, uuid)
  to service_role;
