"use client";

import { useActionState, useState, useTransition } from "react";
import Link from "@/i18n/link";
import { Mail } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { endorseTalentAction, saveTalentProfileAction, type TalentFormState } from "@/lib/talent/actions";
import { EMPLOYMENT_LABEL, EMPLOYMENT_TYPES, type EmploymentType } from "@/lib/jobs/rules";
import { AVAILABILITY, AVAILABILITY_LABEL, COMMON_TICKETS, FREE_CONTACTS_PER_MONTH, type Availability } from "@/lib/talent/rules";

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

/** The owner's profile form. Creates the profile on first save. */
export function TalentEditForm({ defaults, trades, regions }: { defaults: TalentFormDefaults; trades: Option[]; regions: Option[] }) {
  const [state, action, pending] = useActionState<TalentFormState, FormData>(saveTalentProfileAction, {});
  const common = new Set<string>(COMMON_TICKETS);
  const otherTickets = defaults.certifications.filter((c) => !common.has(c)).join(", ");
  const picked = new Set(defaults.certifications);
  return (
    <form action={action} className="grid gap-6 sm:grid-cols-2">
      <Field label="Your name" htmlFor="displayName">
        <Input id="displayName" name="displayName" required minLength={2} maxLength={80} defaultValue={defaults.displayName} autoComplete="name" />
      </Field>
      <Field label="Profile address" hint="pmrfp.com/talent/…" htmlFor="handle">
        <Input id="handle" name="handle" required minLength={3} maxLength={40} defaultValue={defaults.handle} placeholder="sam-tech" />
      </Field>
      <Field label="Headline" hint="Optional" htmlFor="headline" className="sm:col-span-2">
        <Input id="headline" name="headline" maxLength={140} defaultValue={defaults.headline} placeholder="Licensed 309A electrician, commercial service and tenant fit-outs" />
      </Field>
      <Field label="Main trade" htmlFor="primaryTrade">
        <select id="primaryTrade" name="primaryTrade" required defaultValue={defaults.primaryTrade} className={SELECT}>
          <option value="" disabled>
            Pick your trade
          </option>
          {trades.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Years in the trade" hint="Optional" htmlFor="yearsExperience">
        <Input id="yearsExperience" name="yearsExperience" type="number" min={0} max={60} defaultValue={defaults.yearsExperience ?? ""} />
      </Field>
      <Field label="Region" htmlFor="region">
        <select id="region" name="region" required defaultValue={defaults.region} className={SELECT}>
          <option value="" disabled>
            Pick your region
          </option>
          {regions.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.name}
            </option>
          ))}
        </select>
      </Field>
      <Field label="City or area" hint="Optional" htmlFor="city">
        <Input id="city" name="city" maxLength={80} defaultValue={defaults.city} placeholder="Vaughan" />
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-medium">Other trades you work in</legend>
        <details className="rounded-md border border-border p-3">
          <summary className="cursor-pointer text-sm text-muted-foreground">
            {defaults.otherTrades.length ? `${defaults.otherTrades.length} picked` : "Pick up to 8 (optional)"}
          </summary>
          <div className="mt-3 grid max-h-64 gap-2 overflow-y-auto sm:grid-cols-2">
            {trades.map((t) => (
              <label key={t.slug} className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="otherTrades" value={t.slug} defaultChecked={defaults.otherTrades.includes(t.slug)} className={CHECK} />
                {t.name}
              </label>
            ))}
          </div>
        </details>
      </fieldset>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-medium">Tickets and certifications</legend>
        <div className="flex flex-wrap gap-2">
          {COMMON_TICKETS.map((t) => (
            <label key={t} className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm has-[:checked]:border-teal-500 has-[:checked]:bg-teal-50">
              <input type="checkbox" name="ticketPick" value={t} defaultChecked={picked.has(t)} className={CHECK} />
              {t}
            </label>
          ))}
        </div>
        <Input name="tickets" className="mt-3" maxLength={2000} defaultValue={otherTickets} placeholder="Others, separated by commas (e.g. 442A, Elevated Work Platform)" />
      </fieldset>

      <Field label="Availability" htmlFor="availability">
        <select id="availability" name="availability" required defaultValue={defaults.availability} className={SELECT}>
          {AVAILABILITY.map((a) => (
            <option key={a} value={a}>
              {AVAILABILITY_LABEL[a]}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Pay you're looking for" hint="Optional" htmlFor="payExpectation">
        <Input id="payExpectation" name="payExpectation" maxLength={80} defaultValue={defaults.payExpectation} placeholder="$38 an hour" />
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 text-sm font-medium">Kind of work you want</legend>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {EMPLOYMENT_TYPES.map((t) => (
            <label key={t} className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="employmentTypes" value={t} defaultChecked={defaults.employmentTypes.includes(t)} className={CHECK} />
              {EMPLOYMENT_LABEL[t]}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="About you" hint="Optional" htmlFor="bio" className="sm:col-span-2">
        <Textarea
          id="bio"
          name="bio"
          rows={5}
          maxLength={3000}
          defaultValue={defaults.bio}
          placeholder="The work you've done, the sites you've been on, what you're good at."
        />
      </Field>

      <div className="space-y-3 rounded-xl border border-border bg-secondary/40 p-4 sm:col-span-2">
        <label className="flex items-start gap-2.5 text-sm">
          <input type="checkbox" name="published" defaultChecked={defaults.published} className={`${CHECK} mt-0.5`} />
          <span>
            <span className="font-medium">Show my profile publicly</span>
            <span className="block text-muted-foreground">Turn this off to hide it from the talent directory and search.</span>
          </span>
        </label>
        <label className="flex items-start gap-2.5 text-sm">
          <input type="checkbox" name="contactVisible" defaultChecked={defaults.contactVisible} className={`${CHECK} mt-0.5`} />
          <span>
            <span className="font-medium">Show my email and phone to signed-in employers</span>
            <span className="block text-muted-foreground">
              Off by default. Employers can always message you through PMRFP without seeing your email.
            </span>
          </span>
        </label>
        <Field label="Phone" hint="Only shown if the box above is ticked" htmlFor="phone">
          <Input id="phone" name="phone" type="tel" maxLength={30} defaultValue={defaults.phone} autoComplete="tel" />
        </Field>
      </div>

      {state.error && <p className="text-sm text-destructive sm:col-span-2">{state.error}</p>}
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving…" : "Save profile"}
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
        setError({ text: json.error ?? "Something went wrong. Please try again.", upgrade: Boolean(json.upgrade) });
        setState("idle");
        return;
      }
      setState("sent");
    } catch {
      setError({ text: "Something went wrong. Please try again.", upgrade: false });
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <p className="rounded-xl border border-teal-300 bg-teal-50/60 px-4 py-3 text-sm">
        Sent. {firstName} gets your message by email and can reply to you directly.
      </p>
    );
  }
  if (left === 0) {
    return (
      <div className="space-y-2 text-sm">
        <p className="text-muted-foreground">You&apos;ve used this month&apos;s free contacts.</p>
        <Link href="/pricing" className={buttonVariants({ className: "w-full" })}>
          Upgrade to Trade Pro for unlimited
        </Link>
      </div>
    );
  }
  if (!open) {
    return (
      <div className="space-y-2">
        <Button type="button" className="w-full" onClick={() => setOpen(true)}>
          <Mail className="size-4" /> Contact {firstName}
        </Button>
        {left != null && <p className="text-center text-xs text-muted-foreground">{left} of {FREE_CONTACTS_PER_MONTH} free contacts left this month</p>}
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="space-y-2.5">
      <Textarea
        name="message"
        rows={5}
        required
        minLength={20}
        maxLength={2000}
        placeholder="The job, where it is, the pay, and how to reach you."
      />
      {error && (
        <p className="text-sm text-destructive">
          {error.text}{" "}
          {error.upgrade && (
            <Link href="/pricing" className="font-medium underline">
              See Trade Pro
            </Link>
          )}
        </p>
      )}
      <div className="flex gap-2">
        <Button type="submit" className="flex-1" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send message"}
        </Button>
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
      <p className="text-[11px] leading-relaxed text-muted-foreground">Sent by PMRFP. Replies come to your email.</p>
    </form>
  );
}

/** An approved company vouches for someone it has worked with. */
export function EndorseTalent({ handle, firstName }: { handle: string; firstName: string }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  if (done) return <p className="text-sm text-muted-foreground">Thanks. Your endorsement is on {firstName}&apos;s profile.</p>;
  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="text-sm font-medium text-teal-700 hover:underline">
        Worked with {firstName}? Endorse them
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
          const res = await endorseTalentAction({ handle, note });
          if (res.error) setError(res.error);
          else setDone(true);
        });
      }}
    >
      <Textarea name="note" rows={3} required minLength={10} maxLength={600} placeholder={`What was ${firstName} like to work with?`} />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "Saving…" : "Post endorsement"}
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
