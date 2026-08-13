import "server-only";

import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getHpcConfigurationProblem,
  HPC_REVIEW_PIN,
  HPC_SESSION_SECRET,
} from "@/lib/hpc/config";

export const HPC_SESSION_COOKIE = "hpc_review_session";
export const HPC_LAST_REVISION_COOKIE = "hpc_last_revision";

const SESSION_DURATION_SECONDS = 8 * 60 * 60;
const TOKEN_VERSION = "v1";

function sign(value: string) {
  return createHmac("sha256", HPC_SESSION_SECRET).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) return false;
  return timingSafeEqual(aBuffer, bBuffer);
}

export function pinMatches(suppliedPin: string) {
  if (getHpcConfigurationProblem()) return false;
  return safeEqual(suppliedPin, HPC_REVIEW_PIN);
}

export function createSessionToken(now = Date.now()) {
  const expiresAt = Math.floor(now / 1000) + SESSION_DURATION_SECONDS;
  const payload = [TOKEN_VERSION, expiresAt, randomBytes(16).toString("base64url")].join(".");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token?: string | null, now = Date.now()) {
  if (!token || getHpcConfigurationProblem()) return false;

  const pieces = token.split(".");
  if (pieces.length !== 4) return false;

  const [version, expiresAtText, nonce, signature] = pieces;
  if (version !== TOKEN_VERSION || !nonce || !signature) return false;

  const expiresAt = Number(expiresAtText);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(now / 1000)) {
    return false;
  }

  return safeEqual(signature, sign([version, expiresAtText, nonce].join(".")));
}

export async function hasHpcSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(HPC_SESSION_COOKIE)?.value);
}

export function requestHasHpcSession(request: NextRequest) {
  return verifySessionToken(request.cookies.get(HPC_SESSION_COOKIE)?.value);
}

export function setHpcSessionCookie(response: NextResponse) {
  response.cookies.set(HPC_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    maxAge: SESSION_DURATION_SECONDS,
    path: "/hpc",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearHpcSessionCookies(response: NextResponse) {
  response.cookies.set(HPC_SESSION_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/hpc",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  response.cookies.set(HPC_LAST_REVISION_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/hpc",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}

export function isSameOriginRequest(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";

  try {
    return new URL(origin).origin === request.nextUrl.origin;
  } catch {
    return false;
  }
}
