"use client";

import { useRef, useState } from "react";

/* ─── Module-level design tokens (DESIGN.md) — never recreated on render ── */
const FONT_INTER = "var(--font-inter), system-ui, sans-serif";
const FONT_MONO = "var(--font-mono), ui-monospace, Menlo, Consolas, monospace";
const SHADOW_OUTLINE =
  "rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.04) 0px 2px 4px";
const SHADOW_INSET = "rgba(0,0,0,0.075) 0px 0px 0px 0.5px inset";
const SHADOW_WARM =
  "rgba(0,0,0,0.1) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(78,50,23,0.04) 0px 6px 16px";
const WARM_STONE = "rgba(245,242,239,0.8)";

export default function CoverLetterForm() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const pickFile = (f: File | null) => {
    if (!f) return;
    if (
      f.type !== "application/pdf" &&
      !f.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Only PDF files are supported.");
      return;
    }
    setFile(f);
    setError(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    pickFile(e.dataTransfer.files?.[0] ?? null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload your resume as a PDF.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please paste the job description.");
      return;
    }

    setLoading(true);
    setError(null);
    setCoverLetter(null);

    const body = new FormData();
    body.append("resume", file);
    body.append("jobDescription", jobDescription.trim());

    try {
      const res = await fetch("/api/generate", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setCoverLetter(data.coverLetter);
        setTimeout(
          () =>
            resultRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            }),
          150,
        );
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!coverLetter) return;
    try {
      await navigator.clipboard.writeText(coverLetter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy — please select the text manually.");
    }
  };

  const resetFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: "32px" }}
      >
        {/* ── Step 1: Resume upload ── */}
        <div>
          <label
            style={{
              display: "block",
              fontFamily: FONT_INTER,
              fontSize: "12px",
              fontWeight: 500,
              color: "#777169",
              letterSpacing: "0.14px",
              marginBottom: "10px",
            }}
          >
            Résumé <span style={{ fontWeight: 400 }}>(PDF only)</span>
          </label>

          {/* Drop zone */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload resume PDF"
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) =>
              e.key === "Enter" && fileInputRef.current?.click()
            }
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            style={{
              background: file || isDragging ? WARM_STONE : "#ffffff",
              borderRadius: "16px",
              boxShadow:
                file || isDragging
                  ? SHADOW_WARM
                  : `${SHADOW_INSET}, ${SHADOW_OUTLINE}`,
              padding: "36px 32px",
              cursor: "pointer",
              userSelect: "none",
              textAlign: "center",
              transition: "all 0.2s ease",
            }}
          >
            {file ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000"
                  strokeWidth="2.5"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  style={{
                    fontFamily: FONT_INTER,
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000000",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: "320px",
                  }}
                >
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={resetFile}
                  aria-label="Remove file"
                  style={{
                    color: "#777169",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    padding: "2px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#777169")
                  }
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d0cdc8"
                  strokeWidth="1.5"
                >
                  <path
                    d="M12 16V8m0 0l-3.5 3.5M12 8l3.5 3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p
                  style={{
                    fontFamily: FONT_INTER,
                    fontSize: "14px",
                    color: "#4e4e4e",
                    letterSpacing: "0.14px",
                    margin: 0,
                  }}
                >
                  Drop your PDF here, or{" "}
                  <span
                    style={{
                      color: "#000000",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    click to browse
                  </span>
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
              style={{ display: "none" }}
            />
          </div>
        </div>

        {/* ── Step 2: Job description ── */}
        <div>
          <label
            htmlFor="job-desc"
            style={{
              display: "block",
              fontFamily: FONT_INTER,
              fontSize: "12px",
              fontWeight: 500,
              color: "#777169",
              letterSpacing: "0.14px",
              marginBottom: "10px",
            }}
          >
            Job Description
          </label>
          <textarea
            id="job-desc"
            value={jobDescription}
            onChange={(e) => {
              setJobDescription(e.target.value);
              setError(null);
            }}
            placeholder="Paste the full job description here…"
            rows={12}
            style={{
              width: "100%",
              background: "#ffffff",
              border: "1px solid #e5e5e5",
              boxShadow: SHADOW_INSET,
              borderRadius: "12px",
              padding: "16px 20px",
              fontSize: "15px",
              fontFamily: FONT_INTER,
              color: "#000000",
              lineHeight: 1.6,
              letterSpacing: "0.16px",
              resize: "vertical",
              outline: "none",
              transition: "box-shadow 0.15s ease, border-color 0.15s ease",
              boxSizing: "border-box",
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow =
                "rgba(0,0,0,0.1) 0px 0px 0px 0.5px inset, rgba(0,0,0,0.1) 0px 0px 0px 1px";
              e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = SHADOW_INSET;
              e.currentTarget.style.borderColor = "#e5e5e5";
            }}
          />
        </div>

        {/* ── Validation error ── */}
        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: "14px 16px",
              borderRadius: "10px",
              background: "rgba(200,60,40,0.04)",
              border: "1px solid rgba(200,60,40,0.15)",
              fontFamily: FONT_INTER,
              fontSize: "14px",
              color: "#b33020",
              letterSpacing: "0.14px",
              lineHeight: 1.5,
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ flexShrink: 0, marginTop: "1px" }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* ── Submit — primary black pill ── */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            background: loading ? "#555" : "#000000",
            color: "#ffffff",
            borderRadius: "9999px",
            padding: "14px 32px",
            fontSize: "15px",
            fontWeight: 500,
            fontFamily: FONT_INTER,
            letterSpacing: "0.15px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.15s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.background = "#222";
          }}
          onMouseLeave={(e) => {
            if (!loading) e.currentTarget.style.background = "#000";
          }}
        >
          {loading ? (
            <>
              <svg
                style={{ animation: "spin 1s linear infinite" }}
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
                  strokeLinecap="round"
                />
              </svg>
              Generating…
            </>
          ) : (
            "Generate Cover Letter"
          )}
        </button>
      </form>

      {/* ── Cover letter result ── */}
      {coverLetter && (
        <div
          ref={resultRef}
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
              marginBottom: "20px",
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

          {/* Letter body — light surface card, Geist Mono relaxed */}
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
      )}
    </div>
  );
}
