"use client";

import { approxUsd } from "@/lib/markets";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n/provider";
import { fmt } from "@/i18n/format";
import { useVisitorGeo } from "./use-visitor-geo";

/** "About US$180 a year · billed in CAD" (French: "Environ 180 $ US par an") — shown only to visitors in the U.S. */
export function UsdHint({ cad, per, className }: { cad: number; per: "year" | "month"; className?: string }) {
  const t = useT("sharedClient").usdHint;
  const geo = useVisitorGeo();
  if (geo?.country !== "US") return null;
  return (
    <p className={cn("text-xs", className)}>
      {fmt(t[per], { usd: approxUsd(cad) })}
    </p>
  );
}
