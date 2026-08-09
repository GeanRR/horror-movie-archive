import { NextRequest, NextResponse } from "next/server";
import { addMovieToWatchlist } from "@/lib/watchlist/db";
import type { WatchlistItemInput } from "@/lib/watchlist/types";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    movie?: Partial<WatchlistItemInput>;
  } | null;

  const movie = body?.movie;
  if (!movie || typeof movie.displayTitle !== "string") {
    return NextResponse.json(
      { ok: false, error: "Movie is required." },
      { status: 400 }
    );
  }

  try {
    const list = await addMovieToWatchlist(id, {
      tmdbId: typeof movie.tmdbId === "number" ? movie.tmdbId : null,
      imdbId: typeof movie.imdbId === "string" ? movie.imdbId : null,
      displayTitle: movie.displayTitle,
      year: typeof movie.year === "string" ? movie.year : "",
      posterUrl: typeof movie.posterUrl === "string" ? movie.posterUrl : null,
    });

    return NextResponse.json({ ok: true, list });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to add movie to Watchlist." },
      { status: 503 }
    );
  }
}
