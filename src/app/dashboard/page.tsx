import type { Metadata } from "next";
import { redirect } from "next/navigation";
import HpcDashboard from "@/components/hpc/HpcDashboard";
import { getDashboardSession } from "@/lib/hpc/auth";
import { HPC_DASHBOARD_ID } from "@/lib/hpc/config";
import { getLatestHpcRevision } from "@/lib/hpc/github";
import "@/app/hpc/hpc.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard · Uzay.dev",
  description: "Private tools workspace.",
  robots: { index: false, follow: false, nocache: true },
};

type PageProps = {
  searchParams: Promise<{ sync?: string }>;
};

export default async function DashboardPage({ searchParams }: PageProps) {
  const session = await getDashboardSession();
  if (!session) redirect("/enter");

  // The signed session owns dashboard selection. Additional dashboard IDs can
  // receive their own tool registry here without changing the public route.
  if (session.dashboardId !== HPC_DASHBOARD_ID) redirect("/enter");

  let revision = null;
  try {
    revision = await getLatestHpcRevision();
  } catch (error) {
    console.error("Unable to load dashboard source status.", error);
  }

  const { sync } = await searchParams;
  return (
    <HpcDashboard
      dashboardId={session.dashboardId}
      revision={revision}
      syncUnavailable={sync === "unavailable" || revision === null}
    />
  );
}
