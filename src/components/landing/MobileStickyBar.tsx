"use client";

import { useState, useEffect } from "react";
import { trackPhoneClick } from "@/lib/tracking/events";
import { siteConfig } from "@/content/plasticSurgeryWebDesign";
import { formatPhoneLink } from "@/lib/tracking/google-ads";

interface MobileStickyBarProps {
  onGetQuoteClick?: () => void;
}

export default function MobileStickyBar({ onGetQuoteClick }: MobileStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show bar after hero section scrolls out of view (approximately 600px)
      const shouldShow = window.scrollY > 600;
      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check initial position
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePhoneClick = () => {
    trackPhoneClick("mobile_bar");
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

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-secondary-200 shadow-lg transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ height: "60px" }}
      suppressHydrationWarning
    >
      <div className="flex h-full">
        {/* Call Now Button */}
        <a
          href={formatPhoneLink(siteConfig.phoneNumber)}
          onClick={handlePhoneClick}
          className="flex-1 flex items-center justify-center gap-2 bg-secondary-900 text-white font-semibold text-base hover:bg-secondary-800 transition-colors"
        >
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
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          Call Now
        </a>

        {/* Get Quote Button */}
        <button
          onClick={handleGetQuoteClick}
          className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold text-base hover:bg-primary-700 transition-colors"
        >
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Get Quote
        </button>
      </div>
    </div>
  );
}
