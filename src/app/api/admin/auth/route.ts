import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Handle logout (DELETE method only - no login needed)
export async function DELETE() {
  try {
    // Logout - clear the admin auth cookie
    const cookieStore = await cookies();
    cookieStore.delete("admin-auth");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
