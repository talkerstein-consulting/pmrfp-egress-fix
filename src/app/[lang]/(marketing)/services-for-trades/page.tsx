import type { Metadata } from "next";
import Link from "@/i18n/link";
import { ArrowRight, CreditCard, FileText, Globe, Info, MapPin, PenTool, Receipt, Smartphone } from "lucide-react";
import { Container, Eyebrow } from "@/components/container";
import { Section, SectionHeading } from "@/components/public/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).misc.services.meta;
  return { title: t.title, description: t.description, alternates: alternatesFor(l, "/services-for-trades") };
}

/**
 * Partner services for trades. Both companies have a business relationship
 * with PMRFP, disclosed on the page. Cleverpays is placed as part of a paid
 * relationship, so its outbound links are rel="sponsored"; Talkerstein is
 * PMRFP's affiliate. Only claims each company's own site makes.
 * Copy (headline, blurb, points) lives in messages/misc.ts under
 * services.partners, in the same order as `points` here.
 */
const PARTNERS = [
  {
    key: "cleverpays",
    name: "Cleverpays",
    href: "https://cleverpays.ca/payment-processing",
    rel: "sponsored noopener",
    points: [
      { icon: Smartphone, href: "https://cleverpays.ca/payment-processing/card-present-payments" },
      { icon: CreditCard, href: "https://cleverpays.ca/payment-processing/virtual-terminal" },
      { icon: Receipt, href: "https://cleverpays.ca/payment-processing/einvoicing" },
      { icon: FileText, href: "https://cleverpays.ca/statement-analysis" },
    ],
  },
  {
    key: "talkerstein",
    name: "Talkerstein Consulting Group",
    href: "https://talkerstein.com",
    rel: "noopener",
    points: [
      { icon: Globe, href: "/resources/grow" },
      { icon: PenTool, href: "/resources/grow" },
      { icon: MapPin, href: "/resources/grow" },
      { icon: FileText, href: "/rfps" },
    ],
  },
] as const;

export default async function ServicesForTradesPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("misc").services;
  return (
    <>
      <section className="border-b border-border bg-background">
        <Container className="py-20 sm:py-24">
          <div className="max-w-3xl">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] text-foreground sm:text-5xl">
              {t.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t.lead}
            </p>
          </div>
          <div className="mt-8 flex max-w-3xl items-start gap-3 rounded-lg border border-border bg-secondary/40 px-5 py-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0" />
            <p>
              <span className="font-medium text-foreground">{t.disclosureLabel}</span> {t.disclosure}
            </p>
          </div>
        </Container>
      </section>

      {PARTNERS.map((p, i) => {
        const copy = t.partners[p.key];
        return (
          <Section key={p.name} tone={i % 2 ? "muted" : "default"}>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-teal-700">{copy.serves}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{copy.headline}</h2>
                <p className="mt-2 text-lg font-medium text-indigo">{p.name}</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">{copy.blurb}</p>
                <a
                  href={p.href}
                  rel={p.rel}
                  target="_blank"
                  className={cn(buttonVariants({ size: "lg", variant: "accent" }), "mt-6")}
                >
                  {copy.cta} <ArrowRight className="size-4" />
                </a>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {p.points.map((pt, j) => {
                  const external = pt.href.startsWith("http");
                  const text = copy.points[j];
                  return (
                    <li key={text.t} className="rounded-xl border border-border bg-card p-5">
                      <pt.icon className="size-5 text-teal-600" />
                      <p className="mt-3 font-semibold text-foreground">
                        {external ? (
                          <a href={pt.href} rel={p.rel} target="_blank" className="hover:underline">
                            {text.t}
                          </a>
                        ) : (
                          <Link href={pt.href} className="hover:underline">
                            {text.t}
                          </Link>
                        )}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text.d}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Section>
        );
      })}

      <Section>
        <SectionHeading
          eyebrow={t.sellEyebrow}
          title={t.sellTitle}
          description={t.sellBody}
        />
        <Link href="/contact" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "mt-8")}>
          {t.contactUs} <ArrowRight className="size-4" />
        </Link>
      </Section>
    </>
  );
}
