"use client";

import type { LibraryMovie } from "@/store/movie-store";
import { MovieStars } from "@/components/movie/movie-stars";
import { MovieBadge } from "@/components/movie/movie-badge";

type RankedEntry = {
  name: string;
  count: number;
};

type MovieEntry = {
  movie: LibraryMovie;
  value: number;
};

type DashboardRankingsProps = {
  topDirectors: RankedEntry[];
  topDistributors: RankedEntry[];
  highestRated: MovieEntry[];
  lowestRated: MovieEntry[];
};

function RankedList({
  title,
  entries,
  renderValue,
}: {
  title: string;
  entries: RankedEntry[];
  renderValue?: (entry: RankedEntry) => React.ReactNode;
}) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-card/20 p-4">
        <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {title}
        </h3>
        <div className="flex h-[160px] items-center justify-center">
          <p className="text-sm text-muted-foreground">No data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-card/20 p-4">
      <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </h3>
      <div className="space-y-1">
        {entries.map((entry, index) => (
          <div
            key={entry.name}
            className="flex items-center justify-between gap-2 rounded px-2 py-1.5 transition-colors hover:bg-accent/10"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-5 shrink-0 text-center text-xs text-muted-foreground/50">
                {index + 1}
              </span>
              <span className="truncate text-sm text-foreground/90">
                {entry.name}
              </span>
            </div>
            {renderValue ? (
              renderValue(entry)
            ) : (
              <span className="shrink-0 text-xs text-muted-foreground">
                {entry.count}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieRankedList({
  title,
  entries,
  highest,
}: {
  title: string;
  entries: MovieEntry[];
  highest: boolean;
}) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-card/20 p-4">
        <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {title}
        </h3>
        <div className="flex h-[160px] items-center justify-center">
          <p className="text-sm text-muted-foreground">No data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-card/20 p-4">
      <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </h3>
      <div className="space-y-1">
        {entries.map((entry, index) => {
          const movie = entry.movie;
          return (
            <div
              key={movie.id}
              className="flex items-center gap-3 rounded px-2 py-1.5 transition-colors hover:bg-accent/10"
            >
              <span className="w-5 shrink-0 text-center text-xs text-muted-foreground/50">
                {index + 1}
              </span>
              {movie.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={movie.displayTitle}
                  className="h-10 w-7 shrink-0 rounded object-cover"
                />
              ) : (
                <div className="flex h-10 w-7 shrink-0 items-center justify-center rounded border border-border/50 bg-card/40 text-[8px] text-muted-foreground">
                  —
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground/90">
                  {movie.displayTitle}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {movie.director}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <MovieStars stars={movie.stars} />
                <MovieBadge badgeId={movie.badgeId} />
                <span
                  className={
                    highest
                      ? "text-xs font-medium text-amber-400"
                      : "text-xs text-muted-foreground"
                  }
                >
                  {entry.value}/10
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DashboardRankings(props: DashboardRankingsProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold tracking-tight">Rankings</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <RankedList
          title="Top Directors"
          entries={props.topDirectors}
        />
        <RankedList
          title="Top Distributors"
          entries={props.topDistributors}
        />
        <MovieRankedList
          title="Highest Rated"
          entries={props.highestRated}
          highest
        />
        <MovieRankedList
          title="Lowest Rated"
          entries={props.lowestRated}
          highest={false}
        />
      </div>
    </section>
  );
}
