"use client";

import type { AddMovieSearchResult } from "@/types/add-movie";
import { AddMoviePoster } from "@/components/add-movie/add-movie-poster";
import { getTmdbPosterUrl } from "@/lib/tmdb/poster";

type ResultsStateProps = {
  results: AddMovieSearchResult[];
  searchError: string | null;
  onSelect: (result: AddMovieSearchResult) => void;
};

export function ResultsState({
  results,
  searchError,
  onSelect,
}: ResultsStateProps) {
  if (searchError) {
    return (
      <div className="add-movie-results flex min-h-[240px] flex-1 flex-col rounded-md border border-border/50 bg-card/30">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
          <p className="text-sm font-medium text-foreground">Search unavailable</p>
          <p className="mt-2 text-sm text-muted-foreground">{searchError}</p>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="add-movie-results flex min-h-[240px] flex-1 flex-col rounded-md border border-border/50 bg-card/30">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">No movies found.</p>
          <p className="mt-1 text-xs text-muted-foreground/80">
            Try a different title or check the spelling.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-movie-results flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-border/50 bg-card/30">
      <ul
        className="flex max-h-[min(52vh,480px)] flex-col gap-1 overflow-y-auto p-2"
        role="list"
      >
        {results.map((result) => (
          <li key={result.tmdbId} role="listitem">
            <button
              type="button"
              onClick={() => onSelect(result)}
              className="flex w-full items-center gap-3 rounded-md border border-transparent px-3 py-3 text-left transition-colors hover:border-border/60 hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <AddMoviePoster
                posterUrl={getTmdbPosterUrl(result.posterPath, "thumb")}
                title={result.title}
                className="h-16 w-11"
                sizes="88px"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium leading-snug text-foreground">
                  {result.title}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {result.releaseYear || "—"}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
