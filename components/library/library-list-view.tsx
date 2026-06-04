"use client";

import { useMemo } from "react";
import { LibraryListTable } from "@/components/library/library-list-table";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { abbreviateCountry } from "@/lib/constants/country-abbreviations";
import { formatReviewScore, isMasterpieceScore } from "@/lib/movie-engines/stars-engine";
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
      movies.map((movie) => {
        const isMasterpiece = isMasterpieceScore(movie.reviewScore);
        const goldText = "masterpiece-text";

        return {
          id: movie.id,
          tmdbId: movie.tmdbId,

          poster: movie.posterUrl ? (
            <div className="flex items-center justify-center">
              <img
                src={movie.posterUrl}
                alt={movie.displayTitle}
                className="h-56 w-auto max-w-full rounded-[2px] object-contain"
              />
            </div>
          ) : null,

          year: (
            <span className="inline-flex flex-col items-center gap-1 leading-tight">
              {movie.bestOfYear && (
                <img
                  src="/images/skull.png"
                  alt="Best of Year"
                  className="h-5 w-auto object-contain"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(232, 185, 62, 0.6))' }}
                />
              )}
              <span className={isMasterpiece ? goldText : ""}>
                {movie.year}
              </span>
            </span>
          ),

          title: isMasterpiece ? <span className={goldText}>{movie.displayTitle}</span> : movie.displayTitle,
          titlePt: isMasterpiece && movie.titlePt ? <span className={goldText}>{movie.titlePt}</span> : movie.titlePt,
          director: isMasterpiece ? <span className={goldText}>{movie.director}</span> : movie.director,
          country: (
            <span className={isMasterpiece ? goldText : ""}>
              {abbreviateCountry(movie.country)}
            </span>
          ),
          distributor: isMasterpiece ? <span className={goldText}>{movie.distributor}</span> : movie.distributor,
          badge: (
            <div className="flex items-center justify-center">
              <MovieBadge badgeId={movie.badgeId} />
            </div>
          ),
          stars: isMasterpiece ? (
            <span className={goldText}>
              <MovieStars stars={movie.stars} size="md" />
            </span>
          ) : (
            <MovieStars stars={movie.stars} size="md" />
          ),
          review: (
            <span
              className={
                isMasterpiece
                  ? `${goldText} font-bold`
                  : "font-bold text-blue-400"
              }
            >
              {formatReviewScore(movie.reviewScore)}
            </span>
          ),
          imdb: (
            <span
              className={
                isMasterpiece
                  ? `${goldText} font-bold`
                  : "font-bold text-[#E0B63E]"
              }
            >
              {movie.imdbScore !== null ? movie.imdbScore : "-"}
            </span>
          ),
          rotten: (
            <span
              className={
                isMasterpiece
                  ? `${goldText} font-bold`
                  : "font-bold text-red-400"
              }
            >
              {movie.rottenTomatoesScore !== null
                ? `${movie.rottenTomatoesScore}%`
                : "-"}
            </span>
          ),
        };
      }),
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
