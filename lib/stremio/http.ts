import { NextResponse } from "next/server";

export const STREMIO_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept",
  "Access-Control-Allow-Private-Network": "true",
  "Access-Control-Max-Age": "86400",
};

export function stremioJson<T>(body: T, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      ...STREMIO_CORS_HEADERS,
      ...init?.headers,
    },
  });
}

export function stremioOptions() {
  return new NextResponse(null, {
    status: 204,
    headers: STREMIO_CORS_HEADERS,
  });
}

export function stremioHead() {
  return new NextResponse(null, {
    status: 200,
    headers: STREMIO_CORS_HEADERS,
  });
}
