import type { Metadata } from "next";
import Link from "@/i18n/link";
import { redirect } from "next/navigation";
import { isDemoMode, requireRole } from "@/lib/access/access";
import { getCategories, getPropertyTypes, getRegions } from "@/lib/data/taxonomy";
import { countActiveProjects, projectsReady } from "@/lib/projects/server";
import { canAddProject, photoLimit } from "@/lib/projects/limits";
import { PageHeader, DemoBanner } from "@/components/dashboard/stat-card";
import { ActivateButton } from "@/components/dashboard/billing-actions";
import { ProjectCapture } from "@/components/projects/project-capture";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDictionary(hasLocale(lang) ? lang : "en").dash.meta.newProject };
}

/**
 * Photo-first project capture. Made for a phone on site: snap before /
 * during / after, say what you did in a line, let AI draft the write-up,
 * publish. The long typed form (/dashboard/case-studies/new) still works.
 */
export default async function NewProjectPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const lang = getLang();
  const dash = getT("dash");
  const t = dash.newProject;
  const session = await requireRole(["trade", "supplier"]);
  const org = session.organization;
  if (!org) redirect(localizePath("/onboarding", lang));
  const demo = isDemoMode();
  const paid = session.hasTradeAccess;

  const [categories, regions, propertyTypes, existing, ready] = await Promise.all([
    getCategories(),
    getRegions(),
    getPropertyTypes(),
    demo ? Promise.resolve(0) : countActiveProjects(org.id),
    demo ? Promise.resolve(true) : projectsReady(),
  ]);

  if (!ready) {
    return (
      <>
        <PageHeader title={t.title} />
        <p className="max-w-2xl rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
          {dash.projects.notReady}{" "}
          <Link href="/dashboard/case-studies/new" className="font-medium text-teal-ink hover:underline">
            {dash.projects.notReadyLink}
          </Link>
          .
        </p>
      </>
    );
  }

  if (!canAddProject(paid, existing)) {
    return (
      <>
        <PageHeader title={t.title} />
        <div className="max-w-2xl rounded-xl border border-teal-300 bg-teal-50/60 p-6">
          <h2 className="text-base font-semibold">{t.usedTitle}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{t.usedBody}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <ActivateButton />
            <Link href="/dashboard/projects" className="text-sm font-medium text-teal-ink hover:underline">
              {t.back}
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {demo && <DemoBanner />}
      <PageHeader
        title={t.title}
        description={t.description}
        action={
          <Link href="/dashboard/case-studies/new" className="text-sm font-medium text-teal-ink hover:underline">
            {t.typeIt}
          </Link>
        }
      />
      <ProjectCapture
        paid={paid}
        autoPublish={paid && org.profile_status === "approved"}
        photoLimit={photoLimit(paid)}
        categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
        propertyTypes={propertyTypes}
        regions={regions.map((r) => ({ slug: r.slug, name: r.name, country: r.country }))}
      />
    </>
  );
}
