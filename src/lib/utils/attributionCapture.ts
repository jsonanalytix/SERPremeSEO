/**
 * Attribution Capture Utility
 * 
 * Captures and persists UTM parameters and advertising click IDs from URL.
 * Stores in localStorage for session persistence across page navigations.
 * 
 * @created 2026-02-03 - Lead capture enhancement for CRM
 */

// Storage key for attribution data
const ATTRIBUTION_STORAGE_KEY = 'serpreme_attribution'

// UTM parameter keys
const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

// Advertising platform click IDs
const CLICK_ID_PARAMS = [
  'gclid',     // Google Ads
  'fbclid',    // Facebook/Meta
  'msclkid',   // Microsoft Ads
  'ttclid',    // TikTok
  'li_fat_id', // LinkedIn
] as const

export interface AttributionData {
  // UTM Parameters
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  
  // Click IDs
  gclid: string | null
  fbclid: string | null
  msclkid: string | null
  ttclid: string | null
  li_fat_id: string | null
  
  // Session Context
  landing_page: string | null
  referrer: string | null
}

/**
 * Check if we're running in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Parse attribution parameters from the current URL
 */
function parseUrlAttribution(): Partial<AttributionData> {
  if (!isBrowser()) return {}
  
  const params = new URLSearchParams(window.location.search)
  const attribution: Partial<AttributionData> = {}
  
  // Parse UTM parameters
  for (const param of UTM_PARAMS) {
    const value = params.get(param)
    if (value) {
      attribution[param] = value
    }
  }
  
  // Parse click IDs
  for (const param of CLICK_ID_PARAMS) {
    const value = params.get(param)
    if (value) {
      attribution[param] = value
    }
  }
  
  return attribution
}

/**
 * Get stored attribution data from localStorage
 */
function getStoredAttribution(): Partial<AttributionData> {
  if (!isBrowser()) return {}
  
  try {
    const stored = localStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.warn('Failed to parse stored attribution data:', error)
  }
  
  return {}
}

/**
 * Store attribution data in localStorage
 */
function storeAttribution(data: Partial<AttributionData>): void {
  if (!isBrowser()) return
  
  try {
    const existing = getStoredAttribution()
    const merged = { ...existing, ...data }
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged))
  } catch (error) {
    console.warn('Failed to store attribution data:', error)
  }
}

/**
 * Capture attribution data from URL and store in localStorage.
 * Call this on page load/mount to capture UTM params and click IDs.
 * 
 * Only captures new parameters - doesn't overwrite existing stored data
 * unless new values are present in the URL.
 */
export function captureAttribution(): void {
  if (!isBrowser()) return
  
  const urlAttribution = parseUrlAttribution()
  
  // Get session context (only set if not already stored)
  const stored = getStoredAttribution()
  
  const sessionContext: Partial<AttributionData> = {}
  
  // Capture landing page if not already set
  if (!stored.landing_page) {
    sessionContext.landing_page = window.location.href
  }
  
  // Capture referrer if not already set
  if (!stored.referrer && document.referrer) {
    sessionContext.referrer = document.referrer
  }
  
  // Merge URL params with session context
  const newData = { ...sessionContext, ...urlAttribution }
  
  // Only store if there's new data
  if (Object.keys(newData).length > 0) {
    storeAttribution(newData)
  }
}

/**
 * Get all attribution data for form submission.
 * Returns merged data from localStorage with null defaults for missing fields.
 */
export function getAttributionData(): AttributionData {
  const stored = getStoredAttribution()
  
  return {
    // UTM Parameters
    utm_source: stored.utm_source || null,
    utm_medium: stored.utm_medium || null,
    utm_campaign: stored.utm_campaign || null,
    utm_term: stored.utm_term || null,
    utm_content: stored.utm_content || null,
    
    // Click IDs
    gclid: stored.gclid || null,
    fbclid: stored.fbclid || null,
    msclkid: stored.msclkid || null,
    ttclid: stored.ttclid || null,
    li_fat_id: stored.li_fat_id || null,
    
    // Session Context
    landing_page: stored.landing_page || null,
    referrer: stored.referrer || null,
  }
}

/**
 * Clear stored attribution data.
 * Useful after successful form submission if you want to reset tracking.
 */
export function clearAttribution(): void {
  if (!isBrowser()) return
  
  try {
    localStorage.removeItem(ATTRIBUTION_STORAGE_KEY)
  } catch (error) {
    console.warn('Failed to clear attribution data:', error)
  }
}

/**
 * Check if there's any attribution data available
 */
export function hasAttributionData(): boolean {
  const data = getAttributionData()
  return Object.values(data).some(value => value !== null)
}
