import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ProjectCategory } from "@/lib/supabase/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as string | null;

    // Use server-side client for API routes
    const supabase = await createClient();

    let query = supabase.from("projects").select("*");

    // Filter by category if provided
    if (category && category !== "All") {
      query = query.eq("category", category as ProjectCategory);
    }

    // Order by display_order, then created_at
    const { data, error } = await query
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
