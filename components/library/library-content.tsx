"use client";

import { LibraryGridView } from "@/components/library/library-grid-view";
import { LibraryListView } from "@/components/library/library-list-view";
import type { LibraryMovie } from "@/store/movie-store";
import type {
  LibrarySortKey,
  LibrarySortState,
  LibraryViewMode,
} from "@/types/library";

type LibraryContentProps = {
  viewMode: LibraryViewMode;
  movies: LibraryMovie[];
  onAddMovie: () => void;
  onOpenMovie: (id: string) => void;
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey) => void;
};

export function LibraryContent({
  viewMode,
  movies,
  onAddMovie,
  onOpenMovie,
  sort,
  onSortChange,
}: LibraryContentProps) {
  if (viewMode === "grid") {
    return (
      <LibraryGridView
        movies={movies}
        onAddMovie={onAddMovie}
        onOpenMovie={onOpenMovie}
      />
    );
  }

  return (
    <LibraryListView
      movies={movies}
      onAddMovie={onAddMovie}
      onOpenMovie={onOpenMovie}
      sort={sort}
      onSortChange={onSortChange}
    />
  );
}
