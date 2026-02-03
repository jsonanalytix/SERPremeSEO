import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">
          SERPreme SEO
        </h1>
        <p className="text-xl text-secondary-600 mb-8">
          Healthcare Digital Marketing Excellence
        </p>
        <Link 
          href="/services/plastic-surgery-web-design"
          className="btn-primary"
        >
          View Plastic Surgery Web Design Services
        </Link>
      </div>
    </main>
  );
}
