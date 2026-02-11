"use client";

import { useEffect } from "react";
import Link from "next/link";
import HeroForm from "./HeroForm";
import { heroContent } from "@/content/plasticSurgeryWebDesign";

// Trust marker icons
const TrustIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "shield":
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      );
    case "chart":
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      );
    case "users":
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default function HeroSection() {
  // Scroll to top on mount to prevent browser scroll restoration
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Scroll to top immediately
    window.scrollTo(0, 0);
  }, []);

  const scrollToForm = () => {
    const heroForm = document.getElementById("hero-form");
    if (heroForm) {
      heroForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary-600/5 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-primary-600/5 rounded-full blur-2xl" />
      </div>

      {/* Animated Gradient Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
        <div className="absolute top-2/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="section-container relative z-10 py-12 md:py-20">
        {/* 55/45 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column - Copy */}
          <div className="lg:col-span-7 order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 backdrop-blur-sm border border-primary-500/20 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
              <span className="text-primary-300 text-sm font-medium">Premium Healthcare Web Design</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-white leading-[1.1] mb-6">
              {heroContent.headline.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="text-primary-400">{heroContent.headline.split(" ").slice(-2).join(" ")}</span>
            </h1>

            {/* H2 Subheadline */}
            <h2 className="text-xl sm:text-2xl md:text-3xl text-secondary-300 font-light mb-6 max-w-2xl">
              {heroContent.subheadline}
            </h2>

            {/* Body Paragraph */}
            <p className="text-base md:text-lg text-secondary-400 leading-relaxed mb-10 max-w-2xl">
              {heroContent.body}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={scrollToForm} 
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-secondary-900 font-semibold rounded-full hover:bg-primary-50 hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20"
              >
                {heroContent.ctaPrimary}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <Link
                href="/services/plastic-surgery-web-design/portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {heroContent.ctaSecondary}
              </Link>
            </div>

            {/* Trust Markers */}
            <div className="flex flex-wrap gap-6 md:gap-8">
              {heroContent.trustMarkers.map((marker, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary-500/20 backdrop-blur-sm text-primary-400 group-hover:bg-primary-500/30 group-hover:text-primary-300 transition-all duration-300">
                    <TrustIcon type={marker.icon} />
                  </div>
                  <span className="text-sm md:text-base font-medium text-secondary-300 group-hover:text-white transition-colors">
                    {marker.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div className="lg:col-span-5 order-2" id="hero-form">
            <div className="relative">
              {/* Form glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-3xl blur-2xl" />
              <HeroForm formLocation="hero" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade - subtle transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
    </section>
  );
}
