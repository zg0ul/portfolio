"use client";

import { Globe, Github } from "lucide-react";
import { ProjectType } from "@/types/project";

interface ProjectLinksFormProps {
  formData: ProjectType;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProjectLinksForm({
  formData,
  onInputChange,
}: ProjectLinksFormProps) {
  return (
    <div className="bg-navy-800/50 border-navy-600 rounded-xl border p-6 shadow-lg backdrop-blur-sm">
      <h3 className="text-foreground mb-4 flex items-center text-xl font-semibold">
        <Globe className="text-neon mr-2 h-5 w-5" />
        Project Links
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-foreground mb-2 block text-sm font-medium">
            <Github className="mr-1 inline h-4 w-4" />
            GitHub URL
          </label>
          <input
            type="url"
            name="github_url"
            value={formData.github_url}
            onChange={onInputChange}
            className="bg-navy-700/50 border-navy-600 text-foreground placeholder-navy-400 focus:border-neon focus:ring-neon/20 w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div>
          <label className="text-foreground mb-2 block text-sm font-medium">
            <Globe className="mr-1 inline h-4 w-4" />
            Live Demo URL
          </label>
          <input
            type="url"
            name="live_url"
            value={formData.live_url}
            onChange={onInputChange}
            className="bg-navy-700/50 border-navy-600 text-foreground placeholder-navy-400 focus:border-neon focus:ring-neon/20 w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
            placeholder="https://project-demo.com"
          />
        </div>
      </div>
    </div>
  );
}
