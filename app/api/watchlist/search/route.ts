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
  Plot?: string;
};

const IMDB_ID_PATTERN = /^tt\d{7,10}$/i;

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

function normalizeImdbId(value: string) {
  const trimmed = value.trim();
  return IMDB_ID_PATTERN.test(trimmed) ? trimmed.toLowerCase() : null;
}

function mapTmdbMovieToWatchlistResult(
  movie: ReturnType<typeof mapTmdbApiMovie>,
  imdbId?: string
): WatchlistSearchResult {
  return {
    source: "tmdb",
    id: imdbId ? `tmdb-imdb-${imdbId}` : `tmdb-${movie.tmdbId}`,
    tmdbId: movie.tmdbId,
    imdbId,
    title: movie.title,
    originalTitle: movie.originalTitle,
    releaseYear: movie.releaseYear,
    posterUrl: getTmdbPosterUrl(movie.posterPath, "detail"),
    overview: movie.overview,
    originalLanguage: movie.originalLanguage,
  };
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

      return mapTmdbMovieToWatchlistResult(movie);
    });
}

async function searchTmdbByImdbId(
  imdbId: string
): Promise<WatchlistSearchResult[]> {
  const apiKey = getTmdbApiKey();
  if (!apiKey) return [];

  const url = new URL(`${TMDB_API_BASE}/find/${imdbId}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("external_source", "imdb_id");
  url.searchParams.set("language", "en-US");

  const response = await fetchWithTimeout(url.toString());
  if (!response.ok) return [];

  const payload = (await response.json()) as { movie_results?: unknown[] };

  return (payload.movie_results ?? [])
    .filter(
      (item): item is Parameters<typeof mapTmdbApiMovie>[0] =>
        typeof item === "object" && item !== null && "id" in item
    )
    .map((item) => mapTmdbMovieToWatchlistResult(mapTmdbApiMovie(item), imdbId))
    .slice(0, 1);
}

function mapOmdbItemToWatchlistResult(item: OmdbSearchItem): WatchlistSearchResult {
  return {
    source: "omdb",
    id: `omdb-${item.imdbID}`,
    tmdbId: null,
    imdbId: item.imdbID,
    title: item.Title ?? "Untitled",
    originalTitle: item.Title ?? "Untitled",
    releaseYear: item.Year?.match(/\d{4}/)?.[0] ?? "",
    posterUrl: item.Poster && item.Poster !== "N/A" ? item.Poster : undefined,
    overview: item.Plot && item.Plot !== "N/A" ? item.Plot : "",
    originalLanguage: "",
  };
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
    mapOmdbItemToWatchlistResult
  );
}

async function searchOmdbByImdbId(
  imdbId: string
): Promise<WatchlistSearchResult[]> {
  const apiKey = getOmdbApiKey();
  if (!apiKey) return [];

  const url = new URL("https://www.omdbapi.com/");
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("i", imdbId);
  url.searchParams.set("type", "movie");
  url.searchParams.set("plot", "short");

  const response = await fetchWithTimeout(url.toString());
  if (!response.ok) return [];

  const payload = (await response.json()) as OmdbSearchItem & {
    Response?: string;
  };

  if (payload.Response === "False" || !payload.imdbID || !payload.Title) {
    return [];
  }

  return [mapOmdbItemToWatchlistResult(payload)];
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const imdbId = normalizeImdbId(query);

  if (!imdbId && query.length < ADD_MOVIE_MIN_SEARCH_LENGTH) {
    const body: WatchlistSearchResponse = {
      ok: false,
      error: `Enter at least ${ADD_MOVIE_MIN_SEARCH_LENGTH} characters to search.`,
    };
    return NextResponse.json(body, { status: 400 });
  }

  try {
    const tmdbResults = imdbId
      ? await searchTmdbByImdbId(imdbId)
      : await searchTmdb(query);
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
    const omdbResults = imdbId
      ? await searchOmdbByImdbId(imdbId)
      : await searchOmdb(query);
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
