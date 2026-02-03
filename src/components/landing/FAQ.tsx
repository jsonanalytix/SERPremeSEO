"use client";

import { useState } from "react";
import { trackFAQExpand } from "@/lib/tracking/events";
import { faqContent } from "@/content/plasticSurgeryWebDesign";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className={`group rounded-2xl transition-all duration-300 ${
      isOpen 
        ? "bg-gradient-to-br from-primary-50 to-white border-primary-200 shadow-lg shadow-primary-100/50" 
        : "bg-white border-secondary-200 hover:border-primary-200 hover:shadow-md"
    } border`}>
      <button
        onClick={onToggle}
        className="w-full p-5 md:p-6 flex items-center justify-between text-left transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4 pr-4">
          {/* Question Icon */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? "bg-primary-600 text-white" 
              : "bg-primary-100 text-primary-600 group-hover:bg-primary-200"
          }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className={`text-base md:text-lg font-semibold transition-colors ${
            isOpen ? "text-primary-700" : "text-secondary-800 group-hover:text-primary-700"
          }`}>
            {question}
          </span>
        </div>
        <span
          className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
            isOpen 
              ? "bg-primary-600 rotate-180" 
              : "bg-secondary-100 group-hover:bg-primary-100"
          }`}
        >
          <svg
            className={`w-5 h-5 transition-colors ${
              isOpen ? "text-white" : "text-secondary-600 group-hover:text-primary-600"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[4.5rem] md:pl-[5rem]">
          <p className="text-secondary-600 leading-relaxed text-base">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number, question: string) => {
    if (openIndex !== index) {
      trackFAQExpand(question);
    }
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-secondary-50/50 to-white" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-primary-50/40 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-6">
              Got Questions?
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-secondary-800 mb-6">
              {faqContent.headline}
            </h2>
            <p className="text-lg md:text-xl text-secondary-500 max-w-xl mx-auto">
              Everything you need to know about our web design services
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqContent.items.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index, item.question)}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-secondary-500 mb-4">Still have questions?</p>
            <a
              href="#hero-form"
              className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Contact us directly
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* FAQPage Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
    </section>
  );
}
