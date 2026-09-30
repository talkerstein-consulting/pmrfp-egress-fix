"use client";

import Link from "@/i18n/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { visitorMarket, visitorRegionSlug } from "@/lib/visitor-geo";
import { useVisitorGeo } from "@/components/geo/use-visitor-geo";
import { useLang, useT } from "@/i18n/provider";
import { fmt, formatNumber, plural } from "@/i18n/format";

export interface FinderPlace {
  slug: string;
  name: string;
  country: "CA" | "US";
  /** 0 = country, 1 = province/state, 2+ = inside it. The list arrives in map order (lib/data/place-order). */
  depth: number;
}

/**
 * "Is this useful to me?" before any sign-up: pick a trade and an area, see how
 * many tenders are open right now, and go straight to them. The area defaults
 * to the visitor's province/state (IP geolocation). Counts come from the
 * server (openCountsByTradeRegion) — no client fetching. Trade and place
 * names arrive already translated.
 */
export function JobFinder({
  trades,
  places,
  counts,
  livePages,
}: {
  trades: { slug: string; name: string }[];
  places: FinderPlace[];
  /** "trade|place" and "trade|*" → open tenders. */
  counts: Record<string, number>;
  /** "trade|place" combos with a /trades/[trade]/[place] page. */
  livePages: string[];
}) {
  const geo = useVisitorGeo();
  const lang = useLang();
  const t = useT("jobsClient").finder;
  // English keeps its bare digits; other languages get their separators.
  const num = (x: number) => (lang === "en" ? String(x) : formatNumber(x, lang));
  const [trade, setTrade] = useState("");
  const [place, setPlace] = useState("");
  const [touched, setTouched] = useState(false);

  // Default the area to where the visitor is, unless they already picked one.
  useEffect(() => {
    if (!geo || touched) return;
    const home = visitorRegionSlug(geo);
    const country = visitorMarket(geo) === "US" ? "united-states" : "canada";
    const pick = [home, country].find((s) => s && places.some((p) => p.slug === s));
    // Geolocation arrives after mount; this is the one-time sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (pick) setPlace(pick);
  }, [geo, touched, places]);

  const tradeName = trades.find((t) => t.slug === trade)?.name;
  const placeName = places.find((p) => p.slug === place)?.name;
  const n = trade ? counts[`${trade}|${place || "*"}`] ?? 0 : null;
  const everywhere = trade ? counts[`${trade}|*`] ?? 0 : 0;
  const live = trade && place && livePages.includes(`${trade}|${place}`);
  const href = !trade ? "/rfps" : live ? `/trades/${trade}/${place}` : `/trades/${trade}`;

  // Native <select> can't indent, so non-breaking spaces do it.
  const indent = (depth: number) => "    ".repeat(Math.max(0, depth - 1));

  const select =
    "h-12 w-full rounded-lg border-0 bg-white px-3 text-sm font-medium text-foreground shadow-sm focus:ring-2 focus:ring-teal-300";

  return (
    <div className="rounded-2xl bg-white/[0.07] p-3 ring-1 ring-white/10 sm:p-4">
      <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <label className="sr-only" htmlFor="finder-trade">{t.yourTrade}</label>
        <select id="finder-trade" value={trade} onChange={(e) => setTrade(e.target.value)} className={select}>
          <option value="">{t.yourTrade}</option>
          {trades.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
              {counts[`${c.slug}|*`] ? ` ${plural(counts[`${c.slug}|*`], t.openCount, { n: num(counts[`${c.slug}|*`]) })}` : ""}
            </option>
          ))}
        </select>
        <label className="sr-only" htmlFor="finder-place">{t.yourArea}</label>
        <select
          id="finder-place"
          value={place}
          onChange={(e) => {
            setTouched(true);
            setPlace(e.target.value);
          }}
          className={select}
        >
          <option value="">{t.anywhere}</option>
          {(["CA", "US"] as const).map((c) => (
            <optgroup key={c} label={c === "CA" ? t.canada : t.unitedStates}>
              {places
                .filter((p) => p.country === c)
                .map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.depth === 0 ? (c === "CA" ? t.allCanada : t.allUs) : `${indent(p.depth)}${p.name}`}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <Link href={href} className={cn(buttonVariants({ size: "lg", variant: "accent" }), "h-12 active:scale-[0.98]")}>
          {n ? plural(n, t.show, { n: num(n) }) : t.seeOpen} <ArrowRight className="size-4" />
        </Link>
      </div>
      <p className="mt-3 min-h-5 px-1 text-sm text-indigo-100/80" aria-live="polite">
        {!trade
          ? t.pickTrade
          : n
            ? plural(n, placeName ? t.openIn : t.openAcross, {
                n: num(n),
                // English reads "open roofing tenders"; French and Spanish lead with the name as is.
                trade: (lang === "en" ? tradeName?.toLowerCase() : tradeName) ?? "",
                place: placeName ?? "",
              })
            : placeName
              ? fmt(t.nothingIn, { place: placeName, n: num(everywhere) })
              : fmt(t.nothingArea, { n: num(everywhere) })}
      </p>
    </div>
  );
}
