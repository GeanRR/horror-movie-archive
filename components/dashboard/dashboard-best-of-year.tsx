"use client";

import type { LibraryMovie } from "@/store/movie-store";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { MovieStars } from "@/components/movie/movie-stars";
import { MovieBadge } from "@/components/movie/movie-badge";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";

type DashboardBestOfYearProps = {
  movies: LibraryMovie[];
};

export function DashboardBestOfYear({ movies }: DashboardBestOfYearProps) {
  if (movies.length === 0) {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Best Of Year
        </h2>
        <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-border/50 bg-card/10 px-6 text-center">
          <p className="text-sm text-muted-foreground">
            No best-of-year crowns yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold tracking-tight">
        Best Of Year
      </h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {movies.map((movie) => (
          <article
            key={movie.id}
            className="flex gap-4 rounded-lg border border-amber-400/20 bg-card/20 p-4"
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
            <div className="min-w-0 flex-1 space-y-2">
              <BestOfYearCrown active={movie.bestOfYear} showLabel />
              <div>
                <h3 className="truncate text-base font-semibold tracking-tight">
                  {movie.displayTitle}
                </h3>
                <p className="truncate text-sm text-muted-foreground">
                  {movie.director}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  {movie.year}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <MovieStars stars={movie.stars} showValue />
                <MovieBadge badgeId={movie.badgeId} />
                <span className="text-xs text-muted-foreground">
                  {formatReviewScore(movie.reviewScore)}/10
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
