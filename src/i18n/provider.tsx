"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, splitLocale, type Locale } from "./config";
import type { ClientMessages } from "./dictionaries";

type Ctx = { lang: Locale; messages: ClientMessages } | null;
// One context object per runtime. Hot reload can re-run this module; a fresh
// createContext() would leave already-rendered providers on the old object and
// every useT() below them would see no provider. Production loads it once anyway.
const g = globalThis as { __pmrfpI18nContext?: React.Context<Ctx> };
const I18nContext = (g.__pmrfpI18nContext ??= createContext<Ctx>(null));

/** Set once in app/[lang]/layout with the namespaces client components use. */
export function I18nProvider({ lang, messages, children }: { lang: Locale; messages: ClientMessages; children: React.ReactNode }) {
  return <I18nContext.Provider value={{ lang, messages }}>{children}</I18nContext.Provider>;
}

export function useLang(): Locale {
  return useContext(I18nContext)?.lang ?? DEFAULT_LOCALE;
}

/** Client-side strings for one namespace: const t = useT("common"); t.nav.rfps */
export function useT<N extends keyof ClientMessages>(ns: N): ClientMessages[N] {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useT must be used inside I18nProvider");
  return ctx.messages[ns];
}

/** The current path without its language prefix ("/fr/rfps" -> "/rfps"), for active-link checks. */
export function useLocalePath(): string {
  return splitLocale(usePathname() ?? "/").path;
}
