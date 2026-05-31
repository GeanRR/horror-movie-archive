export const ADD_MOVIE_PANEL_STATES = [
  "idle",
  "searching",
  "results",
  "confirmation",
  "success",
] as const;

export type AddMoviePanelState = (typeof ADD_MOVIE_PANEL_STATES)[number];

/** TMDB search hit — aligned with /api/tmdb/search */
export type AddMovieSearchResult = {
  tmdbId: number;
  title: string;
  originalTitle: string;
  releaseYear: string;
  posterPath: string | null;
  overview: string;
  originalLanguage: string;
};

/** Confirmation draft — enriched later via TMDB details / OMDb */
export type AddMovieMovieDraft = {
  tmdbId: number;
  displayTitle: string;
  originalTitle: string;
  titlePt: string;
  year: string;
  director: string;
  posterPath: string | null;
  posterUrl?: string;
  overview?: string;
  originalLanguage?: string;
};

export type AddMovieFormValues = {
  reviewScore: string;
  bestOfYear: boolean;
  watchedDate: string;
};
