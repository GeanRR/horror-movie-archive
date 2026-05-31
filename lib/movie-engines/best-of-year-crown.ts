export type CrownableMovie = {
  id: string;
  watchedDate: string;
  bestOfYear: boolean;
  reviewScore?: number | null;
  createdAt?: string;
};

export function getWatchedYear(
  watchedDate: string | null | undefined
): string {
  const match = String(watchedDate ?? "").match(/^(\d{4})-\d{2}-\d{2}/);
  return match?.[1] ?? "";
}

export function findBestOfYearWinnerForWatchedYear<T extends CrownableMovie>(
  movies: T[],
  watchedDate: string | null | undefined,
  ignoredMovieId?: string
): T | null {
  const watchedYear = getWatchedYear(watchedDate);

  if (!watchedYear) return null;

  return (
    movies.find(
      (movie) =>
        movie.id !== ignoredMovieId &&
        movie.bestOfYear &&
        getWatchedYear(movie.watchedDate) === watchedYear
    ) ?? null
  );
}

export function enforceBestOfYearCrown<T extends CrownableMovie>(
  movies: T[],
  crownedMovie: T
): T[] {
  const watchedYear = getWatchedYear(crownedMovie.watchedDate);

  if (!crownedMovie.bestOfYear || !watchedYear) {
    return movies.map((movie) =>
      movie.id === crownedMovie.id && movie.bestOfYear
        ? ({ ...movie, bestOfYear: false } as T)
        : movie
    );
  }

  return movies.map((movie) => {
    const isSameMovie = movie.id === crownedMovie.id;
    const isSameWatchedYear = getWatchedYear(movie.watchedDate) === watchedYear;

    if (!isSameMovie && isSameWatchedYear && movie.bestOfYear) {
      return { ...movie, bestOfYear: false } as T;
    }

    return movie;
  });
}

export function dedupeBestOfYearCrowns<T extends CrownableMovie>(
  movies: T[]
): T[] {
  const crownedYears = new Set<string>();

  return movies.map((movie) => {
    const watchedYear = getWatchedYear(movie.watchedDate);

    if (!movie.bestOfYear || !watchedYear) {
      return movie.bestOfYear
        ? ({ ...movie, bestOfYear: false } as T)
        : movie;
    }

    if (crownedYears.has(watchedYear)) {
      return { ...movie, bestOfYear: false } as T;
    }

    crownedYears.add(watchedYear);
    return movie;
  });
}

export function getBestOfYearWinners<T extends CrownableMovie>(
  movies: T[]
): T[] {
  return movies
    .filter((movie) => movie.bestOfYear && getWatchedYear(movie.watchedDate))
    .sort((a, b) => {
      const yearDiff =
        Number(getWatchedYear(b.watchedDate)) -
        Number(getWatchedYear(a.watchedDate));

      if (yearDiff !== 0) return yearDiff;

      const scoreDiff = (b.reviewScore ?? 0) - (a.reviewScore ?? 0);

      if (scoreDiff !== 0) return scoreDiff;

      return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
    });
}
