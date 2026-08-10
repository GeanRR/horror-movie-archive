import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { deleteMovie, updateMovie } from "@/lib/movies/db";
import type { LibraryMovie } from "@/store/movie-store";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  await requireSession();

  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    updates?: Partial<LibraryMovie>;
  } | null;

  try {
    const movie = await updateMovie(id, body?.updates ?? {});
    return NextResponse.json({ ok: true, movie });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to update movie." },
      { status: 503 }
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  await requireSession();

  const { id } = await context.params;
  try {
    await deleteMovie(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to delete movie." },
      { status: 503 }
    );
  }
}
