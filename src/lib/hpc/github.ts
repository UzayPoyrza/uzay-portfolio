import "server-only";

import {
  getHpcConfigurationProblem,
  HPC_GITHUB_TOKEN,
  HPC_REPOSITORY,
  HPC_REPOSITORY_REF,
} from "@/lib/hpc/config";

const GITHUB_API = "https://api.github.com";
const GITHUB_API_VERSION = "2022-11-28";

export interface HpcRevision {
  sha: string;
  shortSha: string;
  message: string;
  committedAt: string;
  author: string;
  ref: string;
}

function githubHeaders(accept = "application/vnd.github+json") {
  return {
    Accept: accept,
    Authorization: `Bearer ${HPC_GITHUB_TOKEN}`,
    "User-Agent": "uzay.dev-hpc-review",
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
  };
}

function encodedRepositoryPath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

export function isFullGitSha(value: string) {
  return /^[a-f0-9]{40}$/i.test(value);
}

export function isAllowedHpcFile(path: string) {
  if (!path || path.length > 500 || path.includes("\\")) return false;

  const pieces = path.split("/");
  if (pieces.some((piece) => !piece || piece === "." || piece === "..")) {
    return false;
  }

  return (
    path.startsWith("viewer/") &&
      !path.startsWith("viewer/verification/") &&
      !path.startsWith("viewer/context/")
  ) || path.startsWith("mockups/") ||
    path.startsWith("reference/cuit/2026-08-06/assets/");
}

export async function getLatestHpcRevision(): Promise<HpcRevision> {
  const problem = getHpcConfigurationProblem();
  if (problem) throw new Error(problem);

  const response = await fetch(
    `${GITHUB_API}/repos/${HPC_REPOSITORY}/commits/${encodeURIComponent(HPC_REPOSITORY_REF)}`,
    {
      cache: "no-store",
      headers: githubHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status} while checking the latest mockup revision.`);
  }

  const data = await response.json();
  const sha = typeof data.sha === "string" ? data.sha : "";
  if (!isFullGitSha(sha)) throw new Error("GitHub returned an invalid mockup revision.");

  const message = typeof data.commit?.message === "string"
    ? data.commit.message.split("\n")[0]
    : "Mockup update";

  return {
    sha,
    shortSha: sha.slice(0, 7),
    message,
    committedAt: data.commit?.committer?.date || data.commit?.author?.date || "",
    author: data.commit?.author?.name || data.author?.login || "Uzay Poyraz",
    ref: HPC_REPOSITORY_REF,
  };
}

export async function fetchHpcFile(revision: string, path: string) {
  const problem = getHpcConfigurationProblem();
  if (problem) throw new Error(problem);
  if (!isFullGitSha(revision)) throw new Error("Invalid mockup revision.");
  if (!isAllowedHpcFile(path)) throw new Error("That file is outside the hosted mockup surface.");

  return fetch(
    `${GITHUB_API}/repos/${HPC_REPOSITORY}/contents/${encodedRepositoryPath(path)}?ref=${revision}`,
    {
      cache: "force-cache",
      headers: githubHeaders("application/vnd.github.raw+json"),
      next: { revalidate: 31_536_000 },
    },
  );
}
