import CoverLetterForm from "@/components/CoverLetterForm";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
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
