"use client";

import { Plus, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LibrarySearch } from "@/components/library/library-search";
import { LibraryViewToggle } from "@/components/library/library-view-toggle";
import type { LibraryViewMode } from "@/types/library";

type LibraryHeaderProps = {
  viewMode: LibraryViewMode;
  onViewModeChange: (mode: LibraryViewMode) => void;
  isSearchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
  onAddMovie: () => void;
  onFiltersClick: () => void;
};

export function LibraryHeader({
  viewMode,
  onViewModeChange,
  isSearchOpen,
  onSearchOpenChange,
  onAddMovie,
  onFiltersClick,
}: LibraryHeaderProps) {
  return (
    <header className="shrink-0 border-b border-border/60 pb-5">
      <div className="flex items-center justify-between gap-6">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Horror Movie List
        </h1>

        <div className="flex items-center gap-2">
          <LibrarySearch
            isOpen={isSearchOpen}
            onOpenChange={onSearchOpenChange}
          />
          <LibraryViewToggle
            viewMode={viewMode}
            onViewModeChange={onViewModeChange}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={onFiltersClick}
                aria-label="Filters"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Filters</TooltipContent>
          </Tooltip>
          <Button type="button" onClick={onAddMovie} className="gap-2">
            <Plus className="h-4 w-4" aria-hidden />
            Add Movie
          </Button>
        </div>
      </div>
    </header>
  );
}
