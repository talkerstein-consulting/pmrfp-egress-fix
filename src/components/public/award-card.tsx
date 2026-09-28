import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { RfpListItem } from "@/lib/data/types";
import { parseAward } from "@/lib/data/fomo";
import { sourceTypeLabel } from "@/lib/gc/packages";
import { tradePhotoForName } from "@/lib/photos";

/** "SHUNDA CONSULTING AND CONSTRUCTION LTD" → "Shunda Consulting and Construction Ltd". */
function tidyName(name: string): string {
  if (name !== name.toUpperCase()) return name;
  const small = new Set(["and", "of", "the", "de", "du", "des", "et"]);
  return name
    .toLowerCase()
    .split(/\s+/)
    .map((w, i) => (i > 0 && small.has(w) ? w : w.replace(/^\p{L}/u, (c) => c.toUpperCase())))
    .join(" ")
    .replace(/\b(Inc|Ltd|Llc|Ulc|Corp)\b\.?/g, (m) => (m.toLowerCase().startsWith("llc") ? "LLC" : m.toLowerCase().startsWith("ulc") ? "ULC" : m));
}

function initials(name: string): string {
  return name
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** "$1,792,350 CAD" → { amount: "$1,792,350", currency: "CAD" }. */
function splitValue(value: string | null): { amount: string; currency: string } | null {
  if (!value) return null;
  const m = value.match(/^(\$[\d,]+)\s*([A-Z]{3})?/);
  return m ? { amount: m[1], currency: m[2] ?? "" } : null;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

/**
 * A public contract that's already been won. The value leads, because that's
 * the point: this is what work like yours sells for, and who got it.
 */
export function AwardCard({ rfp }: { rfp: RfpListItem }) {
  const award = parseAward(rfp.summary);
  const value = splitValue(award.value);
  const trade = rfp.categories[0] ?? null;
  const photo = tradePhotoForName(trade);
  const buyer = sourceTypeLabel(rfp.sourceType, rfp.slug)?.split(" · ")[1] ?? "Public buyer";
  const place = [rfp.city, rfp.province].filter(Boolean).join(", ") || rfp.regionName;
  const winner = award.winner ? tidyName(award.winner) : null;

  return (
    <Link
      href={`/rfps/${rfp.slug}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl bg-card text-foreground shadow-[0_1px_0_rgba(40,43,89,.06),0_12px_32px_-12px_rgba(20,22,52,.35)] ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="relative h-36 overflow-hidden">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#161834]/95 via-[#161834]/55 to-[#161834]/10" />
        <div className="absolute left-5 top-4 flex items-center gap-2">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {trade ?? "Contract"}
          </span>
        </div>
        <div className="absolute inset-x-5 bottom-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-teal-300">Contract value</div>
          {value ? (
            <div className="mt-0.5 flex items-baseline gap-1.5 text-white">
              <span className="font-heading text-3xl font-bold tracking-tight tabular-nums">{value.amount}</span>
              {value.currency && <span className="text-xs font-semibold text-white/70">{value.currency}</span>}
            </div>
          ) : (
            <div className="mt-0.5 font-heading text-xl font-semibold text-white">Value not disclosed</div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="line-clamp-2 font-heading text-[15px] font-semibold leading-snug">{rfp.title}</h3>
        <div className="mt-1.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
          <MapPin className="size-3 shrink-0" />
          <span className="truncate">{[buyer, place].filter(Boolean).join(" · ")}</span>
        </div>

        {winner && (
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-secondary/70 p-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo font-heading text-xs font-bold text-teal-300">
              {initials(winner) || "W"}
            </span>
            <div className="min-w-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Won by</div>
              <div className="truncate text-sm font-semibold">{winner}</div>
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-xs">
          <span className="text-muted-foreground">Awarded {rfp.deadline ? formatDate(rfp.deadline) : ""}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-teal-700 group-hover:underline">
            See the notice <ArrowUpRight className="size-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
