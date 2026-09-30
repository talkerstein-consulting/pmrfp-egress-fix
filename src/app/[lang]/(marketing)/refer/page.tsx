/**
 * /refer — top-level hub. Two-lane referral program splash. Most banners
 * across the site point here; users pick the lane that fits.
 */
import type { Metadata } from "next";
import Link from "@/i18n/link";
import { ArrowRight, Banknote, HardHat, FileText, Trophy } from "lucide-react";
import { Container, Eyebrow } from "@/components/container";
import { REFERRAL } from "@/lib/site";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";

/** Referral numbers for the {placeholders} in the copy (lib/site.ts). */
const VARS = { fee: REFERRAL.tradeFee, feeMonthly: REFERRAL.tradeFeeMonthly, currency: REFERRAL.currency };
const f = (s: string) => fmt(s, VARS);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).misc.refer.meta;
  return { title: f(t.title), description: f(t.description), alternates: alternatesFor(l, "/refer") };
}

export default async function ReferHubPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("misc").refer;
  const [titleBefore, titleAfter] = t.title.split("{cash}");
  return (
    <section className="border-b border-border bg-indigo text-white">
      <Container className="py-20 sm:py-24">
        <Eyebrow className="text-teal">{t.eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          {titleBefore}
          <span className="text-teal-300">{f(t.titleCash)}</span>
          {titleAfter}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-indigo-100/80">
          {t.lead}
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* TRADE LANE — direct revenue */}
          <Link
            href="/refer-a-trade"
            className="group relative overflow-hidden rounded-2xl border border-teal-300 bg-white/5 p-8 transition-colors hover:bg-white/10"
          >
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-teal-300 text-indigo">
                <HardHat className="size-6" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-teal-300">
                  {t.trade.kicker}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-white">{t.trade.title}</h2>
                <p className="mt-1 text-3xl font-semibold text-teal-300">
                  {f(t.trade.amount)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-indigo-100/85">
                  {f(t.trade.body)}
                </p>
                <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300">
                  {t.trade.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </p>
              </div>
            </div>
          </Link>

          {/* PROJECT LANE — credit / status */}
          <Link
            href="/refer-a-project"
            className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-8 transition-colors hover:bg-white/10"
          >
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                <Trophy className="size-6" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-indigo-100/70">
                  {t.project.kicker}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-white">{t.project.title}</h2>
                <p className="mt-1 text-xl font-semibold text-white">
                  {t.project.amount}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-indigo-100/85">
                  {t.project.body}
                </p>
                <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  {t.project.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 flex items-start gap-4 rounded-xl border border-white/15 bg-white/5 p-5">
          <Banknote className="mt-0.5 size-5 shrink-0 text-teal-300" />
          <p className="text-sm leading-relaxed text-indigo-100/80">
            <strong className="text-white">{t.whyLabel}</strong> {t.whyBody}
          </p>
        </div>

        {/* trophy ghost — referenced by an icon import already */}
        <FileText className="hidden" />
      </Container>
    </section>
  );
}
