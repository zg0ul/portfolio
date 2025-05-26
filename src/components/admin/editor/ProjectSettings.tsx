"use client";

import { Star, Calendar } from "lucide-react";
import { ProjectType } from "@/types/project";

interface ProjectSettingsProps {
  formData: ProjectType;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProjectSettings({
  formData,
  onInputChange,
}: ProjectSettingsProps) {
  return (
    <div className="bg-navy-800/50 border-navy-600 rounded-xl border p-6 shadow-lg backdrop-blur-sm">
      <h3 className="text-foreground mb-4 text-lg font-semibold">Settings</h3>

      <div className="space-y-4">
        {/* Featured Toggle */}
        <label className="flex cursor-pointer items-center justify-between">
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-foreground font-medium">Featured Project</p>
              <p className="text-navy-400 text-sm">Show on homepage</p>
            </div>
          </div>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={onInputChange}
            className="text-neon bg-navy-700 border-navy-600 focus:ring-neon/20 h-5 w-5 rounded focus:ring-2"
          />
        </label>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              <Calendar className="mr-1 inline h-4 w-4" />
              Start Date
            </label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={onInputChange}
              className="bg-navy-700/50 border-navy-600 text-foreground focus:border-neon focus:ring-neon/20 w-full rounded-lg border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-foreground mb-2 block text-sm font-medium">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={onInputChange}
              className="bg-navy-700/50 border-navy-600 text-foreground focus:border-neon focus:ring-neon/20 w-full rounded-lg border px-3 py-2 transition-colors focus:ring-2 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
