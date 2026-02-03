/**
 * Status Badge Component
 * 
 * Displays lead status with appropriate color coding.
 * Colors indicate stage in the sales pipeline.
 * 
 * @created 2026-02-03 - Lead CRM status badge
 */

import type { LeadStatus } from '@/lib/supabase/types'

interface StatusBadgeProps {
  status: LeadStatus
  size?: 'sm' | 'md'
}

const statusConfig: Record<LeadStatus, { label: string; bg: string; text: string }> = {
  new: { label: 'New', bg: 'bg-blue-100', text: 'text-blue-800' },
  contacted: { label: 'Contacted', bg: 'bg-yellow-100', text: 'text-yellow-800' },
  qualified: { label: 'Qualified', bg: 'bg-purple-100', text: 'text-purple-800' },
  proposal_sent: { label: 'Proposal Sent', bg: 'bg-orange-100', text: 'text-orange-800' },
  won: { label: 'Won', bg: 'bg-green-100', text: 'text-green-800' },
  lost: { label: 'Lost', bg: 'bg-red-100', text: 'text-red-800' },
}

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.new
  
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs' 
    : 'px-2.5 py-1 text-sm'

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${config.bg} ${config.text} ${sizeClasses}`}
    >
      {config.label}
    </span>
  )
}

export { statusConfig }
