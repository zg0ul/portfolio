import { TechnologyWithIcon } from "@/components/TechIcons";

interface TechStackProps {
  technologies: string[];
}

export function TechStack({ technologies }: TechStackProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {technologies.map((techId) => (
        <div
          key={techId}
          className="border-navy-600 bg-navy-700/50 flex items-center gap-2 rounded-lg border px-3 py-2"
        >
          <TechnologyWithIcon techId={techId} />
        </div>
      ))}
    </div>
  );
}
