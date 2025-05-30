// src/middleware.ts - Complete Path-Based Secret Implementation
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple in-memory rate limiter for admin access attempts
const adminAttempts = new Map<string, number[]>();
const MAX_ADMIN_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

// function isRateLimited(ip: string): boolean {
//   const now = Date.now();
//   const attempts = adminAttempts.get(ip) || [];

//   // Remove old attempts outside the window
//   const recentAttempts = attempts.filter(
//     (time) => now - time < RATE_LIMIT_WINDOW,
//   );

//   if (recentAttempts.length >= MAX_ADMIN_ATTEMPTS) {
//     console.warn(
//       `Admin access rate limited for IP: ${ip} (${recentAttempts.length} attempts)`,
//     );
//     return true;
//   }

//   return false;
// }

function recordAdminAttempt(ip: string): void {
  const now = Date.now();
  const attempts = adminAttempts.get(ip) || [];
  attempts.push(now);

  // Keep only recent attempts to prevent memory bloat
  const recentAttempts = attempts.filter(
    (time) => now - time < RATE_LIMIT_WINDOW,
  );
  adminAttempts.set(ip, recentAttempts);
}

function getClientIP(request: NextRequest): string {
  // Try multiple headers to get the real client IP
  const xForwardedFor = request.headers.get("x-forwarded-for");
  const xRealIP = request.headers.get("x-real-ip");
  const cfConnectingIP = request.headers.get("cf-connecting-ip"); // Cloudflare
  const xClientIP = request.headers.get("x-client-ip");

  if (cfConnectingIP) return cfConnectingIP.trim();
  if (xRealIP) return xRealIP.trim();
  if (xForwardedFor) return xForwardedFor.split(",")[0].trim();
  if (xClientIP) return xClientIP.trim();

  return "unknown";
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Dashboard route protection (existing functionality)
  if (path.startsWith("/dashboard/")) {
    const secret = path.split("/")[2];
    const dashboardSecret = process.env.NEXT_PUBLIC_DASHBOARD_SECRET;

    if (!secret || secret !== dashboardSecret) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // PATH-BASED SECRET ADMIN ACCESS
  if (path.startsWith("/admin")) {
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Rate limiting check
    // if (isRateLimited(clientIP)) {
    //   console.warn(`Rate limited admin access from IP: ${clientIP}`);
    //   return NextResponse.rewrite(new URL("/not-found", request.url));
    // }

    // Record this attempt for rate limiting
    recordAdminAttempt(clientIP);

    // Get environment variables
    const adminSecret = process.env.ADMIN_SECRET_KEY?.replace(/"/g, "") || "";
    const sessionToken =
      process.env.ADMIN_SESSION_TOKEN?.replace(/"/g, "") || "";

    if (!adminSecret || !sessionToken) {
      console.error(
        "Missing ADMIN_SECRET_KEY or ADMIN_SESSION_TOKEN environment variables",
      );
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }

    // Check for existing valid session cookie
    const authCookie = request.cookies.get("admin-session");
    if (authCookie?.value === sessionToken) {
      // Valid session exists, allow access to admin pages
      console.log(`Valid admin session from IP: ${clientIP}`);
      return NextResponse.next();
    }

    // Parse the path to check for secret
    const pathParts = path.split("/");
    // Expected format: /admin/your-secret-key or /admin/your-secret-key/subpage

    if (pathParts.length >= 3 && pathParts[2] === adminSecret) {
      // Valid secret provided in path
      console.log(
        `Valid admin secret provided from IP: ${clientIP}, User-Agent: ${userAgent}`,
      );

      // Determine the target admin page
      let redirectPath = "/admin"; // Default to admin dashboard

      // If there are additional path segments after the secret, preserve them
      if (pathParts.length > 3) {
        // /admin/secret/projects -> /admin/projects
        redirectPath = "/admin/" + pathParts.slice(3).join("/");
      }

      // Create redirect response to clean URL (remove secret from path)
      const cleanUrl = new URL(redirectPath, request.url);
      const response = NextResponse.redirect(cleanUrl);

      // Set secure authentication cookie
      response.cookies.set("admin-session", sessionToken, {
        httpOnly: true, // Prevent JavaScript access
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "strict", // CSRF protection
        maxAge: 24 * 60 * 60, // 24 hours
        path: "/admin", // Restrict cookie to admin paths only
      });

      // Set additional cookie for API access
      response.cookies.set("admin-api-session", sessionToken, {
        httpOnly: true, // Prevent JavaScript access
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "strict", // CSRF protection
        maxAge: 24 * 60 * 60, // 24 hours
        path: "/api", // For API routes
      });

      return response;
    }

    // No valid authentication found
    console.warn(
      `Unauthorized admin access attempt from IP: ${clientIP}, Path: ${path}, User-Agent: ${userAgent}`,
    );

    // Return 404 to hide the existence of admin panel
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  // Allow all other requests
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};

// USAGE EXAMPLES:
/*
1. First time access with secret:
   https://yoursite.com/admin/your-long-secret-key
   
2. Access specific admin page with secret:
   https://yoursite.com/admin/your-long-secret-key/projects
   https://yoursite.com/admin/your-long-secret-key/analytics
   
3. After authentication (clean URLs):
   https://yoursite.com/admin
   https://yoursite.com/admin/projects
   https://yoursite.com/admin/analytics
   
4. Session expires after 24 hours, then you need the secret again
*/
