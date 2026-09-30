/**
 * Small, restrained social-proof strip. Three numbers, neutral type, no icons.
 * Designed to sit under hero copy on /, /rfps, /pricing without screaming.
 *
 * Reference treatment: stripe.com/atlas alumni page, linear.app stats row.
 * Visual story: typography only. No icons, no animations, no gradients.
 */
import type { PlatformStats } from "@/lib/data/stats";
import { getLang, getT } from "@/i18n/server";
import { formatNumber } from "@/i18n/format";

export function StatsStrip({ stats, className = "" }: { stats: PlatformStats; className?: string }) {
  // Hide the strip entirely if we have nothing real to show — pretending zero is
  // a "stat" hurts more than helps.
  if (stats.rfpsPostedLast30Days === 0 && stats.tradesListed === 0) return null;
  const t = getT("sales").stats;
  const lang = getLang();

  return (
    <div className={`flex flex-wrap items-baseline gap-x-8 gap-y-3 ${className}`.trim()}>
      <Stat value={formatNumber(stats.rfpsPostedLast30Days, lang)} label={t.rfps} />
      {/* A small directory count undersells a board this busy; show it once it's big. */}
      {stats.tradesListed >= 100 ? (
        <Stat value={formatNumber(stats.tradesListed, lang)} label={t.trades} />
      ) : (
        <Stat value={t.daily} label={t.dailyLabel} />
      )}
      <Stat value={t.markets} label={t.marketsLabel} />
    </div>
  );
}

function Stat({ value, label }: { value: number | string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-semibold tracking-tight text-indigo">{value}</div>
      <div className="mt-0.5 text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
