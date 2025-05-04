import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    // Get form data from request
    const { name, email, message } = await request.json();

    // Validate form data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 },
      );
    }

    // Configure mail transporter
    // For production, use actual SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: Boolean(process.env.EMAIL_SECURE) || false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM || "portfolio@contact.com",
      to: process.env.EMAIL_TO || "zg0ul.contact@gmail.com", // Your receiving email
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>New Portfolio Contact Message</h2>
  <p><strong>From:</strong> ${name}</p>
  <p><strong>Email:</strong> ${email}</p>
  <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
    <h3 style="margin-top: 0;">Message:</h3>
    <p style="white-space: pre-line;">${message}</p>
  </div>
</div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
