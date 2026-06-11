import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { HomeClient } from "@/components/home/home-client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const headerList = await headers();
  const session = await auth.api.getSession({
    headers: headerList,
  });

  return <HomeClient session={session} />;
}
