import { NextRequest, NextResponse } from "next/server";
import { TMDB_API_BASE } from "@/lib/tmdb/config";
import { getTmdbApiKey } from "@/lib/tmdb/server-env";
import { getTmdbPosterUrl } from "@/lib/tmdb/poster";

type TmdbPosterImage = {
 file_path?: string | null;
 width?: number;
 height?: number;
 iso_639_1?: string | null;
 vote_average?: number;
 vote_count?: number;
};

export async function GET(
 _request: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
 const { id } = await params;
 const apiKey = getTmdbApiKey();

 if (!apiKey) {
 return NextResponse.json(
 {
 ok: false,
 error: "TMDB API key not configured.",
 },
 { status: 500 }
 );
 }

 try {
 const imagesUrl =
 `${TMDB_API_BASE}/movie/${id}/images` +
 `?api_key=${apiKey}`;

 const detailsUrl =
 `${TMDB_API_BASE}/movie/${id}` +
 `?api_key=${apiKey}&language=en-US`;

 const [imagesResponse, detailsResponse] = await Promise.all([
 fetch(imagesUrl, { next: { revalidate: 0 } }),
 fetch(detailsUrl, { next: { revalidate: 0 } }),
 ]);

 if (!imagesResponse.ok || !detailsResponse.ok) {
 return NextResponse.json(
 {
 ok: false,
 error: "Failed to fetch movie posters.",
 },
 { status: 500 }
 );
 }

 const data = await imagesResponse.json();
 const details = await detailsResponse.json();
 const posters = Array.isArray(data.posters) ? data.posters : [];

 return NextResponse.json({
 ok: true,
 originalLanguage:
 typeof details.original_language === "string"
 ? details.original_language
 : null,
 posters: posters
 .map((poster: TmdbPosterImage) => ({
 path: poster.file_path ?? null,
 url: getTmdbPosterUrl(poster.file_path, "detail"),
 width: poster.width ?? null,
 height: poster.height ?? null,
 language: poster.iso_639_1 ?? null,
 voteAverage: poster.vote_average ?? 0,
 voteCount: poster.vote_count ?? 0,
 }))
 .filter(
 (poster: { path: string | null; url?: string }) =>
 poster.path && poster.url
 ),
 });
 } catch {
 return NextResponse.json(
 {
 ok: false,
 error: "Unable to load movie posters.",
 },
 { status: 500 }
 );
 }
}
