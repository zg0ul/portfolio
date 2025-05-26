"use client";

import { AlertCircle } from "lucide-react";
import { ProjectType } from "@/types/project";

interface BasicInformationFormProps {
  formData: ProjectType;
  errors: Record<string, string>;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  isEditing: boolean;
}

export default function BasicInformationForm({
  formData,
  errors,
  onInputChange,
}: BasicInformationFormProps) {
  return (
    <div className="bg-navy-800/50 border-navy-600 rounded-xl border p-6 shadow-lg backdrop-blur-sm">
      <h3 className="text-foreground mb-4 flex items-center text-xl font-semibold">
        Basic Information
      </h3>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="text-foreground mb-2 block text-sm font-medium">
            Project Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onInputChange}
            className={`bg-navy-700/50 text-foreground placeholder-navy-400 w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none ${
              errors.title
                ? "border-red-500 focus:ring-red-500/20"
                : "border-navy-600 focus:border-neon focus:ring-neon/20"
            }`}
            placeholder="Enter project title"
          />
          {errors.title && (
            <p className="mt-1 flex items-center text-sm text-red-400">
              <AlertCircle className="mr-1 h-4 w-4" />
              {errors.title}
            </p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className="text-foreground mb-2 block text-sm font-medium">
            URL Slug <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <span className="text-navy-400 mr-2 text-sm">/projects/</span>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={onInputChange}
              className={`bg-navy-700/50 text-foreground placeholder-navy-400 flex-1 rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none ${
                errors.slug
                  ? "border-red-500 focus:ring-red-500/20"
                  : "border-navy-600 focus:border-neon focus:ring-neon/20"
              }`}
              placeholder="project-url-slug"
            />
          </div>
          {errors.slug && (
            <p className="mt-1 flex items-center text-sm text-red-400">
              <AlertCircle className="mr-1 h-4 w-4" />
              {errors.slug}
            </p>
          )}
        </div>

        {/* Short Description */}
        <div>
          <label className="text-foreground mb-2 block text-sm font-medium">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="short_description"
            value={formData.short_description}
            onChange={onInputChange}
            rows={3}
            className={`bg-navy-700/50 text-foreground placeholder-navy-400 w-full resize-none rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none ${
              errors.short_description
                ? "border-red-500 focus:ring-red-500/20"
                : "border-navy-600 focus:border-neon focus:ring-neon/20"
            }`}
            placeholder="Brief description for project cards..."
          />
          {errors.short_description && (
            <p className="mt-1 flex items-center text-sm text-red-400">
              <AlertCircle className="mr-1 h-4 w-4" />
              {errors.short_description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
