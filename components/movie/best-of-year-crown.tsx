"use client";

import Image from "next/image";
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
        "inline-flex items-center justify-center",
        className
      )}
      title="Best of Year"
      aria-label="Best of Year"
    >
      <Image
        src="/images/skull.png"
        alt="Best of Year"
        width={20}
        height={20}
        className="object-contain"
        style={{ filter: 'drop-shadow(0 0 4px rgba(232, 185, 62, 0.6))' }}
      />
      {showLabel && (
        <span className="ml-1.5 text-xs font-medium text-[#E0B63E]">
          Best of Year
        </span>
      )}
    </span>
  );
}
