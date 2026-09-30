"use client";

import { useState } from "react";
import { toast } from "sonner";
import { FileSignature } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLang, useT } from "@/i18n/provider";
import { fmt } from "@/i18n/format";
import { portalName } from "@/lib/gc/packages";

/**
 * "Need help bidding on this?" — shown on open public tenders. Most small
 * trades have never bid on a government tender (supplier registration, the
 * bid forms, the evaluation grid), so this offers a free call with our bid
 * support affiliate. Leads go to /api/bid-help → admin email + GHL.
 * `portal` arrives in English (lib/tenders/sources.ts); portalName() shows it in the visitor's language.
 */
export function BidHelpCard({
  rfpSlug,
  rfpTitle,
  trade,
  portal,
}: {
  rfpSlug: string;
  rfpTitle: string;
  trade?: string;
  portal: string;
}) {
  const t = useT("sharedClient").bidHelp;
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      const res = await fetch("/api/bid-help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone") || undefined,
          company: fd.get("company") || undefined,
          message: fd.get("message") || undefined,
          rfpSlug,
          rfpTitle,
          trade,
          company_website: fd.get("company_website") ?? "",
        }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      toast.error(t.error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-xl border border-indigo/20 bg-card p-5">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-indigo text-teal-300">
          <FileSignature className="size-4.5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-semibold">{t.title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {fmt(t.body, { portal: portalName(portal, lang) })}
          </p>
        </div>
      </div>

      {done ? (
        <p className="mt-4 rounded-md bg-teal-50 px-3 py-2 text-sm text-teal-800">
          {t.done}
        </p>
      ) : !open ? (
        <Button className="mt-4" onClick={() => setOpen(true)}>
          {t.open}
        </Button>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input name="name" placeholder={t.name} required autoComplete="name" />
            <Input name="email" type="email" placeholder={t.email} required autoComplete="email" />
            <Input name="phone" type="tel" placeholder={t.phone} autoComplete="tel" />
            <Input name="company" placeholder={t.company} autoComplete="organization" />
          </div>
          <Textarea
            name="message"
            rows={2}
            placeholder={t.message}
          />
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
          <Button type="submit" disabled={submitting}>
            {submitting ? t.sending : t.submit}
          </Button>
        </form>
      )}
      <p className="mt-3 text-xs text-muted-foreground">
        {t.disclaimer}
      </p>
    </div>
  );
}
