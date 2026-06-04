"use client";

import { Clock, Maximize2, Minimize2, Calendar, ArrowUpDown } from "lucide-react";
import type { LibraryMovie } from "@/store/movie-store";

type FunStat = {
  icon: React.ElementType;
  label: string;
  value: string;
  detail?: string;
};

type DashboardFunStatsProps = {
  longestMovie: LibraryMovie | null;
  shortestMovie: LibraryMovie | null;
  oldestMovie: LibraryMovie | null;
  newestMovie: LibraryMovie | null;
  avgRuntime: number | null;
};

export function DashboardFunStats(props: DashboardFunStatsProps) {
  const stats: FunStat[] = [
    {
      icon: Maximize2,
      label: "Longest Movie",
      value: props.longestMovie
        ? props.longestMovie.displayTitle
        : "—",
      detail:
        props.longestMovie?.runtime
          ? `${props.longestMovie.runtime} min`
          : undefined,
    },
    {
      icon: Minimize2,
      label: "Shortest Movie",
      value: props.shortestMovie
        ? props.shortestMovie.displayTitle
        : "—",
      detail:
        props.shortestMovie?.runtime
          ? `${props.shortestMovie.runtime} min`
          : undefined,
    },
    {
      icon: Calendar,
      label: "Oldest Movie",
      value: props.oldestMovie
        ? props.oldestMovie.displayTitle
        : "—",
      detail: props.oldestMovie?.year ?? undefined,
    },
    {
      icon: ArrowUpDown,
      label: "Newest Movie",
      value: props.newestMovie
        ? props.newestMovie.displayTitle
        : "—",
      detail: props.newestMovie?.year ?? undefined,
    },
    {
      icon: Clock,
      label: "Average Runtime",
      value:
        props.avgRuntime !== null
          ? `${Math.round(props.avgRuntime)} min`
          : "—",
    },
  ];

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold tracking-tight">Fun Stats</h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col gap-2 rounded-lg border border-border/50 bg-card/20 p-4"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-3.5 w-3.5" aria-hidden />
                <span className="text-[11px] font-medium uppercase tracking-[0.12em]">
                  {stat.label}
                </span>
              </div>
              <p className="truncate text-sm font-medium text-foreground/90">
                {stat.value}
              </p>
              {stat.detail && (
                <p className="text-xs text-muted-foreground/70">
                  {stat.detail}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
