/**
 * Auth Callback Route
 * 
 * Handles OAuth callback and email confirmation redirects from Supabase.
 * Exchanges the auth code for a session and redirects to the appropriate page.
 * 
 * @created 2026-02-03 - Auth callback for Supabase authentication
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/admin/leads'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If there's an error or no code, redirect to login with error
  return NextResponse.redirect(`${origin}/admin/login?error=auth_failed`)
}
