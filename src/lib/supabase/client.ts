/**
 * Supabase Browser Client
 * 
 * Use this client for client-side operations in React components.
 * This client uses the anon key and respects Row Level Security (RLS).
 * 
 * @created 2026-02-03 - Initial Supabase setup for lead CRM
 */

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
