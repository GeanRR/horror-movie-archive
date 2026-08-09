import { NextRequest, NextResponse } from "next/server";
import { removeMovieFromWatchlist } from "@/lib/watchlist/db";

type RouteContext = {
  params: Promise<{ id: string; movieId: string }>;
};

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { id, movieId } = await context.params;
  try {
    const list = await removeMovieFromWatchlist(id, movieId);
    return NextResponse.json({ ok: true, list });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to remove movie from Watchlist." },
      { status: 503 }
    );
  }
}
