-- 모든 트리거를 먼저 삭제한 후 함수들을 안전하게 재생성
-- 의존성 순서: 트리거 → 함수 순으로 삭제

-- 모든 업데이트 트리거 삭제
drop trigger if exists update_profiles_updated_at on public.profiles;
drop trigger if exists update_scenarios_updated_at on public.scenarios;
drop trigger if exists update_sessions_updated_at on public.sessions;
drop trigger if exists update_user_progress_updated_at on public.user_progress;
drop trigger if exists on_auth_user_created on auth.users;

-- 이제 함수들을 안전하게 삭제
drop function if exists public.handle_new_user();
drop function if exists public.update_updated_at_column();

-- 보안이 강화된 함수들 재생성 (search_path = '' 추가)
create or replace function public.update_updated_at_column()
returns trigger 
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer 
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id, 
    new.email,
    new.raw_user_meta_data ->> 'name'
  );
  return new;
end;
$$;

-- 모든 트리거 재생성
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

create trigger update_scenarios_updated_at
  before update on public.scenarios
  for each row execute function public.update_updated_at_column();

create trigger update_sessions_updated_at
  before update on public.sessions
  for each row execute function public.update_updated_at_column();

create trigger update_user_progress_updated_at
  before update on public.user_progress
  for each row execute function public.update_updated_at_column();