"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { useRef, useState } from "react";
import {
  CONTROL_TRANSITION,
  FONT_INTER,
  FONT_MONO,
  SHADOW_INSET,
  SHADOW_OUTLINE,
  SHADOW_WARM,
  WARM_STONE,
} from "./tokens";

export type ResumeInputMode = "upload" | "paste";

interface Props {
  file: File | null;
  onFileAccepted: (f: File) => void;
  onFileReset: () => void;
  onError: (msg: string) => void;
  inputMode: ResumeInputMode;
  onInputModeChange: (mode: ResumeInputMode) => void;
  resumeText: string;
  onResumeTextChange: (text: string) => void;
}

export default function ResumeUpload({
  file,
  onFileAccepted,
  onFileReset,
  onError,
  inputMode,
  onInputModeChange,
  resumeText,
  onResumeTextChange,
}: Props) {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const pickFile = (f: File | null) => {
    if (!f) return;
    if (
      f.type !== "application/pdf" &&
      !f.name.toLowerCase().endsWith(".pdf")
    ) {
      onError(t.form.resumeErrorPdf);
      return;
    }
    onFileAccepted(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    pickFile(e.dataTransfer.files?.[0] ?? null);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileReset();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      {/* Section label + mode switch */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "16px",
          marginBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label
            htmlFor={
              inputMode === "upload" ? "resume-file-input" : "resume-text-input"
            }
            style={{
              display: "block",
              fontFamily: FONT_INTER,
              fontSize: "12px",
              fontWeight: 500,
              color: "var(--ink-muted)",
              letterSpacing: "0.14px",
            }}
          >
            {t.form.resumeLabel}
          </label>
          <span
            style={{
              display: "inline-block",
              marginTop: "6px",
              fontFamily: FONT_INTER,
              fontSize: "12px",
              color: "var(--ink-secondary)",
              letterSpacing: "0.14px",
            }}
          >
            {t.form.resumeSubLabel}
          </span>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px",
            borderRadius: "9999px",
            background: "var(--surface-warm)",
            boxShadow: "var(--shadow-warm)",
          }}
        >
          <button
            type="button"
            onClick={() => onInputModeChange("upload")}
            style={{
              fontFamily: FONT_INTER,
              fontSize: "12px",
              fontWeight: inputMode === "upload" ? 500 : 400,
              color: inputMode === "upload" ? "var(--ink)" : "var(--ink-muted)",
              letterSpacing: "0.14px",
              transition: CONTROL_TRANSITION,
              cursor: "pointer",
              userSelect: "none",
              background:
                inputMode === "upload" ? "var(--surface)" : "transparent",
              border: "none",
              borderRadius: "9999px",
              padding: "10px 14px",
              boxShadow: inputMode === "upload" ? SHADOW_OUTLINE : "none",
            }}
          >
            {t.form.resumeTabUpload}
          </button>

          <button
            type="button"
            onClick={() => onInputModeChange("paste")}
            style={{
              fontFamily: FONT_INTER,
              fontSize: "12px",
              fontWeight: inputMode === "paste" ? 500 : 400,
              color: inputMode === "paste" ? "var(--ink)" : "var(--ink-muted)",
              letterSpacing: "0.14px",
              transition: CONTROL_TRANSITION,
              cursor: "pointer",
              userSelect: "none",
              background:
                inputMode === "paste" ? "var(--surface)" : "transparent",
              border: "none",
              borderRadius: "9999px",
              padding: "10px 14px",
              boxShadow: inputMode === "paste" ? SHADOW_OUTLINE : "none",
            }}
          >
            {t.form.resumeTabPaste}
          </button>
        </div>
      </div>

      {inputMode === "upload" ? (
        <div
          className="interactive-card"
          role="button"
          tabIndex={0}
          aria-label={t.form.resumeAriaLabel}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === " ") &&
            fileInputRef.current?.click()
          }
          onDrop={handleDrop}
          onDragEnter={(e) => {
            e.preventDefault();
            dragCounter.current++;
            setIsDragging(true);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={() => {
            dragCounter.current--;
            if (dragCounter.current === 0) setIsDragging(false);
          }}
          style={{
            background: file || isDragging ? WARM_STONE : "var(--surface)",
            borderRadius: "20px",
            boxShadow:
              file || isDragging
                ? SHADOW_WARM
                : `${SHADOW_INSET}, ${SHADOW_OUTLINE}`,
            padding: "36px 32px",
            cursor: "pointer",
            userSelect: "none",
            textAlign: "center",
            transition:
              "background-color 180ms var(--ease-out), box-shadow 180ms var(--ease-out), transform 180ms var(--ease-out)",
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
                stroke="currentColor"
                strokeWidth="2.5"
                style={{ color: "var(--ink)" }}
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
                  color: "var(--ink)",
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
                onClick={handleReset}
                aria-label="Remove file"
                style={{
                  color: "var(--ink-muted)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  padding: "6px",
                  borderRadius: "9999px",
                  transition: CONTROL_TRANSITION,
                }}
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
                stroke="var(--upload-icon-stroke)"
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
                  color: "var(--ink-secondary)",
                  letterSpacing: "0.14px",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                {t.form.resumeDropText}{" "}
                <span
                  style={{
                    color: "var(--ink)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                  }}
                >
                  {t.form.resumeBrowseText}
                </span>
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            id="resume-file-input"
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
            style={{ display: "none" }}
          />
        </div>
      ) : (
        <textarea
          className="text-input"
          id="resume-text-input"
          value={resumeText}
          onChange={(e) => onResumeTextChange(e.target.value)}
          placeholder={t.form.resumeTextPlaceholder}
          rows={10}
          style={{
            fontFamily: FONT_MONO,
            fontSize: "13px",
            lineHeight: "1.85",
            color: "var(--ink)",
            padding: "16px",
            resize: "vertical",
            letterSpacing: "0",
          }}
        />
      )}
    </div>
  );
}
