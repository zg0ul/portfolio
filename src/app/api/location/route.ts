/* eslint-disable @typescript-eslint/no-unused-vars */
export async function GET() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to get location" }, { status: 500 });
  }
}
