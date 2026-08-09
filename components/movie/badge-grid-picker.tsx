"use client";

import { MOVIE_BADGES } from "@/lib/movie-engines/badge-engine";
import { getBadgeDefinition } from "@/lib/movie-engines/badge-engine";
import { cn } from "@/lib/utils";

type BadgeGridPickerProps = {
 value: string;
 onChange: (value: string) => void;
 showAutomatic?: boolean;
 className?: string;
 buttonClassName?: string;
 selectedButtonClassName?: string;
 imageClassName?: string;
 showDescription?: boolean;
};

export function BadgeGridPicker({
 value,
 onChange,
 showAutomatic = true,
 className,
 buttonClassName,
 selectedButtonClassName,
 imageClassName,
 showDescription = true,
}: BadgeGridPickerProps) {
 const selectedDef = getBadgeDefinition(value);

 return (
 <div className={cn("grid grid-cols-6 gap-2", className)}>
 {showAutomatic && (
 <button
 type="button"
 onClick={() => onChange("")}
 className={cn(
 "flex aspect-square items-center justify-center rounded-md border-2 text-xs text-muted-foreground transition-all",
 buttonClassName,
 value === ""
 ? selectedButtonClassName ?? "border-primary bg-primary/10"
 : "border-border/50 bg-background/50 hover:border-muted-foreground/30"
 )}
 title="Automatic (default)"
 >
 Auto
 </button>
 )}
 {MOVIE_BADGES.map((badge) => (
 <button
 key={badge.id}
 type="button"
 onClick={() => onChange(value === badge.id ? "" : badge.id)}
 className={cn(
 "flex items-center justify-center rounded-md border-2 p-1 transition-all",
 buttonClassName,
 value === badge.id
 ? selectedButtonClassName ?? "border-primary bg-primary/10"
 : "border-border/50 bg-background/50 hover:border-muted-foreground/30"
 )}
 title={badge.description}
 >
 <img
 src={badge.assetPath}
 alt={badge.label}
 className={cn("h-9 max-w-full object-contain", imageClassName)}
 />
 </button>
 ))}
 {showDescription && selectedDef && value !== "" && (
 <div className="col-span-full mt-1 text-center text-xs text-muted-foreground">
 {selectedDef.description}
 </div>
 )}
 </div>
 );
}
