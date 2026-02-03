import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  );
}
