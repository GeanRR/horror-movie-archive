import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_COOKIE_NAME,
  authCookieOptions,
  createSessionToken,
  getAuthConfigurationError,
  verifyPin,
} from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  const configurationError = getAuthConfigurationError();
  if (configurationError) {
    return NextResponse.json(
      { ok: false, error: configurationError },
      { status: 500 }
    );
  }

  const body = (await request.json().catch(() => null)) as {
    pin?: unknown;
  } | null;
  const pin = typeof body?.pin === "string" ? body.pin : "";

  if (!(await verifyPin(pin))) {
    return NextResponse.json({ ok: false, error: "Invalid PIN." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, await createSessionToken(), authCookieOptions());
  return response;
}
