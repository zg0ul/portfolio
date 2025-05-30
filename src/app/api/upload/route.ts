import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  checkAdminAPIAuth,
  createUnauthorizedResponse,
} from "@/lib/admin-api-auth";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  // Check admin authentication first
  if (!(await checkAdminAPIAuth())) {
    return createUnauthorizedResponse();
  }

  try {
    // Use the admin client to bypass RLS
    const supabase = createAdminClient();

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Get file extension
    const fileExt = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `project-thumbnails/${fileName}`;

    // Convert file to buffer
    const buffer = await file.arrayBuffer();

    // Upload to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from("project-thumbnails")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Detailed upload error:", uploadError);
      throw uploadError;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("project-thumbnails")
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to upload image",
        message: errorMessage,
        details: JSON.stringify(error),
      },
      { status: 500 },
    );
  }
}
