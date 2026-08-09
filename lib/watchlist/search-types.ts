export type WatchlistSearchResult = {
  source: "tmdb" | "omdb";
  id: string;
  tmdbId: number | null;
  imdbId?: string;
  title: string;
  originalTitle: string;
  releaseYear: string;
  posterUrl?: string;
  overview: string;
  originalLanguage: string;
};

export type WatchlistSearchResponse =
  | { ok: true; results: WatchlistSearchResult[] }
  | { ok: false; error: string };
