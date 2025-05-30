"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import * as motion from "motion/react-client";
import ProjectCard from "@/components/projects/ProjectCard";
import { ProjectType } from "@/types/project";
import { Button } from "@/components/ui/button";
import AnimatedUnderline from "../ui/AnimatedUnderline";
import { usePageTracking } from "@/components/AnalyticsTracker";

export const dynamic = "force-dynamic";

export default function FeaturedProjects() {
  const [featuredProjects, setFeaturedProjects] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { trackCustomEvent } = usePageTracking();

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

  const handleViewAllClick = () => {
    trackCustomEvent("view_all_projects_click", {
      source: "featured_projects_section",
      featured_projects_count: featuredProjects.length,
      location: "homepage",
    });
  };

  if (isLoading) {
    return (
      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="section-title:small relative inline-block text-center">
          Featured Projects
          <AnimatedUnderline />
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
    <section id="featured-projects" className="container mb-38">
      <div className="mb-8 sm:mb-12">
        {/* Mobile: Stacked layout */}
        <div className="block sm:hidden">
          <div className="mb-4 text-center">
            <h2 className="section-title:small relative inline-block">
              Featured Projects
              <AnimatedUnderline />
            </h2>
          </div>
          <div className="text-center">
            <Link href="/projects" onClick={handleViewAllClick}>
              <Button
                variant="outline"
                className="border-neon/30 text-neon hover:bg-neon/10 hover:border-neon/50 px-4 py-2 text-sm transition-all duration-200"
              >
                View All →
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop: Side-by-side layout */}
        <div className="relative hidden sm:block">
          <div className="text-center">
            <h2 className="section-title:small relative inline-block">
              Featured Projects
              <AnimatedUnderline />
            </h2>
          </div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2">
            <Link href="/projects" onClick={handleViewAllClick}>
              <Button
                variant="outline"
                className="border-neon/30 text-neon hover:bg-neon/10 hover:border-neon/50 px-4 py-2 text-sm transition-all duration-200"
              >
                View All →
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
}
