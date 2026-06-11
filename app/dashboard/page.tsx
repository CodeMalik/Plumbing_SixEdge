import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardContent } from "./dashboard-content";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const headerList = await headers();
  const session = await auth.api.getSession({
    headers: headerList,
  });

  // Guard: If not logged in, redirect to admin login
  if (!session) {
    redirect("/admin/login");
  }

  // Guard: If not admin, redirect to homepage (unauthorized)
  if (session.user.role !== "admin") {
    redirect("/");
  }

  return <DashboardContent user={{
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  }} />;
}
