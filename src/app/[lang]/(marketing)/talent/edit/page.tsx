import type { Metadata } from "next";
import Link from "@/i18n/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { TalentEditForm, type TalentFormDefaults } from "@/components/talent/talent-forms";
import { getSession } from "@/lib/access/access";
import { getOwnTalent } from "@/lib/talent/data";
import { normalizeTalentHandle } from "@/lib/talent/rules";
import { getCategories, getRegions } from "@/lib/data/taxonomy";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath } from "@/i18n/config";
import { regionName, tradeName } from "@/i18n/terms";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: getDictionary(hasLocale(lang) ? lang : "en").jobs.edit.metaTitle,
    robots: { index: false, follow: false },
  };
}

export default async function TalentEditPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const lang = getLang();
  const all = getT("jobs");
  const t = all.edit;
  const session = await getSession();
  if (!session) redirect(localizePath(`/sign-up?role=talent&next=${encodeURIComponent("/talent/edit")}`, lang));
  const [{ profile, phone }, trades, regions] = await Promise.all([getOwnTalent(session.userId), getCategories(), getRegions()]);

  const name = session.profile.full_name ?? "";
  const defaults: TalentFormDefaults = profile
    ? {
        handle: profile.handle,
        displayName: profile.displayName,
        headline: profile.headline ?? "",
        primaryTrade: profile.tradeSlug ?? "",
        otherTrades: profile.otherTrades.map((t) => t.slug),
        region: profile.regionSlug ?? "",
        city: profile.city ?? "",
        yearsExperience: profile.yearsExperience,
        certifications: profile.certifications,
        availability: profile.availability,
        employmentTypes: profile.employmentTypes,
        payExpectation: profile.payExpectation ?? "",
        bio: profile.bio ?? "",
        phone: phone ?? "",
        published: profile.published,
        contactVisible: profile.contactVisible,
      }
    : {
        handle: normalizeTalentHandle(name) ?? "",
        displayName: name,
        headline: "",
        primaryTrade: "",
        otherTrades: [],
        region: "",
        city: "",
        yearsExperience: null,
        certifications: [],
        availability: "available_now",
        employmentTypes: [],
        payExpectation: "",
        bio: "",
        phone: session.profile.phone ?? "",
        published: true,
        contactVisible: false,
      };

  return (
    <Container className="max-w-3xl py-10">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-700">{all.talent.eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{profile ? t.editTitle : t.makeTitle}</h1>
      <p className="mt-2 text-muted-foreground">
        {t.intro}
        {profile && (
          <>
            {" "}
            <Link href={`/talent/${profile.handle}`} className="font-medium text-teal-700 hover:underline">
              {t.seeProfile}
            </Link>
          </>
        )}
      </p>
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
        <TalentEditForm
          defaults={defaults}
          trades={trades.map((c) => ({ slug: c.slug, name: tradeName(c.name, lang) }))}
          regions={regions.map((r) => ({ slug: r.slug, name: regionName(r.name, lang) }))}
        />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        {t.applyNow}{" "}
        <Link href="/jobs" className="font-medium text-teal-700 hover:underline">
          {t.seeJobs}
        </Link>
      </p>
    </Container>
  );
}
