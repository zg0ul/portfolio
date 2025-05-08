// This file maps technology names to their corresponding icon components
// You can use any icon library or create custom SVG icons

import React from "react";

// Define a technology type
export type Technology = {
  id: string;
  name: string;
  icon: React.FC;
};

// Define icon components
const ReactIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 text-blue-400"
  >
    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.277z" />
  </svg>
);

const NextJSIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 text-black dark:text-white"
  >
    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 0-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.049-.106.005-4.703.007-4.705.073-.091a.637.637 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-sky-500">
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
  </svg>
);

const FlutterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 text-blue-500"
  >
    <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357L14.314 0zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
  </svg>
);

const TypeScriptIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 text-blue-600"
  >
    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
  </svg>
);

const JavaScriptIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 text-yellow-400"
  >
    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
  </svg>
);

const SupabaseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 text-emerald-600"
  >
    <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z" />
  </svg>
);

const FirebaseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 text-amber-500"
  >
    <path d="M3.89 15.673L6.255.461A.542.542 0 0 1 7.27.289L9.813 5.06 3.89 15.673zm16.795 3.691L18.433 5.365a.543.543 0 0 0-.918-.295l-14.2 14.294 7.857 4.428a1.62 1.62 0 0 0 1.587 0l7.926-4.428zM14.3 7.148l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984 14.3 7.148z" />
  </svg>
);

const GoRouterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 text-cyan-500"
  >
    <path d="M3.79 15.045L7.2 0H8.4l-3.27 13.884H14.4c-2.016 0-2.82 1.008-2.172 3.024L12.3 24H0L3.79 15.045z" />
    <path d="M14.03 15.045L17.4 0H24l-3.82 8.97L24 17.933h-1.2l-3.6-8.925L16.02 17.933H24L20.21 24h-9.42l.79-3.176c.63-2.016-.3-3.024-2.1-3.024h.6l3.95-2.756z" />
  </svg>
);

const RiverpodIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 text-indigo-400"
  >
    <path d="M12 0L1.605 6v12L12 24l10.395-6V6L12 0zm0 2.399L20.5 7.2v9.6L12 21.601 3.5 16.8V7.2L12 2.399zm-.15 3.54l-1.32 5.16h2.97l-1.65-5.16zm-2.55 5.91L6 14.399V9.6l3.3 2.25zm2.7 3.811l1.32 5.159 1.649-5.159H12zm2.55-1.56l3.3-2.25v4.799l-3.3-2.55z" />
  </svg>
);

const DartIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-sky-500">
    <path d="M4.105 4.105S9.158 1.58 11.684.316a3.079 3.079 0 0 1 1.481-.315c.766.047 1.677.788 1.677.788L24 9.948v9.789h-4.263V24H9.789l-9-9C.303 14.5 0 13.795 0 13.105c0-.319.18-.818.316-1.105l3.789-7.895zm.679.679v11.787c.002.543.021 1.024.498 1.508L10.204 23h8.533v-4.263L4.784 4.784zm12.055-.678c-.899-.896-1.809-1.78-2.74-2.643-.302-.267-.567-.468-1.07-.462-.37.014-.87.195-.87.195L6.33 4.105l10.509 10.509v-10.51z" />
  </svg>
);

const DefaultIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

// Export the list of technologies as a structured array
export const TECHNOLOGIES: Technology[] = [
  { id: "react", name: "React", icon: ReactIcon },
  { id: "nextjs", name: "Next.js", icon: NextJSIcon },
  { id: "tailwind", name: "Tailwind CSS", icon: TailwindIcon },
  { id: "flutter", name: "Flutter", icon: FlutterIcon },
  { id: "typescript", name: "TypeScript", icon: TypeScriptIcon },
  { id: "javascript", name: "JavaScript", icon: JavaScriptIcon },
  { id: "supabase", name: "Supabase", icon: SupabaseIcon },
  { id: "firebase", name: "Firebase", icon: FirebaseIcon },
  { id: "gorouter", name: "Go Router", icon: GoRouterIcon },
  { id: "riverpod", name: "Riverpod", icon: RiverpodIcon },
  { id: "dart", name: "Dart", icon: DartIcon },
];

// Map technology IDs to icon components for backward compatibility
const techIconsMap: Record<string, React.FC> = {};
TECHNOLOGIES.forEach((tech) => {
  techIconsMap[tech.name] = tech.icon;
  // Add alternate names/formats
  if (tech.id === "react") {
    techIconsMap["ReactJS"] = tech.icon;
    techIconsMap["React.js"] = tech.icon;
  }
  if (tech.id === "nextjs") {
    techIconsMap["NextJS"] = tech.icon;
    techIconsMap["Next"] = tech.icon;
  }
  if (tech.id === "tailwind") {
    techIconsMap["TailwindCSS"] = tech.icon;
  }
  if (tech.id === "typescript") {
    techIconsMap["TS"] = tech.icon;
  }
  if (tech.id === "javascript") {
    techIconsMap["JS"] = tech.icon;
  }
});

// Function to get the icon component for a given technology
export function getTechIcon(tech: string): React.FC | null {
  const normalizedTech = tech.trim();
  return techIconsMap[normalizedTech] || DefaultIcon;
}

// Function to get a technology by its ID
export function getTechById(id: string): Technology | undefined {
  return TECHNOLOGIES.find((tech) => tech.id === id);
}

// Component to display a technology with its icon
export function TechnologyWithIcon({ techId }: { techId: string }) {
  const tech = getTechById(techId);

  if (!tech) {
    return <span className="text-sm text-gray-400">{techId}</span>;
  }

  const Icon = tech.icon;

  return (
    <div className="flex items-center gap-2">
      <Icon />
      <span className="text-sm">{tech.name}</span>
    </div>
  );
}
