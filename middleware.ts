import { type NextRequest, NextResponse } from "next/server";
import { hasValidSession } from "@/lib/auth/session";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldSkipPinAuth(request)) {
    return NextResponse.next({ request });
  }

  if (!(await hasValidSession(request))) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized." },
        { status: 401 }
      );
    }

    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isSupabaseConfigured()) {
    return updateSession(request);
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

function isAuthorizedCronRequest(request: NextRequest) {
  if (request.nextUrl.pathname !== "/api/backups/cron") return false;

  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return true;

  return request.headers.get("authorization") === `Bearer ${secret}`;
}

function shouldSkipPinAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;

  return (
    pathname === "/login" ||
    isAuthorizedCronRequest(request) ||
    pathname.startsWith("/api/auth/") ||
    pathname === "/api/stremio/manifest.json" ||
    pathname.startsWith("/api/stremio/catalog/")
  );
}
