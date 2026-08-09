import { NextResponse, type NextRequest } from "next/server";
import { ADD_MOVIE_MIN_SEARCH_LENGTH } from "@/lib/add-movie/constants";
import { getOmdbApiKey } from "@/lib/omdb/server-env";
import { TMDB_API_BASE } from "@/lib/tmdb/config";
import { getTmdbPosterUrl } from "@/lib/tmdb/poster";
import { getTmdbApiKey } from "@/lib/tmdb/server-env";
import { mapTmdbApiMovie } from "@/lib/tmdb/map-movie-search";
import type {
  WatchlistSearchResponse,
  WatchlistSearchResult,
} from "@/lib/watchlist/search-types";

type OmdbSearchItem = {
  Title?: string;
  Year?: string;
  imdbID?: string;
  Type?: string;
  Poster?: string;
};

async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    return await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function searchTmdb(query: string): Promise<WatchlistSearchResult[]> {
  const apiKey = getTmdbApiKey();
  if (!apiKey) return [];

  const url = new URL(`${TMDB_API_BASE}/search/movie`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("query", query);
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("language", "en-US");

  const response = await fetchWithTimeout(url.toString());
  if (!response.ok) return [];

  const payload = (await response.json()) as { results?: unknown[] };

  return (payload.results ?? [])
    .filter(
      (item): item is Parameters<typeof mapTmdbApiMovie>[0] =>
        typeof item === "object" && item !== null && "id" in item
    )
    .map((item) => {
      const movie = mapTmdbApiMovie(item);

      return {
        source: "tmdb" as const,
        id: `tmdb-${movie.tmdbId}`,
        tmdbId: movie.tmdbId,
        title: movie.title,
        originalTitle: movie.originalTitle,
        releaseYear: movie.releaseYear,
        posterUrl: getTmdbPosterUrl(movie.posterPath, "detail"),
        overview: movie.overview,
        originalLanguage: movie.originalLanguage,
      };
    });
}

async function searchOmdb(query: string): Promise<WatchlistSearchResult[]> {
  const apiKey = getOmdbApiKey();
  if (!apiKey) return [];

  const url = new URL("https://www.omdbapi.com/");
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("s", query);
  url.searchParams.set("type", "movie");

  const response = await fetchWithTimeout(url.toString());
  if (!response.ok) return [];

  const payload = (await response.json()) as {
    Response?: string;
    Search?: OmdbSearchItem[];
  };

  if (payload.Response === "False" || !Array.isArray(payload.Search)) {
    return [];
  }

  return payload.Search.filter((item) => item.imdbID && item.Title).map(
    (item) => ({
      source: "omdb" as const,
      id: `omdb-${item.imdbID}`,
      tmdbId: null,
      imdbId: item.imdbID,
      title: item.Title ?? "Untitled",
      originalTitle: item.Title ?? "Untitled",
      releaseYear: item.Year?.match(/\d{4}/)?.[0] ?? "",
      posterUrl:
        item.Poster && item.Poster !== "N/A" ? item.Poster : undefined,
      overview: "",
      originalLanguage: "",
    })
  );
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < ADD_MOVIE_MIN_SEARCH_LENGTH) {
    const body: WatchlistSearchResponse = {
      ok: false,
      error: `Enter at least ${ADD_MOVIE_MIN_SEARCH_LENGTH} characters to search.`,
    };
    return NextResponse.json(body, { status: 400 });
  }

  try {
    const tmdbResults = await searchTmdb(query);
    if (tmdbResults.length > 0) {
      const body: WatchlistSearchResponse = {
        ok: true,
        results: tmdbResults,
      };
      return NextResponse.json(body);
    }
  } catch {
    // Fall through to OMDb. Watchlist search can work with movie snapshots.
  }

  try {
    const omdbResults = await searchOmdb(query);
    if (omdbResults.length > 0) {
      const body: WatchlistSearchResponse = {
        ok: true,
        results: omdbResults,
      };
      return NextResponse.json(body);
    }
  } catch {
    // Final response below keeps provider details out of the UI.
  }

  const body: WatchlistSearchResponse = {
    ok: false,
    error: "Unable to search movies right now.",
  };
  return NextResponse.json(body, { status: 503 });
}
