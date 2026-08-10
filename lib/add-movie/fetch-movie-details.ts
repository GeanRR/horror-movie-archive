export type MovieDetailsResponse = {
  ok: boolean;
  movie?: {
    tmdbId: number;

    title: string;
    originalTitle: string;
    titlePt: string;
    year: string;
    releaseDate: string;
    releaseDates?: {
      theatrical?: string;
      streaming?: string;
      digital?: string;
    };

    runtime: number | null;
    director: string;
    country: string;

    genres: string[];
    subgenres: string[];
    keywords?: string[];
    collections?: string[];

    overview: string;

    imdbId?: string;
    imdbScore?: number | null;
    rottenTomatoesScore?: number | null;

    distributor?: string;
    productionCompanies?: string[];

    cast?: string[];
    crew?: string[];
  };
  error?: string;
};

export async function fetchMovieDetails(
  tmdbId: number,
  mediaType: "movie" | "tv" = "movie"
) {
  const params = new URLSearchParams();
  if (mediaType === "tv") params.set("mediaType", mediaType);

  const query = params.toString();
  const response = await fetch(
    `/api/tmdb/movie/${tmdbId}${query ? `?${query}` : ""}`
  );

  const data = (await response.json()) as MovieDetailsResponse;

  if (!response.ok || !data.ok || !data.movie) {
    throw new Error(data.error ?? "Failed to load movie details.");
  }

  return data.movie;
}
