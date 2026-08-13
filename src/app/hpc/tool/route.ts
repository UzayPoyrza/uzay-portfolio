import { NextRequest, NextResponse } from "next/server";
import {
  HPC_LAST_REVISION_COOKIE,
  requestHasHpcSession,
} from "@/lib/hpc/auth";
import { getLatestHpcRevision, isFullGitSha } from "@/lib/hpc/github";

export async function GET(request: NextRequest) {
  if (!requestHasHpcSession(request)) {
    return NextResponse.redirect(new URL("/hpc", request.url), 303);
  }

  let revision = "";
  let usingFallback = false;

  try {
    revision = (await getLatestHpcRevision()).sha;
  } catch (error) {
    console.error("Unable to resolve the latest HPC mockup revision.", error);
    const previousRevision = request.cookies.get(HPC_LAST_REVISION_COOKIE)?.value || "";
    if (isFullGitSha(previousRevision)) {
      revision = previousRevision;
      usingFallback = true;
    }
  }

  if (!revision) {
    const unavailable = new URL("/hpc", request.url);
    unavailable.searchParams.set("sync", "unavailable");
    return NextResponse.redirect(unavailable, 303);
  }

  const target = new URL(
    `/hpc/tool/${revision}/viewer/index.html`,
    request.url,
  );
  if (usingFallback) target.searchParams.set("snapshot", "previous");

  const response = NextResponse.redirect(target, 303);
  response.cookies.set(HPC_LAST_REVISION_COOKIE, revision, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60,
    path: "/hpc",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  return response;
}
