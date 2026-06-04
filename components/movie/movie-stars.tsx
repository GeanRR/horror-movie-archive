"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatStars } from "@/lib/movie-engines/stars-engine";

type MovieStarsProps = {
  stars: number | null | undefined;
  className?: string;
  showValue?: boolean;
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: "h-3.5 w-3.5",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

export function MovieStars({
  stars,
  className,
  showValue = false,
  size = "sm",
}: MovieStarsProps) {
  const value =
    typeof stars === "number" && Number.isFinite(stars)
      ? Math.max(0, Math.min(5, stars))
      : 0;

  if (value <= 0) {
    return (
      <span
        className={cn("text-muted-foreground", className)}
        aria-label="No stars"
      >
        -
      </span>
    );
  }

  const label = formatStars(value);

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-0.5 text-[#E0B63E]",
        className
      )}
      aria-label={`${label} stars`}
      title={`${label} stars`}
    >
      {Array.from({ length: 5 }, (_, index) => {
        const position = index + 1;
        const iconClassName = sizeClasses[size];

        if (position <= value) {
          return (
            <Star
              key={position}
              className={iconClassName}
              fill="currentColor"
              aria-hidden
            />
          );
        }

        return (
          <Star
            key={position}
            className={cn(iconClassName, "text-muted-foreground/35")}
            aria-hidden
          />
        );
      })}
      {showValue && (
        <span className="ml-1.5 text-xs font-medium text-muted-foreground">
          {label}
        </span>
      )}
    </span>
  );
}
