import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Wildcard to allow all hostnames
      },
    ],
  },
};

export default nextConfig;
