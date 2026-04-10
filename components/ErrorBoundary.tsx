"use client";

import { Component, type ReactNode } from "react";
import { FONT_INTER, FONT_MONO, SHADOW_OUTLINE } from "./form/tokens";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: null };
  }

  static getDerivedStateFromError(error: unknown): State {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown, info: { componentStack: string }) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, message: null });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            background: "var(--surface)",
            borderRadius: "20px",
            boxShadow: SHADOW_OUTLINE,
            padding: "48px 40px",
            maxWidth: "480px",
            width: "100%",
            textAlign: "center",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "rgba(0,0,0,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ color: "var(--ink)" }}
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          {/* Heading */}
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "36px",
              fontWeight: 300,
              letterSpacing: "-0.5px",
              color: "var(--ink)",
              lineHeight: 1.1,
              marginBottom: "12px",
            }}
          >
            Something went wrong
          </h2>

          {/* Error message */}
          {this.state.message && (
            <p
              style={{
                fontFamily: FONT_MONO,
                fontSize: "12px",
                color: "var(--ink-muted)",
                background: "var(--border-subtle)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "8px",
                padding: "10px 14px",
                marginBottom: "32px",
                wordBreak: "break-word",
                lineHeight: 1.7,
              }}
            >
              {this.state.message}
            </p>
          )}

          {/* Sub-text */}
          <p
            style={{
              fontFamily: FONT_INTER,
              fontSize: "14px",
              fontWeight: 400,
              color: "var(--ink-secondary)",
              letterSpacing: "0.14px",
              lineHeight: 1.6,
              marginBottom: "32px",
            }}
          >
            An unexpected error occurred while rendering the page. You can try
            again or reload the application.
          </p>

          {/* Actions */}
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <button
              onClick={this.handleReset}
              style={{
                fontFamily: FONT_INTER,
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.14px",
                color: "var(--btn-primary-text)",
                background: "var(--btn-primary-bg)",
                border: "none",
                borderRadius: "9999px",
                padding: "10px 24px",
                cursor: "pointer",
              }}
            >
              Try again
            </button>

            <button
              onClick={() => window.location.reload()}
              style={{
                fontFamily: FONT_INTER,
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.14px",
                color: "var(--ink)",
                background: "var(--surface)",
                border: "none",
                borderRadius: "9999px",
                padding: "10px 22px",
                cursor: "pointer",
                boxShadow: "var(--shadow-button)",
              }}
            >
              Reload page
            </button>
          </div>
        </div>
      </div>
    );
  }
}
