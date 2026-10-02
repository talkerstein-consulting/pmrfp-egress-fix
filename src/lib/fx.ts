import { USD_PER_CAD } from "@/lib/markets";

/**
 * Today's CAD → USD rate from the Bank of Canada (free, official, published
 * every business day). Used to show U.S. visitors prices in U.S. dollars.
 * Display only: billing stays in CAD until USD Stripe prices exist.
 */
export interface FxRate {
  usdPerCad: number;
  /** Bank of Canada observation date, or null on the fallback rate. */
  date: string | null;
  source: "boc" | "fallback";
}

const BOC_URL = "https://www.bankofcanada.ca/valet/observations/FXUSDCAD/json?recent=1";

/** The Valet API gives CAD per USD ("FXUSDCAD": 1.39); flip it to USD per CAD. */
export function parseBocRate(json: unknown): { usdPerCad: number; date: string } | null {
  const obs = (json as { observations?: { d?: string; FXUSDCAD?: { v?: string } }[] })?.observations?.at(-1);
  const cadPerUsd = Number(obs?.FXUSDCAD?.v);
  if (!obs?.d || !Number.isFinite(cadPerUsd) || cadPerUsd < 0.8 || cadPerUsd > 2.5) return null;
  return { usdPerCad: Math.round((1 / cadPerUsd) * 10000) / 10000, date: obs.d };
}

export async function getUsdPerCad(): Promise<FxRate> {
  try {
    const res = await fetch(BOC_URL, { next: { revalidate: 43200 } });
    if (res.ok) {
      const parsed = parseBocRate(await res.json());
      if (parsed) return { ...parsed, source: "boc" };
    }
  } catch {
    // Fall through to the fixed rate; a price hint never breaks a page.
  }
  return { usdPerCad: USD_PER_CAD, date: null, source: "fallback" };
}
