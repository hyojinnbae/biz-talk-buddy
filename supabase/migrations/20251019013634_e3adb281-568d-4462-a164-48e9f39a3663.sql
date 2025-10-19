-- Add missing RLS policies for orders table to prevent unauthorized manipulation

-- Prevent direct inserts by authenticated users (only edge functions via service role can insert)
CREATE POLICY "Prevent direct order inserts"
ON public.orders
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Prevent updates by authenticated users (only edge functions via service role can update)
CREATE POLICY "Prevent direct order updates"
ON public.orders
FOR UPDATE
TO authenticated
USING (false);

-- Prevent all deletions (orders should never be deleted for audit trail)
CREATE POLICY "Prevent order deletions"
ON public.orders
FOR DELETE
TO authenticated
USING (false);