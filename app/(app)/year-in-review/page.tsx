"use client";

import { useMemo } from "react";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { getBestOfYearWinners } from "@/lib/movie-engines/best-of-year-crown";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";
import { useMovieStore } from "@/store/movie-store";

export default function YearInReviewPage() {
  const movies = useMovieStore((state) => state.movies);
  const winners = useMemo(() => getBestOfYearWinners(movies), [movies]);

  return (
    <div className="flex flex-col gap-6">
      <header className="border-b border-border/60 pb-5">
        <h2 className="text-2xl font-semibold tracking-tight">
          Year in Review
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Best-of-year crowns across the archive.
        </p>
      </header>

      {winners.length === 0 ? (
        <div className="flex min-h-[320px] items-center justify-center rounded-lg border border-dashed border-border/50 bg-card/10 px-6 text-center">
          <p className="text-sm text-muted-foreground">
            No best-of-year crowns yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {winners.map((movie) => (
            <article
              key={movie.tmdbId}
              className="flex gap-4 rounded-lg border border-border/50 bg-card/20 p-4"
            >
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={movie.displayTitle}
                  className="h-28 w-20 shrink-0 rounded-md object-cover"
                />
              ) : (
                <div className="flex h-28 w-20 shrink-0 items-center justify-center rounded-md border border-border/50 text-xs text-muted-foreground">
                  No Poster
                </div>
              )}

              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <BestOfYearCrown active={movie.bestOfYear} showLabel />
                  <span className="text-sm font-medium text-muted-foreground">
                    {movie.year}
                  </span>
                </div>

                <div>
                  <h3 className="truncate text-lg font-semibold tracking-tight">
                    {movie.displayTitle}
                  </h3>
                  <p className="truncate text-sm text-muted-foreground">
                    {movie.director}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <MovieStars stars={movie.stars} showValue />
                  <MovieBadge badgeId={movie.badgeId} />
                  <span className="text-xs text-muted-foreground">
                    Review {formatReviewScore(movie.reviewScore)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
