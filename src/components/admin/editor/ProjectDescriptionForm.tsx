"use client";

import { AlertCircle } from "lucide-react";
import EnhancedMarkdownEditor from "@/components/admin/MarkdownEditor";

interface ProjectDescriptionFormProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export default function ProjectDescriptionForm({
  value,
  error,
  onChange,
}: ProjectDescriptionFormProps) {
  return (
    <div className="bg-navy-800/50 border-navy-600 rounded-xl border p-6 shadow-lg backdrop-blur-sm">
      <h3 className="text-foreground mb-4 text-xl font-semibold">
        Project Description <span className="text-red-500">*</span>
      </h3>

      <div className={error ? "rounded-lg border border-red-500" : ""}>
        <EnhancedMarkdownEditor
          value={value}
          onChange={onChange}
          placeholder="Write your detailed project description using Markdown..."
          height="400px"
        />
      </div>
      {error && (
        <p className="mt-2 flex items-center text-sm text-red-400">
          <AlertCircle className="mr-1 h-4 w-4" />
          {error}
        </p>
      )}
    </div>
  );
}
