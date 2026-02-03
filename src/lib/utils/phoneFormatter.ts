/**
 * Phone number formatting utilities
 * Formats phone numbers for display and input handling
 */

/**
 * Formats a phone number string to (XXX) XXX-XXXX format
 * @param phone - Phone number string (can be digits only or formatted)
 * @returns Formatted phone string or original if invalid
 */
export function formatPhone(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");
  
  // If it's 11 digits and starts with 1, remove the leading 1
  const normalized = digits.length === 11 && digits.startsWith("1") 
    ? digits.slice(1) 
    : digits;
  
  // Must be exactly 10 digits
  if (normalized.length !== 10) {
    return phone; // Return original if invalid
  }
  
  // Format as (XXX) XXX-XXXX
  return `(${normalized.slice(0, 3)}) ${normalized.slice(3, 6)}-${normalized.slice(6)}`;
}

/**
 * Handles phone input changes and formats as user types
 * @param value - Current input value
 * @returns Formatted phone string
 */
export function handlePhoneInput(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");
  
  // Limit to 10 digits (or 11 if starts with 1)
  const maxDigits = digits.startsWith("1") && digits.length <= 11 ? 11 : 10;
  const limited = digits.slice(0, maxDigits);
  
  // Format based on length
  if (limited.length === 0) return "";
  if (limited.length <= 3) return `(${limited}`;
  if (limited.length <= 6) return `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
  
  // Full format: (XXX) XXX-XXXX
  const area = limited.slice(0, 3);
  const first = limited.slice(3, 6);
  const last = limited.slice(6, 10);
  return `(${area}) ${first}-${last}`;
}
