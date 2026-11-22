-- Migration 3 of 3: app settings (server-side switches).
--
-- These are on/off switches and similar values that control how the product
-- behaves. They are NOT secret: anyone may read them. Secrets never go here.
--
-- The first switch keeps sign-up for 16–17-year-olds turned OFF (decision D-022).

-- ---------------------------------------------------------------------------
-- 1. The table
-- ---------------------------------------------------------------------------

create table public.app_settings (
  key text primary key
    constraint app_settings_key_format check (key ~ '^[a-z][a-z0-9_]{2,62}$'),

  value jsonb not null,

  -- Plain-language explanation of what the switch does.
  description text not null
    constraint app_settings_description_present check (length(btrim(description)) >= 10),

  updated_at timestamptz not null default now(),
  updated_by uuid,

  -- Any switch whose name ends in "_enabled" must be exactly true or false.
  constraint app_settings_enabled_is_boolean
    check (key !~ '_enabled$' or jsonb_typeof(value) = 'boolean')
);

comment on table public.app_settings is
  'Public, non-secret product switches. Readable by everyone. Changed only by an admin through public.set_app_setting, which records the change in audit_log.';

-- ---------------------------------------------------------------------------
-- 2. Everyone may read; nobody may write directly
-- ---------------------------------------------------------------------------

alter table public.app_settings enable row level security;

revoke all on table public.app_settings from public, anon, authenticated, service_role;

grant select on table public.app_settings to anon, authenticated, service_role;

create policy "Anyone can read app settings"
  on public.app_settings
  for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- 3. The first switch: sign-up for 16–17-year-olds is OFF
-- ---------------------------------------------------------------------------

insert into public.app_settings (key, value, description)
values (
  'minors_signup_enabled',
  'false'::jsonb,
  'Whether people aged 16 or 17 can sign up. Must stay false until all three conditions in decision D-022 are met: a lawyer has signed off, the guardian consent flow is built and tested, and a security review has covered minors'' data.'
);

-- ---------------------------------------------------------------------------
-- 4. The only way to change a setting
-- ---------------------------------------------------------------------------
-- Rules enforced here, inside the database:
--   * the caller must be a logged-in admin (not a moderator, not the server);
--   * a real reason is required;
--   * the setting must already exist (new switches are added by migrations);
--   * the old value, new value and reason are written to the audit log.

create function public.set_app_setting(
  p_key text,
  p_value jsonb,
  p_reason text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_old jsonb;
begin
  if not private.is_admin() then
    raise exception 'Only an admin can change app settings'
      using errcode = 'insufficient_privilege';
  end if;

  if p_reason is null or length(btrim(p_reason)) < 10 then
    raise exception 'A reason of at least 10 characters is required'
      using errcode = 'check_violation';
  end if;

  if p_value is null then
    raise exception 'A value is required' using errcode = 'check_violation';
  end if;

  select s.value into v_old
  from public.app_settings s
  where s.key = p_key
  for update;

  if not found then
    raise exception 'Unknown setting: %', p_key using errcode = 'no_data_found';
  end if;

  update public.app_settings
  set value = p_value,
      updated_at = now(),
      updated_by = auth.uid()
  where key = p_key;

  perform private.write_audit(
    'app_setting.changed', 'app_setting', p_key,
    jsonb_build_object('old_value', v_old, 'new_value', p_value, 'reason', btrim(p_reason))
  );
end;
$$;

revoke all on function public.set_app_setting(text, jsonb, text)
  from public, anon, authenticated, service_role;

grant execute on function public.set_app_setting(text, jsonb, text) to authenticated;
