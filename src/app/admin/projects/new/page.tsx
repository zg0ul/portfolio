import React from "react";
import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { LucideArrowLeft } from "lucide-react";

export default function NewProjectPage() {
  return (
    <div className="topPageMargin container mx-auto px-4">
      <div className="mb-10">
        <div className="mb-6 flex items-center">
          <Link
            href="/admin/projects"
            className="text-foreground flex items-center hover:text-blue-100"
          >
            <LucideArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </div>
        <h1 className="text-3xl font-bold">Create New Project</h1>
        <p className="mt-2">
          Add the details of your new project.
        </p>
      </div>

      <ProjectForm />
    </div>
  );
}
