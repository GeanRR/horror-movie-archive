"use client";

import { Plus, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LibrarySearch } from "@/components/library/library-search";
import { LibraryViewToggle } from "@/components/library/library-view-toggle";
import type {
  LibraryFilterOptions,
  LibraryFilters,
  LibrarySortDirection,
  LibrarySortKey,
  LibrarySortState,
  LibraryViewMode,
} from "@/types/library";

type LibraryHeaderProps = {
  viewMode: LibraryViewMode;
  onViewModeChange: (mode: LibraryViewMode) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  isSearchOpen: boolean;
  onSearchOpenChange: (open: boolean) => void;
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey, direction?: LibrarySortDirection) => void;
  isFilterPanelOpen: boolean;
  activeFilterCount: number;
  filters: LibraryFilters;
  filterOptions: LibraryFilterOptions;
  onFilterPanelOpenChange: (open: boolean) => void;
  onFilterChange: <K extends keyof LibraryFilters>(
    key: K,
    value: LibraryFilters[K]
  ) => void;
  onClearFilters: () => void;
  onAddMovie: () => void;
};

const sortLabels: Record<LibrarySortKey, string> = {
  title: "Title",
  titlePt: "Title PT",
  year: "Year",
  director: "Director",
  country: "Country",
  distributor: "Distributor",
  stars: "Stars",
  review: "Personal Review",
  imdb: "IMDb",
  rotten: "Rotten Tomatoes",
};

export function LibraryHeader({
  viewMode,
  onViewModeChange,
  searchQuery,
  onSearchQueryChange,
  isSearchOpen,
  onSearchOpenChange,
  isFilterPanelOpen,
  activeFilterCount,
  filters,
  filterOptions,
  onFilterPanelOpenChange,
  onFilterChange,
  onClearFilters,
  onAddMovie,
}: LibraryHeaderProps) {
  return (
    <header className="sticky top-0 z-30 shrink-0 border-b border-border/60 bg-background">
      <div className="flex items-center justify-end gap-2">
        <LibrarySearch
          isOpen={isSearchOpen}
          onOpenChange={onSearchOpenChange}
          value={searchQuery}
          onValueChange={onSearchQueryChange}
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
              className="relative h-9 w-9"
              onClick={() => onFilterPanelOpenChange(!isFilterPanelOpen)}
              aria-label="Filters"
              aria-expanded={isFilterPanelOpen}
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden />
              {activeFilterCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-semibold text-black">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Filters</TooltipContent>
        </Tooltip>
        <Button type="button" onClick={onAddMovie} className="gap-2">
          <Plus className="h-4 w-4" aria-hidden />
          Add Movie
        </Button>
      </div>

      {isFilterPanelOpen && (
        <div className="mt-4 rounded-lg border border-border/60 bg-card/40 p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Genre</span>
              <select
                value={filters.genre}
                onChange={(event) =>
                  onFilterChange("genre", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All genres</option>
                {filterOptions.genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Country</span>
              <select
                value={filters.country}
                onChange={(event) =>
                  onFilterChange("country", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All countries</option>
                {filterOptions.countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Distributor</span>
              <select
                value={filters.distributor}
                onChange={(event) =>
                  onFilterChange("distributor", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All distributors</option>
                {filterOptions.distributors.map((distributor) => (
                  <option key={distributor} value={distributor}>
                    {distributor}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Badge</span>
              <select
                value={filters.badgeId}
                onChange={(event) =>
                  onFilterChange("badgeId", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All badges</option>
                {filterOptions.badges.map((badgeId) => (
                  <option key={badgeId} value={badgeId}>
                    {badgeId}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1 text-xs font-medium text-muted-foreground">
              <span>Stars</span>
              <select
                value={filters.stars}
                onChange={(event) =>
                  onFilterChange("stars", event.target.value)
                }
                className="h-9 w-full rounded-md border border-border bg-background px-2 text-sm text-foreground"
              >
                <option value="">All stars</option>
                {filterOptions.stars.map((stars) => (
                  <option key={stars} value={stars}>
                    {stars} {stars === "1" ? "Star" : "Stars"}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-end gap-2">
              <label className="flex h-9 flex-1 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={filters.bestOfYear}
                  onChange={(event) =>
                    onFilterChange("bestOfYear", event.target.checked)
                  }
                  className="h-4 w-4 accent-amber-400"
                />
                Best Of Year
              </label>
              {activeFilterCount > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={onClearFilters}
                  aria-label="Clear filters"
                >
                  <X className="h-4 w-4" aria-hidden />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
