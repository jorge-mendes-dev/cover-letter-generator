"use client";

import { useState } from "react";
import { FONT_INTER, FONT_MONO } from "./tokens";

interface Props {
  coverLetter: string;
}

export default function CoverLetterResult({ coverLetter }: Props) {
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
        borderTop: "1px solid rgba(0,0,0,0.06)",
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
            color: "#000000",
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          Your cover letter
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
            background: "#ffffff",
            boxShadow:
              "rgba(0,0,0,0.4) 0px 0px 1px, rgba(0,0,0,0.04) 0px 4px 4px",
            border: "none",
            cursor: "pointer",
            fontFamily: FONT_INTER,
            fontSize: "13px",
            fontWeight: 500,
            color: copied ? "#000000" : "#4e4e4e",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "rgba(0,0,0,0.5) 0px 0px 1px, rgba(0,0,0,0.06) 0px 4px 8px";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow =
              "rgba(0,0,0,0.4) 0px 0px 1px, rgba(0,0,0,0.04) 0px 4px 4px";
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
              Copied
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
              Copy
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
            color: "#b33020",
            textAlign: "right",
            margin: "0 0 12px",
          }}
        >
          Could not copy — please select the text manually.
        </p>
      )}

      {/* Letter body */}
      <div
        style={{
          background: "#f5f5f5",
          borderRadius: "12px",
          boxShadow: "rgba(0,0,0,0.06) 0px 0px 0px 1px",
          padding: "28px 32px",
        }}
      >
        <p
          style={{
            fontFamily: FONT_MONO,
            fontSize: "13.5px",
            lineHeight: 1.85,
            color: "#000000",
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
