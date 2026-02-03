/**
 * Admin Layout
 * 
 * Shared layout for all admin pages.
 * Provides consistent navigation and styling.
 * 
 * @created 2026-02-03 - Admin CRM layout
 */

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin CRM | SERPreme SEO',
  description: 'Lead management and CRM dashboard',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-secondary-50">
      {children}
    </div>
  )
}
