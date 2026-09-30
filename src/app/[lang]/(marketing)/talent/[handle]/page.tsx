import type { Metadata } from "next";
import Link from "@/i18n/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Check, Clock, Mail, MapPin, Phone, Quote } from "lucide-react";
import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { AvailabilityBadge, initials } from "@/components/talent/talent-card";
import { ContactTalent, EndorseTalent } from "@/components/talent/talent-forms";
import { JsonLd } from "@/lib/seo/jsonld";
import { getSession } from "@/lib/access/access";
import { contactsThisMonth, getEndorsements, getTalent, getVisibleContact } from "@/lib/talent/data";
import { contactsLeft, personJsonLd, ticketName } from "@/lib/talent/rules";
import { telHref } from "@/lib/trusted/rules";
import { cn } from "@/lib/utils";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt, plural } from "@/i18n/format";
import { regionName, tradeName } from "@/i18n/terms";

const BASE = (process.env.NEXT_PUBLIC_SITE_URL || "https://pmrfp.com").replace(/\/$/, "");

type Props = { params: Promise<{ lang: string; handle: string }>; searchParams: Promise<{ saved?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, handle } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const dict = getDictionary(l);
  const t = dict.jobs.profile.meta;
  const p = await getTalent(handle);
  if (!p) return { title: t.notFound, robots: { index: false, follow: false } };
  const trade = p.trade ? tradeName(p.trade, l) : null;
  const where = [p.city, p.province && regionName(p.province, l)].filter(Boolean).join(", ");
  const inWhere = where ? fmt(t.in, { where }) : "";
  const title = `${p.displayName}${trade ? `, ${trade}` : ""}${inWhere}`;
  const description =
    p.headline ??
    `${trade ?? dict.jobs.talentCard.tradesperson}${inWhere}${p.yearsExperience != null ? fmt(t.withYears, { years: plural(p.yearsExperience, dict.jobsClient.years) }) : ""}.`;
  return {
    title,
    description,
    alternates: alternatesFor(l, `/talent/${p.handle}`),
    ...(p.published ? {} : { robots: { index: false, follow: false } }),
    openGraph: { title, description, url: localizePath(`/talent/${p.handle}`, l) },
  };
}

