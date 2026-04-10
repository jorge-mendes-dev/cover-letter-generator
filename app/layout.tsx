import ErrorBoundary from "@/components/ErrorBoundary";
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

export const metadata: Metadata = {
  title: "Cover Letter Generator",
  description:
    "Upload your resume and paste the job description. Get a tailored cover letter in seconds.",
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
          <QueryProvider>
            <ErrorBoundary>{children}</ErrorBoundary>
          </QueryProvider>
          <ServiceWorkerRegistration />
        </ThemeProvider>
      </body>
    </html>
  );
}
