"use client";

import { useActionState, useState, useTransition } from "react";
import Link from "@/i18n/link";
import { Mail } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { endorseTalentAction, saveTalentProfileAction, type TalentFormState } from "@/lib/talent/actions";
import { EMPLOYMENT_TYPES, localMessage, type EmploymentType } from "@/lib/jobs/rules";
import {
  AVAILABILITY,
  COMMON_TICKETS,
  FREE_CONTACTS_PER_MONTH,
  TALENT_MESSAGES,
  ticketName,
  type Availability,
} from "@/lib/talent/rules";
import { useLang, useT } from "@/i18n/provider";
import { fmt, plural } from "@/i18n/format";

type Option = { slug: string; name: string };

const SELECT =
  "h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const CHECK = "size-4 rounded border-input accent-[#282B59]";

function Field({ label, hint, htmlFor, children, className }: { label: string; hint?: string; htmlFor?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={htmlFor} className="mb-1.5 flex items-center justify-between">
        {label}
        {hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}
      </Label>
      {children}
    </div>
  );
}

export interface TalentFormDefaults {
  handle: string;
  displayName: string;
  headline: string;
  primaryTrade: string;
  otherTrades: string[];
  region: string;
  city: string;
  yearsExperience: number | null;
  certifications: string[];
  availability: Availability;
  employmentTypes: EmploymentType[];
  payExpectation: string;
  bio: string;
  phone: string;
  published: boolean;
  contactVisible: boolean;
}

/** The owner's profile form. Creates the profile on first save. Trade and region names arrive translated. */
export function TalentEditForm({ defaults, trades, regions }: { defaults: TalentFormDefaults; trades: Option[]; regions: Option[] }) {
  const [state, action, pending] = useActionState<TalentFormState, FormData>(saveTalentProfileAction, {});
  const lang = useLang();
  const all = useT("jobsClient");
  const t = all.talentForm;
  const common = new Set<string>(COMMON_TICKETS);
  const otherTickets = defaults.certifications.filter((c) => !common.has(c)).join(", ");
  const picked = new Set(defaults.certifications);
  return (
    <form action={action} className="grid gap-6 sm:grid-cols-2">
      <input type="hidden" name="lang" value={lang} />
      <Field label={t.name} htmlFor="displayName">
        <Input id="displayName" name="displayName" required minLength={2} maxLength={80} defaultValue={defaults.displayName} autoComplete="name" />
      </Field>
      <Field label={t.handle} hint="pmrfp.com/talent/…" htmlFor="handle">
        <Input id="handle" name="handle" required minLength={3} maxLength={40} defaultValue={defaults.handle} placeholder="sam-tech" />
      </Field>
      <Field label={t.headline} hint={all.optional} htmlFor="headline" className="sm:col-span-2">
        <Input id="headline" name="headline" maxLength={140} defaultValue={defaults.headline} placeholder={t.headlinePlaceholder} />
      </Field>
      <Field label={t.mainTrade} htmlFor="primaryTrade">
        <select id="primaryTrade" name="primaryTrade" required defaultValue={defaults.primaryTrade} className={SELECT}>
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
      <Field label={t.years} hint={all.optional} htmlFor="yearsExperience">
        <Input id="yearsExperience" name="yearsExperience" type="number" min={0} max={60} defaultValue={defaults.yearsExperience ?? ""} />
      </Field>
      <Field label={t.region} htmlFor="region">
        <select id="region" name="region" required defaultValue={defaults.region} className={SELECT}>
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
      <Field label={t.city} hint={all.optional} htmlFor="city">
        <Input id="city" name="city" maxLength={80} defaultValue={defaults.city} placeholder={t.cityPlaceholder} />
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-medium">{t.otherTrades}</legend>
        <details className="rounded-md border border-border p-3">
          <summary className="cursor-pointer text-sm text-muted-foreground">
            {defaults.otherTrades.length ? plural(defaults.otherTrades.length, t.picked) : t.pickUpTo}
          </summary>
          <div className="mt-3 grid max-h-64 gap-2 overflow-y-auto sm:grid-cols-2">
            {trades.map((c) => (
              <label key={c.slug} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="otherTrades" value={c.slug} defaultChecked={defaults.otherTrades.includes(c.slug)} className={CHECK} />
                {c.name}
              </label>
            ))}
          </div>
        </details>
      </fieldset>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-medium">{t.tickets}</legend>
        <div className="flex flex-wrap gap-2">
          {COMMON_TICKETS.map((k) => (
            <label key={k} className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm has-[:checked]:border-teal-500 has-[:checked]:bg-teal-50">
              <input type="checkbox" name="ticketPick" value={k} defaultChecked={picked.has(k)} className={CHECK} />
              {ticketName(k, all.tickets)}
            </label>
          ))}
        </div>
        <Input name="tickets" className="mt-3" maxLength={2000} defaultValue={otherTickets} placeholder={t.ticketsPlaceholder} />
      </fieldset>

      <Field label={t.availability} htmlFor="availability">
        <select id="availability" name="availability" required defaultValue={defaults.availability} className={SELECT}>
          {AVAILABILITY.map((a) => (
            <option key={a} value={a}>
              {all.availability[a]}
            </option>
          ))}
        </select>
      </Field>
      <Field label={t.pay} hint={all.optional} htmlFor="payExpectation">
        <Input id="payExpectation" name="payExpectation" maxLength={80} defaultValue={defaults.payExpectation} placeholder={t.payPlaceholder} />
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-medium">{t.kindOfWork}</legend>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {EMPLOYMENT_TYPES.map((e) => (
            <label key={e} className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="employmentTypes" value={e} defaultChecked={defaults.employmentTypes.includes(e)} className={CHECK} />
              {all.employment[e]}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label={t.about} hint={all.optional} htmlFor="bio" className="sm:col-span-2">
        <Textarea id="bio" name="bio" rows={5} maxLength={3000} defaultValue={defaults.bio} placeholder={t.aboutPlaceholder} />
      </Field>

      <div className="space-y-3 rounded-xl border border-border bg-secondary/40 p-4 sm:col-span-2">
        <label className="flex items-start gap-2.5 text-sm">
          <input type="checkbox" name="published" defaultChecked={defaults.published} className={`${CHECK} mt-0.5`} />
          <span>
            <span className="font-medium">{t.published}</span>
            <span className="block text-muted-foreground">{t.publishedHint}</span>
          </span>
        </label>
        <label className="flex items-start gap-2.5 text-sm">
          <input type="checkbox" name="contactVisible" defaultChecked={defaults.contactVisible} className={`${CHECK} mt-0.5`} />
          <span>
            <span className="font-medium">{t.contactVisible}</span>
            <span className="block text-muted-foreground">{t.contactVisibleHint}</span>
          </span>
        </label>
        <Field label={t.phone} hint={t.phoneHint} htmlFor="phone">
          <Input id="phone" name="phone" type="tel" maxLength={30} defaultValue={defaults.phone} autoComplete="tel" />
        </Field>
      </div>

      {state.error && <p className="text-sm text-destructive sm:col-span-2">{state.error}</p>}
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? all.saving : t.submit}
        </Button>
      </div>
    </form>
  );
}

