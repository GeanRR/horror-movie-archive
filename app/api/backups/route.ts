import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth/session";
import { createBackupSnapshot, listBackupSnapshots } from "@/lib/backups/db";

export async function GET() {
  await requireSession();

  try {
    const backups = await listBackupSnapshots();
    return NextResponse.json({ ok: true, backups });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to load backup snapshots." },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  await requireSession();

  const body = (await request.json().catch(() => null)) as {
    reason?: unknown;
  } | null;
  const reason =
    typeof body?.reason === "string" && body.reason.trim()
      ? body.reason.trim().slice(0, 80)
      : "manual";

  try {
    const backup = await createBackupSnapshot(reason);
    return NextResponse.json({ ok: true, backup }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to create backup snapshot." },
      { status: 503 }
    );
  }
}
