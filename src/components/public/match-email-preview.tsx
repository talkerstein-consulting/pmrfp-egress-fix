import Image from "next/image";
import { Lock } from "lucide-react";
import type { RfpListItem } from "@/lib/data/types";
import { closingLabel, daysUntil } from "@/lib/data/fomo";
import { getLang, getT } from "@/i18n/server";
import { fmt, plural } from "@/i18n/format";
import { regionName, tradeName } from "@/i18n/terms";

/**
 * What a Trade Pro member's morning email looks like, drawn from tenders that
 * are open on the board right now (not a mock list). Styled like an inbox
 * preview so a visitor can picture it arriving.
 */
export function MatchEmailPreview({ trade, place, rows }: { trade: string; place: string; rows: RfpListItem[] }) {
  if (!rows.length) return null;
  const lang = getLang();
  const t = getT("home").preview;
  // `place` arrives already translated ("across Canada"); trade names come from the DB in English.
  const subject = plural(rows.length, t.subject, { trade: tradeName(trade, lang), place });
  /** Same thresholds as closingLabel (a week out or less), in the page's language. */
  const closes = (days: number | null) =>
    closingLabel(days) === null ? null : days === 0 ? t.closesToday : days === 1 ? t.closesTomorrow : fmt(t.closesIn, { n: days ?? 0 });
  return (
    <div className="relative pt-4">
      {/* Yesterday's and the day before's, peeking out behind. */}
      <div aria-hidden className="absolute inset-x-10 top-0 h-24 rounded-2xl border border-border bg-card/60" />
      <div aria-hidden className="absolute inset-x-5 top-2 h-24 rounded-2xl border border-border bg-card/80" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-indigo/15">
        <div className="flex items-center gap-3 border-b border-border bg-secondary/60 px-5 py-3.5">
          <Image src="/brand/mark.svg" alt="" width={32} height={32} className="size-8 shrink-0 rounded-lg" />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="font-semibold text-foreground">PMRFP</span>
              <span className="shrink-0 text-xs text-muted-foreground">{t.time}</span>
            </div>
            <div className="truncate text-sm font-medium text-foreground/90">{subject}</div>
          </div>
        </div>
        <div className="px-5 pb-6 pt-5 sm:px-7">
          <p className="text-sm text-muted-foreground">
            {t.intro}
          </p>
          <ul className="mt-4 space-y-3">
            {rows.map((r) => {
              const soon = closes(daysUntil(r.deadline));
              return (
                <li
                  key={r.slug}
                  className="rounded-xl border border-border bg-background p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-mono text-[11px] uppercase tracking-wide text-teal-700">
                      {tradeName(r.categories[0] ?? trade, lang)} · {r.regionName ? regionName(r.regionName, lang) : t.canada}
                    </div>
                    {soon && (
                      <span className="shrink-0 text-[11px] font-semibold text-foreground">
                        {soon}
                      </span>
                    )}
                  </div>
                  <div className="mt-1.5 line-clamp-2 font-semibold leading-snug text-indigo">{r.title}</div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Lock className="size-3" /> {t.locked}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-5 inline-flex rounded-[10px] bg-indigo px-5 py-2.5 text-sm font-semibold text-white">
            {t.open}
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">{t.note}</p>
    </div>
  );
}
