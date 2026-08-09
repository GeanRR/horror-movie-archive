import { NextResponse } from "next/server";
import { ignoreAwaitingReviewItem } from "@/lib/awaiting-review/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  try {
    await ignoreAwaitingReviewItem(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to ignore Awaiting Review item." },
      { status: 503 }
    );
  }
}
