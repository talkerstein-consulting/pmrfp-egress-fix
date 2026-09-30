import { z } from "zod";
import type { Locale } from "@/i18n/config";
import { fmt, formatNumber } from "@/i18n/format";

/**
 * Jobs on PMRFP: companies hire people (GCs, trades, property managers,
 * suppliers); job seekers apply without an account. Pure rules here; reads
 * in ./data, writes in ./actions and /api/jobs/apply.
 */

export const EMPLOYMENT_TYPES = ["full_time", "part_time", "contract", "seasonal", "apprenticeship", "temporary"] as const;
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export const EMPLOYMENT_LABEL: Record<EmploymentType, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  contract: "Contract",
  seasonal: "Seasonal",
  apprenticeship: "Apprenticeship",
  temporary: "Temporary",
};

/** schema.org employmentType values Google for Jobs understands. */
const GOOGLE_TYPE: Record<EmploymentType, string[]> = {
  full_time: ["FULL_TIME"],
  part_time: ["PART_TIME"],
  contract: ["CONTRACTOR"],
  seasonal: ["TEMPORARY"],
  apprenticeship: ["FULL_TIME", "INTERN"],
  temporary: ["TEMPORARY"],
};

export const PAY_UNITS = ["hour", "day", "year", "project"] as const;
export type PayUnit = (typeof PAY_UNITS)[number];

/** Open jobs a company can have at once without Trade Pro. */
export const FREE_JOB_LIMIT = 3;
/** Days a posting stays up before it expires (renewable). */
export const JOB_DAYS = 30;

/**
 * What the jobs forms can hear back from the server, in English: the zod
 * messages below, lib/jobs/actions and /api/jobs/apply (keep these identical
 * to the text that route sends). Other languages translate by key
 * (jobsClient.errors.jobs) through localMessage.
 */
export const JOB_MESSAGES = {
  jobTitle: "Give the job a title.",
  pickTrade: "Pick the trade.",
  pickRegion: "Pick the region.",
  addCity: "Add the city or area.",
  pickType: "Pick the type of job.",
  describe: "Describe the job in at least a couple of sentences.",
  payRange: "The top of the pay range is lower than the bottom.",
  addName: "Add your name.",
  badEmail: "That email doesn't look right.",
  checkForm: "Please check the form.",
  signInToPost: "Sign in to post a job.",
  finishProfile: "Finish setting up your company profile first.",
  needsApproval: "Your company profile needs to be approved before you can post jobs.",
  unavailable: "This isn't available right now.",
  freeLimitPost: `Free accounts can have ${FREE_JOB_LIMIT} open jobs at a time. Close one, or upgrade to Trade Pro for unlimited job posts.`,
  freeLimitRenew: `Free accounts can have ${FREE_JOB_LIMIT} open jobs at a time. Close one first, or upgrade to Trade Pro.`,
  switchingOn: "Job posting is switching on. Try again in a few minutes.",
  couldNotPost: "Could not post the job. Please try again.",
  unknownJob: "Unknown job.",
  notYours: "That job isn't yours.",
  couldNotUpdate: "Could not update the job.",
  noLongerOpen: "This job is no longer taking applications.",
  couldNotApply: "Could not send your application. Please try again.",
};

/**
 * A message the server sent in English, in the reader's language. English
 * passes through untouched; other languages look the text up in `en` (a
 * *_MESSAGES registry) and use the same key in `local`, or `fallback` when
 * the text isn't known (a zod default, a network error).
 */
export function localMessage<K extends string>(
  message: string | undefined,
  lang: Locale,
  en: Record<K, string>,
  local: Record<K, string>,
  fallback: string,
): string {
  if (!message) return fallback;
  if (lang === "en") return message;
  const key = (Object.keys(en) as K[]).find((k) => en[k] === message);
  return key ? local[key] : fallback;
}

export function canPostJob(openJobs: number, pro: boolean): boolean {
  return pro || openJobs < FREE_JOB_LIMIT;
}

