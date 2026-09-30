import Link from "@/i18n/link";
import { Clock, MapPin } from "lucide-react";
import type { TalentProfile } from "@/lib/talent/data";
import { AVAILABILITY_LABEL, yearsLabel, type Availability } from "@/lib/talent/rules";
import { cn } from "@/lib/utils";

const BADGE: Record<Availability, string> = {
  available_now: "border-teal-300 bg-teal-50 text-teal-800",
  open_to_offers: "border-indigo/20 bg-indigo/5 text-indigo",
  not_looking: "border-border bg-secondary text-muted-foreground",
};

export function AvailabilityBadge({ availability, className }: { availability: Availability; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium", BADGE[availability], className)}>
      {AVAILABILITY_LABEL[availability]}
    </span>
  );
}

export function initials(name: string): string {
  return name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

/** A directory card. No contact details, ever. */
export function TalentCard({ person }: { person: TalentProfile }) {
  const where = [person.city, person.province].filter(Boolean).join(", ");
  const years = yearsLabel(person.yearsExperience);
  const tickets = person.certifications.slice(0, 4);
  return (
    <Link
      href={`/talent/${person.handle}`}
      className="group flex gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-teal-400"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-sm font-bold text-indigo">
        {initials(person.displayName)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-semibold leading-snug text-foreground group-hover:text-teal-700">{person.displayName}</span>
          <AvailabilityBadge availability={person.availability} />
        </span>
        <span className="mt-0.5 block text-sm text-muted-foreground">{person.headline || person.trade || "Tradesperson"}</span>
        <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {person.trade && <span className="font-medium text-foreground">{person.trade}</span>}
          {where && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" /> {where}
            </span>
          )}
          {years && (
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" /> {years}
            </span>
          )}
        </span>
        {tickets.length > 0 && (
          <span className="mt-2.5 flex flex-wrap gap-1.5">
            {tickets.map((t) => (
              <span key={t} className="rounded border border-border bg-secondary/60 px-1.5 py-0.5 font-mono text-[11px] text-foreground/80">
                {t}
              </span>
            ))}
            {person.certifications.length > tickets.length && (
              <span className="px-1 py-0.5 text-[11px] text-muted-foreground">+{person.certifications.length - tickets.length} more</span>
            )}
          </span>
        )}
      </span>
    </Link>
  );
}
