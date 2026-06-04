"use client";

import { cn } from "@/lib/utils";
import { getBadgeDefinition } from "@/lib/movie-engines/badge-engine";

type MovieBadgeProps = {
  badgeId: string | null | undefined;
  className?: string;
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
        "inline-flex max-w-full items-center justify-center",
        className
      )}
      title={badge.id}
      aria-label={badge.id}
    >
      <img
        src={badge.assetPath}
        alt={badge.id}
        className="h-36 w-auto max-w-[11rem] object-contain"
      />
    </span>
  );
}
