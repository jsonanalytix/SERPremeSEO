/**
 * Admin Leads API Route
 * 
 * Provides CRUD operations for lead management in the CRM.
 * All endpoints require authentication (checked by middleware).
 * 
 * GET: Fetch leads with pagination, filtering, and search
 * PATCH: Update lead status, notes, or conversion value
 * 
 * @created 2026-02-03 - Lead CRM API implementation
 * @updated 2026-02-03 - Added status history tracking on status changes
 * @updated 2026-02-03 - Added auto-sync to Google Ads when status changes to 'won'
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import type { LeadStatus, LeadUpdate, StatusHistoryEntry } from '@/lib/supabase/types'
import { isGoogleAdsConfigured, uploadLeadConversion, type LeadForSync } from '@/lib/google-ads'

const LEADS_PER_PAGE = 25

export async function GET(request: NextRequest) {
  // Verify authentication
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (!user || authError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Parse query parameters
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1', 10)
  const status = searchParams.get('status') as LeadStatus | null
  const search = searchParams.get('search') || ''
  const utmSource = searchParams.get('utm_source') || ''
  const dateFrom = searchParams.get('date_from') || ''
  const dateTo = searchParams.get('date_to') || ''
  const sortBy = searchParams.get('sort_by') || 'created_at'
  const sortOrder = searchParams.get('sort_order') || 'desc'

  // Use admin client to bypass RLS for admin operations
  const adminClient = createAdminClient()
  
  // Build query
  let query = adminClient
    .from('leads')
    .select('*', { count: 'exact' })

  // Apply filters
  if (status) {
    query = query.eq('status', status)
  }

  if (search) {
    // Search in name, email, or practice_name
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,practice_name.ilike.%${search}%`)
  }

  if (utmSource) {
    query = query.eq('utm_source', utmSource)
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

  // Apply sorting
  const ascending = sortOrder === 'asc'
  query = query.order(sortBy, { ascending })

  // Apply pagination
  const from = (page - 1) * LEADS_PER_PAGE
  const to = from + LEADS_PER_PAGE - 1
  query = query.range(from, to)

  const { data: leads, error, count } = await query

  if (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }

  // Get distinct UTM sources for filter dropdown
  const { data: utmSources } = await adminClient
    .from('leads')
    .select('utm_source')
    .not('utm_source', 'is', null)
    .order('utm_source')

  const distinctUtmSources = [...new Set(utmSources?.map((l: { utm_source: string }) => l.utm_source).filter(Boolean) || [])]

  return NextResponse.json({
    leads: leads || [],
    pagination: {
      page,
      perPage: LEADS_PER_PAGE,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / LEADS_PER_PAGE),
    },
    filters: {
      utmSources: distinctUtmSources,
    },
  })
}

export async function PATCH(request: NextRequest) {
  // Verify authentication
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (!user || authError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, ...updates } = body as { id: string } & LeadUpdate

    if (!id) {
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 })
    }

    // Use admin client to bypass RLS
    const adminClient = createAdminClient()

    // Add updated_at timestamp
    const updateData: LeadUpdate = {
      ...updates,
      updated_at: new Date().toISOString(),
    }

    // If status is being set to 'won', set converted_at
    if (updates.status === 'won') {
      updateData.converted_at = new Date().toISOString()
    }

    // If status is being updated, track in status_history
    if (updates.status) {
      // First, fetch current lead to get existing history
      const { data: currentLead } = await adminClient
        .from('leads')
        .select('status, status_history')
        .eq('id', id)
        .single()

      // Only add to history if status is actually changing
      if (currentLead && currentLead.status !== updates.status) {
        const existingHistory: StatusHistoryEntry[] = currentLead.status_history || []
        
        // Create new history entry
        const newEntry: StatusHistoryEntry = {
          status: updates.status,
          changed_at: new Date().toISOString(),
          changed_by: user.email || undefined,
        }

        // Append to history
        updateData.status_history = [...existingHistory, newEntry]
      }
    }

    const { data: lead, error } = await adminClient
      .from('leads')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating lead:', error)
      return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
    }

    // Auto-sync to Google Ads when status changes to 'won'
    let googleAdsSync = null
    if (updates.status === 'won' && lead.gclid && !lead.gads_conversion_sent) {
      if (isGoogleAdsConfigured()) {
        try {
          const syncResult = await uploadLeadConversion({
            id: lead.id,
            gclid: lead.gclid,
            converted_at: lead.converted_at,
            created_at: lead.created_at,
            conversion_value: lead.conversion_value,
          } as LeadForSync)

          if (syncResult.success) {
            // Update the lead with sync status
            await adminClient
              .from('leads')
              .update({
                gads_conversion_sent: true,
                gads_conversion_sent_at: new Date().toISOString(),
              })
              .eq('id', id)

            // Update the returned lead object
            lead.gads_conversion_sent = true
            lead.gads_conversion_sent_at = new Date().toISOString()

            googleAdsSync = {
              success: true,
              message: 'Conversion automatically synced to Google Ads',
            }
          } else {
            googleAdsSync = {
              success: false,
              error: syncResult.error,
              message: 'Failed to sync conversion to Google Ads',
            }
          }
        } catch (syncError) {
          console.error('Error during auto-sync to Google Ads:', syncError)
          googleAdsSync = {
            success: false,
            error: syncError instanceof Error ? syncError.message : 'Unknown error',
            message: 'Error during Google Ads sync',
          }
        }
      } else {
        googleAdsSync = {
          skipped: true,
          message: 'Google Ads API not configured',
        }
      }
    }

    return NextResponse.json({ lead, googleAdsSync })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
