import { Mail } from "lucide-react";
import type { RfpListItem } from "@/lib/data/types";
import { SITE } from "@/lib/site";
import { getLang, getT } from "@/i18n/server";
import { fmt, formatDate, plural } from "@/i18n/format";
import { regionName, tradeName } from "@/i18n/terms";

/**
 * What a Trade Pro member actually receives: the daily match digest
 * (lib/alerts/digest + sendDailyMatches), rendered with real open RFPs so the
 * buyer sees the product before paying. Mirrors the email's structure: one
 * email, every match, soonest deadline first.
 */
export function EmailPreview({ items, tradeLabel }: { items: RfpListItem[]; tradeLabel: string }) {
  const t = getT("sales").email;
  const lang = getLang();
  const n = items.length;
  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-indigo/10">
      <div className="flex items-center gap-3 border-b border-border bg-secondary/60 px-5 py-3 text-sm">
        <Mail className="size-4 text-muted-foreground" />
        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground">
            {plural(n, t.subject, { trade: tradeName(tradeLabel, lang), site: SITE.name })}
          </p>
          <p className="text-xs text-muted-foreground">{fmt(t.from, { site: SITE.name, email: SITE.email })}</p>
        </div>
      </div>
      <div className="px-6 py-5">
        <p className="text-sm text-muted-foreground">
          {t.intro}
        </p>
        <ul className="mt-4 space-y-4">
          {items.map((r) => (
            <li key={r.slug}>
              <p className="font-semibold text-indigo">{r.title}</p>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-teal-700">
                {[
                  r.categories[0] && tradeName(r.categories[0], lang),
                  r.regionName && regionName(r.regionName, lang),
                  r.deadline ? fmt(t.closes, { date: formatDate(`${r.deadline}T12:00:00Z`, lang) }) : t.noDeadline,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              {r.summary && (
                <p className="mt-1 line-clamp-2 text-sm text-foreground/80">{r.summary}</p>
              )}
            </li>
          ))}
        </ul>
        <span className="mt-5 inline-block rounded-lg bg-indigo px-4 py-2 text-sm font-semibold text-white">{t.cta}</span>
      </div>
    </div>
  );
}
