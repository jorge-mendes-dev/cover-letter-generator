"use client";

import CoverLetterForm from "@/components/CoverLetterForm";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSelector from "@/components/LanguageSelector";
import ThemeToggle from "@/components/ThemeToggle";
import { useMemo } from "react";

export default function HomePageClient() {
  const { t } = useLanguage();
  const heroHighlights = useMemo(() => t.features.items.slice(0, 2), [t]);
  const workflowPreview = useMemo(() => t.howItWorks.steps, [t]);

  return (
    <div
      className="page-shell"
      style={{ background: "var(--bg)", minHeight: "100vh" }}
    >
      <a className="skip-link" href="#main-content">
        {t.a11y.skipToContent}
      </a>
      <div
        aria-hidden
        className="page-glow"
        style={{
          top: "72px",
          left: "-92px",
          width: "260px",
          height: "260px",
          background: "rgba(194, 160, 124, 0.22)",
        }}
      />
      <div
        aria-hidden
        className="page-glow"
        style={{
          top: "220px",
          right: "-64px",
          width: "240px",
          height: "240px",
          background: "rgba(0, 0, 0, 0.08)",
        }}
      />

      <header className="hero-shell" style={{ paddingBottom: "48px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <div
            className="floating-control"
            style={{
              height: "40px",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              padding: "0 14px",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "18px",
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

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>

        <div className="hero-panel">
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "24px",
              }}
            >
              <span className="section-kicker">{t.hero.eyebrow}</span>
              <span
                style={{
                  padding: "8px 12px",
                  borderRadius: "9999px",
                  background: "var(--surface-warm)",
                  boxShadow: "var(--shadow-warm)",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "var(--ink-secondary)",
                  letterSpacing: "0.14px",
                }}
              >
                {t.features.items[3]?.title}
              </span>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(54px, 8vw, 88px)",
                fontWeight: 300,
                lineHeight: 0.98,
                letterSpacing: "-1.24px",
                color: "var(--ink)",
                maxWidth: "9ch",
                marginBottom: "24px",
              }}
            >
              {t.hero.headingLine1}
              <br />
              {t.hero.headingLine2}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "18px",
                fontWeight: 400,
                color: "var(--ink-secondary)",
                lineHeight: 1.7,
                letterSpacing: "0.18px",
                maxWidth: "34ch",
                marginBottom: "32px",
              }}
            >
              {t.hero.subtitleLine1}
              <br />
              {t.hero.subtitleLine2}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
              }}
            >
              {heroHighlights.map(({ title, body }) => (
                <div
                  key={title}
                  className="surface-card interactive-card"
                  style={{
                    padding: "18px 18px 20px",
                    borderRadius: "18px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "var(--ink)",
                      letterSpacing: "0.14px",
                      marginBottom: "8px",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "13px",
                      fontWeight: 400,
                      color: "var(--ink-secondary)",
                      lineHeight: 1.65,
                      letterSpacing: "0.14px",
                      margin: 0,
                    }}
                  >
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="hero-sidebar">
            <div
              className="surface-card"
              style={{ padding: "22px", borderRadius: "22px" }}
            >
              <span className="section-kicker">{t.howItWorks.heading}</span>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  marginTop: "18px",
                }}
              >
                {workflowPreview.map(({ step, title, body }) => (
                  <div
                    key={step}
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        minWidth: "28px",
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "11px",
                        color: "var(--ink-muted)",
                        letterSpacing: "0.5px",
                        paddingTop: "2px",
                      }}
                    >
                      {step}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "var(--ink)",
                          letterSpacing: "0.14px",
                          marginBottom: "4px",
                        }}
                      >
                        {title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: "13px",
                          fontWeight: 400,
                          color: "var(--ink-secondary)",
                          lineHeight: 1.6,
                          letterSpacing: "0.14px",
                          margin: 0,
                        }}
                      >
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="surface-card interactive-card"
              style={{
                padding: "22px",
                borderRadius: "22px",
                background: "var(--surface-warm)",
                boxShadow: "var(--shadow-warm)",
              }}
            >
              <span className="section-kicker">
                {t.features.items[2]?.title}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  color: "var(--ink-secondary)",
                  lineHeight: 1.7,
                  letterSpacing: "0.14px",
                  marginTop: "12px",
                  marginBottom: 0,
                }}
              >
                {t.features.items[2]?.body}
              </p>
            </div>
          </aside>
        </div>
      </header>

      <main id="main-content" style={{ position: "relative", zIndex: 1 }}>
        <section
          style={{
            padding: "0 24px 56px",
            maxWidth: "1120px",
            margin: "-18px auto 0",
          }}
        >
          <div
            className="surface-card"
            style={{ padding: "clamp(28px, 4vw, 48px)" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "14px",
                marginBottom: "28px",
              }}
            >
              <div
                style={{
                  padding: "16px 18px",
                  borderRadius: "18px",
                  background: "var(--surface-warm)",
                  boxShadow: "var(--shadow-warm)",
                }}
              >
                <div className="section-kicker">{t.form.resumeLabel}</div>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: "var(--ink-secondary)",
                    letterSpacing: "0.14px",
                  }}
                >
                  {t.form.resumeTabUpload} · {t.form.resumeTabPaste}
                </p>
              </div>
              <div
                style={{
                  padding: "16px 18px",
                  borderRadius: "18px",
                  background: "var(--surface)",
                  boxShadow: "var(--shadow-outline)",
                }}
              >
                <div className="section-kicker">{t.form.jobDescLabel}</div>
                <p
                  style={{
                    margin: "10px 0 0",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: "var(--ink-secondary)",
                    letterSpacing: "0.14px",
                  }}
                >
                  {t.features.items[0]?.title}
                </p>
              </div>
            </div>

            <CoverLetterForm />
          </div>
        </section>

        <section
          aria-label={t.howItWorks.heading}
          style={{
            padding: "0 24px 56px",
            maxWidth: "1120px",
            margin: "0 auto",
          }}
        >
          <div
            className="surface-card"
            style={{ padding: "clamp(28px, 4vw, 44px)" }}
          >
            <div
              style={{
                textAlign: "center",
                maxWidth: "560px",
                margin: "0 auto 40px",
              }}
            >
              <span className="section-kicker">{t.hero.eyebrow}</span>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(34px, 5vw, 52px)",
                  fontWeight: 300,
                  letterSpacing: "-0.72px",
                  color: "var(--ink)",
                  marginTop: "16px",
                }}
              >
                {t.howItWorks.heading}
              </h2>
            </div>

            <ol
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px",
              }}
            >
              {t.howItWorks.steps.map(({ step, title, body }) => (
                <li
                  key={step}
                  className="interactive-card"
                  style={{
                    background: "var(--surface)",
                    borderRadius: "20px",
                    padding: "26px 22px",
                    boxShadow: "var(--shadow-outline)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "11px",
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
                      lineHeight: 1.68,
                      letterSpacing: "0.14px",
                      margin: 0,
                    }}
                  >
                    {body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          aria-label={t.features.heading}
          style={{
            padding: "0 24px 56px",
            maxWidth: "1120px",
            margin: "0 auto",
          }}
        >
          <div
            className="surface-card"
            style={{ padding: "clamp(28px, 4vw, 44px)" }}
          >
            <div
              style={{
                textAlign: "center",
                maxWidth: "700px",
                margin: "0 auto 40px",
              }}
            >
              <span className="section-kicker">
                {t.features.items[1]?.title}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(34px, 5vw, 52px)",
                  fontWeight: 300,
                  letterSpacing: "-0.72px",
                  color: "var(--ink)",
                  marginTop: "16px",
                }}
              >
                {t.features.heading}
              </h2>
            </div>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "18px",
              }}
            >
              {t.features.items.map(({ title, body }) => (
                <li
                  key={title}
                  className="interactive-card"
                  style={{
                    background:
                      title === t.features.items[3]?.title
                        ? "var(--surface-warm)"
                        : "var(--surface)",
                    borderRadius: "20px",
                    padding: "26px 22px",
                    boxShadow:
                      title === t.features.items[3]?.title
                        ? "var(--shadow-warm)"
                        : "var(--shadow-outline)",
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
                      lineHeight: 1.68,
                      letterSpacing: "0.14px",
                      margin: 0,
                    }}
                  >
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          aria-label={t.faq.heading}
          style={{
            padding: "0 24px 80px",
            maxWidth: "980px",
            margin: "0 auto",
          }}
        >
          <div
            className="surface-card"
            style={{ padding: "clamp(28px, 4vw, 40px)" }}
          >
            <div
              style={{
                textAlign: "center",
                maxWidth: "520px",
                margin: "0 auto 28px",
              }}
            >
              <span className="section-kicker">
                {t.features.items[2]?.title}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(30px, 4vw, 44px)",
                  fontWeight: 300,
                  letterSpacing: "-0.56px",
                  color: "var(--ink)",
                  marginTop: "16px",
                }}
              >
                {t.faq.heading}
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {t.faq.items.map(({ q, a }, i) => (
                <details
                  key={q}
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
                      padding: "22px 0",
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
                      className="faq-chevron"
                      style={{
                        flexShrink: 0,
                        width: "18px",
                        height: "18px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--ink-muted)",
                        transition: "transform 180ms var(--ease-out)",
                      }}
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
                      lineHeight: 1.68,
                      letterSpacing: "0.14px",
                      margin: "0 0 22px 0",
                      paddingRight: "34px",
                    }}
                  >
                    {a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer style={{ textAlign: "center", padding: "0 24px 40px" }}>
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
