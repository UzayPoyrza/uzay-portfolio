import { NextRequest, NextResponse } from "next/server";
import { requestHasHpcSession } from "@/lib/hpc/auth";
import {
  fetchHpcFile,
  isAllowedHpcFile,
  isFullGitSha,
} from "@/lib/hpc/github";

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".eot": "application/vnd.ms-fontobject",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function contentTypeFor(path: string) {
  const dot = path.lastIndexOf(".");
  const extension = dot === -1 ? "" : path.slice(dot).toLowerCase();
  return contentTypes[extension] || "application/octet-stream";
}

type RouteContext = {
  params: Promise<{ revision: string; path: string[] }>;
};

async function proxyHpcFile(
  request: NextRequest,
  context: RouteContext,
  includeBody: boolean,
) {
  if (!requestHasHpcSession(request)) {
    if (request.headers.get("sec-fetch-dest") === "document") {
      return NextResponse.redirect(new URL("/enter", request.url), 303);
    }
    return new NextResponse("Authentication required.", {
      status: 401,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const { revision, path: pathParts } = await context.params;
  const path = pathParts.join("/");

  if (!isFullGitSha(revision) || !isAllowedHpcFile(path)) {
    return new NextResponse("Not found.", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  try {
    const upstream = await fetchHpcFile(revision, path);
    if (upstream.status === 404) {
      return new NextResponse("Not found.", {
        status: 404,
        headers: { "Cache-Control": "no-store" },
      });
    }

    if (!upstream.ok) {
      console.error(`GitHub returned ${upstream.status} for ${path} at ${revision}.`);
      return new NextResponse("The preview asset is temporarily unavailable.", {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      });
    }

    const headers = new Headers({
      "Cache-Control": "private, no-store",
      // GitHub's raw Contents response advertises its API media type even when
      // the body is CSS, HTML, a font, or an image. With `nosniff` (which this
      // private surface deliberately uses), the browser would reject those
      // assets. The allowlisted path extension is the trustworthy MIME source.
      "Content-Type": contentTypeFor(path),
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    });

    return new NextResponse(includeBody ? upstream.body : null, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error(`Unable to load ${path} at ${revision}.`, error);
    return new NextResponse("The preview asset is temporarily unavailable.", {
      status: 502,
      headers: { "Cache-Control": "no-store" },
    });
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyHpcFile(request, context, true);
}

export async function HEAD(request: NextRequest, context: RouteContext) {
  return proxyHpcFile(request, context, false);
}
