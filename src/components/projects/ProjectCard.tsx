"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/projects-data";
import { BsGithub } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import * as Icons from "react-icons/si";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const IconComponents: Record<string, React.ElementType> = Icons;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-white/5 p-1 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-xl dark:bg-black/20 dark:hover:bg-black/30"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={400}
          height={225}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-70"></div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-4">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            {project.categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500"
              >
                {category}
              </span>
            ))}
          </div>
          <h3 className="mb-2 text-xl font-bold tracking-tight">
            {project.title}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm text-gray-400">
            {project.description}
          </p>
        </div>

        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {project.technologies.map((tech) => {
              const TechIcon = IconComponents[tech.icon];
              return (
                <div
                  key={tech.name}
                  className="group/tech flex items-center rounded-full bg-white/5 p-1.5 text-sm"
                  title={tech.name}
                >
                  {TechIcon && <TechIcon className="h-4 w-4" />}
                </div>
              );
            })}
          </div>

          <div className="mt-auto flex justify-between">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center rounded-lg bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-600"
            >
              View Details
            </Link>

            <div className="flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                >
                  <BsGithub className="h-4 w-4" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                >
                  <FiExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {project.featured && (
        <span className="absolute top-0 right-0 rounded-tr-lg rounded-bl-lg bg-blue-500 px-2 py-1 text-xs font-semibold text-white">
          Featured
        </span>
      )}
    </motion.div>
  );
};

export default ProjectCard;
