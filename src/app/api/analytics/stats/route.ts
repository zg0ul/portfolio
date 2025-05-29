import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "7d"; // 7d, 30d, 90d, 1y
    const supabase = createAdminClient();

    // Calculate date range based on period
    const endDate = new Date();
    const startDate = new Date();

    switch (period) {
      case "7d":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(endDate.getDate() - 90);
        break;
      case "1y":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(endDate.getDate() - 7);
    }

    // Get basic stats
    const [
      totalViewsResult,
      uniqueVisitorsResult,
      popularPagesResult,
      topCountriesResult,
      topReferrersResult,
      deviceStatsResult,
      dailyStatsResult,
      topProjectsResult,
    ] = await Promise.all([
      // Total page views
      supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString()),

      // Unique visitors
      supabase
        .from("page_views")
        .select("visitor_id", { count: "exact" })
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString()),

      // Popular pages
      supabase
        .from("page_views")
        .select("page_path")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString()),

      // Top countries
      supabase
        .from("page_views")
        .select("country")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString())
        .not("country", "is", null),

      // Top referrers
      supabase
        .from("page_views")
        .select("referrer")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString())
        .not("referrer", "is", null),

      // Device stats
      supabase
        .from("page_views")
        .select("device_type, browser, os")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString()),

      // Daily stats for chart
      supabase
        .from("page_views")
        .select("created_at, visitor_id")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString())
        .order("created_at"),

      // Top projects
      supabase
        .from("project_views")
        .select("project_slug, project_title")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString()),
    ]);

    // Process popular pages
    const pageViewCounts =
      popularPagesResult.data?.reduce((acc: Record<string, number>, view) => {
        acc[view.page_path] = (acc[view.page_path] || 0) + 1;
        return acc;
      }, {}) || {};

    const popularPages = Object.entries(pageViewCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([path, views]) => ({ path, views }));

    // Process countries
    const countryCounts =
      topCountriesResult.data?.reduce((acc: Record<string, number>, view) => {
        if (view.country) {
          acc[view.country] = (acc[view.country] || 0) + 1;
        }
        return acc;
      }, {}) || {};

    const topCountries = Object.entries(countryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([country, views]) => ({ country, views }));

    // Process referrers
    const referrerCounts =
      topReferrersResult.data?.reduce((acc: Record<string, number>, view) => {
        if (view.referrer) {
          try {
            const domain = new URL(view.referrer).hostname;
            acc[domain] = (acc[domain] || 0) + 1;
          } catch {
            acc[view.referrer] = (acc[view.referrer] || 0) + 1;
          }
        }
        return acc;
      }, {}) || {};

    const topReferrers = Object.entries(referrerCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([referrer, views]) => ({ referrer, views }));

    // Process device stats
    const deviceTypeCounts =
      deviceStatsResult.data?.reduce((acc: Record<string, number>, view) => {
        if (view.device_type) {
          acc[view.device_type] = (acc[view.device_type] || 0) + 1;
        }
        return acc;
      }, {}) || {};

    const browserCounts =
      deviceStatsResult.data?.reduce((acc: Record<string, number>, view) => {
        if (view.browser) {
          acc[view.browser] = (acc[view.browser] || 0) + 1;
        }
        return acc;
      }, {}) || {};

    // Process daily stats
    const dailyStats =
      dailyStatsResult.data?.reduce(
        (
          acc: Record<string, { views: number; visitors: Set<string> }>,
          view,
        ) => {
          const date = view.created_at.split("T")[0];
          if (!acc[date]) {
            acc[date] = { views: 0, visitors: new Set() };
          }
          acc[date].views++;
          acc[date].visitors.add(view.visitor_id);
          return acc;
        },
        {},
      ) || {};

    const chartData = Object.entries(dailyStats)
      .map(([date, stats]) => ({
        date,
        views: stats.views,
        visitors: stats.visitors.size,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Process project views
    const projectCounts =
      topProjectsResult.data?.reduce(
        (acc: Record<string, { views: number; title: string }>, view) => {
          if (!acc[view.project_slug]) {
            acc[view.project_slug] = { views: 0, title: view.project_title };
          }
          acc[view.project_slug].views++;
          return acc;
        },
        {},
      ) || {};

    const topProjects = Object.entries(projectCounts)
      .sort(([, a], [, b]) => b.views - a.views)
      .slice(0, 10)
      .map(([slug, data]) => ({ slug, title: data.title, views: data.views }));

    // Calculate unique visitors from the query result
    const uniqueVisitorIds = new Set(
      uniqueVisitorsResult.data?.map((v) => v.visitor_id) || [],
    );
    const uniqueVisitors = uniqueVisitorIds.size;

    // Calculate bounce rate
    const { data: bounceData } = await supabase
      .from("page_views")
      .select("is_bounce")
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString())
      .not("is_bounce", "is", null);

    const totalBounces = bounceData?.filter((v) => v.is_bounce).length || 0;
    const totalSessions = bounceData?.length || 0;
    const bounceRate =
      totalSessions > 0 ? (totalBounces / totalSessions) * 100 : 0;

    // Calculate average session duration
    const { data: durationData } = await supabase
      .from("page_views")
      .select("duration")
      .gte("created_at", startDate.toISOString())
      .lte("created_at", endDate.toISOString())
      .not("duration", "is", null);

    const durations =
      durationData?.map((v) => v.duration).filter((d) => d > 0) || [];
    const avgDuration =
      durations.length > 0
        ? durations.reduce((sum, d) => sum + d, 0) / durations.length
        : 0;

    const stats = {
      totalViews: totalViewsResult.count || 0,
      uniqueVisitors,
      bounceRate: Math.round(bounceRate * 100) / 100,
      avgDuration: Math.round(avgDuration),
      popularPages,
      topCountries,
      topReferrers,
      deviceTypes: Object.entries(deviceTypeCounts)
        .sort(([, a], [, b]) => b - a)
        .map(([type, count]) => ({ type, count })),
      browsers: Object.entries(browserCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([browser, count]) => ({ browser, count })),
      chartData,
      topProjects,
      period,
      dateRange: {
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Analytics stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 },
    );
  }
}
