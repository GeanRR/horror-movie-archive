import { NextRequest, NextResponse } from "next/server";
import { migrateWatchlists } from "@/lib/watchlist/db";
import type { WatchlistInput } from "@/lib/watchlist/types";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as {
    lists?: unknown;
  } | null;

  const lists = Array.isArray(body?.lists)
    ? (body.lists as WatchlistInput[])
    : [];

  try {
    const migratedLists = await migrateWatchlists(lists);
    return NextResponse.json({ ok: true, lists: migratedLists });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to migrate Watchlists." },
      { status: 503 }
    );
  }
}
