import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { EmergencyClient } from "@/components/emergency/emergency-client";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Emergency Plumbing — Plumbflow",
  description: "24/7 emergency plumbing dispatch. Burst pipes, flooding, sewage backup. Average 20-minute technician arrival.",
};

export default async function EmergencyPage() {
  const headerList = await headers();
  const session = await auth.api.getSession({ headers: headerList });
  return <EmergencyClient session={session} />;
}
