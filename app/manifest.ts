import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cover Letter Generator",
    short_name: "CoverLetter",
    description:
      "Upload your resume and paste the job description. Get a tailored cover letter in seconds.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f5f5f5",
    theme_color: "#000000",
    categories: ["productivity", "utilities"],
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
