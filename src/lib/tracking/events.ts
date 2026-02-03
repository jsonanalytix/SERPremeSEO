// GA4 Event Tracking Helpers

type FormLocation = "hero" | "final_cta";
type ClickLocation = "header" | "mobile_bar" | "inline";
type PackageTier = "starter" | "compete" | "conquer";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      action: string,
      params: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track form submission events
 */
export function trackFormSubmit(
  formLocation: FormLocation,
  practiceName?: string
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "lead_form_submit", {
      form_location: formLocation,
      practice_name: practiceName || "unknown",
    });
  }
}

/**
 * Track phone click events
 */
export function trackPhoneClick(clickLocation: ClickLocation) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "phone_click", {
      click_location: clickLocation,
    });
  }
}

/**
 * Track package CTA clicks
 */
export function trackPackageClick(packageTier: PackageTier) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "package_cta_click", {
      package_tier: packageTier,
    });
  }
}

/**
 * Track FAQ expansion events
 */
export function trackFAQExpand(questionText: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "faq_expand", {
      question: questionText,
    });
  }
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percentage: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "scroll_depth", {
      percent_scrolled: percentage,
    });
  }
}
