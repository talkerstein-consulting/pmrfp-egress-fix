import { cn } from "@/lib/utils";
import { daysUntil } from "@/lib/data/fomo";
import { getLang, getT } from "@/i18n/server";
import { fmt, formatDate } from "@/i18n/format";

/**
 * A tender's closing date, set like a procurement notice: the date first,
 * days left underneath in the last week. Deliberately calm, no flames or
 * coloured pills. `tone="dark"` for indigo surfaces.
 */
export function DeadlineStamp({
  deadline,
  tone = "light",
  className,
}: {
  deadline: string | null;
  tone?: "light" | "dark";
  className?: string;
}) {
  const t = getT("shared").deadline;
  const lang = getLang();
  const days = daysUntil(deadline);
  const date = deadline ? formatDate(`${deadline.slice(0, 10)}T12:00:00Z`, lang, { month: "short", day: "numeric" }) : null;
  const left = days === null || days < 0 || days > 7 ? null : days === 0 ? t.today : days === 1 ? t.tomorrow : fmt(t.daysLeft, { n: days });
  return (
    <span className={cn("shrink-0 text-right leading-tight tabular-nums", className)}>
      <span className={cn("block font-mono text-[10px] uppercase tracking-[0.12em]", tone === "dark" ? "text-indigo-100/60" : "text-muted-foreground")}>
        {date ? t.closes : t.deadline}
      </span>
      <span className={cn("block text-sm font-semibold", tone === "dark" ? "text-white" : "text-foreground")}>{date ?? t.open}</span>
      {left && <span className={cn("block text-[11px]", tone === "dark" ? "text-teal-300" : "text-teal-700")}>{left}</span>}
    </span>
  );
}
