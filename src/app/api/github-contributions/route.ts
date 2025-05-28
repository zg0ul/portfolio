import { NextRequest, NextResponse } from "next/server";

// Cache for 24 hours (86400 seconds)
const CACHE_DURATION = 86400;

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

    // Fetch with caching - Next.js will cache this for 24 hours
    const response = await fetch(apiUrl, {
      next: {
        revalidate: CACHE_DURATION,
        tags: [`github-contributions-${username}`],
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Set cache headers for the API response
    const headers = new Headers();
    headers.set(
      "Cache-Control",
      `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=3600`,
    );

    return NextResponse.json(data, { headers });
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 },
    );
  }
}
