import { processContent as defaultProcessContent } from "@/content/healthcareWebDesign";

const StepIcon = ({ step }: { step: number }) => {
  const icons: Record<number, JSX.Element> = {
    1: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    2: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    3: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3.75 4.5v15" />
      </svg>
    ),
    4: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  };

  return icons[step] || icons[1];
};

interface ProcessSectionProps {
  content?: typeof defaultProcessContent;
}

export default function ProcessSection({ content = defaultProcessContent }: ProcessSectionProps) {
  return (
    <section id="process" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-white" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100/20 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-6">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-secondary-800 mb-6">
            {content.headline}
          </h2>
          <p className="text-lg md:text-xl text-secondary-500 max-w-2xl mx-auto">
            {content.subheadline}
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block max-w-5xl mx-auto">
          {/* Connecting line */}
          <div className="relative">
            <div className="absolute top-10 left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200" />

            <div className="grid grid-cols-4 gap-6">
              {content.steps.map((step) => (
                <div key={step.number} className="group flex flex-col items-center text-center">
                  {/* Step circle */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative w-20 h-20 rounded-full bg-white border-2 border-primary-200 flex items-center justify-center text-primary-600 shadow-lg shadow-primary-100/50 group-hover:border-primary-400 group-hover:shadow-xl group-hover:shadow-primary-200/50 group-hover:scale-110 transition-all duration-300">
                      <StepIcon step={step.number} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center shadow-md shadow-primary-600/40">
                      {step.number}
                    </div>
                  </div>

                  {/* Step content */}
                  <h3 className="text-xl font-bold text-secondary-800 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-secondary-500 leading-relaxed max-w-[220px] group-hover:text-secondary-600 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical cards */}
        <div className="md:hidden space-y-4">
          {content.steps.map((step, index) => (
            <div
              key={step.number}
              className="relative flex gap-5 p-5 bg-white rounded-2xl border border-secondary-200 shadow-sm"
            >
              {/* Vertical connector */}
              {index < content.steps.length - 1 && (
                <div className="absolute left-[38px] top-[76px] bottom-[-16px] w-0.5 bg-primary-200" />
              )}

              {/* Step number circle */}
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center text-primary-600 relative z-10">
                <StepIcon step={step.number} />
              </div>

              {/* Step content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-secondary-800 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-secondary-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="#hero-form"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-600/30"
          >
            Start Your Project
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
