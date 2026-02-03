// Google Ads Call Tracking Integration

/**
 * Google Ads Call Conversion Tracking
 * 
 * Tracks phone clicks as Google Ads conversions
 * Requires Google Ads conversion label configured in GTM or GA4
 */

/**
 * Format phone number for display
 * Converts raw digits to formatted (XXX) XXX-XXXX format
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

/**
 * Format phone number for tel: link
 * Converts to tel:+1XXXXXXXXXX format for click-to-call
 */
export function formatPhoneLink(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `tel:+1${cleaned}`;
  }
  // If already includes country code, just add tel:
  if (cleaned.length === 11 && cleaned.startsWith("1")) {
    return `tel:+${cleaned}`;
  }
  return `tel:${phone}`;
}

/**
 * Track Google Ads call conversion
 * This should be called when a phone number is clicked
 * 
 * @param conversionLabel - Google Ads conversion label (from Google Ads account)
 * @param clickLocation - Where the click occurred (for analytics)
 */
export function trackGoogleAdsCallConversion(
  conversionLabel: string,
  clickLocation?: string
) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  // Track as Google Ads conversion
  window.gtag("event", "conversion", {
    send_to: conversionLabel,
    event_category: "phone_call",
    event_label: clickLocation || "unknown",
  });
}
