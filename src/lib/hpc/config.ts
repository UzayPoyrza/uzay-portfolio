import "server-only";

export const HPC_REPOSITORY =
  process.env.HPC_REPOSITORY?.trim() ||
  "UzayPoyrza/hpc-site-mockup-builder";

export const HPC_REPOSITORY_REF =
  process.env.HPC_REPOSITORY_REF?.trim() || "main";

export const HPC_GITHUB_TOKEN = process.env.HPC_GITHUB_TOKEN?.trim() || "";

export const HPC_REVIEW_PIN = process.env.HPC_REVIEW_PIN?.trim() || "";

export const HPC_SESSION_SECRET =
  process.env.HPC_SESSION_SECRET?.trim() || "";

export function getHpcConfigurationProblem() {
  if (!/^\d{4}$/.test(HPC_REVIEW_PIN)) {
    return "HPC_REVIEW_PIN must be a four-digit PIN.";
  }

  if (HPC_SESSION_SECRET.length < 32) {
    return "HPC_SESSION_SECRET must contain at least 32 characters.";
  }

  if (!HPC_GITHUB_TOKEN) {
    return "HPC_GITHUB_TOKEN is required to read the private mockup repository.";
  }

  if (!/^[^/\s]+\/[^/\s]+$/.test(HPC_REPOSITORY)) {
    return "HPC_REPOSITORY must use the owner/repository format.";
  }

  return null;
}
