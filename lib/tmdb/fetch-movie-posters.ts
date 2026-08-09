export type MoviePosterOption = {
  path: string;
  url: string;
  width: number | null;
  height: number | null;
  language: string | null;
  voteAverage: number;
  voteCount: number;
};

export type MoviePostersData = {
  originalLanguage: string | null;
  posters: MoviePosterOption[];
};

export type MoviePostersResponse =
  | {
      ok: true;
      originalLanguage: string | null;
      posters: MoviePosterOption[];
    }
  | {
      ok: false;
      error: string;
    };

export async function fetchMoviePosters(tmdbId: number) {
  const response = await fetch(`/api/tmdb/movie/${tmdbId}/posters`);
  const data = (await response.json()) as MoviePostersResponse;

  if (!response.ok) {
    throw new Error("Failed to load movie posters.");
  }

  if (data.ok) {
    return {
      originalLanguage: data.originalLanguage,
      posters: data.posters,
    };
  }

  throw new Error(data.error ?? "Failed to load movie posters.");
}
