import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ['example.com', 'cdn.example.com'], // TODO: Gerçek domain'ler ile değiştir
    unoptimized: false, // Görsel optimizasyonunu etkinleştir
  },
  env: {
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    API_BASE_URL: process.env.API_BASE_URL,
  },
  typescript: {
    ignoreBuildErrors: false, // TypeScript hatalarını göster
  },
  reactStrictMode: true, // React Strict Mode'u etkinleştir
  eslint: {
    ignoreDuringBuilds: false, // ESLint hatalarını göster
  },
  compress: true, // Sıkıştırma etkinleştir
  swcMinify: true, // SWC minify etkinleştir
};

export default nextConfig;