export default async function TalentProfilePage({ params, searchParams }: Props) {
  await setLangFrom(params);
  const lang = getLang();
  const all = getT("jobs");
  const t = all.profile;
  const labels = getT("jobsClient");
  const { handle } = await params;
  const { saved } = await searchParams;
  const [p, session] = await Promise.all([getTalent(handle), getSession()]);
  if (!p) notFound();
  const own = session?.userId === p.userId;
  const org = session?.organization;
  const employer = Boolean(!own && org && org.profile_status === "approved" && org.status === "active");
  const [endorsements, sent, contact] = await Promise.all([
    getEndorsements(p.userId),
    employer && org ? contactsThisMonth(org.id) : Promise.resolve(0),
    employer && p.contactVisible ? getVisibleContact(p.userId) : Promise.resolve({ email: null, phone: null }),
  ]);
  const first = p.displayName.split(/\s+/)[0];
  const trade = p.trade ? tradeName(p.trade, lang) : null;
  const where = [p.city, p.province && regionName(p.province, lang)].filter(Boolean).join(", ");
  const years = p.yearsExperience == null ? "" : plural(p.yearsExperience, labels.years);
  const tel = contact.phone ? telHref(contact.phone) : null;

  return (
    <Container className="py-10">
      {p.published && (
        <JsonLd
          data={personJsonLd({
            name: p.displayName,
            headline: p.headline,
            trade: p.trade,
            city: p.city,
            province: p.province,
            country: p.country,
            certifications: p.certifications,
            url: `${BASE}/talent/${p.handle}`,
          })}
        />
      )}
      <Link href="/talent" className="text-sm text-muted-foreground hover:text-foreground">
        {t.allPeople}
      </Link>

      {own && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-teal-300 bg-teal-50/60 p-4 text-sm">
          <p className="flex items-center gap-2 font-medium">
            {saved ? <Check className="size-4 text-teal-700" /> : null}
            {saved ? t.saved : ""}
            {p.published ? t.isPublic : t.isHidden}
          </p>
          <Link href="/talent/edit" className={buttonVariants({ size: "sm", variant: "outline" })}>
            {t.editProfile}
          </Link>
        </div>
      )}

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <div className="flex items-start gap-4">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-border bg-white text-lg font-bold text-indigo">
              {initials(p.displayName)}
            </span>
            <div className="min-w-0">
              <h1 className="text-3xl font-semibold tracking-tight">{p.displayName}</h1>
              <p className="mt-1 text-lg text-muted-foreground">{p.headline || trade || all.talentCard.tradesperson}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <AvailabilityBadge availability={p.availability} />
            {trade && <span className="font-medium text-foreground">{trade}</span>}
            {where && (
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" /> {where}
              </span>
            )}
            {years && (
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" /> {fmt(t.inTrade, { years })}
              </span>
            )}
          </div>

          {p.certifications.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold tracking-tight">{t.certifications}</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.certifications.map((c) => (
                  <li key={c} className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-sm">
                    <BadgeCheck className="size-4 text-teal-700" /> {ticketName(c, labels.tickets)}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-muted-foreground">{fmt(t.certificationsNote, { name: first })}</p>
            </section>
          )}

          {p.bio && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold tracking-tight">{fmt(t.about, { name: first })}</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-foreground/90">{p.bio}</p>
            </section>
          )}

          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            {(p.employmentTypes.length > 0 || p.payExpectation) && (
              <div className="rounded-xl border border-border bg-card p-4 text-sm">
                <h2 className="font-semibold">{t.lookingFor}</h2>
                {p.employmentTypes.length > 0 && (
                  <p className="mt-1.5 text-muted-foreground">{p.employmentTypes.map((e) => labels.employment[e]).join(", ")}</p>
                )}
                {p.payExpectation && <p className="mt-1.5 text-foreground">{p.payExpectation}</p>}
              </div>
            )}
            {p.otherTrades.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-4 text-sm">
                <h2 className="font-semibold">{t.alsoWorksIn}</h2>
                <p className="mt-1.5 text-muted-foreground">{p.otherTrades.map((o) => tradeName(o.name, lang)).join(", ")}</p>
              </div>
            )}
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">{t.endorsements}</h2>
            {endorsements.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">{fmt(t.noEndorsements, { name: first })}</p>
            ) : (
              <ul className="mt-3 space-y-3">
                {endorsements.map((e) => (
                  <li key={e.id} className="rounded-xl border border-border bg-card p-4">
                    <p className="flex gap-2 text-sm leading-relaxed">
                      <Quote className="mt-0.5 size-4 shrink-0 text-teal-700" />
                      {e.note}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {e.company.listed ? (
                        <Link href={`/directory/${e.company.slug}`} className="font-medium text-foreground hover:underline">
                          {e.company.name}
                        </Link>
                      ) : (
                        <span className="font-medium text-foreground">{e.company.name}</span>
                      )}
                      {t.verifiedCompany}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            {employer && (
              <div className="mt-4">
                <EndorseTalent handle={p.handle} firstName={first} />
              </div>
            )}
          </section>

          <p className="mt-10 text-xs leading-relaxed text-muted-foreground">{fmt(t.disclaimer, { name: first })}</p>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {!own && session?.profile.primary_role !== "talent" && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-semibold">{all.common.hiring}</h2>
              {employer ? (
                <>
                  <p className="mb-4 mt-1 text-sm text-muted-foreground">{fmt(t.messageVia, { name: first })}</p>
                  <ContactTalent handle={p.handle} firstName={first} left={contactsLeft(sent, session!.hasTradeAccess)} />
                  {(contact.email || tel) && (
                    <div className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
                      {contact.email && (
                        <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-teal-700 hover:underline">
                          <Mail className="size-4" /> {contact.email}
                        </a>
                      )}
                      {tel && contact.phone && (
                        <a href={tel} className="flex items-center gap-2 text-teal-700 hover:underline">
                          <Phone className="size-4" /> {contact.phone}
                        </a>
                      )}
                    </div>
                  )}
                </>
              ) : session?.organization ? (
                <p className="mt-1 text-sm text-muted-foreground">{fmt(t.approvalNeeded, { name: first })}</p>
              ) : (
                <>
                  <p className="mb-4 mt-1 text-sm text-muted-foreground">{fmt(t.companiesCan, { name: first })}</p>
                  <Link
                    href={session ? "/onboarding" : `/sign-in?next=${encodeURIComponent(`/talent/${p.handle}`)}`}
                    className={cn(buttonVariants(), "w-full")}
                  >
                    {session ? t.setUpCompany : t.signInToContact}
                  </Link>
                  {!session && (
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                      {t.newHere}{" "}
                      <Link href={`/sign-up?role=general_contractor&next=${encodeURIComponent(`/talent/${p.handle}`)}`} className="text-teal-700 hover:underline">
                        {t.joinEmployer}
                      </Link>
                    </p>
                  )}
                </>
              )}
            </div>
          )}
          {!own && (
          <div className="rounded-xl border border-border bg-card p-5 text-sm">
            <h2 className="font-semibold">{t.lookingToo}</h2>
            <p className="mt-1 text-muted-foreground">{t.lookingTooBody}</p>
            <Link href="/talent/edit" className="mt-3 inline-block font-medium text-teal-700 hover:underline">
              {t.makeYourProfile}
            </Link>
          </div>
          )}
        </aside>
      </div>
    </Container>
  );
}
