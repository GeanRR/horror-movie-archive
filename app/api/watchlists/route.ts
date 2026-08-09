import { NextRequest, NextResponse } from "next/server";
import { createWatchlist, getWatchlists } from "@/lib/watchlist/db";

export async function GET() {
  try {
    const lists = await getWatchlists();
    return NextResponse.json({ ok: true, lists });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to load Watchlists." },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
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
    const list = await createWatchlist(name);
    return NextResponse.json({ ok: true, list }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to create Watchlist." },
      { status: 503 }
    );
  }
}
