"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useT } from "@/i18n/provider";
import { fmt } from "@/i18n/format";
import type { ClientMessages } from "@/i18n/dictionaries";

/**
 * /api/trusted/quote answers in English. Known messages are shown from
 * partnersClient.quote.actions; anything else as-is.
 */
const API_MESSAGE_KEYS: Record<string, keyof ClientMessages["partnersClient"]["quote"]["actions"]> = {
  "Add your name.": "nameRequired",
  "That email doesn't look right.": "emailInvalid",
  "Tell them a little about the job.": "messageShort",
  "Please check the form.": "checkForm",
  "This isn't available right now.": "unavailable",
  "That page isn't available.": "pageUnavailable",
  "That company isn't on this page.": "notOnPage",
  "Too many requests. Please slow down.": "rateLimited",
};

/**
 * "Request a quote" under a trade on a realtor's trusted-trades page. Goes
 * straight to the trade, with the realtor copied (see /api/trusted/quote).
 */
export function QuoteRequest({
  handle,
  organizationId,
  tradeName,
  recommender,
}: {
  handle: string;
  organizationId: string;
  tradeName: string;
  recommender: string;
}) {
  const t = useT("partnersClient").quote;
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/trusted/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle,
          organizationId,
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone") ?? "",
          message: fd.get("message"),
          company_website: fd.get("company_website") ?? "",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const key = typeof json.error === "string" ? API_MESSAGE_KEYS[json.error] : undefined;
        throw new Error((key && t.actions[key]) || json.error || t.error);
      }
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.error);
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <p className="rounded-xl border border-teal-300 bg-teal-50/60 px-4 py-3 text-sm">
        {fmt(t.sent, { trade: tradeName, recommender })}
      </p>
    );
  }

  if (!open) {
    return (
      <Button type="button" variant="outline" className="w-full" onClick={() => setOpen(true)}>
        <MessageSquare className="size-4" /> {t.open}
      </Button>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2.5 rounded-xl border border-border bg-card p-4">
      <p className="text-sm font-semibold">{fmt(t.title, { trade: tradeName })}</p>
      <Input name="name" placeholder={t.name} required maxLength={80} />
      <Input name="email" type="email" placeholder={t.email} required maxLength={120} />
      <Input name="phone" type="tel" placeholder={t.phone} maxLength={30} />
      <Textarea name="message" placeholder={t.message} rows={3} required minLength={10} maxLength={2000} />
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" className="flex-1" disabled={state === "sending"}>
          {state === "sending" ? t.sending : t.submit}
        </Button>
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          {t.cancel}
        </Button>
      </div>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        {fmt(t.privacy, { trade: tradeName, recommender })}
      </p>
    </form>
  );
}
