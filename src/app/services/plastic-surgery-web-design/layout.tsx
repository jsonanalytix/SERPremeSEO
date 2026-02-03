import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://serpremeseo.com";
const pageUrl = `${baseUrl}/services/plastic-surgery-web-design`;
const siteName = "SERPreme SEO";

export const metadata: Metadata = {
  title: "Plastic Surgery Web Design | Consult-Generating Websites | SERPreme",
  description:
    "Plastic surgery web design built to generate consults. Conversion-first UX, HIPAA-conscious infrastructure, and SEO-ready structure. Get a quote today.",
  keywords: [
    "plastic surgery web design",
    "plastic surgery website",
    "medical website design",
    "healthcare web design",
    "HIPAA compliant website",
    "plastic surgery SEO",
    "consultation website",
    "medical practice website",
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
    title: "Plastic Surgery Web Design | Consult-Generating Websites | SERPreme",
    description:
      "Plastic surgery web design built to generate consults. Conversion-first UX, HIPAA-conscious infrastructure, and SEO-ready structure. Get a quote today.",
    url: pageUrl,
    siteName: siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/brand/serpremeseo-logo.png`,
        width: 1200,
        height: 630,
        alt: "SERPreme SEO - Plastic Surgery Web Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plastic Surgery Web Design | SERPreme SEO",
    description:
      "Plastic surgery web design built to generate consults. Conversion-first UX, HIPAA-conscious infrastructure, and SEO-ready structure.",
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
  verification: {
    // Add verification codes if available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function PlasticSurgeryWebDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
