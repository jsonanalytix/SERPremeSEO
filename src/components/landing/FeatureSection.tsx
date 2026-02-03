"use client";

import { useState, useEffect, useRef } from "react";
import { featuresContent } from "@/content/plasticSurgeryWebDesign";

// Feature icon component
const FeatureIcon = ({ type }: { type: string }) => {
  const icons: Record<string, JSX.Element> = {
    palette: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    ),
    shield: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
    users: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    ),
    search: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    ),
    zap: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
    calendar: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
    accessibility: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
    map: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    ),
    headphones: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 18v-6a9 9 0 0118 0v6 M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"
      />
    ),
  };

  return (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {icons[type] || icons.palette}
    </svg>
  );
};

export default function FeatureSection() {
  const [activeFeature, setActiveFeature] = useState<string>(
    featuresContent.features[0]?.id || ""
  );
  const [isNavSticky, setIsNavSticky] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current || !sectionRef.current) return;

      const navRect = navRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();

      // Make nav sticky when it reaches top of viewport
      // Stop being sticky when we scroll past the section
      const shouldBeSticky =
        sectionRect.top <= 80 && sectionRect.bottom > 150;
      setIsNavSticky(shouldBeSticky);

      // Update active feature based on scroll position
      const featureElements = featuresContent.features.map((f) =>
        document.getElementById(`feature-${f.id}`)
      );

      for (let i = featureElements.length - 1; i >= 0; i--) {
        const el = featureElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveFeature(featuresContent.features[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFeature = (id: string) => {
    const element = document.getElementById(`feature-${id}`);
    if (element) {
      const offset = 120; // Account for sticky nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-secondary-50 to-white" />
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-0 w-96 h-96 bg-primary-50/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary-100/50 rounded-full blur-2xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-6">
            Deep Dive
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-secondary-800 mb-6">
            {featuresContent.headline}
          </h2>
          <p className="text-lg md:text-xl text-secondary-500 max-w-2xl mx-auto">
            {featuresContent.subheadline}
          </p>
        </div>

        {/* Anchor Navigation */}
        <div
          ref={navRef}
          className={`transition-all duration-300 ${
            isNavSticky
              ? "fixed top-16 md:top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-lg shadow-secondary-200/20 border-b border-secondary-100"
              : "relative bg-white rounded-2xl shadow-lg shadow-secondary-200/30 border border-secondary-100"
          }`}
        >
          <div className={isNavSticky ? "section-container" : ""}>
            <nav className="flex overflow-x-auto py-2 px-2 gap-1 scrollbar-hide">
              {featuresContent.features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => scrollToFeature(feature.id)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeFeature === feature.id
                      ? "bg-primary-600 text-white shadow-md shadow-primary-600/30"
                      : "text-secondary-600 hover:bg-secondary-100 hover:text-secondary-800"
                  }`}
                >
                  {feature.navLabel}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Spacer when nav is sticky */}
        {isNavSticky && <div className="h-14" />}

        {/* Feature Deep-Dives */}
        <div className="mt-16 space-y-20 md:space-y-32">
          {featuresContent.features.map((feature, index) => (
            <div
              key={feature.id}
              id={`feature-${feature.id}`}
              className={`group flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-10 md:gap-16 items-center`}
            >
              {/* Icon/Visual Side */}
              <div className="w-full md:w-2/5 flex justify-center">
                <div className="relative">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-primary-600/20 rounded-3xl blur-2xl scale-110 group-hover:scale-125 transition-transform duration-500" />
                  
                  {/* Main icon container */}
                  <div className="relative w-52 h-52 md:w-72 md:h-72 rounded-3xl bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 flex items-center justify-center text-primary-600 shadow-xl shadow-primary-200/50 border border-primary-200/50 group-hover:shadow-2xl group-hover:shadow-primary-300/40 transition-all duration-500">
                    {/* Decorative inner ring */}
                    <div className="absolute inset-4 rounded-2xl border border-primary-300/30" />
                    
                    {/* Icon */}
                    <div className="scale-[1.75] md:scale-[2.5] text-primary-500 group-hover:text-primary-600 transition-colors duration-300">
                      <FeatureIcon type={feature.icon} />
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary-400/60" />
                    <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-primary-300/60" />
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-3/5">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-800 mb-5">
                  {feature.title}
                </h3>
                <p className="text-lg text-secondary-500 mb-8 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-4">
                  {feature.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      className="flex items-start gap-4 group/item"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center mt-0.5 group-hover/item:bg-green-500 transition-colors duration-300">
                        <svg
                          className="w-4 h-4 text-green-600 group-hover/item:text-white transition-colors duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-secondary-600 text-base md:text-lg">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Section CTA */}
        <div className="mt-20 text-center">
          <p className="text-secondary-500 mb-6 text-lg">Ready to experience the difference?</p>
          <a
            href="#hero-form"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-600/30"
          >
            Get Started Today
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
