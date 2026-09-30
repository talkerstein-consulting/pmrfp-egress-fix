"use client";

import { Printer } from "lucide-react";
import { useT } from "@/i18n/provider";

export function PrintButton({ label }: { label?: string }) {
  const t = useT("dashClient");
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:opacity-90"
    >
      <Printer className="size-4" /> {label ?? t.print}
    </button>
  );
}
