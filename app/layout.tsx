import ErrorBoundary from "@/components/ErrorBoundary";
import { LanguageProvider } from "@/components/LanguageProvider";
import QueryProvider from "@/components/QueryProvider";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Closest Google Fonts match to Waldenburg weight 300 — whisper-thin, ethereal display serif
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://coverletter.jorgemendes.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Cover Letter Generator — Free & Instant from Your Resume",
    template: "%s | Cover Letter Generator",
  },
  description:
    "Generate a tailored, professional cover letter in seconds. Upload your PDF résumé, paste the job description, and let AI craft a compelling cover letter — free, no signup required.",
  keywords: [
    "cover letter generator",
    "AI cover letter generator",
    "free cover letter generator",
    "cover letter from resume",
    "automatic cover letter",
    "cover letter maker",
    "job application cover letter",
    "professional cover letter generator",
    "cover letter AI",
    "resume cover letter generator",
    "AI writing tool",
    "AI tool for job seekers",
    "AI tools",
    "free AI tools",
    "AI job application tool",
    "AI productivity tool",
    "LLM cover letter",
    "Groq AI",
    "ChatGPT alternative for cover letters",
    "best AI tools",
  ],
  authors: [{ name: "Jorge Mendes", url: "https://jorgemendes.com.br" }],
  creator: "Jorge Mendes",
  publisher: "Cover Letter Generator",
  category: "productivity",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Cover Letter Generator",
    title: "AI Cover Letter Generator — Free AI Tool, Instant Results",
    description:
      "The best free AI tool for cover letters. Upload your PDF résumé, paste any job description, and get a fully tailored cover letter in seconds — powered by Groq LLM, no signup required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cover Letter Generator — AI-powered cover letters from your resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Cover Letter Generator — Free & Instant",
    description:
      "Upload your résumé, paste the job description, get a tailored cover letter in seconds. Powered by AI.",
    images: ["/og-image.png"],
    creator: "@jorgemendesdev",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: "Cover Letter Generator",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
  icons: {
    apple: "/icons/icon-192x192.png",
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
      </head>
      <body
        style={{
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <ThemeProvider>
          <LanguageProvider>
            <QueryProvider>
              <ErrorBoundary>{children}</ErrorBoundary>
            </QueryProvider>
            <ServiceWorkerRegistration />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
