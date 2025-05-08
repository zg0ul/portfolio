import Link from "next/link";
import Image from "next/image";

type ProjectPreview = {
  id: string;
  title: string;
  slug: string;
  featured_image: string;
};

interface ProjectNavigationProps {
  projects: ProjectPreview[];
}

export function ProjectNavigation({ projects }: ProjectNavigationProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/projects/${project.slug}`}
          className="group"
        >
          <div className="relative h-64 overflow-hidden rounded-xl">
            <Image
              src={project.featured_image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white underline-offset-2 group-hover:underline">
                  {project.title}
                </h3>
                <div className="mt-2 flex items-center text-sm text-white/80">
                  <span>View Project</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1 transition-transform group-hover:translate-x-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
