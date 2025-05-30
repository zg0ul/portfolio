/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import {
  Users,
  Eye,
  MousePointer,
  Clock,
  Loader2,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Download,
  ExternalLink,
  Activity,
  Target,
  MapPin,
  Share2,
  FileText,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BentoCard } from "@/components/ui/bento-card";
import { AnimatedCard } from "@/components/ui/animated_card";
import * as motion from "motion/react-client";

interface AnalyticsData {
  // Core metrics
  totalViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgDuration: number;
  totalEvents: number;
  conversionRate: number;
  returningVisitorRate: number;

  // Comparison data (vs previous period)
  viewsChange: number;
  visitorsChange: number;
  bounceRateChange: number;
  durationChange: number;

  // Page analytics
  popularPages: Array<{
    path: string;
    views: number;
    avgDuration: number;
    bounceRate: number;
  }>;
  exitPages: Array<{ path: string; exits: number; exitRate: number }>;
  entryPages: Array<{ path: string; entries: number; bounceRate: number }>;

  // Geographic data
  topCountries: Array<{
    country: string;
    views: number;
    visitors: number;
    avgDuration: number;
  }>;
  topCities: Array<{
    city: string;
    country: string;
    views: number;
    visitors: number;
  }>;

  // Traffic sources
  topReferrers: Array<{
    referrer: string;
    views: number;
    visitors: number;
    conversionRate: number;
  }>;
  directTraffic: number;
  searchTraffic: number;
  socialTraffic: number;
  utmCampaigns: Array<{
    campaign: string;
    source: string;
    medium: string;
    views: number;
    conversions: number;
  }>;

  // Technology data
  deviceTypes: Array<{
    type: string;
    count: number;
    percentage: number;
    avgDuration: number;
  }>;
  browsers: Array<{
    browser: string;
    count: number;
    percentage: number;
    version?: string;
  }>;
  operatingSystems: Array<{ os: string; count: number; percentage: number }>;
  screenResolutions: Array<{
    resolution: string;
    count: number;
    percentage: number;
  }>;

  // Temporal data
  chartData: Array<{
    date: string;
    views: number;
    visitors: number;
    bounceRate: number;
    avgDuration: number;
    events: number;
  }>;
  hourlyData: Array<{ hour: number; views: number; visitors: number }>;
  weeklyData: Array<{ day: string; views: number; visitors: number }>;

  // Project analytics
  topProjects: Array<{
    slug: string;
    title: string;
    views: number;
    uniqueVisitors: number;
    avgTimeOnPage: number;
    conversionRate: number;
  }>;

  // User engagement
  pageDepth: Array<{ depth: number; sessions: number; percentage: number }>;
  sessionDuration: Array<{
    range: string;
    sessions: number;
    percentage: number;
  }>;
  newVsReturning: Array<{
    type: "New" | "Returning";
    count: number;
    percentage: number;
  }>;

  // Events and interactions
  topEvents: Array<{ event: string; count: number; uniqueUsers: number }>;
  downloads: Array<{ fileName: string; downloads: number; fileType: string }>;
  externalLinks: Array<{ url: string; clicks: number; domain: string }>;
  formSubmissions: Array<{
    form: string;
    submissions: number;
    successRate: number;
  }>;

  // Real-time data
  activeUsers: number;
  currentPageViews: Array<{ page: string; activeUsers: number }>;

  // Performance insights
  loadTimes: Array<{
    page: string;
    avgLoadTime: number;
    slowestLoadTime: number;
  }>;

  period: string;
  dateRange: { start: string; end: string };
}

const PERIOD_OPTIONS = [
  { value: "24h", label: "Last 24 hours" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "Last year" },
  { value: "all", label: "All time" },
];

const COLORS = [
  "#86D562",
  "#B3E59C",
  "#CBEDBB",
  "#90A3BC",
  "#748CAB",
  "#4A5769",
  "#86D562",
];

