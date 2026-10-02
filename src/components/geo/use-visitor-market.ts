"use client";

import { useEffect, useState } from "react";
import { USD_PER_CAD } from "@/lib/markets";
import {
  GEO_COOKIE,
  MARKET_COOKIE,
  parseGeoCookie,
  parseMarketCookie,
  visitorMarket,
  type MarketCode,
} from "@/lib/visitor-geo";

/** Fired after the header switch changes market, so every price and list on the page follows. */
export const MARKET_EVENT = "pmrfp-market";

function cookie(name: string): string | null {
  const raw = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`))?.split("=")[1];
  return raw ? decodeURIComponent(raw) : null;
}

/** The visitor's pick from the switch, else their location (Canada by default). */
export function readMarket(): MarketCode {
  return parseMarketCookie(cookie(MARKET_COOKIE)) ?? visitorMarket(parseGeoCookie(cookie(GEO_COOKIE)));
}

export function setMarket(market: MarketCode) {
  document.cookie = `${MARKET_COOKIE}=${market}; path=/; max-age=31536000; samesite=lax`;
  window.dispatchEvent(new Event(MARKET_EVENT));
}

/** Null during the server render and first paint (cached pages show Canada), then the real market. */
export function useVisitorMarket(): MarketCode | null {
  const [market, setMarketState] = useState<MarketCode | null>(null);
  useEffect(() => {
    const sync = () => setMarketState(readMarket());
    // Cookies are only readable after mount; this is the external-system sync.
    sync();
    window.addEventListener(MARKET_EVENT, sync);
    return () => window.removeEventListener(MARKET_EVENT, sync);
  }, []);
  return market;
}

let rate: number | null = null;
let pending: Promise<number> | null = null;

/** Today's USD-per-CAD rate (from /api/fx), fetched once per page; the fixed rate until it lands. */
export function useUsdPerCad(): number {
  const [value, setValue] = useState(rate ?? USD_PER_CAD);
  useEffect(() => {
    if (rate) return;
    pending ??= fetch("/api/fx")
      .then((r) => r.json())
      .then((j: { usdPerCad?: unknown }) => (rate = typeof j.usdPerCad === "number" ? j.usdPerCad : USD_PER_CAD))
      .catch(() => USD_PER_CAD);
    let live = true;
    pending.then((v) => live && setValue(v));
    return () => {
      live = false;
    };
  }, []);
  return value;
}
