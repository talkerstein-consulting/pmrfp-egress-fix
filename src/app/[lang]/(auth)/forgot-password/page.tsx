import type { Metadata } from "next";
import Link from "@/i18n/link";
import { ForgotPasswordForm } from "@/components/forms/auth-forms";
import { setLangFrom } from "@/i18n/server";

export const metadata: Metadata = { title: "Reset your password" };

export default async function ForgotPasswordPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">Reset your password</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        We&apos;ll email you a link to set a new password.
      </p>
      <div className="mt-6">
        <ForgotPasswordForm />
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        <Link href="/sign-in" className="font-medium text-teal-700 hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
