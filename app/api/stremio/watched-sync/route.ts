import { NextResponse } from "next/server";
import {
  getStremioWatchedSyncState,
  runStremioWatchedSync,
} from "@/lib/stremio/watched-sync";
import type { ExistingMovieIdentity } from "@/lib/awaiting-review/db";
import { getMovieIdentities } from "@/lib/movies/db";

export async function GET() {
  try {
    const result = await getStremioWatchedSyncState();
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        ok: false,
        state: {
          configured: false,
          lastSyncedAt: null,
          lastSyncError: "Unable to load Stremio sync state.",
        },
      },
      { status: 503 }
    );
  }
}

function parseExistingMovies(value: unknown): ExistingMovieIdentity[] {
  if (!Array.isArray(value)) return [];

  const movies: ExistingMovieIdentity[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const candidate = item as Record<string, unknown>;

    movies.push({
      imdbId: typeof candidate.imdbId === "string" ? candidate.imdbId : null,
      tmdbId:
        typeof candidate.tmdbId === "number" && Number.isFinite(candidate.tmdbId)
          ? candidate.tmdbId
          : null,
    });
  }

  return movies;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as {
      existingMovies?: unknown;
    } | null;

    const existingMovies = body?.existingMovies
      ? parseExistingMovies(body.existingMovies)
      : await getMovieIdentities();

    const result = await runStremioWatchedSync(existingMovies);
    return NextResponse.json(result, { status: result.ok ? 200 : 503 });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to sync Stremio watched state.",
        scanned: 0,
        trackedMovies: 0,
        newlyWatched: [],
        workflowSummary: {
          queuedMovies: 0,
          alreadyQueuedMovies: 0,
          alreadyInLibraryMovies: 0,
          removedWatchlistItems: 0,
        },
      },
      { status: 503 }
    );
  }
}
