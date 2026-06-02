"use client";

import { useMemo } from "react";
import { LibraryListTable } from "@/components/library/library-list-table";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";
import type { LibraryMovie } from "@/store/movie-store";
import type { LibrarySortKey, LibrarySortState } from "@/types/library";

type LibraryListViewProps = {
  movies: LibraryMovie[];
  onAddMovie: () => void;
  onOpenMovie: (id: string) => void;
  sort: LibrarySortState;
  onSortChange: (key: LibrarySortKey) => void;
};

export function LibraryListView({
  movies,
  onAddMovie,
  onOpenMovie,
  sort,
  onSortChange,
}: LibraryListViewProps) {
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
        imdb: movie.imdbScore !== null ? movie.imdbScore : "-",
        rotten:
          movie.rottenTomatoesScore !== null
            ? `${movie.rottenTomatoesScore}%`
            : "-",
      })),
    [movies]
  );

  return (
    <LibraryListTable
      rows={rows}
      onAddMovie={onAddMovie}
      onOpenMovie={onOpenMovie}
      sort={sort}
      onSortChange={onSortChange}
    />
  );
}
