"use client";

import { useActionState, useState, useTransition } from "react";
import Link from "@/i18n/link";
import { Check, Copy, ExternalLink, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  toggleTrustedTradeAction,
  updateTrustedNoteAction,
  updateTrustedPageAction,
  type PageFormState,
} from "@/lib/trusted/actions";
import { useT } from "@/i18n/provider";
import { fmt } from "@/i18n/format";
import { useTrustedActionMessage } from "./action-messages";

/** The public link with Copy and View buttons. */
export function ShareLink({ url, path }: { url: string; path: string }) {
  const t = useT("partnersClient").editor;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error(t.copyFailed);
    }
  };
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <code className="min-w-0 flex-1 truncate rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm">{url}</code>
      <div className="flex gap-2">
        <Button type="button" onClick={copy} className="flex-1 sm:flex-none">
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} {copied ? t.copied : t.copyLink}
        </Button>
        <Link href={path} target="_blank" className={buttonVariants({ variant: "outline", className: "flex-1 sm:flex-none" })}>
          <ExternalLink className="size-4" /> {t.view}
        </Link>
      </div>
    </div>
  );
}

/** One saved trade: name, the owner's note (saved on blur), remove. */
export function TrustedTradeRow({
  organizationId,
  name,
  slug,
  detail,
  note,
}: {
  organizationId: string;
  name: string;
  slug: string;
  detail: string;
  note: string | null;
}) {
  const t = useT("partnersClient").editor;
  const say = useTrustedActionMessage();
  const [value, setValue] = useState(note ?? "");
  const [saved, setSaved] = useState(note ?? "");
  const [removed, setRemoved] = useState(false);
  const [pending, start] = useTransition();
  if (removed) return null;

  const saveNote = () => {
    if (value.trim() === saved.trim()) return;
    start(async () => {
      const res = await updateTrustedNoteAction(organizationId, value);
      if (res.error) toast.error(say(res.error));
      else {
        setSaved(value);
        toast.success(t.noteSaved);
      }
    });
  };
  const remove = () =>
    start(async () => {
      const res = await toggleTrustedTradeAction(organizationId);
      if (res.error) toast.error(say(res.error));
      else setRemoved(true);
    });

  return (
    <li className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={`/directory/${slug}`} className="font-semibold hover:text-teal-700">
            {name}
          </Link>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{detail}</p>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={remove} disabled={pending} aria-label={fmt(t.remove, { name })}>
          <Trash2 className="size-4" />
        </Button>
      </div>
      <Input
        className="mt-3"
        value={value}
        maxLength={280}
        placeholder={t.notePlaceholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={saveNote}
      />
    </li>
  );
}

/** Link, name, brokerage and headline; contact details unlock with Realtor Pro. */
export function TrustedPageForm({
  defaults,
  pro,
}: {
  defaults: {
    handle: string;
    displayName: string;
    brokerage: string;
    headline: string;
    contactPhone: string;
    contactEmail: string;
    published: boolean;
  };
  pro: boolean;
}) {
  const t = useT("partnersClient").editor;
  const say = useTrustedActionMessage();
  const [state, action, pending] = useActionState<PageFormState, FormData>(updateTrustedPageAction, {});
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2">
      <Field label={t.link} hint={t.linkHint} className="sm:col-span-2">
        <Input name="handle" defaultValue={defaults.handle} required minLength={3} maxLength={40} />
      </Field>
      <Field label={t.yourName}>
        <Input name="displayName" defaultValue={defaults.displayName} required maxLength={80} />
      </Field>
      <Field label={t.brokerage}>
        <Input name="brokerage" defaultValue={defaults.brokerage} maxLength={80} />
      </Field>
      <Field label={t.headline} className="sm:col-span-2">
        <Input
          name="headline"
          defaultValue={defaults.headline}
          maxLength={160}
          placeholder={t.headlinePlaceholder}
        />
      </Field>
      <Field label={t.phone} hint={pro ? undefined : t.proHint}>
        <Input name="contactPhone" defaultValue={defaults.contactPhone} maxLength={30} disabled={!pro} />
      </Field>
      <Field label={t.email} hint={pro ? undefined : t.proHint}>
        <Input name="contactEmail" type="email" defaultValue={defaults.contactEmail} maxLength={120} disabled={!pro} />
      </Field>
      <label className="flex items-center gap-2 text-sm sm:col-span-2">
        <input type="checkbox" name="published" defaultChecked={defaults.published} className="size-4 accent-[var(--color-indigo)]" />
        {t.public}
      </label>
      <div className="flex items-center gap-3 sm:col-span-2">
        <Button type="submit" disabled={pending}>
          {pending ? t.saving : t.save}
        </Button>
        {state.error && <p className="text-sm text-destructive">{say(state.error)}</p>}
        {state.success && <p className="text-sm text-teal-700">{say(state.success)}</p>}
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
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
