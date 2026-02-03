/**
 * Next.js Middleware for Auth Protection
 * 
 * Protects /admin/* routes by requiring authentication.
 * Redirects unauthenticated users to /admin/login.
 * Refreshes session tokens on each request.
 * 
 * @created 2026-02-03 - Auth middleware for admin CRM
 */

import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/server'

// Routes that require authentication
const protectedRoutes = ['/admin']
// Routes that should redirect to /admin/leads if already authenticated
const authRoutes = ['/admin/login']

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request)
  const { pathname } = request.nextUrl

  // Refresh session and get user
  const { data: { user }, error } = await supabase.auth.getUser()

  // Check if the route is a protected admin route (but not the login page)
  const isProtectedRoute = protectedRoutes.some(
    route => pathname.startsWith(route) && !authRoutes.includes(pathname)
  )
  
  // Check if the route is an auth route (login page)
  const isAuthRoute = authRoutes.includes(pathname)

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
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     * - api routes (handled separately)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
