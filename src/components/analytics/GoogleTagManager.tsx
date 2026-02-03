"use client";

import Script from "next/script";

interface GoogleTagManagerProps {
  gtmId?: string;
  ga4Id?: string;
}

/**
 * Google Tag Manager and GA4 Integration Component
 * 
 * This component loads GTM and GA4 scripts for analytics tracking.
 * 
 * Environment Variables Required:
 * - NEXT_PUBLIC_GTM_ID: Google Tag Manager Container ID (e.g., GTM-XXXXXXX)
 * - NEXT_PUBLIC_GA4_ID: Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX)
 * 
 * Usage:
 * Add <GoogleTagManager /> to your root layout.tsx
 */
export default function GoogleTagManager({ 
  gtmId, 
  ga4Id 
}: GoogleTagManagerProps) {
  const gtmContainerId = gtmId || process.env.NEXT_PUBLIC_GTM_ID;
  const ga4MeasurementId = ga4Id || process.env.NEXT_PUBLIC_GA4_ID;

  // If no IDs provided, don't render anything
  if (!gtmContainerId && !ga4MeasurementId) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager */}
      {gtmContainerId && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmContainerId}');
              `,
            }}
          />
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmContainerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        </>
      )}

      {/* Google Analytics 4 */}
      {ga4MeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4MeasurementId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
}
