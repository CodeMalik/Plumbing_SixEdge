import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { HowItWorksClient } from "@/components/how-it-works/how-it-works-client";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How It Works — Plumbflow",
  description: "Learn how to find, hire, and rate a licensed plumber using the Plumbflow platform. Clear pricing, step-by-step guide.",
};

export default async function HowItWorksPage() {
  const headerList = await headers();
  const session = await auth.api.getSession({ headers: headerList });
  return <HowItWorksClient session={session} />;
}
