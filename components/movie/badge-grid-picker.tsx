"use client";

import { MOVIE_BADGES } from "@/lib/movie-engines/badge-engine";
import { getBadgeDefinition } from "@/lib/movie-engines/badge-engine";
import { cn } from "@/lib/utils";

type BadgeGridPickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export function BadgeGridPicker({ value, onChange }: BadgeGridPickerProps) {
  const selectedDef = getBadgeDefinition(value);

  return (
    <div className="grid grid-cols-6 gap-2">
      <button
        type="button"
        onClick={() => onChange("")}
        className={cn(
          "flex aspect-square items-center justify-center rounded-md border-2 text-xs text-muted-foreground transition-all",
          value === ""
            ? "border-primary bg-primary/10"
            : "border-border/50 bg-background/50 hover:border-muted-foreground/30"
        )}
        title="Automatic (default)"
      >
        Auto
      </button>
      {MOVIE_BADGES.map((badge) => (
        <button
          key={badge.id}
          type="button"
          onClick={() => onChange(badge.id)}
          className={cn(
            "flex items-center justify-center rounded-md border-2 p-1 transition-all",
            value === badge.id
              ? "border-primary bg-primary/10"
              : "border-border/50 bg-background/50 hover:border-muted-foreground/30"
          )}
          title={badge.description}
        >
          <img
            src={badge.assetPath}
            alt={badge.label}
            className="h-9 max-w-full object-contain"
          />
        </button>
      ))}
      {selectedDef && value !== "" && (
        <div className="col-span-full mt-1 text-center text-xs text-muted-foreground">
          {selectedDef.description}
        </div>
      )}
    </div>
  );
}
