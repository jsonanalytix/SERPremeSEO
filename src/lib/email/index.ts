/**
 * Email Service using Resend
 * Handles sending notification and confirmation emails for lead submissions
 * 
 * @created 2026-02-04 - Initial email service implementation
 */

import { Resend } from "resend";
import { 
  getClientNotificationEmail, 
  getLeadConfirmationEmail,
  type LeadEmailData 
} from "./templates";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Client notification email address
const CLIENT_EMAIL = "khall@serpremeseo.com";

// Sender email (must be verified in Resend)
const FROM_EMAIL = "khall@serpremeseo.com";
const FROM_NAME = "SERPreme SEO";

export interface SendEmailResult {
  success: boolean;
  error?: string;
}

/**
 * Sends a notification email to the client when a new lead is submitted
 */
export async function sendClientNotification(
  leadData: LeadEmailData
): Promise<SendEmailResult> {
  try {
    const { subject, html, text } = getClientNotificationEmail(leadData);
    
    const { error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: CLIENT_EMAIL,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Failed to send client notification:", error);
      return { success: false, error: error.message };
    }

    console.log("Client notification sent successfully to:", CLIENT_EMAIL);
    return { success: true };
  } catch (error) {
    console.error("Error sending client notification:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}

/**
 * Sends a confirmation email to the lead after form submission
 */
export async function sendLeadConfirmation(
  leadData: LeadEmailData
): Promise<SendEmailResult> {
  try {
    const { subject, html, text } = getLeadConfirmationEmail(leadData);
    
    const { error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: leadData.email,
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Failed to send lead confirmation:", error);
      return { success: false, error: error.message };
    }

    console.log("Lead confirmation sent successfully to:", leadData.email);
    return { success: true };
  } catch (error) {
    console.error("Error sending lead confirmation:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}

/**
 * Sends both client notification and lead confirmation emails
 * Does not throw - logs errors and returns results
 */
export async function sendLeadEmails(
  leadData: LeadEmailData
): Promise<{ clientNotification: SendEmailResult; leadConfirmation: SendEmailResult }> {
  // Send both emails in parallel
  const [clientNotification, leadConfirmation] = await Promise.all([
    sendClientNotification(leadData),
    sendLeadConfirmation(leadData),
  ]);

  return { clientNotification, leadConfirmation };
}
