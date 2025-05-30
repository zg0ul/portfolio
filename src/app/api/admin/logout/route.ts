import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Clear the admin session cookie with the same attributes used when setting it
    response.cookies.set("admin-session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Expire immediately
      path: "/admin", // Same path restriction as when setting
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}

// Also support GET for simple logout links
export async function GET(request: Request) {
  try {
    // Get the current URL's origin and redirect to home page
    const url = new URL(request.url);
    const response = NextResponse.redirect(new URL("/", url.origin));

    // Clear the admin session cookie
    response.cookies.set("admin-session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/admin",
    });

    return response;
  } catch {
    const url = new URL(request.url);
    return NextResponse.redirect(new URL("/", url.origin));
  }
}
