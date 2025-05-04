import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  // Get optional parameters
  const year = searchParams.get("y"); // Support for specific years
  const format = searchParams.get("format"); // Support for nested format

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 },
    );
  }

  try {
    // Construct URL with appropriate query parameters
    let apiUrl = `https://github-contributions-api.jogruber.de/v4/${username}`;
    const queryParams = [];

    if (year) {
      // Can be specific year, 'last', or 'all'
      if (Array.isArray(year)) {
        year.forEach((y) => queryParams.push(`y=${y}`));
      } else {
        queryParams.push(`y=${year}`);
      }
    }

    if (format) {
      queryParams.push(`format=${format}`);
    }

    if (queryParams.length > 0) {
      apiUrl += `?${queryParams.join("&")}`;
    }

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 },
    );
  }
}
