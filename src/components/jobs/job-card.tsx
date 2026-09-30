import Image from "next/image";
import Link from "@/i18n/link";
import { Briefcase, MapPin } from "lucide-react";
import type { Job } from "@/lib/jobs/data";
import { payLabelIn } from "@/lib/jobs/rules";
import { getLang, getT } from "@/i18n/server";
import { fmt } from "@/i18n/format";
import { regionName, tradeName } from "@/i18n/terms";

function postedAgo(iso: string, t: { postedToday: string; postedYesterday: string; postedDaysAgo: string }): string {
  const days = Math.max(0, Math.floor((Date.parse(new Date().toISOString().slice(0, 10)) - Date.parse(iso.slice(0, 10))) / 86_400_000));
  return days === 0 ? t.postedToday : days === 1 ? t.postedYesterday : fmt(t.postedDaysAgo, { n: days });
}

export function JobCard({ job }: { job: Job }) {
  const lang = getLang();
  const t = getT("jobs").card;
  const labels = getT("jobsClient");
  const pay = payLabelIn(lang, labels.pay, job.payMin, job.payMax, job.payUnit);
  const initials = job.company.name.split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="group flex gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-teal-400"
    >
      <span className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white text-sm font-bold text-indigo">
        {job.company.logoUrl ? (
          <Image src={job.company.logoUrl} alt="" fill sizes="48px" className="object-contain p-1" unoptimized={job.company.logoUrl.endsWith(".svg")} />
        ) : (
          initials
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-semibold leading-snug text-foreground group-hover:text-teal-700">{job.title}</span>
          {job.pro && (
            <span className="rounded-full bg-indigo px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-teal-300">Pro</span>
          )}
        </span>
        <span className="mt-0.5 block text-sm text-muted-foreground">{job.company.name}</span>
        <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" /> {job.city}
            {job.province ? `, ${regionName(job.province, lang)}` : ""}
          </span>
          <span className="inline-flex items-center gap-1">
            <Briefcase className="size-3.5" /> {labels.employment[job.employmentType]}
            {job.trade ? ` · ${tradeName(job.trade, lang)}` : ""}
          </span>
          {pay && <span className="font-medium text-foreground">{pay}</span>}
          <span>{postedAgo(job.createdAt, t)}</span>
        </span>
      </span>
    </Link>
  );
}
