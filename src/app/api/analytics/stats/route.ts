/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  checkAdminAPIAuth,
  createUnauthorizedResponse,
} from "@/lib/admin-api-auth";

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication first
    if (!(await checkAdminAPIAuth())) {
      return createUnauthorizedResponse();
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "7d";
    const supabase = createAdminClient();

    // Calculate date ranges
    const endDate = new Date();
    const startDate = new Date();
    const prevStartDate = new Date();
    const prevEndDate = new Date();

    switch (period) {
      case "24h":
        startDate.setHours(endDate.getHours() - 24);
        prevEndDate.setHours(startDate.getHours());
        prevStartDate.setHours(prevEndDate.getHours() - 24);
        break;
      case "7d":
        startDate.setDate(endDate.getDate() - 7);
        prevEndDate.setDate(startDate.getDate());
        prevStartDate.setDate(prevEndDate.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(endDate.getDate() - 30);
        prevEndDate.setDate(startDate.getDate());
        prevStartDate.setDate(prevEndDate.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(endDate.getDate() - 90);
        prevEndDate.setDate(startDate.getDate());
        prevStartDate.setDate(prevEndDate.getDate() - 90);
        break;
      case "1y":
        startDate.setFullYear(endDate.getFullYear() - 1);
        prevEndDate.setFullYear(startDate.getFullYear());
        prevStartDate.setFullYear(prevEndDate.getFullYear() - 1);
        break;
      case "all":
        startDate.setFullYear(2020); // Set to a very early date
        prevStartDate.setFullYear(2020);
        prevEndDate.setFullYear(2020);
        break;
      default:
        startDate.setDate(endDate.getDate() - 7);
        prevEndDate.setDate(startDate.getDate());
        prevStartDate.setDate(prevEndDate.getDate() - 7);
    }

    // Get current period data
    const [
      currentPageViews,
      previousPageViews,
      currentEvents, // previousEvents - unused
      ,
      projectViews,
      deviceData,
      locationData,
      referrerData,
      hourlyData,
      weeklyData,
    ] = await Promise.all([
      // Current period page views
      supabase
        .from("page_views")
        .select("*")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString()),

      // Previous period page views for comparison
      supabase
        .from("page_views")
        .select("*")
        .gte("created_at", prevStartDate.toISOString())
        .lte("created_at", prevEndDate.toISOString()),

      // Current period events
      supabase
        .from("analytics_events")
        .select("*")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString()),

      // Previous period events
      supabase
        .from("analytics_events")
        .select("*")
        .gte("created_at", prevStartDate.toISOString())
        .lte("created_at", prevEndDate.toISOString()),

      // Project views
      supabase
        .from("project_views")
        .select("*")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString()),

      // Device/browser data
      supabase
        .from("page_views")
        .select("device_type, browser, os, user_agent, duration")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString()),

      // Location data
      supabase
        .from("page_views")
        .select("country, city, region, visitor_id, duration")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString())
        .not("country", "is", null),

      // Referrer data
      supabase
        .from("page_views")
        .select(
          "referrer, utm_source, utm_medium, utm_campaign, utm_content, utm_term, visitor_id",
        )
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString()),

      // Hourly data
      supabase
        .from("page_views")
        .select("created_at, visitor_id")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString()),

      // Weekly data
      supabase
        .from("page_views")
        .select("created_at, visitor_id")
        .gte("created_at", startDate.toISOString())
        .lte("created_at", endDate.toISOString()),
    ]);

    // Process core metrics
    const totalViews = currentPageViews.data?.length || 0;
    const previousTotalViews = previousPageViews.data?.length || 0;
    const viewsChange =
      previousTotalViews > 0
        ? ((totalViews - previousTotalViews) / previousTotalViews) * 100
        : 0;

    const uniqueVisitors = new Set(
      currentPageViews.data?.map((v) => v.visitor_id) || [],
    ).size;
    const previousUniqueVisitors = new Set(
      previousPageViews.data?.map((v) => v.visitor_id) || [],
    ).size;
    const visitorsChange =
      previousUniqueVisitors > 0
        ? ((uniqueVisitors - previousUniqueVisitors) / previousUniqueVisitors) *
          100
        : 0;

    // Calculate bounce rate
    const bounces =
      currentPageViews.data?.filter((v) => v.is_bounce).length || 0;
    const bounceRate = totalViews > 0 ? (bounces / totalViews) * 100 : 0;
    const previousBounces =
      previousPageViews.data?.filter((v) => v.is_bounce).length || 0;
    const previousBounceRate =
      previousTotalViews > 0 ? (previousBounces / previousTotalViews) * 100 : 0;
    const bounceRateChange =
      previousBounceRate > 0
        ? ((bounceRate - previousBounceRate) / previousBounceRate) * 100
        : 0;

    // Calculate average duration
    const durations =
      currentPageViews.data?.map((v) => v.duration).filter((d) => d && d > 0) ||
      [];
    const avgDuration =
      durations.length > 0
        ? durations.reduce((sum, d) => sum + d, 0) / durations.length
        : 0;
    const previousDurations =
      previousPageViews.data
        ?.map((v) => v.duration)
        .filter((d) => d && d > 0) || [];
    const previousAvgDuration =
      previousDurations.length > 0
        ? previousDurations.reduce((sum, d) => sum + d, 0) /
          previousDurations.length
        : 0;
    const durationChange =
      previousAvgDuration > 0
        ? ((avgDuration - previousAvgDuration) / previousAvgDuration) * 100
        : 0;

    // Process popular pages with detailed metrics
    const pageStats =
      currentPageViews.data?.reduce((acc: any, view) => {
        if (!acc[view.page_path]) {
          acc[view.page_path] = {
            views: 0,
            totalDuration: 0,
            validDurations: 0,
            bounces: 0,
            entries: 0,
            exits: 0,
          };
        }
        acc[view.page_path].views++;
        if (view.duration > 0) {
          acc[view.page_path].totalDuration += view.duration;
          acc[view.page_path].validDurations++;
        }
        if (view.is_bounce) acc[view.page_path].bounces++;
        // You might want to track entry/exit pages separately
        return acc;
      }, {}) || {};

    const popularPages = Object.entries(pageStats)
      .map(([path, stats]: [string, any]) => ({
        path,
        views: stats.views,
        avgDuration:
          stats.validDurations > 0
            ? Math.round(stats.totalDuration / stats.validDurations)
            : 0,
        bounceRate: Math.round((stats.bounces / stats.views) * 100),
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 20);

    // Process geographic data
    const countryStats =
      locationData.data?.reduce((acc: any, view) => {
        if (view.country) {
          if (!acc[view.country]) {
            acc[view.country] = {
              views: 0,
              visitors: new Set(),
              totalDuration: 0,
              validDurations: 0,
            };
          }
          acc[view.country].views++;
          acc[view.country].visitors.add(view.visitor_id);
        }
        return acc;
      }, {}) || {};

    const topCountries = Object.entries(countryStats)
      .map(([country, stats]: [string, any]) => ({
        country,
        views: stats.views,
        visitors: stats.visitors.size,
        avgDuration:
          stats.validDurations > 0
            ? Math.round(stats.totalDuration / stats.validDurations)
            : 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    const cityStats =
      locationData.data?.reduce((acc: any, view) => {
        if (view.city && view.country) {
          const key = `${view.city}, ${view.country}`;
          if (!acc[key]) {
            acc[key] = {
              city: view.city,
              country: view.country,
              views: 0,
              visitors: new Set(),
            };
          }
          acc[key].views++;
          acc[key].visitors.add(view.visitor_id);
        }
        return acc;
      }, {}) || {};

    const topCities = Object.values(cityStats)
      .map((stats: any) => ({
        city: stats.city,
        country: stats.country,
        views: stats.views,
        visitors: stats.visitors.size,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Process device data
    const deviceStats =
      deviceData.data?.reduce((acc: any, view) => {
        if (view.device_type) {
          if (!acc[view.device_type]) {
            acc[view.device_type] = {
              count: 0,
              totalDuration: 0,
              validDurations: 0,
            };
          }
          acc[view.device_type].count++;
          if (view.duration > 0) {
            acc[view.device_type].totalDuration += view.duration;
            acc[view.device_type].validDurations++;
          }
        }
        return acc;
      }, {}) || {};

    const totalDeviceViews = Object.values(deviceStats).reduce(
      (sum: number, stats: any) => sum + stats.count,
      0,
    );
    const deviceTypes = Object.entries(deviceStats)
      .map(([type, stats]: [string, any]) => ({
        type,
        count: stats.count,
        percentage:
          totalDeviceViews > 0
            ? Math.round((stats.count / totalDeviceViews) * 100)
            : 0,
        avgDuration:
          stats.validDurations > 0
            ? Math.round(stats.totalDuration / stats.validDurations)
            : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Process browser data
    const browserStats =
      deviceData.data?.reduce((acc: any, view) => {
        if (view.browser) {
          if (!acc[view.browser]) acc[view.browser] = { count: 0 };
          acc[view.browser].count++;
        }
        return acc;
      }, {}) || {};

    const totalBrowserViews = Object.values(browserStats).reduce(
      (sum: number, stats: any) => sum + stats.count,
      0,
    );
    const browsers = Object.entries(browserStats)
      .map(([browser, stats]: [string, any]) => ({
        browser,
        count: stats.count,
        percentage:
          totalBrowserViews > 0
            ? Math.round((stats.count / totalBrowserViews) * 100)
            : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Process OS data
    const osStats =
      deviceData.data?.reduce((acc: any, view) => {
        if (view.os) {
          if (!acc[view.os]) acc[view.os] = { count: 0 };
          acc[view.os].count++;
        }
        return acc;
      }, {}) || {};

    const operatingSystems = Object.entries(osStats)
      .map(([os, stats]: [string, any]) => ({
        os,
        count: stats.count,
        percentage:
          totalBrowserViews > 0
            ? Math.round((stats.count / totalBrowserViews) * 100)
            : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // Process referrer data
    const referrerStats =
      referrerData.data?.reduce((acc: any, view) => {
        if (view.referrer) {
          try {
            const domain = new URL(view.referrer).hostname;
            if (!acc[domain]) {
              acc[domain] = {
                views: 0,
                visitors: new Set(),
                conversions: 0,
              };
            }
            acc[domain].views++;
            acc[domain].visitors.add(view.visitor_id);
          } catch {
            if (!acc[view.referrer]) {
              acc[view.referrer] = {
                views: 0,
                visitors: new Set(),
                conversions: 0,
              };
            }
            acc[view.referrer].views++;
            acc[view.referrer].visitors.add(view.visitor_id);
          }
        }
        return acc;
      }, {}) || {};

    const topReferrers = Object.entries(referrerStats)
      .map(([referrer, stats]: [string, any]) => ({
        referrer,
        views: stats.views,
        visitors: stats.visitors.size,
        conversionRate:
          Math.round((stats.conversions / stats.views) * 100) || 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Process UTM campaigns
    const utmStats =
      referrerData.data?.reduce((acc: any, view) => {
        if (view.utm_campaign) {
          const key = `${view.utm_campaign}-${view.utm_source}-${view.utm_medium}`;
          if (!acc[key]) {
            acc[key] = {
              campaign: view.utm_campaign,
              source: view.utm_source || "unknown",
              medium: view.utm_medium || "unknown",
              views: 0,
              conversions: 0,
            };
          }
          acc[key].views++;
        }
        return acc;
      }, {}) || {};

    const utmCampaigns = Object.values(utmStats)
      .sort((a: any, b: any) => b.views - a.views)
      .slice(0, 10);

    // Calculate traffic source percentages
    const totalReferrerViews = referrerData.data?.length || 1;
    const directViews =
      referrerData.data?.filter((v) => !v.referrer).length || 0;
    const searchViews =
      referrerData.data?.filter(
        (v) =>
          v.referrer &&
          (v.referrer.includes("google.") ||
            v.referrer.includes("bing.") ||
            v.referrer.includes("yahoo.") ||
            v.referrer.includes("duckduckgo.")),
      ).length || 0;
    const socialViews =
      referrerData.data?.filter(
        (v) =>
          v.referrer &&
          (v.referrer.includes("facebook.") ||
            v.referrer.includes("twitter.") ||
            v.referrer.includes("linkedin.") ||
            v.referrer.includes("instagram.") ||
            v.referrer.includes("github.")),
      ).length || 0;

    const directTraffic = Math.round((directViews / totalReferrerViews) * 100);
    const searchTraffic = Math.round((searchViews / totalReferrerViews) * 100);
    const socialTraffic = Math.round((socialViews / totalReferrerViews) * 100);

    // Process hourly data
    const hourlyStats =
      hourlyData.data?.reduce((acc: any, view) => {
        const hour = new Date(view.created_at).getHours();
        if (!acc[hour]) {
          acc[hour] = { views: 0, visitors: new Set() };
        }
        acc[hour].views++;
        acc[hour].visitors.add(view.visitor_id);
        return acc;
      }, {}) || {};

    const hourlyDataFormatted = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      views: hourlyStats[hour]?.views || 0,
      visitors: hourlyStats[hour]?.visitors.size || 0,
    }));

    // Process weekly data
    const weeklyStats =
      weeklyData.data?.reduce((acc: any, view) => {
        const dayNames = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const day = dayNames[new Date(view.created_at).getDay()];
        if (!acc[day]) {
          acc[day] = { views: 0, visitors: new Set() };
        }
        acc[day].views++;
        acc[day].visitors.add(view.visitor_id);
        return acc;
      }, {}) || {};

    const weeklyDataFormatted = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ].map((day) => ({
      day,
      views: weeklyStats[day]?.views || 0,
      visitors: weeklyStats[day]?.visitors.size || 0,
    }));

    // Process project data
    const projectStats =
      projectViews.data?.reduce((acc: any, view) => {
        if (!acc[view.project_slug]) {
          acc[view.project_slug] = {
            slug: view.project_slug,
            title: view.project_title,
            views: 0,
            visitors: new Set(),
            totalTime: 0,
            sessions: 0,
            conversions: 0,
          };
        }
        acc[view.project_slug].views++;
        acc[view.project_slug].visitors.add(view.visitor_id);
        return acc;
      }, {}) || {};

    const topProjects = Object.values(projectStats)
      .map((project: any) => ({
        slug: project.slug,
        title: project.title,
        views: project.views,
        uniqueVisitors: project.visitors.size,
        avgTimeOnPage:
          project.sessions > 0
            ? Math.round(project.totalTime / project.sessions)
            : 0,
        conversionRate:
          project.views > 0
            ? Math.round((project.conversions / project.views) * 100)
            : 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Process daily chart data
    const dailyStats =
      currentPageViews.data?.reduce((acc: any, view) => {
        const date = view.created_at.split("T")[0];
        if (!acc[date]) {
          acc[date] = {
            views: 0,
            visitors: new Set(),
            bounces: 0,
            totalDuration: 0,
            validDurations: 0,
            events: 0,
          };
        }
        acc[date].views++;
        acc[date].visitors.add(view.visitor_id);
        if (view.is_bounce) acc[date].bounces++;
        if (view.duration > 0) {
          acc[date].totalDuration += view.duration;
          acc[date].validDurations++;
        }
        return acc;
      }, {}) || {};

    const chartData = Object.entries(dailyStats)
      .map(([date, stats]: [string, any]) => ({
        date,
        views: stats.views,
        visitors: stats.visitors.size,
        bounceRate:
          stats.views > 0 ? Math.round((stats.bounces / stats.views) * 100) : 0,
        avgDuration:
          stats.validDurations > 0
            ? Math.round(stats.totalDuration / stats.validDurations)
            : 0,
        events: stats.events,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Process events data
    const eventStats =
      currentEvents.data?.reduce((acc: any, event) => {
        if (!acc[event.event_name]) {
          acc[event.event_name] = {
            count: 0,
            uniqueUsers: new Set(),
          };
        }
        acc[event.event_name].count++;
        acc[event.event_name].uniqueUsers.add(event.visitor_id);
        return acc;
      }, {}) || {};

    const topEvents = Object.entries(eventStats)
      .map(([event, stats]: [string, any]) => ({
        event,
        count: stats.count,
        uniqueUsers: stats.uniqueUsers.size,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Process downloads
    const downloadEvents =
      currentEvents.data?.filter((e) => e.event_name === "download") || [];
    const downloadStats = downloadEvents.reduce((acc: any, event) => {
      const fileName = event.properties?.file_name || "unknown";
      const fileType = event.properties?.file_type || "unknown";
      if (!acc[fileName]) {
        acc[fileName] = { fileName, fileType, downloads: 0 };
      }
      acc[fileName].downloads++;
      return acc;
    }, {});

    const downloads = Object.values(downloadStats)
      .sort((a: any, b: any) => b.downloads - a.downloads)
      .slice(0, 10);

    // Process external links
    const linkEvents =
      currentEvents.data?.filter(
        (e) => e.event_name === "external_link_click",
      ) || [];
    const linkStats = linkEvents.reduce((acc: any, event) => {
      const url = event.properties?.url || "unknown";
      const domain = event.properties?.domain || "unknown";
      if (!acc[url]) {
        acc[url] = { url, domain, clicks: 0 };
      }
      acc[url].clicks++;
      return acc;
    }, {});

    const externalLinks = Object.values(linkStats)
      .sort((a: any, b: any) => b.clicks - a.clicks)
      .slice(0, 10);

    // Process form submissions
    const formEvents =
      currentEvents.data?.filter((e) => e.event_name === "form_submission") ||
      [];
    const formStats = formEvents.reduce((acc: any, event) => {
      const formName = event.properties?.form_name || "unknown";
      const success = event.properties?.success || false;
      if (!acc[formName]) {
        acc[formName] = { form: formName, submissions: 0, successes: 0 };
      }
      acc[formName].submissions++;
      if (success) acc[formName].successes++;
      return acc;
    }, {});

    const formSubmissions = Object.values(formStats)
      .map((form: any) => ({
        form: form.form,
        submissions: form.submissions,
        successRate:
          form.submissions > 0
            ? Math.round((form.successes / form.submissions) * 100)
            : 0,
      }))
      .sort((a, b) => b.submissions - a.submissions);

    // Calculate additional metrics
    const totalEvents = currentEvents.data?.length || 0;
    const conversionEvents =
      currentEvents.data?.filter((e) =>
        ["form_submission", "download", "external_link_click"].includes(
          e.event_name,
        ),
      ).length || 0;
    const conversionRate =
      totalViews > 0 ? Math.round((conversionEvents / totalViews) * 100) : 0;

    // Calculate returning visitor rate
    const returningVisitors =
      currentPageViews.data?.filter((v) =>
        previousPageViews.data?.some((pv) => pv.visitor_id === v.visitor_id),
      ).length || 0;
    const returningVisitorRate =
      uniqueVisitors > 0
        ? Math.round((returningVisitors / uniqueVisitors) * 100)
        : 0;

    // Mock data for features that require additional tracking
    const pageDepth = [
      { depth: 1, sessions: Math.round(totalViews * 0.4), percentage: 40 },
      { depth: 2, sessions: Math.round(totalViews * 0.25), percentage: 25 },
      { depth: 3, sessions: Math.round(totalViews * 0.15), percentage: 15 },
      { depth: 4, sessions: Math.round(totalViews * 0.1), percentage: 10 },
      { depth: 5, sessions: Math.round(totalViews * 0.1), percentage: 10 },
    ];

    const sessionDuration = [
      {
        range: "0-10s",
        sessions: Math.round(totalViews * 0.3),
        percentage: 30,
      },
      {
        range: "11-30s",
        sessions: Math.round(totalViews * 0.25),
        percentage: 25,
      },
      {
        range: "31-60s",
        sessions: Math.round(totalViews * 0.2),
        percentage: 20,
      },
      {
        range: "1-3min",
        sessions: Math.round(totalViews * 0.15),
        percentage: 15,
      },
      {
        range: "3min+",
        sessions: Math.round(totalViews * 0.1),
        percentage: 10,
      },
    ];

    const newVsReturning = [
      {
        type: "New" as const,
        count: uniqueVisitors - returningVisitors,
        percentage: 100 - returningVisitorRate,
      },
      {
        type: "Returning" as const,
        count: returningVisitors,
        percentage: returningVisitorRate,
      },
    ];

    // Mock screen resolutions (you'd need to collect this data)
    const screenResolutions = [
      {
        resolution: "1920x1080",
        count: Math.round(totalViews * 0.35),
        percentage: 35,
      },
      {
        resolution: "1366x768",
        count: Math.round(totalViews * 0.2),
        percentage: 20,
      },
      {
        resolution: "375x812",
        count: Math.round(totalViews * 0.15),
        percentage: 15,
      },
      {
        resolution: "414x896",
        count: Math.round(totalViews * 0.12),
        percentage: 12,
      },
      {
        resolution: "1536x864",
        count: Math.round(totalViews * 0.1),
        percentage: 10,
      },
      {
        resolution: "390x844",
        count: Math.round(totalViews * 0.08),
        percentage: 8,
      },
    ];

    // Mock real-time data (you'd implement WebSocket or similar for real data)
    const activeUsers = Math.floor(Math.random() * 10) + 1;
    const realtimePageViews = [
      { page: "/", activeUsers: Math.floor(activeUsers * 0.4) },
      { page: "/projects", activeUsers: Math.floor(activeUsers * 0.3) },
      { page: "/about", activeUsers: Math.floor(activeUsers * 0.2) },
      { page: "/resume", activeUsers: Math.floor(activeUsers * 0.1) },
    ].filter((p) => p.activeUsers > 0);

    // Mock entry and exit pages (you'd track these separately)
    const entryPages = popularPages.slice(0, 8).map((page) => ({
      path: page.path,
      entries: Math.round(page.views * 0.8),
      bounceRate: page.bounceRate,
    }));

    const exitPages = popularPages.slice(0, 8).map((page) => ({
      path: page.path,
      exits: Math.round(page.views * 0.6),
      exitRate: Math.round(Math.random() * 40) + 20,
    }));

    const stats = {
      // Core metrics
      totalViews,
      uniqueVisitors,
      bounceRate: Math.round(bounceRate),
      avgDuration: Math.round(avgDuration),
      totalEvents,
      conversionRate,
      returningVisitorRate,

      // Comparison data
      viewsChange: Math.round(viewsChange * 100) / 100,
      visitorsChange: Math.round(visitorsChange * 100) / 100,
      bounceRateChange: Math.round(bounceRateChange * 100) / 100,
      durationChange: Math.round(durationChange * 100) / 100,

      // Page analytics
      popularPages,
      exitPages,
      entryPages,

      // Geographic data
      topCountries,
      topCities,

      // Traffic sources
      topReferrers,
      directTraffic,
      searchTraffic,
      socialTraffic,
      utmCampaigns,

      // Technology data
      deviceTypes,
      browsers,
      operatingSystems,
      screenResolutions,

      // Temporal data
      chartData,
      hourlyData: hourlyDataFormatted,
      weeklyData: weeklyDataFormatted,

      // Project analytics
      topProjects,

      // User engagement
      pageDepth,
      sessionDuration,
      newVsReturning,

      // Events and interactions
      topEvents,
      downloads,
      externalLinks,
      formSubmissions,

      // Real-time data
      activeUsers,
      currentPageViews: realtimePageViews,

      // Metadata
      period,
      dateRange: {
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Enhanced analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch enhanced analytics" },
      { status: 500 },
    );
  }
}
