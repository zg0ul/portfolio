import React from "react";
import ProjectsClient from "@/components/projects/ProjectsClient";
import { getAllProjects } from "@/lib/projects-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Mohammad Zgoul",
  description:
    "Explore my portfolio of projects across various technologies and domains",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <ProjectsClient initialProjects={projects} />
    </main>
  );
}
