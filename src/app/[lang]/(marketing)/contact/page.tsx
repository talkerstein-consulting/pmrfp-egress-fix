import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/container";
import { ContactForm } from "@/components/public/contact-form";
import { SITE } from "@/lib/site";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).misc.contact.meta;
  return { title: t.title, description: t.description, alternates: alternatesFor(l, "/contact") };
}

export default async function ContactPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("misc").contact;
  const [before, after] = t.body.split("{email}");
  return (
    <Container size="narrow" className="py-14">
      <Eyebrow>{t.eyebrow}</Eyebrow>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.title}</h1>
      <p className="mt-3 text-muted-foreground">
        {before}
        <a href={`mailto:${SITE.email}`} className="text-teal-700 hover:underline">
          {SITE.email}
        </a>
        {after}
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </Container>
  );
}
