import {
  HeroSection,
  StickyHeader,
  MobileStickyBar,
  PricingCards,
  FAQ,
  FeatureSection,
} from "@/components/landing";
import TrackedPhoneLink from "@/components/landing/TrackedPhoneLink";
import {
  problemSolutionContent,
  checklistContent,
  painPointsContent,
  metricsContent,
  comparisonContent,
  finalCtaContent,
  siteConfig,
} from "@/content/plasticSurgeryWebDesign";

// Icons for checklist section
const ChecklistIcon = ({ type }: { type: string }) => {
  const icons: Record<string, JSX.Element> = {
    zap: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    ),
    smartphone: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
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
    compass: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
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
    search: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
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
  };

  return (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {icons[type] || icons.zap}
    </svg>
  );
};

// Icons for Problem/Solution feature cards
const FeatureCardIcon = ({ type }: { type: string }) => {
  const icons: Record<string, JSX.Element> = {
    responsive: (
      // Desktop/mobile responsive icon
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    ada: (
      // ADA/accessibility icon (document with checkmark)
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    conversion: (
      // Lead generation / conversion icon (funnel/list)
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    seo: (
      // SEO icon (filter/sorting)
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
    ),
  };

  return icons[type] || icons.responsive;
};

export default function PlasticSurgeryWebDesignPage() {
  return (
    <>
      {/* Sticky Header */}
      <StickyHeader />

      {/* Mobile Sticky Bar */}
      <MobileStickyBar />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Problem/Solution Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="section-container">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-secondary-800 mb-6 leading-tight">
                {problemSolutionContent.headline}
              </h2>
              <p className="text-xl md:text-2xl text-primary-600 font-medium mb-8">
                {problemSolutionContent.subheadline}
              </p>
              <p className="text-base md:text-lg text-secondary-500 leading-relaxed max-w-3xl mx-auto">
                {problemSolutionContent.painParagraph}
              </p>
            </div>

            {/* WE FIX THAT BY... Button */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex items-center px-8 py-3 bg-secondary-100 border border-secondary-200 rounded-sm">
                <span className="text-sm md:text-base font-semibold text-secondary-700 tracking-wide">
                  WE FIX THAT BY...
                </span>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
              {problemSolutionContent.featureCards.map((card, index) => (
                <div
                  key={index}
                  className="flex items-center gap-5 p-6 bg-white border border-secondary-200 rounded-sm hover:shadow-md transition-shadow"
                >
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 bg-primary-50 border border-primary-100 rounded-sm flex items-center justify-center text-primary-600">
                    <FeatureCardIcon type={card.icon} />
                  </div>
                  {/* Title */}
                  <h3 className="text-base md:text-lg font-semibold text-primary-700 leading-snug">
                    {card.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Closing Paragraph */}
            <p className="text-base md:text-lg text-secondary-500 leading-relaxed max-w-3xl mx-auto text-center">
              {problemSolutionContent.closingParagraph}
            </p>
          </div>
        </section>

        {/* Checklist Section - Ultra Aesthetic */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900" />
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-600/5 rounded-full blur-2xl" />
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
                The Difference Is Clear
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-white mb-6 leading-tight">
                {checklistContent.headline}
              </h2>
              <p className="text-lg md:text-xl text-secondary-300 max-w-2xl mx-auto">
                Every detail designed to convert visitors into consultations
              </p>
            </div>

            {/* Feature Cards - Bento Grid Style */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              {checklistContent.items.map((item, index) => (
                <div
                  key={index}
                  className={`group relative p-6 md:p-8 rounded-2xl backdrop-blur-md border transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 ${
                    index === 0 || index === 6
                      ? "bg-gradient-to-br from-primary-500/20 to-primary-600/10 border-primary-500/30 hover:border-primary-400/50 hover:shadow-lg hover:shadow-primary-500/20"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/5"
                  }`}
                >
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-400/0 to-primary-600/0 group-hover:from-primary-400/5 group-hover:to-primary-600/10 transition-all duration-500" />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 ${
                      index === 0 || index === 6
                        ? "bg-primary-500/30 text-primary-300"
                        : "bg-white/10 text-primary-400 group-hover:bg-primary-500/20 group-hover:text-primary-300"
                    }`}>
                      <ChecklistIcon type={item.icon} />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-3 group-hover:text-primary-200 transition-colors">
                      {item.label}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-secondary-400 text-sm md:text-base leading-relaxed group-hover:text-secondary-300 transition-colors">
                      {item.description}
                    </p>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary-400/50 group-hover:bg-primary-400 transition-colors" />
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <a
                href="#hero-form"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-secondary-900 font-semibold rounded-full hover:bg-primary-50 hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20"
              >
                See What We Can Build For You
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Pain Points Q&A Section - Vertical Timeline Narrative Style */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-secondary-900 via-secondary-800 to-secondary-900">
          {/* Dark Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-primary-600/20 to-transparent" />
            <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-primary-500/20 to-transparent" />
          </div>

          <div className="section-container relative z-10">
            {/* Section Header - Light on Dark */}
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block px-5 py-2 bg-primary-500/20 text-primary-300 text-sm font-semibold rounded-full mb-6 tracking-wide backdrop-blur-sm border border-primary-500/30">
                We Get It
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-white mb-6 leading-tight">
                {painPointsContent.headline}
              </h2>
              <p className="text-lg md:text-xl text-secondary-300 max-w-2xl mx-auto leading-relaxed">
                These frustrations are more common than you think. Here&apos;s how we solve each one.
              </p>
            </div>

            {/* Vertical Timeline Layout - Completely Different from Comparison */}
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Vertical Timeline Line */}
                <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-primary-400 to-primary-500 rounded-full" />
                
                {/* Timeline Items */}
                <div className="space-y-12 md:space-y-16">
                  {painPointsContent.items.map((item, index) => (
                    <div key={index} className="relative flex items-start gap-6 md:gap-8">
                      {/* Timeline Number Badge */}
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-xl border-4 border-secondary-800">
                          <span className="text-2xl md:text-3xl font-bold text-white">
                            {index + 1}
                          </span>
                        </div>
                        {/* Connecting Line from Number */}
                        <div className="hidden md:block absolute left-1/2 top-full w-0.5 h-12 bg-gradient-to-b from-primary-400 to-transparent -translate-x-1/2" />
                      </div>

                      {/* Content Card - Dark Theme */}
                      <div className="flex-1 pt-2">
                        <div className="bg-secondary-800/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-secondary-700/50 hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20">
                          {/* Problem Statement */}
                          <div className="mb-6 pb-6 border-b border-secondary-700/50">
                            <div className="flex items-start gap-4 mb-3">
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary-700/50 flex items-center justify-center">
                                <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                              </div>
                              <div className="flex-1">
                                <p className="text-xl md:text-2xl font-semibold text-white leading-snug">
                                  {item.pain}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Solution Statement */}
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                              <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="text-base md:text-lg text-secondary-200 leading-relaxed">
                                {item.response}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA - Light Button on Dark Background */}
            <div className="mt-20 text-center">
              <p className="text-lg md:text-xl text-secondary-300 mb-8 font-medium">
                Ready to solve these problems?
              </p>
              <a
                href="#hero-form"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-secondary-900 font-semibold rounded-full hover:bg-primary-50 hover:scale-105 transition-all duration-300 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-black/40"
              >
                Let&apos;s Talk Solutions
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Metrics Band - Enhanced Design */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800" />
          
          {/* Decorative Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Animated Gradient Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-300/10 rounded-full blur-2xl" />
          </div>

          {/* Top Accent Border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="section-container relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6 tracking-wide border border-white/20">
                Proven Results
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-white mb-4">
                {metricsContent.headline}
              </h2>
            </div>

            {/* Enhanced Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {metricsContent.metrics.map((metric, index) => {
                // Icons for each metric type
                const icons = [
                  // Form fills and phone calls
                  <svg key="form" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>,
                  // Google Business Profile calls
                  <svg key="phone" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>,
                  // Website visits
                  <svg key="visits" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>,
                ];

                return (
                  <div
                    key={index}
                    className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary-900/50"
                  >
                    {/* Glow Effect on Hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-400/0 to-primary-600/0 group-hover:from-primary-400/20 group-hover:to-primary-600/20 transition-all duration-500 -z-10 blur-xl" />
                    
                    {/* Icon Container */}
                    <div className="flex justify-center mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                        {icons[index]}
                      </div>
                    </div>

                    {/* Metric Value */}
                    <div className="text-center mb-4">
                      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                        {metric.value}
                      </div>
                      <div className="h-1 w-16 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto rounded-full" />
                    </div>

                    {/* Metric Label */}
                    <p className="text-center text-white/90 text-sm md:text-base leading-relaxed font-medium group-hover:text-white transition-colors duration-300">
                      {metric.label}
                    </p>

                    {/* Corner Accent */}
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/40 group-hover:bg-white/60 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white/50 transition-colors duration-300" />
                  </div>
                );
              })}
            </div>

            {/* Bottom Accent Border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
        </section>

        {/* Comparison Section - Two Column Layout */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-white via-secondary-50/50 to-white">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-0 w-72 h-72 bg-primary-100/40 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary-50/60 rounded-full blur-3xl" />
          </div>

          <div className="section-container relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-6">
                See The Difference
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-secondary-800 mb-6">
                {comparisonContent.headline}
              </h2>
              <p className="text-lg md:text-xl text-secondary-500 max-w-2xl mx-auto">
                {comparisonContent.subheadline}
              </p>
            </div>

            {/* Two Column Comparison */}
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* SERPreme Column */}
                <div className="relative">
                  {/* Column Header */}
                  <div className="sticky top-4 z-20 mb-6">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full shadow-lg shadow-primary-600/30">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-bold text-lg">SERPreme</span>
                    </div>
                  </div>

                  {/* SERPreme Features List */}
                  <div className="space-y-4">
                    {comparisonContent.features.map((row, index) => (
                      <div
                        key={index}
                        className="group p-5 bg-gradient-to-br from-primary-50 to-white rounded-xl border-2 border-primary-200 hover:border-primary-400 hover:shadow-lg hover:shadow-primary-100 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="block text-xs font-semibold uppercase tracking-wider text-primary-600 mb-1">
                              {row.feature}
                            </span>
                            <p className="text-base text-secondary-700 font-medium leading-relaxed">
                              {row.serpreme}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Other Agencies Column */}
                <div className="relative">
                  {/* Column Header */}
                  <div className="sticky top-4 z-20 mb-6">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-secondary-200 text-secondary-600 rounded-full shadow-md">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="font-bold text-lg">Other Agencies</span>
                    </div>
                  </div>

                  {/* Other Agencies Features List */}
                  <div className="space-y-4">
                    {comparisonContent.features.map((row, index) => (
                      <div
                        key={index}
                        className="p-5 bg-gradient-to-br from-secondary-50 to-white rounded-xl border border-secondary-200"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-50 text-red-400 flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <span className="block text-xs font-semibold uppercase tracking-wider text-secondary-400 mb-1">
                              {row.feature}
                            </span>
                            <p className="text-base text-secondary-500 leading-relaxed">
                              {row.others}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <p className="text-secondary-500 mb-6 text-lg">The choice is clear.</p>
              <a
                href="#hero-form"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-600/30"
              >
                Choose Premium Quality
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Feature Deep-Dives Section */}
        <FeatureSection />

        {/* Pricing Section */}
        <PricingCards />

        {/* About Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-secondary-50/50 to-white" />
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-0 w-72 h-72 bg-primary-50/40 rounded-full blur-3xl" />
          </div>

          {/* Diagonal Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="section-container relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-6">
                The Team Behind Your Success
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-secondary-800 mb-6">
                Meet the Dynamic SEO & Web<br className="hidden md:block" /> Developer Duo in Southern NH
              </h2>
              <p className="text-lg md:text-xl text-secondary-500 max-w-2xl mx-auto">
                A husband-and-wife team dedicated to helping healthcare practices thrive online
              </p>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
              {/* Kirsten Card */}
              <div className="group">
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  {/* Image glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary-400/20 to-primary-600/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Image container */}
                  <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-xl shadow-secondary-200/50 group-hover:shadow-2xl group-hover:shadow-primary-200/30 transition-all duration-500">
                    <img 
                      src="/kirsten.png" 
                      alt="Kirsten Hall - SEO & Digital Marketing Expert"
                      className="w-full aspect-[4/5] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary-600 mb-3">
                    Kirsten Hall
                  </h3>
                  <p className="text-secondary-600 leading-relaxed">
                    Founding Partner and loving wife Kirsten Hall, a seasoned SEO digital marketing expert with a master&apos;s degree from Northeastern (go Huskies!), uses her knowledge in business analytics and a variety of tools to discover the path forward your business needs to take to increase clientele.
                  </p>
                </div>
              </div>

              {/* Josh Card */}
              <div className="group">
                <div className="relative mb-6 overflow-hidden rounded-2xl">
                  {/* Image glow effect */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary-400/20 to-primary-600/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Image container */}
                  <div className="relative overflow-hidden rounded-2xl border-4 border-white shadow-xl shadow-secondary-200/50 group-hover:shadow-2xl group-hover:shadow-primary-200/30 transition-all duration-500">
                    <img 
                      src="/josh.png" 
                      alt="Josh Hall - Web Developer & CRO Specialist"
                      className="w-full aspect-[4/5] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary-600 mb-3">
                    Josh Hall
                  </h3>
                  <p className="text-secondary-600 leading-relaxed">
                    Founding Partner and helping husband Josh Hall, a self-taught and highly driven software engineer, uses his experience and quick research skills to help find solutions in client websites to achieve better performance and improve CRO (how your clients find you!)
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 text-center">
              <p className="text-secondary-500 mb-6 text-lg">Ready to work with a team that truly cares?</p>
              <a
                href="#hero-form"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-600/30"
              >
                Start a Conversation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Final CTA Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900" />
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary-600/5 rounded-full blur-2xl" />
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary-600/5 rounded-full blur-2xl" />
          </div>

          {/* Animated Gradient Lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
            <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
          </div>

          <div className="section-container relative z-10 text-center">
            {/* Badge */}
            <span className="inline-block px-4 py-2 bg-primary-500/20 text-primary-300 text-sm font-medium rounded-full mb-8 backdrop-blur-sm border border-primary-500/20">
              Ready to Transform Your Practice?
            </span>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-white mb-6 max-w-4xl mx-auto leading-tight">
              {finalCtaContent.headline}
            </h2>
            
            {/* Body */}
            <p className="text-lg md:text-xl text-secondary-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              {finalCtaContent.body}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="#hero-form"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-secondary-900 font-semibold rounded-full hover:bg-primary-50 hover:scale-105 transition-all duration-300 shadow-lg shadow-black/20"
              >
                {finalCtaContent.ctaPrimary}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              {/* Phone CTA */}
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-secondary-400 text-sm mb-1">
                  {finalCtaContent.phoneLabel}
                </span>
                <TrackedPhoneLink
                  phoneNumber={siteConfig.phoneNumber}
                  clickLocation="inline"
                  className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-white hover:text-primary-300 transition-colors"
                >
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {siteConfig.phoneNumber}
                </TrackedPhoneLink>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-10 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-center gap-8 text-secondary-400 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  HIPAA Conscious
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  ADA Friendly
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Fast Performance
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  SEO Optimized
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer spacer for mobile sticky bar */}
      <div className="h-16 md:hidden" />

      {/* Structured Data - Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
            },
          }),
        }}
      />

      {/* Structured Data - Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      {/* Structured Data - Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
    </>
  );
}
