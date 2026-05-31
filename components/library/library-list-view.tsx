"use client";

import { useMemo } from "react";
import { LibraryListTable } from "@/components/library/library-list-table";
import { useMovieStore } from "@/store";

type LibraryListViewProps = {
  onAddMovie: () => void;
};

/** Primary Library experience — archive list table */
export function LibraryListView({ onAddMovie }: LibraryListViewProps) {
  const movies = useMovieStore((state) => state.movies);

  const rows = useMemo(
    () =>
      movies.map((movie) => ({
        poster: movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.displayTitle}
            className="h-16 w-12 rounded object-cover"
          />
        ) : null,
        year: movie.year,
        title: movie.displayTitle,
        titlePt: movie.titlePt,
        director: movie.director,
        stars: movie.reviewScore,
      })),
    [movies]
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <LibraryListTable rows={rows} onAddMovie={onAddMovie} />
    </div>
  );
}