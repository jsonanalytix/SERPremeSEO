import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import GoogleTagManager from "@/components/analytics/GoogleTagManager";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "SERPreme SEO - Healthcare Digital Marketing",
  description: "Premium web design and SEO services for healthcare practices. HIPAA-conscious, conversion-focused, and built for results.",
  icons: {
    icon: [
      { url: "/brand/serpremeseo-logo.png", type: "image/png" },
    ],
    shortcut: "/brand/serpremeseo-logo.png",
    apple: "/brand/serpremeseo-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Disable browser scroll restoration - must run before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (history.scrollRestoration) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {/* Analytics Scripts - Next.js Script components automatically inject into head */}
        <GoogleTagManager />
        {children}
      </body>
    </html>
  );
}
