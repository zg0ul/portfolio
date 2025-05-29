import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    // Update the most recent page view with duration and bounce data
    const { error } = await supabase
      .from("page_views")
      .update({
        duration: data.duration,
        is_bounce: data.is_bounce,
      })
      .eq("session_id", data.session_id)
      .eq("visitor_id", data.visitor_id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("Error updating page view:", error);
      return NextResponse.json(
        { error: "Failed to update page view" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Page exit tracking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
