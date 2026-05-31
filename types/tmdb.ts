/** TMDB movie search item — returned by /api/tmdb/search */
export type TmdbMovieSearchItem = {
  tmdbId: number;
  title: string;
  originalTitle: string;
  releaseYear: string;
  posterPath: string | null;
  overview: string;
  originalLanguage: string;
};

export type TmdbSearchSuccessResponse = {
  ok: true;
  results: TmdbMovieSearchItem[];
};

export type TmdbSearchErrorResponse = {
  ok: false;
  error: string;
};

export type TmdbSearchResponse =
  | TmdbSearchSuccessResponse
  | TmdbSearchErrorResponse;
