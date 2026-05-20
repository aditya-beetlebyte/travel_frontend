import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for slim Docker / Cloud Run image (node server.js from .next/standalone)
  output: "standalone",
};

export default nextConfig;