/**
 * Print-optimized template view. The "Download PDF" CTA on the detail page links
 * here; the page auto-triggers the browser print dialog (which writes a clean PDF
 * via the OS print pipeline — no extra dependency, identical output cross-platform).
 *
 * Layout is intentionally narrow, serif-friendly, and free of nav/footer chrome.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RFP_TEMPLATES, getRfpTemplate } from "@/lib/seo/rfp-templates";
import { localizeRfpTemplate } from "@/lib/seo/rfp-templates.fr";
import { SITE } from "@/lib/site";
import { PrintTrigger } from "./print-trigger";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath } from "@/i18n/config";
import { fmt } from "@/i18n/format";

export const revalidate = 86400;

export async function generateStaticParams() {
  return RFP_TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const c = getDictionary(l).content;
  const base = getRfpTemplate(slug);
  const t = base ? localizeRfpTemplate(base, l) : undefined;
  return {
    title: t ? fmt(c.print.metaTitle, { name: t.name }) : c.template.notFound,
    robots: { index: false, follow: false },
  };
}

export default async function PrintableTemplate({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const lang = await setLangFrom(params);
  const p = getT("content").print;
  const { slug } = await params;
  const base = getRfpTemplate(slug);
  if (!base) notFound();
  const t = localizeRfpTemplate(base, lang);
  const host = SITE.url.replace(/^https?:\/\//, "");
  const templatePath = localizePath(`/rfp-templates/${t.slug}`, lang);

  return (
    <div className="mx-auto max-w-4xl bg-white px-8 py-10 text-[12pt] leading-relaxed text-black print:px-0 print:py-0">
      <PrintTrigger />
      <style>{`
        @page { margin: 0.75in; }
        @media print {
          header.site-header, footer.site-footer, .no-print { display: none !important; }
          body { background: white; }
          a { text-decoration: none; color: inherit; }
        }
      `}</style>

      <div className="no-print mb-6 flex items-center justify-between rounded border border-gray-200 bg-gray-50 px-4 py-3 text-sm">
        <span>
          {p.pressBefore} <kbd className="rounded border border-gray-300 bg-white px-1.5 py-0.5 font-mono text-xs">{p.pressKeys}</kbd>{p.pressAfter}
        </span>
        <a
          href={templatePath}
          className="ml-4 text-sm font-medium text-indigo-700 hover:underline"
        >
          {p.back}
        </a>
      </div>

      <header className="border-b-2 border-black pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-600">
          {fmt(p.headerEyebrow, { brand: SITE.name })}
        </p>
        <h1 className="mt-2 text-2xl font-bold">{t.name}</h1>
        <p className="mt-1 text-sm text-gray-700">{t.pitch}</p>
      </header>

      <Section title={p.whenToUse}>
        <p>{t.whenToUse}</p>
      </Section>

      <Section title={p.sampleTitle}>
        <p className="font-semibold">{t.titleSample}</p>
      </Section>

      <Section title={p.summary}>
        <p>{t.summarySample}</p>
      </Section>

      <Section title={p.scope}>
        <pre className="whitespace-pre-wrap font-sans text-[11pt] leading-relaxed">{t.scope}</pre>
      </Section>

      <Section title={p.requirements}>
        <pre className="whitespace-pre-wrap font-sans text-[11pt] leading-relaxed">
          {t.requirements}
        </pre>
      </Section>

      <Section title={p.timeline}>
        <ol className="ml-5 list-decimal space-y-1.5">
          {t.timeline.map((phase) => (
            <li key={phase.label}>
              <span className="font-semibold">{fmt(p.labelColon, { label: phase.label })}</span> {phase.detail}
            </li>
          ))}
        </ol>
      </Section>

      <Section title={p.siteAccess}>
        <p>{t.siteAccess}</p>
      </Section>

      <Section title={p.questions}>
        <ul className="ml-5 list-disc space-y-1">
          {t.questions.map((q, i) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </Section>

      <Section title={p.evaluation}>
        <ol className="ml-5 list-decimal space-y-1">
          {t.evaluationCriteria.map((crit, i) => (
            <li key={i}>{crit}</li>
          ))}
        </ol>
      </Section>

      <footer className="mt-10 border-t border-gray-300 pt-4 text-xs text-gray-600">
        <p className="font-semibold">{fmt(p.footerTitle, { brand: SITE.name })}</p>
        <p className="mt-1">
          {p.footerBefore}{" "}
          <span className="font-semibold">{host}</span>{p.footerAfter}
        </p>
        <p className="mt-3 text-gray-500">
          {fmt(p.printedFrom, { url: `${host}${templatePath}` })}
        </p>
      </footer>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 break-inside-avoid">
      <h2 className="border-b border-gray-300 pb-1 text-base font-bold uppercase tracking-wide text-gray-800">
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
