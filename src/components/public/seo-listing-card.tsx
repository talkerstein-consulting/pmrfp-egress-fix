"use client";
import { MarketPrice } from "@/components/geo/market-price";
import { UsdHint } from "@/components/geo/usd-hint";

import Link from "@/i18n/link";
import { useState } from "react";
import { signUpHrefForPlan } from "@/lib/billing/plan-intent";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRICING } from "@/lib/site";
import { useLang, useT } from "@/i18n/provider";
import { fmt, formatNumber } from "@/i18n/format";

export function SeoListingCard({ monthlyEnabled = true }: { monthlyEnabled?: boolean }) {
  const t = useT("salesClient");
  const lang = useLang();
  const [interval, setInterval] = useState<"annual" | "monthly">("annual");
  const isAnnual = interval === "annual" || !monthlyEnabled;

  const annualEffective = PRICING.seoMonthly * 12;
  const savings = annualEffective - PRICING.seoAnnual;
  const num = (n: number) => formatNumber(n, lang);

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-8">
      <h2 className="text-lg font-semibold text-foreground">{t.seo.name}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {t.seo.blurb}
      </p>

      {monthlyEnabled && (
        <div
          role="tablist"
          aria-label={t.interval.label}
          className="mt-5 inline-flex self-start rounded-full border border-border bg-background p-1"
        >
          <button
            role="tab"
            aria-selected={isAnnual}
            onClick={() => setInterval("annual")}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition",
              isAnnual ? "bg-indigo text-white" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {fmt(t.interval.annual, { n: num(savings) })}
          </button>
          <button
            role="tab"
            aria-selected={!isAnnual}
            onClick={() => setInterval("monthly")}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-semibold transition",
              !isAnnual ? "bg-indigo text-white" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.interval.monthly}
          </button>
        </div>
      )}

      <div className="mt-5 flex items-baseline gap-1">
        <MarketPrice
          cad={isAnnual ? PRICING.seoAnnual : PRICING.seoMonthly}
          per={isAnnual ? "year" : "month"}
          numberClassName="text-4xl font-semibold text-foreground"
          perClassName="text-sm text-muted-foreground"
        />
      </div>
      <UsdHint cad={isAnnual ? PRICING.seoAnnual : PRICING.seoMonthly} per={isAnnual ? "year" : "month"} className="mt-1 text-teal-700" />
      <p className="mt-1 text-xs text-muted-foreground">
        {isAnnual
          ? fmt(t.billedAnnually, {
              n: formatNumber(PRICING.seoAnnual / 12, lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            })
          : fmt(t.monthlyNote, { total: num(annualEffective), savings: num(savings) })}
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {t.seo.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-teal-600" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={signUpHrefForPlan("seo", isAnnual ? "annual" : "monthly")}
        className={cn(buttonVariants({ size: "lg", variant: "outline" }), "mt-8 w-full")}
      >
        {t.seo.cta}
      </Link>
    </div>
  );
}
