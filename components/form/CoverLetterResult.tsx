"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { useState } from "react";
import { FONT_INTER, FONT_MONO } from "./tokens";

interface Props {
  coverLetter: string;
}

export default function CoverLetterResult({ coverLetter }: Props) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

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

        {/* Copy — white pill with shadow-as-border */}
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
