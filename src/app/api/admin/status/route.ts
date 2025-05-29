import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get("admin-auth")?.value;

  if (!adminAuth) {
    return NextResponse.json({ authenticated: false });
  }

  // Verify timestamped token
  try {
    const [token, timestamp] = adminAuth.split(".");
    const sessionAge = Date.now() - parseInt(timestamp);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours

    if (token === "authenticated" && sessionAge < maxAge) {
      const remainingTime = maxAge - sessionAge;
      return NextResponse.json({
        authenticated: true,
        expiresIn: remainingTime,
        expiresAt: new Date(Date.now() + remainingTime).toISOString(),
      });
    }
  } catch {
    // Invalid token
  }

  // Invalid or expired session
  const response = NextResponse.json({ authenticated: false });
  response.cookies.delete("admin-auth");
  return response;
}
