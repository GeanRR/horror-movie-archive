"use client";

import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LIBRARY_LIST_COLUMNS } from "@/lib/library/list-columns";
import type { LibrarySortKey, LibrarySortState } from "@/types/library";

type LibraryListTableHeaderProps = {
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey) => void;
  columnWidths: Record<string, string>;
  onResizeStart: (columnId: string, e: React.MouseEvent<HTMLDivElement>) => void;
};

export function LibraryListTableHeader({
  sort,
  onSortChange,
  columnWidths,
  onResizeStart,
}: LibraryListTableHeaderProps) {
  return (
    <thead className="sticky top-0 z-10">
      <tr>
        {LIBRARY_LIST_COLUMNS.map((column) => (
          <th
            key={column.id}
            scope="col"
            aria-sort={
              column.sortKey && sort.key === column.sortKey
                ? sort.direction === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
            }
            className={cn(
              "library-list-th relative",
              column.sortable && "library-list-th--sortable"
            )}
            style={{ width: columnWidths[column.id] }}
          >
            <button
              type="button"
              disabled={!column.sortable || !column.sortKey}
              onClick={() => column.sortKey && onSortChange(column.sortKey)}
              className={cn(
                "inline-flex w-full items-center justify-start gap-1.5 px-2 py-2",
                column.sortable &&
                  "cursor-pointer rounded-sm transition-colors hover:text-foreground",
                !column.sortable && "cursor-default"
              )}
            >
              <span className="truncate">{column.label}</span>
              {column.sortable && (
                <ArrowUpDown
                  className={cn(
                    "h-3 w-3 shrink-0",
                    column.sortKey && sort.key === column.sortKey
                      ? "opacity-90"
                      : "opacity-40"
                  )}
                  aria-hidden
                />
              )}
            </button>
            <div
              className="absolute right-0 top-0 z-20 h-full w-1.5 cursor-col-resize hover:bg-primary/30 active:bg-primary/50"
              onMouseDown={(e) => onResizeStart(column.id, e)}
            >
              <div className="mx-auto h-full w-px bg-border/40" />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
