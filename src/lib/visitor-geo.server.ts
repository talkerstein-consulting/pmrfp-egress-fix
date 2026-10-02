import { cookies, headers } from "next/headers";
import { GEO_COOKIE, MARKET_COOKIE, geoFrom, parseGeoCookie, parseMarketCookie, visitorMarket, type MarketCode, type VisitorGeo } from "@/lib/visitor-geo";

/** The visitor's location in a dynamic server render: Vercel's headers, else the proxy's cookie. */
export async function getVisitorGeo(): Promise<VisitorGeo> {
  const h = await headers();
  const country = h.get("x-vercel-ip-country");
  if (country) return geoFrom(country, h.get("x-vercel-ip-country-region"));
  return parseGeoCookie((await cookies()).get(GEO_COOKIE)?.value);
}

/** "US" or "CA": the visitor's pick from the header switch, else where they browse from. */
export async function getVisitorMarket(): Promise<MarketCode> {
  const picked = parseMarketCookie((await cookies()).get(MARKET_COOKIE)?.value);
  return picked ?? visitorMarket(await getVisitorGeo());
}
