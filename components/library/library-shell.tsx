"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AddMovieSidePanel } from "@/components/add-movie/add-movie-side-panel";
import { LibraryHeader } from "@/components/library/library-header";
import { LibraryContent } from "@/components/library/library-content";
import { MovieDetailsModal } from "@/components/movie/movie-details-modal";
import { Button } from "@/components/ui/button";
import { useMovieStore } from "@/store/movie-store";
import type { LibraryMovie } from "@/store/movie-store";
import {
  DEFAULT_LIBRARY_FILTERS,
  DEFAULT_LIBRARY_SORT,
  LIBRARY_PAGE_SIZE,
  LIBRARY_SORT_KEYS,
  type LibraryFilterOptions,
  type LibraryFilters,
  type LibrarySortDirection,
  type LibrarySortKey,
  type LibrarySortState,
  type LibraryViewMode,
} from "@/types/library";

const LIBRARY_SORT_STORAGE_KEY = "hma-library-sort";

function normalizeSearchValue(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function movieMatchesSearch(movie: LibraryMovie, query: string): boolean {
  const normalizedQuery = normalizeSearchValue(query);
  if (!normalizedQuery) return true;

  const searchableValues = [
    movie.displayTitle,
    movie.originalTitle,
    movie.titlePt,
    movie.director,
    movie.distributor,
    ...movie.cast,
    ...movie.genres,
  ];

  return searchableValues.some((value) =>
    normalizeSearchValue(value).includes(normalizedQuery)
  );
}

function movieMatchesFilters(
  movie: LibraryMovie,
  filters: LibraryFilters
): boolean {
  if (filters.genre && !movie.genres.includes(filters.genre)) return false;
  if (filters.country && movie.country !== filters.country) return false;
  if (filters.distributor && movie.distributor !== filters.distributor) {
    return false;
  }
  if (filters.badgeId && movie.badgeId !== filters.badgeId) return false;
  if (filters.stars && String(movie.stars) !== filters.stars) return false;
  if (filters.bestOfYear && !movie.bestOfYear) return false;

  return true;
}

function compareStrings(a: string, b: string): number {
  return a.localeCompare(b, undefined, { sensitivity: "base" });
}

function compareNumbers(a: number | null, b: number | null): number {
  const left = a ?? Number.NEGATIVE_INFINITY;
  const right = b ?? Number.NEGATIVE_INFINITY;
  return left - right;
}

function compareBySortKey(
  a: LibraryMovie,
  b: LibraryMovie,
  key: LibrarySortKey
): number {
  switch (key) {
    case "title":
      return compareStrings(a.displayTitle, b.displayTitle);
    case "titlePt":
      return compareStrings(a.titlePt, b.titlePt);
    case "year":
      return compareStrings(a.year, b.year);
    case "director":
      return compareStrings(a.director, b.director);
    case "country":
      return compareStrings(a.country, b.country);
    case "distributor":
      return compareStrings(a.distributor, b.distributor);
    case "stars":
      return compareNumbers(a.stars, b.stars);
    case "imdb":
      return compareNumbers(a.imdbScore, b.imdbScore);
    case "rotten":
      return compareNumbers(a.rottenTomatoesScore, b.rottenTomatoesScore);
    case "review":
      return compareNumbers(a.reviewScore, b.reviewScore);
  }
}

function isMissingSortValue(movie: LibraryMovie, key: LibrarySortKey): boolean {
  switch (key) {
    case "title":
      return !movie.displayTitle;
    case "titlePt":
      return !movie.titlePt;
    case "year":
      return !movie.year;
    case "director":
      return !movie.director;
    case "country":
      return !movie.country;
    case "distributor":
      return !movie.distributor;
    case "stars":
      return movie.stars === 0;
    case "imdb":
      return movie.imdbScore === null;
    case "rotten":
      return movie.rottenTomatoesScore === null;
    case "review":
      return movie.reviewScore === null;
  }
}

function isLibrarySortState(value: unknown): value is LibrarySortState {
  if (typeof value !== "object" || value === null) return false;

  const candidate = value as Partial<LibrarySortState>;
  return (
    typeof candidate.key === "string" &&
    LIBRARY_SORT_KEYS.includes(candidate.key as LibrarySortKey) &&
    (candidate.direction === "asc" || candidate.direction === "desc")
  );
}

function uniqueSorted(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)))
    .sort((a, b) => compareStrings(a, b));
}

function getActiveFilterCount(filters: LibraryFilters): number {
  return [
    filters.genre,
    filters.country,
    filters.distributor,
    filters.badgeId,
    filters.stars,
    filters.bestOfYear,
  ].filter(Boolean).length;
}

