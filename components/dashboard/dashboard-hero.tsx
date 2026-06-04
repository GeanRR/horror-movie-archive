"use client";

import { Film, Globe, Star, TrendingUp } from "lucide-react";

type DashboardHeroProps = {
  totalMovies: number;
  avgPersonalScore: number | null;
  avgImdbScore: number | null;
  avgRottenScore: number | null;
  totalCountries: number;
};

function fmt(value: number | null, suffix: string, round?: boolean): string {
  if (value === null) return "\u2014";
  const v = round ? Math.round(value) : value;
  return `${v.toFixed(1)}${suffix}`;
}

export function DashboardHero(props: DashboardHeroProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
      <div className="flex flex-col gap-2 rounded-lg border border-border/50 bg-card/20 p-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Film className="h-3.5 w-3.5" aria-hidden />
          <span className="text-[11px] font-medium uppercase tracking-[0.12em]">
            Total Movies
          </span>
        </div>
        <span className="text-2xl font-semibold tracking-tight text-foreground">
          {props.totalMovies.toLocaleString()}
        </span>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-border/50 bg-card/20 p-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Star className="h-3.5 w-3.5" aria-hidden />
          <span className="text-[11px] font-medium uppercase tracking-[0.12em]">
            Avg Personal Score
          </span>
        </div>
        <span className="text-2xl font-semibold tracking-tight text-foreground">
          {fmt(props.avgPersonalScore, "/10")}
        </span>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-border/50 bg-card/20 p-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden />
          <span className="text-[11px] font-medium uppercase tracking-[0.12em]">
            Avg IMDb Score
          </span>
        </div>
        <span className="text-2xl font-semibold tracking-tight text-foreground">
          {fmt(props.avgImdbScore, "/10")}
        </span>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-border/50 bg-card/20 p-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden />
          <span className="text-[11px] font-medium uppercase tracking-[0.12em]">
            Avg Rotten Tomatoes
          </span>
        </div>
        <span className="text-2xl font-semibold tracking-tight text-foreground">
          {props.avgRottenScore !== null
            ? `${Math.round(props.avgRottenScore)}%`
            : "\u2014"}
        </span>
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-border/50 bg-card/20 p-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Globe className="h-3.5 w-3.5" aria-hidden />
          <span className="text-[11px] font-medium uppercase tracking-[0.12em]">
            Countries
          </span>
        </div>
        <span className="text-2xl font-semibold tracking-tight text-foreground">
          {props.totalCountries.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