export default function EnhancedAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("7d");
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchFilter, setSearchFilter] = useState("");

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

    // Set up auto-refresh for real-time data
    const interval = setInterval(() => {
      if (period === "24h") {
        fetchAnalytics();
      }
    }, 60000); // Refresh every minute for 24h view

    return () => clearInterval(interval);
  }, [period]);

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

  const formatPercentageChange = (change: number) => {
    const isPositive = change > 0;
    const icon = isPositive ? (
      <TrendingUp className="h-4 w-4" />
    ) : (
      <TrendingDown className="h-4 w-4" />
    );
    const color = isPositive ? "text-green-400" : "text-red-400";

    return (
      <div className={`flex items-center gap-1 ${color}`}>
        {icon}
        <span className="text-sm font-medium">
          {Math.abs(change).toFixed(1)}%
        </span>
      </div>
    );
  };

  const MetricCard = ({
    title,
    value,
    change,
    icon: Icon,
    color = "blue",
    formatter = (v: any) => v,
  }: {
    title: string;
    value: any;
    change?: number;
    icon: any;
    color?: string;
    formatter?: (value: any) => string;
  }) => (
    <BentoCard>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-navy-400 text-sm font-medium">{title}</p>
            <p className="text-foreground mt-1 text-3xl font-bold">
              {formatter(value)}
            </p>
            {change !== undefined && (
              <div className="mt-2">{formatPercentageChange(change)}</div>
            )}
          </div>
          <div
            className={`rounded-full border border-${color}-500/30 bg-${color}-500/20 p-3`}
          >
            <Icon className={`h-6 w-6 text-${color}-400`} />
          </div>
        </div>
      </div>
    </BentoCard>
  );

  const TabButton = ({
    label,
    isActive,
    onClick,
  }: {
    id: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        isActive
          ? "bg-neon/20 text-neon border-neon/30 border"
          : "text-navy-300 hover:text-foreground hover:bg-navy-700/50"
      }`}
    >
      {label}
    </button>
  );

  if (loading && !data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="text-neon mx-auto mb-4 h-8 w-8 animate-spin" />
          <p className="text-navy-300">Loading comprehensive analytics...</p>
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">
            Enhanced Analytics Dashboard
          </h1>
          <p className="text-navy-300 mt-1 text-sm">
            {data.dateRange.start} to {data.dateRange.end}
          </p>
          {data.activeUsers > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
              <span className="text-sm font-medium text-green-400">
                {data.activeUsers} active users
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="text-navy-400 absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <input
              type="text"
              placeholder="Filter data..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="bg-navy-700 border-navy-600 text-foreground w-48 rounded-lg border py-2 pr-4 pl-10 text-sm"
            />
          </div>

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

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "overview", label: "Overview" },
          { id: "audience", label: "Audience" },
          { id: "behavior", label: "Behavior" },
          { id: "technology", label: "Technology" },
          { id: "traffic", label: "Traffic Sources" },
          { id: "content", label: "Content" },
          { id: "events", label: "Events" },
          { id: "realtime", label: "Real-time" },
        ].map((tab) => (
          <TabButton
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Views"
              value={data.totalViews}
              change={data.viewsChange}
              icon={Eye}
              color="blue"
              formatter={(v) => v.toLocaleString()}
            />
            <MetricCard
              title="Unique Visitors"
              value={data.uniqueVisitors}
              change={data.visitorsChange}
              icon={Users}
              color="green"
              formatter={(v) => v.toLocaleString()}
            />
            <MetricCard
              title="Bounce Rate"
              value={data.bounceRate}
              change={data.bounceRateChange}
              icon={MousePointer}
              color="orange"
              formatter={(v) => `${v}%`}
            />
            <MetricCard
              title="Avg. Duration"
              value={data.avgDuration}
              change={data.durationChange}
              icon={Clock}
              color="purple"
              formatter={formatDuration}
            />
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Events"
              value={data.totalEvents}
              icon={Activity}
              color="indigo"
              formatter={(v) => v.toLocaleString()}
            />
            <MetricCard
              title="Conversion Rate"
              value={data.conversionRate}
              icon={Target}
              color="green"
              formatter={(v) => `${v}%`}
            />
            <MetricCard
              title="Returning Visitors"
              value={data.returningVisitorRate}
              icon={Share2}
              color="blue"
              formatter={(v) => `${v}%`}
            />
            <MetricCard
              title="Page Depth"
              value={data.pageDepth?.[0]?.depth || 0}
              icon={FileText}
              color="purple"
              formatter={(v) => `${v} pages/session`}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Views Over Time */}
            <AnimatedCard title="Views & Visitors Over Time">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data.chartData}>
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
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stackId="1"
                    stroke="#86D562"
                    fill="#86D562"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stackId="2"
                    stroke="#B3E59C"
                    fill="#B3E59C"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </AnimatedCard>

            {/* Hourly Distribution */}
            <AnimatedCard title="Hourly Traffic Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a293e" />
                  <XAxis
                    dataKey="hour"
                    stroke="#4a5769"
                    fontSize={12}
                    tickFormatter={(hour) => `${hour}:00`}
                  />
                  <YAxis stroke="#4a5769" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#152030",
                      border: "1px solid #1a293e",
                      borderRadius: "8px",
                      color: "#f0ebd8",
                    }}
                  />
                  <Bar dataKey="views" fill="#86D562" />
                </BarChart>
              </ResponsiveContainer>
            </AnimatedCard>
          </div>
        </motion.div>
      )}

      {/* Audience Tab */}
      {activeTab === "audience" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* New vs Returning Visitors */}
            <AnimatedCard title="New vs Returning Visitors">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.newVsReturning}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({
                      type,
                      percentage,
                    }: {
                      type: string;
                      percentage: number;
                    }) => `${type} ${percentage.toFixed(1)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {data.newVsReturning?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </AnimatedCard>

            {/* Session Duration Distribution */}
            <AnimatedCard title="Session Duration Distribution">
              <div className="space-y-3">
                {data.sessionDuration?.map((duration, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-navy-300 text-sm">
                      {duration.range}
                    </span>
                    <div className="mx-4 flex flex-1 items-center gap-2">
                      <div className="bg-navy-600 h-2 flex-1 overflow-hidden rounded-full">
                        <div
                          className="bg-neon h-full transition-all duration-1000"
                          style={{ width: `${duration.percentage}%` }}
                        />
                      </div>
                      <span className="text-foreground text-sm font-medium">
                        {duration.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>

          {/* Geographic Data */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <AnimatedCard title="Top Countries">
              <div className="space-y-3">
                {data.topCountries?.slice(0, 10).map((country, index) => (
                  <div
                    key={index}
                    className="bg-navy-700/30 flex items-center justify-between rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="text-navy-400 h-4 w-4" />
                      <span className="text-navy-300 text-sm">
                        {country.country}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-foreground font-medium">
                        {country.views} views
                      </div>
                      <div className="text-navy-400 text-xs">
                        {country.visitors} visitors
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            <AnimatedCard title="Top Cities">
              <div className="space-y-3">
                {data.topCities?.slice(0, 10).map((city, index) => (
                  <div
                    key={index}
                    className="bg-navy-700/30 flex items-center justify-between rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="text-navy-400 h-4 w-4" />
                      <div>
                        <div className="text-navy-300 text-sm">{city.city}</div>
                        <div className="text-navy-400 text-xs">
                          {city.country}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-foreground font-medium">
                        {city.views}
                      </div>
                      <div className="text-navy-400 text-xs">
                        {city.visitors} visitors
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        </motion.div>
      )}

      {/* Technology Tab */}
      {activeTab === "technology" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Device Types */}
            <AnimatedCard title="Device Types">
              <div className="mb-4 grid grid-cols-3 gap-4">
                {data.deviceTypes?.map((device, index) => (
                  <div
                    key={index}
                    className="bg-navy-700/30 rounded-lg p-4 text-center"
                  >
                    <div className="mb-2">
                      {device.type === "mobile" && (
                        <Smartphone className="text-neon mx-auto h-8 w-8" />
                      )}
                      {device.type === "desktop" && (
                        <Monitor className="text-neon mx-auto h-8 w-8" />
                      )}
                      {device.type === "tablet" && (
                        <Tablet className="text-neon mx-auto h-8 w-8" />
                      )}
                    </div>
                    <div className="text-foreground text-lg font-bold">
                      {device.percentage}%
                    </div>
                    <div className="text-navy-300 text-sm capitalize">
                      {device.type}
                    </div>
                    <div className="text-navy-400 text-xs">
                      {device.count} users
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* Browsers */}
            <AnimatedCard title="Top Browsers">
              <div className="space-y-3">
                {data.browsers?.map((browser, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="text-navy-400 h-4 w-4" />
                      <span className="text-navy-300 text-sm">
                        {browser.browser}
                      </span>
                      {browser.version && (
                        <span className="text-navy-400 text-xs">
                          v{browser.version}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-foreground font-medium">
                        {browser.percentage}%
                      </div>
                      <div className="text-navy-400 text-xs">
                        {browser.count} users
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Operating Systems */}
            <AnimatedCard title="Operating Systems">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data.operatingSystems}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({
                      os,
                      percentage,
                    }: {
                      os: string;
                      percentage: number;
                    }) => `${os} ${percentage}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {data.operatingSystems?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </AnimatedCard>

            {/* Screen Resolutions */}
            <AnimatedCard title="Screen Resolutions">
              <div className="space-y-3">
                {data.screenResolutions
                  ?.slice(0, 8)
                  .map((resolution, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-navy-300 font-mono text-sm">
                        {resolution.resolution}
                      </span>
                      <div className="text-right">
                        <div className="text-foreground font-medium">
                          {resolution.percentage}%
                        </div>
                        <div className="text-navy-400 text-xs">
                          {resolution.count} users
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </AnimatedCard>
          </div>
        </motion.div>
      )}

      {/* Events Tab */}
      {activeTab === "events" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Top Events */}
            <AnimatedCard title="Top Events">
              <div className="space-y-3">
                {data.topEvents?.map((event, index) => (
                  <div
                    key={index}
                    className="bg-navy-700/30 flex items-center justify-between rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Activity className="text-neon h-4 w-4" />
                      <span className="text-navy-300 text-sm">
                        {event.event}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-foreground font-medium">
                        {event.count}
                      </div>
                      <div className="text-navy-400 text-xs">
                        {event.uniqueUsers} unique users
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* Downloads */}
            <AnimatedCard title="File Downloads">
              <div className="space-y-3">
                {data.downloads?.map((download, index) => (
                  <div
                    key={index}
                    className="bg-navy-700/30 flex items-center justify-between rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Download className="h-4 w-4 text-green-400" />
                      <div>
                        <div className="text-navy-300 text-sm">
                          {download.fileName}
                        </div>
                        <div className="text-navy-400 text-xs uppercase">
                          {download.fileType}
                        </div>
                      </div>
                    </div>
                    <div className="text-foreground font-medium">
                      {download.downloads}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* External Links */}
            <AnimatedCard title="External Link Clicks">
              <div className="space-y-3">
                {data.externalLinks?.map((link, index) => (
                  <div
                    key={index}
                    className="bg-navy-700/30 flex items-center justify-between rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <ExternalLink className="h-4 w-4 text-blue-400" />
                      <div>
                        <div className="text-navy-300 max-w-40 truncate text-sm">
                          {link.domain}
                        </div>
                        <div className="text-navy-400 max-w-40 truncate text-xs">
                          {link.url}
                        </div>
                      </div>
                    </div>
                    <div className="text-foreground font-medium">
                      {link.clicks}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* Form Submissions */}
            <AnimatedCard title="Form Submissions">
              <div className="space-y-3">
                {data.formSubmissions?.map((form, index) => (
                  <div
                    key={index}
                    className="bg-navy-700/30 flex items-center justify-between rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-purple-400" />
                      <span className="text-navy-300 text-sm">{form.form}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-foreground font-medium">
                        {form.submissions}
                      </div>
                      <div className="text-xs text-green-400">
                        {form.successRate}% success
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        </motion.div>
      )}

      {/* Content Tab */}
      {activeTab === "content" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Top Projects */}
          <AnimatedCard title="Top Performing Projects">
            <div className="space-y-3">
              {data.topProjects?.map((project, index) => (
                <div key={index} className="bg-navy-700/30 rounded-lg p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <h4 className="text-foreground font-medium">
                      {project.title}
                    </h4>
                    <div className="text-neon text-sm font-medium">
                      {project.conversionRate}% conversion
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-navy-400">Views</div>
                      <div className="text-foreground font-medium">
                        {project.views.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-navy-400">Unique Visitors</div>
                      <div className="text-foreground font-medium">
                        {project.uniqueVisitors.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-navy-400">Avg. Time</div>
                      <div className="text-foreground font-medium">
                        {formatDuration(project.avgTimeOnPage)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Popular Pages */}
            <AnimatedCard title="Popular Pages">
              <div className="space-y-3">
                {data.popularPages?.slice(0, 8).map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-navy-300 truncate text-sm">
                        {page.path}
                      </div>
                      <div className="text-navy-400 text-xs">
                        {formatDuration(page.avgDuration)} avg •{" "}
                        {page.bounceRate}% bounce
                      </div>
                    </div>
                    <div className="text-foreground ml-2 font-medium">
                      {page.views}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* Entry Pages */}
            <AnimatedCard title="Top Entry Pages">
              <div className="space-y-3">
                {data.entryPages?.slice(0, 8).map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-navy-300 truncate text-sm">
                        {page.path}
                      </div>
                      <div className="text-navy-400 text-xs">
                        {page.bounceRate}% bounce rate
                      </div>
                    </div>
                    <div className="text-foreground ml-2 font-medium">
                      {page.entries}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* Exit Pages */}
            <AnimatedCard title="Top Exit Pages">
              <div className="space-y-3">
                {data.exitPages?.slice(0, 8).map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-navy-300 truncate text-sm">
                        {page.path}
                      </div>
                      <div className="text-xs text-red-400">
                        {page.exitRate}% exit rate
                      </div>
                    </div>
                    <div className="text-foreground ml-2 font-medium">
                      {page.exits}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        </motion.div>
      )}

      {/* Traffic Sources Tab */}
      {activeTab === "traffic" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Traffic Source Overview */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <BentoCard>
              <div className="p-6 text-center">
                <div className="text-foreground mb-2 text-3xl font-bold">
                  {data.directTraffic}%
                </div>
                <div className="text-navy-400 text-sm">Direct Traffic</div>
              </div>
            </BentoCard>
            <BentoCard>
              <div className="p-6 text-center">
                <div className="text-foreground mb-2 text-3xl font-bold">
                  {data.searchTraffic}%
                </div>
                <div className="text-navy-400 text-sm">Search Traffic</div>
              </div>
            </BentoCard>
            <BentoCard>
              <div className="p-6 text-center">
                <div className="text-foreground mb-2 text-3xl font-bold">
                  {data.socialTraffic}%
                </div>
                <div className="text-navy-400 text-sm">Social Traffic</div>
              </div>
            </BentoCard>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Top Referrers */}
            <AnimatedCard title="Top Referrers">
              <div className="space-y-3">
                {data.topReferrers?.map((referrer, index) => (
                  <div
                    key={index}
                    className="bg-navy-700/30 flex items-center justify-between rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-blue-400" />
                      <span className="text-navy-300 text-sm">
                        {referrer.referrer}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-foreground font-medium">
                        {referrer.views}
                      </div>
                      <div className="text-xs text-green-400">
                        {referrer.conversionRate}% conversion
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* UTM Campaigns */}
            <AnimatedCard title="UTM Campaigns">
              <div className="space-y-3">
                {data.utmCampaigns?.map((campaign, index) => (
                  <div key={index} className="bg-navy-700/30 rounded-lg p-3">
                    <div className="mb-2 flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-foreground font-medium">
                          {campaign.campaign}
                        </div>
                        <div className="text-navy-400 text-xs">
                          {campaign.source} • {campaign.medium}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-foreground font-medium">
                          {campaign.views}
                        </div>
                        <div className="text-xs text-green-400">
                          {campaign.conversions} conversions
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        </motion.div>
      )}

      {/* Real-time Tab */}
      {activeTab === "realtime" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Active Users */}
            <AnimatedCard title="Active Users Right Now">
              <div className="py-8 text-center">
                <div className="text-neon mb-4 text-6xl font-bold">
                  {data.activeUsers}
                </div>
                <div className="text-navy-300">
                  Users currently viewing your site
                </div>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
                  <span className="text-sm text-green-400">Live</span>
                </div>
              </div>
            </AnimatedCard>

            {/* Current Page Views */}
            <AnimatedCard title="Pages Being Viewed">
              <div className="space-y-3">
                {data.currentPageViews?.map((page, index) => (
                  <div
                    key={index}
                    className="bg-navy-700/30 flex items-center justify-between rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                      <span className="text-navy-300 text-sm">{page.page}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-400" />
                      <span className="text-foreground font-medium">
                        {page.activeUsers}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        </motion.div>
      )}

      {/* Behavior Tab */}
      {activeTab === "behavior" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Page Depth */}
            <AnimatedCard title="Page Depth per Session">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.pageDepth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a293e" />
                  <XAxis
                    dataKey="depth"
                    stroke="#4a5769"
                    fontSize={12}
                    tickFormatter={(depth) => `${depth} pages`}
                  />
                  <YAxis stroke="#4a5769" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#152030",
                      border: "1px solid #1a293e",
                      borderRadius: "8px",
                      color: "#f0ebd8",
                    }}
                  />
                  <Bar dataKey="sessions" fill="#86D562" />
                </BarChart>
              </ResponsiveContainer>
            </AnimatedCard>

            {/* Weekly Distribution */}
            <AnimatedCard title="Weekly Traffic Distribution">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a293e" />
                  <XAxis dataKey="day" stroke="#4a5769" fontSize={12} />
                  <YAxis stroke="#4a5769" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#152030",
                      border: "1px solid #1a293e",
                      borderRadius: "8px",
                      color: "#f0ebd8",
                    }}
                  />
                  <Bar dataKey="views" fill="#86D562" />
                  <Bar dataKey="visitors" fill="#B3E59C" />
                </BarChart>
              </ResponsiveContainer>
            </AnimatedCard>
          </div>

          {/* Engagement Metrics */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <AnimatedCard title="Bounce Rate by Page">
              <div className="space-y-3">
                {data.popularPages?.slice(0, 5).map((page, index) => {
                  const bounceRateColor =
                    page.bounceRate > 70
                      ? "text-red-400"
                      : page.bounceRate > 40
                        ? "text-yellow-400"
                        : "text-green-400";
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-navy-300 flex-1 truncate text-sm">
                        {page.path}
                      </span>
                      <span className={`font-medium ${bounceRateColor}`}>
                        {page.bounceRate}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </AnimatedCard>

            <AnimatedCard title="Average Time on Page">
              <div className="space-y-3">
                {data.popularPages?.slice(0, 5).map((page, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="text-navy-300 flex-1 truncate text-sm">
                      {page.path}
                    </span>
                    <span className="text-foreground font-medium">
                      {formatDuration(page.avgDuration)}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            <AnimatedCard title="User Flow">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-neon text-2xl font-bold">
                    {data.popularPages?.[0]?.views || 0}
                  </div>
                  <div className="text-navy-400 text-sm">
                    Landing Page Views
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="bg-navy-500 h-px w-8"></div>
                  <div className="bg-neon mx-2 h-2 w-2 rounded-full"></div>
                  <div className="bg-navy-500 h-px w-8"></div>
                </div>
                <div className="text-center">
                  <div className="text-foreground text-xl font-bold">
                    {Math.round(
                      (data.popularPages?.[0]?.views || 0) *
                        (1 - data.bounceRate / 100),
                    )}
                  </div>
                  <div className="text-navy-400 text-sm">
                    Continued to Browse
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </motion.div>
      )}
    </div>
  );
}
