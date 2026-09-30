import type { Metadata } from "next";
import Link from "@/i18n/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/access/access";
import { gcFormPath, parseAwardRef } from "@/lib/gc/packages";
import { SITE } from "@/lib/site";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  return {
    title: getDictionary(l).partners.gcStart.metaTitle,
    robots: { index: false, follow: true },
    alternates: alternatesFor(l, "/gc-packages/new"),
  };
}

/**
 * One link for every "post your sub-trade packages" button (award pages,
 * contract-winner pages, /for/general-contractors, emails): sends each
 * visitor to the right step, carrying the award they came from.
 */
export default async function StartGcPackagePage({
  searchParams, params }: {
  searchParams: Promise<{ award?: string }>;
} & { params: Promise<object> }) {
  await setLangFrom(params);
  const lang = getLang();
  const t = getT("partners").gcStart;
  const award = parseAwardRef((await searchParams).award);
  const form = gcFormPath(award);
  const session = await getSession();

  if (!session) redirect(localizePath(`/sign-up?role=general_contractor${award ? `&award=${encodeURIComponent(award)}` : ""}`, lang));
  if (!session.profile.onboarding_completed) {
    redirect(localizePath(`/onboarding?kind=gc&next=${encodeURIComponent(form)}`, lang));
  }
  if (session.profile.primary_role === "property_manager") redirect(localizePath(form, lang));

  // Signed in as a trade, supplier or visitor: packages are posted from a
  // contractor account, which can't also hold a paid trade listing.
  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">{t.title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {fmt(t.body, { kind: session.profile.primary_role === "trade" ? t.kindTrade : t.kindOther })}
        <a href={`mailto:${SITE.email}`} className="font-medium text-teal-700 underline">{SITE.email}</a>
        {t.after}
      </p>
      <Link href="/" className="mt-6 inline-block text-sm font-medium text-teal-700 hover:underline">
        {fmt(t.back, { site: SITE.name })}
      </Link>
    </div>
  );
}
