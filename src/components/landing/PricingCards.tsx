"use client";

import { trackPackageClick } from "@/lib/tracking/events";
import { pricingContent } from "@/content/plasticSurgeryWebDesign";

interface PricingCardsProps {
  onSelectPackage?: (tier: "starter" | "compete" | "conquer") => void;
}

export default function PricingCards({ onSelectPackage }: PricingCardsProps) {
  const handlePackageClick = (tier: "starter" | "compete" | "conquer") => {
    trackPackageClick(tier);
    
    if (onSelectPackage) {
      onSelectPackage(tier);
    } else {
      // Default: scroll to form
      const heroForm = document.getElementById("hero-form");
      if (heroForm) {
        heroForm.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="pricing" className="relative py-20 md:py-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary-600/5 rounded-full blur-2xl" />
      </div>
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-300 text-sm font-medium rounded-full mb-6 backdrop-blur-sm border border-primary-500/20">
            Transparent Pricing
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-white mb-6">
            {pricingContent.headline}
          </h2>
          <p className="text-lg md:text-xl text-secondary-300 max-w-2xl mx-auto">
            Choose the perfect package for your practice&apos;s needs
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          {pricingContent.packages.map((pkg, index) => {
            const isPopular = index === 1; // Middle card (Compete) is popular
            
            return (
              <div
                key={pkg.tier}
                className={`group relative rounded-2xl transition-all duration-500 hover:-translate-y-2 ${
                  isPopular 
                    ? "md:-mt-4 md:mb-4" 
                    : ""
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-primary-500/30">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Card */}
                <div className={`relative h-full rounded-2xl backdrop-blur-md border overflow-hidden ${
                  isPopular
                    ? "bg-gradient-to-br from-white/15 to-white/5 border-primary-400/40 shadow-xl shadow-primary-500/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}>
                  {/* Glow Effect for Popular */}
                  {isPopular && (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 to-transparent" />
                  )}
                  
                  <div className="relative p-6 md:p-8 lg:p-10">
                    {/* Package Header */}
                    <div className="text-center mb-8">
                      <h3 className={`text-lg font-semibold mb-4 ${
                        isPopular ? "text-primary-300" : "text-secondary-300"
                      }`}>
                        {pkg.name}
                      </h3>
                      <div className="flex items-baseline justify-center">
                        <span className={`text-5xl md:text-6xl font-light ${
                          isPopular ? "text-white" : "text-white/90"
                        }`}>
                          {pkg.price}
                        </span>
                      </div>
                      {/* Decorative line */}
                      <div className={`w-16 h-1 mx-auto mt-6 rounded-full ${
                        isPopular 
                          ? "bg-gradient-to-r from-primary-400 to-primary-500" 
                          : "bg-white/20"
                      }`} />
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4">
                      {/* Pages as first item */}
                      <li className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          isPopular ? "bg-primary-500/30" : "bg-white/10"
                        }`}>
                          <svg className={`w-3 h-3 ${isPopular ? "text-primary-300" : "text-primary-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white/90 font-medium">
                          {pkg.pages}
                        </span>
                      </li>
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                            isPopular ? "bg-primary-500/30" : "bg-white/10"
                          }`}>
                            <svg className={`w-3 h-3 ${isPopular ? "text-primary-300" : "text-primary-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-white/80">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Card CTA Button */}
                    <button
                      onClick={() => handlePackageClick(pkg.tier as "starter" | "compete" | "conquer")}
                      className={`w-full mt-8 py-3.5 rounded-xl font-semibold transition-all duration-300 ${
                        isPopular
                          ? "bg-white text-secondary-900 hover:bg-primary-50 hover:scale-[1.02] shadow-lg shadow-black/20"
                          : "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30"
                      }`}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-secondary-400 mb-6 text-base">
            Not sure which package is right for you?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#hero-form"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-secondary-900 font-semibold rounded-full hover:bg-primary-50 hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20"
            >
              Get A Custom Quote
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button
              onClick={() => {
                const heroForm = document.getElementById("hero-form");
                if (heroForm) {
                  heroForm.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-4 text-white/80 font-medium hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              View Our Portfolio
            </button>
          </div>
        </div>

        {/* Included Note */}
        {pricingContent.includedNote && (
          <p className="text-center text-sm text-secondary-400 mt-10 max-w-3xl mx-auto">
            {pricingContent.includedNote}
          </p>
        )}
      </div>
    </section>
  );
}
