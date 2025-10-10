-- Add policy to deny anonymous users from accessing profiles table
-- This prevents email harvesting by unauthenticated users
CREATE POLICY "익명 사용자 접근 차단"
ON public.profiles
FOR SELECT
TO anon
USING (false);