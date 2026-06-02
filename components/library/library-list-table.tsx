"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  LIBRARY_LIST_COLUMNS,
  type LibraryMovieListRow,
} from "@/lib/library/list-columns";
import {
  DEFAULT_COLUMN_WIDTHS,
  getColumnWidths,
  setColumnWidth,
} from "@/lib/library/column-widths";
import { LibraryListTableHeader } from "@/components/library/library-list-table-header";
import { LibraryEmptyState } from "@/components/library/library-empty-state";
import type { LibrarySortKey, LibrarySortState } from "@/types/library";

type LibraryListTableProps = {
  rows?: Array<LibraryMovieListRow & { id?: string; tmdbId?: number }>;
  onAddMovie: () => void;
  onOpenMovie: (id: string) => void;
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey) => void;
  className?: string;
};

const MIN_COL_WIDTH = 60;

export function LibraryListTable({
  rows = [],
  onAddMovie,
  onOpenMovie,
  sort,
  onSortChange,
  className,
}: LibraryListTableProps) {
  const isEmpty = rows.length === 0;
  const columnCount = LIBRARY_LIST_COLUMNS.length;
  const [columnWidths, setColumnWidthsState] =
    useState<Record<string, string>>(DEFAULT_COLUMN_WIDTHS);
  const widthsRef = useRef(columnWidths);

  useEffect(() => {
    setColumnWidthsState(getColumnWidths());
  }, []);

  useEffect(() => {
    widthsRef.current = columnWidths;
  }, [columnWidths]);

  const handleResizeStart = useCallback(
    (columnId: string, e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      const startWidth = parseInt(
        widthsRef.current[columnId]?.replace("px", "") ?? "100",
        10
      );
      const startX = e.clientX;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const diff = moveEvent.clientX - startX;
        const newWidth = Math.max(MIN_COL_WIDTH, startWidth + diff);
        setColumnWidthsState((prev) => ({
          ...prev,
          [columnId]: `${newWidth}px`,
        }));
      };

      const handleMouseUp = () => {
        const currentWidth = parseInt(
          widthsRef.current[columnId]?.replace("px", "") ?? String(startWidth),
          10
        );
        setColumnWidth(columnId, currentWidth);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    []
  );

  return (
    <div
      className={cn(
        "library-list-table flex flex-col overflow-hidden rounded-lg border border-border/50 bg-card/20",
        className
      )}
    >
      <table className="library-list-table__table w-full min-w-[1280px] border-collapse">
        <colgroup>
          {LIBRARY_LIST_COLUMNS.map((col) => (
            <col
              key={col.id}
              style={{ width: columnWidths[col.id] ?? col.minWidth }}
            />
          ))}
        </colgroup>
        <LibraryListTableHeader
          sort={sort}
          onSortChange={onSortChange}
          columnWidths={columnWidths}
          onResizeStart={handleResizeStart}
        />
        <tbody>
          {isEmpty ? (
            <tr className="library-list-empty-row">
              <td colSpan={columnCount} className="p-0 align-top">
                <LibraryEmptyState
                  variant="embedded"
                  onAddFirstMovie={onAddMovie}
                />
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={row.id ?? index}
                className="library-list-row cursor-pointer transition-colors hover:bg-accent/30"
                onClick={() => {
                  const movieId = row.id ?? String(row.tmdbId ?? "");
                  if (movieId) {
                    onOpenMovie(movieId);
                  }
                }}
              >
                {LIBRARY_LIST_COLUMNS.map((column) => (
                  <td key={column.id} className="library-list-td truncate">
                    {row[column.id] ?? null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
