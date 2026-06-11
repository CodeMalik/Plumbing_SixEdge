import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { FindPlumbersClient } from "@/components/find-plumbers/find-plumbers-client";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find Plumbers — Plumbflow",
  description: "Browse licensed, verified local plumbing specialists. Filter by specialty, check ratings, and hire instantly.",
};

export default async function FindPlumbersPage() {
  const headerList = await headers();
  const session = await auth.api.getSession({ headers: headerList });
  return <FindPlumbersClient session={session} />;
}
