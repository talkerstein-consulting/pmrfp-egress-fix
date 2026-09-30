import type { Metadata } from "next";
import Link from "@/i18n/link";
import { ForgotPasswordForm } from "@/components/forms/auth-forms";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  return { title: getDictionary(l).auth.meta.forgotPassword, alternates: alternatesFor(l, "/forgot-password") };
}

export default async function ForgotPasswordPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("auth").forgotPassword;
  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">{t.heading}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {t.intro}
      </p>
      <div className="mt-6">
        <ForgotPasswordForm />
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/sign-in" className="font-medium text-teal-700 hover:underline">
          {t.back}
        </Link>
      </p>
    </div>
  );
}
