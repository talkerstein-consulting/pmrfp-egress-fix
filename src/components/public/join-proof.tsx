import { Check } from "lucide-react";
import type { JoinProof as Proof } from "@/lib/data/join-proof";
import { closingLabel, compactDollars, daysUntil } from "@/lib/data/fomo";
import { getLang, getT } from "@/i18n/server";
import { fmt, formatNumber } from "@/i18n/format";
import { regionName, tradeName } from "@/i18n/terms";
import type { Locale } from "@/i18n/config";
import type { Messages } from "@/i18n/dictionaries";

type Audience = "trade" | "buyer";
type T = Messages["auth"]["joinProof"];

/** closingLabel() in the page's language (same 0–7 day window). */
function closing(days: number | null, t: T): string | null {
  if (days === null || !closingLabel(days)) return null;
  if (days === 0) return t.closesToday;
  if (days === 1) return t.closesTomorrow;
  return fmt(t.closesIn, { n: days });
}

/**
 * compactDollars() in the page's language: "$204M" in English, "204 M$" in
 * French, "$204M" / "$1,200M" / "$250 mil" in Spanish (no "B": a billón is a
 * trillion in Spanish).
 */
function dollars(n: number, lang: Locale): string {
  if (lang === "en") return compactDollars(n);
  if (lang === "es") {
    if (n >= 1e6) return `$${formatNumber(n / 1e6, lang, { maximumFractionDigits: n >= 1e8 ? 0 : 1 })}M`;
    if (n >= 1e3) return `$${Math.round(n / 1e3)} mil`;
    return `$${Math.round(n)}`;
  }
  const dec = (v: number, digits: number) => v.toFixed(digits).replace(/\.0$/, "").replace(".", ",");
  if (n >= 1e9) return `${dec(n / 1e9, 1)} G$`;
  if (n >= 1e6) return `${dec(n / 1e6, n >= 1e8 ? 0 : 1)} M$`;
  if (n >= 1e3) return `${Math.round(n / 1e3)} k$`;
  return `${Math.round(n)} $`;
}

/**
 * The sign-up page's "why join" panel: live board numbers and real listings
 * for trades; how posting works for property managers, GCs and realtors.
 */
export function JoinProof({ proof, audience }: { proof: Proof; audience: Audience }) {
  const t = getT("auth").joinProof;
  const lang = getLang();
  return (
    <aside className="grid-tex relative overflow-hidden rounded-2xl bg-indigo p-7 text-white [--grid-color:rgba(145,242,207,0.06)] sm:p-9">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(145,242,207,.16), transparent 62%)" }}
      />
      <div className="relative">
        <p className="inline-flex items-center gap-2.5 text-sm text-indigo-100">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-teal-300 opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-teal-300" />
          </span>
          {t.live}
        </p>

        {audience === "trade" ? (
          <>
            <div className="mt-6 grid grid-cols-2 gap-6">
              <Stat value={String(proof.open)} label={t.openLabel} accent />
              {proof.awardedValue > 0 && (
                <Stat value={dollars(proof.awardedValue, lang)} label={fmt(t.awardedIn, { n: proof.pastContracts })} />
              )}
            </div>
            {proof.rows.length > 0 && (
              <ul className="mt-8 space-y-2.5">
                {proof.rows.map((r) => {
                  const soon = closing(daysUntil(r.deadline), t);
                  return (
                    <li
                      key={r.slug}
                      className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[11px] uppercase tracking-wide text-teal-300">
                          {tradeName(r.categories[0], lang)} · {r.regionName ? regionName(r.regionName, lang) : t.canada}
                        </span>
                        {soon && <span className="shrink-0 text-[11px] font-medium text-indigo-100/70">{soon}</span>}
                      </div>
                      <div className="mt-1 line-clamp-1 text-[15px] font-medium text-white">{r.title}</div>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="font-semibold">{t.freeTitle}</p>
              <ul className="mt-3 space-y-2 text-sm text-indigo-100/85">
                {t.freeItems.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-teal-300" strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-indigo-100/65">
                {t.upgrade}
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="mt-5 text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t.buyerHeading}
            </h2>
            <ol className="mt-7 space-y-5">
              {t.steps.map(({ title, body }, i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-teal-300/40 font-mono text-sm text-teal-300">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-indigo-100/75">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex items-baseline gap-3 border-t border-white/10 pt-6">
              <span className="font-heading text-4xl font-extrabold tracking-tight text-teal-300">{proof.open}</span>
              <span className="text-sm text-indigo-100/75">{t.boardToday}</span>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

function Stat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div>
      <div className={`font-heading text-4xl font-extrabold tracking-tight sm:text-5xl ${accent ? "text-teal-300" : "text-white"}`}>
        {value}
      </div>
      <div className="mt-1.5 text-sm leading-snug text-indigo-100/75">{label}</div>
    </div>
  );
}
