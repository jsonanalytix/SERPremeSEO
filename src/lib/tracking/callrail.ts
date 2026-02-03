// CallRail Dynamic Number Insertion Integration

// Extend Window interface for CallRail
declare global {
  interface Window {
    cr?: unknown;
  }
}

/**
 * CallRail configuration
 * 
 * CallRail DNI automatically swaps phone numbers on elements with:
 * - class="callrail-number"
 * - data-callrail attribute
 * 
 * The CallRailDNI component handles script loading.
 * This file provides utility functions for phone number formatting.
 */
export const callRailConfig = {
  // Default phone number (fallback)
  defaultNumber: "(978) 219-9301",
  
  // CallRail swap targets - elements with these classes/attributes will have numbers swapped
  swapTargets: [
    ".callrail-number",
    "[data-callrail]",
  ],
};

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
 * Initialize CallRail tracking for a specific element
 * This can be called programmatically if needed
 */
export function initializeCallRailTracking(element: HTMLElement | null) {
  if (!element || typeof window === "undefined") {
    return;
  }

  // CallRail should automatically handle elements with the class
  // This function can be used for manual initialization if needed
  if (window.cr) {
    // CallRail object is available
    element.classList.add("callrail-number");
  }
}
