import type { Metadata } from "next";
import { redirect } from "next/navigation";
import HpcDashboard from "@/components/hpc/HpcDashboard";
import { getDashboardSession } from "@/lib/hpc/auth";
import { HPC_DASHBOARD_ID } from "@/lib/hpc/config";
import "@/app/hpc/hpc.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard · Uzay.dev",
  description: "Private tools workspace.",
  robots: { index: false, follow: false, nocache: true },
};

export default async function DashboardPage() {
  const session = await getDashboardSession();
  if (!session) redirect("/enter");

  const hasHpcTool = session.dashboardId === HPC_DASHBOARD_ID;
  return (
    <HpcDashboard
      dashboardId={session.dashboardId}
      hasHpcTool={hasHpcTool}
    />
  );
}
