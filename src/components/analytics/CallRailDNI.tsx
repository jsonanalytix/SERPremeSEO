"use client";

import Script from "next/script";

interface CallRailDNIProps {
  callRailId?: string;
}

/**
 * CallRail Dynamic Number Insertion (DNI) Component
 * 
 * This component loads CallRail DNI script for dynamic phone number swapping
 * based on traffic source, campaign, and other parameters.
 * 
 * Environment Variables Required:
 * - NEXT_PUBLIC_CALLRAIL_ID: CallRail Account ID (e.g., 123456789)
 * 
 * Usage:
 * Add <CallRailDNI /> to your root layout.tsx or page-specific layout
 * 
 * Phone numbers will be automatically swapped on elements with:
 * - class="callrail-number"
 * - data-callrail attribute
 */
export default function CallRailDNI({ callRailId }: CallRailDNIProps) {
  const accountId = callRailId || process.env.NEXT_PUBLIC_CALLRAIL_ID;

  // If no CallRail ID provided, don't render anything
  if (!accountId) {
    return null;
  }

  return (
    <Script
      id="callrail-dni"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,t,u,n,a,m){w['CallRailObject']=n;
          w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)};
          a=d.createElement(t),m=d.getElementsByTagName(t)[0];
          a.async=1;a.src=u;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://cdn.callrail.com/companies/${accountId}/12/swap.js','cr');
        `,
      }}
    />
  );
}
