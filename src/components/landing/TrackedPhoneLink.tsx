"use client";

import { trackPhoneClick } from "@/lib/tracking/events";
import { formatPhoneLink } from "@/lib/tracking/google-ads";

interface TrackedPhoneLinkProps {
  phoneNumber: string;
  clickLocation: "header" | "mobile_bar" | "inline";
  className?: string;
  children: React.ReactNode;
}

/**
 * Phone link component with automatic tracking
 * Tracks phone clicks for analytics and Google Ads conversions
 */
export default function TrackedPhoneLink({
  phoneNumber,
  clickLocation,
  className = "",
  children,
}: TrackedPhoneLinkProps) {
  const handleClick = () => {
    trackPhoneClick(clickLocation);
  };

  return (
    <a
      href={formatPhoneLink(phoneNumber)}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
