"use client";

import { useMemo } from "react";
import { useMovieStore } from "@/store/movie-store";
import { getBestOfYearWinners } from "@/lib/movie-engines/best-of-year-crown";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { DashboardDistributions } from "@/components/dashboard/dashboard-distributions";
import { DashboardRankings } from "@/components/dashboard/dashboard-rankings";
import { DashboardBestOfYear } from "@/components/dashboard/dashboard-best-of-year";
import { DashboardMasterpieces } from "@/components/dashboard/dashboard-masterpieces";
import { DashboardRecentActivity } from "@/components/dashboard/dashboard-recent-activity";
import { DashboardFunStats } from "@/components/dashboard/dashboard-fun-stats";

function getDecade(year: string): string | null {
  const match = year.match(/^(\d{4})/);
  if (!match) return null;
  const y = parseInt(match[1], 10);
  const decade = Math.floor(y / 10) * 10;
  return `${decade}s`;
}

export default function DashboardPage() {
  const movies = useMovieStore((state) => state.movies);

  const stats = useMemo(() => {
    const totalMovies = movies.length;

    const scoredMovies = movies.filter(
      (m) => typeof m.reviewScore === "number" && m.reviewScore > 0
    );
    const avgPersonalScore =
      scoredMovies.length > 0
        ? scoredMovies.reduce((s, m) => s + (m.reviewScore ?? 0), 0) /
          scoredMovies.length
        : null;

    const imdbScored = movies.filter(
      (m) => typeof m.imdbScore === "number" && m.imdbScore > 0
    );
    const avgImdbScore =
      imdbScored.length > 0
        ? imdbScored.reduce((s, m) => s + (m.imdbScore ?? 0), 0) /
          imdbScored.length
        : null;

    const rtScored = movies.filter(
      (m) =>
        typeof m.rottenTomatoesScore === "number" &&
        m.rottenTomatoesScore > 0
    );
    const avgRottenScore =
      rtScored.length > 0
        ? rtScored.reduce((s, m) => s + (m.rottenTomatoesScore ?? 0), 0) /
          rtScored.length
        : null;

    const totalCountries = new Set(
      movies.map((m) => m.country).filter((c) => c && c !== "-")
    ).size;

    return {
      totalMovies,
      avgPersonalScore,
      avgImdbScore,
      avgRottenScore,
      totalCountries,
    };
  }, [movies]);

  const distributions = useMemo(() => {
    const decadeMap = new Map<string, number>();
    const countryMap = new Map<string, number>();
    const genreMap = new Map<string, number>();
    const ratingMap = new Map<number, number>();

    movies.forEach((movie) => {
      const decade = getDecade(movie.year);
      if (decade) {
        decadeMap.set(decade, (decadeMap.get(decade) ?? 0) + 1);
      }

      const country = movie.country;
      if (country && country !== "-") {
        countryMap.set(country, (countryMap.get(country) ?? 0) + 1);
      }

      if (movie.genres && movie.genres.length > 0) {
        movie.genres.forEach((genre) => {
          genreMap.set(genre, (genreMap.get(genre) ?? 0) + 1);
        });
      }

      if (
        typeof movie.reviewScore === "number" &&
        movie.reviewScore > 0
      ) {
        const bucket = Math.floor(movie.reviewScore);
        ratingMap.set(bucket, (ratingMap.get(bucket) ?? 0) + 1);
      }
    });

    const decadeDistribution = [...decadeMap.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => a.name.localeCompare(b.name));

    const countryDistribution = [...countryMap.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 15);

    const genreDistribution = [...genreMap.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 15);

    const ratingHistogram = [...ratingMap.entries()]
      .map(([name, value]) => ({ name: `${name}`, value }))
      .sort((a, b) => parseInt(a.name) - parseInt(b.name));

    return {
      decadeDistribution,
      countryDistribution,
      genreDistribution,
      ratingHistogram,
    };
  }, [movies]);

  const rankings = useMemo(() => {
    const directorMap = new Map<string, number>();
    const distributorMap = new Map<string, number>();

    movies.forEach((movie) => {
      if (movie.director && movie.director !== "-") {
        directorMap.set(
          movie.director,
          (directorMap.get(movie.director) ?? 0) + 1
        );
      }
      if (movie.distributor && movie.distributor !== "-") {
        distributorMap.set(
          movie.distributor,
          (distributorMap.get(movie.distributor) ?? 0) + 1
        );
      }
    });

    const topDirectors = [...directorMap.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const topDistributors = [...distributorMap.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const ratedMovies = movies.filter(
      (m) => typeof m.reviewScore === "number" && m.reviewScore > 0
    );

    const sortedByRating = [...ratedMovies].sort(
      (a, b) => (b.reviewScore ?? 0) - (a.reviewScore ?? 0)
    );
    const highestRated = sortedByRating.slice(0, 10).map((movie) => ({
      movie,
      value: movie.reviewScore ?? 0,
    }));

    const lowestRated = [...ratedMovies]
      .sort((a, b) => (a.reviewScore ?? 0) - (b.reviewScore ?? 0))
      .slice(0, 10)
      .map((movie) => ({
        movie,
        value: movie.reviewScore ?? 0,
      }));

    return {
      topDirectors,
      topDistributors,
      highestRated,
      lowestRated,
    };
  }, [movies]);

  const bestOfYearMovies = useMemo(
    () => getBestOfYearWinners(movies),
    [movies]
  );

  const masterpieceMovies = useMemo(
    () =>
      movies
        .filter(
          (m) =>
            typeof m.reviewScore === "number" && m.reviewScore === 10
        )
        .sort(
          (a, b) =>
            Number(b.year) - Number(a.year) ||
            a.displayTitle.localeCompare(b.displayTitle)
        ),
    [movies]
  );

  const activity = useMemo(() => {
    const watched = movies
      .filter(
        (m) =>
          typeof m.watchedDate === "string" && m.watchedDate.trim().length > 0
      )
      .sort(
        (a, b) =>
          new Date(b.watchedDate).getTime() -
          new Date(a.watchedDate).getTime()
      );

    const now = new Date();
    const thisMonth = watched.filter((m) => {
      const d = new Date(m.watchedDate);
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    });

    return {
      recentlyWatched: watched,
      watchedThisMonth: thisMonth.length,
    };
  }, [movies]);

  const funStats = useMemo(() => {
    const runtimes = movies
      .filter(
        (m) => typeof m.runtime === "number" && m.runtime !== null && m.runtime > 0
      )
      .sort((a, b) => (a.runtime ?? 0) - (b.runtime ?? 0));

    const longestMovie = runtimes.length > 0 ? runtimes[runtimes.length - 1] : null;
    const shortestMovie = runtimes.length > 0 ? runtimes[0] : null;

    const avgRuntime =
      runtimes.length > 0
        ? runtimes.reduce((s, m) => s + (m.runtime ?? 0), 0) /
          runtimes.length
        : null;

    const years = movies
      .filter((m) => m.year.match(/^\d{4}/))
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));

    const oldestMovie = years.length > 0 ? years[0] : null;
    const newestMovie = years.length > 0 ? years[years.length - 1] : null;

    return {
      longestMovie,
      shortestMovie,
      oldestMovie,
      newestMovie,
      avgRuntime,
    };
  }, [movies]);

  return (
    <div className="flex flex-col gap-10 pb-10">
      <header className="border-b border-border/60 pb-5">
        <h2 className="text-2xl font-semibold tracking-tight">Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Archive overview and insights.
        </p>
      </header>

      <DashboardHero {...stats} />

      <DashboardDistributions {...distributions} />

      <DashboardRankings {...rankings} />

      <DashboardBestOfYear movies={bestOfYearMovies} />

      <DashboardMasterpieces movies={masterpieceMovies} />

      <DashboardRecentActivity
        recentlyWatched={activity.recentlyWatched}
        watchedThisMonth={activity.watchedThisMonth}
      />

      <DashboardFunStats {...funStats} />
    </div>
  );
}
