// src/lib/admin-auth.ts - Updated for path-based authentication
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin-session")?.value;
  const expectedToken = process.env.ADMIN_SESSION_TOKEN?.replace(/"/g, "");

  // Verify that we have both values and they match
  if (!adminSession || !expectedToken || adminSession !== expectedToken) {
    redirect("/not-found");
  }

  return true;
}

// Helper function to check if user has admin session (for conditional rendering)
export async function hasAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin-session")?.value;
    const expectedToken = process.env.ADMIN_SESSION_TOKEN?.replace(/"/g, "");

    return !!(adminSession && expectedToken && adminSession === expectedToken);
  } catch {
    return false;
  }
}


