"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/provider";
import { fmt } from "@/i18n/format";

export function RequestIntroForm({
  vendorSlug,
  vendorName,
}: {
  vendorSlug: string;
  vendorName: string;
}) {
  const t = useT("directoryClient").intro;
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "directory_intro",
          name: fd.get("name"),
          email: fd.get("email"),
          // Internal default for the ops inbox, not shown to the visitor.
          message: fd.get("message") || `Introduction request for ${vendorName}.`,
          targetOrganizationId: vendorSlug,
          company_website: fd.get("company_website") ?? "",
        }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
      toast.success(t.sentTitle, { description: fmt(t.sentBody, { name: vendorName }) });
    } catch {
      toast.error(t.error);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return <p className="text-sm text-success">{t.done}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input name="name" placeholder={t.name} required />
      <Input name="email" type="email" placeholder={t.email} required />
      <Textarea name="message" placeholder={fmt(t.message, { name: vendorName })} rows={3} />
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? t.sending : t.submit}
      </Button>
    </form>
  );
}
