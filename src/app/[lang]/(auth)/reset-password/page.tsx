import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/forms/auth-forms";
import { setLangFrom } from "@/i18n/server";

export const metadata: Metadata = { title: "Set a new password" };

export default async function ResetPasswordPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  return (
    <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
      <h1 className="text-2xl font-semibold tracking-tight">Set a new password</h1>
      <p className="mt-1 text-sm text-muted-foreground">Choose a strong password for your account.</p>
      <div className="mt-6">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
