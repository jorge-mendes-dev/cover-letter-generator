"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function readInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      return "dark";
  } catch {
    // localStorage may throw in restricted environments
  }
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always start with "light" to match the server render (avoids hydration
  // mismatch). CSS @media prefers-color-scheme handles the visual before JS
  // runs, so there is no FOUC.
  const [theme, setTheme] = useState<Theme>("light");

  // After hydration, sync with the user's stored or OS preference.
  useEffect(() => {
    setTheme(readInitialTheme());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme: () => setTheme((t) => (t === "light" ? "dark" : "light")),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
