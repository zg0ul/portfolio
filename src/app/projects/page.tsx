import { createClient } from "@/lib/supabase/server";
import ProjectCard from "@/components/projects/ProjectCard";
import { CategoryFilter } from "@/components/projects/CategoryFilter";
import { Suspense } from "react";

// Define the Project type based on our Supabase schema
type Project = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  featured_image: string;
  category: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
};

export default async function ProjectsPage() {
  // Make sure to await the createClient() call
  const supabase = await createClient();

  // Fetch all projects
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  // Get unique categories for filtering
  const categories = projects
    ? [...new Set(projects.map((project) => project.category))]
    : [];

  if (error) {
    console.error("Error fetching projects:", error);
  }

  return (
    <main className="relative min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="from-neon/10 absolute inset-x-0 top-0 h-80 bg-gradient-to-b to-transparent opacity-70 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Projects</h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-300">
            Explore my portfolio of projects across different technologies and domains.
            Each card represents a unique challenge I've tackled.
          </p>
        </div>

        {/* Category filter component */}
        <Suspense fallback={<div className="h-16 w-full animate-pulse rounded-lg bg-navy-700/50"></div>}>
          <CategoryFilter categories={categories} />
        </Suspense>

        {/* Projects grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
          
          {!projects || projects.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <h3 className="text-xl text-gray-400">No projects found</h3>
              <p className="mt-2 text-gray-500">Try changing your filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
