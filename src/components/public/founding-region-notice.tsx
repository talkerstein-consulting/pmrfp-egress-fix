"use client";

/**
 * Founding-region notice + inline waitlist capture.
 *
 * Shown wherever a region has insufficient liquidity (RFP board, directory,
 * region page, post-RFP confirmation) so demand is captured honestly instead of
 * dropped into an empty marketplace. Embeds the regional waitlist form, which
 * calls joinRegionalWaitlistAction (persists now; GHL lights up later).
 */
import { useActionState } from "react";
import Link from "@/i18n/link";
import { joinRegionalWaitlistAction, type WaitlistActionState } from "@/lib/waitlist/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang, useT } from "@/i18n/provider";
import { fmt } from "@/i18n/format";
import { regionName as regionLabel } from "@/i18n/terms";
import type { ClientMessages } from "@/i18n/dictionaries";

export type WaitlistReason =
  | "founding_region_rfp"
  | "no_supply_directory"
  | "region_request"
  | "early_access";

interface NoticeCopy {
  eyebrow: string;
  title: string;
  body: string;
}

type FoundingCopy = ClientMessages["directoryClient"]["founding"];

function copyFor(regionName: string, reason: WaitlistReason, t: FoundingCopy): NoticeCopy {
  const v = { region: regionName };
  switch (reason) {
    case "region_request":
      return { eyebrow: t.eyebrow, title: fmt(t.requestTitle, v), body: fmt(t.requestBody, v) };
    case "no_supply_directory":
      return { eyebrow: t.eyebrow, title: fmt(t.directoryTitle, v), body: fmt(t.directoryBody, v) };
    case "founding_region_rfp":
      return { eyebrow: t.eyebrow, title: fmt(t.rfpTitle, v), body: fmt(t.rfpBody, v) };
    default:
      return { eyebrow: t.earlyEyebrow, title: fmt(t.earlyTitle, v), body: fmt(t.earlyBody, v) };
  }
}

export interface FoundingRegionNoticeProps {
  regionName: string;
  regionSlug?: string;
  reason?: WaitlistReason;
  role?: string;
  requestedRegionText?: string;
  province?: string;
  country?: string;
  /** Show the "know a trade here? refer them" CTA (default true). */
  showReferralCta?: boolean;
  className?: string;
}

export function FoundingRegionNotice({
  regionName,
  regionSlug,
  reason = "no_supply_directory",
  role,
  requestedRegionText,
  province,
  country,
  showReferralCta = true,
  className,
}: FoundingRegionNoticeProps) {
  const t = useT("directoryClient").founding;
  const lang = useLang();
  // Region names arrive in English from the database; unknown names pass through.
  const region = regionLabel(regionName, lang);
  const c = copyFor(region, reason, t);
  return (
    <div
      className={`rounded-2xl border border-teal-300 bg-teal-100/30 p-6 sm:p-8 ${className ?? ""}`}
    >
      <p className="font-mono text-[12.5px] uppercase tracking-[0.18em] text-teal-ink">
        {c.eyebrow}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-foreground">{c.title}</h3>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-foreground/80">{c.body}</p>

      <div className="mt-5">
        <RegionalWaitlistForm
          regionSlug={regionSlug}
          role={role}
          reason={reason}
          requestedRegionText={requestedRegionText}
          province={province}
          country={country}
        />
      </div>

      {showReferralCta && (
        <p className="mt-4 text-sm text-foreground/75">
          {fmt(t.referBefore, { region })}{" "}
          <Link
            href="/refer-a-trade"
            className="font-medium text-teal-ink underline underline-offset-2"
          >
            {t.referLink}
          </Link>{" "}
          {t.referAfter}
        </p>
      )}
    </div>
  );
}

export interface RegionalWaitlistFormProps {
  regionSlug?: string;
  role?: string;
  reason?: WaitlistReason;
  requestedRegionText?: string;
  province?: string;
  country?: string;
  buttonLabel?: string;
}

/** The server action answers in English; other languages show their own copy. */
const SERVER_ERRORS: Record<string, "rateLimit" | "invalidEmail" | "failed"> = {
  "Too many submissions. Please wait a minute and try again.": "rateLimit",
  "Enter a valid email": "invalidEmail",
  "Please enter a valid email.": "invalidEmail",
  "Something went wrong saving your spot. Please try again.": "failed",
};

export function RegionalWaitlistForm({
  regionSlug,
  role,
  reason = "early_access",
  requestedRegionText,
  province,
  country,
  buttonLabel,
}: RegionalWaitlistFormProps) {
  const t = useT("directoryClient").waitlist;
  const lang = useLang();
  const [state, action, pending] = useActionState(
    joinRegionalWaitlistAction,
    {} as WaitlistActionState,
  );

  if (state.success) {
    return (
      <p className="rounded-md bg-teal-100/60 px-3 py-2 text-sm font-medium text-teal-ink">
        {lang === "en" ? state.success : t.success}
      </p>
    );
  }

  const errKey = state.error ? SERVER_ERRORS[state.error] : undefined;
  const error = lang !== "en" && errKey ? t.errors[errKey] : state.error;

  return (
    <form action={action} className="space-y-2">
      {/* Honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      {regionSlug && <input type="hidden" name="regionSlug" value={regionSlug} />}
      {role && <input type="hidden" name="role" value={role} />}
      <input type="hidden" name="reason" value={reason} />
      {requestedRegionText && (
        <input type="hidden" name="requestedRegionText" value={requestedRegionText} />
      )}
      {province && <input type="hidden" name="province" value={province} />}
      {country && <input type="hidden" name="country" value={country} />}

      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          name="email"
          type="email"
          required
          aria-label={t.emailLabel}
          placeholder={t.placeholder}
          className="sm:max-w-xs"
        />
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? t.adding : buttonLabel ?? t.join}
        </Button>
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-700">{error}</p>
      )}
    </form>
  );
}
