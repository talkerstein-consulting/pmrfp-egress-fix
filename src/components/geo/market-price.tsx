"use client";

import { toUsd } from "@/lib/markets";
import { useLang, useT } from "@/i18n/provider";
import { fmt, formatNumber } from "@/i18n/format";
import { useUsdPerCad, useVisitorMarket } from "./use-visitor-market";

/**
 * A price in the visitor's currency: "$249 CAD/year" in Canada, "$179
 * USD/year" in the U.S. (today's Bank of Canada rate). Server-rendered in CAD,
 * then swapped for U.S. visitors. Pair it with <UsdHint> (the "billed as
 * CA$…" note) while billing stays in CAD.
 */
export function MarketPrice({
  cad,
  per,
  numberClassName,
  perClassName,
}: {
  cad: number;
  per: "year" | "month";
  numberClassName?: string;
  perClassName?: string;
}) {
  const t = useT("sharedClient").price;
  const lang = useLang();
  const market = useVisitorMarket();
  const rate = useUsdPerCad();
  const us = market === "US";
  const n = us ? toUsd(cad, rate) : cad;
  return (
    <>
      <span className={numberClassName}>{fmt(t.amount, { n: formatNumber(n, lang) })}</span>
      <span className={perClassName}>{fmt(per === "year" ? t.perYear : t.perMonth, { currency: us ? "USD" : "CAD" })}</span>
    </>
  );
}
