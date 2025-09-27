-- ProTalk Database Schema
-- 실무자를 위한 AI 영어 회화 코치 서비스

-- 1️⃣ Users 테이블 (profiles 형태로 auth.users와 연동)
create table public.profiles (
  id uuid not null references auth.users(id) on delete cascade,
  email text unique not null,
  name text,
  role text check (role in ('BD','PM/PO','마케터','기타')),
  english_level int check (english_level between 1 and 5),
  social_login_provider text check (social_login_provider in ('Google','LinkedIn','Naver','Kakao')),
  subscription_status text check (subscription_status in ('free','premium','trial')) default 'free',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  last_login_at timestamptz,
  
  primary key (id)
);

-- 2️⃣ Scenarios 테이블
create table public.scenarios (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  role_target text check (role_target in ('BD','PM/PO','마케터','기타','전체')),
  english_level_min int check (english_level_min between 1 and 5),
  english_level_max int check (english_level_max between 1 and 5),
  prompt text not null,
  tags text[], -- PostgreSQL array type (예: '{협상,KPI보고}')
  difficulty_level text check (difficulty_level in ('초급','중급','고급')) default '중급',
  estimated_duration int default 20, -- 분 단위
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3️⃣ Sessions 테이블  
create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  scenario_id uuid references public.scenarios(id) on delete set null,
  start_time timestamptz default now(),
  end_time timestamptz,
  duration_minutes int,
  transcript jsonb, -- 대화 로그를 JSON 형태로 저장
  status text check (status in ('진행중','완료','중단')) default '진행중',
  cards_generated boolean default false,
  feedback text check (feedback in ('👍','👎')),
  feedback_comment text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4️⃣ Cards 테이블 (학습 카드)
create table public.cards (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  original_utterance text not null,
  rephrased_expression text not null,
  tip text,
  example_usage text,
  context text, -- 어떤 상황에서 사용하는지
  category text check (category in ('설득','협상','보고','질문','반론','동의','기타')) default '기타',
  is_bookmarked boolean default false,
  created_at timestamptz default now()
);

-- 5️⃣ User_Progress 테이블 (사용자 진행 상황 추적)
create table public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  total_sessions int default 0,
  total_duration_minutes int default 0,
  total_cards_generated int default 0,
  favorite_scenario_ids uuid[],
  weak_expression_categories text[],
  last_session_date timestamptz,
  streak_days int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  
  unique(user_id)
);

-- RLS 정책 활성화
alter table public.profiles enable row level security;
alter table public.scenarios enable row level security;
alter table public.sessions enable row level security;
alter table public.cards enable row level security;
alter table public.user_progress enable row level security;

-- Profiles 정책
create policy "사용자는 자신의 프로필만 조회 가능" 
on public.profiles for select 
using (auth.uid() = id);

create policy "사용자는 자신의 프로필만 수정 가능" 
on public.profiles for update 
using (auth.uid() = id);

create policy "사용자는 자신의 프로필만 생성 가능" 
on public.profiles for insert 
with check (auth.uid() = id);

-- Scenarios 정책 (모든 인증된 사용자가 조회 가능)
create policy "인증된 사용자는 활성 시나리오 조회 가능" 
on public.scenarios for select 
to authenticated 
using (is_active = true);

-- Sessions 정책
create policy "사용자는 자신의 세션만 관리 가능" 
on public.sessions for all 
using (auth.uid() = user_id);

-- Cards 정책  
create policy "사용자는 자신의 세션 카드만 관리 가능"
on public.cards for all
using (
  session_id in (
    select id from public.sessions where user_id = auth.uid()
  )
);

-- User_Progress 정책
create policy "사용자는 자신의 진행상황만 관리 가능"
on public.user_progress for all
using (auth.uid() = user_id);

-- 인덱스 최적화
create index idx_sessions_user_id on public.sessions(user_id);
create index idx_sessions_scenario_id on public.sessions(scenario_id);
create index idx_sessions_created_at on public.sessions(created_at desc);
create index idx_cards_session_id on public.cards(session_id);
create index idx_cards_category on public.cards(category);
create index idx_scenarios_role_target on public.scenarios(role_target);
create index idx_scenarios_difficulty on public.scenarios(difficulty_level);

-- 업데이트 타임스탬프 자동 갱신 함수
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 업데이트 트리거 생성
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

-- 프로필 자동 생성 함수 (auth.users 생성 시)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
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

-- 사용자 생성 시 프로필 자동 생성 트리거
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();