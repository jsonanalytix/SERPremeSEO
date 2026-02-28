import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://serpremeseo.com";
const pageUrl = `${baseUrl}/services/healthcare-web-design`;
const siteName = "SERPreme SEO";

export const metadata: Metadata = {
  title: "Healthcare Web Design | Patient-Generating Websites | SERPreme",
  description:
    "Healthcare web design built to generate patient inquiries. Conversion-first UX, HIPAA-conscious infrastructure, and SEO-ready structure. Get a quote today.",
  keywords: [
    "healthcare web design",
    "medical website design",
    "healthcare website development",
    "medical practice web design",
    "HIPAA compliant website",
    "healthcare SEO",
    "patient acquisition website",
    "medical practice website",
    "doctor website design",
    "clinic website design",
  ],
  authors: [{ name: "SERPreme SEO" }],
  creator: "SERPreme SEO",
  publisher: "SERPreme SEO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Healthcare Web Design | Patient-Generating Websites | SERPreme",
    description:
      "Healthcare web design built to generate patient inquiries. Conversion-first UX, HIPAA-conscious infrastructure, and SEO-ready structure. Get a quote today.",
    url: pageUrl,
    siteName: siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/brand/serpremeseo-logo.png`,
        width: 1200,
        height: 630,
        alt: "SERPreme SEO - Healthcare Web Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Web Design | SERPreme SEO",
    description:
      "Healthcare web design built to generate patient inquiries. Conversion-first UX, HIPAA-conscious infrastructure, and SEO-ready structure.",
    images: [`${baseUrl}/brand/serpremeseo-logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
};

export default function HealthcareWebDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
