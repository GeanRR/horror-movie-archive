import { NextRequest, NextResponse } from "next/server";
import { reorderWatchlist } from "@/lib/watchlist/db";

export async function PATCH(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as {
    listId?: unknown;
    direction?: unknown;
  } | null;

  const listId = typeof body?.listId === "string" ? body.listId : "";
  const direction =
    body?.direction === "up" || body?.direction === "down"
      ? body.direction
      : null;

  if (!listId || !direction) {
    return NextResponse.json(
      { ok: false, error: "List id and direction are required." },
      { status: 400 }
    );
  }

  try {
    const lists = await reorderWatchlist(listId, direction);
    return NextResponse.json({ ok: true, lists });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to reorder Watchlists." },
      { status: 503 }
    );
  }
}
