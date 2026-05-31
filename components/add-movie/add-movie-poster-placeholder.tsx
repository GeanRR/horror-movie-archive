import { Film } from "lucide-react";
import { cn } from "@/lib/utils";

type AddMoviePosterPlaceholderProps = {
  className?: string;
};

export function AddMoviePosterPlaceholder({
  className,
}: AddMoviePosterPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/60 bg-muted/20",
        className
      )}
      aria-hidden
    >
      <Film className="h-8 w-8 text-muted-foreground/35" />
    </div>
  );
}
