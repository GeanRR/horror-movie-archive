"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  LIBRARY_LIST_COLUMNS,
  type LibraryMovieListRow,
} from "@/lib/library/list-columns";
import {
  getColumnWidths,
  setColumnWidth,
  getColumnOrder,
  setColumnOrder,
  type ColumnId,
} from "@/lib/library/column-state";
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
  const [columnWidths, setColumnWidthsState] =
    useState<Record<string, string>>({});
  const [columnOrder, setColumnOrderState] = useState<ColumnId[]>([]);
  const widthsRef = useRef(columnWidths);
  const dragColumnRef = useRef<string | null>(null);
  const dragOverColumnRef = useRef<string | null>(null);

  useEffect(() => {
    setColumnWidthsState(getColumnWidths());
    setColumnOrderState(getColumnOrder());
  }, []);

  useEffect(() => {
    widthsRef.current = columnWidths;
  }, [columnWidths]);

  const orderedColumns = columnOrder
    .map((id) => LIBRARY_LIST_COLUMNS.find((col) => col.id === id))
    .filter(Boolean);

  const visibleColumns = orderedColumns as typeof LIBRARY_LIST_COLUMNS;

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

  const handleDragStart = useCallback(
    (columnId: string) => {
      dragColumnRef.current = columnId;
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, columnId: string) => {
      e.preventDefault();
      dragOverColumnRef.current = columnId;
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, targetColumnId: string) => {
      e.preventDefault();
      const sourceId = dragColumnRef.current;
      if (!sourceId || sourceId === targetColumnId) return;

      setColumnOrderState((prev) => {
        const newOrder = [...prev];
        const sourceIndex = newOrder.indexOf(sourceId as ColumnId);
        const targetIndex = newOrder.indexOf(targetColumnId as ColumnId);
        if (sourceIndex === -1 || targetIndex === -1) return prev;
        newOrder.splice(sourceIndex, 1);
        newOrder.splice(targetIndex, 0, sourceId as ColumnId);
        setColumnOrder(newOrder);
        return newOrder;
      });

      dragColumnRef.current = null;
      dragOverColumnRef.current = null;
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
          {visibleColumns.map((col) => (
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
          columns={visibleColumns}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
        <tbody>
          {isEmpty ? (
            <tr className="library-list-empty-row">
              <td
                colSpan={visibleColumns.length}
                className="p-0 align-top"
              >
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
                {visibleColumns.map((column) => (
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
