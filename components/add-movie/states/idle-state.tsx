"use client";

import { ADD_MOVIE_MIN_SEARCH_LENGTH } from "@/lib/add-movie/constants";

type IdleStateProps = {
  queryTooShort: boolean;
};

export function IdleState({ queryTooShort }: IdleStateProps) {
  return (
    <div className="add-movie-results flex min-h-[240px] flex-1 flex-col rounded-md border border-border/50 bg-card/30">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        {queryTooShort ? (
          <p className="text-sm text-muted-foreground">
            Type at least {ADD_MOVIE_MIN_SEARCH_LENGTH} characters to search.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Start typing to search for a movie.
          </p>
        )}
      </div>
    </div>
  );
}
