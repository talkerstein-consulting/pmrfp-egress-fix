"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useLang, useT } from "@/i18n/provider";

export function ExpressInterestDialog({
  rfpId,
  rfpTitle,
}: {
  rfpId: string;
  rfpTitle: string;
}) {
  const t = useT("boardClient").interest;
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!accepted) {
      toast.error(t.mustAccept);
      return;
    }
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    try {
      const res = await fetch("/api/rfp-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rfpId,
          message: fd.get("message"),
          relevantExperience: fd.get("relevantExperience") || undefined,
          availability: fd.get("availability") || undefined,
          acceptDisclaimer: true,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 403) return toast.error(t.proRequired);
      if (res.status === 401) return toast.error(t.signIn);
      // The API's message is English; other languages use their own copy.
      if (res.status === 409) return toast.error(lang === "en" ? (json.error ?? t.already) : t.already);
      if (!res.ok) throw new Error();
      setDone(true);
      toast.success(t.submitted, {
        description: json.demo ? t.demo : t.notified,
      });
    } catch {
      toast.error(t.error);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button><Send className="size-4" /> {t.trigger}</Button>} />
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>{rfpTitle}</DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="py-4">
            <p className="font-medium text-success">{t.doneTitle}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t.doneBody}
            </p>
            <DialogFooter className="mt-6">
              <Button onClick={() => setOpen(false)}>{t.close}</Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <Field label={t.message} hint={t.messageHint}>
              <Textarea name="message" rows={4} required maxLength={2000} />
            </Field>
            <Field label={t.experience}>
              <Textarea name="relevantExperience" rows={2} maxLength={2000} />
            </Field>
            <Field label={t.availability}>
              <Input name="availability" />
            </Field>
            <label className="flex items-start gap-2 text-sm text-muted-foreground">
              <Checkbox checked={accepted} onCheckedChange={(v) => setAccepted(v === true)} className="mt-0.5" />
              <span>{t.disclaimer}</span>
            </label>
            <DialogFooter>
              <Button type="submit" disabled={busy}>
                {busy ? t.submitting : t.submit}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium">{label}</span>
      {hint && <span className="mb-1 block text-xs text-muted-foreground">{hint}</span>}
      {children}
    </label>
  );
}
