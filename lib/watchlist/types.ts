export type PersistedWatchlistMovie = {
  id: string;
  tmdbId: number | null;
  imdbId?: string;
  displayTitle: string;
  originalTitle: string;
  titlePt: string;
  year: string;
  posterUrl?: string;
  director: string;
  country: string;
  distributor: string;
  runtime: number | null;
  releaseDate: string;
  synopsis: string;
  cast: string[];
  crew: string[];
  genres: string[];
  subgenres: string[];
  imdbScore: number | null;
  rottenTomatoesScore: number | null;
  releaseDates?: {
    theatrical?: string;
    streaming?: string;
    digital?: string;
  };
  createdAt: string;
  updatedAt: string;
  metadataSourceSnapshot: string | null;
  metadataLastRefreshedAt: string | null;
};

export type PersistedWatchlist = {
  id: string;
  name: string;
  movies: PersistedWatchlistMovie[];
  createdAt: string;
  updatedAt: string;
};

export type WatchlistItemInput = {
  tmdbId: number | null;
  imdbId?: string | null;
  displayTitle: string;
  year: string;
  posterUrl?: string | null;
};
