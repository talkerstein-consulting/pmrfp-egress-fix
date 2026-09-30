import type { Metadata } from "next";
import Link from "@/i18n/link";
import {
  ArrowRight,
  Globe,
  MapPin,
  Megaphone,
  PenTool,
  Sparkles,
  Star,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/container";
import { CTASection } from "@/components/public/section";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).content.grow.meta;
  return {
    title: t.title,
    description: t.description,
    alternates: alternatesFor(l, "/resources/grow"),
  };
}

/** Icons for the "what's included" cards, in the order of t.items. */
const ICONS = [PenTool, Globe, MapPin, Star, Megaphone];

export default async function GrowPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("content").grow;
  return (
    <>
      {/* Hero */}
      <section className="grid-tex relative overflow-hidden bg-indigo text-white [--grid-color:rgba(145,242,207,0.07)]">
        <Container className="relative z-10 py-20 sm:py-24">
          <div className="max-w-3xl">
            <span className="eyebrow inline-flex items-center gap-2 text-teal-300">
              <span className="h-px w-5 bg-teal-300" /> {t.eyebrow}
            </span>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
              {t.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-indigo-100/75">
              {t.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className={buttonVariants({ size: "lg", variant: "accent" })}>
                {t.ctaHelp} <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/sign-up"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white",
                )}
              >
                {t.ctaList}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* What's included */}
      <Container className="py-16 sm:py-20">
        <div className="max-w-2xl">
          <Eyebrow>{t.includedEyebrow}</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t.includedTitle}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t.includedLead}
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map(({ t: title, d }, i) => {
            const Icon = ICONS[i];
            return (
              <div key={title} className="rounded-xl border border-border bg-card p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            );
          })}
          <div className="flex flex-col justify-center rounded-xl border border-teal-300 bg-teal-50 p-6">
            <Sparkles className="size-6 text-teal-600" />
            <h3 className="mt-3 text-lg font-semibold text-indigo">{t.fullTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-teal-700">
              {fmt(t.fullBody, { brand: SITE.name })}
            </p>
          </div>
        </div>
      </Container>

      <CTASection
        title={t.cta.title}
        description={t.cta.description}
        primaryHref="/contact"
        primaryLabel={t.cta.primary}
        secondaryHref="/resources"
        secondaryLabel={t.cta.secondary}
      />
    </>
  );
}
