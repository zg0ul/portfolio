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

    // Insert page view
    const { error } = await supabase.from("page_views").insert({
      page_path: data.page_path,
      referrer: data.referrer,
      user_agent: data.user_agent,
      ip_address: ip,
      country: data.country,
      city: data.city,
      region: data.region,
      timezone: data.timezone,
      device_type: data.device_type,
      browser: data.browser,
      os: data.os,
      session_id: data.session_id,
      visitor_id: data.visitor_id,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_content: data.utm_content,
      utm_term: data.utm_term,
    });

    if (error) {
      console.error("Error inserting page view:", error);
      return NextResponse.json(
        { error: "Failed to track page view" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Page view tracking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
