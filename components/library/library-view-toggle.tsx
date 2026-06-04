"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LibraryViewMode } from "@/types/library";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type LibraryViewToggleProps = {
  viewMode: LibraryViewMode;
  onViewModeChange: (mode: LibraryViewMode) => void;
};

export function LibraryViewToggle({
  viewMode,
  onViewModeChange,
}: LibraryViewToggleProps) {
  return (
    <div
      className="inline-flex items-center rounded-md border border-border/60 p-0.5"
      role="group"
      aria-label="View mode"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            aria-pressed={viewMode === "list"}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-sm transition-colors",
              viewMode === "list"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="h-4 w-4" aria-hidden />
            <span className="sr-only">List view</span>
          </button>
        </TooltipTrigger>
        <TooltipContent>List view</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            aria-pressed={viewMode === "grid"}
            className={cn(
              "inline-flex h-8 w-8 items-center justify-center rounded-sm transition-colors",
              viewMode === "grid"
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-4 w-4" aria-hidden />
            <span className="sr-only">Grid view</span>
          </button>
        </TooltipTrigger>
        <TooltipContent>Grid view</TooltipContent>
      </Tooltip>
    </div>
  );
}
