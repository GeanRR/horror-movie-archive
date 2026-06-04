"use client";

import { Film } from "lucide-react";
import { BestOfYearCrown } from "@/components/movie/best-of-year-crown";
import { MovieBadge } from "@/components/movie/movie-badge";
import { MovieStars } from "@/components/movie/movie-stars";
import { isMasterpieceScore } from "@/lib/movie-engines/stars-engine";
import { abbreviateCountry } from "@/lib/constants/country-abbreviations";
import { cn } from "@/lib/utils";
import type { LibraryMovie } from "@/store/movie-store";

type LibraryGridViewProps = {
  movies: LibraryMovie[];
  onAddMovie: () => void;
  onOpenMovie: (id: string) => void;
};

export function LibraryGridView({
  movies,
  onAddMovie,
  onOpenMovie,
}: LibraryGridViewProps) {
  if (movies.length === 0) {
    return (
      <div className="flex min-h-[420px] flex-1 flex-col items-center justify-center rounded-lg border border-dashed border-border/50 bg-card/10 px-6">
        <Film
          className="mb-4 h-8 w-8 text-muted-foreground/40"
          aria-hidden
        />
        <p className="text-sm font-medium text-muted-foreground">
          Add your first movie
        </p>
        <button
          type="button"
          onClick={onAddMovie}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Add Movie
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-5 pb-2">
      {movies.map((movie) => {
        const isMasterpiece = isMasterpieceScore(movie.reviewScore);

        return (
          <button
            key={movie.id}
            type="button"
            onClick={() => onOpenMovie(movie.id)}
            className={cn(
              "group relative flex min-w-0 flex-col rounded-lg border bg-card/20 p-2 text-left transition-all duration-200",
              "hover:-translate-y-1 hover:bg-card/50 hover:shadow-xl",
              isMasterpiece
                ? "border-amber-300/50 shadow-amber-500/10 hover:shadow-amber-500/20"
                : "border-border/50 hover:border-primary/40 hover:shadow-primary/10"
            )}
          >
            <div className="overflow-hidden rounded-md border border-border/50 bg-background/50">
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={movie.displayTitle}
                  className="aspect-[2/3] w-full rounded-[2px] object-cover transition-transform duration-300 group-hover:scale-[1.035]"
                />
              ) : (
                <div className="flex aspect-[2/3] w-full items-center justify-center text-muted-foreground">
                  <Film className="h-8 w-8 opacity-50" aria-hidden />
                </div>
              )}
            </div>

            <div className="min-w-0 space-y-2 px-1 pb-1 pt-3">
              <h3
                className={cn(
                  "line-clamp-2 text-sm font-semibold leading-snug text-foreground",
                  isMasterpiece && "text-amber-100"
                )}
              >
                {movie.displayTitle}
              </h3>

              <div className="flex min-h-7 flex-wrap items-center gap-1.5">
                <span className="text-xs text-muted-foreground">
                  {abbreviateCountry(movie.country)} &middot; {movie.year}
                </span>
                <BestOfYearCrown active={movie.bestOfYear} />
              </div>

              <div className="flex items-center justify-between gap-2">
                <MovieStars stars={movie.stars} />
                <span className="text-xs text-muted-foreground">
                  IMDb {movie.imdbScore !== null ? movie.imdbScore : "-"}
                </span>
              </div>

              <MovieBadge badgeId={movie.badgeId} className="max-w-full" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
