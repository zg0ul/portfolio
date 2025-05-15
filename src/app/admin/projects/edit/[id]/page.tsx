import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { LucideArrowLeft } from "lucide-react";

type Params = Promise<{ id: string[] }>;

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  // Rest of your code remains the same
  const supabase = createAdminClient();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <div className="topPageMargin z-10 container mx-auto px-4">
      <div className="mb-8">
        <div className="mb-6 flex items-center">
          <Link
            href="/admin/projects"
            className="text-foreground flex items-center hover:text-blue-100"
          >
            <LucideArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </div>
        <h1 className="text-3xl font-bold">Edit Project: {project.title}</h1>
      </div>

      <div className="bg-navy-700 border-navy-600 z-10 rounded-xl border-2 p-6 opacity-100 shadow-sm">
        <ProjectForm project={project} isEditing={true} />
      </div>
    </div>
  );
}
