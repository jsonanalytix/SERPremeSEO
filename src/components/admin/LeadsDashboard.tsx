/**
 * Leads Dashboard Client Component
 * 
 * Main CRM dashboard that manages state for lead list, filters, and detail modal.
 * Handles data fetching, filtering, sorting, and CRUD operations.
 * 
 * @created 2026-02-03 - Lead CRM dashboard implementation
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Lead, LeadStatus } from '@/lib/supabase/types'
import LeadTable from './LeadTable'
import LeadFilters, { type FilterState } from './LeadFilters'
import LeadDetail from './LeadDetail'
import Pagination from './Pagination'
import GoogleAdsSyncPanel from './GoogleAdsSyncPanel'

interface LeadsResponse {
  leads: Lead[]
  pagination: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
  filters: {
    utmSources: string[]
  }
}

export default function LeadsDashboard() {
  // Data state
  const [leads, setLeads] = useState<Lead[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 25,
    total: 0,
    totalPages: 0,
  })
  const [utmSources, setUtmSources] = useState<string[]>([])
  
  // UI state
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  
  // Filter and sort state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    utmSource: '',
    dateFrom: '',
    dateTo: '',
  })
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState('')
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search)
    }, 300)
    return () => clearTimeout(timer)
  }, [filters.search])

  // Fetch leads
  const fetchLeads = useCallback(async () => {
    setLoading(true)
    setError(null)

    const params = new URLSearchParams({
      page: page.toString(),
      sort_by: sortBy,
      sort_order: sortOrder,
    })

    if (debouncedSearch) params.set('search', debouncedSearch)
    if (filters.status) params.set('status', filters.status)
    if (filters.utmSource) params.set('utm_source', filters.utmSource)
    if (filters.dateFrom) params.set('date_from', filters.dateFrom)
    if (filters.dateTo) params.set('date_to', filters.dateTo)

    try {
      const response = await fetch(`/api/admin/leads?${params}`)
      
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/admin/login'
          return
        }
        throw new Error('Failed to fetch leads')
      }

      const data: LeadsResponse = await response.json()
      setLeads(data.leads)
      setPagination(data.pagination)
      setUtmSources(data.filters.utmSources)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [page, sortBy, sortOrder, debouncedSearch, filters.status, filters.utmSource, filters.dateFrom, filters.dateTo])

  // Fetch on mount and when dependencies change
  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  // Reset page when filters change
  useEffect(() => {
    setPage(1)
  }, [filters.status, filters.utmSource, filters.dateFrom, filters.dateTo, debouncedSearch])

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
  }

  // Handle status update
  const handleStatusUpdate = async (leadId: string, status: LeadStatus) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update lead')
      }

      const { lead: updatedLead } = await response.json()

      // Update lead in list
      setLeads(prevLeads => 
        prevLeads.map(lead => lead.id === leadId ? updatedLead : lead)
      )

      // Update selected lead if open
      if (selectedLead?.id === leadId) {
        setSelectedLead(updatedLead)
      }
    } catch (err) {
      console.error('Error updating lead status:', err)
      // Refresh to get correct state
      fetchLeads()
    }
  }

  // Handle lead detail update
  const handleLeadUpdate = async (leadId: string, updates: Partial<Lead>) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, ...updates }),
      })

      if (!response.ok) {
        throw new Error('Failed to update lead')
      }

      const { lead: updatedLead } = await response.json()

      // Update lead in list
      setLeads(prevLeads => 
        prevLeads.map(lead => lead.id === leadId ? updatedLead : lead)
      )

      // Update selected lead
      setSelectedLead(updatedLead)
    } catch (err) {
      console.error('Error updating lead:', err)
      throw err
    }
  }

  // Handle lead click (open detail)
  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDetailOpen(true)
  }

  // Handle detail close
  const handleDetailClose = () => {
    setIsDetailOpen(false)
    setTimeout(() => setSelectedLead(null), 200)
  }

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Header with stats */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Lead Dashboard</h1>
          <p className="mt-1 text-secondary-600">
            {pagination.total} total lead{pagination.total !== 1 ? 's' : ''}
          </p>
        </div>
        
        {/* Quick stats */}
        <div className="flex gap-4">
          <div className="bg-white rounded-lg border border-secondary-200 px-4 py-2">
            <p className="text-xs text-secondary-500">New Today</p>
            <p className="text-lg font-semibold text-blue-600">
              {leads.filter(l => {
                const today = new Date().toDateString()
                return new Date(l.created_at).toDateString() === today && l.status === 'new'
              }).length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-secondary-200 px-4 py-2">
            <p className="text-xs text-secondary-500">Conversions</p>
            <p className="text-lg font-semibold text-green-600">
              {leads.filter(l => l.status === 'won').length}
            </p>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
          <button 
            onClick={fetchLeads}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Google Ads Sync Panel */}
      <div className="mb-6">
        <GoogleAdsSyncPanel />
      </div>

      {/* Filters */}
      <LeadFilters 
        onFilterChange={handleFilterChange}
        utmSources={utmSources}
      />

      {/* Lead table */}
      <LeadTable
        leads={leads}
        onStatusUpdate={handleStatusUpdate}
        onLeadClick={handleLeadClick}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        loading={loading}
      />

      {/* Pagination */}
      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        total={pagination.total}
        perPage={pagination.perPage}
        onPageChange={handlePageChange}
      />

      {/* Lead detail modal */}
      <LeadDetail
        lead={selectedLead}
        isOpen={isDetailOpen}
        onClose={handleDetailClose}
        onUpdate={handleLeadUpdate}
      />
    </div>
  )
}
