import { NextResponse } from "next/server";
import { getAwaitingReviewQueue } from "@/lib/awaiting-review/db";

export async function GET() {
  try {
    const items = await getAwaitingReviewQueue();
    return NextResponse.json({ ok: true, items });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to load Awaiting Review." },
      { status: 503 }
    );
  }
}
