"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { FONT_INTER } from "./tokens";

interface Props {
  loading: boolean;
}

export default function SubmitButton({ loading }: Props) {
  const { t } = useLanguage();
  return (
    <button
      className="primary-button"
      type="submit"
      disabled={loading}
      style={{
        fontSize: "15px",
        fontWeight: 500,
        fontFamily: FONT_INTER,
        letterSpacing: "0.15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      {loading ? (
        <>
          <svg
            style={{ animation: "spin 0.65s linear infinite" }}
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
          {t.form.submitGenerating}
        </>
      ) : (
        t.form.submitGenerate
      )}
    </button>
  );
}