/** "$28.50", "$32", "$65,000": cents only when there are cents. */
const money = (n: number) =>
  `$${Number.isInteger(n) ? n.toLocaleString("en-CA") : n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** "$32–$40 an hour", "From $65,000 a year", "" when no pay is given. */
export function payLabel(min: number | null, max: number | null, unit: PayUnit | null): string {
  if (min == null && max == null) return "";
  const per = unit === "hour" ? " an hour" : unit === "day" ? " a day" : unit === "year" ? " a year" : unit === "project" ? " for the job" : "";
  if (min != null && max != null && max > min) return `${money(min)}–${money(max)}${per}`;
  if (min != null && (max == null || max === min)) return `${max === min ? "" : "From "}${money(min)}${per}`;
  return `Up to ${money(max!)}${per}`;
}

/** Words for payLabelIn, from jobsClient.pay. */
export interface PayWords {
  unit: Record<PayUnit, string>;
  range: string;
  from: string;
  upTo: string;
}

/**
 * payLabel in the reader's language: English is payLabel exactly; French reads
 * "32 $ à 40 $ l'heure"; Spanish (U.S. style, dollar sign first) "$32 a $40 por hora".
 */
export function payLabelIn(
  lang: Locale,
  words: PayWords,
  min: number | null,
  max: number | null,
  unit: PayUnit | null,
): string {
  if (lang === "en") return payLabel(min, max, unit);
  if (min == null && max == null) return "";
  const amount = (n: number) => {
    const num = formatNumber(n, lang, Number.isInteger(n) ? {} : { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return lang === "fr" ? `${num} $` : `$${num}`;
  };
  const per = unit ? ` ${words.unit[unit]}` : "";
  if (min != null && max != null && max > min) return `${fmt(words.range, { min: amount(min), max: amount(max) })}${per}`;
  if (min != null && (max == null || max === min)) return `${max === min ? amount(min) : fmt(words.from, { amount: amount(min) })}${per}`;
  return `${fmt(words.upTo, { amount: amount(max!) })}${per}`;
}

export const jobSchema = z
  .object({
    title: z.string().trim().min(4, JOB_MESSAGES.jobTitle).max(120),
    category: z.string().trim().min(1, JOB_MESSAGES.pickTrade),
    region: z.string().trim().min(1, JOB_MESSAGES.pickRegion),
    city: z.string().trim().min(2, JOB_MESSAGES.addCity).max(80),
    employmentType: z.enum(EMPLOYMENT_TYPES, JOB_MESSAGES.pickType),
    payMin: z.coerce.number().min(0).max(1_000_000).optional(),
    payMax: z.coerce.number().min(0).max(1_000_000).optional(),
    payUnit: z.enum(PAY_UNITS).optional(),
    description: z.string().trim().min(40, JOB_MESSAGES.describe).max(5000),
    requirements: z.string().trim().max(3000).optional(),
  })
  .refine((d) => d.payMin == null || d.payMax == null || d.payMax >= d.payMin, {
    message: JOB_MESSAGES.payRange,
    path: ["payMax"],
  });

export const applicationSchema = z.object({
  slug: z.string().trim().min(3).max(90),
  name: z.string().trim().min(2, JOB_MESSAGES.addName).max(80),
  email: z.email(JOB_MESSAGES.badEmail).max(120),
  phone: z.string().trim().max(30).optional().default(""),
  experienceYears: z.coerce.number().int().min(0).max(60).optional(),
  certifications: z.string().trim().max(500).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
  company_website: z.string().optional().default(""),
});

/** Readable, unique job URL: "licensed-electrician-309a-toronto-k3f9". */
export function jobSlug(title: string, city: string): string {
  const base = `${title} ${city}`
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/, "");
  return `${base || "job"}-${Math.random().toString(36).slice(2, 6)}`;
}

export interface JobForJsonLd {
  title: string;
  description: string;
  requirements: string | null;
  createdAt: string;
  expiresAt: string;
  employmentType: EmploymentType;
  city: string;
  province: string | null;
  country: "CA" | "US";
  payMin: number | null;
  payMax: number | null;
  payUnit: PayUnit | null;
  company: { name: string; url: string; logo: string | null };
  url: string;
}

/** schema.org JobPosting, so open jobs can appear in Google's job search. */
export function jobPostingJsonLd(j: JobForJsonLd): Record<string, unknown> {
  const escapeHtml = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const para = (t: string) => `<p>${escapeHtml(t).replace(/\n/g, "<br>")}</p>`;
  const unitText = j.payUnit === "hour" ? "HOUR" : j.payUnit === "day" ? "DAY" : j.payUnit === "year" ? "YEAR" : null;
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: j.title,
    description: para(j.description) + (j.requirements ? `<p><strong>Requirements</strong></p>${para(j.requirements)}` : ""),
    datePosted: j.createdAt.slice(0, 10),
    validThrough: `${j.expiresAt}T23:59:59`,
    employmentType: GOOGLE_TYPE[j.employmentType],
    directApply: true,
    url: j.url,
    hiringOrganization: {
      "@type": "Organization",
      name: j.company.name,
      sameAs: j.company.url,
      ...(j.company.logo ? { logo: j.company.logo } : {}),
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: j.city,
        ...(j.province ? { addressRegion: j.province } : {}),
        addressCountry: j.country,
      },
    },
    ...(unitText && (j.payMin != null || j.payMax != null)
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: j.country === "US" ? "USD" : "CAD",
            value: {
              "@type": "QuantitativeValue",
              ...(j.payMin != null ? { minValue: j.payMin } : {}),
              ...(j.payMax != null ? { maxValue: j.payMax } : {}),
              unitText,
            },
          },
        }
      : {}),
  };
}
