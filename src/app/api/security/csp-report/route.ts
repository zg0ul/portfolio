import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log CSP violations for security monitoring
    console.warn("CSP Violation:", {
      timestamp: new Date().toISOString(),
      violation: body,
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    });

    // In production, you might want to send this to a logging service
    // or security monitoring tool

    return NextResponse.json({ status: "received" }, { status: 200 });
  } catch (error) {
    console.error("Error processing CSP report:", error);
    return NextResponse.json(
      { error: "Failed to process CSP report" },
      { status: 500 },
    );
  }
}
