import { createAdminClient } from "@/lib/supabase/admin";
import Link from "next/link";
import { ProjectTable } from "@/components/admin/ProjectTable";
import { LucidePlus } from "lucide-react";

export const metadata = {
  title: "Admin - Projects",
  description: "Manage your portfolio projects",
};

async function AdminProjects() {
  // Use the admin client for fetching projects to bypass RLS
  // No authentication check, similar to dashboard approach
  const adminClient = createAdminClient();
  const { data: projects, error } = await adminClient
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <div className="topPageMargin container mx-auto px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center rounded-md bg-black px-4 py-2 text-white"
        >
          <LucidePlus />
          New Project
        </Link>
      </div>

      {/* Projects table */}
      <ProjectTable projects={projects || []} />
    </div>
  );
}

export default AdminProjects;
