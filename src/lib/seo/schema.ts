// SEO Schema Markup Utilities
// Provides structured data for search engines

import { faqContent } from "@/content/plasticSurgeryWebDesign";

/**
 * Generate FAQPage schema markup
 * Used for FAQ rich results in search
 */
export function generateFAQPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqContent.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate Service schema markup for Plastic Surgery Web Design
 */
export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Plastic Surgery Web Design",
    description:
      "Premium web design services for plastic surgery practices. HIPAA-conscious infrastructure, conversion-focused design, and SEO-ready structure built to generate consult requests.",
    provider: {
      "@type": "Organization",
      name: "SERPreme SEO",
      url: "https://serpremeseo.com",
      logo: "https://serpremeseo.com/brand/serpremeseo-logo.png",
      sameAs: [
        // Add social media URLs if available
      ],
    },
    serviceType: "Web Design",
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "2000",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "2000",
        priceCurrency: "USD",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: 1,
          unitCode: "C62", // unit code for "one"
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "10",
    },
  };
}

/**
 * Generate Organization schema markup for SERPreme SEO
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SERPreme SEO",
    url: "https://serpremeseo.com",
    logo: "https://serpremeseo.com/brand/serpremeseo-logo.png",
    description:
      "Premium web design and SEO services for healthcare practices. HIPAA-conscious, conversion-focused, and built for results.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Southern New Hampshire",
      addressRegion: "NH",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-978-219-9301",
      contactType: "Customer Service",
      areaServed: "US",
      availableLanguage: "English",
    },
    sameAs: [
      // Add social media URLs if available
    ],
  };
}

/**
 * Generate BreadcrumbList schema markup
 */
export function generateBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://serpremeseo.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://serpremeseo.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Plastic Surgery Web Design",
        item: "https://serpremeseo.com/services/plastic-surgery-web-design",
      },
    ],
  };
}
