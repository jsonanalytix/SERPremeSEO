import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Setup Cloudflare bindings in development
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Use unoptimized images for Cloudflare Pages
    unoptimized: true,
  },
};

export default nextConfig;
