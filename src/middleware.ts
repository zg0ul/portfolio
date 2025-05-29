import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Dashboard route protection (existing)
  if (path.startsWith("/dashboard/")) {
    const secret = path.split("/")[2];
    const dashboardSecret = process.env.NEXT_PUBLIC_DASHBOARD_SECRET;

    if (!secret || secret !== dashboardSecret) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Management system route protection - configurable path
  const adminPath = process.env.ADMIN_PATH || "/mgmt-panel";
  if (path.startsWith(adminPath)) {
    const authCookie = request.cookies.get("admin-auth");
    const secretParam = url.searchParams.get("secret");
    const adminSecret = process.env.ADMIN_SECRET_KEY?.replace(/"/g, "");

    // Enhanced security headers and logging
    const userAgent = request.headers.get("user-agent") || "";
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIP = request.headers.get("x-real-ip");
    const clientIP = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIP || "unknown";

    // Security: Block known bot patterns
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /wget/i,
      /curl/i,
      /python/i,
      /php/i,
    ];

    const isSuspiciousAgent = suspiciousPatterns.some((pattern) =>
      pattern.test(userAgent),
    );

    // If suspicious activity or no admin secret configured, show 404
    if (isSuspiciousAgent || !adminSecret) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }

    // Check if already authenticated with valid session
    if (authCookie?.value) {
      // Verify the auth cookie format (should be timestamped)
      try {
        const [token, timestamp] = authCookie.value.split(".");
        const sessionAge = Date.now() - parseInt(timestamp);
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in ms

        if (token === "authenticated" && sessionAge < maxAge) {
          // Valid session, continue
          return NextResponse.next();
        } else {
          // Expired session, clear cookie
          const response = NextResponse.rewrite(
            new URL("/not-found", request.url),
          );
          response.cookies.delete("admin-auth");
          return response;
        }
      } catch {
        // Invalid cookie format, clear it
        const response = NextResponse.rewrite(
          new URL("/not-found", request.url),
        );
        response.cookies.delete("admin-auth");
        return response;
      }
    }

    // If secret parameter is provided and matches
    if (secretParam && secretParam === adminSecret) {
      console.log(`✅ Admin authenticated from IP: ${clientIP}`);

      // Create timestamped auth token
      const timestamp = Date.now().toString();
      const authValue = `authenticated.${timestamp}`;

      // Set secure authentication cookie and redirect to clean admin URL
      const response = NextResponse.redirect(new URL(adminPath, request.url));
      response.cookies.set("admin-auth", authValue, {
        httpOnly: true,
        secure: true, // Always secure in production
        sameSite: "strict",
        maxAge: 24 * 60 * 60, // 24 hours
        path: adminPath, // Limit cookie scope to admin routes
      });

      return response;
    }

    // Security: Log unauthorized attempts for monitoring
    if (secretParam && secretParam !== adminSecret) {
      console.warn(
        `🚨 Invalid admin secret attempt from IP: ${clientIP}, UA: ${userAgent}`,
      );
    }

    // No valid authentication, show 404 (completely invisible)
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/mgmt-panel/:path*"],
};
