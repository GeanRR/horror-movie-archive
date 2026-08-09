import { NextRequest, NextResponse } from "next/server";
import { deleteWatchlist, updateWatchlist } from "@/lib/watchlist/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const body = (await request.json().catch(() => null)) as {
    name?: unknown;
  } | null;
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!name) {
    return NextResponse.json(
      { ok: false, error: "List name is required." },
      { status: 400 }
    );
  }

  try {
    const list = await updateWatchlist(id, name);
    return NextResponse.json({ ok: true, list });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to update Watchlist." },
      { status: 503 }
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  try {
    await deleteWatchlist(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to delete Watchlist." },
      { status: 503 }
    );
  }
}
