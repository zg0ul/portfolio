import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get("admin-auth")?.value;

  if (!adminAuth || adminAuth !== "authenticated") {
    redirect("/not-found");
  }

  return true;
}
