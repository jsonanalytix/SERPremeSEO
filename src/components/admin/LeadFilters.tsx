/**
 * Lead Filters Component
 * 
 * Provides filtering, search, and date range controls for the lead list.
 * 
 * @created 2026-02-03 - Lead CRM filters implementation
 */

'use client'

import { useState, useCallback } from 'react'
import type { LeadStatus } from '@/lib/supabase/types'

interface LeadFiltersProps {
  onFilterChange: (filters: FilterState) => void
  utmSources: string[]
}

export interface FilterState {
  search: string
  status: LeadStatus | ''
  utmSource: string
  dateFrom: string
  dateTo: string
}

const statusOptions: { value: LeadStatus | ''; label: string }[] = [
  { value: '', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
]

export default function LeadFilters({ onFilterChange, utmSources }: LeadFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    utmSource: '',
    dateFrom: '',
    dateTo: '',
  })

  const [isExpanded, setIsExpanded] = useState(false)

  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }, [filters, onFilterChange])

  const clearFilters = useCallback(() => {
    const clearedFilters: FilterState = {
      search: '',
      status: '',
      utmSource: '',
      dateFrom: '',
      dateTo: '',
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }, [onFilterChange])

  const hasActiveFilters = filters.status || filters.utmSource || filters.dateFrom || filters.dateTo

  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-4 mb-6">
      {/* Search and quick filters row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search input */}
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">Search leads</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Search by name, email, or practice..."
              className="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-lg text-sm placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Status filter */}
        <div className="sm:w-48">
          <label htmlFor="status" className="sr-only">Filter by status</label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value as LeadStatus | '')}
            className="block w-full px-3 py-2 border border-secondary-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Toggle advanced filters */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-secondary-700 bg-secondary-100 hover:bg-secondary-200 rounded-lg transition-colors"
        >
          <svg 
            className={`w-4 h-4 mr-1.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Filters
          {hasActiveFilters && (
            <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-primary-600 text-white rounded-full">
              {[filters.status, filters.utmSource, filters.dateFrom, filters.dateTo].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Advanced filters (collapsible) */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-secondary-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* UTM Source filter */}
            <div>
              <label htmlFor="utmSource" className="block text-sm font-medium text-secondary-700 mb-1">
                UTM Source
              </label>
              <select
                id="utmSource"
                value={filters.utmSource}
                onChange={(e) => updateFilter('utmSource', e.target.value)}
                className="block w-full px-3 py-2 border border-secondary-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Sources</option>
                {utmSources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            {/* Date from */}
            <div>
              <label htmlFor="dateFrom" className="block text-sm font-medium text-secondary-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                id="dateFrom"
                value={filters.dateFrom}
                onChange={(e) => updateFilter('dateFrom', e.target.value)}
                className="block w-full px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Date to */}
            <div>
              <label htmlFor="dateTo" className="block text-sm font-medium text-secondary-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                id="dateTo"
                value={filters.dateTo}
                onChange={(e) => updateFilter('dateTo', e.target.value)}
                className="block w-full px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Clear filters button */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={clearFilters}
                disabled={!hasActiveFilters && !filters.search}
                className="w-full px-3 py-2 text-sm font-medium text-secondary-600 hover:text-secondary-800 bg-white border border-secondary-300 rounded-lg hover:bg-secondary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
