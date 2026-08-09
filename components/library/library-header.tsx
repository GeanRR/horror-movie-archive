"use client";

import { useState } from "react";
import { ChevronDown, ClipboardCheck, Plus, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
 Tooltip,
 TooltipContent,
 TooltipTrigger,
} from "@/components/ui/tooltip";
import { LibrarySearch } from "@/components/library/library-search";
import { LibraryViewToggle } from "@/components/library/library-view-toggle";
import { getBadgeDefinition } from "@/lib/movie-engines/badge-engine";
import type {
 LibraryFilterOptions,
 LibraryFilters,
 LibrarySortDirection,
 LibrarySortKey,
 LibrarySortState,
 LibraryViewMode,
} from "@/types/library";

type FilterDropdownOption = {
 value: string;
 label: string;
 imageSrc?: string;
};

function FilterDropdown({
 value,
 options,
 placeholder,
 onChange,
 className,
}: {
 value: string;
 options: FilterDropdownOption[];
 placeholder: string;
 onChange: (value: string) => void;
 className: string;
}) {
 const [open, setOpen] = useState(false);
 const selectedOption = options.find((option) => option.value === value);

 return (
 <div className="relative">
 <button
 type="button"
 className={`${className} relative flex items-center text-left`}
 onClick={() => setOpen((current) => !current)}
 aria-expanded={open}
 >
 <span className="flex min-w-0 items-center gap-2 truncate pr-6">
 {selectedOption?.imageSrc && (
 <img
 src={selectedOption.imageSrc}
 alt=""
 className="h-6 w-6 shrink-0 object-contain"
 />
 )}
 <span className="truncate">{selectedOption?.label ?? placeholder}</span>
 </span>
 <ChevronDown
 className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#e9e3d4]"
 aria-hidden
 />
 </button>

 {open && (
 <div className="archive-scrollbar absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-72 overflow-y-auto rounded-[14px] border border-[#e9e3d4]/10 bg-black p-2 shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
 <button
 type="button"
 className={`flex h-10 w-full items-center rounded-full px-3 font-sans text-sm font-bold text-[#e9e3d4] transition-colors hover:bg-[#111] ${
 value === "" ? "bg-[#111]" : ""
 }`}
 onClick={() => {
 onChange("");
 setOpen(false);
 }}
 >
 {placeholder}
 </button>
 {options.map((option) => (
 <button
 key={option.value}
 type="button"
 className={`flex h-11 w-full items-center gap-3 rounded-full px-3 font-sans text-sm font-bold text-[#e9e3d4] transition-colors hover:bg-[#111] ${
 value === option.value ? "bg-[#111]" : ""
 }`}
 onClick={() => {
 onChange(option.value);
 setOpen(false);
 }}
 >
 {option.imageSrc && (
 <img
 src={option.imageSrc}
 alt=""
 className="h-8 w-8 shrink-0 object-contain"
 />
 )}
 <span className="truncate">{option.label}</span>
 </button>
 ))}
 </div>
 )}
 </div>
 );
}

