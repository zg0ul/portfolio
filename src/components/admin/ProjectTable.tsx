/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SupabaseProject } from "@/lib/supabase/types";
import {
  LucideClipboardSignature,
  LucideEye,
  LucideLoader2,
  LucideTrash2,
  AlertTriangle,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ProjectTableProps {
  projects: SupabaseProject[];
}

export function ProjectTable({ projects: initialProjects }: ProjectTableProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const router = useRouter();

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle category filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  // Filter projects based on search term and category filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || project.category === filter;
    return matchesSearch && matchesFilter;
  });

  // Sort projects by most recent first
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  // Function to delete a project
  const onDeleteProject = async (id: string) => {
    try {
      setDeleteError(null);
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete project");
      }

      // Remove the deleted project from the local state
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id),
      );

      // Refresh the router to update server data
      router.refresh();

      return true;
    } catch (error: any) {
      console.error("Error in onDeleteProject:", error);
      setDeleteError(
        error.message || "An error occurred while deleting the project",
      );
      return false;
    }
  };

  // Handle project deletion with confirmation
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        setIsDeleting(id);
        const success = await onDeleteProject(id);

        if (!success) {
          alert("Failed to delete project. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again.");
      } finally {
        setIsDeleting(null);
      }
    }
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-zinc-900">
      {/* Search and Filter Controls */}
      <div className="flex flex-col items-center justify-between space-y-4 border-b border-gray-200 p-4 md:flex-row md:space-y-0 dark:border-gray-700">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-zinc-800 dark:text-white"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-full md:w-1/4">
          <select
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-zinc-800 dark:text-white"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="all">All Categories</option>
            <option value="AI">AI</option>
            <option value="Front-end">Front-end</option>
            <option value="Flutter">Flutter</option>
            <option value="Mechatronics Engineering">
              Mechatronics Engineering
            </option>
            <option value="Full Stack">Full Stack</option>
          </select>
        </div>
        <div className="w-full text-right md:w-auto">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add New Project
          </Link>
        </div>
      </div>

      {/* Error message */}
      {deleteError && (
        <div className="mx-4 mt-4 flex items-start gap-3 rounded-md border border-red-700 bg-red-50 p-3 text-red-700 dark:border-red-500/30 dark:bg-red-900/30 dark:text-red-400">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error deleting project</p>
            <p className="text-sm">{deleteError}</p>
          </div>
        </div>
      )}

      {/* Projects Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
              >
                Project
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-zinc-900">
            {sortedProjects.length > 0 ? (
              sortedProjects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gray-50 dark:hover:bg-zinc-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        {project.thumbnail_url && (
                          <div className="relative h-12 w-12 overflow-hidden rounded-md">
                            <Image
                              src={project.thumbnail_url}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {project.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {project.technologies.slice(0, 3).join(", ")}
                          {project.technologies.length > 3 && "..."}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs leading-5 font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.featured ? (
                      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800 dark:bg-green-900 dark:text-green-200">
                        Featured
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs leading-5 font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="rounded-md px-2 py-1 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LucideEye />
                      </Link>
                      <Link
                        href={`/admin/projects/edit/${project.id}`}
                        className="rounded-md px-2 py-1 text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                      >
                        <LucideClipboardSignature className="size-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        disabled={isDeleting === project.id}
                        className="rounded-md px-2 py-1 text-red-600 hover:text-red-900 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:text-red-300"
                      >
                        {isDeleting === project.id ? (
                          <LucideLoader2 className="size-5 animate-spin" />
                        ) : (
                          <LucideTrash2 className="size-5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  {searchTerm || filter !== "all" ? (
                    <div>
                      <p className="mb-2 text-lg font-medium">
                        No matching projects found
                      </p>
                      <p>
                        Try adjusting your search or filter to find what you're
                        looking for.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="mb-2 text-lg font-medium">
                        No projects found
                      </p>
                      <p className="mb-4">
                        Start by adding your first project to showcase your
                        work.
                      </p>
                      <Link
                        href="/admin/projects/new"
                        className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add New Project
                      </Link>
                    </div>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Project Count */}
      <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {sortedProjects.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            {projects.length}
          </span>{" "}
          projects
        </p>
      </div>
    </div>
  );
}
