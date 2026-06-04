"use client";

import { GripVertical, ArrowUpWideNarrow, ArrowDownWideNarrow, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LibraryListColumnDef } from "@/lib/library/list-columns";
import type { LibrarySortKey, LibrarySortState } from "@/types/library";

type LibraryListTableHeaderProps = {
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey) => void;
  columnWidths: Record<string, string>;
  onResizeStart: (columnId: string, e: React.MouseEvent<HTMLDivElement>) => void;
  columns: LibraryListColumnDef[];
  onDragStart: (columnId: string) => void;
  onDragOver: (e: React.DragEvent, columnId: string) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  onDragEnd: () => void;
};

export function LibraryListTableHeader({
  sort,
  onSortChange,
  columnWidths,
  onResizeStart,
  columns,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: LibraryListTableHeaderProps) {
  const renderHeaderLabel = (column: LibraryListColumnDef) => {
    if (column.id === "review") {
      return (
        <img
          src="/images/gean.png"
          alt="Personal Review"
          className="h-6 w-auto object-contain"
        />
      );
    }
    if (column.id === "imdb") {
      return (
        <img
          src="/images/imdb.png"
          alt="IMDb"
          className="h-5 w-auto object-contain"
        />
      );
    }
    if (column.id === "rotten") {
      return (
        <img
          src="/images/rotten.png"
          alt="Rotten Tomatoes"
          className="h-5 w-auto object-contain"
        />
      );
    }
    return column.label;
  };

  const isActive = (column: LibraryListColumnDef) =>
    column.sortKey && sort.key === column.sortKey;

  const isAsc = sort.direction === "asc";

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.id}
            scope="col"
            aria-sort={
              isActive(column)
                ? isAsc
                  ? "ascending"
                  : "descending"
                : "none"
            }
            className={cn(
              "library-list-th relative",
              column.sortable && "library-list-th--sortable group/th"
            )}
            style={{ width: columnWidths[column.id] }}
            draggable
            onDragStart={() => onDragStart(column.id)}
            onDragOver={(e) => onDragOver(e, column.id)}
            onDrop={(e) => onDrop(e, column.id)}
            onDragEnd={onDragEnd}
          >
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 cursor-grab px-0.5 text-muted-foreground/30 opacity-0 transition-opacity group-hover/th:opacity-60 hover:!opacity-100"
              aria-hidden
            >
              <GripVertical className="h-3.5 w-3.5" />
            </div>
            <button
              type="button"
              disabled={!column.sortable || !column.sortKey}
              onClick={() => column.sortKey && onSortChange(column.sortKey)}
              className={cn(
                "relative inline-flex w-full items-center justify-center py-2",
                column.sortable &&
                  "cursor-pointer rounded-sm transition-colors hover:text-foreground",
                !column.sortable && "cursor-default"
              )}
            >
              <span className="truncate">{renderHeaderLabel(column)}</span>
              {column.sortable && (
                <span
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 flex h-4 w-4 items-center justify-center transition-opacity",
                    isActive(column)
                      ? "opacity-90"
                      : "opacity-0 group-hover/th:opacity-40"
                  )}
                  aria-hidden
                >
                  {isActive(column) ? (
                    isAsc ? (
                      <ArrowUpWideNarrow className="h-3.5 w-3.5" />
                    ) : (
                      <ArrowDownWideNarrow className="h-3.5 w-3.5" />
                    )
                  ) : (
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  )}
                </span>
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
