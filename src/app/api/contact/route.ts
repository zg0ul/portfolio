import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Lazy initialization to avoid build-time errors
let resend: Resend | null = null;

function getResendInstance(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is required");
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

// Simple in-memory rate limiting (for production, use Redis or a database)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 30 * 60 * 1000; // 30 minutes
const MAX_REQUESTS = 2; // Max 2 requests per 30 minutes per IP

// Cleanup old entries every hour to prevent memory leaks
setInterval(
  () => {
    const now = Date.now();
    for (const [key, timestamps] of rateLimitMap.entries()) {
      const validTimestamps = timestamps.filter(
        (timestamp) => now - timestamp < RATE_LIMIT_WINDOW,
      );
      if (validTimestamps.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, validTimestamps);
      }
    }
  },
  60 * 60 * 1000,
); // Run every hour

function getRateLimitKey(request: NextRequest): string {
  // Try multiple headers to get the real IP
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const remoteAddress = request.headers.get("x-forwarded-host");

  let ip = "unknown";

  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one (original client)
    ip = forwarded.split(",")[0].trim();
  } else if (realIp) {
    ip = realIp.trim();
  } else if (remoteAddress) {
    ip = remoteAddress.trim();
  }

  // For development, use a consistent key since localhost doesn't have real IPs
  if (ip === "unknown" || ip === "::1" || ip === "127.0.0.1") {
    ip = "dev-user";
  }

  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const userRequests = rateLimitMap.get(key) || [];

  // Remove expired requests
  const validRequests = userRequests.filter(
    (timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW,
  );

  console.log(
    `Rate limit check for ${key}: ${validRequests.length}/${MAX_REQUESTS} requests in last 15 minutes`,
  );

  if (validRequests.length >= MAX_REQUESTS) {
    console.log(`Rate limit exceeded for ${key}`);
    return true;
  }

  // Add current request
  validRequests.push(now);
  rateLimitMap.set(key, validRequests);

  console.log(
    `Request allowed for ${key}, total requests: ${validRequests.length}`,
  );
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limiting first
    const rateLimitKey = getRateLimitKey(request);
    if (isRateLimited(rateLimitKey)) {
      return NextResponse.json(
        {
          error:
            "Too many requests. Please wait 15 minutes before sending another message.",
        },
        { status: 429 },
      );
    }

    // Get form data from request
    const { name, email, message } = await request.json();

    // Validate form data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    // Get current timestamp
    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Amman",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Send email using Resend
    const resendInstance = getResendInstance();
    const { data, error } = await resendInstance.emails.send({
      from: process.env.EMAIL_FROM_DOMAIN || "contact@zg0ul.com",
      to: [process.env.EMAIL_TO || "mohammad@zg0ul.com"],
      replyTo: email, // This allows you to reply directly to the user
      subject: `🚀 New Portfolio Contact: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Portfolio Contact Message</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #86D562 0%, #b3e59c 100%); color: black; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600;">📧 New Portfolio Message</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone reached out through zg0ul.com</p>
          </div>

          <!-- Message Content -->
          <div style="background: #ffffff; border: 1px solid #e5e7eb; border-top: none; padding: 30px; border-radius: 0 0 12px 12px;">
            
            <!-- Sender Info -->
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #86D562; margin-bottom: 25px;">
              <h2 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">Contact Details</h2>
              <div style="display: grid; gap: 8px;">
                <p style="margin: 0;"><strong style="color: #374151;">Name:</strong> <span style="color: #6b7280;">${name}</span></p>
                <p style="margin: 0;"><strong style="color: #374151;">Email:</strong> <a href="mailto:${email}" style="color: #86D562; text-decoration: none;">${email}</a></p>
                <p style="margin: 0;"><strong style="color: #374151;">Received:</strong> <span style="color: #6b7280;">${timestamp}</span></p>
              </div>
            </div>

            <!-- Message -->
            <div style="margin-bottom: 25px;">
              <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 16px; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">💬 Message</h3>
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
                <p style="margin: 0; white-space: pre-line; color: #374151; line-height: 1.7;">${message}</p>
              </div>
            </div>

            <!-- Quick Actions -->
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; text-align: center;">
              <h4 style="margin: 0 0 15px 0; color: #1e40af;">Quick Actions</h4>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
                <a href="mailto:${email}?subject=Re: Portfolio Contact&body=Hi ${name},%0D%0A%0D%0AThank you for reaching out through my portfolio!" 
                   style="background: #86D562; color: black; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
                  📧 Reply to ${name}
                </a>
                <a href="mailto:${email}" 
                   style="background: #6b7280; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
                  ✉️ Send New Email
                </a>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding: 20px; color: #6b7280; font-size: 14px;">
            <p style="margin: 0;">This message was sent from your portfolio contact form</p>
            <p style="margin: 5px 0 0 0;">
              <a href="https://zg0ul.com" style="color: #86D562; text-decoration: none;">zg0ul.com</a> • 
              Portfolio by Mohammad Zgoul
            </p>
          </div>

        </body>
        </html>
      `,
      // Also include a text version for better deliverability
      text: `New Portfolio Contact Message

From: ${name}
Email: ${email}
Received: ${timestamp}

Message:
${message}

---
Reply to this email to respond directly to ${name}.
This message was sent from your portfolio contact form at zg0ul.com`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 },
      );
    }

    // Log successful sends (helpful for monitoring)
    console.log(`📧 Portfolio contact email sent successfully:`, {
      messageId: data?.id,
      from: name,
      email: email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 },
    );
  }
}
