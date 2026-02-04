"use client";

import { useState, useEffect } from "react";
import { trackPhoneClick } from "@/lib/tracking/events";
import { siteConfig } from "@/content/plasticSurgeryWebDesign";
import { formatPhoneLink } from "@/lib/tracking/google-ads";

interface StickyHeaderProps {
  onGetQuoteClick?: () => void;
}

export default function StickyHeader({ onGetQuoteClick }: StickyHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      // Show header after scrolling 100px
      const shouldShow = window.scrollY > 100;
      setIsVisible(shouldShow);
    };

    // Check initial scroll position after mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePhoneClick = () => {
    trackPhoneClick("header");
  };

  const handleGetQuoteClick = () => {
    if (onGetQuoteClick) {
      onGetQuoteClick();
    } else {
      // Default: scroll to hero form
      const heroForm = document.getElementById("hero-form");
      if (heroForm) {
        heroForm.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Use consistent initial state to prevent hydration mismatch
  const headerClassName = `fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-md transition-transform duration-300 ${
    mounted && isVisible ? "translate-y-0" : "-translate-y-full"
  }`;

  return (
    <header
      className={headerClassName}
      suppressHydrationWarning
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 pt-2 md:pt-3">
            <a href="/" className="flex items-center">
              <img 
                src="/brand/SerpremeSEO-logo.png" 
                alt="SERPreme SEO" 
                className="h-48 md:h-64 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href={formatPhoneLink(siteConfig.phoneNumber)}
              onClick={handlePhoneClick}
              className="flex items-center text-secondary-700 hover:text-primary-600 transition-colors font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Now: {siteConfig.phoneNumber}
            </a>
            <button onClick={handleGetQuoteClick} className="btn-quote">
              Get Quote
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-3">
            <a
              href={formatPhoneLink(siteConfig.phoneNumber)}
              onClick={handlePhoneClick}
              className="p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
              aria-label="Call us"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </a>
            <button
              onClick={handleGetQuoteClick}
              className="btn-quote text-sm px-4 py-2"
            >
              Get Quote
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-secondary-600 hover:bg-secondary-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary-100">
            <nav className="flex flex-col space-y-3">
              <a
                href="#features"
                className="text-secondary-700 hover:text-primary-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-secondary-700 hover:text-primary-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-secondary-700 hover:text-primary-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
