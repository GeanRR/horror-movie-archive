"use client";

import { useState } from "react";
import { splitDirectorNames } from "@/lib/movies/directors";
import { cn } from "@/lib/utils";

type LibraryDirectorDisplayProps = {
  value: string;
  className?: string;
  visibleCount?: number;
};

export function LibraryDirectorDisplay({
  value,
  className,
  visibleCount = 2,
}: LibraryDirectorDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const directors = splitDirectorNames(value);

  if (directors.length === 0) {
    return <span className={className}>{value}</span>;
  }

  if (directors.length <= visibleCount) {
    return <span className={className}>{directors.join(", ")}</span>;
  }

  const visibleDirectors = isExpanded ? directors : directors.slice(0, visibleCount);
  const hiddenCount = directors.length - visibleCount;

  return (
    <span className={cn("inline", className)}>
      {visibleDirectors.join(", ")}
      {" "}
      <button
        type="button"
        className="rounded-sm font-black underline decoration-current/35 underline-offset-2 transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
        aria-label={
          isExpanded
            ? "Collapse directors"
            : `Show ${hiddenCount} more director${
                hiddenCount === 1 ? "" : "s"
              }: ${directors.slice(visibleCount).join(", ")}`
        }
        onClick={(event) => {
          event.stopPropagation();
          setIsExpanded((current) => !current);
        }}
      >
        {isExpanded ? "show less" : `+${hiddenCount}`}
      </button>
    </span>
  );
}
