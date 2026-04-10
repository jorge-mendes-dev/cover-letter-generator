"use client";

import { useRef, useState } from "react";
import {
  FONT_INTER,
  SHADOW_INSET,
  SHADOW_OUTLINE,
  SHADOW_WARM,
  WARM_STONE,
} from "./tokens";

interface Props {
  file: File | null;
  onFileAccepted: (f: File) => void;
  onFileReset: () => void;
  onError: (msg: string) => void;
}

export default function ResumeUpload({
  file,
  onFileAccepted,
  onFileReset,
  onError,
}: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const pickFile = (f: File | null) => {
    if (!f) return;
    if (
      f.type !== "application/pdf" &&
      !f.name.toLowerCase().endsWith(".pdf")
    ) {
      onError("Only PDF files are supported.");
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
      <label
        htmlFor="resume-file-input"
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

      <div
        role="button"
        tabIndex={0}
        aria-label="Upload resume PDF"
        onClick={() => fileInputRef.current?.click()}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && fileInputRef.current?.click()
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
              onClick={handleReset}
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
              onMouseLeave={(e) => (e.currentTarget.style.color = "#777169")}
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
          id="resume-file-input"
          type="file"
          accept=".pdf,application/pdf"
          onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}
