"use client";

import { useMemo } from "react";
import { LibraryListTable } from "@/components/library/library-list-table";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";
import { useMovieStore } from "@/store";

type LibraryListViewProps = {
  onAddMovie: () => void;
};

/** Primary Library experience - archive list table */
export function LibraryListView({ onAddMovie }: LibraryListViewProps) {
  const movies = useMovieStore((state) => state.movies);

  const rows = useMemo(
    () =>
      movies.map((movie) => ({
        id: movie.id,
        tmdbId: movie.tmdbId,

        poster: movie.posterUrl ? (
          <img
            src={movie.posterUrl}
            alt={movie.displayTitle}
            className="h-16 w-12 rounded object-cover"
          />
        ) : null,

        year: (
          <span className="inline-flex items-center justify-center gap-1.5">
            <span>{movie.year}</span>
            <BestOfYearCrown active={movie.bestOfYear} />
          </span>
        ),

        title: movie.displayTitle,

        titlePt: movie.titlePt,

        director: movie.director,

        country: movie.country,

        distributor: movie.distributor,

        badge: <MovieBadge badgeId={movie.badgeId} />,

        stars: <MovieStars stars={movie.stars} />,

        review: formatReviewScore(movie.reviewScore),

        imdb:
          movie.imdbScore !== null &&
          movie.imdbScore !== undefined
            ? movie.imdbScore
            : "-",

        rotten:
          movie.rottenTomatoesScore !== null &&
          movie.rottenTomatoesScore !== undefined
            ? `${movie.rottenTomatoesScore}%`
            : "-",
      })),
    [movies]
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <LibraryListTable
        rows={rows}
        onAddMovie={onAddMovie}
      />
    </div>
  );
}
