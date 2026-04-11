"use client";

import CoverLetterForm from "@/components/CoverLetterForm";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";

export default function HomePageClient() {
  const { t } = useLanguage();

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
            {t.nav.brand}
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
            {t.nav.label}
          </span>
        </div>

        {/* ── Nav controls (language + theme) ── */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <LanguageSelector />
          <ThemeToggle />
        </div>

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
            {t.hero.eyebrow}
          </p>

          {/* Display headline */}
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
            {t.hero.headingLine1}
            <br />
            {t.hero.headingLine2}
          </h1>

          {/* Subtitle */}
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
            {t.hero.subtitleLine1}
            <br />
            {t.hero.subtitleLine2}
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
        aria-label={t.howItWorks.heading}
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
          {t.howItWorks.heading}
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
          {t.howItWorks.steps.map(({ step, title, body }) => (
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
        aria-label={t.features.heading}
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
          {t.features.heading}
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
          {t.features.items.map(({ title, body }) => (
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
        aria-label={t.faq.heading}
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
          {t.faq.heading}
        </h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {t.faq.items.map(({ q, a }, i) => (
            <details
              key={i}
              style={{
                borderBottom:
                  i < t.faq.items.length - 1
                    ? "1px solid var(--border)"
                    : "none",
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
          {t.footer.poweredBy}{" "}
          <a
            href="https://jorgemendes.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--ink)", textDecoration: "underline" }}
          >
            {t.footer.author}
          </a>
        </p>
      </footer>
    </div>
  );
}
