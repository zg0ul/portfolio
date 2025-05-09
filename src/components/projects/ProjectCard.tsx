"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { CategoryWithIcon } from "@/utils/ProjectCategories";
import { TechnologyWithIcon } from "@/components/TechIcons";
import { ProjectType } from "@/types/project";
import { FiGithub } from "react-icons/fi";

interface ProjectCardProps {
  project: ProjectType;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group border-navy-600 bg-navy-800 hover:border-neon/50 hover:shadow-neon/10 overflow-hidden rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300"
    >
      <div className="relative flex h-full flex-col">
        {/* Image container with overlay */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.featured_image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Dark overlay with See Details text */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex flex-col items-center text-center">
              <span className="text-neon mb-2">See Details</span>
              <ArrowRight className="text-neon h-5 w-5" />
            </div>
          </div>

          {/* Category badge */}
          <div className="bg-navy-700/90 absolute bottom-3 left-3 rounded-full px-3 py-1.5 text-sm backdrop-blur-sm">
            <CategoryWithIcon categoryId={project.category} />
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col p-4">
          <h2 className="text-foreground mb-2 text-xl font-bold">
            {project.title}
          </h2>
          <p className="text-text-600/80 mb-4 line-clamp-2 text-sm">
            {project.short_description}
          </p>

          {/* Technologies with icons */}
          <div className="mt-auto">
            <div className="mb-4 flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="border-navy-600 bg-navy-700/50 inline-flex items-center rounded-full border px-3 py-1 text-xs"
                >
                  <TechnologyWithIcon techId={tech} />
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="border-navy-600 bg-navy-700/50 inline-flex items-center rounded-full border px-3 py-1 text-xs">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>

            {/* Links and actions */}
            <div className="flex items-center justify-between">
              <Link
                href={`/projects/${project.slug}`}
                className="from-neon to-neon-4 hover:from-neon-4 hover:to-neon text-navy-900 text-neon-10 group flex h-10 items-center justify-center rounded-lg bg-gradient-to-r px-4 py-2 text-sm font-bold transition-colors duration-500 hover:bg-gradient-to-l"
              >
                View Project
              </Link>

              <div className="flex gap-2">
                {project.github_url && (
                  <Link
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-navy-500 bg-navy-700/50 hover:bg-navy-700 hover:border-neon/50 flex size-10 items-center justify-center rounded-lg border transition-colors"
                  >
                    <FiGithub className="h-5 w-5" />
                  </Link>
                )}

                {project.live_url && (
                  <Link
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-navy-500 bg-navy-700/50 hover:bg-navy-700 hover:border-neon/50 flex size-10 items-center justify-center rounded-lg border transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
