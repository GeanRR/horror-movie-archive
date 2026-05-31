import type { TmdbSearchResponse } from "@/types/tmdb";
import type { AddMovieSearchResult } from "@/types/add-movie";

export type SearchMoviesResult =
  | { ok: true; results: AddMovieSearchResult[] }
  | { ok: false; error: string };

export async function searchMovies(
  query: string,
  signal?: AbortSignal
): Promise<SearchMoviesResult> {
  try {
    const params = new URLSearchParams({ q: query });
    const response = await fetch(`/api/tmdb/search?${params.toString()}`, {
      signal,
    });

    const data = (await response.json()) as TmdbSearchResponse;

    if (!response.ok || !data.ok) {
      return {
        ok: false,
        error: data.ok === false ? data.error : "Search failed.",
      };
    }

    return { ok: true, results: data.results };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return { ok: false, error: "aborted" };
    }
    return {
      ok: false,
      error: "Unable to reach the movie search service. Try again.",
    };
  }
}
