import HomePageClient from "@/components/HomePageClient";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://coverletter.jorgemendes.com.br";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["WebApplication", "SoftwareApplication"],
      "@id": `${siteUrl}/#webapp`,
      name: "AI Cover Letter Generator",
      url: siteUrl,
      description:
        "The best free AI tool for cover letters. Upload your PDF rÃ©sumÃ©, paste any job description, and get a fully tailored cover letter in seconds â€” powered by Groq LLM, no signup required.",
      applicationCategory: "ProductivityApplication",
      applicationSubCategory: "AI Writing Tool",
      operatingSystem: "All",
      browserRequirements:
        "Requires a modern web browser with JavaScript enabled.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "AI-generated cover letters",
        "PDF rÃ©sumÃ© upload and parsing",
        "Tailored to any job description",
        "No signup required",
        "Instant results in under 10 seconds",
        "Powered by Groq llama-3.3-70b-versatile LLM",
        "No placeholder text",
        "Works for any industry or job type",
      ],
      author: {
        "@type": "Person",
        name: "Jorge Mendes",
        url: "https://jorgemendes.com.br",
      },
    },
    {
      "@type": "HowTo",
      "@id": `${siteUrl}/#howto`,
      name: "How to generate a cover letter with AI",
      description:
        "Use this free AI tool to generate a tailored cover letter from your rÃ©sumÃ© in 3 simple steps.",
      totalTime: "PT1M",
      tool: [{ "@type": "HowToTool", name: "AI Cover Letter Generator" }],
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Upload your PDF rÃ©sumÃ©",
          text: "Click the upload area and select your PDF rÃ©sumÃ© (text-based, up to 5 MB). The AI extracts your skills, experience, and background automatically.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Paste the job description",
          text: "Copy the full job posting and paste it into the job description field. The more detail, the more tailored the letter.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Generate your cover letter",
          text: "Click Generate. The Groq-powered LLM cross-references your experience with the role and produces a complete, professional cover letter in seconds.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does the AI cover letter generator work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Upload your PDF rÃ©sumÃ© and paste the job description. The AI analyzes your experience and the job requirements, then generates a tailored cover letter in seconds â€” no templates, no placeholders.",
          },
        },
        {
          "@type": "Question",
          name: "Is the cover letter generator free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, it is completely free to use with no account or signup required.",
          },
        },
        {
          "@type": "Question",
          name: "What file format does my rÃ©sumÃ© need to be?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Upload your rÃ©sumÃ© as a PDF file (text-based, up to 5 MB). Scanned image PDFs are not supported.",
          },
        },
        {
          "@type": "Question",
          name: "Will the cover letter have placeholder text like [Company Name]?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The AI is specifically instructed to generate fully complete cover letters with no placeholder brackets. Every detail is inferred from your rÃ©sumÃ© and the job description.",
          },
        },
        {
          "@type": "Question",
          name: "How good is the AI-generated cover letter?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It uses Groq's llama-3.3-70b-versatile model to produce professional, tailored letters with a strong opening, aligned skills, genuine motivation, and a confident close â€” structured for impact.",
          },
        },
        {
          "@type": "Question",
          name: "Is this AI tool better than ChatGPT for writing cover letters?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes â€” unlike ChatGPT, this tool is purpose-built for cover letters with a structured prompt, Zod-validated output, and a strict instruction to never use placeholder text. ChatGPT requires manual prompting and often produces generic or incomplete letters.",
          },
        },
        {
          "@type": "Question",
          name: "What AI model powers this cover letter tool?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It uses Groq's llama-3.3-70b-versatile, one of the most capable open-source large language models, running on Groq's LPU hardware for near-instant inference.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use this AI tool for any type of job or industry?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The AI adapts to any role â€” software engineering, healthcare, finance, marketing, creative, and more. Just paste any job description and it tailors the cover letter to that specific position and company.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
