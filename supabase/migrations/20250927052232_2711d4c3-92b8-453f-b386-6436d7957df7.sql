-- Fix security issue: Add explicit authentication checks to profiles table RLS policies
-- This prevents unauthenticated users from potentially accessing user email addresses and personal data

-- Drop existing policies
DROP POLICY IF EXISTS "사용자는 자신의 프로필만 조회 가능" ON public.profiles;
DROP POLICY IF EXISTS "사용자는 자신의 프로필만 생성 가능" ON public.profiles;
DROP POLICY IF EXISTS "사용자는 자신의 프로필만 수정 가능" ON public.profiles;

-- Create new secure policies with explicit authentication checks
CREATE POLICY "사용자는 자신의 프로필만 조회 가능" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "사용자는 자신의 프로필만 생성 가능" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "사용자는 자신의 프로필만 수정 가능" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);