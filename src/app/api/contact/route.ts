import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validation/formSchema";
import { createAdminClient } from "@/lib/supabase/server";
import type { LeadInsert } from "@/lib/supabase/types";

/**
 * POST /api/contact
 * Handles form submissions from the lead capture form
 * Stores leads in Supabase with full attribution tracking
 * 
 * @updated 2026-02-03 - Added Supabase integration and attribution capture
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the form data (only validates core form fields)
    const validationResult = leadFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    
    const formData = validationResult.data;
    
    // Extract attribution data from body (these are optional)
    const attribution = {
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      utm_term: body.utm_term || null,
      utm_content: body.utm_content || null,
      gclid: body.gclid || null,
      fbclid: body.fbclid || null,
      msclkid: body.msclkid || null,
      ttclid: body.ttclid || null,
      li_fat_id: body.li_fat_id || null,
      landing_page: body.landing_page || null,
      referrer: body.referrer || null,
    };
    
    // Capture request context from headers
    const userAgent = request.headers.get("user-agent") || null;
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() || realIp || null;
    
    // Prepare lead data for Supabase
    const leadData: LeadInsert = {
      // Form fields
      name: formData.name,
      practice_name: formData.practiceName,
      email: formData.email,
      phone: formData.phone,
      website: formData.website || null,
      project_type: formData.projectType || null,
      
      // Attribution
      ...attribution,
      
      // Session context
      user_agent: userAgent,
      ip_address: ipAddress,
    };
    
    // Insert into Supabase
    const supabase = createAdminClient();
    const { data: lead, error: insertError } = await supabase
      .from("leads")
      .insert(leadData)
      .select("id")
      .single();
    
    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save your information. Please try again or call us directly.",
        },
        { status: 500 }
      );
    }
    
    // Log successful submission
    console.log("Lead captured:", {
      id: lead.id,
      email: formData.email,
      practiceName: formData.practiceName,
      source: attribution.utm_source,
      hasGclid: !!attribution.gclid,
      timestamp: new Date().toISOString(),
    });
    
    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll be in touch within 1 business day.",
        leadId: lead.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Form submission error:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again or call us directly.",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
