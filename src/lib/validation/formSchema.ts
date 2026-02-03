import { z } from "zod";

// Phone validation regex for US format
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  practiceName: z
    .string()
    .min(2, "Practice name must be at least 2 characters")
    .max(200, "Practice name must be less than 200 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(phoneRegex, "Please enter a valid phone number"),
  website: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
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
