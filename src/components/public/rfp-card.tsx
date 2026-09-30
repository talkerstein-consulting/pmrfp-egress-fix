import Link from "@/i18n/link";
import Image from "next/image";
import { Lock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RfpListItem } from "@/lib/data/types";
import { isPastContract, parseAward } from "@/lib/data/fomo";
import { isGcPackage, sourceTypeLabel } from "@/lib/gc/packages";
import { DeadlineStamp } from "@/components/public/deadline-stamp";
import { AwardCard } from "@/components/public/award-card";
import { getLang, getT } from "@/i18n/server";
import { formatDate } from "@/i18n/format";
import { propertyTypeName, regionName, tradeName } from "@/i18n/terms";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/dictionaries";

type CardT = Messages["shared"]["card"];

/** "Public tender · City of Toronto" → "City of Toronto"; PM RFPs → "Property manager". */
function buyerLine(rfp: RfpListItem, t: CardT, lang: Locale): string {
  const badge = sourceTypeLabel(rfp.sourceType, rfp.slug, lang);
  if (!badge) return t.propertyManager;
  const [, issuer] = badge.split(" · ");
  return issuer ?? badge;
}

function kindLabel(rfp: RfpListItem, past: boolean, gc: boolean, t: CardT): string {
  const labels = getT("sharedClient").labels;
  if (past) return t.awardNotice;
  if (gc) return labels.gcPackage;
  if (rfp.sourceType === "public_source") return labels.sourceKind.publicTender;
  return t.privateRfp;
}

export function RfpCard({ rfp, locked }: { rfp: RfpListItem; locked: boolean }) {
  const t = getT("shared").card;
  const lang = getLang();
  const photo = rfp.photoUrls[0];
  const past = isPastContract(rfp);
  const closed = rfp.status !== "open";
  const award = past ? parseAward(rfp.summary) : null;
  const gc = isGcPackage(rfp);
  const place =
    [rfp.city, rfp.province && regionName(rfp.province, lang)].filter(Boolean).join(", ") ||
    (rfp.regionName && regionName(rfp.regionName, lang));
  const trades = rfp.categories.slice(0, 2).map((c) => tradeName(c, lang)).join(" / ");
  // Award notices get their own card: the value and the winner lead.
  if (past) return <AwardCard rfp={rfp} />;

  return (
    <Link
      href={`/rfps/${rfp.slug}`}
      className={cn(
        "group flex min-w-0 flex-col rounded-lg border border-border bg-card transition-colors hover:border-indigo/40",
        closed && !past && "opacity-70",
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-2.5">
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          {kindLabel(rfp, past, gc, t)}
          {rfp.reference && <span className="text-foreground/60"> · {rfp.reference}</span>}
        </span>
        {past ? (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-teal-ink">{t.awarded}</span>
        ) : closed ? (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            {rfp.status === "awarded" ? t.filled : t.closed}
          </span>
        ) : locked ? (
          <Lock className="size-3.5 shrink-0 text-muted-foreground" aria-label={t.membersOnly} />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="flex items-start gap-4">
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-medium text-muted-foreground">{buyerLine(rfp, t, lang)}</div>
            <h3 className="mt-1 line-clamp-3 break-words font-heading text-[15px] font-semibold leading-snug text-foreground group-hover:text-indigo">
              {rfp.title}
            </h3>
          </div>
          {photo && (
            <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-secondary">
              <Image src={photo} alt="" fill sizes="64px" className="object-cover" />
              {rfp.photoUrls.length > 1 && (
                <span className="absolute bottom-0.5 right-0.5 rounded bg-black/60 px-1 text-[9px] font-medium text-white">
                  +{rfp.photoUrls.length - 1}
                </span>
              )}
            </div>
          )}
        </div>

        {award?.winner ? (
          <div className="mt-4 border-l-2 border-teal-400 pl-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{t.wonBy}</div>
            <div className="truncate text-sm font-semibold text-foreground">{award.winner}</div>
            {award.value && <div className="text-sm tabular-nums text-foreground/80">{award.value}</div>}
          </div>
        ) : (
          rfp.summary && <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{rfp.summary}</p>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div className="min-w-0 space-y-1 text-xs text-muted-foreground">
            {trades && <div className="truncate font-medium text-foreground/80">{trades}</div>}
            {place && (
              <div className="flex items-center gap-1 truncate">
                <MapPin className="size-3 shrink-0" /> {place}
                {rfp.propertyTypeName && <span className="truncate"> · {propertyTypeName(rfp.propertyTypeName, lang)}</span>}
              </div>
            )}
            {rfp.isDemo && <div className="font-mono text-[10px] uppercase tracking-[0.12em]">{t.sample}</div>}
          </div>
          {closed ? (
            <span className="shrink-0 text-right leading-tight">
              <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                {past ? t.awarded : t.closed}
              </span>
              <span className="block text-sm font-semibold tabular-nums text-foreground/70">
                {/* timeZone: "UTC" (inside formatDate) pins server + client to the same day. */}
                {rfp.deadline ? formatDate(rfp.deadline, lang) : t.na}
              </span>
            </span>
          ) : (
            <DeadlineStamp deadline={rfp.deadline} />
          )}
        </div>
      </div>
    </Link>
  );
}
