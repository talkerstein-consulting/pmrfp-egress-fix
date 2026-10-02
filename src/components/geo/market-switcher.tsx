"use client";

import { useRouter } from "next/navigation";
import { useT } from "@/i18n/provider";
import { cn } from "@/lib/utils";
import type { MarketCode } from "@/lib/visitor-geo";
import { setMarket, useVisitorMarket } from "./use-visitor-market";

const MARKETS: MarketCode[] = ["CA", "US"];

/**
 * CA | US pills beside the language switch. Sets the market cookie (which
 * beats the visitor's location), updates every price on the page at once and
 * re-renders server pages like the RFP board that filter by country.
 */
export function MarketSwitcher({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const t = useT("common").market;
  const router = useRouter();
  const market = useVisitorMarket() ?? "CA";
  const go = (m: MarketCode) => {
    if (m === market) return;
    setMarket(m);
    router.refresh();
  };
  return (
    <div
      role="group"
      aria-label={t.label}
      className={cn("inline-flex items-center rounded-full p-0.5 text-xs font-semibold", tone === "dark" ? "bg-white/10" : "bg-secondary", className)}
    >
      {MARKETS.map((m) => (
        <button
          key={m}
          type="button"
          aria-pressed={m === market}
          title={t[m]}
          onClick={() => go(m)}
          className={cn(
            "rounded-full px-2.5 py-1 tracking-wide transition-colors",
            m === market
              ? tone === "dark" ? "bg-teal-300 text-indigo" : "bg-indigo text-white"
              : tone === "dark" ? "text-indigo-100/70 hover:text-white" : "text-ink-2/70 hover:text-foreground",
          )}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
