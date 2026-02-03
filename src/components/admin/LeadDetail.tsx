/**
 * Lead Detail Modal Component
 * 
 * Displays full lead information in a modal with editable fields.
 * Shows all form fields, attribution data, and session info.
 * 
 * @created 2026-02-03 - Lead CRM detail modal implementation
 * @updated 2026-02-03 - Fixed input focus loss by moving Section/Field components outside main function
 */

'use client'

import { useState, useEffect } from 'react'
import type { Lead, LeadStatus, StatusHistoryEntry } from '@/lib/supabase/types'
import StatusBadge from './StatusBadge'

interface LeadDetailProps {
  lead: Lead | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (leadId: string, updates: Partial<Lead>) => Promise<void>
}

const statusOptions: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
]

// Section component - defined outside main function to prevent re-creation on every render
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="border-b border-secondary-200 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
    <h4 className="text-sm font-semibold text-secondary-700 uppercase tracking-wide mb-3">{title}</h4>
    {children}
  </div>
)

// Status label mapping
const statusLabels: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  proposal_sent: 'Proposal Sent',
  won: 'Won',
  lost: 'Lost',
}

// Status color mapping for timeline
const statusColors: Record<LeadStatus, { bg: string; border: string; text: string }> = {
  new: { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-700' },
  contacted: { bg: 'bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-700' },
  qualified: { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-700' },
  proposal_sent: { bg: 'bg-orange-100', border: 'border-orange-400', text: 'text-orange-700' },
  won: { bg: 'bg-green-100', border: 'border-green-400', text: 'text-green-700' },
  lost: { bg: 'bg-red-100', border: 'border-red-400', text: 'text-red-700' },
}

// Timeline component for status history
const StatusTimeline = ({ 
  history, 
  createdAt 
}: { 
  history: StatusHistoryEntry[] | null
  createdAt: string 
}) => {
  // Format date for timeline
  const formatTimelineDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(dateString))
  }

  // Build full timeline including creation
  const timelineEntries: { status: LeadStatus; date: string; changedBy?: string; isCreation?: boolean }[] = [
    { status: 'new', date: createdAt, isCreation: true },
    ...(history || []).map(entry => ({
      status: entry.status,
      date: entry.changed_at,
      changedBy: entry.changed_by,
    }))
  ]

  if (timelineEntries.length <= 1) {
    return (
      <p className="text-sm text-secondary-400 italic">No status changes yet</p>
    )
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-secondary-200" />
      
      <div className="space-y-4">
        {timelineEntries.map((entry, index) => {
          const colors = statusColors[entry.status]
          const isLatest = index === timelineEntries.length - 1
          
          return (
            <div key={index} className="relative flex items-start gap-4">
              {/* Timeline dot */}
              <div className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center ${colors.bg} ${colors.border} ${isLatest ? 'ring-2 ring-offset-2 ring-primary-300' : ''}`}>
                {entry.isCreation ? (
                  <svg className={`w-3 h-3 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                ) : (
                  <svg className={`w-3 h-3 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0 pb-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
                    {statusLabels[entry.status]}
                  </span>
                  {isLatest && (
                    <span className="text-xs text-primary-600 font-medium">Current</span>
                  )}
                </div>
                <p className="mt-1 text-xs text-secondary-500">
                  {entry.isCreation ? 'Lead created' : 'Status changed'} on {formatTimelineDate(entry.date)}
                  {entry.changedBy && (
                    <span className="text-secondary-400"> by {entry.changedBy}</span>
                  )}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Field component - defined outside main function to prevent re-creation on every render
const Field = ({ label, value, isLink, linkType }: { label: string; value: string | null | undefined; isLink?: boolean; linkType?: 'email' | 'phone' | 'url' }) => (
  <div className="py-1">
    <dt className="text-xs text-secondary-500">{label}</dt>
    <dd className="text-sm text-secondary-900">
      {value ? (
        isLink && linkType ? (
          <a 
            href={
              linkType === 'email' ? `mailto:${value}` :
              linkType === 'phone' ? `tel:${value}` :
              value
            }
            target={linkType === 'url' ? '_blank' : undefined}
            rel={linkType === 'url' ? 'noopener noreferrer' : undefined}
            className="text-primary-600 hover:text-primary-700 hover:underline"
          >
            {value}
          </a>
        ) : value
      ) : (
        <span className="text-secondary-400 italic">Not provided</span>
      )}
    </dd>
  </div>
)

export default function LeadDetail({ lead, isOpen, onClose, onUpdate }: LeadDetailProps) {
  const [status, setStatus] = useState<LeadStatus>('new')
  const [notes, setNotes] = useState('')
  const [conversionValue, setConversionValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Reset form when lead changes
  useEffect(() => {
    if (lead) {
      setStatus(lead.status)
      setNotes(lead.notes || '')
      setConversionValue(lead.conversion_value?.toString() || '')
      setHasChanges(false)
      setSyncMessage(null)
    }
  }, [lead])

  // Handle manual sync to Google Ads
  const handleSyncToGoogleAds = async () => {
    if (!lead?.gclid) return

    setSyncing(true)
    setSyncMessage(null)

    try {
      const response = await fetch('/api/admin/conversions/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: lead.id, force: lead.gads_conversion_sent }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSyncMessage({ type: 'success', text: 'Conversion synced to Google Ads' })
        // Refresh lead data
        await onUpdate(lead.id, {})
      } else {
        setSyncMessage({ 
          type: 'error', 
          text: data.error || data.message || 'Failed to sync conversion' 
        })
      }
    } catch (error) {
      setSyncMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'An error occurred' 
      })
    } finally {
      setSyncing(false)
    }
  }

  // Track changes
  useEffect(() => {
    if (!lead) return
    const changed = 
      status !== lead.status ||
      notes !== (lead.notes || '') ||
      conversionValue !== (lead.conversion_value?.toString() || '')
    setHasChanges(changed)
  }, [lead, status, notes, conversionValue])

  if (!isOpen || !lead) return null

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(dateString))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await onUpdate(lead.id, {
        status,
        notes: notes || null,
        conversion_value: conversionValue ? parseFloat(conversionValue) : null,
      })
      setHasChanges(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          {/* Header */}
          <div className="bg-secondary-50 px-6 py-4 border-b border-secondary-200">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-secondary-900">
                  {lead.name}
                </h3>
                <p className="text-sm text-secondary-600">{lead.practice_name}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={lead.status} size="md" />
                <button
                  onClick={onClose}
                  className="text-secondary-400 hover:text-secondary-600 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="mt-1 text-xs text-secondary-500">
              Submitted {formatDate(lead.created_at)}
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            {/* Contact Information */}
            <Section title="Contact Information">
              <dl className="grid grid-cols-2 gap-x-4">
                <Field label="Email" value={lead.email} isLink linkType="email" />
                <Field label="Phone" value={lead.phone} isLink linkType="phone" />
                <Field label="Website" value={lead.website} isLink linkType="url" />
                <Field label="Project Type" value={lead.project_type} />
              </dl>
            </Section>

            {/* Lead Management */}
            <Section title="Lead Management">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-xs text-secondary-500 mb-1">Status</label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as LeadStatus)}
                    className="block w-full px-3 py-2 border border-secondary-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="conversionValue" className="block text-xs text-secondary-500 mb-1">Conversion Value ($)</label>
                  <input
                    type="number"
                    id="conversionValue"
                    value={conversionValue}
                    onChange={(e) => setConversionValue(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="block w-full px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label htmlFor="notes" className="block text-xs text-secondary-500 mb-1">Notes</label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add notes about this lead..."
                  className="block w-full px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                />
              </div>
              {lead.converted_at && (
                <p className="mt-2 text-xs text-secondary-500">
                  Converted on {formatDate(lead.converted_at)}
                </p>
              )}
            </Section>

            {/* Status Timeline */}
            <Section title="Status History">
              <StatusTimeline 
                history={lead.status_history} 
                createdAt={lead.created_at} 
              />
            </Section>

            {/* Attribution */}
            <Section title="Attribution (UTM Parameters)">
              <dl className="grid grid-cols-2 gap-x-4">
                <Field label="Source" value={lead.utm_source} />
                <Field label="Medium" value={lead.utm_medium} />
                <Field label="Campaign" value={lead.utm_campaign} />
                <Field label="Term" value={lead.utm_term} />
                <Field label="Content" value={lead.utm_content} />
              </dl>
            </Section>

            {/* Click IDs & Google Ads Sync */}
            {(lead.gclid || lead.fbclid || lead.msclkid || lead.ttclid || lead.li_fat_id) && (
              <Section title="Click IDs & Conversion Tracking">
                <dl className="grid grid-cols-2 gap-x-4">
                  {lead.gclid && <Field label="Google Click ID (gclid)" value={lead.gclid} />}
                  {lead.fbclid && <Field label="Facebook Click ID (fbclid)" value={lead.fbclid} />}
                  {lead.msclkid && <Field label="Microsoft Click ID (msclkid)" value={lead.msclkid} />}
                  {lead.ttclid && <Field label="TikTok Click ID (ttclid)" value={lead.ttclid} />}
                  {lead.li_fat_id && <Field label="LinkedIn Click ID" value={lead.li_fat_id} />}
                </dl>
                
                {/* Google Ads Sync Status & Action */}
                {lead.gclid && (
                  <div className="mt-3 pt-3 border-t border-secondary-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-secondary-700">Google Ads Sync</p>
                        {lead.gads_conversion_sent ? (
                          <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Synced {lead.gads_conversion_sent_at && `on ${formatDate(lead.gads_conversion_sent_at)}`}
                          </p>
                        ) : (
                          <p className="text-xs text-secondary-500 mt-1">
                            {lead.status === 'won' ? 'Ready to sync' : 'Will auto-sync when marked as Won'}
                          </p>
                        )}
                      </div>
                      
                      {/* Sync button */}
                      <button
                        onClick={handleSyncToGoogleAds}
                        disabled={syncing}
                        className="px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                      >
                        {syncing ? (
                          <>
                            <div className="animate-spin h-3 w-3 border-2 border-blue-700 border-t-transparent rounded-full" />
                            Syncing...
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            {lead.gads_conversion_sent ? 'Re-sync' : 'Sync Now'}
                          </>
                        )}
                      </button>
                    </div>
                    
                    {/* Sync message */}
                    {syncMessage && (
                      <div className={`mt-2 p-2 rounded text-xs ${
                        syncMessage.type === 'success' 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {syncMessage.text}
                      </div>
                    )}
                  </div>
                )}
              </Section>
            )}

            {/* Session Context */}
            <Section title="Session Context">
              <dl className="space-y-1">
                <Field label="Landing Page" value={lead.landing_page} />
                <Field label="Referrer" value={lead.referrer} />
                <Field label="User Agent" value={lead.user_agent} />
                <Field label="IP Address" value={lead.ip_address} />
              </dl>
            </Section>
          </div>

          {/* Footer */}
          <div className="bg-secondary-50 px-6 py-4 border-t border-secondary-200 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-secondary-700 bg-white border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges || saving}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving && (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              )}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
