/**
 * Google Ads Offline Conversion Sync API
 * 
 * Handles automated syncing of offline conversions to Google Ads.
 * Supports both single lead sync and batch sync operations.
 * 
 * POST: Sync specific leads or all pending conversions
 * GET: Check sync status and configuration
 * 
 * @created 2026-02-03 - Google Ads API integration (Phase 2)
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { 
  isGoogleAdsConfigured, 
  uploadLeadConversion, 
  uploadBatchConversions,
  type LeadForSync 
} from '@/lib/google-ads'

/**
 * GET: Check Google Ads sync configuration and status
 */
export async function GET(request: NextRequest) {
  // Verify authentication
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (!user || authError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const searchParams = request.nextUrl.searchParams
  const includeStats = searchParams.get('stats') === 'true'

  // Check if Google Ads is configured
  const configured = isGoogleAdsConfigured()

  const response: Record<string, unknown> = {
    configured,
    message: configured 
      ? 'Google Ads API is configured and ready' 
      : 'Google Ads API credentials not configured. Set GOOGLE_ADS_* environment variables.',
  }

  // Include sync statistics if requested
  if (includeStats && configured) {
    const adminClient = createAdminClient()
    
    // Count leads eligible for sync (won status with gclid, not yet synced)
    const { count: pendingCount } = await adminClient
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'won')
      .not('gclid', 'is', null)
      .eq('gads_conversion_sent', false)

    // Count already synced
    const { count: syncedCount } = await adminClient
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('gads_conversion_sent', true)

    // Count leads with gclid but not won yet
    const { count: withGclidCount } = await adminClient
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .not('gclid', 'is', null)

    response.stats = {
      pendingSync: pendingCount || 0,
      alreadySynced: syncedCount || 0,
      totalWithGclid: withGclidCount || 0,
    }
  }

  return NextResponse.json(response)
}

/**
 * POST: Sync conversions to Google Ads
 * 
 * Body options:
 * - { leadId: string } - Sync a single specific lead
 * - { leadIds: string[] } - Sync multiple specific leads
 * - { syncAll: true } - Sync all pending (won + gclid + not synced)
 * - { autoSync: true, leadId: string } - Auto-sync triggered by status change
 */
export async function POST(request: NextRequest) {
  // Verify authentication
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (!user || authError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if Google Ads is configured
  if (!isGoogleAdsConfigured()) {
    return NextResponse.json({ 
      error: 'Google Ads API not configured',
      message: 'Set GOOGLE_ADS_* environment variables to enable sync.',
    }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { leadId, leadIds, syncAll, autoSync } = body as {
      leadId?: string
      leadIds?: string[]
      syncAll?: boolean
      autoSync?: boolean
    }

    const adminClient = createAdminClient()

    // Single lead sync
    if (leadId) {
      // Fetch the lead
      const { data: leadData, error: fetchError } = await adminClient
        .from('leads')
        .select('id, gclid, converted_at, created_at, conversion_value, status, gads_conversion_sent')
        .eq('id', leadId)
        .single()

      if (fetchError || !leadData) {
        return NextResponse.json({ error: 'Lead not found' }, { status: 404 })
      }

      // Type assertion for the lead data
      const lead = leadData as {
        id: string
        gclid: string | null
        converted_at: string | null
        created_at: string
        conversion_value: number | null
        status: string
        gads_conversion_sent: boolean
      }

      // Validation checks
      if (!lead.gclid) {
        return NextResponse.json({ 
          error: 'Lead does not have a gclid',
          message: 'Only leads from Google Ads clicks can be synced.',
        }, { status: 400 })
      }

      if (lead.gads_conversion_sent && !body.force) {
        return NextResponse.json({ 
          error: 'Conversion already synced',
          message: 'Use force=true to re-sync.',
        }, { status: 409 })
      }

      // For auto-sync, only sync if status is 'won'
      if (autoSync && lead.status !== 'won') {
        return NextResponse.json({ 
          skipped: true,
          message: 'Auto-sync only applies to won leads.',
        })
      }

      // Upload the conversion
      const result = await uploadLeadConversion(lead as LeadForSync)

      if (result.success) {
        // Update the lead record
        await (adminClient
          .from('leads') as ReturnType<typeof adminClient.from>)
          .update({
            gads_conversion_sent: true,
            gads_conversion_sent_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as Record<string, unknown>)
          .eq('id', leadId)

        return NextResponse.json({
          success: true,
          message: 'Conversion synced to Google Ads',
          result,
        })
      } else {
        return NextResponse.json({
          success: false,
          error: result.error,
          result,
        }, { status: 500 })
      }
    }

    // Multiple leads sync
    if (leadIds && leadIds.length > 0) {
      const { data: leads, error: fetchError } = await adminClient
        .from('leads')
        .select('id, gclid, converted_at, created_at, conversion_value')
        .in('id', leadIds)
        .not('gclid', 'is', null)

      if (fetchError || !leads || leads.length === 0) {
        return NextResponse.json({ 
          error: 'No valid leads found',
          message: 'Ensure leads have gclid values.',
        }, { status: 404 })
      }

      const batchResult = await uploadBatchConversions(leads as LeadForSync[])

      // Update successfully synced leads
      const successfulIds = batchResult.results
        .filter(r => r.success)
        .map(r => r.leadId)

      if (successfulIds.length > 0) {
        await (adminClient
          .from('leads') as ReturnType<typeof adminClient.from>)
          .update({
            gads_conversion_sent: true,
            gads_conversion_sent_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as Record<string, unknown>)
          .in('id', successfulIds)
      }

      return NextResponse.json({
        success: batchResult.failureCount === 0,
        message: `Synced ${batchResult.successCount} of ${leads.length} conversions`,
        ...batchResult,
      })
    }

    // Sync all pending conversions
    if (syncAll) {
      // Fetch all pending leads (won status, has gclid, not synced)
      const { data: leads, error: fetchError } = await adminClient
        .from('leads')
        .select('id, gclid, converted_at, created_at, conversion_value')
        .eq('status', 'won')
        .not('gclid', 'is', null)
        .eq('gads_conversion_sent', false)
        .limit(100) // Limit to prevent timeout

      if (fetchError) {
        return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
      }

      if (!leads || leads.length === 0) {
        return NextResponse.json({
          success: true,
          message: 'No pending conversions to sync',
          successCount: 0,
          failureCount: 0,
        })
      }

      const batchResult = await uploadBatchConversions(leads as LeadForSync[])

      // Update successfully synced leads
      const successfulIds = batchResult.results
        .filter(r => r.success)
        .map(r => r.leadId)

      if (successfulIds.length > 0) {
        await (adminClient
          .from('leads') as ReturnType<typeof adminClient.from>)
          .update({
            gads_conversion_sent: true,
            gads_conversion_sent_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as Record<string, unknown>)
          .in('id', successfulIds)
      }

      return NextResponse.json({
        success: batchResult.failureCount === 0,
        message: `Synced ${batchResult.successCount} of ${leads.length} conversions`,
        ...batchResult,
      })
    }

    return NextResponse.json({ 
      error: 'Invalid request',
      message: 'Provide leadId, leadIds, or syncAll parameter.',
    }, { status: 400 })

  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
