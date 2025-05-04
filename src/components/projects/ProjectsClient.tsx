"use client";
import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import {
  Project,
  ProjectCategory,
  categories,
  getAllProjects,
} from "@/lib/projects-data";
import { motion } from "framer-motion";

interface ProjectsClientProps {
  initialProjects: Project[];
}

const ProjectsClient: React.FC<ProjectsClientProps> = ({ initialProjects }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">(
    "All",
  );
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleCategoryChange = (category: ProjectCategory | "All") => {
    setActiveCategory(category);

    if (category === "All") {
      setProjects(initialProjects);
    } else {
      const filteredProjects = initialProjects.filter((project) =>
        project.categories.includes(category),
      );
      setProjects(filteredProjects);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-400">
          Explore my featured work across various technologies and domains
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-4">
        <button
          onClick={() => handleCategoryChange("All")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-6 ${
            activeCategory === "All"
              ? "bg-blue-500 text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-6 ${
              activeCategory === category
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.length > 0 ? (
          projects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-gray-400">
            <p className="text-lg">No projects found in this category</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectsClient;
