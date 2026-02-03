/**
 * Admin Root Page
 * 
 * Redirects to the leads dashboard.
 * 
 * @created 2026-02-03 - Admin root redirect
 */

import { redirect } from 'next/navigation'

export default function AdminPage() {
  redirect('/admin/leads')
}
