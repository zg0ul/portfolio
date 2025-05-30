// src/lib/admin-api-auth.ts - API Route Admin Authentication
import { cookies } from "next/headers";

export async function checkAdminAPIAuth() {
  try {
    const cookieStore = await cookies();
    // Check both possible cookie names
    const adminSession =
      cookieStore.get("admin-session")?.value ||
      cookieStore.get("admin-api-session")?.value;
    const expectedToken = process.env.ADMIN_SESSION_TOKEN?.replace(/"/g, "");

    if (!adminSession || !expectedToken || adminSession !== expectedToken) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("API Auth error:", error);
    return false;
  }
}

export function createUnauthorizedResponse() {
  return new Response(JSON.stringify({ error: "Unauthorized access" }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}
