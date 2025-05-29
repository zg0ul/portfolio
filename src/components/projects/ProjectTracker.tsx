"use client";

import { useEffect } from "react";
import { usePageTracking } from "@/components/AnalyticsTracker";

interface ProjectTrackerProps {
  project: {
    slug: string;
    title: string;
  };
}

/**
 * Component to track project views
 * This component tracks when a user views a specific project page
 */
export default function ProjectTracker({ project }: ProjectTrackerProps) {
  const { trackProjectView } = usePageTracking();

  useEffect(() => {
    // Track project view after component mounts
    trackProjectView(project.slug, project.title);
  }, [project.slug, project.title, trackProjectView]);

  return null; // This component doesn't render anything
}
