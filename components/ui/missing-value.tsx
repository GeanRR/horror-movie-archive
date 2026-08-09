import { cn } from "@/lib/utils";

type MissingValueProps = {
 className?: string;
};

export function MissingValue({ className }: MissingValueProps) {
 return (
 <span className={cn("text-muted-foreground", className)} aria-label="Missing value">
 —
 </span>
 );
}

export function formatMissingValue(value: string | null | undefined): string {
 const normalized = value?.trim();
 return normalized && normalized !== "-" && normalized !== "—" ? normalized : "—";
}
