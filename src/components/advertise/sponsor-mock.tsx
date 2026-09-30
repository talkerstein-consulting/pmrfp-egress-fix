import { ArrowUpRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { getT } from "@/i18n/server";
import { fmt } from "@/i18n/format";

/**
 * Static samples of a sponsor placement for /advertise. The card mirrors
 * components/sponsors/sponsor-slot and the email row mirrors
 * lib/sponsors/email, filled with a made-up "Your brand" so it reads as a
 * sample. Nothing here links anywhere or counts as a click. Server
 * components: copy comes from the partners namespace in the visitor's language.
 */

function Monogram() {
  const t = getT("partners").advertise.mock;
  return (
    <span
      aria-hidden
      className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-white font-heading text-[11px] font-bold tracking-tight text-indigo"
    >
      {t.monogram}
    </span>
  );
}

/** The sponsor card as it renders on trade pages, tender pages and the dashboard. */
export function SponsorCardMock({ className }: { className?: string }) {
  const t = getT("partners").advertise.mock;
  return (
    <div
      role="img"
      aria-label={fmt(t.cardAria, { headline: t.headline })}
      className={cn("rounded-xl border border-border bg-card p-4 text-left", className)}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">{t.sponsored}</p>
      <div className="mt-2 flex gap-3">
        <Monogram />
        <span className="min-w-0">
          <span className="block text-sm font-semibold leading-snug text-foreground">{t.headline}</span>
          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{t.body}</span>
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal-700">
            {t.cta} <ArrowUpRight className="size-3.5" />
          </span>
        </span>
      </div>
    </div>
  );
}

/** A tender page in miniature with the sponsor card in its sidebar. For dark backgrounds. */
export function TenderPageMock() {
  const t = getT("partners").advertise.mock;
  return (
    <figure className="relative">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/30 backdrop-blur-sm">
        <div className="rounded-xl bg-white p-4 text-foreground sm:p-5">
          <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
            <span className="truncate font-mono text-[11px] tracking-wide text-muted-foreground">pmrfp.com/rfps/…</span>
            <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              {t.sample}
            </span>
          </div>
          <div className="grid gap-5 pt-4 sm:grid-cols-[1.1fr_1fr]">
            <div aria-hidden className="space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-wide text-teal-700">{t.tenderTag}</p>
              <div className="space-y-2">
                <div className="h-3 w-11/12 rounded-full bg-indigo/15" />
                <div className="h-3 w-3/4 rounded-full bg-indigo/15" />
              </div>
              <div className="space-y-1.5 pt-2">
                <div className="h-2 w-full rounded-full bg-muted" />
                <div className="h-2 w-full rounded-full bg-muted" />
                <div className="h-2 w-5/6 rounded-full bg-muted" />
                <div className="h-2 w-2/3 rounded-full bg-muted" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-7 w-24 rounded-full bg-indigo" />
                <div className="h-7 w-16 rounded-full border border-border" />
              </div>
            </div>
            <SponsorCardMock className="shadow-lg shadow-indigo/10 ring-2 ring-teal-300 ring-offset-2" />
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-indigo-100/70">
        {t.tenderCaption}
      </figcaption>
    </figure>
  );
}

/** The daily match email with the one sponsor row under the matches. For light backgrounds. */
export function EmailPlacementMock() {
  const t = getT("partners").advertise.mock;
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-indigo/10">
        <div className="flex items-center gap-3 border-b border-border bg-secondary/60 px-5 py-3 text-sm">
          <Mail className="size-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="truncate font-semibold text-foreground">{t.emailSubject}</p>
            <p className="text-xs text-muted-foreground">{t.emailMeta}</p>
          </div>
        </div>
        <div className="px-5 py-5 sm:px-6">
          <ul aria-hidden className="space-y-4">
            {["w-4/5", "w-2/3", "w-3/4"].map((w) => (
              <li key={w} className="space-y-1.5">
                <div className={cn("h-2.5 rounded-full bg-indigo/15", w)} />
                <div className="h-2 w-1/2 rounded-full bg-teal-100" />
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-border pt-4">
            <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{t.sponsored}</p>
            <div className="mt-2 flex gap-3">
              <Monogram />
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-semibold text-indigo">{t.headline}</span>
                <br />
                {t.body} <span className="font-semibold text-teal-700">{t.cta}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-muted-foreground">
        {t.emailCaption}
      </figcaption>
    </figure>
  );
}
