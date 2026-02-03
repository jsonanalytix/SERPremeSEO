/**
 * Google Ads API Types
 * 
 * TypeScript types for Google Ads offline conversion tracking.
 * 
 * @created 2026-02-03 - Google Ads API integration (Phase 2)
 */

export interface GoogleAdsConfig {
  clientId: string
  clientSecret: string
  developerToken: string
  refreshToken: string
  customerId: string
  conversionActionId: string
  loginCustomerId?: string // Manager (MCC) account ID, if using a client account
}

export interface ConversionUpload {
  gclid: string
  conversionDateTime: string
  conversionValue: number
  currencyCode: string
  conversionAction?: string
}

export interface ConversionUploadResult {
  success: boolean
  leadId: string
  gclid: string
  error?: string
  partialFailure?: boolean
}

export interface BatchConversionResult {
  successCount: number
  failureCount: number
  results: ConversionUploadResult[]
  errors: string[]
}

export interface LeadForSync {
  id: string
  gclid: string
  converted_at: string | null
  created_at: string
  conversion_value: number | null
}
