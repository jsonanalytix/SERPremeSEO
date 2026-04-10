import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://serpremeseo.com";
const pageUrl = `${baseUrl}/services/medical-web-design`;
const siteName = "SERPreme SEO";

export const metadata: Metadata = {
  title: "Medical Practice Web Design | SERPreme SEO",
  description:
    "Medical website design built to grow your patient base. HIPAA conscious website infrastructure, conversion-focused design, and SEO-ready structure for therapy practices and clinics. Get a free quote.",
  keywords: [
    "medical web design",
    "medical website design",
    "healthcare web design",
    "doctor website design",
    "medical practice website",
    "HIPAA compliant website",
    "HIPAA compliant website design",
    "healthcare website design",
    "physician website design",
    "therapy website design",
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
    title: "Medical Practice Web Design | SERPreme SEO",
    description:
      "Medical website design built to grow your patient base. HIPAA conscious website infrastructure, conversion-focused design for therapy practices, clinics, and more.",
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
      "Medical website design built to grow your patient base. HIPAA conscious website infrastructure, conversion-focused design for therapy practices, clinics, and more.",
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
