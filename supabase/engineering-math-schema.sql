-- Engineering Mathematics Lab Supabase schema backup
-- Captured from the live Supabase project during the Hatchable -> GitHub Pages migration.
-- Schema only: no profile/user data is stored in this repository.

create table if not exists public.engineering_math_profiles (
  username text primary key,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  revision bigint not null default 0,
  constraint engineering_math_profiles_username_format
    check (username ~ '^[a-z0-9_]{2,32}$'::text)
);

create index if not exists engineering_math_profiles_updated_at_idx
  on public.engineering_math_profiles using btree (updated_at desc);

alter table public.engineering_math_profiles enable row level security;

grant select, insert, update on table public.engineering_math_profiles to anon;
grant select, insert, update on table public.engineering_math_profiles to authenticated;
grant all privileges on table public.engineering_math_profiles to service_role;

create or replace function public.touch_engineering_math_profile_updated_at()
returns trigger
language plpgsql
set search_path to 'public'
as $function$
begin
  new.updated_at = now();
  return new;
end;
$function$;

drop trigger if exists engineering_math_profiles_touch_updated_at on public.engineering_math_profiles;
create trigger engineering_math_profiles_touch_updated_at
before update on public.engineering_math_profiles
for each row
execute function public.touch_engineering_math_profile_updated_at();

create or replace function public.load_engineering_math_profile_v4(p_username text)
returns table(
  username text,
  state jsonb,
  revision bigint,
  updated_at timestamp with time zone,
  created_at timestamp with time zone,
  created boolean
)
language plpgsql
set search_path to 'public'
as $function$
declare
  v_username text;
  v_created boolean := false;
begin
  v_username := lower(trim(p_username));
  if v_username !~ '^[a-z0-9_]{2,32}$' then
    raise exception 'invalid_username';
  end if;

  perform set_config('app.engineering_math_profile_username', v_username, true);

  if not exists (
    select 1 from public.engineering_math_profiles p where p.username = v_username
  ) then
    insert into public.engineering_math_profiles(username, state, revision)
    values (v_username, '{}'::jsonb, 0)
    on conflict on constraint engineering_math_profiles_pkey do nothing;
    v_created := true;
  end if;

  return query
  select p.username, p.state, p.revision, p.updated_at, p.created_at, v_created
  from public.engineering_math_profiles p
  where p.username = v_username;
end;
$function$;

create or replace function public.save_engineering_math_profile_v4(
  p_username text,
  p_state jsonb,
  p_expected_revision bigint
)
returns table(
  saved boolean,
  revision bigint,
  state jsonb,
  updated_at timestamp with time zone
)
language plpgsql
set search_path to 'public'
as $function$
declare
  v_username text;
  v_row public.engineering_math_profiles%rowtype;
begin
  v_username := lower(trim(p_username));

  if v_username !~ '^[a-z0-9_]{2,32}$' then
    raise exception 'invalid_username';
  end if;
  if p_state is null or jsonb_typeof(p_state) <> 'object' then
    raise exception 'invalid_state';
  end if;
  if octet_length(p_state::text) > 5000000 then
    raise exception 'state_too_large';
  end if;
  if p_expected_revision is null or p_expected_revision < 0 then
    raise exception 'invalid_revision';
  end if;

  perform set_config('app.engineering_math_profile_username', v_username, true);

  select p.* into v_row
  from public.engineering_math_profiles p
  where p.username = v_username;

  if not found then
    insert into public.engineering_math_profiles(username, state, revision)
    values (v_username, '{}'::jsonb, 0)
    returning * into v_row;
  end if;

  if v_row.revision <> p_expected_revision then
    return query select false, v_row.revision, v_row.state, v_row.updated_at;
    return;
  end if;

  if (v_row.state - '_savedAt') = (p_state - '_savedAt') then
    return query select true, v_row.revision, v_row.state, v_row.updated_at;
    return;
  end if;

  update public.engineering_math_profiles p
     set state = p_state,
         revision = p.revision + 1,
         updated_at = now()
   where p.username = v_username
     and p.revision = p_expected_revision
  returning p.* into v_row;

  if found then
    return query select true, v_row.revision, v_row.state, v_row.updated_at;
    return;
  end if;

  select p.* into v_row
  from public.engineering_math_profiles p
  where p.username = v_username;

  return query select false, v_row.revision, v_row.state, v_row.updated_at;
end;
$function$;

revoke all on function public.load_engineering_math_profile_v4(text) from public;
revoke all on function public.save_engineering_math_profile_v4(text,jsonb,bigint) from public;

grant execute on function public.load_engineering_math_profile_v4(text) to anon, authenticated, service_role;
grant execute on function public.save_engineering_math_profile_v4(text,jsonb,bigint) to anon, authenticated, service_role;

drop policy if exists engineering_math_profiles_insert_own_username on public.engineering_math_profiles;
create policy engineering_math_profiles_insert_own_username
on public.engineering_math_profiles
as permissive
for insert
to anon, authenticated
with check (
  username = current_setting('app.engineering_math_profile_username'::text, true)
);

drop policy if exists engineering_math_profiles_select_own_username on public.engineering_math_profiles;
create policy engineering_math_profiles_select_own_username
on public.engineering_math_profiles
as permissive
for select
to anon, authenticated
using (
  username = current_setting('app.engineering_math_profile_username'::text, true)
);

drop policy if exists engineering_math_profiles_update_own_username on public.engineering_math_profiles;
create policy engineering_math_profiles_update_own_username
on public.engineering_math_profiles
as permissive
for update
to anon, authenticated
using (
  username = current_setting('app.engineering_math_profile_username'::text, true)
)
with check (
  username = current_setting('app.engineering_math_profile_username'::text, true)
);
