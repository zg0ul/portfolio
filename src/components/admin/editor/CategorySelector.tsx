"use client";

import { Check, AlertCircle } from "lucide-react";
import { PROJECT_CATEGORIES } from "@/components/ProjectCategories";

interface CategorySelectorProps {
  value: string;
  error?: string;
  onChange: (category: string) => void;
}

export default function CategorySelector({
  value,
  error,
  onChange,
}: CategorySelectorProps) {
  return (
    <div className="bg-navy-800/50 border-navy-600 rounded-xl border p-6 shadow-lg backdrop-blur-sm">
      <h3 className="text-foreground mb-4 text-lg font-semibold">
        Category <span className="text-red-500">*</span>
      </h3>

      <div className="space-y-2">
        {PROJECT_CATEGORIES.map((category) => (
          <label
            key={category.id}
            className={`flex cursor-pointer items-center rounded-lg p-3 transition-colors ${
              value === category.id
                ? "bg-neon/20 border-neon border"
                : "bg-navy-700/30 border-navy-600 hover:bg-navy-700/50 border"
            }`}
          >
            <input
              type="radio"
              name="category"
              value={category.id}
              checked={value === category.id}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <div className="flex items-center gap-3">
              {category.icon}
              <span className="font-medium">{category.label}</span>
              {value === category.id && (
                <Check className="text-neon ml-auto h-4 w-4" />
              )}
            </div>
          </label>
        ))}
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
