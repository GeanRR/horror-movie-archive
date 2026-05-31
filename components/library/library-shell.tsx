"use client";

import { useCallback, useState } from "react";
import { AddMovieSidePanel } from "@/components/add-movie/add-movie-side-panel";
import { LibraryHeader } from "@/components/library/library-header";
import { LibraryContent } from "@/components/library/library-content";
import type { LibraryViewMode } from "@/types/library";

export function LibraryShell() {
  const [viewMode, setViewMode] = useState<LibraryViewMode>("list");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);

  const handleAddMovie = useCallback(() => {
    setIsAddMovieOpen(true);
  }, []);

  const handleFiltersClick = useCallback(() => {
    // Placeholder — wired when filters are implemented
  }, []);

  return (
    <>
      <div className="flex min-h-[calc(100dvh-7.5rem)] flex-col">
        <LibraryHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          isSearchOpen={isSearchOpen}
          onSearchOpenChange={setIsSearchOpen}
          onAddMovie={handleAddMovie}
          onFiltersClick={handleFiltersClick}
        />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-6">
          <LibraryContent viewMode={viewMode} onAddMovie={handleAddMovie} />
        </div>
      </div>

      <AddMovieSidePanel
        open={isAddMovieOpen}
        onOpenChange={setIsAddMovieOpen}
      />
    </>
  );
}
