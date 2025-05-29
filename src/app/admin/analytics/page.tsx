import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";

export const metadata: Metadata = {
  title: "Analytics - Admin Dashboard",
  description: "Portfolio analytics and visitor insights",
};

export default async function AnalyticsPage() {

  return (
    <main className="topPageMargin bg-background min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6 flex items-center gap-4">
            <Link href="/admin">
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:bg-navy-700/50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-neon/20 border-neon/30 rounded-full border p-3">
              <BarChart3 className="text-neon h-6 w-6" />
            </div>
            <div>
              <h1 className="text-foreground text-3xl font-bold">Analytics</h1>
              <p className="text-navy-200 mt-1">
                Track visitor behavior and portfolio performance
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <AnalyticsDashboard />
      </div>
    </main>
  );
}
