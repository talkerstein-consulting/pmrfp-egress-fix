import type { Metadata } from "next";
import Link from "@/i18n/link";
import { Container, Eyebrow } from "@/components/container";
import { SITE } from "@/lib/site";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt, formatDate } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).misc.privacy.meta;
  return { title: t.title, description: t.description, alternates: alternatesFor(l, "/privacy") };
}

const LAST_UPDATED = "May 29, 2026";
const LAST_UPDATED_ISO = "2026-05-29";

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-3 space-y-4 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

export default async function PrivacyPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const lang = getLang();
  const m = getT("misc");
  const t = m.privacy;
  const updated =
    lang === "en" ? LAST_UPDATED : formatDate(LAST_UPDATED_ISO, lang, { day: "numeric", month: "long", year: "numeric" });
  const [contactBefore, contactAfter] = t.contact.body.split("{email}");
  return (
    <section className="bg-background">
      <Container size="narrow" className="py-16 sm:py-24">
        <Eyebrow>{m.legal.eyebrow}</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground">
          {t.title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {fmt(m.legal.lastUpdated, { date: updated })}
        </p>
        {m.legal.translationNote && (
          <p className="mt-4 text-sm italic text-muted-foreground">{m.legal.translationNote}</p>
        )}
        <p className="mt-6 leading-relaxed text-muted-foreground">
          {t.intro}
        </p>

        {t.sections.map((s) => (
          <LegalSection key={s.title} title={s.title}>
            <p>{s.body}</p>
          </LegalSection>
        ))}

        <LegalSection title={t.contact.title}>
          <p>
            {contactBefore}
            <Link
              href={`mailto:${SITE.email}`}
              className="font-medium text-teal-600 underline underline-offset-4"
            >
              {SITE.email}
            </Link>
            {contactAfter}
          </p>
        </LegalSection>
      </Container>
    </section>
  );
}
