import { TechStack } from "@/components/projects/TechStack";
import { CategoryWithIcon } from "@/components/ProjectCategories";

interface ProjectDetailsProps {
  project: {
    technologies: string[];
    category: string;
    start_date?: string;
    end_date?: string;
    created_at: string;
  };
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="border-navy-600 bg-navy-800/50 rounded-xl border p-6 shadow-lg backdrop-blur-sm">
      <h3 className="mb-4 text-xl font-bold">Tech Stack</h3>
      <TechStack technologies={project.technologies} />

      <div className="border-navy-600 my-6 border-t"></div>

      <h3 className="mb-4 text-xl font-bold">Project Details</h3>
      <dl className="space-y-4">
        <div>
          <dt className="text-sm text-gray-400">Category</dt>
          <dd className="mt-1 font-medium">
            <CategoryWithIcon categoryId={project.category} />
          </dd>
        </div>
        <div>
          <dt className="text-sm text-gray-400">Timeline</dt>
          <dd className="mt-1 font-medium">
            {project.start_date ? (
              <>
                {new Date(project.start_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
                {" - "}
                {project.end_date
                  ? new Date(project.end_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })
                  : "Present"}
              </>
            ) : (
              new Date(project.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
}
