"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/projects-data";
import { BsArrowLeft, BsGithub } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import * as Icons from "react-icons/si";
import { motion } from "framer-motion";

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const IconComponents: Record<string, React.ElementType> = Icons;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-blue-500"
      >
        <BsArrowLeft />
        Back to Projects
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Project Header & Info - Left Column on large screens */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-24 rounded-xl bg-white/5 p-6 backdrop-blur-sm"
          >
            <div className="mb-6 flex flex-wrap gap-2">
              {project.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500"
                >
                  {category}
                </span>
              ))}
            </div>

            <h1 className="mb-4 text-3xl font-bold">{project.title}</h1>
            <p className="mb-6 text-gray-400">{project.description}</p>

            <div className="mb-6">
              <h3 className="mb-3 text-sm text-gray-500 uppercase">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => {
                  const TechIcon = IconComponents[tech.icon];
                  return (
                    <div
                      key={tech.name}
                      className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-sm"
                      title={tech.name}
                    >
                      {TechIcon && <TechIcon className="h-4 w-4" />}
                      <span>{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 transition hover:bg-white/20"
                >
                  <BsGithub className="h-5 w-5" />
                  <span>View Code</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 transition hover:bg-blue-600"
                >
                  <FiExternalLink className="h-5 w-5" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Project Content - Right Column on large screens */}
        <div className="lg:col-span-2">
          {/* Project Gallery */}
          <div className="mb-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="overflow-hidden rounded-lg"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Project Description in Markdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl bg-white/5 p-6 backdrop-blur-sm"
          >
            <article className="prose prose-invert prose-headings:font-bold prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-500 max-w-none">
              <ReactMarkdown
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                remarkPlugins={[remarkGfm]}
              >
                {project.longDescription}
              </ReactMarkdown>
            </article>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
