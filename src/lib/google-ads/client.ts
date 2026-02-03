/**
 * Google Ads API Client
 * 
 * Initializes and configures the Google Ads API client for offline
 * conversion tracking. Uses service account / OAuth credentials.
 * 
 * Required environment variables:
 * - GOOGLE_ADS_CLIENT_ID
 * - GOOGLE_ADS_CLIENT_SECRET
 * - GOOGLE_ADS_DEVELOPER_TOKEN
 * - GOOGLE_ADS_REFRESH_TOKEN
 * - GOOGLE_ADS_CUSTOMER_ID
 * - GOOGLE_ADS_CONVERSION_ACTION_ID
 * 
 * @created 2026-02-03 - Google Ads API integration (Phase 2)
 */

import { GoogleAdsApi } from 'google-ads-api'
import type { GoogleAdsConfig } from './types'

// Cached client instance
let cachedClient: GoogleAdsApi | null = null

/**
 * Get Google Ads configuration from environment variables
 */
export function getGoogleAdsConfig(): GoogleAdsConfig | null {
  const clientId = process.env.GOOGLE_ADS_CLIENT_ID
  const clientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET
  const developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN
  const refreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN
  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID
  const conversionActionId = process.env.GOOGLE_ADS_CONVERSION_ACTION_ID
  const loginCustomerId = process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID // Manager (MCC) account ID

  // Check if all required credentials are present
  if (!clientId || !clientSecret || !developerToken || !refreshToken || !customerId || !conversionActionId) {
    return null
  }

  return {
    clientId,
    clientSecret,
    developerToken,
    refreshToken,
    customerId,
    conversionActionId,
    loginCustomerId, // Optional: only needed for MCC-managed accounts
  }
}

/**
 * Check if Google Ads integration is configured
 */
export function isGoogleAdsConfigured(): boolean {
  return getGoogleAdsConfig() !== null
}

/**
 * Get or create the Google Ads API client
 */
export function getGoogleAdsClient(): GoogleAdsApi | null {
  const config = getGoogleAdsConfig()
  
  if (!config) {
    console.warn('Google Ads API credentials not configured')
    return null
  }

  if (cachedClient) {
    return cachedClient
  }

  try {
    cachedClient = new GoogleAdsApi({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      developer_token: config.developerToken,
    })

    return cachedClient
  } catch (error) {
    console.error('Failed to initialize Google Ads client:', error)
    return null
  }
}

/**
 * Get a customer instance for API operations
 */
export function getGoogleAdsCustomer() {
  const client = getGoogleAdsClient()
  const config = getGoogleAdsConfig()

  if (!client || !config) {
    return null
  }

  try {
    // Build customer options
    const customerOptions: {
      customer_id: string
      refresh_token: string
      login_customer_id?: string
    } = {
      customer_id: config.customerId,
      refresh_token: config.refreshToken,
    }

    // If using a Manager Account (MCC), set the login_customer_id
    // This is required when accessing client accounts through a manager
    if (config.loginCustomerId) {
      customerOptions.login_customer_id = config.loginCustomerId
    }

    return client.Customer(customerOptions)
  } catch (error) {
    console.error('Failed to get Google Ads customer:', error)
    return null
  }
}

/**
 * Format conversion action resource name
 */
export function getConversionActionResourceName(): string | null {
  const config = getGoogleAdsConfig()
  
  if (!config) {
    return null
  }

  // Format: customers/{customer_id}/conversionActions/{conversion_action_id}
  return `customers/${config.customerId}/conversionActions/${config.conversionActionId}`
}

/**
 * Clear cached client (useful for testing or credential refresh)
 */
export function clearClientCache(): void {
  cachedClient = null
}
