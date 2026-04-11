export const en = {
  nav: {
    brand: "CL",
    label: "Generator",
  },
  hero: {
    eyebrow: "AI-Powered",
    headingLine1: "Cover Letter",
    headingLine2: "Generator",
    subtitleLine1: "Upload your résumé, paste the job description.",
    subtitleLine2: "Receive a tailored cover letter in seconds.",
  },
  howItWorks: {
    heading: "How it works",
    steps: [
      {
        step: "01",
        title: "Upload your résumé",
        body: "Select your PDF résumé (up to 5 MB). The AI extracts your skills, experience, and background automatically.",
      },
      {
        step: "02",
        title: "Paste the job description",
        body: "Copy the full job posting and paste it in. The more detail, the more tailored the letter.",
      },
      {
        step: "03",
        title: "Get your cover letter",
        body: "Click Generate. The LLM cross-references your profile with the role and writes a complete letter in seconds.",
      },
    ],
  },
  features: {
    heading: "Why use this cover letter generator?",
    items: [
      {
        title: "Tailored to every job",
        body: "The AI reads your résumé and the job description together — generating a letter that matches your real experience to the exact role.",
      },
      {
        title: "No placeholders, ever",
        body: "Zero [Company Name] brackets. Every sentence is complete and ready to send.",
      },
      {
        title: "Instant results",
        body: "Powered by Groq's 70B model — you get a full cover letter in under 10 seconds.",
      },
      {
        title: "Free & no signup",
        body: "No account, no email, no credit card. Just upload and generate.",
      },
    ],
  },
  faq: {
    heading: "Frequently Asked Questions",
    items: [
      {
        q: "How does the AI cover letter generator work?",
        a: "Upload your PDF résumé and paste the job description. The AI analyzes your experience and the job requirements, then generates a tailored cover letter in seconds — no templates, no placeholders.",
      },
      {
        q: "Is the cover letter generator free?",
        a: "Yes, it is completely free to use with no account or signup required.",
      },
      {
        q: "What file format does my résumé need to be?",
        a: "Upload your résumé as a PDF file (text-based, up to 5 MB). Scanned image PDFs are not supported.",
      },
      {
        q: "Will the cover letter have placeholder text like [Company Name]?",
        a: "No. The AI is specifically instructed to generate fully complete cover letters with no placeholder brackets. Every detail is inferred from your résumé and the job description.",
      },
      {
        q: "How good is the AI-generated cover letter?",
        a: "It uses Groq's llama-3.3-70b-versatile model to produce professional, tailored letters with a strong opening, aligned skills, genuine motivation, and a confident close — structured for impact.",
      },
      {
        q: "Is this AI tool better than ChatGPT for writing cover letters?",
        a: "Yes — unlike ChatGPT, this tool is purpose-built for cover letters with a structured prompt, validated output, and a strict instruction to never use placeholder text. ChatGPT requires manual prompting and often produces generic or incomplete letters.",
      },
      {
        q: "What AI model powers this cover letter tool?",
        a: "It uses Groq's llama-3.3-70b-versatile, one of the most capable open-source large language models, running on Groq's LPU hardware for near-instant inference.",
      },
      {
        q: "Can I use this AI tool for any type of job or industry?",
        a: "Yes. The AI adapts to any role — software engineering, healthcare, finance, marketing, creative, and more. Just paste any job description and it tailors the cover letter to that specific position and company.",
      },
    ],
  },
  footer: {
    poweredBy: "Powered by AI. - Built by",
    author: "Jorge Mendes",
  },
  form: {
    resumeLabel: "Résumé",
    resumeSubLabel: "(PDF only)",
    resumeAriaLabel: "Upload resume PDF",
    resumeDropText: "Drop your PDF here, or",
    resumeBrowseText: "click to browse",
    resumeErrorPdf: "Only PDF files are supported.",
    jobDescLabel: "Job Description",
    jobDescPlaceholder: "Paste the full job description here…",
    submitGenerating: "Generating…",
    submitGenerate: "Generate Cover Letter",
    resultHeading: "Your cover letter",
    resultCopied: "Copied",
    resultCopy: "Copy",
    resultCopyFailed: "Could not copy — please select the text manually.",
    validationNoResume: "Please upload your resume as a PDF.",
    validationNoJobDesc: "Please paste the job description.",
    errorDefault: "Something went wrong. Please try again.",
  },
  themeToggle: {
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
};

export type Translations = typeof en;
