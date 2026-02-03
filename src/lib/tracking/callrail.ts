// CallRail Dynamic Number Insertion Integration

/**
 * CallRail configuration
 * Note: Replace with actual CallRail account ID and campaign settings
 */
export const callRailConfig = {
  // Default phone number (fallback)
  defaultNumber: "(978) 219-9301",
  
  // CallRail swap targets - elements with these classes will have numbers swapped
  swapTargets: [
    ".callrail-number",
    "[data-callrail]",
  ],
};

/**
 * Format phone number for display
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
 */
export function formatPhoneLink(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  return `tel:+1${cleaned}`;
}

/**
 * Get the CallRail script snippet for the page head
 * Note: This is a placeholder - replace with actual CallRail snippet
 */
export function getCallRailSnippet(): string {
  return `
    <!-- CallRail Dynamic Number Insertion -->
    <!-- Replace with your actual CallRail snippet -->
  `;
}
