import { specialtiesContent as defaultSpecialtiesContent } from "@/content/healthcareWebDesign";

const SpecialtyIcon = ({ type }: { type: string }) => {
  const icons: Record<string, JSX.Element> = {
    stethoscope: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12.75a3.75 3.75 0 007.5 0V4.5m-7.5 8.25a3.75 3.75 0 107.5 0M4.5 4.5h7.5M4.5 4.5v.75m7.5-.75v.75m4.5 6.75a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm1.5 1.5v3a3 3 0 01-3 3h-1.5" />
      </svg>
    ),
    tooth: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2c-1.5 0-2.7.5-3.5 1.2C7.2 4 6.5 5.2 6 6.8c-.8 2.5-.2 4.5.3 6 .5 1.5 1 3.2 1.2 5.2.1 1 .8 2 1.8 2s1.5-.8 1.7-1.8c.2-1.2.5-2.2 1-2.2s.8 1 1 2.2c.2 1 .8 1.8 1.8 1.8s1.7-1 1.8-2c.2-2 .7-3.7 1.2-5.2.5-1.5 1.1-3.5.3-6-.5-1.6-1.2-2.8-2.5-3.6C14.7 2.5 13.5 2 12 2z" />
      </svg>
    ),
    spine: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 3v1m0 3v1m0 3v1m0 3v2M8 4h8M9 8h6M8 12h8M9 16h6M10 20h4" />
      </svg>
    ),
    skin: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    brain: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 009-9 9 9 0 00-9-9m0 18a9 9 0 01-9-9 9 9 0 019-9m0 18V3m-4.5 1.206C8.88 5.78 10.26 8.608 10.65 12c.39 3.392-.297 6.22-1.71 7.794M7.5 3c-1.2 1.5-1.8 4.5-1.5 7.5.3 3 1.5 6 3 7.5m8.25-13.794c1.38 1.574 2.1 4.402 1.71 7.794-.39 3.392-1.77 6.22-3.15 7.794M16.5 3c1.2 1.5 1.8 4.5 1.5 7.5-.3 3-1.5 6-3 7.5" />
      </svg>
    ),
    urgentcare: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    eye: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    leaf: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 20.5C6 20.5 6 15 10 10c4-5 11-7 11-7S20 8 16 13c-4 5-10 7.5-10 7.5zM6 20.5C6 20.5 3 17 3 12" />
      </svg>
    ),
  };

  return icons[type] || icons.stethoscope;
};

interface SpecialtiesGridProps {
  content?: typeof defaultSpecialtiesContent;
}

export default function SpecialtiesGrid({ content = defaultSpecialtiesContent }: SpecialtiesGridProps) {
  return (
    <section id="specialties" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-secondary-50/50 to-white" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-primary-50/40 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 text-sm font-medium rounded-full mb-6">
            Who We Serve
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-secondary-800 mb-6">
            {content.headline}
          </h2>
          <p className="text-lg md:text-xl text-secondary-500 max-w-2xl mx-auto">
            {content.subheadline}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 max-w-6xl mx-auto">
          {content.specialties.map((specialty, index) => (
            <div
              key={index}
              className="group relative p-6 md:p-7 bg-white rounded-2xl border border-secondary-200 hover:border-primary-300 shadow-sm hover:shadow-xl hover:shadow-primary-100/40 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-50/0 to-primary-100/0 group-hover:from-primary-50/80 group-hover:to-primary-100/40 transition-all duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 mb-5 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 group-hover:shadow-lg group-hover:shadow-primary-600/30 transition-all duration-300">
                  <SpecialtyIcon type={specialty.icon} />
                </div>
                <h3 className="text-lg font-bold text-secondary-800 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                  {specialty.title}
                </h3>
                <p className="text-sm text-secondary-500 leading-relaxed group-hover:text-secondary-600 transition-colors duration-300">
                  {specialty.description}
                </p>
              </div>

              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-secondary-500 mb-6 text-lg">
            Don&apos;t see your specialty? We work with all healthcare providers.
          </p>
          <a
            href="#hero-form"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary-600/30"
          >
            Tell Us About Your Practice
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
