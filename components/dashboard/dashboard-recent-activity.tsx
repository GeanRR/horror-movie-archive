"use client";

import { CalendarDays, Clock } from "lucide-react";
import type { LibraryMovie } from "@/store/movie-store";
import { MovieStars } from "@/components/movie/movie-stars";

type DashboardRecentActivityProps = {
  recentlyWatched: LibraryMovie[];
  watchedThisMonth: number;
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function DashboardRecentActivity({
  recentlyWatched,
  watchedThisMonth,
}: DashboardRecentActivityProps) {
  if (recentlyWatched.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold tracking-tight">
        Recent Activity
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-card/20 p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            <span className="text-[11px] font-medium uppercase tracking-[0.12em]">
              Watched This Month
            </span>
          </div>
          <span className="text-2xl font-semibold tracking-tight">
            {watchedThisMonth}
          </span>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-border/50 bg-card/20 p-4 md:col-span-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            <span className="text-[11px] font-medium uppercase tracking-[0.12em]">
              Recently Watched
            </span>
          </div>
          <div className="space-y-2">
            {recentlyWatched.slice(0, 5).map((movie) => (
              <div
                key={movie.id}
                className="flex items-center gap-3 rounded px-2 py-1.5 transition-colors hover:bg-accent/10"
              >
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
                  <p className="text-[11px] text-muted-foreground">
                    {formatDate(movie.watchedDate)}
                  </p>
                </div>
                <MovieStars stars={movie.stars} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
