import type { Metadata } from "next";
import Link from "@/i18n/link";
import { redirect } from "next/navigation";
import { Camera } from "lucide-react";
import { getSession } from "@/lib/access/access";
import { getCategories, getRegions } from "@/lib/data/taxonomy";
import { submitCaseStudyAction } from "@/lib/case-studies/actions";
import { projectsReady } from "@/lib/projects/server";
import { PageHeader } from "@/components/dashboard/stat-card";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { regionName, tradeName } from "@/i18n/terms";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDictionary(hasLocale(lang) ? lang : "en").dash.meta.newCaseStudy };
}

/**
 * Guided case-study submission. The structure IS the help: challenge →
 * approach → outcome with concrete prompts, so a busy contractor produces a
 * substantive write-up instead of a two-line testimonial. Published studies
 * deepen their profile, the /case-studies index, and their trade×city page.
 */
export default async function NewCaseStudyPage({
  searchParams, params }: {
  searchParams: Promise<{ error?: string }>;
} & { params: Promise<object> }) {
  await setLangFrom(params);
  const lang = getLang();
  const t = getT("dash").caseStudy;
  const session = await getSession();
  if (!session) redirect(localizePath("/sign-in", lang));
  if (!session.organization) redirect(localizePath("/onboarding", lang));
  const { error } = await searchParams;

  const [categories, regions, photoProjects] = await Promise.all([getCategories(), getRegions(), projectsReady()]);

  const field =
    "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm";
  const label = "block text-sm font-medium";
  const hint = "mt-1 text-xs text-muted-foreground";

  return (
    <>
      <PageHeader
        title={t.title}
        description={t.description}
      />

      {photoProjects && (
        <Link
          href="/dashboard/projects/new"
          className="mb-6 flex max-w-2xl items-center gap-3 rounded-lg border border-teal-300 bg-teal-50/60 p-4 text-sm transition-colors hover:bg-teal-50"
        >
          <Camera className="size-5 shrink-0 text-teal-600" />
          <span>
            <strong className="font-semibold">{t.photoTitle}</strong>{" "}
            {t.photoBody}{" "}
            <span className="font-medium text-teal-ink underline">{t.photoLink}</span>
          </span>
        </Link>
      )}

      {error && (
        <div className="mb-4 rounded-md border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
          {decodeURIComponent(error)}
        </div>
      )}

      <form action={submitCaseStudyAction} className="max-w-2xl space-y-5">
        <div>
          <label htmlFor="title" className={label}>{t.titleLabel}</label>
          <input id="title" name="title" required className={field}
            placeholder={t.titlePlaceholder} />
          <p className={hint}>{t.titleHint}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="categorySlug" className={label}>{t.category}</label>
            <select id="categorySlug" name="categorySlug" className={field} defaultValue="">
              <option value="">{t.select}</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>{tradeName(c.name, lang)}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="regionSlug" className={label}>{t.region}</label>
            <select id="regionSlug" name="regionSlug" className={field} defaultValue="">
              <option value="">{t.select}</option>
              {regions.map((r) => (
                <option key={r.slug} value={r.slug}>{regionName(r.name, lang)}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="city" className={label}>{t.city}</label>
            <input id="city" name="city" className={field} placeholder={t.cityPlaceholder} />
          </div>
          <div>
            <label htmlFor="province" className={label}>{t.province}</label>
            <input id="province" name="province" className={field} placeholder={t.provincePlaceholder} />
          </div>
          <div>
            <label htmlFor="propertyType" className={label}>{t.propertyType}</label>
            <input id="propertyType" name="propertyType" className={field} placeholder={t.propertyTypePlaceholder} />
          </div>
        </div>

        <div>
          <label htmlFor="challenge" className={label}>{t.challenge}</label>
          <textarea id="challenge" name="challenge" required rows={4} className={field}
            placeholder={t.challengePlaceholder} />
          <p className={hint}>{t.challengeHint}</p>
        </div>

        <div>
          <label htmlFor="approach" className={label}>{t.approach}</label>
          <textarea id="approach" name="approach" required rows={4} className={field}
            placeholder={t.approachPlaceholder} />
          <p className={hint}>{t.approachHint}</p>
        </div>

        <div>
          <label htmlFor="outcome" className={label}>{t.outcome}</label>
          <textarea id="outcome" name="outcome" required rows={4} className={field}
            placeholder={t.outcomePlaceholder} />
          <p className={hint}>{t.outcomeHint}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="timeline" className={label}>{t.timeline}</label>
            <input id="timeline" name="timeline" className={field} placeholder={t.timelinePlaceholder} />
          </div>
          <div>
            <label htmlFor="budgetBand" className={label}>{t.budget}</label>
            <input id="budgetBand" name="budgetBand" className={field} placeholder={t.budgetPlaceholder} />
            <p className={hint}>{t.budgetHint}</p>
          </div>
        </div>

        <button
          type="submit"
          className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          {t.submit}
        </button>
        <p className="text-xs text-muted-foreground">{t.footer}</p>
      </form>
    </>
  );
}
