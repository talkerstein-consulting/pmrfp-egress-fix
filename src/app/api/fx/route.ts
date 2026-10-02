import { NextResponse } from "next/server";
import { getUsdPerCad } from "@/lib/fx";

/** Today's CAD → USD rate for client price components (cached ~12h). */
export const revalidate = 43200;

export async function GET() {
  return NextResponse.json(await getUsdPerCad(), {
    headers: { "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400" },
  });
}
