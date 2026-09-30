import Link from "@/i18n/link";
import { Check } from "lucide-react";
import { requireRole } from "@/lib/access/access";
import { PageHeader } from "@/components/dashboard/stat-card";
import { EmptyState } from "@/components/public/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { ActivateButton } from "@/components/dashboard/billing-actions";
import { ShareLink, TrustedPageForm, TrustedTradeRow } from "@/components/trusted/trusted-editor";
import { getMyTrustedList, isRealtorPro } from "@/lib/trusted/data";
import { FREE_LIMIT } from "@/lib/trusted/rules";
import { PRICING, SITE } from "@/lib/site";
import { realtorPriceId } from "@/lib/stripe/server";
import type { Metadata } from "next";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { fmt, plural } from "@/i18n/format";
import { tradeName } from "@/i18n/terms";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDictionary(hasLocale(lang) ? lang : "en").pm.trusted.metaTitle };
}

const BASE = (process.env.NEXT_PUBLIC_SITE_URL || "https://pmrfp.com").replace(/\/$/, "");

export default async function TrustedTradesPage({ searchParams, params }: { searchParams: Promise<{ upgraded?: string }> } & { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("pm").trusted;
  const lang = getLang();
  const session = await requireRole(["property_manager", "real_estate_agent"]);
  const { upgraded } = await searchParams;
  const [{ ready, list, trades }, pro] = await Promise.all([
    getMyTrustedList(session.userId),
    isRealtorPro(session.organization?.id ?? null),
  ]);
  const canCheckout = Boolean(await realtorPriceId());

  return (
    <div className="space-y-8">
      <PageHeader
        title={t.title}
        description={t.description}
      />

      {upgraded && (
        <p className="flex items-center gap-2 rounded-lg border border-teal-300 bg-teal-50/60 p-4 text-sm font-medium">
          <Check className="size-4 text-teal-700" /> {t.upgraded}
        </p>
      )}

      {!ready ? (
        <EmptyState title={t.almostTitle} description={t.almostDescription} />
      ) : !list || trades.length === 0 ? (
        <EmptyState
          title={t.startTitle}
          description={t.startDescription}
        >
          <Link href="/directory" className={buttonVariants()}>
            {t.browse}
          </Link>
        </EmptyState>
      ) : (
        <>
          <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <h2 className="font-semibold">{t.yourPage}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {list.published ? t.published : t.hidden}
            </p>
            <div className="mt-4">
              <ShareLink url={`${BASE}/trusted/${list.handle}`} path={`/trusted/${list.handle}`} />
            </div>
            {list.published && (
              <Link href="/widgets?w=trusted" className="mt-3 inline-block text-sm font-medium text-teal-700 hover:underline">
                {t.widget}
              </Link>
            )}
          </section>

          <section>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-semibold">{t.tradesHeading}</h2>
              <span className="text-sm text-muted-foreground">
                {pro ? plural(trades.length, t.countPro) : fmt(t.countFree, { n: trades.length, limit: FREE_LIMIT })}
              </span>
            </div>
            <ul className="mt-3 space-y-3">
              {trades.map((item) => (
                <TrustedTradeRow
                  key={item.organizationId}
                  organizationId={item.organizationId}
                  name={item.vendor.name}
                  slug={item.vendor.slug}
                  detail={[item.vendor.categories.slice(0, 2).map((c) => tradeName(c, lang)).join(", "), item.vendor.city].filter(Boolean).join(" · ")}
                  note={item.note}
                />
              ))}
            </ul>
            <Link href="/directory" className="mt-3 inline-block text-sm font-medium text-teal-700 hover:underline">
              {t.addMore}
            </Link>
          </section>
        </>
      )}

      {ready && !pro && (
        <section className="rounded-2xl bg-indigo p-6 text-white sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-teal-300">Realtor Pro</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">{t.pro.title}</h2>
          <ul className="mt-4 space-y-2 text-sm text-indigo-100">
            <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-teal-300" /> {fmt(t.pro.unlimited, { limit: FREE_LIMIT })}</li>
            <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-teal-300" /> {t.pro.contact}</li>
            <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-teal-300" /> {t.pro.notes}</li>
          </ul>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {canCheckout ? (
              <ActivateButton plan="realtor" variant="accent" label={fmt(t.pro.start, { price: PRICING.realtorAnnual })} />
            ) : (
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent("Realtor Pro")}&body=${encodeURIComponent(
                  fmt(t.pro.mailBody, { price: PRICING.realtorAnnual, page: list ? ` (pmrfp.com/trusted/${list.handle})` : "" }),
                )}`}
                className={buttonVariants({ variant: "accent", size: "lg" })}
              >
                {fmt(t.pro.get, { price: PRICING.realtorAnnual })}
              </a>
            )}
            <span className="text-sm text-indigo-100/70">{fmt(t.pro.terms, { currency: PRICING.currency })}</span>
          </div>
        </section>
      )}

      {ready && list && (
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="font-semibold">{t.settings}</h2>
          <div className="mt-4">
            <TrustedPageForm
              pro={pro}
              defaults={{
                handle: list.handle,
                displayName: list.displayName,
                brokerage: list.brokerage ?? "",
                headline: list.headline ?? "",
                contactPhone: list.contactPhone ?? "",
                contactEmail: list.contactEmail ?? "",
                published: list.published,
              }}
            />
          </div>
        </section>
      )}
    </div>
  );
}
