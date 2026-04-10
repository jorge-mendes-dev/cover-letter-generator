"use client";

import { FONT_INTER } from "./tokens";

interface Props {
  loading: boolean;
}

export default function SubmitButton({ loading }: Props) {
  return (
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
  );
}
