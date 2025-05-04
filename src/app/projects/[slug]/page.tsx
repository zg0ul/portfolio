import React from "react";
import { Metadata } from "next";
import { getProjectBySlug, getAllProjects } from "@/lib/projects-data";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/ProjectDetail";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Mohammad Zgoul`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <ProjectDetail project={project} />
    </main>
  );
}
