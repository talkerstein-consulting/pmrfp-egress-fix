"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useT } from "@/i18n/provider";

export function ContactForm() {
  const t = useT("miscClient").contactForm;
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [requestType, setRequestType] = useState("general_contact");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType,
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone") || undefined,
          organization: fd.get("organization") || undefined,
          message: fd.get("message"),
          company_website: fd.get("company_website") ?? "",
        }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
      toast.success(t.sent);
    } catch {
      toast.error(t.failed);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <p className="font-medium text-success">{t.doneTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t.doneBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t.name}><Input name="name" required /></Field>
        <Field label={t.email}><Input name="email" type="email" required /></Field>
        <Field label={t.phone}><Input name="phone" /></Field>
        <Field label={t.organization}><Input name="organization" /></Field>
      </div>
      <Field label={t.reachingAs}>
        <Select value={requestType} onValueChange={(v) => setRequestType(v ?? "general_contact")}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="general_contact">{t.types.general_contact}</SelectItem>
            <SelectItem value="property_manager_help">{t.types.property_manager_help}</SelectItem>
            <SelectItem value="vendor_question">{t.types.vendor_question}</SelectItem>
          </SelectContent>
        </Select>
      </Field>
      <Field label={t.message}><Textarea name="message" rows={5} required /></Field>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? t.sending : t.send}
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow mb-1 block text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
