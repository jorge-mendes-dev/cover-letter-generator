import CoverLetterForm from "@/components/CoverLetterForm";

export default function Home() {
  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh" }}>
      {/* ── Hero ── */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          paddingTop: "88px",
          paddingBottom: "80px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "0 24px" }}>
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#777169",
              letterSpacing: "0.14px",
              marginBottom: "32px",
            }}
          >
            AI-Powered · Groq llama-3.3-70b
          </p>

          {/* Display headline — Cormorant Garamond 300, whisper-thin */}
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(52px, 9vw, 76px)",
              fontWeight: 300,
              lineHeight: 1.06,
              letterSpacing: "-0.96px",
              color: "#000000",
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
              color: "#4e4e4e",
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
              background: "#ffffff",
              borderRadius: "24px",
              boxShadow:
                "rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 4px, rgba(0,0,0,0.04) 0px 8px 24px",
              padding: "clamp(28px, 5vw, 48px)",
            }}
          >
            <CoverLetterForm />
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer style={{ textAlign: "center", paddingBottom: "40px" }}>
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "12px",
            fontWeight: 400,
            color: "#777169",
            letterSpacing: "0.14px",
          }}
        >
          Powered by Groq · llama-3.3-70b-versatile
        </p>
      </footer>
    </div>
  );
}
