/**
 * Google Ads Offline Conversion CSV Export API
 * 
 * Exports leads with gclid values in a format compatible with
 * Google Ads offline conversion import.
 * 
 * GET: Export CSV file with filters for date range and conversion status
 * 
 * CSV Format follows Google Ads requirements:
 * - Google Click ID (gclid)
 * - Conversion Name
 * - Conversion Time (YYYY-MM-DD HH:MM:SS+0000 format)
 * - Conversion Value
 * - Conversion Currency
 * 
 * @created 2026-02-03 - CSV export for Google Ads offline conversions
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import type { Lead, LeadStatus } from '@/lib/supabase/types'

// Google Ads expects this specific date format
function formatGoogleAdsDate(isoDate: string): string {
  const date = new Date(isoDate)
  // Format: YYYY-MM-DD HH:MM:SS+0000
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+0000`
}

// Escape CSV values properly
function escapeCSVValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return ''
  }
  const stringValue = String(value)
  // If value contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  return stringValue
}

export async function GET(request: NextRequest) {
  // Verify authentication
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (!user || authError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Parse query parameters
  const searchParams = request.nextUrl.searchParams
  const status = searchParams.get('status') as LeadStatus | null
  const dateFrom = searchParams.get('date_from') || ''
  const dateTo = searchParams.get('date_to') || ''
  const conversionName = searchParams.get('conversion_name') || 'Lead Submission'
  const currency = searchParams.get('currency') || 'USD'
  const excludeSynced = searchParams.get('exclude_synced') === 'true'
  const onlyConverted = searchParams.get('only_converted') === 'true'

  // Use admin client to bypass RLS
  const adminClient = createAdminClient()
  
  // Build query - only get leads with gclid (required for Google Ads)
  let query = adminClient
    .from('leads')
    .select('*')
    .not('gclid', 'is', null)

  // Apply filters
  if (status) {
    query = query.eq('status', status)
  }

  // Filter only converted leads if requested
  if (onlyConverted) {
    query = query.eq('status', 'won')
  }

  // Exclude already synced conversions if requested
  if (excludeSynced) {
    query = query.eq('gads_conversion_sent', false)
  }

  if (dateFrom) {
    query = query.gte('created_at', dateFrom)
  }

  if (dateTo) {
    // Add one day to include the entire end date
    const endDate = new Date(dateTo)
    endDate.setDate(endDate.getDate() + 1)
    query = query.lt('created_at', endDate.toISOString())
  }

  // Order by created_at for consistent export
  query = query.order('created_at', { ascending: true })

  const { data: leads, error } = await query

  if (error) {
    console.error('Error fetching leads for export:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }

  if (!leads || leads.length === 0) {
    return NextResponse.json({ 
      error: 'No leads with gclid found matching the filters' 
    }, { status: 404 })
  }

  // Build CSV content
  // Google Ads offline conversion import header
  const headers = [
    'Google Click ID',
    'Conversion Name',
    'Conversion Time',
    'Conversion Value',
    'Conversion Currency'
  ]

  const rows: string[] = [headers.join(',')]

  for (const lead of leads as Lead[]) {
    // Use converted_at if available (for won leads), otherwise use created_at
    const conversionTime = lead.converted_at || lead.created_at
    
    // Use conversion_value if set, otherwise default to 1
    const conversionValue = lead.conversion_value ?? 1

    const row = [
      escapeCSVValue(lead.gclid),
      escapeCSVValue(conversionName),
      escapeCSVValue(formatGoogleAdsDate(conversionTime)),
      escapeCSVValue(conversionValue),
      escapeCSVValue(currency)
    ]

    rows.push(row.join(','))
  }

  const csvContent = rows.join('\n')

  // Generate filename with date range
  const now = new Date()
  const dateStr = now.toISOString().split('T')[0]
  let filename = `google-ads-conversions-${dateStr}`
  if (dateFrom) filename += `-from-${dateFrom}`
  if (dateTo) filename += `-to-${dateTo}`
  filename += '.csv'

  // Return as downloadable CSV file
  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}
