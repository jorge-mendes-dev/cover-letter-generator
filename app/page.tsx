import CoverLetterForm from "@/components/CoverLetterForm";
import ThemeToggle from "@/components/ThemeToggle";

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
        "The best free AI tool for cover letters. Upload your PDF résumé, paste any job description, and get a fully tailored cover letter in seconds — powered by Groq LLM, no signup required.",
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
        "PDF résumé upload and parsing",
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
        "Use this free AI tool to generate a tailored cover letter from your résumé in 3 simple steps.",
      totalTime: "PT1M",
      tool: [{ "@type": "HowToTool", name: "AI Cover Letter Generator" }],
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Upload your PDF résumé",
          text: "Click the upload area and select your PDF résumé (text-based, up to 5 MB). The AI extracts your skills, experience, and background automatically.",
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
            text: "Upload your PDF résumé and paste the job description. The AI analyzes your experience and the job requirements, then generates a tailored cover letter in seconds — no templates, no placeholders.",
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
          name: "What file format does my résumé need to be?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Upload your résumé as a PDF file (text-based, up to 5 MB). Scanned image PDFs are not supported.",
          },
        },
        {
          "@type": "Question",
          name: "Will the cover letter have placeholder text like [Company Name]?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The AI is specifically instructed to generate fully complete cover letters with no placeholder brackets. Every detail is inferred from your résumé and the job description.",
          },
        },
        {
          "@type": "Question",
          name: "How good is the AI-generated cover letter?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It uses Groq's llama-3.3-70b-versatile model to produce professional, tailored letters with a strong opening, aligned skills, genuine motivation, and a confident close — structured for impact.",
          },
        },
        {
          "@type": "Question",
          name: "Is this AI tool better than ChatGPT for writing cover letters?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — unlike ChatGPT, this tool is purpose-built for cover letters with a structured prompt, Zod-validated output, and a strict instruction to never use placeholder text. ChatGPT requires manual prompting and often produces generic or incomplete letters.",
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
            text: "Yes. The AI adapts to any role — software engineering, healthcare, finance, marketing, creative, and more. Just paste any job description and it tailors the cover letter to that specific position and company.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── Hero ── */}
      <header
        style={{
          position: "relative",
          background: "var(--surface)",
          borderBottom: "1px solid var(--border-subtle)",
          paddingTop: "88px",
          paddingBottom: "80px",
          textAlign: "center",
        }}
      >
        {/* ── Logo mark ── */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            height: "38px",
            borderRadius: "9999px",
            background: "var(--surface)",
            boxShadow: "var(--shadow-button)",
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            gap: "6px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "17px",
              fontWeight: 400,
              color: "var(--ink)",
              letterSpacing: "-0.3px",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            CL
          </span>
          <span
            style={{
              width: "1px",
              height: "12px",
              background: "var(--border)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              color: "var(--ink-muted)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            Generator
          </span>
        </div>

        <ThemeToggle />

        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 24px" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--ink-muted)",
              letterSpacing: "0.14px",
              marginBottom: "32px",
            }}
          >
            AI-Powered
          </p>

          {/* Display headline — Cormorant Garamond 300, whisper-thin */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(52px, 9vw, 76px)",
              fontWeight: 300,
              lineHeight: 1.06,
              letterSpacing: "-0.96px",
              color: "var(--ink)",
              marginBottom: "28px",
            }}
          >
            Cover Letter
            <br />
            Generator
          </h1>

          {/* Subtitle — Inter 400, airy tracking */}
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "18px",
              fontWeight: 400,
              color: "var(--ink-secondary)",
              lineHeight: 1.6,
              letterSpacing: "0.18px",
            }}
          >
            Upload your résumé, paste the job description.
            <br />
            Receive a tailored cover letter in seconds.
          </p>
        </div>
      </header>

      {/* ── Form card ── */}
      <main>
        <section
          style={{
            padding: "40px 24px 80px",
            maxWidth: "724px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "var(--surface)",
              borderRadius: "24px",
              boxShadow: "var(--shadow-card)",
              padding: "clamp(28px, 5vw, 48px)",
            }}
          >
            <CoverLetterForm />
          </div>
        </section>
      </main>

      {/* ── How it works ── */}
      <section
        aria-label="How it works"
        style={{
          padding: "64px 24px 0",
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 300,
            letterSpacing: "-0.6px",
            color: "var(--ink)",
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          How it works
        </h2>
        <ol
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {[
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
          ].map(({ step, title, body }) => (
            <li
              key={step}
              style={{
                background: "var(--surface)",
                borderRadius: "16px",
                padding: "28px 24px",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <span
                aria-hidden
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "11px",
                  fontWeight: 400,
                  color: "var(--ink-muted)",
                  letterSpacing: "0.5px",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                {step}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "var(--ink)",
                  letterSpacing: "0.14px",
                  marginBottom: "10px",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "var(--ink-secondary)",
                  lineHeight: 1.65,
                  letterSpacing: "0.14px",
                  margin: 0,
                }}
              >
                {body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Features ── */}
      <section
        aria-label="Features"
        style={{
          padding: "64px 24px",
          maxWidth: "860px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 300,
            letterSpacing: "-0.6px",
            color: "var(--ink)",
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          Why use this cover letter generator?
        </h2>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {[
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
          ].map(({ title, body }) => (
            <li
              key={title}
              style={{
                background: "var(--surface)",
                borderRadius: "16px",
                padding: "28px 24px",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "var(--ink)",
                  letterSpacing: "0.14px",
                  marginBottom: "10px",
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "var(--ink-secondary)",
                  lineHeight: 1.65,
                  letterSpacing: "0.14px",
                  margin: 0,
                }}
              >
                {body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── FAQ ── */}
      <section
        aria-label="Frequently asked questions"
        style={{
          padding: "16px 24px 80px",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 300,
            letterSpacing: "-0.5px",
            color: "var(--ink)",
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Frequently Asked Questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
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
          ].map(({ q, a }, i, arr) => (
            <details
              key={q}
              style={{
                borderBottom:
                  i < arr.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <summary
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "var(--ink)",
                  letterSpacing: "0.14px",
                  padding: "20px 0",
                  cursor: "pointer",
                  listStyle: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  userSelect: "none",
                }}
              >
                <span>{q}</span>
                {/* Chevron — rotates via CSS on open state */}
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--ink-muted)",
                    transition: "transform 0.2s ease",
                  }}
                  className="faq-chevron"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 5L7 9.5L11.5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "var(--ink-secondary)",
                  lineHeight: 1.65,
                  letterSpacing: "0.14px",
                  margin: "0 0 20px 0",
                  paddingRight: "34px",
                }}
              >
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ textAlign: "center", paddingBottom: "40px" }}>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "12px",
            fontWeight: 400,
            color: "var(--ink-muted)",
            letterSpacing: "0.14px",
          }}
        >
          Powered by AI. - Built by{" "}
          <a
            href="https://jorgemendes.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--ink)", textDecoration: "underline" }}
          >
            Jorge Mendes
          </a>
        </p>
      </footer>
    </div>
  );
}
