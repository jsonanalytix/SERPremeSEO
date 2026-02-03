import { z } from "zod";

// Phone validation regex for US format - accepts various formats
// Matches: (555) 123-4567, 555-123-4567, 5551234567, +1 555 123 4567, etc.
const phoneRegex = /^[\+]?1?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{4}$/;

// Helper function to normalize phone numbers for validation
export function normalizePhone(phone: string): string {
  // Remove all non-digit characters except +
  return phone.replace(/[^\d+]/g, "");
}

// Custom phone validation with transform
const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .transform((val) => normalizePhone(val))
  .refine(
    (val) => {
      // After normalization, should be 10 or 11 digits (with optional +1)
      const digits = val.replace(/\+/g, "");
      return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
    },
    {
      message: "Please enter a valid 10-digit phone number",
    }
  )
  .refine(
    (val) => phoneRegex.test(val) || /^\d{10}$/.test(val.replace(/\+1/, "")),
    {
      message: "Please enter a valid phone number (e.g., (555) 123-4567)",
    }
  );

// Website validation - optional, but if provided must be valid URL
const websiteSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      // Empty string or undefined is valid (optional field)
      if (!val || val.trim() === "") return true;
      // Try to validate as URL, with or without protocol
      try {
        const urlToTest = val.startsWith("http://") || val.startsWith("https://") 
          ? val 
          : `https://${val}`;
        new URL(urlToTest);
        return true;
      } catch {
        return false;
      }
    },
    {
      message: "Please enter a valid website URL",
    }
  )
  .transform((val) => {
    if (!val || val.trim() === "") return undefined;
    // Normalize URL - add https:// if missing
    const trimmed = val.trim();
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      return `https://${trimmed}`;
    }
    return trimmed;
  });

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  practiceName: z
    .string()
    .min(1, "Practice name is required")
    .min(2, "Practice name must be at least 2 characters")
    .max(200, "Practice name must be less than 200 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),
  phone: phoneSchema,
  website: websiteSchema,
  projectType: z
    .enum([
      "new-website",
      "website-redesign",
      "seo-website",
      "not-sure"
    ])
    .optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const projectTypeOptions = [
  { value: "new-website", label: "New website design" },
  { value: "website-redesign", label: "Website redesign" },
  { value: "seo-website", label: "SEO + website" },
  { value: "not-sure", label: "Not sure yet" },
] as const;
