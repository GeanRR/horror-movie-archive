import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const AUTH_COOKIE_NAME = "hma_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function getPin() {
  return process.env.APP_PIN?.trim() ?? "";
}

function getSecret() {
  return process.env.APP_SESSION_SECRET?.trim() ?? "";
}

export function getAuthConfigurationError() {
  if (!getPin()) return "APP_PIN is not configured.";
  if (process.env.NODE_ENV === "production" && !getSecret()) {
    return "APP_SESSION_SECRET is not configured.";
  }
  return null;
}

function getSigningSecret() {
  const secret = getSecret();
  if (secret) return secret;

  if (process.env.NODE_ENV !== "production") return getPin();
  throw new Error("APP_SESSION_SECRET is required in production.");
}

function encoder() {
  return new TextEncoder();
}

function bytesToBase64Url(bytes: ArrayBuffer) {
  const binary = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function signPayload(payload: string) {
  const secret = getSigningSecret();
  if (!secret) return "";

  const key = await crypto.subtle.importKey(
    "raw",
    encoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder().encode(payload)
  );

  return bytesToBase64Url(signature);
}

export function isAuthConfigured() {
  return !getAuthConfigurationError();
}

export async function verifyPin(pin: string) {
  const configuredPin = getPin();
  return Boolean(configuredPin) && pin === configuredPin;
}

export async function createSessionToken() {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const nonce = crypto.randomUUID();
  const payload = `${expiresAt}.${nonce}`;
  const signature = await signPayload(payload);

  return `${payload}.${signature}`;
}

export async function isValidSessionToken(token?: string | null) {
  if (!token || !isAuthConfigured()) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [expiresAtRaw, nonce, signature] = parts;
  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;
  if (!nonce || !signature) return false;

  const expectedSignature = await signPayload(`${expiresAtRaw}.${nonce}`);
  return signature === expectedSignature;
}

export async function hasValidSession(request: NextRequest) {
  return isValidSessionToken(request.cookies.get(AUTH_COOKIE_NAME)?.value);
}

export async function requireSession() {
  const cookieStore = await cookies();
  const valid = await isValidSessionToken(cookieStore.get(AUTH_COOKIE_NAME)?.value);
  if (!valid) {
    throw new Error("Unauthorized");
  }
}

export function authCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
