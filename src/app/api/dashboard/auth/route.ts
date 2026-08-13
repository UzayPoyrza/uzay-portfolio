import { NextRequest, NextResponse } from "next/server";
import {
  clearHpcSessionCookies,
  dashboardIdForPin,
  isSameOriginRequest,
  setHpcSessionCookie,
} from "@/lib/hpc/auth";
import { getHpcConfigurationProblem } from "@/lib/hpc/config";

const noStoreHeaders = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { ok: false, error: "Request refused." },
      { status: 403, headers: noStoreHeaders },
    );
  }

  const configurationProblem = getHpcConfigurationProblem();
  if (configurationProblem) {
    console.error(`Dashboard configuration error: ${configurationProblem}`);
    return NextResponse.json(
      { ok: false, error: "This private workspace is temporarily unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }

  let pin = "";
  try {
    const body = await request.json();
    pin = typeof body.pin === "string" ? body.pin : "";
  } catch {
    return NextResponse.json(
      { ok: false, error: "Enter the four-digit PIN." },
      { status: 400, headers: noStoreHeaders },
    );
  }

  const dashboardId = /^\d{4}$/.test(pin) ? dashboardIdForPin(pin) : null;
  if (!dashboardId) {
    return NextResponse.json(
      { ok: false, error: "That PIN didn’t match. Try again." },
      { status: 401, headers: noStoreHeaders },
    );
  }

  const response = NextResponse.json(
    { ok: true },
    { status: 200, headers: noStoreHeaders },
  );
  setHpcSessionCookie(response, dashboardId);
  return response;
}

export async function DELETE(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { ok: false, error: "Request refused." },
      { status: 403, headers: noStoreHeaders },
    );
  }

  const response = NextResponse.json(
    { ok: true },
    { status: 200, headers: noStoreHeaders },
  );
  clearHpcSessionCookies(response);
  return response;
}
