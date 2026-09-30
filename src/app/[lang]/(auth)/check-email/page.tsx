import type { Metadata } from "next";
import Link from "@/i18n/link";
import { MailCheck } from "lucide-react";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  return { title: getDictionary(l).auth.meta.checkEmail, alternates: alternatesFor(l, "/check-email") };
}

/**
 * Post-signup landing when email confirmation is required (no session yet).
 * Without this, new signups were silently bounced to /sign-in with no
 * explanation — a dead end for invited trades.
 */
export default async function CheckEmailPage({
  searchParams, params }: {
  searchParams: Promise<{ email?: string }>;
} & { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("auth").checkEmail;
  const { email } = await searchParams;

  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
      <span className="flex size-12 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
        <MailCheck className="size-6" />
      </span>
      <h1 className="mt-4 text-2xl font-semibold tracking-tight">{t.heading}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {t.sentBefore}{email ? <>{t.sentTo}<b className="text-foreground">{email}</b></> : null}{t.sentAfter}
      </p>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        {t.spamBefore}{" "}
        <span className="font-mono">Supabase Auth</span>{t.spamAfter}
      </p>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t.confirmed}{" "}
        <Link href="/sign-in" className="font-medium text-teal-700 hover:underline">
          {t.signIn}
        </Link>
      </p>
    </div>
  );
}
