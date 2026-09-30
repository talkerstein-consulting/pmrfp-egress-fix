import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/container";
import type { VerticalSolution } from "@/lib/partners/vertical-solutions";
import { getLang, getT } from "@/i18n/server";
import { fmt } from "@/i18n/format";
import { frTradeOf } from "@/lib/seo/phrases.fr";
import { esTradeOf } from "@/lib/seo/phrases.es";
import { solutionFor } from "@/lib/seo/solutions.fr";

/**
 * The trade's custom solution (lib/partners/vertical-solutions). A plain,
 * followed link with a descriptive anchor plus the affiliate disclosure;
 * rendered only on the trade page, never on trade × city pages.
 * `trade` is the category's English name, for the French and Spanish eyebrow.
 */
export function VerticalSolutionBlock({ solution: base, trade }: { solution: VerticalSolution; trade?: string }) {
  const lang = getLang();
  const t = getT("seo").solution;
  const solution = solutionFor(base, lang);
  const eyebrow = fmt(t.eyebrow, {
    trade: base.tradeSlug.replace(/-/g, " "),
    of:
      lang === "es"
        ? trade ? esTradeOf(trade) : "de este oficio"
        : trade ? frTradeOf(trade) : "de ce corps de métier",
  });
  return (
    <Container className="py-12">
      <div className="grid gap-8 rounded-2xl border border-border bg-card p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-teal-700">{eyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">{solution.headline}</h2>
          <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{solution.pitch}</p>
          <a
            href={solution.href}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-ink hover:underline"
          >
            {solution.anchor} <ArrowRight className="size-4" />
          </a>
        </div>
        <ul className="space-y-3 self-center">
          {solution.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-sm text-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-teal-600" />
              {p}
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted-foreground lg:col-span-2">
          {fmt(t.disclosure, { name: solution.name })}
        </p>
      </div>
    </Container>
  );
}
