/**
 * Lead Table Component
 * 
 * Displays leads in a sortable, paginated table with inline status updates.
 * 
 * @created 2026-02-03 - Lead CRM table implementation
 */

'use client'

import { useState } from 'react'
import type { Lead, LeadStatus } from '@/lib/supabase/types'
import StatusBadge from './StatusBadge'

interface LeadTableProps {
  leads: Lead[]
  onStatusUpdate: (leadId: string, status: LeadStatus) => Promise<void>
  onLeadClick: (lead: Lead) => void
  sortBy: string
  sortOrder: 'asc' | 'desc'
  onSort: (field: string) => void
  loading?: boolean
}

const statusOptions: LeadStatus[] = ['new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost']

export default function LeadTable({ 
  leads, 
  onStatusUpdate, 
  onLeadClick,
  sortBy,
  sortOrder,
  onSort,
  loading 
}: LeadTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setUpdatingId(leadId)
    try {
      await onStatusUpdate(leadId, newStatus)
    } finally {
      setUpdatingId(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  }

  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) {
      return (
        <svg className="w-4 h-4 text-secondary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      )
    }
    return sortOrder === 'asc' ? (
      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )
  }

  const SortableHeader = ({ field, label }: { field: string; label: string }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider cursor-pointer hover:bg-secondary-100 transition-colors"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        <SortIcon field={field} />
      </div>
    </th>
  )

  if (loading && leads.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
        <div className="p-8 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-secondary-600">Loading leads...</p>
        </div>
      </div>
    )
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
        <div className="p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-secondary-900">No leads found</h3>
          <p className="mt-1 text-sm text-secondary-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-secondary-200">
          <thead className="bg-secondary-50">
            <tr>
              <SortableHeader field="created_at" label="Date" />
              <SortableHeader field="name" label="Name" />
              <SortableHeader field="practice_name" label="Practice" />
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Contact
              </th>
              <SortableHeader field="utm_source" label="Source" />
              <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-secondary-200">
            {leads.map((lead) => (
              <tr 
                key={lead.id} 
                className={`hover:bg-secondary-50 transition-colors ${loading ? 'opacity-50' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                  {formatDate(lead.created_at)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onLeadClick(lead)}
                    className="text-sm font-medium text-secondary-900 hover:text-primary-600 transition-colors text-left"
                  >
                    {lead.name}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                  {lead.practice_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex flex-col gap-0.5">
                    <a 
                      href={`mailto:${lead.email}`} 
                      className="text-primary-600 hover:text-primary-700 hover:underline"
                    >
                      {lead.email}
                    </a>
                    <a 
                      href={`tel:${lead.phone}`}
                      className="text-secondary-500 hover:text-secondary-700"
                    >
                      {lead.phone}
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                  {lead.utm_source || (
                    <span className="text-secondary-400 italic">Direct</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {updatingId === lead.id ? (
                    <div className="flex items-center">
                      <div className="animate-spin h-4 w-4 border-2 border-primary-600 border-t-transparent rounded-full" />
                    </div>
                  ) : (
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                      className="text-sm border-0 bg-transparent cursor-pointer focus:ring-2 focus:ring-primary-500 rounded pr-8"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status === 'new' ? 'New' :
                           status === 'contacted' ? 'Contacted' :
                           status === 'qualified' ? 'Qualified' :
                           status === 'proposal_sent' ? 'Proposal Sent' :
                           status === 'won' ? 'Won' : 'Lost'}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onLeadClick(lead)}
                    className="text-primary-600 hover:text-primary-900 transition-colors"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Loading overlay */}
      {loading && leads.length > 0 && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  )
}
