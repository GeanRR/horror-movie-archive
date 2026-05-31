"use client";

import { LayoutGrid } from "lucide-react";

/** Grid view placeholder — layout shell only until grid experience is specified */
export function LibraryGridView() {
  return (
    <div className="flex min-h-[420px] flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-border/50 bg-card/10 px-6">
      <LayoutGrid
        className="mb-4 h-8 w-8 text-muted-foreground/40"
        aria-hidden
      />
      <p className="text-sm font-medium text-muted-foreground">Grid view</p>
      <p className="mt-1 max-w-xs text-center text-xs text-muted-foreground/80">
        Switch to list view for the archive table experience.
      </p>
    </div>
  );
}
