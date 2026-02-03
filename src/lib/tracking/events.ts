// GA4/GTM Event Tracking Helpers

type FormLocation = "hero" | "final_cta";
type ClickLocation = "header" | "mobile_bar" | "inline";
type PackageTier = "starter" | "compete" | "conquer";

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      action: string | Date,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Track form submission events
 * Sends to both GA4 (via gtag) and GTM (via dataLayer)
 */
export function trackFormSubmit(
  formLocation: FormLocation,
  practiceName?: string
) {
  if (typeof window === "undefined") return;

  const eventData = {
    event: "lead_form_submit",
    form_location: formLocation,
    practice_name: practiceName || "unknown",
  };

  // Send to GA4 via gtag
  if (window.gtag) {
    window.gtag("event", "lead_form_submit", {
      form_location: formLocation,
      practice_name: practiceName || "unknown",
    });
  }

  // Send to GTM via dataLayer
  if (window.dataLayer) {
    window.dataLayer.push(eventData);
  }
}

/**
 * Track phone click events
 * Sends to both GA4 (via gtag) and GTM (via dataLayer)
 * Also tracks as Google Ads call conversion if conversion label is configured
 */
export function trackPhoneClick(clickLocation: ClickLocation) {
  if (typeof window === "undefined") return;

  const eventData = {
    event: "phone_click",
    click_location: clickLocation,
  };

  // Send to GA4 via gtag
  if (window.gtag) {
    window.gtag("event", "phone_click", {
      click_location: clickLocation,
    });

    // Track as Google Ads call conversion if conversion label is available
    // The conversion label should be configured in GTM or set as environment variable
    const conversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_CONVERSION_LABEL;
    if (conversionLabel) {
      window.gtag("event", "conversion", {
        send_to: conversionLabel,
        event_category: "phone_call",
        event_label: clickLocation,
      });
    }
  }

  // Send to GTM via dataLayer
  if (window.dataLayer) {
    window.dataLayer.push(eventData);
  }
}

/**
 * Track package CTA clicks
 * Sends to both GA4 (via gtag) and GTM (via dataLayer)
 */
export function trackPackageClick(packageTier: PackageTier) {
  if (typeof window === "undefined") return;

  const eventData = {
    event: "package_cta_click",
    package_tier: packageTier,
  };

  // Send to GA4 via gtag
  if (window.gtag) {
    window.gtag("event", "package_cta_click", {
      package_tier: packageTier,
    });
  }

  // Send to GTM via dataLayer
  if (window.dataLayer) {
    window.dataLayer.push(eventData);
  }
}

/**
 * Track FAQ expansion events
 * Sends to both GA4 (via gtag) and GTM (via dataLayer)
 */
export function trackFAQExpand(questionText: string) {
  if (typeof window === "undefined") return;

  const eventData = {
    event: "faq_expand",
    question: questionText,
  };

  // Send to GA4 via gtag
  if (window.gtag) {
    window.gtag("event", "faq_expand", {
      question: questionText,
    });
  }

  // Send to GTM via dataLayer
  if (window.dataLayer) {
    window.dataLayer.push(eventData);
  }
}

/**
 * Track scroll depth
 * Sends to both GA4 (via gtag) and GTM (via dataLayer)
 */
export function trackScrollDepth(percentage: number) {
  if (typeof window === "undefined") return;

  const eventData = {
    event: "scroll_depth",
    percent_scrolled: percentage,
  };

  // Send to GA4 via gtag
  if (window.gtag) {
    window.gtag("event", "scroll_depth", {
      percent_scrolled: percentage,
    });
  }

  // Send to GTM via dataLayer
  if (window.dataLayer) {
    window.dataLayer.push(eventData);
  }
}
