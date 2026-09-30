import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "@/i18n/link";
import { Container, Eyebrow } from "@/components/container";
import { TrustDisclaimer } from "@/components/public/trust-disclaimer";
import { JsonLd, organizationSchema } from "@/lib/seo/jsonld";
import { SITE } from "@/lib/site";
import { PHOTOS } from "@/lib/photos";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).misc.about.meta;
  return { title: t.title, description: t.description, alternates: alternatesFor(l, "/about") };
}

/** Fills {name} slots in a translated sentence with links. */
function rich(template: string, slots: Record<string, React.ReactNode>): React.ReactNode[] {
  return template.split(/(\{\w+\})/).map((part, i) => {
    const key = /^\{(\w+)\}$/.exec(part)?.[1];
    return <Fragment key={i}>{key && key in slots ? slots[key] : part}</Fragment>;
  });
}

export default async function AboutPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("misc").about;
  const address = process.env.BUSINESS_MAILING_ADDRESS?.trim();
  return (
    <Container size="narrow" className="py-14">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", name: t.title, mainEntity: organizationSchema() }} />
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t.lead}</p>

      <figure className="mt-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-indigo">
          <Image
            src={PHOTOS.torontoFlatiron.src}
            alt={t.photoAlt}
            fill
            loading="eager"
            sizes="(min-width: 896px) 832px, (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2.5rem)"
            className="object-cover object-[50%_40%]"
          />
        </div>
        <figcaption className="mt-2 text-xs text-muted-foreground">{t.caption}</figcaption>
      </figure>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">{t.whoTitle}</h2>
        <p className="mt-3 leading-relaxed text-foreground/90">
          {rich(t.whoBody, {
            sister: <a href={SITE.sisterBrand.url} className="text-teal-700 hover:underline">{SITE.sisterBrand.name}</a>,
            tcg: <a href="https://talkerstein.com" className="text-teal-700 hover:underline">Talkerstein Consulting Group</a>,
          })}
        </p>
        <p className="mt-3 leading-relaxed text-foreground/90">
          {rich(t.contactBody, {
            email: <a href={`mailto:${SITE.email}`} className="text-teal-700 hover:underline">{SITE.email}</a>,
            form: <Link href="/contact" className="text-teal-700 hover:underline">{t.contactForm}</Link>,
            mail: address ? fmt(t.mail, { address }) : "",
          })}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">{t.sourcesTitle}</h2>
        <p className="mt-3 leading-relaxed text-foreground/90">{t.sourcesBody}</p>
        <ul className="mt-5 divide-y divide-border rounded-xl border border-border">
          {t.sources.map((s) => (
            <li key={s.name} className="p-4">
              <p className="font-semibold text-foreground">{s.name}</p>
              <p className="text-sm text-muted-foreground">{s.what}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.licence}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 leading-relaxed text-foreground/90">
          {rich(t.awardsBody, {
            report: (
              <Link href="/reports/public-building-contracts" className="text-teal-700 hover:underline">
                {t.reportLink}
              </Link>
            ),
            winners: <Link href="/contract-winners" className="text-teal-700 hover:underline">{t.winnersLink}</Link>,
          })}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">{t.directoryTitle}</h2>
        <p className="mt-3 leading-relaxed text-foreground/90">
          {rich(t.directoryBody, {
            paid: <Link href="/pricing" className="text-teal-700 hover:underline">{t.paidPlan}</Link>,
          })}
        </p>
      </section>

      <TrustDisclaimer className="mt-10" />
    </Container>
  );
}
