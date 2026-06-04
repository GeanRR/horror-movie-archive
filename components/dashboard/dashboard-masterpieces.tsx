"use client";

import type { LibraryMovie } from "@/store/movie-store";
import { MovieBadge } from "@/components/movie/movie-badge";
import { formatReviewScore } from "@/lib/movie-engines/stars-engine";

type DashboardMasterpiecesProps = {
  movies: LibraryMovie[];
};

export function DashboardMasterpieces({
  movies,
}: DashboardMasterpiecesProps) {
  if (movies.length === 0) {
    return (
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight">
          10/10 Masterpieces
        </h2>
        <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-dashed border-border/50 bg-card/10 px-6 text-center">
          <p className="text-sm text-muted-foreground">
            No 10/10 masterpieces yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold tracking-tight">
          10/10 Masterpieces
        </h2>
        <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-300">
          Hall of Fame
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {movies.map((movie) => (
          <article
            key={movie.id}
            className="flex gap-4 rounded-lg border border-amber-400/20 bg-gradient-to-br from-amber-400/5 to-transparent p-4"
          >
            {movie.posterUrl ? (
              <img
                src={movie.posterUrl}
                alt={movie.displayTitle}
                className="h-28 w-20 shrink-0 rounded-md object-cover ring-1 ring-amber-400/20"
              />
            ) : (
              <div className="flex h-28 w-20 shrink-0 items-center justify-center rounded-md border border-amber-400/20 text-xs text-muted-foreground">
                No Poster
              </div>
            )}
            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none text-amber-400">
                  ★
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-amber-400/70">
                  Masterpiece
                </span>
              </div>
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
                <MovieBadge badgeId={movie.badgeId} />
                <span className="text-xs font-medium text-amber-400">
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
