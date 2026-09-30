import { ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { getT } from "@/i18n/server";

export function TrustDisclaimer({ text, className }: { text?: string; className?: string }) {
  // common.disclaimer is COPY.disclaimer (lib/site.ts), word for word, in each language.
  return (
    <div className={cn("flex gap-3 rounded-lg border border-border bg-secondary/40 p-4", className)}>
      <ShieldAlert className="size-5 shrink-0 text-teal-600" />
      <p className="text-xs leading-relaxed text-muted-foreground">{text ?? getT("common").disclaimer}</p>
    </div>
  );
}
