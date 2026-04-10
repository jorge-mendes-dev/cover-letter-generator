"use client";

import { FONT_INTER, SHADOW_INSET } from "./tokens";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescriptionField({ value, onChange }: Props) {
  return (
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  );
}
