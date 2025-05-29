import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const supabase = await createClient();

    // Get IP address
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : request.headers.get("x-real-ip") || "unknown";

    // Insert project view
    const { error } = await supabase.from("project_views").insert({
      project_slug: data.project_slug,
      project_title: data.project_title,
      visitor_id: data.visitor_id,
      session_id: data.session_id,
      ip_address: ip,
      referrer: data.referrer,
      user_agent: data.user_agent,
    });

    if (error) {
      console.error("Error inserting project view:", error);
      return NextResponse.json(
        { error: "Failed to track project view" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Project view tracking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
