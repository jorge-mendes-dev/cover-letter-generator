import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse uses dynamic require() internally; exclude it from webpack bundling
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
