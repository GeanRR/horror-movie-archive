import { NextRequest, NextResponse } from "next/server";
import { createBackupSnapshot } from "@/lib/backups/db";

function isAuthorizedCron(request: NextRequest) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return true;

  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const backup = await createBackupSnapshot("scheduled-weekly");
    return NextResponse.json({ ok: true, backup });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to create scheduled backup." },
      { status: 503 }
    );
  }
}
