import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse uses createRequire, __filename, and Worker internally —
  // webpack cannot re-bundle it correctly. Mark as external so Node.js
  // loads it natively; @netlify/plugin-nextjs includes it in the function bundle.
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
