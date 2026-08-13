import "server-only";

export const HPC_REPOSITORY =
  process.env.HPC_REPOSITORY?.trim() ||
  "UzayPoyrza/hpc-site-mockup-builder";

export const HPC_REPOSITORY_REF =
  process.env.HPC_REPOSITORY_REF?.trim() || "main";

export const HPC_GITHUB_TOKEN = process.env.HPC_GITHUB_TOKEN?.trim() || "";

export const HPC_REVIEW_PIN = process.env.HPC_REVIEW_PIN?.trim() || "";

export const HPC_DASHBOARD_ID =
  process.env.HPC_DASHBOARD_ID?.trim() || "hpc-sites";

export const HPC_SESSION_SECRET =
  process.env.HPC_SESSION_SECRET?.trim() || "";

export interface DashboardAccessEntry {
  pin: string;
  dashboardId: string;
}

function dashboardAccessEntries(): DashboardAccessEntry[] {
  const configuredMap = process.env.DASHBOARD_PIN_MAP?.trim();
  if (!configuredMap) {
    return [{ pin: HPC_REVIEW_PIN, dashboardId: HPC_DASHBOARD_ID }];
  }

  try {
    const parsed = JSON.parse(configuredMap) as Record<string, unknown>;
    return Object.entries(parsed).map(([pin, dashboardId]) => ({
      pin,
      dashboardId: typeof dashboardId === "string" ? dashboardId.trim() : "",
    }));
  } catch {
    return [];
  }
}

export const DASHBOARD_ACCESS_ENTRIES = dashboardAccessEntries();

export function getHpcConfigurationProblem() {
  if (
    DASHBOARD_ACCESS_ENTRIES.length === 0 ||
    DASHBOARD_ACCESS_ENTRIES.some(
      ({ pin, dashboardId }) =>
        !/^\d{4}$/.test(pin) || !/^[a-z0-9][a-z0-9-]{1,63}$/.test(dashboardId),
    )
  ) {
    return "Dashboard access must map four-digit PINs to valid dashboard IDs.";
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
