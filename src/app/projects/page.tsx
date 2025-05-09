import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import ProjectsClient from "./projectsClient";

export default async function ProjectsPage() {
  // Server-side data fetching
  const supabase = await createClient();

  // Fetch all projects - this is cached by Next.js
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  // Get unique categories for filtering
  const categories = projects
    ? [...new Set(projects.map((project) => project.category))] // Get unique categories
    : [];

  return (
    <main className="topPageMargin relative z-1 container mb-10 min-h-screen">
      <div className="">
        <div className="mb-8">
          <h1 className="gradient-title text-5xl font-bold">Projects</h1>
          <p className="text-text-400 mt-4 max-w-2xl text-lg">
            Explore my portfolio of projects across different technologies.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="bg-navy-700/50 h-16 w-full animate-pulse rounded-lg"></div>
          }
        >
          <ProjectsClient
            initialProjects={projects || []}
            categories={categories}
          />
        </Suspense>
      </div>
    </main>
  );
}
