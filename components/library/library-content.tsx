"use client";

import { LibraryGridView } from "@/components/library/library-grid-view";
import { LibraryListView } from "@/components/library/library-list-view";
import type { LibraryViewMode } from "@/types/library";

type LibraryContentProps = {
  viewMode: LibraryViewMode;
  onAddMovie: () => void;
};

export function LibraryContent({ viewMode, onAddMovie }: LibraryContentProps) {
  if (viewMode === "grid") {
    return <LibraryGridView />;
  }

  return <LibraryListView onAddMovie={onAddMovie} />;
}
