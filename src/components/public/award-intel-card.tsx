import Link from "@/i18n/link";
import { Lock, TrendingUp, Trophy } from "lucide-react";
import type { AwardIntel } from "@/lib/data/award-intel";
import { compactDollars } from "@/lib/data/fomo";
import { tradeWords } from "@/lib/gc/packages";
import { getLang, getT } from "@/i18n/server";
import { fmt, plural } from "@/i18n/format";
import { regionName, tradeName } from "@/i18n/terms";

/**
 * "What this job is worth" + "who wins this work" on an open tender. Members
 * see the numbers; everyone else sees how much data exists and the upgrade.
 * The locked version is rendered without the numbers, so they're never in the
 * page for non-members.
 */
export function AwardIntelCard({
  intel,
  locked,
  upgradeHref,
}: {
  intel: AwardIntel | { scope: string; trade: string; count: number };
  locked: boolean;
  upgradeHref: string;
}) {
  const t = getT("shared").intel;
  const lang = getLang();
  // Mid-sentence trade name. Spanish keeps acronyms ("HVAC (climatización)"); English/French stay as before.
  const trade = lang === "es" ? tradeWords(tradeName(intel.trade, lang)) : tradeName(intel.trade, lang).toLowerCase();
  // scope is a region, a province, "Canada" or "the U.S." (lib/data/award-intel.ts).
  const scope = lang === "en" ? intel.scope : intel.scope === "the U.S." ? t.usScope : regionName(intel.scope, lang);
  if (locked || !("low" in intel)) {
    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <TrendingUp className="size-4 text-teal-700" /> {t.title}
          <Lock className="ml-auto size-4 text-muted-foreground" />
        </h2>
        <div aria-hidden className="mt-3 flex items-center gap-3 blur-[6px] select-none">
          <span className="h-8 w-24 rounded-md bg-indigo/15" />
          <span className="text-muted-foreground">{t.to}</span>
          <span className="h-8 w-28 rounded-md bg-indigo/15" />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {t.lockedBefore}
          <strong className="text-foreground">{fmt(t.lockedStrong, { count: intel.count, trade })}</strong>
          {fmt(t.lockedAfter, { scope })}
        </p>
        <Link
          href={upgradeHref}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-indigo-700"
        >
          {t.lockedCta}
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-teal-400/50 bg-teal-50/40 p-5">
      <h2 className="flex items-center gap-2 text-base font-semibold tracking-tight">
        <TrendingUp className="size-4 text-teal-700" /> {t.title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {fmt(t.similar, { trade, scope })}
      </p>
      <p className="mt-1 font-heading text-3xl font-extrabold tracking-tight text-indigo">
        {compactDollars(intel.low, lang)} – {compactDollars(intel.high, lang)}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        {fmt(t.median, { median: compactDollars(intel.median, lang) })}
        {intel.count >= 6 ? t.middleHalf : ""}
        {fmt(t.withValue, { count: intel.count })}
      </p>
      {intel.winners.length > 0 && (
        <div className="mt-5 border-t border-teal-400/30 pt-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Trophy className="size-4 text-teal-700" /> {t.whoWins}
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            {intel.winners.map((w) => (
              <li key={w.name} className="flex items-baseline justify-between gap-3">
                {w.slug ? (
                  <Link href={`/contract-winners/${w.slug}`} className="min-w-0 truncate font-medium hover:text-teal-700 hover:underline">
                    {w.name}
                  </Link>
                ) : (
                  <span className="min-w-0 truncate font-medium">{w.name}</span>
                )}
                <span className="shrink-0 text-muted-foreground">
                  {plural(w.wins, t.wins)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
        {t.footnote}
      </p>
    </div>
  );
}
