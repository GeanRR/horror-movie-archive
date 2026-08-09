import { NextRequest, NextResponse } from "next/server";
import { reorderWatchlistMovie } from "@/lib/watchlist/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    movieId?: unknown;
    direction?: unknown;
  } | null;

  const movieId = typeof body?.movieId === "string" ? body.movieId : "";
  const direction =
    body?.direction === "up" || body?.direction === "down"
      ? body.direction
      : null;

  if (!movieId || !direction) {
    return NextResponse.json(
      { ok: false, error: "Movie id and direction are required." },
      { status: 400 }
    );
  }

  try {
    const list = await reorderWatchlistMovie(id, movieId, direction);
    return NextResponse.json({ ok: true, list });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to reorder Watchlist movie." },
      { status: 503 }
    );
  }
}
