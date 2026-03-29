/*
  # Update Newsletter Subscriptions RLS Policies

  1. Changes
    - Drop existing INSERT policy
    - Add new INSERT policy that works for both anon and public roles
    - Ensure anyone can subscribe to the newsletter

  2. Security
    - Maintains restrictive read access
    - Allows unrestricted INSERT for newsletter subscriptions
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON newsletter_subscriptions;

-- Create new policy that works for all users including anon and public
CREATE POLICY "Enable insert for all users"
  ON newsletter_subscriptions
  FOR INSERT
  WITH CHECK (true);
