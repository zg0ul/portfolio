import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { TechnologyWithLogo } from "@/lib/supabase/types";

export async function GET() {
  try {
    const supabase = createAdminClient();

    // Fetch technologies with logos from Supabase
    const { data, error } = await supabase
      .from("technologies")
      .select("*")
      .order("name");

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        {
          error: `Failed to fetch technologies: ${error.message}`,
        },
        { status: 500 },
      );
    }

    // Return the technologies
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching technologies:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch technologies",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    // Parse the technology data from the request
    const technologyData: TechnologyWithLogo = await request.json();

    // Validate required fields
    if (!technologyData.name || !technologyData.logo_url) {
      return NextResponse.json(
        {
          error: "Technology name and logo URL are required",
        },
        { status: 400 },
      );
    }

    // Use admin client to bypass RLS
    const supabase = createAdminClient();

    // Check if technology already exists
    const { data: existingTech } = await supabase
      .from("technologies")
      .select("*")
      .eq("name", technologyData.name)
      .single();

    if (existingTech) {
      // Update existing technology
      const { data, error } = await supabase
        .from("technologies")
        .update({ logo_url: technologyData.logo_url })
        .eq("name", technologyData.name)
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          {
            error: `Failed to update technology: ${error.message}`,
          },
          { status: 500 },
        );
      }

      return NextResponse.json({
        success: true,
        message: "Technology updated successfully",
        technology: data,
      });
    } else {
      // Insert new technology
      const { data, error } = await supabase
        .from("technologies")
        .insert(technologyData)
        .select()
        .single();

      if (error) {
        return NextResponse.json(
          {
            error: `Failed to create technology: ${error.message}`,
          },
          { status: 500 },
        );
      }

      return NextResponse.json({
        success: true,
        message: "Technology created successfully",
        technology: data,
      });
    }
  } catch (error) {
    console.error("Error creating/updating technology:", error);
    return NextResponse.json(
      {
        error: "Failed to process technology",
      },
      { status: 500 },
    );
  }
}
