import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plastic Surgery Web Design | Consult-Generating Websites | SERPreme",
  description:
    "Plastic surgery web design built to generate consults. Conversion-first UX, HIPAA-conscious infrastructure, and SEO-ready structure. Get a quote today.",
  openGraph: {
    title: "Plastic Surgery Web Design | SERPreme SEO",
    description:
      "Plastic surgery web design built to generate consults. Conversion-first UX, HIPAA-conscious infrastructure, and SEO-ready structure.",
    type: "website",
  },
};

export default function PlasticSurgeryWebDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
