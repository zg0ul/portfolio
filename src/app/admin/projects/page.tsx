// src/app/admin/projects/page.tsx
import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { AdminProjectTable } from "@/components/admin/ProjectTable";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Projects Management - Admin",
  description: "Manage your portfolio projects",
};

export const dynamic = "force-dynamic";

async function AdminProjectsPage() {

  const adminClient = createAdminClient();
  const { data: projects, error } = await adminClient
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

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

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-foreground text-3xl font-bold">
                Projects Management
              </h1>
              <p className="text-navy-200 mt-1">
                Create, edit, and manage your portfolio projects
              </p>
            </div>

            <Link href="/admin/projects/editor">
              <Button className="from-neon to-neon-4 hover:from-neon-4 hover:to-neon text-navy-800 bg-gradient-to-r">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </Link>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-navy-800/50 border-navy-600 rounded-xl border shadow-lg backdrop-blur-sm">
          <AdminProjectTable projects={projects || []} />
        </div>
      </div>
    </main>
  );
}

export default AdminProjectsPage;
