import Link from "next/link";
import Image from "next/image";
import { StickyHeader, MobileStickyBar } from "@/components/landing";
import { portfolioContent } from "@/content/plasticSurgeryWebDesign";

export const metadata = {
  title: "Website Design Portfolio | Plastic Surgery & Medical | SERPreme",
  description:
    "Explore our website design portfolio for plastic surgery and medical aesthetics. Conversion-focused templates built for patient trust.",
};

export default function PortfolioPage() {
  return (
    <>
      <StickyHeader />
      <MobileStickyBar />

      <main>
        {/* Hero */}
        <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-3xl" />
          </div>
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="section-container relative z-10">
            <Link
              href="/services/plastic-surgery-web-design"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 text-sm font-medium mb-8 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Plastic Surgery Web Design
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-white leading-tight mb-6 max-w-4xl">
              {portfolioContent.headline}
            </h1>
            <p className="text-lg md:text-xl text-secondary-300 max-w-2xl">
              {portfolioContent.subheadline}
            </p>
          </div>
        </section>

        {/* Template Cards */}
        <section className="py-16 md:py-24 bg-white">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioContent.templates.map((template, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl border border-secondary-200 overflow-hidden shadow-lg hover:shadow-xl hover:border-primary-200 transition-all duration-300"
                >
                  <div className="relative flex justify-center bg-secondary-100 overflow-hidden">
                    <Image
                      src={template.image}
                      alt={template.name}
                      width={320}
                      height={320}
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-secondary-800 mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm font-medium text-primary-600 mb-3">
                      {template.tagline}
                    </p>
                    <p className="text-secondary-600 text-sm leading-relaxed mb-6">
                      {template.description}
                    </p>
                    <a
                      href={template.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                      style={{ backgroundColor: "#DFA17E" }}
                    >
                      View Website
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
                Ready for a custom design? We build premium websites tailored to your practice.
              </p>
              <Link
                href="/services/plastic-surgery-web-design#hero-form"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300"
                style={{ backgroundColor: "#DFA17E" }}
              >
                Get Your Free Quote
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