/**
 * "Contact" on a profile, for signed-in approved companies. The message goes
 * through PMRFP; the worker's email is never shown.
 */
export function ContactTalent({ handle, firstName, left }: { handle: string; firstName: string; left: number | null }) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<{ text: string; upgrade: boolean } | null>(null);
  const lang = useLang();
  const all = useT("jobsClient");
  const t = all.contact;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/talent/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ handle, message: fd.get("message") }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        // The route answers in English; show it in the page's language.
        setError({
          text: localMessage(json.error, lang, TALENT_MESSAGES, all.errors.talent, all.somethingWrong),
          upgrade: Boolean(json.upgrade),
        });
        setState("idle");
        return;
      }
      setState("sent");
    } catch {
      setError({ text: all.somethingWrong, upgrade: false });
      setState("idle");
    }
  }

  if (state === "sent") {
    return <p className="rounded-xl border border-teal-300 bg-teal-50/60 px-4 py-3 text-sm">{fmt(t.sent, { name: firstName })}</p>;
  }
  if (left === 0) {
    return (
      <div className="space-y-2 text-sm">
        <p className="text-muted-foreground">{t.usedUp}</p>
        <Link href="/pricing" className={buttonVariants({ className: "w-full" })}>
          {t.upgrade}
        </Link>
      </div>
    );
  }
  if (!open) {
    return (
      <div className="space-y-2">
        <Button type="button" className="w-full" onClick={() => setOpen(true)}>
          <Mail className="size-4" /> {fmt(t.button, { name: firstName })}
        </Button>
        {left != null && (
          <p className="text-center text-xs text-muted-foreground">{fmt(t.left, { left, total: FREE_CONTACTS_PER_MONTH })}</p>
        )}
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="space-y-2.5">
      <Textarea name="message" rows={5} required minLength={20} maxLength={2000} placeholder={t.placeholder} />
      {error && (
        <p className="text-sm text-destructive">
          {error.text}{" "}
          {error.upgrade && (
            <Link href="/pricing" className="font-medium underline">
              {t.seeTradePro}
            </Link>
          )}
        </p>
      )}
      <div className="flex gap-2">
        <Button type="submit" className="flex-1" disabled={state === "sending"}>
          {state === "sending" ? all.sending : t.submit}
        </Button>
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          {all.cancel}
        </Button>
      </div>
      <p className="text-[11px] leading-relaxed text-muted-foreground">{t.note}</p>
    </form>
  );
}

/** An approved company vouches for someone it has worked with. */
export function EndorseTalent({ handle, firstName }: { handle: string; firstName: string }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const lang = useLang();
  const all = useT("jobsClient");
  const t = all.endorse;

  if (done) return <p className="text-sm text-muted-foreground">{fmt(t.done, { name: firstName })}</p>;
  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="text-sm font-medium text-teal-700 hover:underline">
        {fmt(t.open, { name: firstName })}
      </button>
    );
  }
  return (
    <form
      className="space-y-2.5"
      onSubmit={(e) => {
        e.preventDefault();
        const note = new FormData(e.currentTarget).get("note")?.toString() ?? "";
        setError(null);
        start(async () => {
          const res = await endorseTalentAction({ handle, note, lang });
          if (res.error) setError(res.error);
          else setDone(true);
        });
      }}
    >
      <Textarea name="note" rows={3} required minLength={10} maxLength={600} placeholder={fmt(t.placeholder, { name: firstName })} />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? all.saving : t.submit}
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => setOpen(false)}>
          {all.cancel}
        </Button>
      </div>
    </form>
  );
}
