import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { ProjectDetails } from "@/components/projects/ProjectDetails";

interface ProjectHeroProps {
  project: {
    featured_image: string;
    title: string;
    category: string;
    short_description: string;
    github_url?: string;
    live_url?: string;
    technologies: string[];
    start_date?: string;
    end_date?: string;
    created_at: string;
  };
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <div className="relative w-full">
      {/* Header with Title centered */}
      <div className="mb-4 flex justify-center">
        {/* Title - Centered */}
        <h1 className="text-neon-4 text-3xl font-bold tracking-tight whitespace-nowrap sm:text-4xl md:text-5xl">
          {project.title}
        </h1>
      </div>

      {/* Centered Description and Buttons */}
      <div className="mb-8 text-center">
        <p className="text-foreground mx-auto mb-6 max-w-3xl text-sm md:text-lg lg:text-xl">
          {project.short_description}
        </p>

        {/* Action Buttons - Centered */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {project.github_url && (
            <Link
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border-navy-400 bg-navy-800/90 hover:border-neon/40 hover:bg-navy-800 hover:text-neon flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium shadow-lg backdrop-blur-md transition-all md:px-6 md:py-3 md:text-base"
            >
              <SiGithub className="h-4 w-4 transition-transform group-hover:scale-110 md:h-5 md:w-5" />
              View Code
            </Link>
          )}
          {project.live_url && (
            <Link
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="from-neon to-neon-4 hover:from-neon-4 hover:to-neon group text-navy-900 flex items-center gap-2 rounded-full bg-gradient-to-r px-4 py-2.5 text-sm font-medium shadow-lg transition-all md:px-6 md:py-3 md:text-base"
            >
              <ExternalLink className="h-4 w-4 transition-transform group-hover:scale-110 md:h-5 md:w-5" />
              Live Demo
            </Link>
          )}
        </div>
      </div>

      {/* Image and Project Details Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Smaller Hero Image with 16:9 aspect ratio */}
        <div className="relative aspect-video w-full">
          <Image
            src={project.featured_image}
            alt={project.title}
            fill
            className="border-navy-700 overflow-clip rounded-lg border object-cover"
            priority
          />
        </div>

        {/* Project Details Card */}
        <div className="flex items-start">
          <ProjectDetails project={project} />
        </div>
      </div>

      {/* Floating Back Button - Bottom Left */}
      <div className="fixed bottom-4 left-4 z-50 lg:hidden">
        <Link href="/projects">
          <button
            className="bg-navy-800/90 border-navy-600 hover:bg-navy-700/90 flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg backdrop-blur-sm"
            aria-label="Back to All Projects"
          >
            <ArrowLeft className="text-foreground h-5 w-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
