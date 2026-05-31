import { NextResponse, type NextRequest } from "next/server";
import { ADD_MOVIE_MIN_SEARCH_LENGTH } from "@/lib/add-movie/constants";
import { TMDB_API_BASE } from "@/lib/tmdb/config";
import { getTmdbApiKey } from "@/lib/tmdb/server-env";
import { mapTmdbApiMovie } from "@/lib/tmdb/map-movie-search";
import type { TmdbSearchResponse } from "@/types/tmdb";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (query.length < ADD_MOVIE_MIN_SEARCH_LENGTH) {
    const body: TmdbSearchResponse = {
      ok: false,
      error: `Enter at least ${ADD_MOVIE_MIN_SEARCH_LENGTH} characters to search.`,
    };
    return NextResponse.json(body, { status: 400 });
  }

  const apiKey = getTmdbApiKey();
  if (!apiKey) {
    const body: TmdbSearchResponse = {
      ok: false,
      error: "TMDB is not configured. Add TMDB_API_KEY to .env.local.",
    };
    return NextResponse.json(body, { status: 503 });
  }

  try {
    const url = new URL(`${TMDB_API_BASE}/search/movie`);
    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("query", query);
    url.searchParams.set("include_adult", "false");
    url.searchParams.set("language", "en-US");

    const tmdbResponse = await fetch(url.toString(), {
      next: { revalidate: 0 },
    });

    if (!tmdbResponse.ok) {
      const body: TmdbSearchResponse = {
        ok: false,
        error: "TMDB search failed. Please try again.",
      };
      return NextResponse.json(body, { status: tmdbResponse.status });
    }

    const payload = (await tmdbResponse.json()) as {
      results?: unknown[];
    };

    const results = (payload.results ?? [])
      .filter(
        (item): item is Record<string, unknown> =>
          typeof item === "object" && item !== null && "id" in item
      )
      .map((item) => mapTmdbApiMovie(item as Parameters<typeof mapTmdbApiMovie>[0]));

    const body: TmdbSearchResponse = { ok: true, results };
    return NextResponse.json(body);
  } catch {
    const body: TmdbSearchResponse = {
      ok: false,
      error: "Unable to search movies right now.",
    };
    return NextResponse.json(body, { status: 500 });
  }
}
