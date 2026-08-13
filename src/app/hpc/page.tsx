import { redirect } from "next/navigation";
import { getDashboardSession } from "@/lib/hpc/auth";

export const dynamic = "force-dynamic";

export default async function LegacyHpcPage() {
  redirect((await getDashboardSession()) ? "/dashboard" : "/enter");
}
