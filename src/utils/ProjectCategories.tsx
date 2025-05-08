import React from "react";

// Define the project categories with their respective icons
export type ProjectCategory = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

// Define category icon components
const WebIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-sky-400"
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const MobileIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-violet-400"
  >
    <rect width="10" height="18" x="7" y="3" rx="2" />
    <line x1="12" x2="12" y1="18" y2="18.01" />
  </svg>
);

const BackendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-emerald-400"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const FullStackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-rose-400"
  >
    <path d="M18 6h-5v8l-5-8H3v12h5v-8l5 8h5Z" />
  </svg>
);

const AIIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-amber-400"
  >
    <path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
  </svg>
);

const GameIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-indigo-400"
  >
    <line x1="6" x2="10" y1="12" y2="12" />
    <line x1="8" x2="8" y1="10" y2="14" />
    <circle cx="15" cy="13" r="1" />
    <circle cx="18" cy="11" r="1" />
    <rect width="20" height="12" x="2" y="6" rx="2" />
  </svg>
);

// Export all available project categories
export const PROJECT_CATEGORIES: ProjectCategory[] = [
  {
    id: "web",
    label: "Web Development",
    icon: <WebIcon />,
  },
  {
    id: "mobile",
    label: "Mobile App",
    icon: <MobileIcon />,
  },
  {
    id: "backend",
    label: "Backend/API",
    icon: <BackendIcon />,
  },
  {
    id: "fullstack",
    label: "Full Stack",
    icon: <FullStackIcon />,
  },
  {
    id: "ai",
    label: "AI/Machine Learning",
    icon: <AIIcon />,
  },
  {
    id: "game",
    label: "Game Development",
    icon: <GameIcon />,
  },
];

// Function to get a category by its ID
export function getCategoryById(id: string): ProjectCategory | undefined {
  return PROJECT_CATEGORIES.find((category) => category.id === id);
}

// Function to get category with icon for display
export function CategoryWithIcon({ categoryId }: { categoryId: string }) {
  const category = getCategoryById(categoryId);

  if (!category) {
    return <span className="text-sm text-gray-400">{categoryId}</span>;
  }

  return (
    <div className="flex items-center gap-2">
      {category.icon}
      <span className="text-sm">{category.label}</span>
    </div>
  );
}
