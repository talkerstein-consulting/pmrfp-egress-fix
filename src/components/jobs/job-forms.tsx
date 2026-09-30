"use client";

import { useActionState, useState, useTransition } from "react";
import Link from "@/i18n/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createJobAction, setJobStatusAction, type JobFormState } from "@/lib/jobs/actions";
import { EMPLOYMENT_TYPES, JOB_MESSAGES, PAY_UNITS, localMessage } from "@/lib/jobs/rules";
import { useLang, useT } from "@/i18n/provider";
import { fmt } from "@/i18n/format";

type Option = { slug: string; name: string };

const SELECT =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Field({ label, hint, children, className }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="mb-1.5 flex items-center justify-between">
        {label}
        {hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}
      </Label>
      {children}
    </div>
  );
}

/** Post a job. Trade and region come from the directory taxonomy (names arrive translated). */
export function JobPostForm({ trades, regions }: { trades: Option[]; regions: Option[] }) {
  const [state, action, pending] = useActionState<JobFormState, FormData>(createJobAction, {});
  const lang = useLang();
  const all = useT("jobsClient");
  const t = all.postForm;
  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="lang" value={lang} />
      <Field label={t.title} className="sm:col-span-2">
        <Input name="title" required minLength={4} maxLength={120} placeholder={t.titlePlaceholder} />
      </Field>
      <Field label={t.trade}>
        <select name="category" required defaultValue="" className={SELECT}>
          <option value="" disabled>
            {t.pickTrade}
          </option>
          {trades.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label={t.type}>
        <select name="employmentType" required defaultValue="full_time" className={SELECT}>
          {EMPLOYMENT_TYPES.map((e) => (
            <option key={e} value={e}>
              {all.employment[e]}
            </option>
          ))}
        </select>
      </Field>
      <Field label={t.region}>
        <select name="region" required defaultValue="" className={SELECT}>
          <option value="" disabled>
            {t.pickRegion}
          </option>
          {regions.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label={t.city}>
        <Input name="city" required minLength={2} maxLength={80} placeholder={t.cityPlaceholder} />
      </Field>
      <Field label={t.pay} hint={t.payHint} className="sm:col-span-2">
        <div className="grid grid-cols-[1fr_auto_1fr_auto] items-center gap-2">
          <Input name="payMin" type="number" min={0} step="0.01" placeholder={t.from} aria-label={t.fromLabel} />
          <span className="text-sm text-muted-foreground">{t.to}</span>
          <Input name="payMax" type="number" min={0} step="0.01" placeholder={t.toPlaceholder} aria-label={t.toLabel} />
          <select name="payUnit" defaultValue="hour" className={SELECT} aria-label={t.perLabel}>
            {PAY_UNITS.map((u) => (
              <option key={u} value={u}>
                {all.pay.unit[u]}
              </option>
            ))}
          </select>
        </div>
      </Field>
      <Field label={t.about} className="sm:col-span-2">
        <Textarea name="description" required minLength={40} maxLength={5000} rows={6} placeholder={t.aboutPlaceholder} />
      </Field>
      <Field label={t.requirements} hint={all.optional} className="sm:col-span-2">
        <Textarea name="requirements" maxLength={3000} rows={3} placeholder={t.requirementsPlaceholder} />
      </Field>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? t.posting : t.submit}
        </Button>
        {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      </div>
    </form>
  );
}

/** Apply without an account; the employer gets it by email. */
export function JobApplyForm({ slug, company }: { slug: string; company: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [hasProfile, setHasProfile] = useState(false);
  const lang = useLang();
  const all = useT("jobsClient");
  const t = all.applyForm;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    setError(null);
    try {
      const years = fd.get("experienceYears")?.toString().trim();
      const res = await fetch("/api/jobs/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone") ?? "",
          experienceYears: years ? Number(years) : undefined,
          certifications: fd.get("certifications") ?? "",
          message: fd.get("message") ?? "",
          company_website: fd.get("company_website") ?? "",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? all.somethingWrong);
      setHasProfile(Boolean(json.hasProfile));
      setState("sent");
    } catch (err) {
      // The route answers in English; show it in the page's language.
      setError(localMessage(err instanceof Error ? err.message : undefined, lang, JOB_MESSAGES, all.errors.jobs, all.somethingWrong));
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-xl border border-teal-300 bg-teal-50/60 p-5">
        <p className="font-semibold">{t.sentTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{fmt(t.sentBody, { company })}</p>
        {hasProfile ? (
          <p className="mt-3 text-sm text-muted-foreground">{t.profileAttached}</p>
        ) : (
          <div className="mt-4 border-t border-teal-200 pt-4">
            <p className="text-sm font-medium">{t.saveTime}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.saveTimeBody}</p>
            <Link href="/sign-up?role=talent" className="mt-3 inline-block text-sm font-medium text-teal-700 hover:underline">
              {t.makeProfile}
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input name="name" placeholder={t.name} required maxLength={80} />
      <Input name="email" type="email" placeholder={t.email} required maxLength={120} />
      <Input name="phone" type="tel" placeholder={t.phone} maxLength={30} />
      <Input name="experienceYears" type="number" min={0} max={60} placeholder={t.years} />
      <Input name="certifications" placeholder={t.certifications} maxLength={500} />
      <Textarea name="message" placeholder={t.message} rows={4} maxLength={2000} />
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={state === "sending"}>
        {state === "sending" ? all.sending : t.submit}
      </Button>
      <p className="text-[11px] leading-relaxed text-muted-foreground">{fmt(t.note, { company })}</p>
    </form>
  );
}

/** Close a job, or renew it for another 30 days. */
export function JobStatusButton({ jobId, action }: { jobId: string; action: "close" | "renew" }) {
  const [pending, start] = useTransition();
  const lang = useLang();
  const t = useT("jobsClient").status;
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      disabled={pending}
      onClick={() =>
        start(async () => {
          const res = await setJobStatusAction(jobId, action, lang);
          if (res.error) toast.error(res.error);
          else toast.success(action === "close" ? t.closed : t.renewed);
        })
      }
    >
      {pending ? "…" : action === "close" ? t.close : t.renew}
    </Button>
  );
}
