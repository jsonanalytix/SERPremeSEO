/**
 * Admin Navigation Component
 * 
 * Provides consistent navigation header for all admin pages.
 * Includes user info and sign out functionality.
 * 
 * @created 2026-02-03 - Admin CRM navigation
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'

interface AdminNavProps {
  user: User
}

export default function AdminNav({ user }: AdminNavProps) {
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      })
      
      if (response.ok) {
        router.push('/admin/login')
        router.refresh()
      }
    } catch (error) {
      console.error('Sign out error:', error)
      setSigningOut(false)
    }
  }

  return (
    <nav className="bg-white border-b border-secondary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and nav links */}
          <div className="flex items-center">
            <Link 
              href="/admin/leads" 
              className="flex-shrink-0 flex items-center"
            >
              <span className="text-xl font-bold text-secondary-900">
                SERPreme<span className="text-primary-600">SEO</span>
              </span>
              <span className="ml-2 px-2 py-0.5 bg-secondary-100 text-secondary-600 text-xs font-medium rounded">
                Admin
              </span>
            </Link>
            
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              <Link
                href="/admin/leads"
                className="text-secondary-600 hover:text-secondary-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Leads
              </Link>
              {/* Future nav links can be added here */}
            </div>
          </div>

          {/* Right side - User info and sign out */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-secondary-600 hidden sm:block">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              disabled={signingOut}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-secondary-700 bg-secondary-100 hover:bg-secondary-200 rounded-lg transition-colors disabled:opacity-50"
            >
              {signingOut ? (
                <>
                  <svg 
                    className="animate-spin -ml-0.5 mr-1.5 h-3 w-3" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing out...
                </>
              ) : (
                <>
                  <svg 
                    className="w-4 h-4 mr-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                    />
                  </svg>
                  Sign out
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
