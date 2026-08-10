import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import {
  addReleaseCalendarMovies,
  getReleaseCalendarMovies,
} from "@/lib/release-calendar/db";
import type { WatchlistMovie } from "@/store/movie-store";

export async function GET() {
  await requireSession();

  try {
    const movies = await getReleaseCalendarMovies();
    return NextResponse.json({ ok: true, movies });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to load Release Calendar." },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  await requireSession();

  const body = (await request.json().catch(() => null)) as {
    movies?: WatchlistMovie[];
  } | null;

  try {
    const movies = await addReleaseCalendarMovies(
      Array.isArray(body?.movies) ? body.movies : []
    );
    return NextResponse.json({ ok: true, movies });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to save Release Calendar." },
      { status: 503 }
    );
  }
}
