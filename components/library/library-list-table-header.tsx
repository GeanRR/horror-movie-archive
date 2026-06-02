"use client";

import { GripVertical } from "lucide-react";
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
}: LibraryListTableHeaderProps) {
  return (
    <thead className="sticky top-0 z-10">
      <tr>
        {columns.map((column) => (
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
            draggable
            onDragStart={() => onDragStart(column.id)}
            onDragOver={(e) => onDragOver(e, column.id)}
            onDrop={(e) => onDrop(e, column.id)}
          >
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 cursor-grab px-1 text-muted-foreground/30 opacity-0 transition-opacity hover:opacity-100 group-hover/th:opacity-60"
              aria-hidden
            >
              <GripVertical className="h-3 w-3" />
            </div>
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
                <span
                  className={cn(
                    "inline-flex h-3 w-3 shrink-0 items-center justify-center",
                    column.sortKey && sort.key === column.sortKey
                      ? "opacity-90"
                      : "opacity-40"
                  )}
                  aria-hidden
                >
                  {column.sortKey && sort.key === column.sortKey
                    ? sort.direction === "asc"
                      ? "\u25B2"
                      : "\u25BC"
                    : "\u25B4\u25BE"}
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
