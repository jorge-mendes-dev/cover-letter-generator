import { en, type Translations } from "./locales/en";
import { es } from "./locales/es";
import { ptBR } from "./locales/pt-BR";

export type Locale = "en" | "pt-BR" | "es";

export const locales: Record<Locale, Translations> = { en, "pt-BR": ptBR, es };

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  "pt-BR": "PT",
  es: "ES",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  "pt-BR": "Português",
  es: "Español",
};

export function getTranslations(locale: Locale): Translations {
  return locales[locale] ?? en;
}

export type { Translations };
