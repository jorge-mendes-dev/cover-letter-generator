"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { en } from "@/lib/i18n/locales/en";
import { es } from "@/lib/i18n/locales/es";
import { ptBR } from "@/lib/i18n/locales/pt-BR";
import { useState } from "react";
import { FONT_INTER, FONT_MONO } from "./tokens";

interface Props {
  coverLetter: string;
  candidateName: string;
  candidateEmail?: string;
  candidatePhone?: string;
  candidateLinkedin?: string;
}

export default function CoverLetterResult({
  coverLetter,
  candidateName,
  candidateEmail,
  candidatePhone,
  candidateLinkedin,
}: Props) {
  const { locale, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [downloadFailed, setDownloadFailed] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const resolvedCandidateName = candidateName?.trim() || "Candidate";

  const inferLetterLanguage = (
    text: string,
    uiLocale: "en" | "es" | "pt-BR",
  ): "en" | "es" | "pt-BR" => {
    const lower = text.toLowerCase();
    const normalized = lower.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const scores: Record<"en" | "es" | "pt-BR", number> = {
      en: 0,
      es: 0,
      "pt-BR": 0,
    };

    const countWord = (source: string, word: string) => {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const matches = source.match(new RegExp(`\\b${escaped}\\b`, "g"));
      return matches?.length ?? 0;
    };

    const countFragment = (source: string, fragment: string) => {
      const escaped = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const matches = source.match(new RegExp(escaped, "g"));
      return matches?.length ?? 0;
    };

    const addWordScore = (
      language: "es" | "pt-BR",
      marker: string,
      weight: number,
    ) => {
      scores[language] += countWord(normalized, marker) * weight;
    };

    const addFragmentScore = (
      language: "es" | "pt-BR",
      marker: string,
      weight: number,
    ) => {
      scores[language] += countFragment(normalized, marker) * weight;
    };

    // Stronger weights for language-specific markers.
    addWordScore("pt-BR", "voce", 3);
    addWordScore("pt-BR", "seu", 2.4);
    addWordScore("pt-BR", "sua", 2.4);
    addWordScore("pt-BR", "nao", 2.1);
    addWordScore("pt-BR", "com", 1.1);

    addWordScore("es", "usted", 3);
    addWordScore("es", "su", 1.2);
    addWordScore("es", "no", 1);
    addWordScore("es", "con", 1.1);
    addWordScore("es", "equipo", 2.7);
    addWordScore("es", "puesto", 2.7);

    // Shared markers stay intentionally low-weight.
    addWordScore("pt-BR", "experiencia", 0.6);
    addWordScore("es", "experiencia", 0.6);
    addWordScore("pt-BR", "trabalho", 0.6);
    addWordScore("es", "trabajo", 0.6);
    addWordScore("pt-BR", "oportunidade", 0.6);
    addWordScore("es", "oportunidad", 0.6);
    addWordScore("pt-BR", "para", 0.5);
    addWordScore("es", "para", 0.5);

    // Accent and suffix bonuses are computed on raw text to distinguish close cases.
    scores["pt-BR"] += countFragment(lower, "ção") * 1.6;
    scores["pt-BR"] += countFragment(lower, "ções") * 1.8;
    scores["pt-BR"] += countWord(lower, "às") * 1.8;
    scores["pt-BR"] += countWord(lower, "você") * 1.8;
    scores["pt-BR"] += countWord(lower, "não") * 1.5;
    scores["pt-BR"] += countFragment(lower, "ã") * 0.8;
    scores["pt-BR"] += countFragment(lower, "õ") * 0.8;
    scores["pt-BR"] += countFragment(lower, "ç") * 0.8;

    scores.es += countFragment(lower, "ción") * 1.6;
    scores.es += countFragment(lower, "ciones") * 1.8;
    scores.es += countFragment(lower, "ñ") * 1.3;

    // Non-accent variants still contribute after normalization.
    addFragmentScore("pt-BR", "cao", 0.7);
    addFragmentScore("pt-BR", "coes", 0.8);
    addFragmentScore("es", "cion", 0.7);
    addFragmentScore("es", "ciones", 0.8);

    const ranking = (
      Object.entries(scores) as Array<["en" | "es" | "pt-BR", number]>
    ).sort((a, b) => b[1] - a[1]);

    const [bestLanguage, bestScore] = ranking[0] ?? ["en", 0];
    const [, secondScore] = ranking[1] ?? ["en", 0];

    const confidenceThreshold = 2.4;
    if (bestScore < confidenceThreshold) return "en";

    const tieMargin = 1.1;
    if (bestScore - secondScore <= tieMargin) {
      if (uiLocale !== "en" && scores[uiLocale] >= bestScore - 0.25) {
        return uiLocale;
      }
      return "en";
    }

    return bestLanguage;
  };

  // Inline detector examples (manual sanity checks):
  // 1) "Tenho experiência e você verá meu impacto na equipe." -> pt-BR
  // 2) "Estoy aplicando para este puesto y me encanta su equipo." -> es
  // 3) "I am applying for this role and excited about the opportunity." -> en
  // 4) "Nao tenho medo de desafios, com foco em colaboracao." -> pt-BR
  // 5) "No tengo miedo de retos, con enfoque en colaboracion." -> es
  // 6) "Experiencia y trabajo" + UI=es -> es (shared terms, UI tie-break)
  // 7) "Experiencia e trabalho" + UI=pt-BR -> pt-BR (shared terms + pt marker)
  // 8) "para su equipo con você e não" -> pt-BR (accent/unique marker boost)
  // 9) "para con no su" + UI=en -> en (low confidence fallback)
  // 10) "ción ciones y ñ" -> es

  const getPdfPhrases = (text: string) => {
    const language = inferLetterLanguage(text, locale);
    if (language === "pt-BR") {
      return {
        salutationText: ptBR.form.pdfSalutation,
        closingText: ptBR.form.pdfClosing,
      };
    }

    if (language === "es") {
      return {
        salutationText: es.form.pdfSalutation,
        closingText: es.form.pdfClosing,
      };
    }

    return {
      salutationText: en.form.pdfSalutation,
      closingText: en.form.pdfClosing,
    };
  };

  const toSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

  const inferRoleCompany = (text: string) => {
    const roleAtCompany =
      text.match(
        /(?:apply|applying)\s+for\s+(?:the\s+)?(.{2,80}?)\s+at\s+(.{2,80}?)[,.\n]/i,
      ) || text.match(/position\s+of\s+(.{2,80}?)\s+at\s+(.{2,80}?)[,.\n]/i);

    if (!roleAtCompany) return null;

    const role = toSlug(roleAtCompany[1] ?? "");
    const company = toSlug(roleAtCompany[2] ?? "");

    if (!role && !company) return null;
    if (role && company) return `${role}-${company}`;
    return role || company;
  };

  const handleDownloadPdf = async () => {
    setDownloading(true);
    setDownloadFailed(false);
    try {
      const [{ pdf }, { default: CoverLetterDocument }, { createElement }] =
        await Promise.all([
          import("@react-pdf/renderer"),
          import("@/components/pdf/CoverLetterDocument"),
          import("react"),
        ]);
      const pdfPhrases = getPdfPhrases(coverLetter);
      const element = createElement(CoverLetterDocument, {
        coverLetter,
        candidateName: resolvedCandidateName,
        candidateEmail,
        candidatePhone,
        candidateLinkedin,
        salutationText: pdfPhrases.salutationText,
        closingText: pdfPhrases.closingText,
      }) as React.ReactElement;
      const blob = await pdf(element as Parameters<typeof pdf>[0]).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const safeNameSlug = toSlug(resolvedCandidateName) || "candidate";
      const contextSlug = inferRoleCompany(coverLetter);
      const dateSlug = new Date().toISOString().slice(0, 10);
      const baseName = contextSlug
        ? `cover-letter-${safeNameSlug}-${contextSlug}-${dateSlug}`
        : `cover-letter-${safeNameSlug}-${dateSlug}`;

      a.href = url;
      a.download = `${baseName}.pdf`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    } catch (error) {
      console.error("[CoverLetterResult] Failed to generate PDF:", error);
      setDownloadFailed(true);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setCopyFailed(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
    }
  };

  return (
    <div
      style={{
        marginTop: "40px",
        paddingTop: "36px",
        borderTop: "1px solid var(--border-subtle)",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: copyFailed ? "8px" : "20px",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "28px",
            fontWeight: 300,
            letterSpacing: "-0.2px",
            color: "var(--ink)",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {t.form.resultHeading}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginLeft: "auto",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleCopy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "8px 16px",
              borderRadius: "9999px",
              background: "var(--surface)",
              boxShadow: "var(--shadow-button)",
              border: "none",
              cursor: "pointer",
              fontFamily: FONT_INTER,
              fontSize: "13px",
              fontWeight: 500,
              color: copied ? "var(--ink)" : "var(--ink-secondary)",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-button-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-button)";
            }}
          >
            {copied ? (
              <>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {t.form.resultCopied}
              </>
            ) : (
              <>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                {t.form.resultCopy}
              </>
            )}
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "9999px",
              background: downloading
                ? "var(--btn-primary-disabled)"
                : "var(--btn-primary-bg)",
              color: "var(--btn-primary-text)",
              border: "none",
              boxShadow: "var(--shadow-button)",
              cursor: downloading ? "default" : "pointer",
              fontFamily: FONT_INTER,
              fontSize: "13px",
              fontWeight: 500,
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => {
              if (!downloading) {
                e.currentTarget.style.background = "var(--btn-primary-hover)";
              }
            }}
            onMouseLeave={(e) => {
              if (!downloading) {
                e.currentTarget.style.background = "var(--btn-primary-bg)";
              }
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {downloading ? t.form.resultGenerating : t.form.resultDownloadPdf}
          </button>
        </div>
      </div>

      {copyFailed && (
        <p
          role="alert"
          style={{
            fontFamily: FONT_INTER,
            fontSize: "12px",
            color: "var(--error-text)",
            textAlign: "right",
            margin: "0 0 12px",
          }}
        >
          {t.form.resultCopyFailed}
        </p>
      )}

      {downloadFailed && (
        <p
          role="alert"
          style={{
            fontFamily: FONT_INTER,
            fontSize: "12px",
            color: "var(--error-text)",
            textAlign: "right",
            margin: "0 0 12px",
          }}
        >
          {t.form.errorDefault}
        </p>
      )}

      {/* Letter body */}
      <div
        style={{
          background: "var(--result-bg)",
          borderRadius: "12px",
          boxShadow: "var(--shadow-outline)",
          padding: "28px 32px",
        }}
      >
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: "13.5px",
            lineHeight: 1.85,
            color: "var(--ink)",
            whiteSpace: "pre-wrap",
            margin: 0,
            letterSpacing: 0,
          }}
        >
          {coverLetter}
        </p>
      </div>
    </div>
  );
}
