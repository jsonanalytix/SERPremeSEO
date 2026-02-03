/**
 * Supabase Database Types
 * 
 * TypeScript types for the leads table and database schema.
 * These types provide full type safety when querying Supabase.
 * 
 * @created 2026-02-03 - Initial Supabase setup for lead CRM
 * @updated 2026-02-03 - Added status_history for tracking status changes
 */

export type LeadStatus = 
  | 'new' 
  | 'contacted' 
  | 'qualified' 
  | 'proposal_sent' 
  | 'won' 
  | 'lost'

// Status history entry for tracking changes over time
export interface StatusHistoryEntry {
  status: LeadStatus
  changed_at: string
  changed_by?: string // Optional: user email who made the change
}

export interface Lead {
  id: string
  created_at: string
  updated_at: string
  
  // Form Fields
  name: string
  practice_name: string
  email: string
  phone: string
  website: string | null
  project_type: string | null
  
  // Lead Management
  status: LeadStatus
  status_history: StatusHistoryEntry[] | null
  notes: string | null
  conversion_value: number | null
  converted_at: string | null
  
  // Attribution (UTM Parameters)
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  
  // Click IDs (for offline conversions)
  gclid: string | null       // Google Ads
  fbclid: string | null      // Facebook/Meta
  msclkid: string | null     // Microsoft Ads
  ttclid: string | null      // TikTok
  li_fat_id: string | null   // LinkedIn
  
  // Session Context
  landing_page: string | null
  referrer: string | null
  user_agent: string | null
  ip_address: string | null
  
  // Google Ads Conversion Sync
  gads_conversion_sent: boolean
  gads_conversion_sent_at: string | null
}

export interface LeadInsert {
  // Required fields
  name: string
  practice_name: string
  email: string
  phone: string
  
  // Optional fields
  website?: string | null
  project_type?: string | null
  status?: LeadStatus
  status_history?: StatusHistoryEntry[] | null
  notes?: string | null
  conversion_value?: number | null
  converted_at?: string | null
  
  // Attribution
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_term?: string | null
  utm_content?: string | null
  
  // Click IDs
  gclid?: string | null
  fbclid?: string | null
  msclkid?: string | null
  ttclid?: string | null
  li_fat_id?: string | null
  
  // Session Context
  landing_page?: string | null
  referrer?: string | null
  user_agent?: string | null
  ip_address?: string | null
}

export interface LeadUpdate {
  name?: string
  practice_name?: string
  email?: string
  phone?: string
  website?: string | null
  project_type?: string | null
  status?: LeadStatus
  status_history?: StatusHistoryEntry[] | null
  notes?: string | null
  conversion_value?: number | null
  converted_at?: string | null
  gads_conversion_sent?: boolean
  gads_conversion_sent_at?: string | null
  updated_at?: string
}

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: Lead
        Insert: LeadInsert
        Update: LeadUpdate
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      lead_status: LeadStatus
    }
  }
}
