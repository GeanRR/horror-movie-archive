export type CrownableMovie = {
  id: string;
  year: string;
  bestOfYear: boolean;
  reviewScore?: number | null;
  createdAt?: string;
};

export function getReleaseYear(
  year: string | null | undefined
): string {
  const match = String(year ?? "").match(/^(\d{4})/);
  return match?.[1] ?? "";
}

export function findBestOfYearWinnerForReleaseYear<T extends CrownableMovie>(
  movies: T[],
  year: string | null | undefined,
  ignoredMovieId?: string
): T | null {
  const releaseYear = getReleaseYear(year);

  if (!releaseYear) return null;

  return (
    movies.find(
      (movie) =>
        movie.id !== ignoredMovieId &&
        movie.bestOfYear &&
        getReleaseYear(movie.year) === releaseYear
    ) ?? null
  );
}

export function enforceBestOfYearCrown<T extends CrownableMovie>(
  movies: T[],
  crownedMovie: T
): T[] {
  const releaseYear = getReleaseYear(crownedMovie.year);

  if (!crownedMovie.bestOfYear || !releaseYear) {
    return movies.map((movie) =>
      movie.id === crownedMovie.id && movie.bestOfYear
        ? ({ ...movie, bestOfYear: false } as T)
        : movie
    );
  }

  return movies.map((movie) => {
    const isSameMovie = movie.id === crownedMovie.id;
    const isSameReleaseYear = getReleaseYear(movie.year) === releaseYear;

    if (!isSameMovie && isSameReleaseYear && movie.bestOfYear) {
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
    const releaseYear = getReleaseYear(movie.year);

    if (!movie.bestOfYear || !releaseYear) {
      return movie.bestOfYear
        ? ({ ...movie, bestOfYear: false } as T)
        : movie;
    }

    if (crownedYears.has(releaseYear)) {
      return { ...movie, bestOfYear: false } as T;
    }

    crownedYears.add(releaseYear);
    return movie;
  });
}

export function getBestOfYearWinners<T extends CrownableMovie>(
  movies: T[]
): T[] {
  return movies
    .filter((movie) => movie.bestOfYear && getReleaseYear(movie.year))
    .sort((a, b) => {
      const yearDiff =
        Number(getReleaseYear(b.year)) -
        Number(getReleaseYear(a.year));

      if (yearDiff !== 0) return yearDiff;

      const scoreDiff = (b.reviewScore ?? 0) - (a.reviewScore ?? 0);

      if (scoreDiff !== 0) return scoreDiff;

      return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
    });
}
