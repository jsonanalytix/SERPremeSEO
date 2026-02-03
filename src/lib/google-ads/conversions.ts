/**
 * Google Ads Offline Conversion Upload
 * 
 * Handles uploading offline conversions to Google Ads via the API.
 * Supports both single conversion uploads and batch uploads.
 * 
 * @created 2026-02-03 - Google Ads API integration (Phase 2)
 */

import { getGoogleAdsCustomer, getConversionActionResourceName, getGoogleAdsConfig } from './client'
import type { ConversionUpload, ConversionUploadResult, BatchConversionResult, LeadForSync } from './types'

/**
 * Format date for Google Ads API (YYYY-MM-DD HH:MM:SS+TZ format)
 */
function formatConversionDateTime(isoDate: string): string {
  const date = new Date(isoDate)
  // Format: YYYY-MM-DD HH:MM:SS+00:00 (Google Ads format with timezone offset)
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}+00:00`
}

/**
 * Upload a single conversion to Google Ads
 */
export async function uploadSingleConversion(
  leadId: string,
  conversion: ConversionUpload
): Promise<ConversionUploadResult> {
  const customer = getGoogleAdsCustomer()
  const conversionActionResourceName = getConversionActionResourceName()

  if (!customer || !conversionActionResourceName) {
    return {
      success: false,
      leadId,
      gclid: conversion.gclid,
      error: 'Google Ads API not configured',
    }
  }

  try {
    // Prepare the click conversion
    const clickConversion = {
      gclid: conversion.gclid,
      conversion_action: conversionActionResourceName,
      conversion_date_time: formatConversionDateTime(conversion.conversionDateTime),
      conversion_value: conversion.conversionValue,
      currency_code: conversion.currencyCode,
    }

    // Upload the conversion
    const config = getGoogleAdsConfig()!
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await customer.conversionUploads.uploadClickConversions({
      customer_id: config.customerId,
      conversions: [clickConversion],
      partial_failure: true, // Allow partial success in batch operations
    } as any)

    // Check for errors
    if (response.partial_failure_error) {
      const errorMessage = response.partial_failure_error.message || 'Partial failure during upload'
      console.error('Partial failure uploading conversion:', errorMessage)
      return {
        success: false,
        leadId,
        gclid: conversion.gclid,
        error: errorMessage,
        partialFailure: true,
      }
    }

    // Check response results
    const results = response.results || []
    if (results.length === 0) {
      return {
        success: false,
        leadId,
        gclid: conversion.gclid,
        error: 'No results returned from API',
      }
    }

    return {
      success: true,
      leadId,
      gclid: conversion.gclid,
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during upload'
    console.error('Error uploading conversion:', error)
    return {
      success: false,
      leadId,
      gclid: conversion.gclid,
      error: errorMessage,
    }
  }
}

/**
 * Upload multiple conversions in a batch
 */
export async function uploadBatchConversions(
  leads: LeadForSync[],
  currencyCode: string = 'USD'
): Promise<BatchConversionResult> {
  const customer = getGoogleAdsCustomer()
  const conversionActionResourceName = getConversionActionResourceName()

  const result: BatchConversionResult = {
    successCount: 0,
    failureCount: 0,
    results: [],
    errors: [],
  }

  if (!customer || !conversionActionResourceName) {
    const error = 'Google Ads API not configured'
    result.errors.push(error)
    leads.forEach(lead => {
      result.results.push({
        success: false,
        leadId: lead.id,
        gclid: lead.gclid,
        error,
      })
      result.failureCount++
    })
    return result
  }

  // Filter leads with valid gclid
  const validLeads = leads.filter(lead => lead.gclid)
  
  if (validLeads.length === 0) {
    result.errors.push('No leads with valid gclid to upload')
    return result
  }

  try {
    // Prepare click conversions
    const clickConversions = validLeads.map(lead => ({
      gclid: lead.gclid,
      conversion_action: conversionActionResourceName,
      conversion_date_time: formatConversionDateTime(lead.converted_at || lead.created_at),
      conversion_value: lead.conversion_value ?? 1,
      currency_code: currencyCode,
    }))

    console.log('Uploading conversions:', JSON.stringify(clickConversions, null, 2))

    // Upload conversions in batch
    const config = getGoogleAdsConfig()!
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await customer.conversionUploads.uploadClickConversions({
      customer_id: config.customerId,
      conversions: clickConversions,
      partial_failure: true,
    } as any)

    console.log('Google Ads API response:', JSON.stringify(response, null, 2))

    // Process results
    const apiResults = response.results || []
    
    // Check for partial failure error
    if (response.partial_failure_error) {
      console.error('Partial failure error:', JSON.stringify(response.partial_failure_error, null, 2))
      
      // Extract error message
      const errorMessage = response.partial_failure_error.message || 'Conversion upload failed'
      result.errors.push(errorMessage)
      
      // Mark all as failed when there's a partial failure
      // In a more sophisticated implementation, we'd parse which specific conversions failed
      validLeads.forEach(lead => {
        result.results.push({
          success: false,
          leadId: lead.id,
          gclid: lead.gclid,
          error: errorMessage,
          partialFailure: true,
        })
        result.failureCount++
      })
      
      return result
    }

    // If no partial failure and we have results, all succeeded
    if (apiResults.length > 0) {
      validLeads.forEach((lead, index) => {
        if (apiResults[index]) {
          result.results.push({
            success: true,
            leadId: lead.id,
            gclid: lead.gclid,
          })
          result.successCount++
        } else {
          result.results.push({
            success: false,
            leadId: lead.id,
            gclid: lead.gclid,
            error: 'No result returned for this conversion',
          })
          result.failureCount++
        }
      })
    } else {
      // No results returned - unusual case
      console.warn('No results returned from Google Ads API')
      validLeads.forEach(lead => {
        result.results.push({
          success: false,
          leadId: lead.id,
          gclid: lead.gclid,
          error: 'No results returned from API',
        })
        result.failureCount++
      })
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during batch upload'
    console.error('Error uploading batch conversions:', error)
    result.errors.push(errorMessage)
    
    // Mark all as failed
    validLeads.forEach(lead => {
      result.results.push({
        success: false,
        leadId: lead.id,
        gclid: lead.gclid,
        error: errorMessage,
      })
      result.failureCount++
    })
  }

  return result
}

/**
 * Upload a single lead's conversion (convenience function)
 */
export async function uploadLeadConversion(
  lead: LeadForSync,
  currencyCode: string = 'USD'
): Promise<ConversionUploadResult> {
  if (!lead.gclid) {
    return {
      success: false,
      leadId: lead.id,
      gclid: '',
      error: 'Lead does not have a gclid',
    }
  }

  return uploadSingleConversion(lead.id, {
    gclid: lead.gclid,
    conversionDateTime: lead.converted_at || lead.created_at,
    conversionValue: lead.conversion_value ?? 1,
    currencyCode,
  })
}
