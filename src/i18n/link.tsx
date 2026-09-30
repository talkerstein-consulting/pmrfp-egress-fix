"use client";

import NextLink from "next/link";
import { useParams } from "next/navigation";
import type { ComponentProps } from "react";
import { DEFAULT_LOCALE, hasLocale, localizePath } from "./config";

/**
 * Drop-in for next/link that keeps the visitor's language: on /fr pages,
 * href="/rfps" becomes /fr/rfps. English, external and file links pass through.
 */
export default function Link({ href, ...rest }: ComponentProps<typeof NextLink>) {
  const params = useParams();
  const lang = hasLocale(params?.lang) ? params.lang : DEFAULT_LOCALE;
  const localized =
    typeof href === "string"
      ? localizePath(href, lang)
      : href && typeof href === "object" && typeof href.pathname === "string"
        ? { ...href, pathname: localizePath(href.pathname, lang) }
        : href;
  return <NextLink href={localized} {...rest} />;
}
