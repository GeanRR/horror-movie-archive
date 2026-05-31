"use client";

import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

type BestOfYearCrownProps = {
  active: boolean;
  className?: string;
  showLabel?: boolean;
};

export function BestOfYearCrown({
  active,
  className,
  showLabel = false,
}: BestOfYearCrownProps) {
  if (!active) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-md border border-amber-400/40 bg-amber-400/10 px-1.5 py-1 text-amber-200",
        className
      )}
      title="Best of Year"
      aria-label="Best of Year"
    >
      <Crown className="h-3.5 w-3.5" aria-hidden />
      {showLabel && <span className="text-xs font-medium">Best of Year</span>}
    </span>
  );
}
