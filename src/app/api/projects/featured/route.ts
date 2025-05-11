import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    // Use server-side client for API routes
    const supabase = await createClient();

    // Query only featured projects
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured projects" },
      { status: 500 },
    );
  }
}
