import type { Metadata } from "next";
import Link from "@/i18n/link";
import { ArrowRight, Briefcase, UserRound } from "lucide-react";
import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/public/empty-state";
import { TalentCard } from "@/components/talent/talent-card";
import { listTalent } from "@/lib/talent/data";
import { AVAILABILITY, AVAILABILITY_LABEL, FREE_CONTACTS_PER_MONTH } from "@/lib/talent/rules";
import { getCategories, getRegions } from "@/lib/data/taxonomy";
import { cn } from "@/lib/utils";
import { setLangFrom } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Skilled Tradespeople Looking for Work",
  description:
    "Electricians, plumbers, HVAC techs, carpenters, labourers and apprentices with their trade, tickets, experience and availability. Employers message them through PMRFP.",
  alternates: { canonical: "/talent" },
};

const SELECT =
  "h-10 rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default async function TalentPage({
  searchParams, params }: {
  searchParams: Promise<{ trade?: string; region?: string; availability?: string }>;
} & { params: Promise<object> }) {
  await setLangFrom(params);
  const sp = await searchParams;
  const [{ ready, people }, trades, regions] = await Promise.all([
    listTalent({ trade: sp.trade, region: sp.region, availability: sp.availability }),
    getCategories(),
    getRegions(),
  ]);
  const filtered = Boolean(sp.trade || sp.region || sp.availability);

  return (
    <>
      <section className="grid-tex relative overflow-hidden bg-indigo text-white [--grid-color:rgba(145,242,207,0.06)]">
        <Container className="relative py-14 md:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-300">PMRFP Talent</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Skilled tradespeople, with their tickets and availability.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-indigo-100/80">
            Find electricians, plumbers, HVAC techs, carpenters, labourers and apprentices near your jobs. Message them
            through PMRFP. They reply to you directly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#people" className={cn(buttonVariants({ size: "lg", variant: "accent" }), "active:scale-[0.98]")}>
              See people <ArrowRight className="size-4" />
            </a>
            <Link
              href="/talent/edit"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white active:scale-[0.98]",
              )}
            >
              Looking for work? Make a free profile
            </Link>
          </div>
        </Container>
      </section>

      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <div id="people">
          <form method="get" className="flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              Trade
              <select name="trade" defaultValue={sp.trade ?? ""} className={SELECT}>
                <option value="">All trades</option>
                {trades.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              Region
              <select name="region" defaultValue={sp.region ?? ""} className={SELECT}>
                <option value="">Anywhere</option>
                {regions.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              Availability
              <select name="availability" defaultValue={sp.availability ?? ""} className={SELECT}>
                <option value="">Any</option>
                {AVAILABILITY.map((a) => (
                  <option key={a} value={a}>
                    {AVAILABILITY_LABEL[a]}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className={buttonVariants()}>
              Show people
            </button>
            {filtered && (
              <Link href="/talent" className="pb-2 text-sm font-medium text-teal-700 hover:underline">
                Clear
              </Link>
            )}
          </form>

          <div className="mt-8">
            {!ready ? (
              <EmptyState title="Talent profiles are switching on" description="Check back in a few minutes." />
            ) : people.length === 0 ? (
              <EmptyState
                title={filtered ? "No one matches that yet" : "No profiles yet"}
                description={
                  filtered
                    ? "Try another trade or region, or clear the filters. New people join every week."
                    : "Tradespeople are starting to make profiles. Looking for work? Yours can be the first one employers see."
                }
              >
                <Link href="/talent/edit" className={buttonVariants()}>
                  Make a free profile
                </Link>
              </EmptyState>
            ) : (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  {people.length} {people.length === 1 ? "person" : "people"}
                </p>
                <ul className="space-y-3">
                  {people.map((p) => (
                    <li key={p.userId}>
                      <TalentCard person={p} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <UserRound className="size-4 text-teal-700" /> Looking for work?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Make a free profile with your trade, tickets and availability. Companies hiring near you can find you and
              message you. Your email stays private unless you choose to show it.
            </p>
            <Link href="/talent/edit" className={cn(buttonVariants(), "mt-4 w-full")}>
              Make a free profile
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <Briefcase className="size-4 text-teal-700" /> Hiring?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Approved companies can message {FREE_CONTACTS_PER_MONTH} people a month free. Trade Pro members message as
              many as they need. Or post a job and let people apply.
            </p>
            <Link href="/jobs/post" className={cn(buttonVariants({ variant: "outline" }), "mt-4 w-full")}>
              Post a job
            </Link>
          </div>
        </aside>
      </Container>
    </>
  );
}
