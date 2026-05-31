export type MovieDetailsResponse = {
  ok: boolean;
  movie?: {
    tmdbId: number;

    title: string;
    originalTitle: string;
    titlePt: string;
    year: string;
    releaseDate: string;

    runtime: number | null;
    director: string;
    country: string;

    genres: string[];

    overview: string;

    imdbId?: string;
    imdbScore?: number | null;
    rottenTomatoesScore?: number | null;

    distributor?: string;

    cast?: string[];
    crew?: string[];
  };
  error?: string;
};

export async function fetchMovieDetails(tmdbId: number) {
  const response = await fetch(`/api/tmdb/movie/${tmdbId}`);

  const data = (await response.json()) as MovieDetailsResponse;

  if (!response.ok || !data.ok || !data.movie) {
    throw new Error(data.error ?? "Failed to load movie details.");
  }

  return data.movie;
}
