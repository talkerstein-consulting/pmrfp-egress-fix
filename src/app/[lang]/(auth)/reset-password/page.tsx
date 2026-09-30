import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/forms/auth-forms";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  return { title: getDictionary(l).auth.meta.resetPassword, alternates: alternatesFor(l, "/reset-password") };
}

export default async function ResetPasswordPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("auth").resetPassword;
  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">{t.heading}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t.intro}</p>
      <div className="mt-6">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
