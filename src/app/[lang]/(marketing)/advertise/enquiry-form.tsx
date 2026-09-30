"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SPONSOR_PACKAGES, cad } from "@/components/advertise/packages";
import { useLang, useT } from "@/i18n/provider";
import { fmt } from "@/i18n/format";
import type { ClientMessages } from "@/i18n/dictionaries";
import { submitSponsorEnquiry, type SponsorEnquiryState } from "./actions";

const CHOICE_VALUES = [...SPONSOR_PACKAGES.map((p) => p.id as string), "unsure"];

const choice = (v: string | null | undefined) => (CHOICE_VALUES.includes(v ?? "") ? (v as string) : "unsure");

/**
 * submitSponsorEnquiry (./actions) answers in English. Known messages are
 * shown from partnersClient.enquiry.actions; anything else as-is.
 */
const ACTION_MESSAGE_KEYS: Record<string, keyof ClientMessages["partnersClient"]["enquiry"]["actions"]> = {
  "Thanks. We'll be in touch.": "honeypot",
  "Too many submissions. Please wait a minute and try again.": "rateLimited",
  "Your name is required": "nameRequired",
  "Enter a valid work email": "emailInvalid",
  "Your company name is required": "companyRequired",
  "Please fill in the required fields.": "incomplete",
  "Thanks. We'll email you with the trades that are open, and a sample of your placement.": "success",
};

/**
 * The package cards link to /advertise?package=<id>#enquire; this picks the
 * package from the URL. Uses useSearchParams, so render it inside <Suspense>
 * with <SponsorEnquiryForm /> as the fallback.
 */
export function SponsorEnquiryFromUrl() {
  return <SponsorEnquiryForm initialPackage={useSearchParams().get("package")} />;
}

export function SponsorEnquiryForm({ initialPackage = null }: { initialPackage?: string | null }) {
  const [state, action, pending] = useActionState(submitSponsorEnquiry, {} as SponsorEnquiryState);
  const pc = useT("partnersClient");
  const t = pc.enquiry;
  const lang = useLang();
  const say = (m: string) => {
    const key = ACTION_MESSAGE_KEYS[m];
    return (key && t.actions[key]) || m;
  };
  const choices = [
    ...SPONSOR_PACKAGES.map((p) => ({
      value: p.id as string,
      label: fmt(t.choice, { name: pc.packages[p.id].name, price: cad(p.monthly, lang) }),
    })),
    { value: "unsure", label: t.unsure },
  ];

  if (state.success) {
    return (
      <div role="status" className="flex gap-3 rounded-xl border border-teal-300 bg-teal-50 p-5">
        <CircleCheck className="mt-0.5 size-5 shrink-0 text-teal-600" />
        <div>
          <p className="font-semibold text-foreground">{t.sent}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{say(state.success)}</p>
        </div>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {say(state.error)}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="sponsor-name" label={t.name} req>
          <Input id="sponsor-name" name="name" required maxLength={120} autoComplete="name" className="h-10" />
        </Field>
        <Field id="sponsor-email" label={t.email} req>
          <Input id="sponsor-email" name="email" type="email" required autoComplete="email" className="h-10" />
        </Field>
        <Field id="sponsor-company" label={t.company} req>
          <Input id="sponsor-company" name="company" required maxLength={160} autoComplete="organization" className="h-10" />
        </Field>
        <Field id="sponsor-website" label={t.website} optional={t.optional}>
          <Input
            id="sponsor-website"
            name="website"
            inputMode="url"
            maxLength={300}
            autoComplete="url"
            placeholder={t.websitePlaceholder}
            className="h-10"
          />
        </Field>
        <Field id="sponsor-package" label={t.package}>
          {/* Keyed on the URL's package so a later package click re-selects it
              without clearing what's already typed in the other fields. */}
          <select
            key={initialPackage ?? "none"}
            id="sponsor-package"
            name="package"
            defaultValue={choice(initialPackage)}
            className="h-10 w-full rounded-lg border border-input bg-transparent px-2.5 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
          >
            {choices.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id="sponsor-phone" label={t.phone} optional={t.optional}>
          <Input id="sponsor-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className="h-10" />
        </Field>
      </div>
      <Field id="sponsor-focus" label={t.focus} optional={t.optional}>
        <Input
          id="sponsor-focus"
          name="focus"
          maxLength={300}
          placeholder={t.focusPlaceholder}
          className="h-10"
        />
      </Field>
      <Field id="sponsor-message" label={t.message} optional={t.optional}>
        <Textarea
          id="sponsor-message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder={t.messagePlaceholder}
        />
      </Field>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
        {pending ? t.sending : t.submit}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  req,
  optional,
  children,
}: {
  id: string;
  label: string;
  req?: boolean;
  /** The "(optional)" label, when the field is optional. */
  optional?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5">
        {label}
        {req && <span className="text-red-600">*</span>}
        {optional && <span className="font-normal text-muted-foreground">{optional}</span>}
      </Label>
      {children}
    </div>
  );
}