function BadgeFilterDropdown({
 value,
 badgeIds,
 onChange,
 className,
}: {
 value: string;
 badgeIds: string[];
 onChange: (value: string) => void;
 className: string;
}) {
 const options = badgeIds.flatMap((badgeId) => {
 const badge = getBadgeDefinition(badgeId);
 return badge
 ? [{ value: badge.id, label: badge.label, imageSrc: badge.assetPath }]
 : [];
 });

 return (
 <FilterDropdown
 value={value}
 options={options}
 placeholder="All badges"
 onChange={onChange}
 className={className}
 />
 );
}

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
 onOpenAwaitingReview: () => void;
 awaitingReviewCount: number;
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
 onOpenAwaitingReview,
 awaitingReviewCount,
}: LibraryHeaderProps) {
 const filterLabelClassName =
 "space-y-2 text-[#6f6c7a]";
 const filterTitleClassName =
 "archive-input-label";
 const filterSelectClassName =
 "archive-select";

 return (
 <header className="sticky top-0 z-30 shrink-0 bg-[#0b0b0b]">
 <div
 className="relative flex min-h-[240px] items-center justify-center overflow-hidden rounded-[24px] bg-cover bg-center px-6"
 style={{ backgroundImage: "url('/images/librarybg.png')" }}
 >
 <div className="absolute inset-0 bg-black/60" />
 <h1 className="relative z-10 archive-display-title text-center text-[4.75rem] md:text-[7rem] xl:text-[7.45rem]">
 Horror Movie List
 </h1>

 <div className="absolute bottom-9 right-9 z-10 flex items-center gap-2 rounded-full bg-black/20 p-2 backdrop-blur-md">
 <LibrarySearch
 isOpen={isSearchOpen}
 onOpenChange={onSearchOpenChange}
 value={searchQuery}
 onValueChange={onSearchQueryChange}
 />
 <div className="rounded-full bg-black/20 p-1">
 <LibraryViewToggle
 viewMode={viewMode}
 onViewModeChange={onViewModeChange}
 />
 </div>
 <Tooltip>
 <TooltipTrigger asChild>
 <Button
 type="button"
 variant="ghost"
 size="icon"
 className="relative h-11 w-11 rounded-full text-[#e9e3d4] hover:bg-black/20 hover:text-[#e9e3d4]"
 onClick={onOpenAwaitingReview}
 aria-label="Awaiting Review"
 >
 <ClipboardCheck className="h-5 w-5" aria-hidden />
 {awaitingReviewCount > 0 && (
 <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e0b63e] px-1 text-[10px] font-semibold text-black">
 {awaitingReviewCount}
 </span>
 )}
 </Button>
 </TooltipTrigger>
 <TooltipContent>Awaiting Review</TooltipContent>
 </Tooltip>
 <Tooltip>
 <TooltipTrigger asChild>
 <Button
 type="button"
 variant="ghost"
 size="icon"
 className="relative h-11 w-11 rounded-full text-[#e9e3d4] hover:bg-black/20 hover:text-[#e9e3d4]"
 onClick={() => onFilterPanelOpenChange(!isFilterPanelOpen)}
 aria-label="Filters"
 aria-expanded={isFilterPanelOpen}
 >
 <SlidersHorizontal className="h-5 w-5" aria-hidden />
 {activeFilterCount > 0 && (
 <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-semibold text-black">
 {activeFilterCount}
 </span>
 )}
 </Button>
 </TooltipTrigger>
 <TooltipContent>Filters</TooltipContent>
 </Tooltip>
 <Button
 type="button"
 onClick={onAddMovie}
 size="icon"
 className="h-11 w-11 rounded-full bg-[#e0b63e] text-black hover:bg-[#f0c84a]"
 >
 <Plus className="h-5 w-5" aria-hidden />
 </Button>
 </div>
 </div>

 {isFilterPanelOpen && (
 <div className="mt-4 rounded-[14px] bg-black p-4 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
 <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
 <label className={filterLabelClassName}>
 <span className={filterTitleClassName}>Decade</span>
 <FilterDropdown
 value={filters.decade}
 options={filterOptions.decades.map((decade) => ({
 value: decade,
 label: decade,
 }))}
 placeholder="All decades"
 onChange={(value) => onFilterChange("decade", value)}
 className={filterSelectClassName}
 />
 </label>

 <label className={filterLabelClassName}>
 <span className={filterTitleClassName}>Subgenre</span>
 <FilterDropdown
 value={filters.subgenre}
 options={filterOptions.subgenres.map((subgenre) => ({
 value: subgenre,
 label: subgenre,
 }))}
 placeholder="All subgenres"
 onChange={(value) => onFilterChange("subgenre", value)}
 className={filterSelectClassName}
 />
 </label>

 <label className={filterLabelClassName}>
 <span className={filterTitleClassName}>Country</span>
 <FilterDropdown
 value={filters.country}
 options={filterOptions.countries.map((country) => ({
 value: country,
 label: country,
 }))}
 placeholder="All countries"
 onChange={(value) => onFilterChange("country", value)}
 className={filterSelectClassName}
 />
 </label>

 <label className={filterLabelClassName}>
 <span className={filterTitleClassName}>Badge</span>
 <BadgeFilterDropdown
 value={filters.badgeId}
 badgeIds={filterOptions.badges}
 onChange={(value) => onFilterChange("badgeId", value)}
 className={filterSelectClassName}
 />
 </label>

 <label className={filterLabelClassName}>
 <span className={filterTitleClassName}>Stars</span>
 <FilterDropdown
 value={filters.stars}
 options={filterOptions.stars.map((stars) => ({
 value: stars,
 label: `${stars} ${stars === "1" ? "Star" : "Stars"}`,
 }))}
 placeholder="All stars"
 onChange={(value) => onFilterChange("stars", value)}
 className={filterSelectClassName}
 />
 </label>

 <div className="flex items-end gap-2">
 <label className="flex h-10 flex-1 items-center gap-3 rounded-md border border-transparent bg-[#080808] px-3 font-sans text-sm font-bold text-[#e9e3d4] transition-colors hover:bg-[#0d0d0d]">
 <input
 type="checkbox"
 checked={filters.bestOfYear}
 onChange={(event) =>
 onFilterChange("bestOfYear", event.target.checked)
 }
 className="h-4 w-4 accent-[#e0b63e]"
 />
 Best Of Year
 </label>
 {activeFilterCount > 0 && (
 <Button
 type="button"
 variant="ghost"
 size="icon"
 className="h-10 w-10 rounded-md text-[#e9e3d4] hover:bg-[#111]"
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
