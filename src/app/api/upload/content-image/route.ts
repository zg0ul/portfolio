import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    // Check if Supabase environment variables are configured
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.SUPABASE_SERVICE_ROLE_KEY
    ) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        { error: "Server configuration error: Missing Supabase credentials" },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Only JPEG, PNG, GIF, and WEBP are supported.",
        },
        { status: 400 },
      );
    }

    // Get file extension
    const fileExt = file.name.split(".").pop();

    // Create unique file name
    const fileName = `content_images/${uuidv4()}.${fileExt}`;

    try {
      // Get file buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Initialize Supabase client with admin privileges
      const supabase = createAdminClient();

      console.log(`Attempting to upload file to project-images/${fileName}`);

      // Upload image to Supabase Storage
      const { error } = await supabase.storage
        .from("project-images")
        .upload(fileName, buffer, {
          contentType: file.type,
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Storage error:", error);
        return NextResponse.json(
          {
            error: "Storage upload failed",
            message: error.message,
            details: error,
          },
          { status: 500 },
        );
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("project-images").getPublicUrl(fileName);

      if (!publicUrl) {
        return NextResponse.json(
          {
            error: "Failed to get public URL for uploaded file",
          },
          { status: 500 },
        );
      }

      return NextResponse.json({
        success: true,
        url: publicUrl,
      });
    } catch (supabaseError) {
      console.error("Supabase client or storage error:", supabaseError);
      return NextResponse.json(
        {
          error: "Supabase storage error",
          details:
            supabaseError instanceof Error
              ? supabaseError.message
              : String(supabaseError),
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      {
        error: "Failed to upload image",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
