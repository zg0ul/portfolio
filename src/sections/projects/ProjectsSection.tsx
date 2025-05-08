"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { SupabaseProject, ProjectCategory } from "@/lib/supabase/types";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectFilter from "@/components/projects/ProjectFilter";

interface ProjectsSectionProps {
  initialProjects: SupabaseProject[];
  categories: ProjectCategory[];
}

export default function ProjectsSection({
  initialProjects,
  categories,
}: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "All">(
    "All",
  );
  const [projects, setProjects] = useState<SupabaseProject[]>(initialProjects);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category as ProjectCategory | "All");

    if (category === "All") {
      setProjects(initialProjects);
    } else {
      const filteredProjects = initialProjects.filter(
        (project) => project.category === category,
      );
      setProjects(filteredProjects);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center sm:mb-12">
        <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Projects
        </h1>
        <p className="mt-3 text-lg text-blue-400 sm:mt-4 sm:text-xl">
          Explore my featured work across various technologies and domains
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-10 flex justify-center">
        <ProjectFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
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
}
