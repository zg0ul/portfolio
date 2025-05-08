"use client";

import { useState } from "react";

interface CategoryFilterProps {
  categories: string[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Handle category filter click
  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category);

    // Filter projects by category using data attributes
    const projects = document.querySelectorAll("[data-category]");

    projects.forEach((project) => {
      const projectCategory = project.getAttribute("data-category");

      if (!category || projectCategory === category) {
        (project as HTMLElement).style.display = "block";
      } else {
        (project as HTMLElement).style.display = "none";
      }
    });
  };

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <button
        onClick={() => handleCategoryClick(null)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          activeCategory === null
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === category
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
