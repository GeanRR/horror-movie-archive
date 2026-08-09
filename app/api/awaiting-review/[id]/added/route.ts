import { NextResponse } from "next/server";
import { markAwaitingReviewItemAdded } from "@/lib/awaiting-review/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  try {
    await markAwaitingReviewItemAdded(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to update Awaiting Review item." },
      { status: 503 }
    );
  }
}
