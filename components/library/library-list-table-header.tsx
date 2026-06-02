"use client";

import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { LIBRARY_LIST_COLUMNS } from "@/lib/library/list-columns";
import type { LibrarySortKey, LibrarySortState } from "@/types/library";

type LibraryListTableHeaderProps = {
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey) => void;
};

export function LibraryListTableHeader({
  sort,
  onSortChange,
}: LibraryListTableHeaderProps) {
  return (
    <thead className="library-list-thead">
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
              "library-list-th",
              column.minWidth,
              column.sortable && "library-list-th--sortable"
            )}
          >
            <button
              type="button"
              disabled={!column.sortable || !column.sortKey}
              onClick={() => column.sortKey && onSortChange(column.sortKey)}
              className={cn(
                "inline-flex items-center justify-center gap-1.5",
                column.sortable &&
                  "cursor-pointer rounded-sm transition-colors hover:text-foreground",
                !column.sortable && "cursor-default"
              )}
            >
              <span>{column.label}</span>
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
          </th>
        ))}
      </tr>
    </thead>
  );
}
