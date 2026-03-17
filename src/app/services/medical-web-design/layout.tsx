import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://serpremeseo.com";
const pageUrl = `${baseUrl}/services/medical-web-design`;
const siteName = "SERPreme SEO";

export const metadata: Metadata = {
  title: "Medical Practice Web Design | SERPreme SEO",
  description:
    "Medical practice web design built to grow your patient base. HIPAA-conscious infrastructure, conversion-focused design, and SEO-ready structure. Get a free quote.",
  keywords: [
    "medical web design",
    "medical website design",
    "healthcare web design",
    "doctor website design",
    "medical practice website",
    "HIPAA compliant website",
    "healthcare website design",
    "physician website design",
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
    title: "Medical Practice Web Design | SERPreme SEO",
    description:
      "Medical practice web design built to grow your patient base. HIPAA-conscious infrastructure, conversion-focused design, and SEO-ready structure.",
    url: pageUrl,
    siteName: siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/brand/serpremeseo-logo.png`,
        width: 1200,
        height: 630,
        alt: "SERPreme SEO - Medical Practice Web Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Practice Web Design | SERPreme SEO",
    description:
      "Medical practice web design built to grow your patient base. HIPAA-conscious infrastructure, conversion-focused design, and SEO-ready structure.",
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
};

export default function MedicalWebDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
