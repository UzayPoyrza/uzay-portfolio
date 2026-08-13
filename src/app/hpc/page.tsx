import type { Metadata } from "next";
import HpcDashboard from "@/components/hpc/HpcDashboard";
import PinGate from "@/components/hpc/PinGate";
import { hasHpcSession } from "@/lib/hpc/auth";
import { getLatestHpcRevision } from "@/lib/hpc/github";
import "./hpc.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "HPC Review Workspace · Uzay.dev",
  description: "Private HPC Sites mockup review workspace.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

type PageProps = {
  searchParams: Promise<{ sync?: string }>;
};

export default async function HpcPage({ searchParams }: PageProps) {
  const authenticated = await hasHpcSession();
  if (!authenticated) return <PinGate />;

  let revision = null;
  try {
    revision = await getLatestHpcRevision();
  } catch (error) {
    console.error("Unable to load HPC dashboard source status.", error);
  }

  const { sync } = await searchParams;
  return (
    <HpcDashboard
      revision={revision}
      syncUnavailable={sync === "unavailable" || revision === null}
    />
  );
}
