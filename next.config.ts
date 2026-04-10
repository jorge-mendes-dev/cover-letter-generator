import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse uses createRequire, __filename, and Worker internally —
  // webpack cannot re-bundle it correctly. Mark as external so Node.js
  // loads it natively.
  serverExternalPackages: ["pdf-parse"],

  // @netlify/plugin-nextjs uses Next.js output file tracing (NFT) to build
  // the serverless function bundle. Packages listed in serverExternalPackages
  // are excluded from webpack but are also skipped by NFT, so they won't be
  // present at runtime on Netlify. This forces all pdf-parse files into the
  // trace so the plugin includes them in the function bundle.
  outputFileTracingIncludes: {
    "/api/generate": ["./node_modules/pdf-parse/**/*"],
  },
};

export default nextConfig;
