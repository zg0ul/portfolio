/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Eye,
  MousePointer,
  Clock,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/ui/bento-card";

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgDuration: number;
  popularPages: Array<{ path: string; views: number }>;
  topCountries: Array<{ country: string; views: number }>;
  topReferrers: Array<{ referrer: string; views: number }>;
  deviceTypes: Array<{ type: string; count: number }>;
  browsers: Array<{ browser: string; count: number }>;
  chartData: Array<{ date: string; views: number; visitors: number }>;
  topProjects: Array<{ slug: string; title: string; views: number }>;
  period: string;
  dateRange: { start: string; end: string };
}

const PERIOD_OPTIONS = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "Last year" },
];

const COLORS = ["#86D562", "#B3E59C", "#CBEDBB", "#90A3BC", "#748CAB"];

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("7d");
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async (selectedPeriod: string = period) => {
    try {
      setRefreshing(true);
      const response = await fetch(
        `/api/analytics/stats?period=${selectedPeriod}`,
      );
      if (response.ok) {
        const analyticsData = await response.json();
        setData(analyticsData);
      } else {
        console.error("Failed to fetch analytics");
      }
    } catch (error) {
      console.error("Analytics fetch error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    setLoading(true);
    fetchAnalytics(newPeriod);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0
      ? `${minutes}m ${remainingSeconds}s`
      : `${remainingSeconds}s`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (loading && !data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="text-neon mx-auto mb-4 h-8 w-8 animate-spin" />
          <p className="text-navy-300">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-12 text-center">
        <p className="text-navy-300 mb-4">Failed to load analytics data</p>
        <Button onClick={() => fetchAnalytics()} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-foreground text-2xl font-bold">
            Analytics Dashboard
          </h2>
          <p className="text-navy-300 text-sm">
            {data.dateRange.start} to {data.dateRange.end}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) => handlePeriodChange(e.target.value)}
            className="bg-navy-700 border-navy-600 text-foreground rounded-lg border px-3 py-2 text-sm"
          >
            {PERIOD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <Button
            onClick={() => fetchAnalytics()}
            disabled={refreshing}
            variant="outline"
            size="sm"
            className="border-navy-600 bg-navy-700/50"
          >
            {refreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <BentoCard>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-navy-400 text-sm font-medium">Total Views</p>
                <p className="text-foreground text-3xl font-bold">
                  {data.totalViews.toLocaleString()}
                </p>
              </div>
              <div className="rounded-full border border-blue-500/30 bg-blue-500/20 p-3">
                <Eye className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </div>
        </BentoCard>

        <BentoCard>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-navy-400 text-sm font-medium">
                  Unique Visitors
                </p>
                <p className="text-foreground text-3xl font-bold">
                  {data.uniqueVisitors.toLocaleString()}
                </p>
              </div>
              <div className="bg-neon/20 border-neon/30 rounded-full border p-3">
                <Users className="text-neon h-6 w-6" />
              </div>
            </div>
          </div>
        </BentoCard>

        <BentoCard>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-navy-400 text-sm font-medium">Bounce Rate</p>
                <p className="text-foreground text-3xl font-bold">
                  {data.bounceRate}%
                </p>
              </div>
              <div className="rounded-full border border-orange-500/30 bg-orange-500/20 p-3">
                <MousePointer className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </div>
        </BentoCard>

        <BentoCard>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-navy-400 text-sm font-medium">
                  Avg. Duration
                </p>
                <p className="text-foreground text-3xl font-bold">
                  {formatDuration(data.avgDuration)}
                </p>
              </div>
              <div className="rounded-full border border-purple-500/30 bg-purple-500/20 p-3">
                <Clock className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </div>
        </BentoCard>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Views Over Time */}
        <BentoCard>
          <div className="p-6">
            <h3 className="text-foreground mb-4 text-lg font-semibold">
              Views Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a293e" />
                <XAxis
                  dataKey="date"
                  stroke="#4a5769"
                  fontSize={12}
                  tickFormatter={formatDate}
                />
                <YAxis stroke="#4a5769" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#152030",
                    border: "1px solid #1a293e",
                    borderRadius: "8px",
                    color: "#f0ebd8",
                  }}
                  labelFormatter={(date: any) => formatDate(date)}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#86D562"
                  strokeWidth={2}
                  dot={{ fill: "#86D562" }}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#B3E59C"
                  strokeWidth={2}
                  dot={{ fill: "#B3E59C" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>

        {/* Device Types */}
        <BentoCard>
          <div className="p-6">
            <h3 className="text-foreground mb-4 text-lg font-semibold">
              Device Types
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.deviceTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percent }: { type: string; percent: number }) =>
                    `${type} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {data.deviceTypes.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#152030",
                    border: "1px solid #1a293e",
                    borderRadius: "8px",
                    color: "#f0ebd8",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Popular Pages */}
        <BentoCard>
          <div className="p-6">
            <h3 className="text-foreground mb-4 text-lg font-semibold">
              Popular Pages
            </h3>
            <div className="space-y-3">
              {data.popularPages.slice(0, 5).map((page, ) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between"
                >
                  <span className="text-navy-300 truncate text-sm">
                    {page.path}
                  </span>
                  <span className="text-foreground font-medium">
                    {page.views}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Top Countries */}
        <BentoCard>
          <div className="p-6">
            <h3 className="text-foreground mb-4 text-lg font-semibold">
              Top Countries
            </h3>
            <div className="space-y-3">
              {data.topCountries.slice(0, 5).map((country,) => (
                <div
                  key={country.country}
                  className="flex items-center justify-between"
                >
                  <span className="text-navy-300 text-sm">
                    {country.country}
                  </span>
                  <span className="text-foreground font-medium">
                    {country.views}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Top Projects */}
        {data.topProjects.length > 0 && (
          <BentoCard>
            <div className="p-6">
              <h3 className="text-foreground mb-4 text-lg font-semibold">
                Top Projects
              </h3>
              <div className="space-y-3">
                {data.topProjects.slice(0, 5).map((project) => (
                  <div
                    key={project.slug}
                    className="flex items-center justify-between"
                  >
                    <span className="text-navy-300 truncate text-sm">
                      {project.title}
                    </span>
                    <span className="text-foreground font-medium">
                      {project.views}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </BentoCard>
        )}

        {/* Top Referrers */}
        <BentoCard>
          <div className="p-6">
            <h3 className="text-foreground mb-4 text-lg font-semibold">
              Top Referrers
            </h3>
            <div className="space-y-3">
              {data.topReferrers.slice(0, 5).map((referrer, ) => (
                <div
                  key={referrer.referrer}
                  className="flex items-center justify-between"
                >
                  <span className="text-navy-300 truncate text-sm">
                    {referrer.referrer}
                  </span>
                  <span className="text-foreground font-medium">
                    {referrer.views}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </BentoCard>
      </div>
    </div>
  );
}
