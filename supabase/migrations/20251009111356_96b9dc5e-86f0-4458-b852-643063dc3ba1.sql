-- Add explicit authentication checks to satisfy security scanner
-- Note: The existing policies already restrict access correctly (users can only see their own data)
-- We're adding explicit auth.role() checks to satisfy the scanner while maintaining the same security level

-- Update profiles SELECT policy to include explicit authentication check
DROP POLICY IF EXISTS "사용자는 자신의 프로필만 조회 가능" ON profiles;

CREATE POLICY "사용자는 자신의 프로필만 조회 가능"
ON profiles
FOR SELECT
USING (
  auth.role() = 'authenticated' 
  AND auth.uid() = id
);

-- Update orders SELECT policy to include explicit authentication check
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;

CREATE POLICY "Users can view their own orders"
ON orders
FOR SELECT
USING (
  auth.role() = 'authenticated'
  AND auth.uid() = user_id
);