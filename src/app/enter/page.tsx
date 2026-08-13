import type { Metadata } from "next";
import { redirect } from "next/navigation";
import PinGate from "@/components/hpc/PinGate";
import { getDashboardSession } from "@/lib/hpc/auth";
import "@/app/hpc/hpc.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Enter · Uzay.dev",
  description: "Enter a PIN to access a private workspace.",
  robots: { index: false, follow: false, nocache: true },
};

export default async function EnterPage() {
  if (await getDashboardSession()) redirect("/dashboard");
  return <PinGate />;
}
