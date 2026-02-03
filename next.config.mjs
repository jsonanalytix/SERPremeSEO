/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for optimal Core Web Vitals
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
};

export default nextConfig;
