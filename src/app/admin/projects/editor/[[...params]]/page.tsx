// src/app/admin/projects/editor/[[...params]]/page.tsx
import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import ProjectEditor from "@/components/admin/editor/ProjectEditor";

type Params = Promise<{ params?: string[] }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { params: paramArray } = await params;
  const isEditing = paramArray && paramArray.length > 0;

  return {
    title: isEditing ? "Edit Project - Admin" : "New Project - Admin",
    description: isEditing ? "Edit project details" : "Create a new project",
  };
}

export default async function ProjectEditorPage({
  params,
}: {
  params: Params;
}) {

  const { params: paramArray } = await params;
  const projectId = paramArray?.[0];
  const isEditing = Boolean(projectId);

  let project = null;

  if (isEditing) {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    if (error || !data) {
      notFound();
    }

    project = data;
  }

  return <ProjectEditor project={project} isEditing={isEditing} />;
}
