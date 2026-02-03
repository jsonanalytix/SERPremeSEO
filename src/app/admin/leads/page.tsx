/**
 * Admin Leads Page
 * 
 * Full CRM dashboard for managing leads with filtering, sorting, 
 * pagination, and inline status updates.
 * 
 * @created 2026-02-03 - Placeholder for leads CRM dashboard
 * @updated 2026-02-03 - Implemented full CRM dashboard
 */

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminNav from '@/components/admin/AdminNav'
import LeadsDashboard from '@/components/admin/LeadsDashboard'

export default async function AdminLeadsPage() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()

  // Extra server-side check (middleware should handle this, but belt & suspenders)
  if (!user || error) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen">
      <AdminNav user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LeadsDashboard />
      </main>
    </div>
  )
}
