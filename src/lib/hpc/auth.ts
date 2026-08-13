import "server-only";

import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import type { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  DASHBOARD_ACCESS_ENTRIES,
  getHpcConfigurationProblem,
  HPC_DASHBOARD_ID,
  HPC_SESSION_SECRET,
} from "@/lib/hpc/config";

export const HPC_SESSION_COOKIE = "uzay_dashboard_session";
const LEGACY_HPC_SESSION_COOKIE = "hpc_review_session";
export const HPC_LAST_REVISION_COOKIE = "hpc_last_revision";

const SESSION_DURATION_SECONDS = 8 * 60 * 60;
const TOKEN_VERSION = "v2";

export interface DashboardSession {
  dashboardId: string;
}

function sign(value: string) {
  return createHmac("sha256", HPC_SESSION_SECRET).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) return false;
  return timingSafeEqual(aBuffer, bBuffer);
}

export function dashboardIdForPin(suppliedPin: string) {
  if (getHpcConfigurationProblem()) return null;

  let dashboardId: string | null = null;
  for (const entry of DASHBOARD_ACCESS_ENTRIES) {
    if (safeEqual(suppliedPin, entry.pin)) dashboardId = entry.dashboardId;
  }
  return dashboardId;
}

export function createSessionToken(dashboardId: string, now = Date.now()) {
  const expiresAt = Math.floor(now / 1000) + SESSION_DURATION_SECONDS;
  const encodedDashboardId = Buffer.from(dashboardId).toString("base64url");
  const payload = [
    TOKEN_VERSION,
    expiresAt,
    randomBytes(16).toString("base64url"),
    encodedDashboardId,
  ].join(".");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(
  token?: string | null,
  now = Date.now(),
): DashboardSession | null {
  if (!token || getHpcConfigurationProblem()) return null;

  const pieces = token.split(".");
  if (pieces.length !== 5) return null;

  const [version, expiresAtText, nonce, encodedDashboardId, signature] = pieces;
  if (version !== TOKEN_VERSION || !nonce || !encodedDashboardId || !signature) {
    return null;
  }

  const expiresAt = Number(expiresAtText);
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(now / 1000)) {
    return null;
  }

  const payload = [version, expiresAtText, nonce, encodedDashboardId].join(".");
  if (!safeEqual(signature, sign(payload))) return null;

  let dashboardId = "";
  try {
    dashboardId = Buffer.from(encodedDashboardId, "base64url").toString("utf8");
  } catch {
    return null;
  }

  if (!DASHBOARD_ACCESS_ENTRIES.some((entry) => entry.dashboardId === dashboardId)) {
    return null;
  }

  return { dashboardId };
}

export async function getDashboardSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(HPC_SESSION_COOKIE)?.value);
}

export function requestHasHpcSession(request: NextRequest) {
  const session = verifySessionToken(request.cookies.get(HPC_SESSION_COOKIE)?.value);
  return session?.dashboardId === HPC_DASHBOARD_ID;
}

export function setHpcSessionCookie(
  response: NextResponse,
  dashboardId: string,
) {
  response.cookies.set(HPC_SESSION_COOKIE, createSessionToken(dashboardId), {
    httpOnly: true,
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  response.cookies.set(LEGACY_HPC_SESSION_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/hpc",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearHpcSessionCookies(response: NextResponse) {
  response.cookies.set(HPC_SESSION_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  response.cookies.set(LEGACY_HPC_SESSION_COOKIE, "", {
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
