"use client";

import { cn } from "@/lib/utils";
import { useLang, useT } from "@/i18n/provider";
import { fmt, formatNumber } from "@/i18n/format";
import { useVisitorMarket } from "./use-visitor-market";

/**
 * "Billed as CA$249 a year at checkout; your card converts" — shown only in
 * the U.S. market, under a price that <MarketPrice> shows in USD. Goes away
 * once USD Stripe prices exist (lib/markets: hasNativeStripePrices).
 */
export function UsdHint({ cad, per, className }: { cad: number; per: "year" | "month"; className?: string }) {
  const t = useT("sharedClient").usdHint;
  const lang = useLang();
  const market = useVisitorMarket();
  if (market !== "US") return null;
  return <p className={cn("text-xs", className)}>{fmt(t[per], { cad: formatNumber(cad, lang) })}</p>;
}
