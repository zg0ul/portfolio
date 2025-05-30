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

    // Insert event
    const { error } = await supabase.from("analytics_events").insert({
      event_name: data.event_name,
      properties: data.properties || {},
      visitor_id: data.visitor_id,
      session_id: data.session_id,
      page_path: data.page_path,
      ip_address: ip,
      user_agent: request.headers.get("user-agent") || "unknown",
    });

    if (error) {
      console.error("Error inserting analytics event:", error);
      return NextResponse.json(
        { error: "Failed to track event" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics event tracking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
