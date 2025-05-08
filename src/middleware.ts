import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the path and check if it's the dashboard route
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // If the path starts with /dashboard/ check the secret key
  if (path.startsWith("/dashboard/")) {
    const secret = path.split("/")[2]; // Extract the secret key from the URL
    const dashboardSecret = process.env.NEXT_PUBLIC_DASHBOARD_SECRET;

    // If the secret doesn't match, redirect to home
    if (!secret || secret !== dashboardSecret) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

// Only run middleware on dashboard routes
export const config = {
  matcher: "/dashboard/:path*",
};
