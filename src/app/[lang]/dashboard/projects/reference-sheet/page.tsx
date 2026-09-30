import type { Metadata } from "next";
import Link from "@/i18n/link";
import { redirect } from "next/navigation";
import { requireRole, isDemoMode } from "@/lib/access/access";
import { listReferenceSheet } from "@/lib/projects/server";
import { PrintButton } from "@/components/projects/print-button";
import { SITE } from "@/lib/site";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { fmt, formatDate } from "@/i18n/format";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: getDictionary(hasLocale(lang) ? lang : "en").dash.meta.referenceSheet,
    robots: { index: false, follow: false },
  };
}

/**
 * One printable page to attach to a bid: the company's published projects
 * and, where the client agreed, their contact details as a reference. The
 * dashboard chrome hides itself in print (DashboardShell print:hidden).
 */
export default async function ReferenceSheetPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const lang = getLang();
  const t = getT("dash").sheet;
  const fmtMonth = (d: string | null) => (d ? formatDate(d, lang, { month: "long", year: "numeric" }) : "");
  const session = await requireRole(["trade", "supplier"]);
  const org = session.organization;
  if (!org) redirect(localizePath("/onboarding", lang));
  const entries = isDemoMode() ? [] : await listReferenceSheet(org.id);
  const base = (process.env.NEXT_PUBLIC_SITE_URL || SITE.url).replace(/\/$/, "");
  const contact = [org.phone, org.email, org.website].filter(Boolean).join(" · ");

  return (
    <div className="mx-auto max-w-3xl bg-white text-black">
      <style>{`@page { margin: 0.6in; } @media print { body { background: white; } a { color: inherit; text-decoration: none; } }`}</style>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-secondary/40 p-4 text-sm print:hidden">
        <span className="text-muted-foreground">{t.intro}</span>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/projects" className="font-medium text-teal-ink hover:underline">
            {t.back}
          </Link>
          <PrintButton />
        </div>
      </div>

      <header className="border-b-2 border-black pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-600">{t.eyebrow}</p>
        <h1 className="mt-1 text-2xl font-bold">{org.name}</h1>
        <p className="mt-1 text-sm text-gray-700">
          {[org.city, org.province].filter(Boolean).join(", ")}
          {contact ? ` · ${contact}` : ""}
        </p>
        {org.profile_status === "approved" && (
          <p className="mt-1 text-sm text-gray-700">
            {fmt(t.profileLine, { url: `${base.replace(/^https?:\/\//, "")}/directory/${org.slug}` })}
          </p>
        )}
      </header>

      {entries.length === 0 ? (
        <p className="mt-6 text-sm text-gray-700">
          {t.empty}{" "}
          <Link href="/dashboard/projects/new" className="font-medium underline print:hidden">
            {t.addOne}
          </Link>
        </p>
      ) : (
        <ol className="mt-4 divide-y divide-gray-200">
          {entries.map((e) => (
            <li key={e.slug} className="flex gap-4 py-4 [break-inside:avoid]">
              {e.heroUrl && (
                // eslint-disable-next-line @next/next/no-img-element -- print layout, plain img
                <img src={e.heroUrl} alt="" className="size-24 shrink-0 rounded object-cover" />
              )}
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold leading-snug">{e.title}</h2>
                <p className="text-xs text-gray-600">
                  {[e.place, fmtMonth(e.publishedAt)].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-1 text-sm text-gray-800">{e.summary}</p>
                <p className="mt-1 text-xs text-gray-600">
                  {base.replace(/^https?:\/\//, "")}/case-studies/{e.slug}
                </p>
                {e.references.map((r, i) => (
                  <div key={i} className="mt-2 rounded border border-gray-200 p-2 text-sm">
                    <p className="text-gray-800">
                      <span className="text-amber-600">{"★".repeat(r.rating)}</span> &ldquo;{r.quote}&rdquo;
                    </p>
                    <p className="mt-1 text-xs text-gray-700">
                      {t.reference} <strong>{r.name}</strong>
                      {r.company ? `, ${r.company}` : ""}
                      {r.email ? ` · ${r.email}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ol>
      )}

      <p className="mt-6 border-t border-gray-200 pt-3 text-xs text-gray-500">
        {fmt(t.footer, { site: SITE.name })}
      </p>
    </div>
  );
}
