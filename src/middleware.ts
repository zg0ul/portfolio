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

  // HIDDEN ADMIN SYSTEM - Completely invisible to unauthorized users
  if (path.startsWith("/admin")) {
    const authCookie = request.cookies.get("admin-auth");
    const secretParam = url.searchParams.get("secret");
    const adminSecret = process.env.ADMIN_SECRET_KEY?.replace(/"/g, "");

    // Get client IP for additional security
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIP = request.headers.get("x-real-ip");
    const clientIP = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIP || "unknown";

    // Allowed IPs (customize for your needs)
    const allowedIPs = [
      "192.168.1.121",
      // Add your production IPs here
    ];

    // In development, allow local network access
    const isDevelopment = process.env.NODE_ENV === "development";
    const isAllowedIP =
      isDevelopment ||
      allowedIPs.includes(clientIP) ||
      clientIP.startsWith("192.168.") ||
      clientIP.startsWith("10.") ||
      clientIP.startsWith("172.");

    // If IP is not allowed, show 404 but keep the URL
    if (!isAllowedIP) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }

    // Check if already authenticated
    if (authCookie?.value === "authenticated") {
      return NextResponse.next();
    }

    // If secret parameter is provided and matches
    if (secretParam && secretParam === adminSecret) {
      // Set authentication cookie and redirect to clean admin URL
      const response = NextResponse.redirect(new URL("/admin", request.url));
      response.cookies.set("admin-auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60, // 24 hours
      });
      return response;
    }

    // No valid authentication, show 404 but keep the admin URL
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