export function LibraryShell() {
  const movies = useMovieStore((state) => state.movies);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [viewMode, setViewMode] = useState<LibraryViewMode>("list");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<LibraryFilters>(
    DEFAULT_LIBRARY_FILTERS
  );
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] =
    useState<LibrarySortState>(DEFAULT_LIBRARY_SORT);
  const [savedScrollTop, setSavedScrollTop] = useState(0);

  useEffect(() => {
    const rawSort = window.localStorage.getItem(LIBRARY_SORT_STORAGE_KEY);
    if (!rawSort) return;

    try {
      const parsed = JSON.parse(rawSort) as unknown;
      if (isLibrarySortState(parsed)) {
        setSort(parsed);
      }
    } catch {
      window.localStorage.removeItem(LIBRARY_SORT_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      LIBRARY_SORT_STORAGE_KEY,
      JSON.stringify(sort)
    );
  }, [sort]);

  const handleAddMovie = useCallback(() => {
    setIsAddMovieOpen(true);
  }, []);

  const handleFilterChange = useCallback(
    <K extends keyof LibraryFilters,>(key: K, value: LibraryFilters[K]) => {
      setFilters((current) => ({ ...current, [key]: value }));
      setCurrentPage(1);
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_LIBRARY_FILTERS);
    setCurrentPage(1);
  }, []);

  const handleSearchQueryChange = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback(
    (key: LibrarySortKey, direction?: LibrarySortDirection) => {
      setSort((current) => {
        const nextDirection =
          direction ??
          (current.key === key && current.direction === "asc"
            ? "desc"
            : "asc");

        return { key, direction: nextDirection };
      });
      setCurrentPage(1);
    },
    []
  );

  const filterOptions = useMemo<LibraryFilterOptions>(
    () => ({
      genres: uniqueSorted(movies.flatMap((movie) => movie.genres)),
      countries: uniqueSorted(movies.map((movie) => movie.country)),
      distributors: uniqueSorted(movies.map((movie) => movie.distributor)),
      badges: uniqueSorted(
        movies
          .map((movie) => movie.badgeId ?? "")
          .filter((badgeId) => /^badge\d+$/.test(badgeId))
      ),
      stars: uniqueSorted(
        movies
          .map((movie) => (movie.stars > 0 ? String(movie.stars) : ""))
          .filter(Boolean)
      ).sort((a, b) => Number(b) - Number(a)),
    }),
    [movies]
  );

  const activeFilterCount = getActiveFilterCount(filters);

  const filteredMovies = useMemo(
    () =>
      movies.filter(
        (movie) =>
          movieMatchesSearch(movie, searchQuery) &&
          movieMatchesFilters(movie, filters)
      ),
    [filters, movies, searchQuery]
  );

  const sortedMovies = useMemo(() => {
    return [...filteredMovies].sort((a, b) => {
      const aMissing = isMissingSortValue(a, sort.key);
      const bMissing = isMissingSortValue(b, sort.key);

      if (aMissing !== bMissing) {
        return aMissing ? 1 : -1;
      }

      const sortResult = compareBySortKey(a, b, sort.key);
      const directedResult =
        sort.direction === "asc" ? sortResult : -sortResult;

      if (directedResult !== 0) return directedResult;

      return compareStrings(a.displayTitle, b.displayTitle);
    });
  }, [filteredMovies, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedMovies.length / LIBRARY_PAGE_SIZE)
  );
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * LIBRARY_PAGE_SIZE;
  const paginatedMovies = sortedMovies.slice(
    startIndex,
    startIndex + LIBRARY_PAGE_SIZE
  );

  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      setCurrentPage(safeCurrentPage);
    }
  }, [currentPage, safeCurrentPage]);

  const selectedMovie = selectedMovieId
    ? movies.find((movie) => movie.id === selectedMovieId) ?? null
    : null;

  const handleOpenMovie = useCallback((id: string) => {
    setSavedScrollTop(scrollRef.current?.scrollTop ?? 0);
    setSelectedMovieId(id);
  }, []);

  const handleCloseMovie = useCallback(() => {
    setSelectedMovieId(null);
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = savedScrollTop;
      }
    });
  }, [savedScrollTop]);

  return (
    <>
      <div className="flex h-[calc(100dvh-3rem)] flex-col gap-4">
        <LibraryHeader
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          onSearchQueryChange={handleSearchQueryChange}
          isSearchOpen={isSearchOpen}
          onSearchOpenChange={setIsSearchOpen}
          sort={sort}
          onSortChange={handleSortChange}
          isFilterPanelOpen={isFilterPanelOpen}
          activeFilterCount={activeFilterCount}
          filters={filters}
          filterOptions={filterOptions}
          onFilterPanelOpenChange={setIsFilterPanelOpen}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          onAddMovie={handleAddMovie}
        />

        <div
          ref={scrollRef}
          className="library-list-scroll flex min-h-0 flex-1 flex-col overflow-auto"
        >
          {movies.length > 0 && sortedMovies.length === 0 ? (
            <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-dashed border-border/50 bg-card/10 px-6 text-center">
              <p className="text-sm text-muted-foreground">
                No movies match this search or filter.
              </p>
            </div>
          ) : (
            <LibraryContent
              viewMode={viewMode}
              movies={paginatedMovies}
              onAddMovie={handleAddMovie}
              onOpenMovie={handleOpenMovie}
              sort={sort}
              onSortChange={handleSortChange}
            />
          )}

          {sortedMovies.length > LIBRARY_PAGE_SIZE && (
            <div className="mt-4 flex shrink-0 items-center justify-between border-t border-border/60 pt-4">
              <p className="text-sm text-muted-foreground">
                Page {safeCurrentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={safeCurrentPage <= 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={safeCurrentPage >= totalPages}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                >
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AddMovieSidePanel
        open={isAddMovieOpen}
        onOpenChange={setIsAddMovieOpen}
      />

      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          onClose={handleCloseMovie}
        />
      )}
    </>
  );
}
