"use client";

import { localeLabels, localeNames, type Locale } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

const LOCALES = Object.keys(localeLabels) as Locale[];

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${localeNames[locale]}`}
        style={{
          height: "38px",
          borderRadius: "9999px",
          background: "var(--surface)",
          boxShadow: "var(--shadow-button)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          padding: "0 12px",
          color: "var(--ink-secondary)",
          transition: "color 0.15s ease, box-shadow 0.15s ease",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--ink)";
          e.currentTarget.style.boxShadow = "var(--shadow-button-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--ink-secondary)";
          e.currentTarget.style.boxShadow = "var(--shadow-button)";
        }}
      >
        {/* Globe icon */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {localeLabels[locale]}
        </span>
        {/* Chevron */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
          style={{
            transition: "transform 0.15s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <path
            d="M2.5 5L7 9.5L11.5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            minWidth: "130px",
            background: "var(--surface)",
            borderRadius: "12px",
            boxShadow:
              "rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 1px 2px, rgba(0,0,0,0.08) 0px 8px 24px",
            listStyle: "none",
            padding: "6px",
            margin: 0,
            zIndex: 50,
          }}
        >
          {LOCALES.map((loc) => {
            const active = loc === locale;
            return (
              <li key={loc} role="option" aria-selected={active}>
                <button
                  onClick={() => {
                    setLocale(loc);
                    setOpen(false);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 10px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    background: active ? "var(--bg)" : "transparent",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "13px",
                    fontWeight: active ? 500 : 400,
                    color: active ? "var(--ink)" : "var(--ink-secondary)",
                    letterSpacing: "0.14px",
                    textAlign: "left",
                    transition: "background 0.1s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.background = "var(--bg)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "26px",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      color: active ? "var(--ink)" : "var(--ink-muted)",
                    }}
                  >
                    {localeLabels[loc]}
                  </span>
                  {localeNames[loc]}
                  {active && (
                    <svg
                      style={{ marginLeft: "auto" }}
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
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
