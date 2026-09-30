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
import { contactsLeft, personJsonLd, yearsLabel } from "@/lib/talent/rules";
import { EMPLOYMENT_LABEL } from "@/lib/jobs/rules";
import { telHref } from "@/lib/trusted/rules";
import { cn } from "@/lib/utils";
import { setLangFrom } from "@/i18n/server";

const BASE = (process.env.NEXT_PUBLIC_SITE_URL || "https://pmrfp.com").replace(/\/$/, "");

type Props = { params: Promise<{ handle: string }>; searchParams: Promise<{ saved?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const p = await getTalent(handle);
  if (!p) return { title: "Profile not found", robots: { index: false, follow: false } };
  const where = [p.city, p.province].filter(Boolean).join(", ");
  const title = `${p.displayName}${p.trade ? `, ${p.trade}` : ""}${where ? ` in ${where}` : ""}`;
  const description =
    p.headline ??
    `${p.trade ?? "Tradesperson"}${where ? ` in ${where}` : ""}${p.yearsExperience != null ? ` with ${yearsLabel(p.yearsExperience)} of experience` : ""}.`;
  return {
    title,
    description,
    alternates: { canonical: `/talent/${p.handle}` },
    ...(p.published ? {} : { robots: { index: false, follow: false } }),
    openGraph: { title, description, url: `/talent/${p.handle}` },
  };
}

export default async function TalentProfilePage({ params, searchParams }: Props) {
  await setLangFrom(params);
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
  const where = [p.city, p.province].filter(Boolean).join(", ");
  const years = yearsLabel(p.yearsExperience);
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
        ← All people
      </Link>

      {own && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-teal-300 bg-teal-50/60 p-4 text-sm">
          <p className="flex items-center gap-2 font-medium">
            {saved ? <Check className="size-4 text-teal-700" /> : null}
            {saved ? "Profile saved. " : ""}
            {p.published ? "This is your public profile." : "Your profile is hidden. Only you can see this page."}
          </p>
          <Link href="/talent/edit" className={buttonVariants({ size: "sm", variant: "outline" })}>
            Edit profile
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
              <p className="mt-1 text-lg text-muted-foreground">{p.headline || p.trade || "Tradesperson"}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <AvailabilityBadge availability={p.availability} />
            {p.trade && <span className="font-medium text-foreground">{p.trade}</span>}
            {where && (
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" /> {where}
              </span>
            )}
            {years && (
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" /> {years} in the trade
              </span>
            )}
          </div>

          {p.certifications.length > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold tracking-tight">Tickets and certifications</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.certifications.map((c) => (
                  <li key={c} className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-sm">
                    <BadgeCheck className="size-4 text-teal-700" /> {c}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-muted-foreground">As listed by {first}. Ask to see the cards before hiring.</p>
            </section>
          )}

          {p.bio && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold tracking-tight">About {first}</h2>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-foreground/90">{p.bio}</p>
            </section>
          )}

          <section className="mt-8 grid gap-4 sm:grid-cols-2">
            {(p.employmentTypes.length > 0 || p.payExpectation) && (
              <div className="rounded-xl border border-border bg-card p-4 text-sm">
                <h2 className="font-semibold">Looking for</h2>
                {p.employmentTypes.length > 0 && (
                  <p className="mt-1.5 text-muted-foreground">{p.employmentTypes.map((t) => EMPLOYMENT_LABEL[t]).join(", ")}</p>
                )}
                {p.payExpectation && <p className="mt-1.5 text-foreground">{p.payExpectation}</p>}
              </div>
            )}
            {p.otherTrades.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-4 text-sm">
                <h2 className="font-semibold">Also works in</h2>
                <p className="mt-1.5 text-muted-foreground">{p.otherTrades.map((t) => t.name).join(", ")}</p>
              </div>
            )}
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Endorsements</h2>
            {endorsements.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">No endorsements yet. Companies on PMRFP that have worked with {first} can add one.</p>
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
                      , verified company on PMRFP
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

          <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
            Profile written by {first}. PMRFP doesn&apos;t employ or vet workers and isn&apos;t party to any hiring decision.
          </p>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {!own && session?.profile.primary_role !== "talent" && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-semibold">Hiring?</h2>
              {employer ? (
                <>
                  <p className="mb-4 mt-1 text-sm text-muted-foreground">Message {first} through PMRFP. They reply to your email.</p>
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
                <p className="mt-1 text-sm text-muted-foreground">
                  You can contact {first} once your company profile is approved.
                </p>
              ) : (
                <>
                  <p className="mb-4 mt-1 text-sm text-muted-foreground">
                    Companies on PMRFP can message {first}. Free to join.
                  </p>
                  <Link
                    href={session ? "/onboarding" : `/sign-in?next=${encodeURIComponent(`/talent/${p.handle}`)}`}
                    className={cn(buttonVariants(), "w-full")}
                  >
                    {session ? "Set up your company" : "Sign in to contact"}
                  </Link>
                  {!session && (
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                      New here?{" "}
                      <Link href={`/sign-up?role=general_contractor&next=${encodeURIComponent(`/talent/${p.handle}`)}`} className="text-teal-700 hover:underline">
                        Join as an employer
                      </Link>
                    </p>
                  )}
                </>
              )}
            </div>
          )}
          {!own && (
          <div className="rounded-xl border border-border bg-card p-5 text-sm">
            <h2 className="font-semibold">Looking for work too?</h2>
            <p className="mt-1 text-muted-foreground">Make a free profile so companies hiring in your trade can find you.</p>
            <Link href="/talent/edit" className="mt-3 inline-block font-medium text-teal-700 hover:underline">
              Make your profile
            </Link>
          </div>
          )}
        </aside>
      </div>
    </Container>
  );
}
