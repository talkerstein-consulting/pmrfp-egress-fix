"use client";

import type { ReactNode } from "react";
import { useVisitorMarket } from "./use-visitor-market";

/**
 * Renders `ca` (the default every crawler and first paint sees), and swaps to
 * `us` in the U.S. market: visitors browsing from the United States, or anyone
 * who picked "US" in the header. Both are server-rendered props, so this adds
 * no data fetching on the client.
 */
export function ByMarket({ ca, us }: { ca: ReactNode; us?: ReactNode }) {
  const market = useVisitorMarket();
  return <>{market === "US" && us ? us : ca}</>;
}
