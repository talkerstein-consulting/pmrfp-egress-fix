import type { Metadata } from "next";
import Link from "@/i18n/link";
import { Container, Eyebrow } from "@/components/container";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { fmt } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = getDictionary(hasLocale(lang) ? lang : "en").misc.kept;
  return {
    title: t.metaTitle,
    robots: { index: false },
  };
}

type Status = "ok" | "notlive" | "invalid" | "error";
const STATUSES: readonly string[] = ["ok", "notlive", "invalid", "error"] satisfies Status[];

export default async function RfpKeptPage({
  searchParams, params }: {
  searchParams: Promise<Record<string, string | undefined>>;
} & { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("misc").kept;
  const sp = await searchParams;
  const status = sp.status ?? "ok";
  const days = sp.days ?? "30";
  const m = t[STATUSES.includes(status) ? (status as Status) : "ok"];
  const body = status === "ok" ? fmt(t.ok.bodyDays, { days }) : m.body;

  return (
    <section className="border-b border-border">
      <Container className="py-20 text-center">
        <Eyebrow>PMRFP</Eyebrow>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{m.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{body}</p>
        <div className="mt-8">
          <Link
            href="/pm-dashboard/rfps"
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            {t.cta}
          </Link>
        </div>
      </Container>
    </section>
  );
}
