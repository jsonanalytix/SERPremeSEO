/**
 * Next.js Middleware for Auth Protection
 * 
 * Protects /admin/* routes by requiring authentication.
 * Redirects unauthenticated users to /admin/login.
 * Refreshes session tokens on each request.
 * 
 * @created 2026-02-03 - Auth middleware for admin CRM
 * @updated 2026-02-03 - Limited matcher to /admin routes only
 */

import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/server'

// Routes that should redirect to /admin/leads if already authenticated
const authRoutes = ['/admin/login']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware if Supabase is not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase environment variables not configured')
    return NextResponse.next()
  }

  const { supabase, response } = createMiddlewareClient(request)

  // Refresh session and get user
  const { data: { user }, error } = await supabase.auth.getUser()

  // Check if the route is an auth route (login page)
  const isAuthRoute = authRoutes.includes(pathname)
  
  // Check if the route is a protected admin route (but not the login page)
  const isProtectedRoute = pathname.startsWith('/admin') && !isAuthRoute

  // Redirect unauthenticated users to login
  if (isProtectedRoute && (!user || error)) {
    const loginUrl = new URL('/admin/login', request.url)
    // Preserve the original URL to redirect back after login
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from login page
  if (isAuthRoute && user && !error) {
    return NextResponse.redirect(new URL('/admin/leads', request.url))
  }

  return response
}

export const config = {
  // Only run middleware on /admin routes
  matcher: ['/admin/:path*'],
}
