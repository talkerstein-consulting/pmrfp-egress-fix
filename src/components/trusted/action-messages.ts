"use client";

import { useT } from "@/i18n/provider";
import { fmt } from "@/i18n/format";
import type { ClientMessages } from "@/i18n/dictionaries";
import { FREE_LIMIT } from "@/lib/trusted/rules";

/**
 * lib/trusted/actions answers in English. Known messages are shown from
 * partnersClient.trustedActions; anything else as-is. Keys here must match
 * the action's strings exactly.
 */
const ACTION_MESSAGE_KEYS: Record<string, keyof ClientMessages["partnersClient"]["trustedActions"]> = {
  "Sign in to save trades to your page.": "signIn",
  "Trusted-trades pages are for realtors and property managers.": "roles",
  "This isn't available right now.": "unavailable",
  "Trusted-trades pages aren't switched on yet. Try again soon.": "notSwitchedOn",
  "Could not create your page. Please try again.": "createFailed",
  "Unknown company.": "unknownCompany",
  "That company isn't listed in the directory.": "notListed",
  [`A free page holds ${FREE_LIMIT} trades. Realtor Pro makes it unlimited.`]: "limit",
  "Could not save that company. Please try again.": "saveFailed",
  "Save a trade first.": "saveFirst",
  "Could not save the note.": "noteFailed",
  "Pick a link of at least 3 characters.": "handleShort",
  "Add your name.": "nameShort",
  "That email doesn't look right.": "emailInvalid",
  "Please check the form.": "checkForm",
  "Use 3 to 40 letters, numbers or dashes for your link.": "handleInvalid",
  "That link is taken. Try another.": "handleTaken",
  "Could not save your page.": "pageFailed",
  "Saved.": "saved",
};

/** const say = useTrustedActionMessage(); toast.error(say(res.error)) */
export function useTrustedActionMessage() {
  const t = useT("partnersClient").trustedActions;
  return (message: string) => {
    const key = ACTION_MESSAGE_KEYS[message];
    return key ? fmt(t[key], { limit: FREE_LIMIT }) : message;
  };
}
