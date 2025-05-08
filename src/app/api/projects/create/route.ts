import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { CreateProjectPayload } from "@/lib/supabase/types";

export async function POST(request: Request) {
  try {
    // Parse the project data from the request
    const projectData: CreateProjectPayload = await request.json();

    // Validate required fields
    if (
      !projectData.title ||
      !projectData.slug ||
      projectData.technologies.length === 0
    ) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 },
      );
    }

    // Use admin client to bypass RLS
    const supabase = createAdminClient();

    // Insert the project into the database
    const { data, error } = await supabase
      .from("projects")
      .insert(projectData)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        {
          error: `Failed to create project: ${error.message}`,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project created successfully",
      project: data,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      {
        error: "Failed to create project",
      },
      { status: 500 },
    );
  }
}
