// A/B Test Variant Layout: No Pricing
// noindex to prevent Google from indexing the test page

import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://serpremeseo.com";
const pageUrl = `${baseUrl}/services/plastic-surgery-web-design/np`;

export const metadata: Metadata = {
  title: "Plastic Surgery Web Design | Consult-Generating Websites | SERPreme",
  description:
    "Plastic surgery web design built to generate consults. Conversion-first UX, HIPAA-conscious infrastructure, and SEO-ready structure. Get a quote today.",
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PlasticSurgeryWebDesignNoPricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
