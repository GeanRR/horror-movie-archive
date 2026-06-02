export const ADD_MOVIE_PANEL_STATES = [
  "idle",
  "searching",
  "results",
  "confirmation",
  "success",
] as const;

export type AddMoviePanelState = (typeof ADD_MOVIE_PANEL_STATES)[number];

/** TMDB search hit */
export type AddMovieSearchResult = {
  tmdbId: number;
  title: string;
  originalTitle: string;
  releaseYear: string;
  posterPath: string | null;
  overview: string;
  originalLanguage: string;
};

/** Confirmation draft */
export type AddMovieMovieDraft = {
  tmdbId: number;

  displayTitle: string;
  originalTitle: string;
  titlePt: string;
  year: string;
  releaseDate: string;

  posterPath: string | null;
  posterUrl?: string;

  director: string;
  country: string;
  distributor: string;
  runtime: number | null;

  synopsis: string;

  cast: string[];
  crew: string[];
  genres: string[];

  imdbId?: string;
  imdbScore: number | null;
  rottenTomatoesScore: number | null;

  overview?: string;
  originalLanguage?: string;
};

export type AddMovieFormValues = {
  reviewScore: string;
  bestOfYear: boolean;
  watchedDate: string;
  badgeOverride: string;
};
