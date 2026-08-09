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
 className="inline-flex items-center gap-1"
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
 "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors",
 viewMode === "list"
 ? "bg-[#610C33] text-[#e9e3d4] shadow-sm"
 : "text-[#e9e3d4] hover:bg-black/20 hover:text-[#e9e3d4]"
 )}
 >
 <List className="h-5 w-5" aria-hidden />
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
 "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors",
 viewMode === "grid"
 ? "bg-[#610C33] text-[#e9e3d4] shadow-sm"
 : "text-[#e9e3d4] hover:bg-black/20 hover:text-[#e9e3d4]"
 )}
 >
 <LayoutGrid className="h-5 w-5" aria-hidden />
 <span className="sr-only">Grid view</span>
 </button>
 </TooltipTrigger>
 <TooltipContent>Grid view</TooltipContent>
 </Tooltip>
 </div>
 );
}
