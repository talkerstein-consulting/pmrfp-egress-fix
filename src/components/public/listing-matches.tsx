import Image from "next/image";
import Link from "@/i18n/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { monoColor, monogram } from "@/components/public/featured-vendor-card";
import { getListingMatches, type MatchedCompany } from "@/lib/match/data";
import type { Match, MatchListing } from "@/lib/match/listing-match";
import { getLang, getT } from "@/i18n/server";
import { fmt } from "@/i18n/format";
import { regionName, tradeName } from "@/i18n/terms";

/**
 * "Who can do this job" on a listing: directory companies that do the
 * listing's trade and cover its area, then suppliers that sell into it.
 * Featured (paid) companies rank first and say so. With no match, it asks
 * trades and suppliers to list themselves, which is how the gap closes.
 */
export async function ListingMatches({
  listing,
  seed,
  exclude,
  className,
}: {
  listing: MatchListing;
  seed: string;
  exclude?: string[];
  className?: string;
}) {
  if (!listing.categories.length) return null;
  const t = getT("board").detail.matches;
  const lang = getLang();
  const { trades, suppliers } = await getListingMatches(listing, { seed, exclude });
  const trade = tradeName(listing.categories[0], lang);
  const area = regionName(listing.regionName ?? listing.province ?? (listing.market === "US" ? "United States" : "Canada"), lang);

  if (!trades.length && !suppliers.length) {
    return (
      <section className={cn("rounded-lg border border-dashed border-border bg-card p-5", className)}>
        <h2 className="font-heading text-base font-semibold tracking-tight text-indigo">
          {fmt(t.emptyTitle, { trade, area })}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.emptyBody}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <Link href="/sign-up?role=trade" className="text-teal-700 hover:underline">
            {t.listTrade}
          </Link>
          <Link href="/sign-up?role=supplier" className="text-teal-700 hover:underline">
            {t.listSupplier}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("rounded-lg border border-border bg-card", className)}>
      <h2 className="border-b border-border px-5 py-4 font-heading text-base font-semibold tracking-tight text-indigo">
        {t.title}
      </h2>
      {trades.length > 0 && <Group label={t.trades} matches={trades} line={t.does} featured={t.featured} />}
      {suppliers.length > 0 && <Group label={t.suppliers} matches={suppliers} line={t.supplies} featured={t.featured} />}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border px-5 py-3 text-xs">
        <span className="text-muted-foreground">{t.note}</span>
        <Link href="/sign-up?role=trade" className="font-medium text-teal-700 hover:underline">
          {t.listTrade}
        </Link>
        <Link href="/pricing" className="font-medium text-teal-700 hover:underline">
          {t.getFeatured}
        </Link>
      </div>
    </section>
  );
}

function Group({
  label,
  matches,
  line,
  featured,
}: {
  label: string;
  matches: Match<MatchedCompany>[];
  line: string;
  featured: string;
}) {
  const lang = getLang();
  return (
    <div className="px-5 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <ul className="mt-2 divide-y divide-border">
        {matches.map(({ company: c, trade, area }) => (
          <li key={c.slug}>
            <Link href={`/directory/${c.slug}`} className="group flex items-center gap-3 py-2.5">
              {c.logoUrl ? (
                <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white">
                  <Image src={c.logoUrl} alt="" fill sizes="36px" className="object-contain p-0.5" unoptimized={c.logoUrl.endsWith(".svg")} />
                </span>
              ) : (
                <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white", monoColor(c.name))}>
                  {monogram(c.name)}
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="flex min-w-0 items-center gap-2">
                  <b className="truncate text-sm font-semibold text-indigo group-hover:text-teal-700">{c.name}</b>
                  {c.verified && <BadgeCheck className="size-3.5 shrink-0 text-teal-700" aria-hidden />}
                  {(c.featured || c.platinum) && (
                    <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wide text-amber-800">
                      {featured}
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                  {fmt(line, { trade: tradeName(trade, lang), area: regionName(area, lang) })}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-border-strong transition-transform group-hover:translate-x-0.5 group-hover:text-teal-700" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
