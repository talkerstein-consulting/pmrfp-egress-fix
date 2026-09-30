import type { Metadata } from "next";
import Link from "@/i18n/link";
import { ArrowRight, Banknote, Mail, HandCoins, Eye, Quote } from "lucide-react";
import { Container, Eyebrow } from "@/components/container";
import { ReferTradeForm } from "@/components/forms/refer-trade-form";
import { TrustDisclaimer } from "@/components/public/trust-disclaimer";
import { PRICING, REFERRAL } from "@/lib/site";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";

/** Referral and price numbers for the {placeholders} in the copy (lib/site.ts). */
const VARS = {
  fee: REFERRAL.tradeFee,
  feeMonthly: REFERRAL.tradeFeeMonthly,
  currency: REFERRAL.currency,
  annual: PRICING.proAnnual,
  monthly: PRICING.proMonthly,
};
const f = (s: string) => fmt(s, VARS);

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).misc.referTrade.meta;
  return { title: f(t.title), description: f(t.description), alternates: alternatesFor(l, "/refer-a-trade") };
}

const STEP_ICONS = [Mail, Eye, HandCoins];

export default async function ReferTradePage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const m = getT("misc");
  const t = m.referTrade;
  const shared = m.referShared;
  const [line2Before, line2After] = t.titleLine2.split("{earn}");
  return (
    <>
      {/* HERO */}
      <section className="border-b border-border bg-indigo text-white">
        <Container className="py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-center">
            <div>
              <Eyebrow className="text-teal">{t.eyebrow}</Eyebrow>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                {t.titleLine1}
                <br />
                {line2Before}
                <span className="text-teal-300">{f(t.titleEarn)}</span>
                {line2After}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-indigo-100/80">
                {f(t.lead)}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#refer-form"
                  className="inline-flex items-center gap-2 rounded-full bg-teal-300 px-5 py-2.5 text-sm font-semibold text-indigo transition-colors hover:bg-teal-300/90"
                >
                  {t.cta} <ArrowRight className="size-4" />
                </a>
                <Link
                  href="/refer-a-project"
                  className="inline-flex items-center px-3 py-2.5 text-sm font-medium text-indigo-100/80 transition-colors hover:text-white"
                >
                  {t.projectLink}
                </Link>
              </div>
            </div>

            {/* offer card */}
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-teal-300 text-indigo">
                  <Banknote className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-teal-300">
                    {t.offerKicker}
                  </p>
                  <p className="text-2xl font-semibold text-white">
                    {f(t.offerAmount)}
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-indigo-100/85">
                {t.offerLines.map((line) => (
                  <li key={line}>{f(line)}</li>
                ))}
                <li>{shared.noCap}</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-background">
        <Container className="py-16">
          <Eyebrow>{shared.howEyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {shared.howTitle}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {t.steps.map((s, i) => {
              const Icon = STEP_ICONS[i] ?? Mail;
              return (
                <div key={s.title} className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-teal-100 text-teal-ink">
                      <Icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {fmt(shared.step, { n: String(i + 1).padStart(2, "0") })}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{f(s.title)}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f(s.desc)}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* WHO REFERS */}
      <section className="border-t border-border bg-secondary/30">
        <Container className="py-16">
          <Eyebrow>{t.whoEyebrow}</Eyebrow>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight">
            {t.whoTitle}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.who.map((w) => (
              <div key={w.title} className="rounded-lg border border-border bg-card p-5">
                <h3 className="text-base font-semibold">{w.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f(w.body)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WHY HIGHER FEE */}
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>{t.whyEyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              {t.whyTitle}
            </h2>
            <ul className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
              {t.why.map((p) => (
                <li key={p.strong} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-ink" />
                  <span>
                    <strong className="text-foreground">{f(p.strong)}</strong>
                    {f(p.rest)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="self-start rounded-2xl border border-border bg-card p-8">
            <Quote className="size-7 text-teal-ink" />
            <p className="mt-4 text-lg leading-relaxed text-foreground/90">
              {t.quote}
            </p>
            <p className="mt-4 text-xs uppercase tracking-wide text-muted-foreground">
              {shared.team}
            </p>
          </div>
        </div>
      </Container>

      {/* THE FORM */}
      <section id="refer-form" className="border-t border-border bg-secondary/30">
        <Container size="narrow" className="py-16">
          <Eyebrow>{t.formEyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {f(t.formTitle)}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t.formLead}
          </p>
          <div className="mt-8">
            <ReferTradeForm />
          </div>
          <div className="mt-10">
            <TrustDisclaimer text={f(t.terms)} />
          </div>
        </Container>
      </section>
    </>
  );
}
