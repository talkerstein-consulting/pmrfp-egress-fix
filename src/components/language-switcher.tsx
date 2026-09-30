"use client";

import { ENABLED_LOCALES, LOCALE_COOKIE, LOCALE_NAME, LOCALE_TAG, localizePath, splitLocale, type Locale } from "@/i18n/config";
import { useLang, useT } from "@/i18n/provider";
import { cn } from "@/lib/utils";

/**
 * EN | FR pills. Remembers the choice (the proxy reads the cookie so plain
 * links keep the language) and reloads the same page in the other language.
 */
export function LanguageSwitcher({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const lang = useLang();
  const t = useT("common");
  if (ENABLED_LOCALES.length < 2) return null;

  const go = (target: Locale) => {
    if (target === lang) return;
    document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
    const { path } = splitLocale(window.location.pathname);
    window.location.assign(localizePath(path, target) + window.location.search + window.location.hash);
  };

  return (
    <div role="group" aria-label={t.lang.label} className={cn("inline-flex items-center rounded-full p-0.5 text-xs font-semibold", tone === "dark" ? "bg-white/10" : "bg-secondary", className)}>
      {ENABLED_LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          lang={LOCALE_TAG[l]}
          aria-pressed={l === lang}
          title={LOCALE_NAME[l]}
          onClick={() => go(l)}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
            l === lang
              ? tone === "dark" ? "bg-teal-300 text-indigo" : "bg-indigo text-white"
              : tone === "dark" ? "text-indigo-100/70 hover:text-white" : "text-ink-2/70 hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
