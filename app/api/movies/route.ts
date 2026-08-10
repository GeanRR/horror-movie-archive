import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { getMovies, upsertMovie } from "@/lib/movies/db";
import type { LibraryMovie } from "@/store/movie-store";

export async function GET() {
  await requireSession();

  try {
    const movies = await getMovies();
    return NextResponse.json({ ok: true, movies });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to load movies." },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  await requireSession();

  const body = (await request.json().catch(() => null)) as {
    movie?: LibraryMovie;
  } | null;

  if (!body?.movie || typeof body.movie !== "object") {
    return NextResponse.json(
      { ok: false, error: "Movie is required." },
      { status: 400 }
    );
  }

  try {
    const movie = await upsertMovie(body.movie);
    return NextResponse.json({ ok: true, movie }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to save movie." },
      { status: 503 }
    );
  }
}
