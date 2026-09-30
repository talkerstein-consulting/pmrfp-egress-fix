"use client";

import Link from "@/i18n/link";
import { useState } from "react";
import { signUpHrefForPlan } from "@/lib/billing/plan-intent";
import { Check, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRICING, SITE } from "@/lib/site";
import { UsdHint } from "@/components/geo/usd-hint";
import { useLang, useT } from "@/i18n/provider";
import { fmt, formatNumber } from "@/i18n/format";

export function TradeProCard({ monthlyEnabled = true }: { monthlyEnabled?: boolean }) {
  const t = useT("salesClient");
  const lang = useLang();
  const [interval, setInterval] = useState<"annual" | "monthly">("annual");
  const isAnnual = interval === "annual" || !monthlyEnabled;

  const annualEffective = PRICING.proMonthly * 12;
  const savings = annualEffective - PRICING.proAnnual;
  const num = (n: number) => formatNumber(n, lang);

  // Both intervals route to /sign-up; trade picks final interval on /dashboard/billing
  // after onboarding (keeps signup flow simple, both plans visible at activation).

  return (
    <div className="relative flex h-full flex-col rounded-xl border border-teal-400 bg-card p-8 ring-2 ring-teal-400">
      <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-white">
        <Sparkles className="size-3.5" />
        {t.tradePro.badge}
      </span>
      <h2 className="text-lg font-semibold text-foreground">Trade Pro</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {t.tradePro.blurb}
      </p>

      {/* Interval toggle — hidden until monthly price is configured in Stripe */}
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
              isAnnual
                ? "bg-indigo text-white"
                : "text-muted-foreground hover:text-foreground",
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
              !isAnnual
                ? "bg-indigo text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.interval.monthly}
          </button>
        </div>
      )}

      <div className="mt-5 flex items-baseline gap-1">
        <span className="text-4xl font-semibold text-foreground">
          {fmt(t.price, { n: num(isAnnual ? PRICING.proAnnual : PRICING.proMonthly) })}
        </span>
        <span className="text-sm text-muted-foreground">
          {fmt(isAnnual ? t.perYear : t.perMonth, { currency: PRICING.currency })}
        </span>
      </div>
      <UsdHint cad={isAnnual ? PRICING.proAnnual : PRICING.proMonthly} per={isAnnual ? "year" : "month"} className="mt-1 text-teal-700" />
      <p className="mt-1 text-xs text-muted-foreground">
        {isAnnual
          ? fmt(t.billedAnnually, { n: formatNumber(PRICING.proAnnual / 12, lang, { maximumFractionDigits: 0 }) })
          : fmt(t.monthlyNote, { total: num(annualEffective), savings: num(savings) })}
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {t.tradePro.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-foreground">
            <Check className="mt-0.5 size-4 shrink-0 text-teal-600" />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={signUpHrefForPlan("pro", isAnnual ? "annual" : "monthly")}
        className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full")}
      >
        {fmt(t.tradePro.cta, { site: SITE.name })}
      </Link>
    </div>
  );
}
