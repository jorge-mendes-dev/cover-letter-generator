"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { FONT_INTER } from "./tokens";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function JobDescriptionField({ value, onChange }: Props) {
  const { t } = useLanguage();
  return (
    <div>
      <label
        htmlFor="job-desc"
        style={{
          display: "block",
          fontFamily: FONT_INTER,
          fontSize: "12px",
          fontWeight: 500,
          color: "var(--ink-muted)",
          letterSpacing: "0.14px",
          marginBottom: "10px",
        }}
      >
        {t.form.jobDescLabel}
      </label>
      <textarea
        className="text-input"
        id="job-desc"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.form.jobDescPlaceholder}
        rows={12}
        style={{
          padding: "16px 20px",
          fontSize: "15px",
          fontFamily: FONT_INTER,
          color: "var(--ink)",
          lineHeight: 1.6,
          letterSpacing: "0.16px",
          resize: "vertical",
        }}
      />
    </div>
  );
}
