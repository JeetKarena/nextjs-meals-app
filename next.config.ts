import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "via.placeholder.com",
      "embed.widencdn.net",
      "images.unsplash.com",
      "plus.unsplash.com",
      "images.pexels.com",
      "assets.example.com",
      "images.immediate.co.uk",
      "picturetherecipe.com",
    ],
    // Replace wildcard pattern with specific domains you actually use
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
    ],
  },
  // Add these performance optimizations
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
