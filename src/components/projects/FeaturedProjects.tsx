"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as motion from "motion/react-client";
import ProjectCard from "@/components/projects/ProjectCard";
import { ProjectType } from "@/types/project";
import { Button } from "@/components/ui/button";

export default function FeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/projects/featured");
        const data = await response.json();

        if (response.ok) {
          setFeaturedProjects(data);
        } else {
          console.error("Failed to fetch featured projects:", data.error);
        }
      } catch (error) {
        console.error("Error fetching featured projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="section-title:small mb-4 text-center">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="border-navy-600 bg-navy-800/50 h-96 animate-pulse rounded-xl border"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // If no featured projects, don't show the section
  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
      <h2 className="section-title:small text-center">Featured Projects</h2>
      <p className="section-description:small mb-6 text-center">
        Check out some of my best work
      </p>

      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link href="/projects">
          <Button className="bg-neon text-navy-900 hover:bg-neon/90 rounded-full px-8 py-2 transition-colors">
            View All Projects
          </Button>
        </Link>
      </div>
    </div>
  );
}
