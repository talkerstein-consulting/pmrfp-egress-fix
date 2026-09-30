import type { Metadata } from "next";
import Link from "@/i18n/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { TalentEditForm, type TalentFormDefaults } from "@/components/talent/talent-forms";
import { getSession } from "@/lib/access/access";
import { getOwnTalent } from "@/lib/talent/data";
import { normalizeTalentHandle } from "@/lib/talent/rules";
import { getCategories, getRegions } from "@/lib/data/taxonomy";
import { setLangFrom } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Your talent profile",
  robots: { index: false, follow: false },
};

export default async function TalentEditPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const session = await getSession();
  if (!session) redirect(`/sign-up?role=talent&next=${encodeURIComponent("/talent/edit")}`);
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
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-700">PMRFP Talent</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{profile ? "Edit your profile" : "Make your profile"}</h1>
      <p className="mt-2 text-muted-foreground">
        Companies hiring in your trade find you by trade, region and tickets. Your email stays private: they message you
        through PMRFP and you reply if you want to.
        {profile && (
          <>
            {" "}
            <Link href={`/talent/${profile.handle}`} className="font-medium text-teal-700 hover:underline">
              See your profile
            </Link>
          </>
        )}
      </p>
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
        <TalentEditForm defaults={defaults} trades={trades} regions={regions} />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Want to apply now?{" "}
        <Link href="/jobs" className="font-medium text-teal-700 hover:underline">
          See open jobs
        </Link>
      </p>
    </Container>
  );
}
