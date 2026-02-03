import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema, type LeadFormData } from "@/lib/validation/formSchema";

/**
 * POST /api/contact
 * Handles form submissions from the lead capture form
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the form data
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
    
    const formData: LeadFormData = validationResult.data;
    
    // TODO: Replace with actual form submission logic
    // Examples:
    // - Send email via SendGrid/Mailgun
    // - Save to database (Supabase/PostgreSQL)
    // - Send to CRM (HubSpot/Salesforce)
    // - Send to webhook (Zapier/n8n)
    
    // Log the submission (remove in production or use proper logging)
    console.log("Form submission received:", {
      name: formData.name,
      practiceName: formData.practiceName,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      projectType: formData.projectType,
      timestamp: new Date().toISOString(),
    });
    
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll be in touch within 1 business day.",
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
