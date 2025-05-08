import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { TechStack } from "@/components/projects/TechStack";
import { ProjectNavigation } from "@/components/projects/ProjectNavigation";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { CategoryWithIcon } from "@/utils/ProjectCategories";
import { Github, ExternalLink } from "lucide-react";

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | My Portfolio`,
    description: project.short_description,
    openGraph: {
      images: [{ url: project.featured_image }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();

  // Fetch the current project
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !project) {
    notFound();
  }

  // Fetch other projects for navigation
  const { data: otherProjects } = await supabase
    .from("projects")
    .select("id, title, slug, featured_image")
    .neq("id", project.id)
    .limit(2);

  return (
    <main className="relative min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="from-neon/10 absolute inset-x-0 top-0 h-80 bg-gradient-to-b to-transparent opacity-70 blur-3xl"></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full md:h-[70vh]">
        <Image
          src={project.featured_image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-navy-900/20"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="mb-6 inline-flex items-center rounded-full border border-navy-600 bg-navy-800/70 px-4 py-2 backdrop-blur-sm">
              <CategoryWithIcon categoryId={project.category} />
            </div>
            
            <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
              {project.title}
            </h1>
            <p className="mb-6 max-w-2xl text-lg text-white/90 md:text-xl">
              {project.short_description}
            </p>
            <div className="flex flex-wrap gap-4">
              {project.github_url && (
                <Link
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full border border-navy-600 bg-navy-800/70 px-6 py-3 font-medium text-white transition-all hover:border-neon/40 hover:bg-navy-800/90 hover:text-neon backdrop-blur-sm"
                >
                  <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
                  View Code
                </Link>
              )}
              {project.live_url && (
                <Link
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="from-neon to-neon-4 hover:from-neon-4 hover:to-neon group flex items-center gap-2 rounded-full bg-gradient-to-r px-6 py-3 font-medium text-navy-900 transition-all"
                >
                  <ExternalLink className="h-5 w-5 transition-transform group-hover:scale-110" />
                  Live Demo
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Main content */}
          <div className="lg:w-2/3">
            <section className="mb-16">
              <h2 className="mb-6 text-3xl font-bold">About this project</h2>
              <div className="prose prose-lg prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-neon prose-strong:text-white prose-code:text-neon prose-code:bg-navy-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-navy-800 prose-pre:border prose-pre:border-navy-600 prose-img:rounded-lg">
                <MDXRemote source={project.long_description} />
              </div>
            </section>

            {/* Only show gallery if there are images */}
            {project.gallery_images && project.gallery_images.length > 0 && (
              <section className="mb-16">
                <h2 className="mb-6 text-3xl font-bold">Project Gallery</h2>
                <ProjectGallery
                  images={project.gallery_images}
                  alt={project.title}
                />
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8 rounded-xl border border-navy-600 bg-navy-800/50 p-6 shadow-lg backdrop-blur-sm">
              <h3 className="mb-4 text-xl font-bold">Tech Stack</h3>
              <TechStack technologies={project.technologies} />

              <div className="my-6 border-t border-navy-600"></div>

              <h3 className="mb-4 text-xl font-bold">Project Details</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-gray-400">Category</dt>
                  <dd className="mt-1 font-medium">
                    <CategoryWithIcon categoryId={project.category} />
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-400">Date</dt>
                  <dd className="mt-1 font-medium">
                    {new Date(project.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Project Navigation */}
        {otherProjects && otherProjects.length > 0 && (
          <section className="mt-24">
            <h2 className="mb-8 text-3xl font-bold">Other Projects</h2>
            <ProjectNavigation projects={otherProjects} />
          </section>
        )}
      </div>
    </main>
  );
}
