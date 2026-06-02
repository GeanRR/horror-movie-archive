import { cn } from "@/lib/utils";
import { LIBRARY_LIST_COLUMNS } from "@/lib/library/list-columns";
import type { LibraryMovieListRow } from "@/lib/library/list-columns";
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

  return (
    <div
      className={cn(
        "library-list-table flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border/50 bg-card/20",
        className
      )}
    >
      <div className="library-list-scroll min-h-0 flex-1 overflow-auto">
        <table className="library-list-table__table w-full min-w-[1280px] border-collapse">
          <LibraryListTableHeader sort={sort} onSortChange={onSortChange} />
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
                  key={index}
                  className="library-list-row cursor-pointer hover:bg-accent/30 transition-colors"
                  onClick={() => {
                    const movieId = row.id ?? String(row.tmdbId ?? "");

                    if (movieId) {
                      onOpenMovie(movieId);
                    }
                  }}
                >
                  {LIBRARY_LIST_COLUMNS.map((column) => (
                    <td
                      key={column.id}
                      className={cn("library-list-td", column.minWidth)}
                    >
                      {row[column.id] ?? null}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
