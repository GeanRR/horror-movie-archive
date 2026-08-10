import { NextResponse, type NextRequest } from "next/server";
import { ADD_MOVIE_MIN_SEARCH_LENGTH } from "@/lib/add-movie/constants";
import { TMDB_API_BASE } from "@/lib/tmdb/config";
import { getTmdbApiKey } from "@/lib/tmdb/server-env";
import { mapTmdbApiMovie } from "@/lib/tmdb/map-movie-search";
import type { TmdbSearchResponse } from "@/types/tmdb";

const IMDB_ID_PATTERN = /^tt\d{7,10}$/i;
const UNSUPPORTED_IMDB_ID_ERROR =
 "Couldn't find a supported title for this IMDb ID.";

export async function GET(request: NextRequest) {
 const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";
 const imdbId = normalizeImdbId(query);

 if (!imdbId && query.length < ADD_MOVIE_MIN_SEARCH_LENGTH) {
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
 if (imdbId) {
 return searchByImdbId(apiKey, imdbId);
 }

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

function normalizeImdbId(value: string) {
 const trimmed = value.trim();
 return IMDB_ID_PATTERN.test(trimmed) ? trimmed.toLowerCase() : null;
}

async function searchByImdbId(apiKey: string, imdbId: string) {
 const url = new URL(`${TMDB_API_BASE}/find/${imdbId}`);
 url.searchParams.set("api_key", apiKey);
 url.searchParams.set("external_source", "imdb_id");
 url.searchParams.set("language", "en-US");

 const tmdbResponse = await fetch(url.toString(), {
 next: { revalidate: 0 },
 });

 if (!tmdbResponse.ok) {
 const body: TmdbSearchResponse = {
 ok: false,
 error: UNSUPPORTED_IMDB_ID_ERROR,
 };
 return NextResponse.json(body, { status: tmdbResponse.status });
 }

 const payload = (await tmdbResponse.json()) as {
 movie_results?: unknown[];
 tv_results?: unknown[];
 tv_episode_results?: unknown[];
 };

 const movieResults = (payload.movie_results ?? [])
 .filter(isTmdbObjectWithId)
 .map((item) => mapTmdbApiMovie(item as Parameters<typeof mapTmdbApiMovie>[0]));

 if (movieResults.length > 0) {
 const body: TmdbSearchResponse = { ok: true, results: movieResults.slice(0, 1) };
 return NextResponse.json(body);
 }

 const tvResults = (payload.tv_results ?? [])
 .filter(isTmdbObjectWithId)
 .map(mapTmdbApiTvTitle);

 if (tvResults.length > 0) {
 const body: TmdbSearchResponse = { ok: true, results: tvResults.slice(0, 1) };
 return NextResponse.json(body);
 }

 const body: TmdbSearchResponse = {
 ok: false,
 error: UNSUPPORTED_IMDB_ID_ERROR,
 };
 const status = (payload.tv_episode_results ?? []).length > 0 ? 400 : 404;
 return NextResponse.json(body, { status });
}

function isTmdbObjectWithId(item: unknown): item is Record<string, unknown> {
 return typeof item === "object" && item !== null && "id" in item;
}

function mapTmdbApiTvTitle(item: Record<string, unknown>) {
 const name = typeof item.name === "string" ? item.name.trim() : "";
 const originalName =
 typeof item.original_name === "string" ? item.original_name.trim() : "";
 const firstAirDate =
 typeof item.first_air_date === "string" ? item.first_air_date : "";

 return {
 tmdbId: Number(item.id),
 mediaType: "tv" as const,
 title: name || originalName || "Untitled",
 originalTitle: originalName || name || "",
 releaseYear: firstAirDate.slice(0, 4),
 posterPath: typeof item.poster_path === "string" ? item.poster_path : null,
 overview: typeof item.overview === "string" ? item.overview.trim() : "",
 originalLanguage:
 typeof item.original_language === "string"
 ? item.original_language.trim()
 : "",
 };
}
