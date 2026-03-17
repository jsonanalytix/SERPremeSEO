import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://serpremeseo.com";
const pageUrl = `${baseUrl}/services/medical-web-design/np`;

export const metadata: Metadata = {
  title: "Medical Practice Web Design | Patient-Generating Websites | SERPreme",
  description:
    "Medical practice web design built to grow your patient base. Conversion-first UX, HIPAA-conscious infrastructure, and SEO-ready structure. Get a free quote.",
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

export default function MedicalWebDesignNoPricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
