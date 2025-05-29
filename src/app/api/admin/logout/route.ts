import { NextResponse } from "next/server";

export async function POST() {
  // Clear the admin authentication cookie
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.delete("admin-auth");

  return response;
}

export async function GET() {
  // Also support GET for direct logout URL
  const response = NextResponse.redirect(
    new URL("/", process.env.NEXTAUTH_URL || "http://localhost:3000"),
  );

  response.cookies.delete("admin-auth");

  return response;
}
