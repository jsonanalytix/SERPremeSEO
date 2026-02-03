/**
 * Admin Components Index
 * 
 * Re-exports all admin components for cleaner imports.
 * 
 * @created 2026-02-03 - Admin CRM components
 * @updated 2026-02-03 - Added GoogleAdsSyncPanel for conversion tracking
 */

export { default as AdminNav } from './AdminNav'
export { default as LeadsDashboard } from './LeadsDashboard'
export { default as LeadTable } from './LeadTable'
export { default as LeadFilters } from './LeadFilters'
export { default as LeadDetail } from './LeadDetail'
export { default as StatusBadge } from './StatusBadge'
export { default as Pagination } from './Pagination'
export { default as GoogleAdsSyncPanel } from './GoogleAdsSyncPanel'

export type { FilterState } from './LeadFilters'
