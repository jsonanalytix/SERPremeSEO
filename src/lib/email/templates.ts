/**
 * Email Templates for Lead Notifications
 * Contains HTML and plain text templates for client and lead emails
 * 
 * @created 2026-02-04 - Initial email templates
 */

export interface LeadEmailData {
  name: string;
  practiceName: string;
  email: string;
  phone: string;
  website?: string | null;
  projectType?: string | null;
  leadId?: string;
  submittedAt?: string;
}

interface EmailContent {
  subject: string;
  html: string;
  text: string;
}

/**
 * Formats project type for display
 */
function formatProjectType(projectType: string | null | undefined): string {
  if (!projectType) return "Not specified";
  
  const typeMap: Record<string, string> = {
    new_website: "New Website",
    redesign: "Website Redesign",
    seo: "SEO Services",
    both: "Website + SEO",
    other: "Other",
  };
  
  return typeMap[projectType] || projectType;
}

/**
 * Client notification email - sent to khall@serpremeseo.com
 */
export function getClientNotificationEmail(lead: LeadEmailData): EmailContent {
  const submittedAt = lead.submittedAt || new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "short",
  });

  const subject = `🎯 New Lead: ${lead.practiceName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Notification</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d3b66 0%, #1a5a96 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                🎯 New Lead Received
              </h1>
              <p style="margin: 8px 0 0; color: rgba(255, 255, 255, 0.85); font-size: 14px;">
                ${submittedAt}
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 24px; color: #0d3b66; font-size: 20px; font-weight: 600;">
                ${lead.practiceName}
              </h2>
              
              <!-- Lead Details -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7;">
                    <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Contact Name</span>
                    <p style="margin: 4px 0 0; color: #18181b; font-size: 16px; font-weight: 500;">${lead.name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7;">
                    <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                    <p style="margin: 4px 0 0;">
                      <a href="mailto:${lead.email}" style="color: #0891b2; font-size: 16px; font-weight: 500; text-decoration: none;">${lead.email}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7;">
                    <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</span>
                    <p style="margin: 4px 0 0;">
                      <a href="tel:${lead.phone.replace(/\D/g, "")}" style="color: #0891b2; font-size: 16px; font-weight: 500; text-decoration: none;">${lead.phone}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7;">
                    <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Current Website</span>
                    <p style="margin: 4px 0 0; color: #18181b; font-size: 16px;">
                      ${lead.website ? `<a href="${lead.website}" style="color: #0891b2; text-decoration: none;">${lead.website}</a>` : "Not provided"}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Project Type</span>
                    <p style="margin: 4px 0 0; color: #18181b; font-size: 16px; font-weight: 500;">${formatProjectType(lead.projectType)}</p>
                  </td>
                </tr>
              </table>
              
              <!-- CTA -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${lead.email}?subject=Re: Your%20SERPreme%20SEO%20Inquiry" 
                   style="display: inline-block; background-color: #DFA17E; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                  Reply to Lead
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f4f4f5; padding: 24px 40px; text-align: center;">
              <p style="margin: 0; color: #71717a; font-size: 12px;">
                ${lead.leadId ? `Lead ID: ${lead.leadId}` : ""}
              </p>
              <p style="margin: 8px 0 0; color: #a1a1aa; font-size: 11px;">
                SERPreme SEO Lead Notification System
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
NEW LEAD RECEIVED
${submittedAt}

Practice: ${lead.practiceName}
Contact: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone}
Website: ${lead.website || "Not provided"}
Project Type: ${formatProjectType(lead.projectType)}

${lead.leadId ? `Lead ID: ${lead.leadId}` : ""}
---
SERPreme SEO Lead Notification System
  `.trim();

  return { subject, html, text };
}

// Quiz link for lead confirmation email
const QUIZ_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSc6K_AJgbrogpTO20939049l96Vr65eKrWi_UcX8KPsZwatnw/viewform";

/**
 * Lead confirmation email - sent to the person who submitted the form
 * @updated 2026-02-11 - Updated copy per client (Kirsten)
 */
export function getLeadConfirmationEmail(lead: LeadEmailData): EmailContent {
  const subject = "Thanks for Reaching Out! We've Got Your Message 💬";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thanks for Reaching Out!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d3b66 0%, #1a5a96 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                Thanks for Reaching Out!
              </h1>
              <p style="margin: 12px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">
                We've got your message 💬
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #3f3f46; font-size: 16px; line-height: 1.6;">
                Hi there,
              </p>
              
              <p style="margin: 0 0 20px; color: #3f3f46; font-size: 16px; line-height: 1.6;">
                Thanks so much for reaching out! I've received your message and will get back to you within 48 business hours.
              </p>
              
              <p style="margin: 0 0 20px; color: #3f3f46; font-size: 16px; line-height: 1.6;">
                In the meantime, I'd love to learn a little more about your business so I can give you the most helpful response possible. If you have a moment, please fill out this quick quiz here: <a href="${QUIZ_LINK}" style="color: #0891b2; font-weight: 500; text-decoration: underline;">Quiz Link</a>
              </p>
              
              <p style="margin: 0 0 20px; color: #3f3f46; font-size: 16px; line-height: 1.6;">
                It only takes a few minutes and helps me better understand your goals, challenges, and what you're looking to achieve.
              </p>
              
              <p style="margin: 0 0 20px; color: #3f3f46; font-size: 16px; line-height: 1.6;">
                Looking forward to connecting with you soon!
              </p>
              
              <!-- Signature -->
              <p style="margin: 0; color: #3f3f46; font-size: 16px; line-height: 1.6;">
                Warmly,
              </p>
              <p style="margin: 8px 0 0; color: #0d3b66; font-size: 16px; font-weight: 600;">
                Kirsten
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0d3b66; padding: 32px 40px; text-align: center;">
              <p style="margin: 0 0 8px; color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 500;">
                SERPreme SEO
              </p>
              <p style="margin: 0; color: rgba(255, 255, 255, 0.7); font-size: 12px;">
                Premium Web Design for Plastic Surgery Practices
              </p>
              <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.2);">
                <p style="margin: 0; color: rgba(255, 255, 255, 0.5); font-size: 11px;">
                  This email was sent because you submitted an inquiry on our website.
                </p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
Hi there,

Thanks so much for reaching out! I've received your message and will get back to you within 48 business hours.

In the meantime, I'd love to learn a little more about your business so I can give you the most helpful response possible. If you have a moment, please fill out this quick quiz here:

${QUIZ_LINK}

It only takes a few minutes and helps me better understand your goals, challenges, and what you're looking to achieve.

Looking forward to connecting with you soon!

Warmly,
Kirsten

---
SERPreme SEO
Premium Web Design for Plastic Surgery Practices

This email was sent because you submitted an inquiry on our website.
  `.trim();

  return { subject, html, text };
}
