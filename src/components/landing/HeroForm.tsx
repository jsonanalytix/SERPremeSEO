"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  leadFormSchema, 
  type LeadFormData, 
  projectTypeOptions 
} from "@/lib/validation/formSchema";
import { trackFormSubmit } from "@/lib/tracking/events";
import { heroContent } from "@/content/plasticSurgeryWebDesign";
import { handlePhoneInput } from "@/lib/utils/phoneFormatter";
import { captureAttribution, getAttributionData } from "@/lib/utils/attributionCapture";

interface HeroFormProps {
  formLocation?: "hero" | "final_cta";
  className?: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function HeroForm({ 
  formLocation = "hero",
  className = "" 
}: HeroFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  // Watch phone field for formatting
  const phoneValue = watch("phone");

  // Capture UTM parameters and click IDs on mount
  useEffect(() => {
    captureAttribution();
  }, []);

  const onSubmit = async (data: LeadFormData) => {
    setFormState("submitting");
    setErrorMessage("");
    
    try {
      // Track the form submission
      trackFormSubmit(formLocation, data.practiceName);
      
      // Get attribution data (UTMs, click IDs, session context)
      const attribution = getAttributionData();
      
      // Submit to API with form data and attribution
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          ...attribution,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to submit form");
      }

      // Success - reset form and show success state
      setFormState("success");
      reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setFormState("idle");
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setFormState("error");
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : "Something went wrong. Please try again or call us directly."
      );
    }
  };

  // Handle phone input formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = handlePhoneInput(e.target.value);
    setValue("phone", formatted, { shouldValidate: false });
  };

  // Show success state
  if (formState === "success") {
    return (
      <div className={`relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/20 border border-white/50 p-5 md:p-7 ${className}`}>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-serif italic text-secondary-800 mb-2">
            Thank You!
          </h3>
          <p className="text-sm text-secondary-600 mb-4">
            We've received your request and will be in touch within 1 business day.
          </p>
          <button
            onClick={() => setFormState("idle")}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium underline"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/20 border border-white/50 p-5 md:p-7 ${className}`}>
      {/* Corner accent */}
      <div className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-primary-500" />
      
      {/* Header */}
      <div className="mb-5 text-center">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-serif italic text-secondary-800 mb-2">
          {heroContent.formTitle}
        </h3>
        <div className="flex items-center justify-center gap-2 text-xs text-secondary-500">
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-100">
            <svg className="w-3 h-3 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-medium">{heroContent.formDisclaimer}</span>
        </div>
        {/* Decorative line */}
        <div className="w-12 h-0.5 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary-400 to-primary-500" />
      </div>

      {/* Error Message */}
      {formState === "error" && errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Submission Failed</p>
              <p className="text-xs text-red-700 mt-1">{errorMessage}</p>
            </div>
            <button
              onClick={() => {
                setFormState("idle");
                setErrorMessage("");
              }}
              className="text-red-600 hover:text-red-800"
              aria-label="Dismiss error"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        {/* Name Field */}
        <div className="group">
          <label htmlFor="name" className="block text-xs font-semibold text-secondary-700 mb-1">
            Your Name <span className="text-primary-500">*</span>
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              placeholder="Dr. Jane Smith"
              className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-secondary-900 placeholder:text-secondary-300 placeholder:font-light focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 ${
                errors.name 
                  ? "border-red-300 focus:border-red-500" 
                  : "border-secondary-200 focus:border-primary-500"
              }`}
              {...register("name")}
            />
            {errors.name && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Practice Name Field */}
        <div className="group">
          <label htmlFor="practiceName" className="block text-xs font-semibold text-secondary-700 mb-1">
            Practice Name <span className="text-primary-500">*</span>
          </label>
          <div className="relative">
            <input
              id="practiceName"
              type="text"
              placeholder="Elite Plastic Surgery"
              className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-secondary-900 placeholder:text-secondary-300 placeholder:font-light focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 ${
                errors.practiceName 
                  ? "border-red-300 focus:border-red-500" 
                  : "border-secondary-200 focus:border-primary-500"
              }`}
              {...register("practiceName")}
            />
          </div>
          {errors.practiceName && (
            <p className="mt-1 text-xs text-red-600">
              {errors.practiceName.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="group">
          <label htmlFor="email" className="block text-xs font-semibold text-secondary-700 mb-1">
            Email Address <span className="text-primary-500">*</span>
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="jane@eliteplasticsurgery.com"
              className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-secondary-900 placeholder:text-secondary-300 placeholder:font-light focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 ${
                errors.email 
                  ? "border-red-300 focus:border-red-500" 
                  : "border-secondary-200 focus:border-primary-500"
              }`}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="group">
          <label htmlFor="phone" className="block text-xs font-semibold text-secondary-700 mb-1">
            Phone Number <span className="text-primary-500">*</span>
          </label>
          <div className="relative">
            <input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={phoneValue || ""}
              onChange={handlePhoneChange}
              onBlur={(e) => {
                register("phone").onBlur(e);
                // Trigger validation after formatting
                setValue("phone", e.target.value, { shouldValidate: true });
              }}
              className={`w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-secondary-900 placeholder:text-secondary-300 placeholder:font-light focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-300 ${
                errors.phone 
                  ? "border-red-300 focus:border-red-500" 
                  : "border-secondary-200 focus:border-primary-500"
              }`}
            />
            {errors.phone && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Website Field (Optional) */}
        <div className="group">
          <label htmlFor="website" className="block text-xs font-semibold text-secondary-700 mb-1">
            Current Website <span className="text-secondary-400 font-normal">(optional)</span>
          </label>
          <input
            id="website"
            type="url"
            placeholder="https://yourpractice.com"
            className={`w-full px-3.5 py-2.5 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-900 placeholder:text-secondary-300 placeholder:font-light focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 ${
              errors.website ? "border-red-300" : ""
            }`}
            {...register("website")}
          />
          {errors.website && (
            <p className="mt-1 text-xs text-red-600">{errors.website.message}</p>
          )}
        </div>

        {/* Project Type Dropdown (Optional) */}
        <div className="group">
          <label htmlFor="projectType" className="block text-xs font-semibold text-secondary-700 mb-1">
            What do you need? <span className="text-secondary-400 font-normal">(optional)</span>
          </label>
          <select
            id="projectType"
            className="w-full px-3.5 py-2.5 bg-white border border-secondary-200 rounded-lg text-sm text-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230891b2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1rem',
            }}
            {...register("projectType")}
          >
            <option value="">Select an option...</option>
            {projectTypeOptions.map((option) => (
              <option key={option.value} value={option.value} className="text-secondary-900">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || formState === "submitting"}
          className="w-full mt-1 py-3 px-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 hover:shadow-lg hover:shadow-primary-600/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {(isSubmitting || formState === "submitting") ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Submitting...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Get Your Free Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          )}
        </button>
      </form>

      {/* HIPAA Privacy Notice - Prominently displayed */}
      <div className="mt-4 p-3 bg-secondary-50 border border-secondary-200 rounded-lg">
        <div className="flex items-start gap-2">
          <svg className="w-4 h-4 text-secondary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-[10px] text-secondary-600 leading-relaxed">
            <span className="font-semibold">HIPAA Notice:</span> {heroContent.formPrivacyNotice}
          </p>
        </div>
      </div>
    </div>
  );
}
