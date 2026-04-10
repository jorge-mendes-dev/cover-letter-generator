import { FONT_INTER } from "./tokens";

interface Props {
  message: string;
}

export default function ErrorBanner({ message }: Props) {
  return (
    <div
      role="alert"
      aria-live="assertive"
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
      <span>{message}</span>
    </div>
  );
}
