"use client";

import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { getBadgeDefinition } from "@/lib/movie-engines/badge-engine";

type MovieBadgeProps = {
  badgeId: string | null | undefined;
  className?: string;
};

const toneClasses: Record<string, string> = {
  gold: "border-amber-300/50 bg-amber-300/15 text-amber-100",
  crimson: "border-primary/40 bg-primary/10 text-primary",
  red: "border-red-400/40 bg-red-400/10 text-red-200",
  amber: "border-amber-400/40 bg-amber-400/10 text-amber-200",
  orange: "border-orange-400/35 bg-orange-400/10 text-orange-200",
  slate: "border-slate-400/35 bg-slate-400/10 text-slate-200",
  violet: "border-violet-400/35 bg-violet-400/10 text-violet-200",
  muted: "border-border/70 bg-muted/40 text-muted-foreground",
  manual: "border-border/70 bg-card/60 text-foreground/80",
};

export function MovieBadge({ badgeId, className }: MovieBadgeProps) {
  const badge = getBadgeDefinition(badgeId);

  if (!badge) {
    return (
      <span
        className={cn("text-muted-foreground", className)}
        aria-label="No badge"
      >
        -
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center justify-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium leading-none",
        toneClasses[badge.tone],
        className
      )}
      title={badge.description}
    >
      <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span className="truncate">{badge.label}</span>
    </span>
  );
}
