import type { Metadata } from "next";
import Link from "@/i18n/link";
import { ShieldAlert } from "lucide-react";
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
  const t = getDictionary(l).misc.disclaimer.meta;
  return { title: t.title, description: t.description, alternates: alternatesFor(l, "/disclaimer") };
}

const LAST_UPDATED = "May 29, 2026";
const LAST_UPDATED_ISO = "2026-05-29";

function DisclaimerBlock({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <section className="mt-8 rounded-xl border border-border bg-card p-6">
      <h2 className="text-base font-semibold tracking-tight text-foreground">
        {label}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {text}
      </p>
    </section>
  );
}

export default async function DisclaimerPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const lang = getLang();
  const m = getT("misc");
  const t = m.disclaimer;
  const updated =
    lang === "en" ? LAST_UPDATED : formatDate(LAST_UPDATED_ISO, lang, { day: "numeric", month: "long", year: "numeric" });
  const [contactBefore, contactAfter] = t.contact.split("{email}");
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

        <div className="mt-8 flex gap-4 rounded-xl border border-teal-400/60 bg-teal-100/40 p-6">
          <ShieldAlert className="size-6 shrink-0 text-teal-600" />
          <p className="text-base font-medium leading-relaxed text-foreground">
            {m.copy.disclaimer}
          </p>
        </div>

        <p className="mt-10 leading-relaxed text-muted-foreground">
          {t.intro}
        </p>

        <DisclaimerBlock label={t.signupLabel} text={m.copy.signup} />
        <DisclaimerBlock
          label={t.pmLabel}
          text={m.copy.pmPosting}
        />
        <DisclaimerBlock
          label={t.interestLabel}
          text={m.copy.interest}
        />

        <p className="mt-10 text-sm leading-relaxed text-muted-foreground">
          {contactBefore}
          <Link
            href={`mailto:${SITE.email}`}
            className="font-medium text-teal-600 underline underline-offset-4"
          >
            {SITE.email}
          </Link>
          {contactAfter}
        </p>
      </Container>
    </section>
  );
}
